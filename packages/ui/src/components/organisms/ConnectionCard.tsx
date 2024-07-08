import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import AddConnectionsModal from './AddConnectionModal'
import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../molecules/shadcn/Dialog'

type Props = {
    type: string
    icon: string
    title: string
    description: string
    callback_url?: string
    connected: {} & any
    oauth_url?: string
    formElements?: {
      label: string
      placeholder: string
      type: string
      name: string
    }[]
    showModal: boolean
  }

const ConnectionCard = ({description,type,icon,title,connected,callback_url,oauth_url,formElements,showModal}: Props ) => {
  return (
    <Card className="flex flex-col items-center justify-between ">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row gap-2">
          <Image src={icon} alt={title} height={30} width={30}className="object-contain"/>
        </div>
        <div className='flex flex-col gap-4'>
          <CardTitle className="text-center text-lg">{title}</CardTitle>
          <CardDescription className='min-w-[400px] max-w-[400px] text-center'>{description}</CardDescription>
        </div>
      </CardHeader>
      <Button className="flex flex-col items-center gap-2 p-4 mx-4 mb-4">
        {connected[type] ? (
          showModal? (
            <Dialog>
              <DialogTrigger>
                <div className=" rounded-lg px-3 py-2 font-bold text-white ">
                  Connected
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <AddConnectionsModal formElements={formElements || []} callback_url={callback_url as string} />
              </DialogContent>
            </Dialog>
          ):(
          <Link href={oauth_url || ''} className=" rounded-lg px-3 py-2 font-bold text-white ">
            Connected
          </Link>)
          ) : (
            showModal? (
              <Dialog>
                <DialogTrigger>
                  <div className=" rounded-lg px-3 py-2 font-bold text-white ">
                    Connect
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='flex text-4xl gap-4'>
                      <Image src={icon} alt={title} height={30} width={30} className="object-contain"/>
                      <div>{title}</div>
                    </DialogTitle>
                    <DialogDescription className='py-4 '>{description}</DialogDescription>
                  </DialogHeader>
                  <AddConnectionsModal formElements={formElements || []} callback_url={callback_url as string}/>
                </DialogContent>
              </Dialog>
            ):(
          <Link href={oauth_url || ''} className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground">
            Connect
          </Link>)
        )}
      </Button>
    </Card>
  )
}

export default ConnectionCard