import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createWorkflowTriggers() {
    const scheduleTrigger = await prisma.workflowTriggerType.create({
        data:{
            name: 'Schedule',
            description: 'Schedule your workflow',
            icon: 'ClockIcon'
        }
    })

    await prisma.workflowTriggerSubType.createMany({
        data: [
            {
                "name": "Cron",
                "typeId": scheduleTrigger.id
            }
        ]
    })

    const webhookTrigger = await prisma.workflowTriggerType.create({
        data:{
            name: 'Webhook',
            description: 'Start your workflow by a webhook',
            icon: 'WebhookIcon'
        }
    })

    await prisma.workflowTriggerSubType.createMany({
        data: [
            {
                "name": "Internal Webhook",
                "typeId": webhookTrigger.id
            }
        ]
    })
}