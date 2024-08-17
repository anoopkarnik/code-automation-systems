'use client'
import React, { useEffect, useState } from 'react'
import SkillTreeCard from './SkillTreeCard'
import { useRouter, useSearchParams } from 'next/navigation'
import BreadCrumb from './BreadCrumb'

const SkillTrees = ({skillTreeItems}:any) => {

    const [skillTrees, setSkillTrees] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const [parents, setParents] = useState<any[]>([])

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
            setSkillTrees(skillTrees)
        }
        fetchSkillTrees()
    },[skillTreeItems,searchParams])

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
        <div className='grid grid-cols-3 gap-4 mx-4 my-4'>
            {skillTrees.map((item:any) =>(
                <div key={item.id} className='cursor-pointer' onClick={()=> selectParentId(item.id)}>
                    <SkillTreeCard skillTree={item}/>
                </div>
            ))}
                    
        </div>
    </div>
  )
}

export default SkillTrees