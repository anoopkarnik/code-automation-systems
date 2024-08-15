import React from 'react'
import CreatePage from './CreatePage';
import UpdatePage from './UpdatePage';
import AppendBlock from './AppendBlock';
import DeletePage from './DeletePage';
import QueryDatabase from './QueryDatabase';

const Notion = ({funcType,nodeType,type,subType,node}:any) => {
  if (subType.name === 'Create Page'){
    return <CreatePage funcType={funcType} type={type} subType={subType} node={node}/>
  }else if (subType.name === 'Update Page'){
    return <UpdatePage funcType={funcType} type={type} subType={subType} node={node}/>
  }else if (subType.name === 'Append Block'){
    return <AppendBlock funcType={funcType} type={type} subType={subType} node={node}/>
  }else if (subType.name === 'Delete Page'){
    return<DeletePage funcType={funcType} type={type} subType={subType} node={node}/>
  }else if (subType.name === 'Query Database'){
    return <QueryDatabase funcType={funcType} type={type} subType={subType} node={node}/>
  }
}

export default Notion