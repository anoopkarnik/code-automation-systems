import db from '@repo/prisma-db/client';
import { Kafka } from 'kafkajs';
require('dotenv').config();
import { logger } from '@repo/winston-logger/index';
import { updateEvent } from '@repo/prisma-db/repo/workflow';

const TOPIC_NAME = 'workflow-events';
const kafka = new Kafka({
    clientId: 'workflow-event-outbox-processor',
    brokers: [process.env.BOOTSTRAP_SERVER ||'' ]
})

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    logger.info('Connected to Kafka Producer')

    while(1){
        const pendingRows = await db.eventOutbox.findMany({
            where:{},
            take: 10
        })
        pendingRows.forEach(row =>{
            producer.send({
                topic: TOPIC_NAME,
                messages: pendingRows.map(row => {
                   return {
                        value: JSON.stringify({eventId: row.eventId, stage: 0})
                   }
                })
            })
            updateEvent(row.eventId, 'PROCESSING')
            logger.info(`Sent event ${row.eventId} to Kafka`)
        })

        await db.eventOutbox.deleteMany({
            where:{
                id: {
                    in: pendingRows.map(row => row.id)
                }
            }
        })
    }
}

main()