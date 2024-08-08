import React from 'react'
import Notion from './action-forms/Notion'
import Schedule from './action-forms/Schedule'
import WebhookTrigger from './action-forms/WebhookTrigger'
import WebhookAction from './action-forms/WebhookAction'

const SelectedForm = ({type,subType,node}: any) => {
    if (type.name == 'Notion'){
        return <Notion/>
    }
    else if (type.name == 'Schedule'){
        return <Schedule type={type} subType={subType}/>
    }
    else if (type.name == 'Webhook' && subType.name == 'Internal Webhook'){
        return <WebhookTrigger type={type} subType={subType} node={node}/>
    }
    else if (type.name == 'Webhook' && subType.name == 'External Webhook'){
        return <WebhookAction type={type} subType={subType} node={node}/>
    }
  
}

export default SelectedForm