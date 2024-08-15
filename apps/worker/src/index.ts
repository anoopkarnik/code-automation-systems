import { Kafka } from "kafkajs";
require("dotenv").config();
import db from "@repo/prisma-db/client";
import { logger } from "@repo/winston-logger/index";
import { getEventDetailsById, updateEvent, updateEventMetadata } from "@repo/prisma-db/repo/workflow";
import {  webhook } from "./webhook";
import { javascriptCode } from "./javascriptCode";
import { modifyMetadata } from "./utils";
import { createNotionPages, modifyNotionPages, queryAllNotionDatabaseAction } from "./notion";

const TOPIC_NAME = "workflow-events";

const kafka = new Kafka({
  clientId: "workflow-event-outbox-processor",
  brokers: [process.env.BOOTSTRAP_SERVER || ""],
});

async function main() {
    const consumer = kafka.consumer({ groupId:  "main-worker" });
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();
    logger.info("Connected to Kafka Consumer");
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    logger.info(`Subscribed to topic ${TOPIC_NAME}`);
    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            
            let newLogs:any = []
            let log = `Received message ${message.offset} from topic ${topic}`;
            logger.info(log);
            newLogs.push(log);
            if (!message.value){
                log = `No message found in offset ${message.offset}`;
                newLogs.push(log);
                logger.error(log);
                await consumer.commitOffsets([{ 
                    topic, 
                    partition, 
                    offset: (parseInt(message.offset) + 1).toString() 
                }])
                return;
            }
            try{
                const parsedValue = JSON.parse(message.value.toString());
                const eventId = parsedValue.eventId;
                const stage = parsedValue.stage;
                const eventDetails = await getEventDetailsById(eventId);
                const currentAction = eventDetails?.Workflows?.actions.find(x=> x.sortingOrder === stage)
                if (!currentAction) {
                    logger.error(`No action found for event ${eventId} at stage ${stage}`);
                    try{
                        updateEvent(eventId, "NOACTIONFOUND");
                    }
                    catch (error){
                        logger.error(`Error updating event ${eventId} to NOACTIONFOUND`);
                    }
                    return;
                }
                log = `Processing ${eventId} at stage ${stage} with action ${currentAction?.type?.name}`;
                newLogs.push(log);
                logger.info(log);
                let result:any = {};
                let metadata:any = currentAction?.metadata;
                const prevMetadata:any = eventDetails?.metadata;
                metadata = await modifyMetadata(metadata, prevMetadata);
                if (currentAction?.type?.name === 'External Webhook'){
                    const res = await webhook(metadata?.url, metadata?.body, metadata?.headers,metadata?.method);

                    if (res.result){
                        result = res.result;
                    }
                    let log = res.log;
                    logger.info(log);
                    newLogs.push(log);
                }
                else if (currentAction?.type?.name === 'Javascript Code'){
                    const res = await javascriptCode(metadata?.code);
                    if (res.result){
                        result = res.result;
                    }
                    let log = res.log;
                    logger.info(log);
                    newLogs.push(log);
                }
                else if (currentAction?.type?.name === 'Query Database'){
                    const res = await queryAllNotionDatabaseAction({database_id: metadata?.databaseId, 
                        apiToken: metadata?.notionAccountId, filters: metadata?.filters, sorts: metadata?.sorts});
                    if (res.result){
                        result = res.result;
                    }
                    let log = res.log;
                    logger.info(log);
                    newLogs.push(log);

                }

                else if (currentAction?.type?.name === 'Create Page'){
                    const res = await createNotionPages({apiToken: metadata?.notionAccountId, 
                        dbId: metadata?.databaseId, pagesProperties: metadata?.allProperties});
                    if (res.result){
                        result = res.result;
                    }
                    let log = res.log;
                    logger.info(log);
                    newLogs.push(log);
                }
                else if (currentAction?.type?.name === 'Update Page'){
                    const res = await modifyNotionPages({apiToken: metadata?.notionAccountId, 
                        pageIds: metadata?.pageIds, pagesProperties: metadata?.allProperties});
                    if (res.result){
                        result = res.result;
                    }
                    let log = res.log;
                    logger.info(log);
                    newLogs.push(log);
                }

                const eventMetadata:any = eventDetails?.metadata;
                let stageString = `action${stage}`
                let updatedMetadata:any = {...eventMetadata, [stageString] : {result:result, logs: newLogs}};

                const lastStage = (eventDetails?.Workflows?.actions.length || 1) - 1;
                if (lastStage!==stage){
                    updateEventMetadata(eventId, updatedMetadata);
                    await producer.send({
                        topic: TOPIC_NAME,
                        messages: [
                            {
                                value: JSON.stringify({eventId, stage: stage+1})   
                            }
                        ]
                    })
                }
                else{
                    try{
                        updateEvent(eventId, "COMPLETED");
                        updateEventMetadata(eventId, updatedMetadata);
                    }
                    catch (error){
                        logger.error(`Error updating event ${eventId} to COMPLETED`);
                    }
                }
                await consumer.commitOffsets([{ 
                    topic, 
                    partition, 
                    offset: (parseInt(message.offset) + 1).toString() 
                }])
                logger.info(`Processed message ${message.offset} from topic ${topic}`);
            }
            catch (error){
                logger.error(`Error processing message ${message.offset} from topic ${topic}`);
                logger.error(error);
                await consumer.commitOffsets([{ 
                    topic, 
                    partition, 
                    offset: (parseInt(message.offset) + 1).toString() 
                }])
            }
        }
    })
}

main();