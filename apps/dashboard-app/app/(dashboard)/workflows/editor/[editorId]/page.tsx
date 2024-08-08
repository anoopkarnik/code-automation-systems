'use client'

import React from 'react'
import { EditorProvider } from '../../../../../providers/editor-provider';
import Nodes from './_components/Nodes';
import Event from './_components/Event';

const page = () => {


  return (
    <div className='min-h-screen w-full'>
        <div className='w-full flex '>
          <EditorProvider>
              <div className='hidden md:block'>
                <Event/>
              </div>
              <div className='w-full flex flex-col items-center gap-10 my-10  '>
                <Nodes/>
              </div>
          </EditorProvider>
      </div>
    </div>
  )
}

export default page