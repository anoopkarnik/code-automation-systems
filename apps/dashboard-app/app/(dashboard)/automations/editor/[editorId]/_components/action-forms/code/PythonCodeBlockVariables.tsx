import { Input } from '@repo/ui/atoms/shadcn/Input';
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog'
import { set } from 'date-fns';
import { Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'

const PythonCodeBlockVariables = ({variable,removeVariable,block,index,modifyVariable}:any) => {
    const [key, setKey] = useState(variable.key);
    const [value, setValue] = useState(variable.value);
    const [showKeyEdit, setShowKeyEdit] = useState(false);
    const [showValueEdit, setShowValueEdit] = useState(false);

    const modifyKey = async () =>{
        if (showKeyEdit){
            setKey(key)
            await modifyVariable(block.id,index,key,value)
        }
        setShowKeyEdit(!showKeyEdit)
    }

    const modifyValue = async () =>{
        if (showValueEdit){
            setValue(value)
            await modifyVariable(block.id,index,key,value)
        }
        setShowValueEdit(!showValueEdit)
    }

  return (
    <div className='flex gap-2 items-center'>
        {showKeyEdit ? (
            <Input
                className='w-[30%] break-words whitespace-normal bg-background dark:bg-background dark:text-foreground'
                placeholder={key}
                onChange={(e: any) => setKey(e.target.value)}
                onBlur={modifyKey} // Exit edit mode when clicking outside the input
                autoFocus // Automatically focus the input when entering edit mode
            />):(
        <div onDoubleClick={modifyKey} className='w-[30%] border-[1px] rounded-md p-2 break-words whitespace-normal text-wrap text-paragraph'>
            {key}
        </div>
        )}
        {showValueEdit ? (
            <Input
                className='w-[30%] break-words whitespace-normal bg-background dark:bg-background dark:text-foreground'
                placeholder={value}
                onChange={(e: any) => setValue(e.target.value)}
                onBlur={modifyValue} // Exit edit mode when clicking outside the input
                autoFocus // Automatically focus the input when entering edit mode
            />):(
        <div onDoubleClick={modifyValue}  className='w-[30%] border-[1px] rounded-md p-2 break-words whitespace-normal text-wrap text-paragraph'>
            {value}
        </div>
        )}
        
        <ConfirmDialog
            alertActionFunction={() => removeVariable(block.id, index)} 
            alertTitle='Delete Property' 
            alertDescription='Are you sure you want to delete this property?'
            buttonDiv={<Trash2Icon className='w-5 h-5 cursor-pointer col-span-1 text-foreground/50' />}
            alertActionText='Delete'
        />
    </div>
  )
}

export default PythonCodeBlockVariables