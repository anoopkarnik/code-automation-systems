'use client'

import React, {createContext, useContext, useState} from 'react'

export type ConnectionProviderProps = {
    notionNode: {
        accessToken: string,
        workspacename: string
    },
    openAINode: {
        accessToken: string 
    },
    workflowTemplate: {
        notion?: string
    }
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    setOpenAINode: React.Dispatch<React.SetStateAction<any>>
    setWorkflowTemplate: React.Dispatch<React.SetStateAction<
        {
            notion?: string
        }
    >>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type ConnectionWithChildProps = {
    children: React.ReactNode
}

export const InitialValues: ConnectionProviderProps = {
    notionNode:{
        accessToken: '',
        workspacename: ''
    },
    openAINode: {
        accessToken: ''
    },
    workflowTemplate: {
        notion: ''
    },
    isLoading: false,
    setNotionNode: () => undefined,
    setOpenAINode: () => undefined,
    setIsLoading: () => undefined,
    setWorkflowTemplate: () => undefined
}

const ConnectionsContext = createContext(InitialValues)
const { Provider } = ConnectionsContext

export const ConnectionsProvider = ({children}: ConnectionWithChildProps) => {

    const [notionNode, setNotionNode] = useState(InitialValues.notionNode)
    const [openAINode, setOpenAINode] = useState(InitialValues.openAINode)
    const [workflowTemplate, setWorkflowTemplate] = useState(InitialValues.workflowTemplate)
    const [isLoading, setIsLoading] = useState(InitialValues.isLoading)

    const values = {
        notionNode,
        openAINode,
        workflowTemplate,
        setNotionNode,
        setOpenAINode,
        setWorkflowTemplate,
        isLoading,
        setIsLoading
    }

    return <Provider value={values}>{children}</Provider>   
}

export const useNodeConnections = () =>{
    const nodeConnection = useContext(ConnectionsContext)
    return { nodeConnection }
}