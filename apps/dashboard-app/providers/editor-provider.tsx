'use client'

import React, {createContext, useContext, useState} from 'react'


export type EditorProviderProps = {
    trigger: any,
    actions: any[],
    setTrigger: React.Dispatch<React.SetStateAction<any>>,
    setActions: React.Dispatch<React.SetStateAction<any>>,
    publish: boolean,
    setPublish: React.Dispatch<React.SetStateAction<boolean>>
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,  
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
}

export const InitialValues: EditorProviderProps = {
    trigger: undefined,
    actions: [],
    publish: false,
    name: 'Untitled',
    description: '',
    setTrigger: () => undefined,
    setActions: () => undefined,
    setPublish: () => undefined,
    setName: () => undefined,
    setDescription: () => undefined 
}

export const EditorContext = createContext(InitialValues)
const { Provider } = EditorContext

export const EditorProvider = ({children}:{children:React.ReactNode}) =>{
    const [trigger, setTrigger] = useState(InitialValues.trigger)
    const [actions, setActions] = useState(InitialValues.actions)
    const [publish, setPublish] = useState(InitialValues.publish)
    const [name, setName] = useState(InitialValues.name)    
    const [description, setDescription] = useState(InitialValues.description)   

    const values = {
        trigger, actions, publish,name,description,
        setTrigger,setActions, setPublish, setName,setDescription
    }
    return <Provider value={values}>{children}</Provider>
}