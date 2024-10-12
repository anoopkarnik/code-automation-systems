import db from '@repo/prisma-db/client';
import { Kafka } from 'kafkajs';
require('dotenv').config();
import { logger } from '@repo/winston-logger/index';
import { updateEvent } from '@repo/prisma-db/repo/workflow';

const NODE_TOPIC_NAME = process.env.NODE_TOPIC_NAME || 'nodejs-server-events';
const kafka = new Kafka({
    clientId: 'workflow-event-outbox-processor',
    brokers: [process.env.BOOTSTRAP_SERVER || '']
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

        // Prepare the messages to send to Kafka
        const messages = pendingRows.map(row => ({
            value: JSON.stringify({ eventId: row.eventId, stage: 1 })
        }));

        // Send all messages to Kafka in a single call
        await producer.send({
            topic: NODE_TOPIC_NAME,
            messages: messages
        });

        // Update each event to 'PROCESSING' status after sending to Kafka
        await Promise.all(
            pendingRows.map(row => updateEvent(row.eventId, 'PROCESSING'))
        );

        // Log each sent event
        pendingRows.forEach(row => {
            logger.info(`Sent event ${row.eventId} to Kafka`);
        });

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