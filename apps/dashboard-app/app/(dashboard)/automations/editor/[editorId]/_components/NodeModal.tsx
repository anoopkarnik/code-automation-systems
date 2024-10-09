'use client'

import { Button } from '@repo/ui/atoms/shadcn/Button';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@repo/ui/molecules/shadcn/Dialog';
import 'reactflow/dist/style.css';
import DynamicIcon from '../../../../../../components/DynamicIcon';
import NodeSheet from './NodeSheet';
import { TRIGGER_TYPES,ACTION_TYPES } from '../../../../../../lib/constant';
import { getActionTypesAction, getTriggerTypesAction } from '../../../../../actions/workflows/workflow';

const NodeModal = ({node, type}: any) => {

  const [selectedType, setSelectedType] = useState<any>({})
  const [actionTypes, setActionTypes] = useState<any>([])
  const [triggerTypes, setTriggerTypes] = useState<any>([])

  useEffect(() => {
    const setTypes = async () =>{
      const actionTypes = await getActionTypesAction()
      setActionTypes(actionTypes)
      const triggerTypes = await getTriggerTypesAction()
      setTriggerTypes(triggerTypes)
    }
    setTypes() 
  },[])

  const onTypeSelect = (type: any) => {
    setSelectedType(type)
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg">
            {node.length === 0 ? "Create" : "Edit"} {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-1/2 max-w-3xl">
          <div className='flex w-full h-[50vh] '>
            <div className='flex flex-col w-1/3 overflow-auto border-border/30 border-r-2'>
              {type=="Action" && actionTypes.map((type: any) => (
                <div onClick={() => onTypeSelect(type)} key={type.name}
                className='flex justify-start items-center gap-2 p-2 mr-4 hover:bg-destructive/10 cursor-pointer'>
                    <div>
                      <DynamicIcon icon={type.icon}/>
                    </div>
                    <div>{type.name}</div>
                </div>
              ))}
              {type=="Trigger" &&  triggerTypes.map((type: any) => (
                <div onClick={() => onTypeSelect(type)} key={type.name}
                className='flex justify-start items-center gap-2 p-2 mr-4 hover:bg-destructive/10 cursor-pointer'>
                    <div>
                      <DynamicIcon icon={type.icon}/>
                    </div>
                    <div>{type.name}</div>
                </div>
              ))}
            </div>
            <div className='flex flex-col w-2/3 overflow-auto'>
            {selectedType?.types?.length > 0 && (
              <>
                <div className='ml-2 border-b-2 border-border/30 pb-2 '>
                  <DialogTitle>{selectedType?.name}</DialogTitle>
                  <DialogDescription>{selectedType?.description}</DialogDescription>
                </div>
                {selectedType?.types?.map((subType: any) => (
                  <NodeSheet key={subType.name} funcType="create" nodeType={type} type={selectedType} subType={subType} />
                ))}
              </>)
            }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NodeModal