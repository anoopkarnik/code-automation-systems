import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import React, { use, useEffect, useState } from 'react'
import SkillTreeDialog from './SkillTreeDialog'
import { calculateTotalLength } from '../_action/summary';

const SkillTreeCard = ({skillTree, skillTrees}:any) => {
    const [totalNotes, setTotalNotes] = useState([]);
    const [totalAttachments, setTotalAttachments] = useState([]);
    const [totalVideos, setTotalVideos] = useState([]);
    const [totalProjects, setTotalProjects] = useState([]);

    useEffect(() => {
         const fetchTotal = async () => {
            const {totalNotes, totalAttachments, totalVideos, totalProjects} = await calculateTotalLength(skillTree, skillTrees)
            setTotalNotes(totalNotes)
            setTotalAttachments(totalAttachments)
            setTotalVideos(totalVideos)
            setTotalProjects(totalProjects)
        }
        fetchTotal()
    },[])
  return (
    <Card className="flex flex-col items-center justify-between ">
        <CardHeader className="flex flex-col items-center justify-center gap-2 ">
            <CardTitle className="text-center text-lg">{skillTree["Skill Tree Name"]}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col '>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Direct Children</CardDescription>
                    <CardDescription className='text-center'>{skillTree["Subchild Total"]}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Notes</CardDescription>
                    <CardDescription className='text-center'>{totalNotes.length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Attachments</CardDescription>
                    <CardDescription className='text-center'>{totalAttachments.length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Videos</CardDescription>
                    <CardDescription className='text-center'>{totalVideos.length}</CardDescription>
                </div>
                <div className='flex items-center justify-between '>
                    <CardDescription className='text-center'>Total Projects</CardDescription>
                    <CardDescription className='text-center'>{totalProjects.length}</CardDescription>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 flex-wrap w-full '>
                <SkillTreeDialog title="Notes" content={totalNotes} />
                <SkillTreeDialog title="Attachments" content={totalAttachments} />
                <SkillTreeDialog title="Videos" content={totalVideos} />
                <SkillTreeDialog title="Projects" content={totalProjects} />
            </div>
        </CardContent>
    </Card>
  )
}

export default SkillTreeCard