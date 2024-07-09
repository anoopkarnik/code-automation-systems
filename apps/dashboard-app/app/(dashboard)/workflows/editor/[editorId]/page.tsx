'use client'

import React from 'react'
import { EditorProvider } from '../../../../../providers/editor-provider';
import Nodes from './_components/Nodes';

const page = () => {


  return (
    <div className='min-h-screen w-full'>
      <div className='w-full flex flex-col items-center justify-center gap-10 my-10 '>
        <EditorProvider>
          <Nodes/>
        </EditorProvider>
      </div>
    </div>
  )
}

export default page