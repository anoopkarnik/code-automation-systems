import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs';
import Notion from './action-forms/Notion';
import Webhook from './action-forms/Webhook';
import Schedule from './action-forms/Schedule';

const ActionTabs = ({type,actionType,subActions,node}:any) => {
    const [subActionType, setSubActionType] = useState(undefined) as any;

    const onSubActionTypeChange = (value:any) => {
        setSubActionType(value);
    }

  return (
    <div className='mt-10 w-full' >
      <Tabs onValueChange={onSubActionTypeChange} className='mt-4'>
        <TabsList>
          {subActions?.map((subAction:any) => (
              <TabsTrigger key={subAction} value={subAction}>{subAction}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={subActionType}>
          {
            actionType === 'Notion'  && <Notion/> 
          }
          {
            actionType === 'Webhook'  && 
            <Webhook type={type} actionType={actionType} subActionType={subActionType} node={node}/> 
          }  
          {
            actionType === 'Schedule'  && 
            <Schedule type={type} actionType={actionType} subActionType={subActionType} node={node}/> 
          }  
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default ActionTabs;