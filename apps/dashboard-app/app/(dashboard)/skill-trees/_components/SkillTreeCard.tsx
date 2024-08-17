import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import React from 'react'

const SkillTreeCard = ({skillTree}:any) => {
  return (
    <Card className="flex flex-col items-center justify-between ">
        <CardHeader className="flex flex-col items-center justify-center gap-2 ">
            <CardTitle className="text-center text-lg">{skillTree["Skill Tree Name"]}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col '>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Children</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Subchild Total"]}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Notes</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Self"].length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Attachments</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Areas"].length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Videos</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Videos"].length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Projects</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Projects"].length}</CardDescription>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default SkillTreeCard