'use client'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'
import React from 'react'
import Workflowform from './_components/WorkflowForm'
import { createWorkflowAction } from '../../actions/workflows/workflow'
import { useSession } from 'next-auth/react'
import Workflows from './_components/Workflows'
import Event from './editor/[editorId]/_components/Event'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import PublicWorkflows from './_components/PublicWorkflows'

const Page = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  return (
    <div className='flex '>
    <Event/>
      <div className='w-full mt-4 flex flex-col items-center'>
      <Tabs className='w-full' defaultValue='My Automations'>
        <TabsList className='flex items-center justify-start flex-wrap rounded-none ml-8 gap-4 bg-inherit'>
            <TabsTrigger key="My Automations" value="My Automations" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <div>My Automations</div>
            </TabsTrigger>
            <TabsTrigger key="Public Automations" value="Public Automations" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <div>Public Automations</div>
            </TabsTrigger>
        </TabsList>
        <TabsContent value='My Automations' className='ml-8 flex flex-col items-center'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg">Create New Automation</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create a New  Automation</SheetTitle>
                <SheetDescription>
                  Give the name and description of the automation. 
                </SheetDescription>
              </SheetHeader>
              <Workflowform onSubmit={createWorkflowAction} userId={userId}/>
              <SheetFooter >
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Workflows/>
        </TabsContent>
        <TabsContent value='Public Automations' className='ml-8'>
          <PublicWorkflows/>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}

export default Page