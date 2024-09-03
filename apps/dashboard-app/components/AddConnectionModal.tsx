import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { useRouter } from 'next/navigation';
import { useToast } from '../hooks/useToast';


type Props = {
    addConnection: any,
    formElements: {
      name: string
      label: string
      placeholder: string
      type: string
    }[],
    userId: string | undefined
}

const AddConnectionsModal = ({addConnection,formElements,userId}:Props) => {
  const form = useForm()
  const router = useRouter();
  const {toast} = useToast();

  const onSubmit = (data:any) => {
    const apiKey = data.apiKey;  // Assuming apiKey is a form field
    const response = addConnection({userId,apiKey});
    if (response?.success){
      toast({
        title: "Success",
        description: response?.success,
        variant: "default"
      })
    }
    else if (response?.error){
      toast({
        title: "Error",
        description: response?.error,
        variant: "destructive"
      })
    }
  }

  return (  
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 mb-4'>
            {formElements.map((element)=>(
              <FormField key={element.name} control={form.control} name={element.name} render={({field})=>(
                <FormItem>
                  <FormLabel className='px-2'>{element.label}</FormLabel>
                  <FormControl>
                    <Input type={element.type} placeholder={element.placeholder} {...field}/>
                  </FormControl>
                </FormItem>
              )}/>
            ))}
          </div>
          <Button size="lg" variant="default" type="submit" > Save</Button>
        </form>
      </FormProvider> 
)
}

export default AddConnectionsModal