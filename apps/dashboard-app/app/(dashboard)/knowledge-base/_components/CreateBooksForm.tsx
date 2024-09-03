import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction } from '../../../actions/notion/notion'
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import {FloatingLabelInput} from '@repo/ui/molecules/custom/FloatingLabelInput'

const CreateBooksForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const booksDbId = connectionsContext?.notionNode?.booksDb?.id
    let types = ['Psychology','Biography and Autobiography','Software','Non Fiction Misc',
      'Finance','Mental & Emotional Health','Health Fitness & Nutrition','Business','Communications','Learning and Productivity'
    ]
    let statuses = ['To Read','Currently Reading','Partially Read','Read But Unfinished','Abadoned Reading','Read','Not Started Notes',
      'Notes In Progress','Ready for Publication','Published'
    ]

    let ratings = ['Lifechanging','5-Star','4-Star','3-Star','2-Star','1-Star']

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [rating, setRating] = useState('')
    const [details, setDetails] = useState('')
    const [booksOrChaptersPublished, setBooksOrChaptersPublished] = useState(0)
    const [booksOrChaptersRead, setBooksOrChaptersRead] = useState(0)

      const handleAddBooks= async () => {
        if (!name || !type || !status) {
          return
        }
        const properties:any = [
            {name:'Name',type: 'title', value: name},
            {name:'Type',type: 'select', value: type},
            {name:'Status',type: 'select', value: status},
            {name:'Rating',type: 'select', value: rating},
            {name:'Details',type: 'text', value: details},
            {name:'Books or Chapters Published',type: 'number', value: booksOrChaptersPublished},
            {name:'Books or Chapters Read',type: 'number', value: booksOrChaptersRead},
        ]

        const dbId = booksDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <FloatingLabelInput className='w-[300px]' label='Name' value={name} onChange={(event)=>setName(event.target.value)} />
            <Select value={type} onValueChange={(value) => setType(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Type`}/>
                </SelectTrigger>
                <SelectContent>
                    {types.length> 0 && types?.map((type:any) => (
                        <SelectItem key={type} value={type}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{type}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={status} onValueChange={(value) => setStatus(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Status`}/>
                </SelectTrigger>
                <SelectContent>
                    {statuses.length> 0 && statuses?.map((status:any) => (
                        <SelectItem key={status} value={status}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{status}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={rating} onValueChange={(value) => setRating(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Rating`}/>
                </SelectTrigger>
                <SelectContent>
                    {ratings.length> 0 && ratings?.map((rating:any) => (
                        <SelectItem key={rating} value={rating}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{rating}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FloatingLabelInput className='w-[300px]' label='Books or Chapters Published' value={booksOrChaptersPublished} onChange={(event)=>setBooksOrChaptersPublished(Number(event.target.value))} />
            <FloatingLabelInput className='w-[300px]' label='Books or Chapters Read' value={booksOrChaptersRead} onChange={(event)=>setBooksOrChaptersRead(Number(event.target.value))} />
            <Textarea className='w-[300px]' placeholder='Details' value={details} onChange={(event)=>setDetails(event.target.value)} />  
        </div>
        <Button onClick={handleAddBooks} size="lg"  variant='secondary'> Add a Book</Button>
    </div>
  )
}

export default CreateBooksForm