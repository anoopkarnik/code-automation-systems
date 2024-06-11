import React, { useState } from 'react'
import {z} from "zod"
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { useTransition } from 'react';
import { Button } from './ui/Button';
import { LoginSchema, ResetPasswordSchema } from '@repo/zod/index'
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

interface ResetPasswordCardProps {
  errorMessage?:string;  
  successMessage?:string;
  token?:string;
  resetFunction?:any; 
  backFunction?:any;
}

const ResetPasswordCard = ({errorMessage,successMessage,token,resetFunction,backFunction}
  :ResetPasswordCardProps
) => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues:{
      password: '',
    },
  })
  const [error, setError] = useState<string | undefined>(errorMessage)
  const [success, setSuccess] = useState<string | undefined>(successMessage)

  const [isPending, startTransition] = useTransition()

  function handleSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    setError("")
    setSuccess("")
    startTransition(()=>{
      resetFunction(token,data.password)
      .then((data:any)=>{
            setError(data?.error);
            setSuccess(data?.success);
      })
    })
  }
  return (
    <Card className='w-[40%] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center'>Reset Password</div>
        <div className='text-md font-extralight text-center'>Enter New Password</div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-4 mb-4'>
              <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className='bg-white' type="password" placeholder='******' {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <FormResult type="error" message={error }/>
            <FormResult type="success" message={success}/>
            <Button  disabled={isPending} className='bg-black text-white w-full ' variant="default" type="submit">Reset Password</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <div onClick={backFunction} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>Go to Login Page</div>
      </CardFooter>
    </Card>
  )
}

export default ResetPasswordCard;