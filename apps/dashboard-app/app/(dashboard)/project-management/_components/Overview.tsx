import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { getNotionPage } from '../../../actions/notion/common';

const Overview = () => {
  const [recordMap, setRecordMap] = useState<any>();
  // useEffect(() =>{
  //   const fetchPage = async () => {
  //     const pageId = 'Project-Management-System-1001d3faa0a0801a9c02fa551c57b0c0';
  //     const recordMap = await getNotionPage(pageId);
  //     setRecordMap(recordMap);
  //   }
  //   fetchPage();
  // })
  return (
    <div className='h-screen flex flex-col items-center my-10 '>
      {/* <h1 className='text-4xl font-medium my-4 text-center'>Still In Construction</h1>
      <Image src="/construction.gif" alt="Overview" width={500} height={500} /> */}
      {/* <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} /> */}
      <iframe src="https://v2-embednotion.com/1001d3faa0a0801a9c02fa551c57b0c0" 
        className='w-[90%] h-[80%] rounded-lg'>
      </iframe>
    </div>
  )
}

export default Overview