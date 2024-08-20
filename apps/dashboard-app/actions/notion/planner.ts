'use server'

import { createNotionPageAction, modifyNotionPageAction, queryAllNotionDatabaseAction } from "./notion"

export const getCalendarSummary = async ({apiToken, calendarDbId}:any) => {
    let filters:any= [
        {
            name: 'Completed',
            type: 'checkbox',
            condition: 'equals',
            value: false
        },
        {
            name: 'Not Completed',
            type: 'checkbox',
            condition: 'equals',
            value: false
        }
    ]
    let sorts:any = [
        {
            name: 'Created time',
            type: 'created_time',
            direction: 'descending'
        }
    ]
    const calendar = await queryAllNotionDatabaseAction({apiToken, database_id: calendarDbId, filters, sorts})
    const tasks = calendar.results.filter((task:any) => task['Tags'].includes('Task'))
    const habits = calendar.results.filter((task:any) => task['Tags'].includes('Habit'))
    const payments = calendar.results.filter((task:any) => task['Tags'].includes('Financial'))
    return {tasks, habits, payments}
}

export const getTasksSummary = async ({apiToken, eisenhowerMatrixDbId}:any) => {
    let filters:any= [
        {
            name: 'Done',
            type: 'checkbox',
            condition: 'equals',
            value: false
        }
    ]
    let sorts:any = [
        {
            name: 'Created time',
            type: 'created_time',
            direction: 'descending'
        }
    ]
    const tasks = await queryAllNotionDatabaseAction({apiToken, database_id: eisenhowerMatrixDbId, filters, sorts})
    const uiTasks = tasks.results.filter((task:any) => task['Urgent']===true && task['Important']===true)
    const uniTasks = tasks.results.filter((task:any) => task['Urgent']===true && task['Important']===false)
    const nuiTasks= tasks.results.filter((task:any) => task['Urgent']===false && task['Important']===true)
    return {
        uiTasks, uniTasks, nuiTasks
    }
}

export const getWeeklyPlannerSummary = async ({apiToken, weeklyPlannerDbId}:any) => {
    let filters:any= [
        {
            name: 'Completed',
            type: 'checkbox',
            condition: 'equals',
            value: false
        }
    ]
    let sorts:any = [
        {
            ame: 'Created time',
            type: 'created_time',
            direction: 'descending'
        }
    ]
    const weeklyPlannerTasks = await queryAllNotionDatabaseAction({apiToken, database_id: weeklyPlannerDbId, filters, sorts})
    if (weeklyPlannerTasks.results.length === 0){
        return {
            weeklyPlannerTasks: [],
            totalHoursLeft: 0
        }
    }
    const totalHoursLeft = weeklyPlannerTasks.results.reduce((acc:any, task:any) => acc + task['Remaining Time (in Hrs)'], 0)
    return {
        weeklyPlannerTasks,
        totalHoursLeft
    }
}

export const createTimeTrackingPage = async ({apiToken, timeTrackingDbId, properties}:any) => {
    const response = await createNotionPageAction({apiToken, dbId: timeTrackingDbId, properties})
    return response
}

export const updateTimeTrackingPage  = async ({apiToken, properties, pageId}:any) => {
    const response = await modifyNotionPageAction({apiToken,  properties, pageId})
    return response
}