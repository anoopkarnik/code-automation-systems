'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'
import useConnection from '../hooks/useConnection'
import { useSession } from 'next-auth/react'
import { getNotionInfo } from '../app/actions/notion/notion'
import { getYoutubeConnection } from '../app/actions/connections/youtube-connections'

export type ConnectionProviderProps = {
    notionNode: {
        notionId: string,
        accessToken: string,
        workspacename: string | any,
        accountsDb: { id: string | undefined, name: string, icon: string} | any,
        transactionsDb: {id: string | undefined,name: string, icon: string} | any,
        monthlyBudgetDb: {id: string | undefined, name: string,icon: string} | any,
        budgetPlanDb: { id: string | undefined, name: string, icon: string} | any,
        financialGoalsDb: {id: string | undefined,name: string,icon: string} | any,
        booksDb: {id: string | undefined,name: string,icon: string} | any,
        quickCaptureDb: {id: string | undefined,name: string,icon: string} | any,
        areasDb: {id: string | undefined,name: string,icon: string} | any,
        archiveDb: {id: string | undefined,name: string,icon: string} | any,
        interestingDb: {id: string | undefined,name: string,icon: string} | any,
        podcastsDb: {id: string | undefined,name: string,icon: string} | any,
        videosDb: {id: string | undefined,name: string,icon: string} | any,
        skillTreesDb: {id: string | undefined,name: string,icon: string} | any,
        channelsDb: {id: string | undefined,name: string,icon: string} | any,
        projectsDb: {id: string | undefined,name: string,icon: string} | any,
        blogsDb: {id: string | undefined,name: string,icon: string} | any,
        placeOfWorkDb: {id: string | undefined,name: string,icon: string} | any,
        schedulerDb: {id: string | undefined,name: string,icon: string} | any,
        calendarDb: {id: string | undefined,name: string,icon: string} | any,
        eisenhowerMatrixDb: {id: string | undefined,name: string,icon: string} | any,
        actionsDb: {id: string | undefined,name: string,icon: string} | any,
        timeTrackingDb: {id: string | undefined,name: string,icon: string} | any,
        weeklyPlannerDb: {id: string | undefined,name: string,icon: string} | any,
        socialSphereDb: {id: string | undefined,name: string,icon: string} | any,
        passwordsDb: {id: string | undefined,name: string,icon: string} | any,
        journalDb: {id: string | undefined,name: string,icon: string} | any,
        inventoryDb: {id: string | undefined,name: string,icon: string} | any,
        statusDb: {id: string | undefined,name: string,icon: string} | any,
        goalsDb: {id: string | undefined,name: string,icon: string} | any,
        rewardsDb: {id: string | undefined,name: string,icon: string} | any,
        punishmentsDb: {id: string | undefined,name: string,icon: string} | any,


    },
    openAINode: {
        accessToken: string 
    },
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    setOpenAINode: React.Dispatch<React.SetStateAction<any>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type ConnectionWithChildProps = {
    children: React.ReactNode
}

export const InitialValues: ConnectionProviderProps = {
    notionNode:{
        notionId: '',
        accessToken: '',
        workspacename: '',
        accountsDb: {id:undefined, name: '', icon: ''} ,
        transactionsDb: { id:undefined, name: '', icon: ''},
        monthlyBudgetDb: { id:undefined, name: '',icon: ''},
        budgetPlanDb: { id:undefined,name: '', icon: ''},
        financialGoalsDb: {id:undefined,name: '',icon: '' },
        booksDb: {id:undefined,name: '',icon: '' },
        quickCaptureDb: {id:undefined,name: '',icon: '' },
        areasDb: {id:undefined,name: '',icon: '' },
        archiveDb: {id:undefined,name: '',icon: '' },
        interestingDb: {id:undefined,name: '',icon: '' },
        podcastsDb: {id:undefined,name: '',icon: '' },
        videosDb: {id:undefined,name: '',icon: '' },
        skillTreesDb: {id:undefined,name: '',icon: '' },
        channelsDb: {id:undefined,name: '',icon: '' },
        projectsDb: {id:undefined,name: '',icon: '' },
        blogsDb: {id:undefined,name: '',icon: '' },
        placeOfWorkDb: {id:undefined,name: '',icon: '' },
        schedulerDb: {id:undefined,name: '',icon: '' },
        calendarDb: {id:undefined,name: '',icon: '' },
        eisenhowerMatrixDb: {id:undefined,name: '',icon: '' },
        actionsDb: {id:undefined,name: '',icon: '' },
        timeTrackingDb: {id:undefined,name: '',icon: '' },
        weeklyPlannerDb: {id:undefined,name: '',icon: '' },
        socialSphereDb: {id:undefined,name: '',icon: '' },
        passwordsDb: {id:undefined,name: '',icon: '' },
        journalDb: {id:undefined,name: '',icon: '' },
        inventoryDb: {id:undefined,name: '',icon: '' },
        statusDb: {id:undefined,name: '',icon: '' },
        goalsDb: {id:undefined,name: '',icon: '' },
        rewardsDb: {id:undefined,name: '',icon: '' },
        punishmentsDb: {id:undefined,name: '',icon: '' },
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
            accountsDb: notion_info?.notionDb?.accountsDb,
            transactionsDb:notion_info?.notionDb?.transactionsDb,
            monthlyBudgetDb:notion_info?.notionDb?.monthlyBudgetDb,
            budgetPlanDb:notion_info?.notionDb?.budgetPlanDb, 
            financialGoalsDb:notion_info?.notionDb?.financialGoalsDb,
            booksDb:notion_info?.notionDb?.booksDb,
            quickCaptureDb:notion_info?.notionDb?.quickCaptureDb,
            areasDb:notion_info?.notionDb?.areasDb,
            archiveDb:notion_info?.notionDb?.archiveDb,
            interestingDb:notion_info?.notionDb?.interestingDb,
            podcastsDb:notion_info?.notionDb?.podcastsDb,
            videosDb:notion_info?.notionDb?.videosDb,
            skillTreesDb:notion_info?.notionDb?.skillTreesDb,
            channelsDb:notion_info?.notionDb?.channelsDb,
            projectsDb:notion_info?.notionDb?.projectsDb,
            blogsDb:notion_info?.notionDb?.blogsDb,
            placeOfWorkDb:notion_info?.notionDb?.placeOfWorkDb,
            schedulerDb:notion_info?.notionDb?.schedulerDb,
            calendarDb:notion_info?.notionDb?.calendarDb,
            eisenhowerMatrixDb:notion_info?.notionDb?.eisenhowerMatrixDb,
            actionsDb:notion_info?.notionDb?.actionsDb,
            timeTrackingDb:notion_info?.notionDb?.timeTrackingDb,
            weeklyPlannerDb:notion_info?.notionDb?.weeklyPlannerDb,
            socialSphereDb:notion_info?.notionDb?.socialSphereDb,
            passwordsDb:notion_info?.notionDb?.passwordsDb,
            journalDb:notion_info?.notionDb?.journalDb,
            inventoryDb:notion_info?.notionDb?.inventoryDb,
            statusDb:notion_info?.notionDb?.statusDb,
            goalsDb:notion_info?.notionDb?.goalsDb,
            rewardsDb:notion_info?.notionDb?.rewardsDb,
            punishmentsDb:notion_info?.notionDb?.punishmentsDb,
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