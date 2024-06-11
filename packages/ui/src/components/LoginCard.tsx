import React, { useState } from 'react'
import {z} from "zod"
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { useTransition } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
  showLinkedinProvider?: boolean;
  onEmailSubmit?: any;
  onGoogleProviderSubmit?: any;
  onGithubProviderSubmit?: any;
  onLinkedinProviderSubmit?: any;
  forgotPasswordFunction?: any;
  backFunction?:any;
  errorMessage?:string;
}

const LoginCard = ({showEmail,showGoogleProvider,showGithubProvider,showLinkedinProvider,onEmailSubmit,
  onGoogleProviderSubmit,onGithubProviderSubmit,onLinkedinProviderSubmit,forgotPasswordFunction,backFunction,errorMessage}
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
  const [error, setError] = useState<string | undefined>(errorMessage)
  const [success, setSuccess] = useState<string | undefined>("")
  const router = useRouter()

  async function handleSubmit(data: z.infer<typeof LoginSchema>) {
    setError("")
    setSuccess("")
    startTransition(()=>{
      onEmailSubmit(data)
      .then((data:any)=>{
          setError(data?.error);
          setSuccess(data?.success);
      })
    })
  }
  return (
    <Card className='w-[400px] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center'>Login</div>
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
                      <Input disabled={isPending} className='bg-white' type="email" placeholder='example@gmail.com' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} className='bg-white' placeholder='******' type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              </div>
              <div onClick={forgotPasswordFunction} className='text-sm text-left text-black/60 hover:text-black cursor-pointer hover:underline'>Forgot Password</div>
              <FormResult type="error" message={error }/>
              <FormResult type="success" message={success}/>
              <Button  disabled={isPending} className='bg-black text-white w-full ' variant="default" type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>}
      <CardFooter className='fle rounded-2xl gap-4 '>
        {showGoogleProvider && <Button onClick={onGoogleProviderSubmit} variant='outline' className='bg-white w-full'><FcGoogle/></Button>}
        {showGithubProvider && <Button onClick={onGithubProviderSubmit} variant='outline' className='bg-white w-full'><FaGithub/></Button>}
        {showLinkedinProvider && <Button onClick={onLinkedinProviderSubmit} variant='outline' className='bg-white w-full'><FaLinkedin/></Button>}
      </CardFooter>
      <CardFooter className='flex justify-center'>
        <div onClick={backFunction} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>Don't have an Account?</div>
      </CardFooter>
    </Card>
  )
}

export default LoginCard;