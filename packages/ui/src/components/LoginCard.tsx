import React, { useState } from 'react'
import {z} from "zod"
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { useTransition } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/Button';
import { LoginSchema } from '@repo/zod/index'
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsExclamationTriangle } from 'react-icons/bs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form"
import { Input } from './ui/Input';
import { FormResult } from './FormResult';
import { useRouter } from 'next/navigation';

interface LoginCardProps {
  showEmail?: boolean;
  showGoogleProvider?: boolean;
  showGithubProvider?: boolean;
  onEmailSubmit?: any;
  onGoogleProviderSubmit?: any;
  onGithubProviderSubmit?: any;
  registerFunction?:any
}

const LoginCard = ({showEmail,showGoogleProvider,showGithubProvider,onEmailSubmit,onGoogleProviderSubmit,onGithubProviderSubmit,registerFunction}
  :LoginCardProps
) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: '',
      password: ''
    },
  })

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const router = useRouter()

  function handleSubmit(data: z.infer<typeof LoginSchema>) {
    setError("")
    setSuccess("")
    startTransition(()=>{
      onEmailSubmit(data).then((result:any)=>{setError(result.error);setSuccess(result.success)})
    })
  }
  return (
    <Card className='w-[40%] bg-foreground text-background shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center text-secondary'>Login</div>
        <div className='text-md font-extralight text-center'>Welcome Back</div>
      </CardHeader>
      {showEmail &&
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              <div className='space-y-4 mb-4'>
                <FormField control={form.control} name="email" render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} className='bg-foreground' type="email" placeholder='example@gmail.com' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} className='bg-foreground' placeholder='******' type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              </div>
              <FormResult type="error" message={error}/>
              <FormResult type="success" message={success}/>
              <Button  disabled={isPending} className='bg-background text-foreground w-full ' variant="outline" type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>}
      <CardFooter className='fle rounded-2xl gap-4 '>
        {showGoogleProvider && <Button variant='outline' className='bg-foreground w-full'><FcGoogle/></Button>}
        {showGithubProvider && <Button variant='outline' className='bg-foreground w-full'><FaGithub/></Button>}
      </CardFooter>
      <CardFooter className='flex justify-center'>
        <div onClick={registerFunction} className='text-sm text-center text-background/60 hover:text-background cursor-pointer hover:underline'>Don't have an Account?</div>
      </CardFooter>
    </Card>
  )
}

export default LoginCard;