import React, { use, useEffect, useState } from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import ActionTabs from './ActionTabs';

const  ActionSelect = ({type,options,node}:any) => {

    const [actionType, setActionType] = useState('');
    const [subActions, setSubActions] = useState([] as any);

    const onActionTypeChange = (value:any) => {
        setSubActions(options.find((option:any) => option.actionType === value)?.subActions || [])
        setActionType(value);
    }
    
  return (
    <div className='mt-4'>
        <Select onValueChange={onActionTypeChange}>
            <SelectTrigger>
                <SelectValue placeholder={`Select ${type} Type`}/>
            </SelectTrigger>
            <SelectContent>
                {
                    options.map((option:any) => (   
                        <SelectItem value={option.actionType}>
                            <div className='flex items-center justify-start gap-4'>
                                <option.icon/> 
                                <div>{option.actionType}</div>
                            </div>

                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
        <ActionTabs type={type} actionType={actionType} subActions={subActions} node={node}/>
    </div>
  )
}

export default ActionSelect