import { Form, FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../molecules/shadcn/Form'
import { Input } from '../molecules/shadcn/Input'
import { Button } from '../molecules/shadcn/Button'
import { useRouter } from 'next/navigation';

type Props = {
    callback_url: string
    formElements: {
      name: string
      label: string
      placeholder: string
      type: string
    }[]
}

const AddConnectionsModal = ({callback_url,formElements}:Props) => {
  const form = useForm()
  const router = useRouter();

  const onSubmit = (data:any) => {
    console.log(data)
    const apiKey = data.apiKey;  // Assuming apiKey is a form field
    const redirectUrl = `${callback_url}?apiKey=${apiKey}`;
    router.push(redirectUrl);
  }

  return (  
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 mb-4'>
            {formElements.map((element,index)=>(
              <FormField control={form.control} name={element.name} render={({field})=>(
                <FormItem>
                  <FormLabel className='px-2'>{element.label}</FormLabel>
                  <FormControl>
                    <Input type={element.type} placeholder={element.placeholder} {...field}/>
                  </FormControl>
                </FormItem>
              )}/>
            ))}
          </div>
          <Button className='bg-destructive text-white w-full ' variant="default" type="submit" > Save</Button>
        </form>
      </FormProvider> 
)
}

export default AddConnectionsModal