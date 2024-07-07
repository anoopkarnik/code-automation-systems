import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs';
import ActionForm from './ActionForm';

const ActionTabs = ({type,actionType,subActions,node}:any) => {
    const [subActionType, setSubActionType] = useState(undefined) as any;
    const [params, setParams] = useState([] as any);

    const onSubActionTypeChange = (value:any) => {
        setParams(subActions.find((subAction:any) => subAction.subActionType === value)?.params || [])
        setSubActionType(value);
    }

  return (
    <div className='mt-10 w-full' >
      <Tabs onValueChange={onSubActionTypeChange} className='mt-4'>
        <TabsList>
          {subActions.map((subAction:any) => (
              <TabsTrigger value={subAction.subActionType}>{subAction.subActionType}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={subActionType}>
          <ActionForm type={type} actionType={actionType} subActionType={subActionType} params={params} node={node}/>   
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default ActionTabs;