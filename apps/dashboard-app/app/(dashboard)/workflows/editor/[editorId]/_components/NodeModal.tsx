'use client'

import { Button } from '@repo/ui/molecules/shadcn/Button';
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@repo/ui/molecules/shadcn/Dialog';
import 'reactflow/dist/style.css';
import DynamicIcon from '../../../../../../components/DynamicIcon';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet';
import NodeSheet from './NodeSheet';

const NodeModal = ({node, type, types}: any) => {

  const [selectedType, setSelectedType] = useState<any>({})

  const onTypeSelect = (type: any) => {
    setSelectedType(type)
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='text-xl font-medium mt-2'>
            {node.length === 0 ? "Create" : "Edit"} {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-1/2 max-w-3xl">
          <div className='flex w-full h-[50vh] '>
            <div className='flex flex-col w-1/3 overflow-auto border-border/30 border-r-2'>
              {types.map((type: any) => (
                <div onClick={() => onTypeSelect(type)} key={type.id}
                className='flex justify-start items-center gap-2 p-2 mr-4 hover:bg-destructive/10 cursor-pointer'>
                    <div>
                        <DynamicIcon icon={type.icon} />
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
                  <NodeSheet key={subType.id} funcType="create" nodeType={type} type={selectedType} subType={subType} />
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