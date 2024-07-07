import cron from 'node-cron';
import express from 'express';
import cors from 'cors';
require('dotenv').config();
import { router } from './routes/root';
import { scheduleJob } from './scheduler';

const app = express();

app.use(cors({origin: '*', methods: 'GET,POST,PUT,DELETE'}));
app.use("/api/v1", router);

const PORT = process.env.PORT || 4001;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    scheduleJob();
})