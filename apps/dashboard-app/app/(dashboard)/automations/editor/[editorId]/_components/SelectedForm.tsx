import React from 'react'
import Schedule from './trigger-forms/schedule/Schedule'
import WebhookTrigger from './trigger-forms/webhook/WebhookTrigger'
import WebhookAction from './action-forms/webhook/WebhookAction'
import Code  from './action-forms/code/Code'
import Notion from './action-forms/notion/Notion'

const SelectedForm = ({funcType, nodeType,type,subType,node}: any) => {
    if (type.name == 'Notion' && nodeType == 'Action'){
        return <Notion funcType={funcType} type={type} subType={subType} node={node}/>
    }
    else if (type.name == 'Schedule' && nodeType == 'Trigger'){
        return <Schedule funcType={funcType} type={type} subType={subType} node={node}/>
    }
    else if (type.name == 'Webhook' && nodeType == 'Trigger'){
        return <WebhookTrigger funcType={funcType} type={type} subType={subType} node={node}/>
    }
    else if (type.name == 'Webhook' && nodeType == 'Action'){
        return <WebhookAction funcType={funcType} type={type} subType={subType} node={node}/>
    }
    else if (type.name == 'Code'){
        return <Code funcType={funcType} type={type} subType={subType} node={node}/>
    }
  
}

export default SelectedForm