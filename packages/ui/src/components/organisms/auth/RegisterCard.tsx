import { useState } from 'react'
import {z} from "zod"
import { Card, CardContent, CardFooter, CardHeader } from '../../molecules/shadcn/Card';
import { useTransition } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../../molecules/shadcn/Button';
import { RegisterSchema } from '@repo/zod/index'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../molecules/shadcn/Form"
import { Input } from '../../molecules/shadcn/Input';
import { FormResult } from './FormResult';

interface RegisterCardProps {
  showEmail?: boolean;
  showGoogleProvider?: boolean;
  showGithubProvider?: boolean;
  showLinkedinProvider?: boolean;
  onEmailSubmit?: any;
  onGoogleProviderSubmit?: any;
  onGithubProviderSubmit?: any;
  onLinkedinProviderSubmit?: any;
  backFunction?:any;
}

const RegisterCard = ({showEmail,showGoogleProvider,showGithubProvider,showLinkedinProvider,
  onEmailSubmit,onGoogleProviderSubmit,onGithubProviderSubmit,onLinkedinProviderSubmit,backFunction}
  :RegisterCardProps
) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      name: '',
      email: '',
      password: ''
    },
  })

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  function handleSubmit(data: z.infer<typeof RegisterSchema>) {
    setError("")
    setSuccess("")
    startTransition(()=>{
      onEmailSubmit(data).then((result:any)=>{setError(result.error);setSuccess(result.success)})
    })
  }
  return (
    <Card className='w-[40%] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center text-black'>Register</div>
        <div className='text-md font-extralight text-center'>Create an account</div>
      </CardHeader>
      {showEmail &&
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              <div className='space-y-4 mb-4'>
              <FormField control={form.control} name="name" render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} className='bg-white' type="name" placeholder='first name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
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
              <FormResult type="error" message={error}/>
              <FormResult type="success" message={success}/>
              <Button  disabled={isPending} className='bg-black text-white w-full ' variant="default" type="submit" > Register</Button>
            </form>
          </Form>
        </CardContent>}
      <CardFooter className='fle rounded-2xl gap-4 '>
        {showGoogleProvider && 
        <Button onClick={onGoogleProviderSubmit} variant='outline' className='bg-white w-full'>
          <FcGoogle/>
        </Button>}
        {showGithubProvider && <Button onClick={onGithubProviderSubmit} variant='outline' className='bg-white w-full'><FaGithub/></Button>}
        {showLinkedinProvider && <Button onClick={onLinkedinProviderSubmit} variant='outline' className='bg-white w-full'><FaLinkedin/></Button>}
      </CardFooter>
      <CardFooter className='flex justify-center'>
        <div onClick={backFunction} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>
          Already have an Account!
        </div>
      </CardFooter>
    </Card>
  )
}

export default RegisterCard;