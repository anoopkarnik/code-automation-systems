'use client'

import React, { use, useContext, useEffect, useState } from 'react'
import { skillTreeTypes, tablesInDatabase } from '../../../lib/constant'
import { ConnectionsContext } from '../../../providers/connections-provider'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useMedia,} from 'react-use'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import { getNotionInfo, queryAllNotionDatabaseAction } from '../../actions/notion/notion'
import SkillTrees from './_components/SkillTrees'
import { useRouter, useSearchParams } from 'next/navigation'
import { BookOpenCheckIcon, SettingsIcon } from 'lucide-react'

import Notes from './_components/Notes'
import LoadingCard from '@repo/ui/organisms/auth/LoadingCard'
import NotionTables from '../../../components/NotionTables'
import Settings from '../../../components/Settings'
import { useSession } from 'next-auth/react'

const SkillTreePage = () => {
    let database = "Knowledge & Skill Development"
    let notionTemplateUrl = ""
    const [selectedValue, setSelectedValue] = useState('Skill Trees')
    const [tables, setTables] = useState({})
    const [skillTreeType , setSkillTreeType] = useState('')
    const [skillTrees, setSkillTrees] = useState([])
    const [selfAreas, setSelfAreas] = useState([])
    const isMobile = useMedia("(max-width: 1324px)", false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const session = useSession()
    const userId = session?.data?.user?.id

    useEffect(() => {
        if(skillTreeType){
            const fetchSkillTreesAndAreas = async () => {
                setLoading(true)
                let skillTreesFilters:any = []
                let sorts:any = []
                const notionInfo:any = await getNotionInfo(userId || '')
                let apiToken = notionInfo.accessToken
                let skillTreesDbId = notionInfo.notionDb.skillTreesDb.id
                const skillTreesResponse = await queryAllNotionDatabaseAction({apiToken, database_id:skillTreesDbId,skillTreesFilters,sorts})
                let areasFilters:any = [
                    {name: 'Knowledge Type', type: 'select', condition: 'equals', value: 'Self'}
                ]
                let areasDbId = notionInfo.notionDb.areasDb.id
                const areasResponse = await queryAllNotionDatabaseAction({apiToken, database_id: areasDbId,areasFilters,sorts})
                console.log('areasResponse',areasResponse)
                setSelfAreas(areasResponse.results)
                setSkillTrees(skillTreesResponse.results)
                setLoading(false)
            }
            fetchSkillTreesAndAreas()
        }
    },[ userId,skillTreeType])

    useEffect(() =>{
        if (tablesInDatabase && tablesInDatabase[database]) {
          setTables(tablesInDatabase[database])
        }
      }, [database])

    const selectType  = (type:any) =>{
        setSelectedValue(type)
        setSkillTreeType(type)
        const params = new URLSearchParams(searchParams?.toString())
        params.set('type', type)
        params.set('parentId', '')
        router.push(`?${params.toString()}`)
    }
    const handleSelect = (value:any) => {
        if (value == "Settings" && value == "Notion Tables"){
            setSelectedValue(value)
        }
        else{
            console.log('value',value)
            selectType(value)
        }
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
                <Select onValueChange={handleSelect}>
                    <SelectTrigger className='my-4 mx-8 w-[200px]'>
                        <div>{selectedValue}</div>
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
                        <SelectItem key="Review Notes" value="Review Notes">
                            <div className='flex items-center justify-start gap-4 w-[200px]'>
                            <div>Review Notes</div>
                            </div>
                        </SelectItem>
                        <SelectItem key="Notion Tables" value="Notion Tables">
                            <div className='flex items-center justify-start gap-4 w-[200px]'>
                            <div>Notion Tables</div>
                            </div>
                        </SelectItem>
                        <SelectItem key="Settings" value="Settings">
                            <div className='flex items-center justify-start gap-4 w-[200px]'>
                            <div>Settings</div>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                
                    {selectedValue === 'Review Notes' && <Notes title="Notes" ids={[]} data={selfAreas} />}
                    {selectedValue !== 'Review Notes' && selectedValue !== 'Notion Tables' && selectedValue !== 'Settings' &&  <SkillTrees skillTreeItems={skillTrees} selfAreaItems={selfAreas}/>}
                    {selectedValue === 'Notion Tables' && <NotionTables tables={tables}/>}
                    {selectedValue === 'Settings' && <Settings tables={tables} notionTemplateUrl={notionTemplateUrl}/>}
                
            </div>
        )
    }
    return (
        <Tabs className='w-full' defaultValue='Review Notes'>
            <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
                {skillTreeTypes.map((type:any) =>(
                    <TabsTrigger onClick={()=>selectType(type.title)} key={type.title} value={type.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <type.icon/>
                    <div>{type.title}</div>
                    </TabsTrigger>
                ))}
                <TabsTrigger onClick={()=> handleSelect("Review Notes")}  key="Review Notes" value="Review Notes" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <div>Review Notes</div>
                </TabsTrigger>
                <TabsTrigger onClick={()=> handleSelect("Notion Tables")}  key="Notion Tables" value="Notion Tables" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <div>Notion Tables</div>
                </TabsTrigger>
                <TabsTrigger onClick={()=> handleSelect("Settings")}  key="Settings" value="Settings" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                    <div>Settings</div>
                </TabsTrigger>
            </TabsList>
            {selectedValue === 'Review Notes' && <Notes title="Notes" ids={[]} data={selfAreas} />}
            {selectedValue !== 'Review Notes' && selectedValue !== 'Notion Tables' && selectedValue !== 'Settings' &&  <SkillTrees skillTreeItems={skillTrees} selfAreaItems={selfAreas}/>}
            {selectedValue === 'Notion Tables' && <NotionTables tables={tables}/>}
            {selectedValue === 'Settings' && <Settings tables={tables} notionTemplateUrl={notionTemplateUrl}/>}
        </Tabs>
    )
}

export default SkillTreePage