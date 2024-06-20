import {createNotionPage, modifyNotionPage, queryNotionDatabase} from '../modify'
import moment from 'moment-timezone'
import { logger } from '@repo/winston-logger/index';

interface CalendarPageProps {
    calendar_db_id?: string
    scheduler_db_id?: string
    timebox_db_id?: string
}

interface SchedulerDetailsProps {
  location?: string
  scheduler_db_id: string
}

export const createCalendarPage = async({
  calendar_db_id=process.env.CALENDAR_DB_ID,
  scheduler_db_id=process.env.SCHEDULER_DB_ID,
  timebox_db_id=process.env.TIMEBOX_DB_ID
}:CalendarPageProps) =>{
    const location = await getCurrentLocation({timebox_db_id});
    logger.info(`Current Location: ${location}`);
    const schedulerDetails = await getSchedulerDetails({location,scheduler_db_id});
    logger.info(`Current Scheduler details length - ${schedulerDetails.length}}`);
    for (const row of schedulerDetails){
        const page_id = row['id'];
        let properties = []
        properties.push({'name':'Name','type':'title','value':row['Name']})
        properties.push({'name':'Tags','type':'multi_select','value':[row['Type']]})
        properties.push({'name':'Scheduler','type':'relation','value':[page_id]})
        let repeat_type = row['Repeat Type']
        let time = row['Time']
        let time_zone = row['Time Zone']
        let repeat_number = row['Repeat Number']
        const local_tz = moment.tz(time_zone)
        const local_time = moment(new Date())
        let start_date = moment(row['Start Date']);
        let scheduled_time = null;
        if (start_date.isBefore(local_time) && (repeat_type === 'daily' || repeat_type === 'weekly')) {
            scheduled_time = moment(`${local_time.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HHmm');
          } else if (start_date.isBefore(local_time) && repeat_type === 'monthly') {
            scheduled_time = moment(`${local_time.format('YYYY-MM')}-${start_date.format('DD')} ${time}`, 'YYYY-MM-DD HHmm');
          } else if (start_date.isBefore(local_time) && repeat_type === 'yearly') {
            scheduled_time = moment(`${local_time.format('YYYY')}-${start_date.format('MM-DD')} ${time}`, 'YYYY-MM-DD HHmm');
        }
        if (!scheduled_time) {
            continue;
        }
        let time_since_last_trigger = null;
        let triggered = false;
        
        if (row['Last Triggered Date']) {
            const last_triggered_time = row['Last Triggered Date'];
            const local_last_triggered_time = moment(last_triggered_time, 'YYYY-MM-DD');
            time_since_last_trigger = local_time.diff(local_last_triggered_time,'minutes');
        }
        let local_time_diff_scheduled = local_time.diff(scheduled_time,'minutes')
        if (repeat_type === 'off') {
            continue;
          } else if (repeat_type === 'daily') {
            if (time_since_last_trigger && time_since_last_trigger/3600 < repeat_number) {
              continue;
            }
            if (local_time_diff_scheduled < 35 && local_time_diff_scheduled>0 ) {
              triggered = true;
            }
          } else if (repeat_type === 'weekly') {
            const days_of_week = row['Days Of Week'];
            if (time_since_last_trigger && time_since_last_trigger/3600 < 7 * repeat_number) {
              continue;
            }
            if (days_of_week.includes(local_time.format('dddd')) && local_time_diff_scheduled< 35 && local_time_diff_scheduled>0) {
              triggered = true;
            }
          } else if (repeat_type === 'monthly') {
            if (time_since_last_trigger && time_since_last_trigger/3600 <= 28 * repeat_number) {
              continue;
            }
            if (local_time.date() === scheduled_time.date() && 0 < local_time_diff_scheduled && local_time_diff_scheduled< 35) {
              triggered = true;
            }
          } else if (repeat_type === 'yearly') {
            if (time_since_last_trigger && time_since_last_trigger/3600 < 365 * repeat_number) {
              continue;
            }
            if (local_time.date() === scheduled_time.date() && local_time.month() === scheduled_time.month() && 0 < local_time_diff_scheduled && local_time_diff_scheduled < 35) {
              triggered = true;
            }
          }
          
          if (triggered) {
            const response = await createNotionPage({database_id:calendar_db_id, properties});
            
            const page_properties = [
              { name: 'Last Triggered Date', type: 'date', value: local_time.format('YYYY-MM-DD') }
            ];
            
            const modifyResponse = await modifyNotionPage({page_id, properties:page_properties});
          }

    }
    return ;
}

export const getSchedulerDetails = async ({location,scheduler_db_id}:any):Promise<any> =>{
    const currentTimeGmt = moment().format('YYYY-MM-DD');
    let filters:any = [];
    filters.push({'name': 'Start Date', 'type': 'date', 'condition': 'on_or_before', 'value': currentTimeGmt})
    filters.push({'name': 'Location', 'type': 'multi_select', 'condition': 'contains', 'value': location})
    let response = await queryNotionDatabase({database_id: scheduler_db_id, filters: filters})
    let results = response.results;
    return results;
}

const getCurrentLocation = async ({timebox_db_id}:any):Promise<any> => {   
    let filters = [];
    filters.push({"name":"End Time", 'type': 'date','condition':'is_empty','value':true})
    let response = await queryNotionDatabase({database_id: timebox_db_id, filters: filters})
  
    let results = response.results;
    if (results && Array.isArray(results) && results.length > 0){
        for (let row =0;row<results.length;row++){
            if (results[row]?.['Action Name'] === 'Parents'){
                return results[row]['Action Name']
            }
            else if (results[row]['Action Name'] === 'Short Vacation'){
                return results[row]['Action Name']
            }
            else if (results[row]['Action Name'] === 'Long Vacation'){
                return results[row]['Action Name']
            }
        }
    }
    return 'Home'
}