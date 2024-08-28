'use client'

import { CreateWorkflowSchema } from '@repo/zod/workflow'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/molecules/shadcn/Form'
import { Input } from '@repo/ui/molecules/shadcn/Input'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { Loader2 } from 'lucide-react'
import { useToast } from '../../../../hooks/useToast'


type Props = {
  onSubmit: () => void
}

const Workflowform = ({onSubmit,userId}:any) => {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof CreateWorkflowSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const isLoading = form.formState.isLoading
  const router = useRouter()

  const handleSubmit = async (values: z.infer<typeof CreateWorkflowSchema>) => {
    const name = values.name
    const description = values.description
    const res = await onSubmit({name,description,userId})
    if (res.success){
      toast({title: "Success", description: res?.success, variant: 'default'})
      router.refresh()
  }
  else if (res.error){
      toast({title: "Error", description: res?.error, variant: 'destructive'})
  }
  }

  return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 text-left mt-10"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
  )
}

export default Workflowform
