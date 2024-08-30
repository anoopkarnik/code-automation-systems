'use client'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'
import React from 'react'
import Workflowform from './_components/WorkflowForm'
import { createWorkflowAction } from '../../../actions/workflows/workflow'
import { useSession } from 'next-auth/react'
import Workflows from './_components/Workflows'
import Event from './editor/[editorId]/_components/Event'

const Page = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  return (
    <div className='flex '>
    <Event/>
      <div className='w-full mt-4 flex flex-col items-center'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg">Create New Workflow</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create a New Workflow Automation</SheetTitle>
              <SheetDescription>
                Give the name and description of the workflow. 
              </SheetDescription>
            </SheetHeader>
            <Workflowform onSubmit={createWorkflowAction} userId={userId}/>
            <SheetFooter >
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Workflows/>
      </div>
    </div>
  )
}

export default Page