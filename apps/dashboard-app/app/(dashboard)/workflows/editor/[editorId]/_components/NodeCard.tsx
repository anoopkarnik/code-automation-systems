import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import React from 'react'
import DynamicIcon from '../../../../../../components/DynamicIcon'
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog'
import { TrashIcon } from 'lucide-react'
import NodeSheet from './NodeSheet'
import NodeAccordion from './NodeAccordion'

const NodeCard = ({funcType, nodeType, node, type, subType, handleDelete}:any) => {
  return (
    <Card className='min-w-[40%] flex flex-col items-start justify-center'>
        <CardHeader className='w-full'>
            <CardTitle className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <DynamicIcon icon={type.icon}/>
                    {subType.name} - {node.sortingOrder}
                </div>
                <ConfirmDialog 
                    alertActionFunction={()=>handleDelete(node.id,nodeType)} 
                    alertTitle='Delete Node' 
                    alertDescription='Are you sure you want to delete this node?'
                    buttonDiv={<TrashIcon/>}
                    alertActionText='Delete'
                    />    
            </CardTitle>
            <CardDescription>{subType.description}</CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
            <NodeAccordion node={node}/>
            <NodeSheet funcType={funcType} nodeType={nodeType} type={type} subType={subType} node={node} />   
        </CardContent>
    </Card>
  )
}

export default NodeCard