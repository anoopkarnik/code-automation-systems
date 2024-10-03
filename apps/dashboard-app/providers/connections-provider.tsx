'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'
import useConnection from '../hooks/useConnection'
import { useSession } from 'next-auth/react'
import { getNotionInfo } from '../app/actions/notion/notion'
import { getYoutubeConnection } from '../app/actions/connections/youtube-connections'

type ConnectionWithChildProps = {
    children: React.ReactNode
}

export const InitialValues: any = {
    notionNode:{
        notionId: '',
        accessToken: '',
        workspacename: '',
        projectsDb: {id:undefined, name: '', icon: ''} ,
        epicsDb: { id:undefined, name: '', icon: ''},
        projectTasksDb: { id:undefined, name: '',icon: ''},
        sprintsDb: { id:undefined,name: '', icon: ''},
        bugsDb: {id:undefined,name: '',icon: '' },
        assetsDb: {id:undefined,name: '',icon: '' },
        transactionsDb: {id:undefined,name: '',icon: '' },
        budgetDb: {id:undefined,name: '',icon: '' },
        fundsDb: {id:undefined,name: '',icon: '' },
        tasksDb: {id:undefined,name: '',icon: '' },
        schedulerDb: {id:undefined,name: '',icon: '' },
        calendarDb: {id:undefined,name: '',icon: '' },
        durationBasedActionsDb: {id:undefined,name: '',icon: '' },
        timeTrackingDb: {id:undefined,name: '',icon: '' },
        weeklyFocusPlannerDb: {id:undefined,name: '',icon: '' },
        quickCaptureDb: {id:undefined,name: '',icon: '' },
        skillTreesDb: {id:undefined,name: '',icon: '' },
        areasDbId: {id:undefined,name: '',icon: '' },
        archiveDb: {id:undefined,name: '',icon: '' },
        interestingDb: {id:undefined,name: '',icon: '' },
        booksDb: {id:undefined,name: '',icon: '' },
        podcastsDb: {id:undefined,name: '',icon: '' },
        youtubeChannelsDb: {id:undefined,name: '',icon: '' },
        videosDb: {id:undefined,name: '',icon: '' },
        inventoryDb: {id:undefined,name: '',icon: '' },
        socialSphereDb: {id:undefined,name: '',icon: '' },
        statusDb: {id:undefined,name: '',icon: '' },
        exercisesDb: {id:undefined,name: '',icon: '' },
        journalDb: {id:undefined,name: '',icon: '' },
        moodCategoryDb: {id:undefined,name: '',icon: '' },
        moodTrackerDb: {id:undefined,name: '',icon: '' },
        blogDb: {id:undefined,name: '',icon: '' },
        goalsDb: {id:undefined,name: '',icon: '' },
        rewardsDb: {id:undefined,name: '',icon: '' },
        punishmentsDb: {id:undefined,name: '',icon: '' },
        decisionsDb: {id:undefined,name: '',icon: '' },
        levelSettingsDb: {id:undefined,name: '',icon: '' },
        peopleDb: {id:undefined,name: '',icon: '' },
    },
    openAINode: {
        accessToken: ''
    },
    isLoading: false,
    setNotionNode: () => undefined,
    setOpenAINode: () => undefined,
    setIsLoading: () => undefined
}

export const ConnectionsContext = createContext(InitialValues)
const { Provider } = ConnectionsContext

export const ConnectionsProvider = ({children}: ConnectionWithChildProps) => {

    const [notionNode, setNotionNode] = useState(InitialValues.notionNode)
    const [openAINode, setOpenAINode] = useState(InitialValues.openAINode)
    const [isLoading, setIsLoading] = useState(InitialValues.isLoading)
    const session = useSession();
    const userId = session.data?.user?.id;

  useEffect(() =>{
    const onAddConnection = async () =>{
        const notion_info:any = await getNotionInfo(userId || '')

    //   const openAi_info = await getOpenAIByUserId(userId || '')
      if (notion_info){
        setNotionNode({notionId: notion_info?.id,accessToken:notion_info?.accessToken,workspacename:notion_info?.workspaceName,
            projectsDb: notion_info?.projectsDb,
            epicsDb: notion_info?.epicsDb,
            projectTasksDb: notion_info?.projectTasksDb,
            sprintsDb: notion_info?.sprintsDb,
            bugsDb: notion_info?.bugsDb,
            assetsDb: notion_info?.assetsDb,
            transactionsDb: notion_info?.transactionsDb,
            budgetDb: notion_info?.budgetDb,
            fundsDb: notion_info?.fundsDb,
            tasksDb: notion_info?.tasksDb,
            schedulerDb: notion_info?.schedulerDb,
            calendarDb: notion_info?.calendarDb,
            durationBasedActionsDb: notion_info?.durationBasedActionsDb,
            timeTrackingDb: notion_info?.timeTrackingDb,
            weeklyFocusPlannerDb: notion_info?.weeklyFocusPlannerDb,
            quickCaptureDb: notion_info?.quickCaptureDb,
            skillTreesDb: notion_info?.skillTreesDb,
            areasDbId: notion_info?.areasDbId,
            archiveDb: notion_info?.archiveDb,
            interestingDb: notion_info?.interestingDb,
            booksDb: notion_info?.booksDb,
            podcastsDb: notion_info?.podcastsDb,
            youtubeChannelsDb: notion_info?.youtubeChannelsDb,
            videosDb: notion_info?.videosDb,
            inventoryDb: notion_info?.inventoryDb,
            socialSphereDb: notion_info?.socialSphereDb,
            statusDb: notion_info?.statusDb,
            exercisesDb: notion_info?.exercisesDb,
            journalDb: notion_info?.journalDb,
            moodCategoryDb: notion_info?.moodCategoryDb,
            moodTrackerDb: notion_info?.moodTrackerDb,
            blogDb: notion_info?.blogDb,
            goalsDb: notion_info?.goalsDb,
            rewardsDb: notion_info?.rewardsDb,
            punishmentsDb: notion_info?.punishmentsDb,
            decisionsDb: notion_info?.decisionsDb,
            levelSettingsDb: notion_info?.levelSettingsDb,
            peopleDb: notion_info?.people
        })
      }
    //   if (openAi_info){
    //     connectionsContext.setOpenAINode({apiKey:openAi_info?.apiKey})
    //   }
    }
    if (userId) {
        onAddConnection();
    }
  },[userId])

    const values = {
        notionNode,
        openAINode,
        setNotionNode,
        setOpenAINode,
        isLoading,
        setIsLoading
    }
    useConnection()
    return <Provider value={values}>{children}</Provider>   
}