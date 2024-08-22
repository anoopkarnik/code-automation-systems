'use client'

import React, { use, useContext, useEffect, useState } from 'react'
import { skillTreeTypes } from '../../../lib/constant'
import { ConnectionsContext } from '../../../providers/connections-provider'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useMedia,} from 'react-use'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import { queryAllNotionDatabaseAction } from '../../../actions/notion/notion'
import SkillTrees from './_components/SkillTrees'
import { useRouter, useSearchParams } from 'next/navigation'
import { BookOpenCheckIcon, SettingsIcon } from 'lucide-react'
import Settings from './_components/Settings'
import Notes from './_components/Notes'
import { set } from 'date-fns'
import LoadingCard from '@repo/ui/organisms/auth/LoadingCard'

const SkillTreePage = () => {
    const [skillTreeType , setSkillTreeType] = useState('')
    const [skillTrees, setSkillTrees] = useState([])
    const [selfAreas, setSelfAreas] = useState([])
    const connectionsContext = useContext(ConnectionsContext);
    const skillTreesDbId = connectionsContext?.notionNode?.skillTreesDb?.id
    const areasDbId = connectionsContext?.notionNode?.areasDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken
    const isMobile = useMedia("(max-width: 1324px)", false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!skillTreesDbId || !apiToken){
            return
        }
        const fetchSkillTrees = async () => {
            setLoading(true)
            let filters:any = []
            let sorts:any = []
            const response = await queryAllNotionDatabaseAction({apiToken, database_id: skillTreesDbId,filters,sorts})
            setSkillTrees(response.results)
            setLoading(false)
        }
        fetchSkillTrees()
    },[skillTreesDbId, apiToken])

    useEffect(() => {
        if (!areasDbId || !apiToken){
            return
        }
        const fetchAreas = async () => {
            let filters:any = [
                {name: 'Knowledge Type', type: 'select', condition: 'equals', value: 'Self'}
            ]
            let sorts:any = []
            const response = await queryAllNotionDatabaseAction({apiToken, database_id: areasDbId,filters,sorts})
            setSelfAreas(response.results)
        }
        fetchAreas()
    },[areasDbId, apiToken])

    const selectType  = (type:any) =>{
        setSkillTreeType(type)
        const params = new URLSearchParams(searchParams.toString())
        params.set('type', type)
        params.set('parentId', '')
        router.push(`?${params.toString()}`)
    }

    if (loading){
        return <div>
            <LoadingCard title="Skill Trees and Notes"
             description="Fetching data from your skill tree and areas notion pages"/>
        </div>
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
                        <SelectItem key={"Settings"} value={"Settings"}>
                            <div className='flex items-center justify-start gap-4 w-[200px]'>
                                <SettingsIcon/>
                                <div>{"Settings"}</div>
                            </div>
                        </SelectItem>
                        <SelectItem key={"Review"} value={"Review"}>
                            <div className='flex items-center justify-start gap-4 w-[200px]'>
                                <BookOpenCheckIcon/>
                                <div>{"Review"}</div>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                {
                    skillTreeType==='Settings' ? <Settings/> : (
                    skillTreeType==='Review' ?<Notes title="Notes" ids={[]} data={selfAreas} /> : 
                    <SkillTrees skillTreeItems={skillTrees} selfAreaItems={selfAreas}/> )
                }
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
                <TabsTrigger onClick={()=>selectType('Review')} value='Review' className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <BookOpenCheckIcon/>
                    <div>Review</div>
                </TabsTrigger>
            </TabsList>
            {
                skillTreeType==='Settings' ? <Settings/> : (
                skillTreeType==='Review' ?<Notes title="Notes" ids={[]} data={selfAreas} /> :
                <SkillTrees skillTreeItems={skillTrees} selfAreaItems={selfAreas}/>)
            }
        </Tabs>
    )
}

export default SkillTreePage