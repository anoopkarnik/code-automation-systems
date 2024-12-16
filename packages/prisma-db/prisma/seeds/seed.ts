import { PrismaClient } from '@prisma/client'
import { createWorkflowTriggers } from './workflowTriggers'
import { createWorkflowActions } from './workflowActions'

const prisma = new PrismaClient()

async function main () {
    await createWorkflowTriggers()
    await createWorkflowActions()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })