import { Kafka } from "kafkajs";
require("dotenv").config();
import db from "@repo/prisma-db/client";
import { logger } from "@repo/winston-logger/index";

const TOPIC_NAME = "workflow-events";

const kafka = new Kafka({
  clientId: "workflow-event-outbox-processor",
  brokers: [process.env.BOOTSTRAP_SERVER || ""],
});

async function main() {
    const consumer = kafka.consumer({ groupId:  "main-worker" });
    await consumer.connect();
    logger.info("Connected to Kafka Consumer");
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    logger.info(`Subscribed to topic ${TOPIC_NAME}`);
    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            logger.info(`Received message ${message.offset} from topic ${topic}`);
            await new Promise(r => setTimeout(r, 1000))
            await consumer.commitOffsets([{ 
                topic, 
                partition, 
                offset: (parseInt(message.offset) + 1).toString() 
            }])
            logger.info(`Processed message ${message.offset} from topic ${topic}`);
        }
    })
}

main();