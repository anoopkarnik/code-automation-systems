import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function createWorkflowActions() {
    const codeAction = await prisma.workflowActionType.create({
        data:{
            name: 'Code',
            description: 'Run this Code',
            icon: 'Code'
        }
    })

    await prisma.workflowActionSubType.createMany({
        data: [
            {
                "name": "Python Code",
                "typeId": codeAction.id
            },
            {
                "name": "Javascript Code",
                "typeId": codeAction.id
            }
        ]
    })

    const webhookAction = await prisma.workflowActionType.create({
        data:{
            name: 'Webhook',
            description: 'Run this Webhook',
            icon: 'WebhookIcon'
        }
    })

    await prisma.workflowActionSubType.createMany({
        data: [
            {
                "name": "External Webhook",
                "typeId": webhookAction.id
            }
        ]
    })
}