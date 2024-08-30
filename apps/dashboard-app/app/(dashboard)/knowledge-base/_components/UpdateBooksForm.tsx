import { Button } from '@repo/ui/molecules/shadcn/Button'
import { Input } from '@repo/ui/molecules/shadcn/Input'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import {  modifyNotionPageAction, queryAllNotionDatabaseAction } from '../../../../actions/notion/notion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import {FloatingLabelInput} from '@repo/ui/molecules/custom/FloatingLabelInput'

const UpdateBooksForm = () => {
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

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState<any>({})
    const [searchBookQuery, setSearchBookQuery] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([])
    const [status, setStatus] = useState('')
    const [rating, setRating] = useState('')
    const [booksOrChaptersPublished, setBooksOrChaptersPublished] = useState(0)
    const [booksOrChaptersRead, setBooksOrChaptersRead] = useState(0)

    useEffect(() => {
        const getBooks = async () => {
            try{
                if (!apiToken || !booksDbId) {
                return
                }
                let filters:any = []
                let sorts:any = []
                const books = await queryAllNotionDatabaseAction({apiToken,database_id:booksDbId,filters,sorts})
                setBooks(books.results)
                setFilteredBooks(books.results)
            }catch(e){
                console.error('Error in fetching books',e)
            }
        }
        getBooks()

    },[apiToken, booksDbId])

    const selectBook = async (id:any) => {
        const book:any = books?.find((book:any) => book.id === id)
        setSelectedBook(book)
        setStatus(book.Status)
        setRating(book.Rating)
        setBooksOrChaptersPublished(book['Books or Chapters Published'])
        setBooksOrChaptersRead(book['Books or Chapters Read'])
    }

    const handleBook = async (event:any) => {
        const query = event.target.value.toLowerCase();
        setSearchBookQuery(query)
        setFilteredBooks(books?.filter((book:any) => {
        if(book.Name ===null) return
        return book.Name.toLowerCase().includes(query)
        }));
    }

    const handleUpdateBooks= async () => {
        if (!selectedBook.id ) {
            return
        }
        const properties:any = [
            {name:'Status',type: 'select', value: status},
            {name:'Rating',type: 'select', value: rating},
            {name:'Books or Chapters Published',type: 'number', value: booksOrChaptersPublished},
            {name:'Books or Chapters Read',type: 'number', value: booksOrChaptersRead},
        ]

        const dbId = booksDbId
        const response = await modifyNotionPageAction({apiToken, dbId, pageId:selectedBook?.id, properties})
    }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <Select value={selectedBook.id} onValueChange={(value) => selectBook(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Book`}/>
                </SelectTrigger>
                <SelectContent>
                    <Input placeholder='Search Book' className='w-full' value={searchBookQuery} onChange={handleBook} />
                    {filteredBooks.length> 0 && filteredBooks?.map((book:any) => (
                        <SelectItem key={book.id} value={book.id}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{book.Name}</div>
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
        </div>
        <Button onClick={handleUpdateBooks} size="lg"  variant='secondary'>Update Book</Button>
    </div>
  )
}

export default UpdateBooksForm