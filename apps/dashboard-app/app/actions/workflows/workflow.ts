'use server'

import {createWorkflow, editWorkflow, getWorkflowsByUserId, publishWorkflow,  deleteWorkflow, getEventsByIdAndUserId, 
    getActiveWorkflowsByUserId, getWorkflowById,
    deleteTrigger,
    deleteAction,
    getActionTypes,
    getTriggerTypes,
    createTrigger,
    createAction,
    getLatestEventByWorkflowId,
    updateAction,
    updateTrigger,
    makeWorkflowPublic,
    getPublicWorkflows
} from '@repo/prisma-db/repo/workflow';
import {logger} from '@repo/winston-logger/index';

export const createWorkflowAction = async ({name,description,userId}:any) => {
    try{
        const workflow = await createWorkflow({name,description,userId});
        return {success: "Workflow created successfully", result: workflow}
    }
    catch (error) {
        return {error: "Workflow creation failed"}
    }

}

export const getWorkflows = async (userId:string) => {
    const workflows = await getWorkflowsByUserId(userId);
    return workflows;
}

export const getPublicWorkflowsAction = async () => {
    const workflows = await getPublicWorkflows();
    return workflows;
}

export const editFlow = async (workflowId:string, name:string, description: string) => {
    logger.info('Editing workflow',workflowId, name, description);
    const workflow = await editWorkflow(workflowId,name,description);
    return workflow;
}

export const publishFlow = async (workflowId:string, state:boolean) => {
    try{
        await publishWorkflow(workflowId,state);
        return {success: "Workflow published/unpublished successfully"}
    }
    catch (error) {
        return {error: "Workflow published/unpublished successfully"}
    }
}

export const makeFlowPublic = async (workflowId:string, state:boolean) => {
    try{
        await makeWorkflowPublic(workflowId,state);
        return {success: "Workflow made public/unpublic successfully"}
    }
    catch (error) {
        return {error: "Workflow made public/unpublic successfully"}
    }
}

export const deleteFlow= async (workflowId:string) => {
    try{
        await deleteWorkflow(workflowId); 
        return {success: "Workflow deleted successfully"}
    }
    catch (error) {
        return {error: "Workflow not deleted successfully"}
    }
 
}

export const getLatestEventByWorkflowIdAction = async (workflowId:string) => {
    const event= await getLatestEventByWorkflowId(workflowId);
    return event;
}

export const getEventsByWorkflowIdAndUserId = async (workflowId:string, userId: string, offset: number) => {
    const events:any = await getEventsByIdAndUserId(workflowId,userId,offset);
    return events;
}

export const getActiveWorkflows = async (userId:string) => {
    const workflows = await getActiveWorkflowsByUserId(userId);
    return workflows;
}

export const getWorkflow = async (workflowId:string) => {
    const workflow = await getWorkflowById(workflowId);
    return workflow;
}

export const deleteTriggerAction = async (id:string) => {
    try{
        await deleteTrigger(id);
        return {success: "Trigger deleted successfully"}
    }
    catch (error) {
        return {error: "Trigger not deleted successfully"}
    }
}


export const deleteActionAction = async (id:string) => {
    try{
        await deleteAction(id);
        return {success: "Action deleted successfully"}
    }
    catch (error) {
        return {error: "Action not deleted successfully"}
    }
}

export const getActionTypesAction = async () => {
    const actionTypes = await getActionTypes();
    return actionTypes;
}

export const getTriggerTypesAction = async () => {
    const triggerTypes = await getTriggerTypes();
    return triggerTypes;
}

export const createTriggerAction = async({workflowId, triggerId, metadata}:any) => {
    try{
        const trigger = await createTrigger({workflowId, triggerId, metadata});
        return {success: "Trigger created successfully", result: trigger}
    }
    catch (error) {
        return {error: "Trigger creation failed"}
    }
}

export const createActionAction = async({workflowId, actionId, metadata,sortingOrder}:any) => {
    try{
        const action = await createAction({workflowId, actionId, metadata,sortingOrder});
        return {success: "Action created successfully", result: action}
    }
    catch (error) {
        return {error: "Action creation failed"}
    }
}

export const duplicateWorkflow = async (workflowId:string,userId:any) => {
    try{
        const workflow = await getWorkflowById(workflowId);
        const newWorkflow = await createWorkflow({
            name: workflow?.name +" Duplicated", description: workflow?.description, userId:userId, publish: false,share:false});
        const trigger:any = workflow?.trigger;

        const actions:any = workflow?.actions;
        await createTrigger({workflowId: newWorkflow.id, triggerId: trigger.triggerId, metadata: trigger.metadata});
        for (let i=0; i<actions.length; i++){
            await createAction({
                workflowId: newWorkflow.id, actionId: actions[i].actionId, metadata: actions[i].metadata,
                sortingOrder: actions[i].sortingOrder});
        }
        return {success: "Workflow duplicated successfully", result: newWorkflow}
    }
    catch (error) {
        return {error: "Workflow duplication failed"}
    }
}

export const updateTriggerAction = async({id,triggerId, metadata}:any) => {
    try{
        const trigger = await updateTrigger(id, triggerId, metadata);
        return {success: "Trigger updated successfully", result: trigger}
    }
    catch (error) {
        return {error: `Trigger update failed due to ${error}`}
    }
}

export const updateActionAction = async({id,actionId, metadata}:any) => {
    try{
        const action = await updateAction(id, actionId, metadata);
        return {success: "Action updated successfully", result: action}
    }
    catch (error) {
        return {error: `Action update failed due to ${error}`}
    }
}

export const runWorkflow = async (editorId:string) => {
    logger.info('Running workflow',editorId);
    try{
        const res = await fetch(`/api/hooks/catch/${editorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'runType': 'Just a Trial Run','runTime': new Date().toISOString()})
        })
        const data = await res.json();
        return {success: "Workflow run successfully", result: data}
    }
    catch (error) {
        return {error: "Workflow run failed"}
    }
}

export const runPythonCode = async (code:string) => {
    const body = JSON.stringify({"code_string":code});
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_WORKER_URL}/payload`, options)
    console.log('res',res)
    if (!res.ok){
        return {error: "Python code execution failed", result: res.text() + " " + res.status,success:"wtf"}
    }
    const data = await res.json();
    return {success: "Python code executed successfully", result: data,error:""}
    
}