import { Button } from '@repo/ui/molecules/shadcn/Button'
import { Input } from '@repo/ui/molecules/shadcn/Input'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction } from '../../../../actions/notion/notion'
import { Checkboxes } from '@repo/ui/molecules/custom/Checkboxes'
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea'
import { FloatingLabelInput } from '@repo/ui/molecules/custom/FloatingLabelInput'

const InterestingForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    let interestingDbId = connectionsContext?.notionNode?.interestingDb?.id
    let tags = ['Watch','Learn','Research']

    const [name, setName] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [details, setDetails] = useState('')
    const [url, setUrl] = useState('')


      const handleAddInteresting = async () => {
        if (!name || !selectedTags || !details) {
          return
        }
        const properties:any = [
            {name:'Name',type: 'title', value: name},
            {name:'Tags',type: 'multi_select', value: selectedTags},
            {name:'Details',type: 'text', value: details},
            {name:'URL',type: 'url', value: url},
        ]

        const dbId = interestingDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <FloatingLabelInput className='w-[300px]' label='Name' value={name} onChange={(event)=>setName(event.target.value)} />
            <Checkboxes className='w-[300px]' placeholder='Select Tags' options={tags} values={selectedTags} onChange={setSelectedTags} />
            <FloatingLabelInput className='w-[300px]' label='URL' value={url} onChange={(event)=>setUrl(event.target.value)} />
            <Textarea className='w-[300px]' placeholder='Details' value={details} onChange={(event)=>setDetails(event.target.value)} />  
        </div>
        <Button onClick={handleAddInteresting} size="lg" variant='secondary'> Add a Interesting Info</Button>
    </div>
  )
}

export default InterestingForm