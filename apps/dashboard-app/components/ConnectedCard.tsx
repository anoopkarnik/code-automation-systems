import React, { useState } from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import Image from 'next/image'
import { EditIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteConnectionById, updateConnectionById } from '../app/actions/connections/user-connections'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog'



const ConnectedCard = ({connection}:any) => {

  const [name, setName] = useState(connection.name)
  const [showEdit, setShowEdit] = useState(false)

  const router = useRouter();

  const handleEdit = async() => {
    if (showEdit) {
      setShowEdit(false)
      await updateConnectionById(connection.id, name)
    }
    else {
      setShowEdit(true)
    }
  }

  const handleDelete = async(id:string) => {
    await deleteConnectionById(id)
    router.refresh()
  }


  return (
    <Card className="flex flex-col items-center justify-between ">
      <CardHeader className="flex flex-col items-center justify-center gap-2 w-full ">
        <div className='flex justify-between items-center w-full '>
          <div></div>
          <div className='text-2xl font-bold flex items-center gap-2 '>
            {showEdit ? (
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            ) :(name)}
            <EditIcon className='cursor-pointer' onClick={handleEdit}/>
          </div>
            <ConfirmDialog
              alertActionFunction={()=>handleDelete(connection.id)} 
              alertTitle='Delete Connection' 
              alertDescription='Are you sure you want to delete this connection? Yoou will losee other data associated with this connection'
              buttonDiv={<TrashIcon className='cursor-pointer'/>}
              alertActionText='Delete'
              /> 
        </div>
        <div className="flex gap-2">
          <Image src={connection.image} alt={connection.title} height={30} width={30}className="object-contain"/>
        </div>
        <div className='flex flex-col gap-4'>
          <CardTitle className="text-center text-lg">{connection.title}</CardTitle>
          <CardDescription className=' text-center'>{connection.description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ConnectedCard