import { WorkflowAction, WorkflowTrigger } from '@prisma/client'
import db from './index'


interface GetWorkflowProps {
    name: string
    id: string
    description: string | null
    userId: string
    publish: boolean
    lastRun: string | null
    trigger?: WorkflowTrigger | null
    actions?: WorkflowAction[] | null

}

export const createWorkflow = async ({name,description,userId}:any) => {
    const workflow = await db.workflow.create({
        data:{
            name,
            description,
            userId,
        }
    })
    return workflow;
}

export const getWorkflowsByUserId = async (userId: string) => {
    if (userId){
        const workflows = await db.workflow.findMany({
            where:{
                userId
            }
        })
        return workflows;
    }
}

export const editWorkflow = async (workflowId: string, name: string, description: string) => {
    const workflow = await db.workflow.update({
        where:{
            id: workflowId
        },
        data:{
            name: name,
            description: description
        }
    })
}

export const startAction = async (id:string,actionId: string) => {
    const node = await db.node.update({
        where:{
            id
        },
        data:{
            actionId
        }
    })
    return node;
}



export const publishWorkflow = async (workflowId: string, state:boolean) => {
    const workflow = await db.workflow.update({
        where:{
            id: workflowId
        },
        data:{
            publish: state
        }
    })
    if(workflow.publish) return 'Workflow published'
    return 'Workflow unpublished'
}

export const updateWorkflowLastRun = async (workflowId: string, lastRun: string) => {
    const workflow = await db.workflow.update({
        where:{
            id: workflowId
        },
        data:{
            lastRun: lastRun
        }
    })
    return workflow
}


export const getNodesByWorkflowId = async (id: string) => {
    const nodes = await db.workflow.findFirst({
        where:{
            id
        },
        include:{
            nodes: true
        }
    })
    return nodes;
}

export const getActiveWorkflows = async () => {
    const workflows = await db.workflow.findMany({
        where:{
            publish: true
        },
        include:{
            nodes: true
        }
    })
    if (workflows){
        return workflows;
    }
    else{
        return [];
    
    }
}

export const createNode = async ({name,description,workflowId,type,userId,actionType,subActionType,actionData,actionId}:any) => {
    const node = await db.node.create({
        data:{
            name,
            description,
            workflowId,
            type,
            userId,
            actionType,
            subActionType,
            actionData,
            actionId
        }
    })
    return node;
}

export const editNode = async ({id,name,description,workflowId,type,userId,actionType,subActionType,actionData,actionId}:any) => {
    const node = await db.node.update({
        where: {
            id
        },
        data:{
            name,
            description,
            workflowId,
            type,
            userId,
            actionType,
            subActionType,
            actionData,
            actionId
        }
    })
    return node;
}


export const deleteWorkflow = async (workflowId: string) => {
    const workflow = await db.workflow.delete({
        where:{
            id: workflowId
        }
    })
    return workflow;
}

export const deleteNode = async (nodeId: string) => {
    const node = await db.node.delete({
        where:{
            id: nodeId
        }
    })
    return node;
}

export const createEvent = async(workflowId:string, status:string, metadata:any) => {
    await db.$transaction( async (tx) => {
        const event = await tx.event.create({
            data:{
                workflowId,
                status,
                metadata
            }
        })
        await tx.eventOutbox.create({
            data:{
                eventId: event.id
            }
        })
    })
}

export const updateEvent = async(eventId:string, status:string) => {
    const event = await db.event.update({
        where:{
            id: eventId
        },
        data:{
            status
        }
    })
    return event;
}

export const getEventsById = async(workflowId:string) => {
    const events = await db.event.findMany({
        where:{
            workflowId: workflowId
        },
        include:{
            Workflows:true
        },
        orderBy:{
            createdAt: 'desc'
        },
        take:20
    })
    return events;
}

