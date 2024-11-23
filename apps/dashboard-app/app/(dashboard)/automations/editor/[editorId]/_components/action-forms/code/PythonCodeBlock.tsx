import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore
import { python } from '@codemirror/lang-python';
import { autocompletion } from '@codemirror/autocomplete';

import React from 'react';
import { useState } from 'react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useParams} from 'next/navigation';
import { runPythonCode } from '../../../../../../../actions/workflows/workflow';

import { ForwardIcon, PlayIcon, SquarePlusIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/atoms/shadcn/Tooltip';
import { Input } from '@repo/ui/atoms/shadcn/Input';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import  { Alert, AlertDescription } from '@repo/ui/atoms/shadcn/Alert';
import PythonCodeBlockVariables from './PythonCodeBlockVariables';

interface VariablesProps {
    key: string;
    value: string;
}

interface CodeBlockProps {
    id: number;
    title?: string;
    variables?: VariablesProps[];
    code: string;
}

const PythonCodeBlock = ({block,modifyTitle,removeVariable,addVariable,modifyCode,addCodeBlock,removeCodeBlock,
    runTillCurrentCode,modifyVariable,index}:any) => {

    const [output, setOutput] = useState<any>('');
    const [error, setError] = useState<any>('');
    const [logs, setLogs] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [showCode, setShowCode] = useState(false);

    const addVariableToBlock = async (id: number) => {

        await addVariable(id,key,value)
        setKey('')
        setValue('')
    }




    const runCode = async (block:any) => {
        setError('');
        setOutput('');
        setLoading(true);
        let code = block.code;
        block.variables.forEach((variable:any) => {
            code = code.replaceAll("{{"+variable.key+"}}",variable.value)
        })
        try {
            const res = await runPythonCode(code);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
        setLoading(false);
    };


  return (
    <div className='flex flex-col gap-2 border-b-[1px] pb-4'>
        <div className='flex gap-2 items-center'>
            <div>{index+1 + ")"}</div>
            {showCode ? 
                <Input
                    className='w-[80%] break-words whitespace-normal bg-background dark:bg-background dark:text-foreground '
                    placeholder={block.title}
                    onChange={(e: any) => modifyTitle(block.id,e.target.value)}
                    
                    autoFocus 
                /> :
                <div className='w-[80%] border-[1px] rounded-md p-2 break-words whitespace-normal text-wrap text-paragraph'>
                    {block.title}
                </div>
            }
            <Button variant="outline" onClick={()=>setShowCode(!showCode)}>{showCode ? 'Hide Code' : 'Show Code'}</Button>
            <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <ConfirmDialog
                            alertActionFunction={() => removeCodeBlock(block.id)} 
                            alertTitle='Delete Code Block' 
                            alertDescription='Are you sure you want to delete this codeblock permanently?'
                            buttonDiv={<TrashIcon size={18} className='cursor-pointer'/>}
                            alertActionText='Delete'
                        />
                        </TooltipTrigger>
                        <TooltipContent>
                            Delete this code block
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <SquarePlusIcon className='cursor-pointer' size={18}  onClick={()=>addCodeBlock(block.id)}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Add a empty code block after this
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        </div>
        {showCode && <div
            key={block.id}
            className='relative  gap-4 border-[1px] rounded p-2 hover:shadow-lg group'
        >
        
            <div className='flex flex-col gap-1 mb-2'>
                <Label className='text-description ml-[1px]'>Variables</Label>
                <div className='flex flex-col gap-2'>
                    {block.variables?.map((variable: any,index:any) => (
                        <PythonCodeBlockVariables variable={variable} removeVariable={removeVariable} block={block}
                         index={index} modifyVariable={modifyVariable} key={index}/>
                    ))}
                    <div className='flex gap-2 items-center'>
                        <Input
                            className='w-[30%] break-words whitespace-normal text-wrap bg-background dark:bg-background text-foreground dark:text-foreground '
                            placeholder="Enter Variable Name"
                            onChange={(e: any) => setKey(e.target.value)}
                            autoFocus 
                        />
                        <Input
                            className='w-[50%] break-words whitespace-normal text-wrap bg-background dark:bg-background text-foreground dark:text-foreground '
                            placeholder="Enter Variable Value"
                            onChange={(e: any) => setValue(e.target.value)}
                            autoFocus 
                        />
                    </div>
                    <Button variant="outline" onClick={()=>addVariableToBlock(block.id)}>Add Variable</Button>
                </div>
                
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <Label className='text-description ml-[1px]'>Code</Label>
                <CodeMirror
                    value={block.code}
                    onChange={(value) => modifyCode(block.id, value)}
                    theme="dark"
                    height={''}
                    extensions={[
                        python(), // Syntax highlighting for Python
                        autocompletion() // Enable autocompletion
                    ]}
                    className="border rounded overflow-auto"
                />
            </div>

            {/* Icon buttons, only visible on hover */}
            <div className="absolute top-3 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <PlayIcon size={18} className='cursor-pointer' onClick={() => runCode(block)}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Run this code block
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <ForwardIcon size={18} className='cursor-pointer' onClick={() => runTillCurrentCode(block.id)}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Run this + all previous code blocks
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
            </div>
            {output && (
                <Alert>
                <AlertDescription>
                    <pre className="whitespace-pre-wrap break-words overflow-auto">
                        {typeof output === 'object' ? JSON.stringify(output,null,2) : output}
                    </pre>
                </AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive">
                <AlertDescription>
                    <pre className="whitespace-pre-wrap break-words overflow-auto">{error}</pre>
                </AlertDescription>
                </Alert>
            )}
            {logs && (
                <Alert variant="default">
                <AlertDescription>
                    <pre className="whitespace-pre-wrap break-words overflow-auto">{logs}</pre>
                </AlertDescription>
                </Alert>
            )}
        </div>}

    </div >
  )
}

export default PythonCodeBlock