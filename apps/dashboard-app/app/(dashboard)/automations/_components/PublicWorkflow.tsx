'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { ArrowRightIcon, CopyIcon } from 'lucide-react'
import DynamicIcon from '../../../../components/DynamicIcon'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useToast } from '../../../../hooks/useToast'
import { duplicateWorkflow } from '../../../actions/workflows/workflow'


const PublicWorkflow = ({workflow}:any) => {
    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user?.id;

    const {toast} = useToast();



    const onDuplication = async () => {
        const res = await duplicateWorkflow(workflow.id,userId)
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }
  return (
    <Card className=''>
        <CardHeader className=''>
            <CardTitle className='flex items-start justify-between leading-3 '>
                <div className='flex items-center gap-2 text-button leading-normal'>
                    {workflow.name}
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <CopyIcon onClick={onDuplication} className=' w-4 h-4'/>
                </div>

            </CardTitle>
            <CardDescription className='text-description text-xs leading-snug mr-4'>{workflow.description}</CardDescription>

        </CardHeader>
        <CardContent className=''>
            <CardDescription>
                <div className='flex items-center justify-start gap-2 flex-wrap mt-2'>
                    {workflow.trigger && <>
                        <DynamicIcon icon={workflow.trigger.type.triggerType.icon}/>
                        <ArrowRightIcon className='w-2 h-2'/>
                    </>
                    }
                    {workflow.actions.map((action:any) => (
                        <><DynamicIcon key={action.id} icon={action.type.actionType.icon}/>
                        </>
                    ))}
                </div>
            </CardDescription>
        </CardContent>
    </Card>
  )
}

export default PublicWorkflow