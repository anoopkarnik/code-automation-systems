import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Input } from '@repo/ui/atoms/shadcn/Input';
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select';
import { Trash2Icon } from 'lucide-react';
import React, { useState } from 'react'

const NotionChildrenComponent = ({dbId,access_token,modifyChildrenBody}:any) => {
   let types = ["embed","callout","table_of_contents","heading_1","heading_2","heading_3","paragraph","bulleted_list_item",
    "to_do"]
   const [selectedChildren, setSelectedChildren] = useState<any>([
    {type: "", value: ""}
   ]);

   const modifyChild = (index:any, key:any, value:any) => {
    const pastChildren = [...selectedChildren]
    pastChildren[index][key] = value
    setSelectedChildren(pastChildren)
    modifyChildrenBody(pastChildren)
   }

   const addChildren = () => {
    setSelectedChildren([...selectedChildren,{type: "", value: ""}])
   }

    const removeChildren = (index:any) => {
     setSelectedChildren(selectedChildren.filter((_:any, i:any) => i !== index))
    }
   
  return (
    <div className='rounded-md border-border/30 border-2 p-4 flex flex-col gap-4 '>
        {selectedChildren.map((selectedChild:any,index:any) => (
            <div key={index} className="grid grid-cols-10 gap-2  items-center">
                <div>Type {index+1}</div>
                <Select onValueChange={(value) => modifyChild(index,"type",value)}>
                    <SelectTrigger className='col-span-4'> 
                        {selectedChildren[index].type}
                    </SelectTrigger>
                    <SelectContent>
                    {types.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <Input 
                    placeholder='Enter Value'  
                    className='col-span-4' 
                    onChange={(e) => modifyChild(index,"value",e.target.value)}
                />
                <ConfirmDialog
                    alertActionFunction={() => removeChildren(index)} 
                    alertTitle='Delete Children' 
                    alertDescription='Are you sure you want to delete this children?'
                    buttonDiv={<Trash2Icon className='w-5 h-5 cursor-pointer col-span-1 text-foreground/50' />}
                    alertActionText='Delete'
                />
            </div>
        ))}
        <Button onClick={addChildren} variant="outline" className='mt-4'>Add Children</Button>
    </div>
  )
}

export default NotionChildrenComponent