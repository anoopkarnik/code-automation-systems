'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'
import useConnection from '../hooks/useConnection'
import { useSession } from 'next-auth/react'
import { getNotionInfo } from '../app/dashboard/financial/_actions/notion'

export type ConnectionProviderProps = {
    notionNode: {
        notionId: string,
        accessToken: string,
        workspacename: string | any,
        accountsDb: {
            id: string | undefined,
            name: string,
            icon: string
        } | any,
        transactionsDb: {
            id: string | undefined,
            name: string,
            icon: string
        } | any,
        monthlyBudgetDb: {
            id: string | undefined,
            name: string,
            icon: string
        } | any,
        budgetPlanDb: {
            id: string | undefined,
            name: string,
            icon: string
        } | any,
        financialGoalsDb: {
            id: string | undefined,
            name: string,
            icon: string
        } | any
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
        accountsDb: {
            id:undefined,
            name: '',
            icon: ''
        } ,
        transactionsDb: {
            id:undefined,
            name: '',
            icon: ''
        },
        monthlyBudgetDb: {
            id:undefined,
            name: '',
            icon: ''
        },
        budgetPlanDb: {
            id:undefined,
            name: '',
            icon: ''
        },
        financialGoalsDb: {
            id:undefined,
            name: '',
            icon: ''
        }
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
        const notion_info = await getNotionInfo(userId || '')
    //   const openAi_info = await getOpenAIByUserId(userId || '')
      if (notion_info){
        setNotionNode({notionId: notion_info?.id,accessToken:notion_info?.accessToken,workspacename:notion_info?.workspaceName,
            accountsDb: notion_info?.notionDb?.accountsDb,transactionsDb:notion_info?.notionDb?.transactionsDb,
            monthlyBudgetDb:notion_info?.notionDb?.monthlyBudgetDb,budgetPlanDb:notion_info?.notionDb?.budgetPlanDb, financialGoalsDb:notion_info?.notionDb?.financialGoalsDb})
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