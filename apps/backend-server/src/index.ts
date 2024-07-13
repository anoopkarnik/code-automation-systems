import express from 'express';
import cors from 'cors';
require('dotenv').config();
import { router } from './routes/root';
import { scheduleJob } from './scheduler';
import { logger } from '@repo/winston-logger/index';

const app = express();

app.use(cors({origin: '*', methods: 'GET,POST,PUT,DELETE'}));
app.use("/api/v1", router);

const PORT = process.env.PORT || 4001;



app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
    scheduleJob();
})