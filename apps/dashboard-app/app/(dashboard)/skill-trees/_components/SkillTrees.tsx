'use client'
import React, { useEffect, useState } from 'react'
import SkillTreeCard from './SkillTreeCard'
import { useRouter, useSearchParams } from 'next/navigation'
import BreadCrumb from './BreadCrumb'
import { calculateTotalLengthPerType } from '../_action/summary'
import InfoCard from './InfoCard'

const SkillTrees = ({skillTreeItems,selfAreaItems}:any) => {

    const [skillTrees, setSkillTrees] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const [parents, setParents] = useState<any[]>([])
    const [selfAreas, setSelfAreas] = useState<any[]>([])
    const [selfAreasToReview, setSelfAreasToReview] = useState<any[]>(selfAreaItems)

    useEffect(() =>{
        const fetchSkillTrees = async () => {
            const parentId = searchParams.get('parentId')
            const type = searchParams.get('type')

            let skillTrees;

            if (!type) return;
            if (!parentId){
                skillTrees =  skillTreeItems.filter((item:any) => item.Type === type).filter((item:any) => item['Parent-task'].length==0)
                setParents([])
            }
            else{
                skillTrees =  skillTreeItems.filter((item:any) => item.Type === type).filter((item:any) => item['Parent-task'].includes(parentId))
                const selectedParent = skillTreeItems.find((item: any) => item.id === parentId)
                
                if (selectedParent) {
                    setParents(prev => [...prev, selectedParent])
                }
            }
            let selfAreas = selfAreaItems.filter((item:any) => item['Skill Type'].includes(type))
            let selfAreasToReview = selfAreaItems.filter((item:any) => item['Skill Type'].includes(type)).filter((item:any)=>new Date(item['Review Date']) <= new Date())
            setSkillTrees(skillTrees)
            setSelfAreas(selfAreas)
            setSelfAreasToReview(selfAreasToReview)
        }
        fetchSkillTrees()
    },[skillTreeItems,searchParams])

    const [totalNotes, setTotalNotes] = useState([]);
    const [totalAttachments, setTotalAttachments] = useState([]);
    const [totalVideos, setTotalVideos] = useState([]);

    useEffect(() => {
         const fetchTotal = async () => {
            const {notes, attachments, videos} = await calculateTotalLengthPerType(skillTrees, skillTreeItems)
            setTotalNotes(notes)
            setTotalAttachments(attachments)
            setTotalVideos(videos)
        }
        fetchTotal()
    },[skillTreeItems,skillTrees])

    const selectParentId  = (parentId:any) =>{
        const params = new URLSearchParams(searchParams.toString())
        params.set('parentId', parentId)
        router.push(`?${params.toString()}`)
    }

    const handleBreadcrumbClick = (index: number) => {
        if (index < parents.length-1){
            const selectedParent = parents[index];
            const params = new URLSearchParams(searchParams.toString());
            params.set('parentId', selectedParent.id);
            router.push(`?${params.toString()}`);
            setParents(parents.slice(0, index  )); // Trim parents array up to the clicked breadcrumb
        }
    };
  return (
    <div>
        <BreadCrumb parents={parents} onBreadcrumbClick={handleBreadcrumbClick}/>
        <div className='flex items-center flex-wrap gap-4 justify-center'>
            <InfoCard name="Total Notes" value={totalNotes.length} />
            <InfoCard name="Total Attachments" value={totalAttachments.length} />
            <InfoCard name="Total Videos" value={totalVideos.length} />
            <InfoCard name="Total Notes To Review" value={selfAreasToReview.length} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 my-4'>
            {skillTrees.map((item:any) =>(
                <div key={item.id} className='cursor-pointer' onClick={()=> selectParentId(item.id)}>
                    <SkillTreeCard skillTree={item} skillTrees={skillTreeItems} />
                </div>
            ))}
                    
        </div>
    </div>
  )
}

export default SkillTrees