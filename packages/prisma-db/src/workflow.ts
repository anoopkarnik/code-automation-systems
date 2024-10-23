import { WorkflowAction, WorkflowTrigger } from '@prisma/client'
import db from './index'

//Create functions
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

export const createTrigger = async ({workflowId,triggerId,metadata}:any)=>{
    const trigger = await db.workflowTrigger.create({
        data:{
            workflowId,
            triggerId,
            metadata
        }
    })
    return trigger;
}


export const createAction = async ({workflowId,actionId,metadata,sortingOrder}:any)=>{
    const action = await db.workflowAction.create({
        data:{
            workflowId,
            actionId,
            metadata,
            sortingOrder
        }
    })
    return action;
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

//Get Functions 
export const getWorkflowsByUserId = async (userId: string) => {
    if (userId){
        const workflows = await db.workflow.findMany({
            where:{
                userId
            },
            include:{
                actions: {
                    include:{
                        type: {
                            include:{
                                actionType: true
                            }
                        }
                    }
                },
                trigger: {
                    include:{
                        type: {
                            include:{
                                triggerType: true
                            }
                        }
                    }
                }
            },
        })
        return workflows;
    }
}

//Get Functions 
export const getWorkflowsById = async (id: string) => {
    const workflow = await db.workflow.findUnique({
        where:{
            id
        },
        include:{
            actions: {
                include:{
                    type: {
                        include:{
                            actionType: true
                        }
                    }
                }
            },
            trigger: {
                include:{
                    type: {
                        include:{
                            triggerType: true
                        }
                    }
                }
            }
        },
    })
    return workflow;
    
}


export const getPublicWorkflows = async () => {
    const workflows = await db.workflow.findMany({
        where:{
            shared: true
        },
        include:{
            actions: {
                include:{
                    type: {
                        include:{
                            actionType: true
                        }
                    }
                }
            },
            trigger: {
                include:{
                    type: {
                        include:{
                            triggerType: true
                        }
                    }
                }
            }
        },
    })
    return workflows;
}

export const getEventsByIdAndUserId = async(workflowId:string, userId: string, offset: number) => {
    let events;
    if (workflowId === ''){
        events = await db.event.findMany({
            where:{
                Workflows:{
                    userId
                }
            },
            include:{
                Workflows:true
            },
            orderBy:{
                createdAt: 'desc'
            },
            take:20,
            skip: offset
        })
    }
    else{
        events = await db.event.findMany({
            where:{
                workflowId
            },
            include:{
                Workflows:true
            },
            orderBy:{
                createdAt: 'desc'
            },
            take:20
        })
    }
    return events;
}

export const getEventDetailsById = async(eventId:string) => {
    const event = await db.event.findUnique({
        where:{
            id: eventId
        },
        include:{
            Workflows:{
                include:{
                    actions: {
                        include:{
                            type: {
                                include:{
                                    actionType: true
                                }
                            }
                        }
                    },
                }
            }
        }
    })
    return event;
}

export const getLatestEventByWorkflowId = async(workflowId:string) => {
    const event = await db.event.findFirst({
        where:{
            workflowId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return event;
}

export const getActiveWorkflowsByUserId = async (userId:string) => {
    const workflows = await db.workflow.findMany({
        where:{
            publish: true,
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

export const getWorkflowById = async (workflowId: string) => {
    const workflow = await db.workflow.findUnique({
        where:{
            id: workflowId
        },
        include:{
            actions: {
                include:{
                    type: {
                        include:{
                            actionType: true
                        }
                    }
                },
                orderBy:{
                    sortingOrder: 'asc'
                }
            },
            trigger: {
                include:{
                    type: {
                        include:{
                            triggerType: true
                        }
                    }
                }
            }
        }
    })
    return workflow;
}

export const getActionTypes = async () => {
    const actionTypes = await db.workflowActionType.findMany({
        include:{
            types: true
        }
    });
    return actionTypes;
}

export const getTriggerTypes = async () => {
    const triggerTypes = await db.workflowTriggerType.findMany({
        include:{
            types: true
        }
    });
    return triggerTypes;
}

//Edit Functions

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

export const makeWorkflowPublic = async (workflowId: string, state:boolean) => {
    const workflow = await db.workflow.update({
        where:{
            id: workflowId
        },
        data:{
            shared: state
        }
    })
    if(workflow.shared) return 'Workflow made public'
    return 'Workflow made private'
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
         
export const updateEventMetadata = async(eventId:string, metadata:any) => {
    const event = await db.event.update({
        where:{
            id: eventId
        },
        data:{
            metadata
        }
    })
    return event;
}

export const updateTrigger = async(id:string, triggerId:string, metadata:any) => {
    const trigger = await db.workflowTrigger.update({
        where:{
            id: id
        },
        data:{
            metadata,
            triggerId
        }
    })
    return trigger;
}

export const updateAction = async(id:string, actionId:string, metadata:any) => {
    const action = await db.workflowAction.update({
        where:{
            id: id
        },
        data:{
            metadata,
            actionId
        }
    })
    return action;
}

//Delete Functions
export const deleteWorkflow = async (workflowId: string) => {
    const workflow = await db.workflow.delete({
        where:{
            id: workflowId
        }
    })
    return workflow;
}

export const deleteTrigger = async (triggerId: string) => {
    const trigger = await db.workflowTrigger.delete({
        where:{
            id: triggerId
        }
    })
    return trigger;
}

export const deleteAction = async (actionId: string) => {
    const action = await db.workflowAction.delete({
        where:{
            id: actionId
        }
    })
    return action;
}