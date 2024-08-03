import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import HeaderCard from '@repo/ui/molecules/common/HeaderCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { getAreasDatabaseSummary, getBooksDatabaseSummary, getInterestingDatabaseSummary, getQuickCaptureDatabaseSummary } from '../../../../actions/notion/knowledgeBase';
import InterestingForm from './InterestingForm';
import { Checkbox } from '@repo/ui/molecules/shadcn/Checkbox';
import { modifyNotionPageAction } from '../../../../actions/notion/notion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import CreateBooksForm from './CreateBooksForm';
import UpdateBooksForm from './UpdateBooksForm';

const Overview = () => {

  const connectionsContext = useContext(ConnectionsContext);
  const apiToken = connectionsContext?.notionNode?.accessToken
  const quickCaptureDbId = connectionsContext?.notionNode?.quickCaptureDb?.id
  const interestingDbId = connectionsContext?.notionNode?.interestingDb?.id
  const areasDbId = connectionsContext?.notionNode?.areasDb?.id
  const booksDbId = connectionsContext?.notionNode?.booksDb?.id

  const [interesting, setInteresting] = useState<any>([])
  const [quickCaptures, setQuickCaptures] = useState<any>([])
  const [totalAreas, setTotalAreas] = useState<any>([])
  const [selfAreas, setSelfAreas] = useState<any>([])
  const [notSelfAreas, setNotSelfAreas] = useState<any>([])
  const [stillToCategorizeAreas, setStillToCategorizeAreas] = useState<any>([])
  const [allBooks, setAllBooks] = useState<any>([])
  const [toReadNonFictionBooks, setToReadNonFictionBooks] = useState<any>([])
  const [currentlyReadingNonFictionBooks, setCurrentlyReadingNonFictionBooks] = useState<any>([])
  const [readNonFictionBooks, setReadNonFictionBooks] = useState<any>([])

  useEffect(() => {
    const updateSummary = async () => {
      try{
        if (!apiToken || !quickCaptureDbId || !interestingDbId || !areasDbId  || !booksDbId) {
          return
        }
        const {interesting}:any = await getInterestingDatabaseSummary({apiToken,database_id:interestingDbId})
        setInteresting(interesting.results)
        const {quickCapture}:any = await getQuickCaptureDatabaseSummary({apiToken,database_id:quickCaptureDbId})
        setQuickCaptures(quickCapture.results)
        const {totalAreas, selfAreas, notSelfAreas, stillToCategorizeAreas}:any = await getAreasDatabaseSummary({apiToken,database_id:areasDbId})
        setTotalAreas(totalAreas.results)
        setSelfAreas(selfAreas)
        setNotSelfAreas(notSelfAreas)
        setStillToCategorizeAreas(stillToCategorizeAreas)
        const { allBooks, toReadNonFictionBooks, currentlyReadingNonFictionBooks, readNonFictionBooks }:any = await getBooksDatabaseSummary({apiToken,database_id:booksDbId})
        setAllBooks(allBooks.results)
        setToReadNonFictionBooks(toReadNonFictionBooks)
        setCurrentlyReadingNonFictionBooks(currentlyReadingNonFictionBooks)
        setReadNonFictionBooks(readNonFictionBooks)
      }catch(e){
        console.error('Error in fetching financial summary',e)
      }
    }
    updateSummary()
  },[apiToken, quickCaptureDbId, interestingDbId, areasDbId, booksDbId])

  const handleItemsCheckChange = async (id:string, key:string, value:boolean) => {

    let properties:any = [
      {
        name: key,
        type: 'checkbox',
        value: value
      }
    ]
    await modifyNotionPageAction({apiToken,page_id: id, properties})

  } 



  return (
    <div className='w-[95%] mx-[2.5%] my-6 '>
    <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
      <HeaderCard title='Interesting Things Left' description='Interesting things still to read' value={`${interesting.length}`}/>
      <HeaderCard title='Quick Captures To Categorize' description='Quick Captures still left to move to an area and assign to a skill tree' value={`${quickCaptures.length}`}/>
      <HeaderCard title='Non Fictional Books to Read' description='Non Fictional Books to read or discard based on value to my own path' value={`${toReadNonFictionBooks.length}`}/>
      <HeaderCard title='Currently Reading Non Fictional Books' description='Non Fictional Books currently reading' value={`${currentlyReadingNonFictionBooks.length}`}/>
      <HeaderCard title='Partially Read Non Fictional Books' description='Non Fictional Books partially read and postponed for future' value={`${readNonFictionBooks.length}`}/>
      <HeaderCard title='Total Areas' description='Total Areas ' value={`${totalAreas.length}`}/>
      <HeaderCard title='Self Areas' description='Areas created by myself' value={`${selfAreas.length}`}/>
      <HeaderCard title='Not Self Areas' description='Areas saved made by others ' value={`${notSelfAreas.length}`}/>
      <HeaderCard title='Areas to be Categorized' description='Areas still to be categorized as part of a skill tree ' value={`${stillToCategorizeAreas.length}`}/>
    </div>
    <div>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
              <div> Add New Books, New Quick Captures, Areas, Interesting</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <InterestingForm/>
            <CreateBooksForm/>
            <UpdateBooksForm/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
                <div> Interesting things to check out </div>
              </div>
            </AccordionTrigger>
              <AccordionContent>
                  <div className='my-4  mx-2 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                      {interesting?.map((task:any) => (
                          <Card>
                            <CardHeader>
                              <CardTitle className='flex items-center justify-start gap-2'>
                                <div className='overflow-hidden'>{task['Name']}</div>
                                {task['URL'] && 
                                  <Link href={task['URL']} passHref={true} rel="noopener noreferrer" target="_blank">
                                    <LinkIcon className='w-5 h-5' />
                                  </Link>
                                }
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className='text-xs overflow-clip'>{task['Details']}</div>
                            </CardContent>
                            <CardFooter>
                                <Checkbox id ='completed' className='col-span-1' onCheckedChange={()=> handleItemsCheckChange(task.id,'Done',!task.Done)}/>
                            </CardFooter>
                          </Card>
                      ))}
                  </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      
    </div>
  </div>
  )
}

export default Overview