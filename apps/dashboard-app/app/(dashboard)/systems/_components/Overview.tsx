'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider';
import HeaderCard from '@repo/ui/molecules/custom/HeaderCard';
import { queryAllNotionDatabaseAction } from '../../../actions/notion/notion';
import { propertiesInDatabase } from '../../../../lib/constant';

const Overview = ({name,type,prefix,suffix}:any) => {

  const connectionsContext = useContext(ConnectionsContext)

  const apiToken = connectionsContext?.notionNode?.accessToken
  const peopleDbId = connectionsContext?.notionNode?.peopleDb?.id
  const [selectedProperties, setSelectedProperties] = useState<any>({})
  const [peopleData, setPeopleData] = useState<any>({})
  useEffect(() => {
    const updateSummary = async () => {
      try{
          if (!apiToken || !peopleDbId) {
            return
          }
          const peopleData = await queryAllNotionDatabaseAction({apiToken, database_id:peopleDbId})
          let properties = propertiesInDatabase[name]
          setSelectedProperties(properties)
          console.log(peopleData)
          setPeopleData(peopleData.results[0])
      }catch(e){
        console.error('Error in fetching financial summary',e)
      }
    }
    updateSummary()
  },[apiToken, peopleDbId])

  if (!peopleDbId){
    return <div className='flex justify-center items-center h-[50vh]'>
      Please attach the People Notion Db in the Settings Tab
    </div>
  }

  return (
    <div className='w-[95%] mx-[2.5%] my-6 '>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
        {Object.keys(selectedProperties).map((property:any)=>{
          return <HeaderCard title={property} description={selectedProperties[property]} value={peopleData[property]} type={type} prefix={prefix} suffix={suffix}/>
        })}
      </div>
    </div>
  )
}

export default Overview