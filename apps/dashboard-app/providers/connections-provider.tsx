'use client'

import React, {createContext, useContext, useState} from 'react'

export type ConnectionProviderProps = {
    notionNode: {
        notionId: string,
        accessToken: string,
        workspacename: string,
        accountsDb: {
            id: string | undefined,
            name: string,
            icon: string
        },
        transactionsDb: {
            id: string | undefined,
            name: string,
            icon: string
        },
        monthlyBudgetDb: {
            id: string | undefined,
            name: string,
            icon: string
        },
        budgetPlanDb: {
            id: string | undefined,
            name: string,
            icon: string
        }
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
        },
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

    const values = {
        notionNode,
        openAINode,
        setNotionNode,
        setOpenAINode,
        isLoading,
        setIsLoading
    }

    return <Provider value={values}>{children}</Provider>   
}