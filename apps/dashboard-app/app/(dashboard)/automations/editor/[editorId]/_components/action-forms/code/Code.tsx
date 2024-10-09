import React from 'react'
import {JavascriptCode} from './JavascriptCode';
import {PythonCode} from './PythonCode';

const Code= ({funcType,nodeType,type,subType,node}:any) => {

  if (subType.name === 'Javascript Code'){

    return <JavascriptCode funcType={funcType} type={type} subType={subType} node={node}/>
  }else if (subType.name === 'Python Code'){
    return <PythonCode funcType={funcType} type={type} subType={subType} node={node}/>
  }
}

export default Code