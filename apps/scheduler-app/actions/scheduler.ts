'use server'
import cron from 'node-cron';
import { createCalendarPage} from '@repo/notion/notion-functions/calendar/add_calendar_to_page'

const schedulerToCalender = async () => {
    await createCalendarPage({});
}

export const initializeScheduler = async() =>{
    cron.schedule('*/30 * * * *',async() =>{
         await schedulerToCalender();
    })
}