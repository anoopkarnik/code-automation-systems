'use client'

import React, { useContext, useEffect, useState } from 'react'
import { skillTreeTypes } from '../../../lib/constant'
import { ConnectionsContext } from '../../../providers/connections-provider'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useMedia,} from 'react-use'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import { queryAllNotionDatabaseAction } from '../../../actions/notion/notion'
import SkillTrees from './_components/SkillTrees'
import { useRouter, useSearchParams } from 'next/navigation'
import { SettingsIcon } from 'lucide-react'
import Settings from './_components/Settings'

const SkillTreePage = () => {
    const [skillTreeType , setSkillTreeType] = useState('')
    const [skillTrees, setSkillTrees] = useState([])
    const connectionsContext = useContext(ConnectionsContext);
    const skillTreesDbId = connectionsContext?.notionNode?.skillTreesDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken
    const isMobile = useMedia("(max-width: 1324px)", false);
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (!skillTreesDbId || !apiToken){
            return
        }
        const fetchSkillTrees = async () => {
            let filters:any = []
            let sorts:any = []
            const response = await queryAllNotionDatabaseAction({apiToken, database_id: skillTreesDbId,filters,sorts})
            setSkillTrees(response.results)
        }
        fetchSkillTrees()
    },[skillTreesDbId, apiToken])

    const selectType  = (type:any) =>{
        setSkillTreeType(type)
        const params = new URLSearchParams(searchParams.toString())
        params.set('type', type)
        params.set('parentId', '')
        router.push(`?${params.toString()}`)
    }

    if (isMobile){
        return (
            <div className='flex flex-col items-center w-full my-6'>
                <Select onValueChange={(value) => selectType(value)}>
                    <SelectTrigger className='my-4 mx-8 w-[200px]'>
                        <div>{skillTreeType}</div>
                    </SelectTrigger>
                    <SelectContent className='w-[200px]'>
                        {skillTreeTypes.map((type:any) =>(
                            <SelectItem key={type.title} value={type.title}>
                                <div className='flex items-center justify-start gap-4 w-[200px]'>
                                    <type.icon/>
                                    <div>{type.title}</div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <SkillTrees skillTreeItems={skillTrees}/>
            </div>
        )
    }
    return (
        <Tabs className='w-full' defaultValue='overview'>
            <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
                {skillTreeTypes.map((type:any) =>(
                    <TabsTrigger onClick={()=>selectType(type.title)} key={type.title} value={type.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <type.icon/>
                    <div>{type.title}</div>
                    </TabsTrigger>
                ))}
                <TabsTrigger onClick={()=>selectType('Settings')} value='Settings' className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <SettingsIcon/>
                    <div>Settings</div>
                </TabsTrigger>
            </TabsList>
            
            {
                skillTreeType==='Settings' ? 
                <Settings/> : 
                <SkillTrees skillTreeItems={skillTrees}/>
            }
        </Tabs>
    )
}

export default SkillTreePage