import winston from 'winston';
import { LokiTransport } from './loki-transport';
// Setup Winston logger
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf((info)=>`${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log' ,level: 'error'}),
    ]
});


