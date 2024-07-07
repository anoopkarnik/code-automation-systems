'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Label } from '@repo/ui/molecules/shadcn/Label'
import { Switch } from '@repo/ui/molecules/shadcn/Switch'
import Link from 'next/link'
import React, { useState } from 'react'
import { publishFlow } from '../../../../actions/workflows/workflow'

const Workflow = ({workflow}:any) => {

    const [toggle,setToggle] = useState(workflow.publish)

    const onToggle = async () =>{
        setToggle(!toggle)
        await publishFlow(workflow.id,!toggle)
    }
  return (
    <Card className=''>
        <Link href={`/dashboard/workflows/editor/${workflow.id}`}>
            <CardHeader className='  '>
                <CardTitle>{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent className=''>
                
            </CardContent>
        </Link>
        <CardFooter>
            <Label htmlFor='airplane-mode'>
                {toggle? 'On': 'Off'}
            </Label>
            <Switch id='airplane-mode' onClick={onToggle} defaultChecked={workflow.publish!} />
        </CardFooter>
    </Card>
  )
}

export default Workflow