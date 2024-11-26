'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { ArrowRightIcon, CopyIcon } from 'lucide-react'
import DynamicIcon from '../../../../components/DynamicIcon'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useToast } from '../../../../hooks/useToast'
import { duplicateWorkflow, editFlow, makeFlowPublic } from '../../../actions/workflows/workflow'
import { Label } from '@repo/ui/atoms/shadcn/Label'
import { Switch } from '@repo/ui/molecules/shadcn/Switch'
import { useState } from 'react'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea'


const Template = ({workflow}:any) => {
    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user?.id;
    const [toggle,setToggle] = useState(workflow.shared || false)
    const [name, setName] = useState(workflow.name);
    const [description, setDescription] = useState(workflow.description);
    const [showNameEdit,setShowNameEdit] = useState(false);
    const [showDescriptionEdit,setShowDescriptionEdit] = useState(false);

    const onToggle = async () =>{
        setToggle(!toggle)
        await makeFlowPublic(workflow.id,!toggle)
    }

    const handleEditName = async () =>{
        if (showNameEdit) {
            setName(name)
            await editFlow(workflow.id,name,description);
        }
        setShowNameEdit(!showNameEdit);
        // router.refresh();
    }

    const handleEditDescription = async () =>{
        if (showDescriptionEdit){
            setDescription(description)
            await editFlow(workflow.id,name,description);
        }
        setShowDescriptionEdit(!showDescriptionEdit);
    }

  return (
    <Card className=''>
        <CardHeader className=''>
            <CardTitle className='flex items-center justify-between leading-3 '>
                <div className='flex items-center gap-2 w-full justify-between leading-normal'>
                    {showNameEdit ? (
                        <Input
                            className='w-[80%] break-words whitespace-normal bg-background dark:bg-background dark:text-foreground'
                            placeholder={name}
                            onChange={(e: any) => setName(e.target.value)}
                            onBlur={handleEditName} // Exit edit mode when clicking outside the input
                            autoFocus // Automatically focus the input when entering edit mode
                        />
                    ) : (
                        // Add onDoubleClick to enable editing on double click
                        <div className='w-[80%] break-words whitespace-normal text-wrap text-button' onDoubleClick={handleEditName}>
                            {name}
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-2 text-right '>
                    <Label htmlFor='airplane-mode'>
                        {toggle? 'Private': 'Public'}
                    </Label>
                    <Switch id='airplane-mode' onClick={onToggle} defaultChecked={toggle} />
                </div>

            </CardTitle>
            <CardDescription className='text-description text-xs leading-snug '>
                <div className='flex items-start justify-start gap-2 text-sm text-description w-full '>
                    {showDescriptionEdit ? (
                        <Textarea
                            placeholder={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                            onBlur={handleEditDescription} // Exit edit mode when clicking outside the input
                            autoFocus // Automatically focus the input when entering edit mode
                            className='w-full mt-2'
                        />
                    ) : (
                        // Add onDoubleClick to enable editing on double click
                        <div className='text-description' onDoubleClick={handleEditDescription}>
                            {description || 'Add Description Here'}
                        </div>
                    )}
                </div>
            </CardDescription>

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

export default Template