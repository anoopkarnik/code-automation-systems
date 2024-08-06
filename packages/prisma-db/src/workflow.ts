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
            },
            include:{
                actions: {
                    include:{
                        type: true
                    }
                },
                trigger: {
                    include:{
                        type: true
                    }
                }
            },
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


export const deleteWorkflow = async (workflowId: string) => {
    const workflow = await db.workflow.delete({
        where:{
            id: workflowId
        }
    })
    return workflow;
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

