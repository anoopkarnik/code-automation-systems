import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@repo/ui/molecules/shadcn/Button'

type Props = {
    type: string
    icon: string
    title: string
    description: string
    callback?: () => void
    connected: {} & any
    oauth_url: string
  }

const ConnectionCard = ({description,type,icon,title,connected,oauth_url}: Props ) => {
  return (
    <Card className="flex min-w-[600px] items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Image src={icon} alt={title} height={30} width={30}className="object-contain"/>
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <Button className="flex flex-col items-center gap-2 p-4 mx-4">
        {connected[type] ? (
          <Link href={oauth_url} 
          className=" rounded-lg px-3 py-2 font-bold text-white">
            Connected
          </Link>
        ) : (
          <Link href={oauth_url}
            className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
          >
            Connect
          </Link>
        )}
      </Button>
    </Card>
  )
}

export default ConnectionCard