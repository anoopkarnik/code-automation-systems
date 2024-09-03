'use client'
import React, { useContext, useEffect, useState }  from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'

import { useMedia } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useRouter, useSearchParams } from 'next/navigation'
import { ConnectionsContext } from '../../../providers/connections-provider'
import Connected from './_components/Connected'
import Connections from './_components/Connections'
import { useSession } from 'next-auth/react';
import { getUserInfo } from '../../actions/connections/user-connections';
import { onNotionConnection } from '../../actions/connections/notion-connections';
import { onYoutubeConnection } from '../../actions/connections/youtube-connections';
import { useToast } from '../../../hooks/useToast';

const PlannerPage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Connected Apps')
  const params = useSearchParams();
  const access_token = params?.get('access_token')
  const refresh_token = params?.get('refresh_token')
  const scopes = params?.get('scopes')
  const workspace_name = params?.get('workspace_name')
  const workspace_icon = params?.get('workspace_icon')
  const workspace_id = params?.get('workspace_id')
  const database_id = params?.get('database_id')
  const apiKey = params?.get('apiKey')
  const type = params?.get('type')
  const session = useSession()
  const user = session?.data?.user
  const userId = user?.id
  const connectionsContext = useContext(ConnectionsContext)
  const {toast} = useToast();


  const handleSelect = (value:any) => {
    setSelectedValue(value)
  }

  const [connections,setConnections] = useState<Record<string,boolean>>({}) 

  useEffect(() =>{
    const onUserConnection = async () =>{
      if (user){
        let response;
        if (type === 'Notion'){    
          response = await onNotionConnection({access_token,workspace_id,workspace_icon,workspace_name,database_id,userId})
          connectionsContext.setNotionNode(response.result)
        }
        if (type === 'Youtube'){
          response = await onYoutubeConnection({access_token,refresh_token,scopes,userId})
        }
        if (response?.success){
          toast({
            title: "Success",
            description: response?.success,
            variant: "default"
          })
        }
        else if (response?.error){
          toast({
            title: "Error",
            description: response?.error,
            variant: "destructive"
          })
        }
        const user_info = await getUserInfo(userId || '')
      
        setConnections(user_info?.connections)
    }
    }
    onUserConnection()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[access_token,refresh_token, scopes, workspace_id,workspace_icon,workspace_name,database_id,apiKey,user,type,userId])


  if (!session) {
    return <div>loading...</div>
  }


  if (isMobile){
    return (
      <div className='flex flex-col items-center w-full my-6'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='my-4 mx-8 w-[200px]'>
            <div>{selectedValue}</div>
          </SelectTrigger>
          <SelectContent className='w-[200px]'>
              <SelectItem key={"Connected Apps"} value={"Connected Apps"}>
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>{"Connected Apps"}</div>
                </div>
              </SelectItem>
              <SelectItem key={"Connections"} value={"Connections"}>
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>{"Connections"}</div>
                </div>
              </SelectItem>
          </SelectContent>
        </Select>
        {selectedValue === 'Connected Apps' && <Connected/>}
        {selectedValue === 'Connections' && <Connections/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='Connected Apps'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
        <TabsTrigger key={"Connected Apps"} value={"Connected Apps"} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <div>{"Connected Apps"}</div>
        </TabsTrigger>
        <TabsTrigger key={'Connections'} value={'Connections'} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <div>{'Connections'}</div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='Connected Apps'>
        <Connected/>
      </TabsContent>
      <TabsContent value='Connections'>
        <Connections/> 
      </TabsContent>
    </Tabs>
  )
}

export default PlannerPage