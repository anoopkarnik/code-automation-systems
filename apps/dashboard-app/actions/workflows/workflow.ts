'use server'

import {createWorkflow, editWorkflow, getWorkflowsByUserId, publishWorkflow,  deleteWorkflow,getEventsById} from '@repo/prisma-db/repo/workflow';
import {logger} from '@repo/winston-logger/index';

export const createWorkflowAction = async ({name,description,userId}:any) => {
    logger.info('Creating workflow',name,description,userId);
    const workflow = await createWorkflow({name,description,userId});
    return workflow;
}

export const getWorkflows = async (userId:string) => {
    const workflows = await getWorkflowsByUserId(userId);
    return workflows;
}

export const editFlow = async (workflowId:string, name:string, description: string) => {
    logger.info('Editing workflow',workflowId, name, description);
    const workflow = await editWorkflow(workflowId,name,description);
    return workflow;
}

export const publishFlow = async (workflowId:string, state:boolean) => {
    logger.info('Publishing workflow',workflowId,state);
    await publishWorkflow(workflowId,state);  
}

export const deleteFlow= async (workflowId:string) => {
    logger.info('Deleting workflow',workflowId);
    await deleteWorkflow(workflowId);  
}


export const getEventsByWorkflowId = async (workflowId:string) => {
    const events:any = await getEventsById(workflowId);
    return events;
}