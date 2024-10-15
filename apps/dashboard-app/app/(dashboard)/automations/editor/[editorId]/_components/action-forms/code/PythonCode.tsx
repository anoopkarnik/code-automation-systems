import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore
import { python } from '@codemirror/lang-python';
import React, { useEffect } from 'react';
import { oneDark } from '@codemirror/theme-one-dark';
import { useContext, useState } from 'react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import  { Alert, AlertDescription } from '@repo/ui/atoms/shadcn/Alert';
import { useToast } from '../../../../../../../../hooks/useToast';
import { getSession, useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { createActionAction, runPythonCode, updateActionAction } from '../../../../../../../actions/workflows/workflow';

import { ForwardIcon, PlayIcon, SquarePlusIcon, TrashIcon } from 'lucide-react';
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog';
import CodeConstruction from './CodeConstruction';


export const PythonCode = ({funcType,nodeType,type,subType,node}: any) => {
    const {toast} = useToast();
    const params = useParams();
    const editorId = params?.editorId
    const router = useRouter();
    const editor = useContext(EditorContext);
    // const [codeBlocks, setCodeBlocks] = useState(node?.metdata?.code||[{ id: 0, code: '# Write your python code here' }]);
    const [codeBlocks, setCodeBlocks] = useState<any>([]);


    const [output, setOutput] = useState<any>('');
    const [error, setError] = useState<any>('');
    const [logs, setLogs] = useState<any>('');

    useEffect(() => {
        if (node?.metadata?.code){
            setCodeBlocks([{ id: 0, code: node?.metadata?.code}])
        }
        else{
            setCodeBlocks(node?.metadata?.codeBlocks || [{ id: 0, code: '# Write your python code here' }])
        }
    },[node])
    // Function to add a new code block
    const addCodeBlock = (id:number) => {
        const newCodeBlock = { id: id+1, code: '# Write your python code here' };
        const updatedCodeBlocks = [
            ...codeBlocks.slice(0,id+1),
            newCodeBlock,
            ...codeBlocks.slice(id+1)
        ]
        setCodeBlocks(updatedCodeBlocks);
    };

    // Function to remove a code block
    const removeCodeBlock = (id: number) => {
        setCodeBlocks(codeBlocks.filter((block:any) => block.id !== id));
    };

    const runCode = async (code:string) => {
        setError('');
        setOutput('');

        try {
            const res = await runPythonCode(code);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
    };

    const runTillCurrentCode = async (id:number) => {
        setError('');
        setOutput('');
        let completeCode = codeBlocks.slice(0,id+1).map((block:any) => block.code).join('\n')
        try {
            const res = await runPythonCode(completeCode);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
    };

    const runAllCode = async () => {
        setError('');
        setOutput('');
        let completeCode = codeBlocks.map((block:any) => block.code).join('\n')
        try {
            const res = await runPythonCode(completeCode);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
    }

    const onSubmit = async () => {
        const session = await getSession()
        const userId = session?.user?.id
        let metadata = {
            codeBlocks: codeBlocks,
        };
        const params = {
            workflowId: editorId,
            actionId: subType.id,
            metadata,
            sortingOrder: editor.actions.length+1
        }
        let res;
        console.log('params',params)
        if (funcType == 'create'){
            res = await createActionAction(params)
        }
        else{
            res = await updateActionAction({id:node.id, actionId:node.actionId, metadata:metadata })
        }
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
            router.refresh()
            router.push(`/automations/editor/${editorId}`)
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }

    // Function to handle code updates
    const modifyCode = (id: number, value: string) => {
        setCodeBlocks(
            codeBlocks.map((block:any) => (block.id === id ? { ...block, code: value } : block))
        );
    };



    return (
        <div className='flex flex-col gap-4'>
            <CodeConstruction/>
            <div className='flex w-full justify-center gap-4'>
                <Button size="lg" variant="default" type="submit" onClick={onSubmit} > Add / Edit Action</Button>
                <Button size="lg" onClick={runAllCode}>Run All Code Blocks</Button>
                
            </div>
            {codeBlocks.map((block: any) => (
                <div
                key={block.id}
                className='relative flex gap-4 border rounded p-2 hover:shadow-lg group'
                >
                <CodeMirror
                    value={block.code}
                    onChange={(value) => modifyCode(block.id, value)}
                    height="500px"
                    theme="dark"
                    extensions={[python()]}
                    className="border rounded overflow-auto"
                />

                {/* Icon buttons, only visible on hover */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayIcon size={18} className='cursor-pointer' onClick={() => runCode(block.code)}/>
                    <ForwardIcon size={18} className='cursor-pointer' onClick={() => runTillCurrentCode(block.id)}/>
                    <ConfirmDialog
                        alertActionFunction={() => removeCodeBlock(block.id)} 
                        alertTitle='Delete Code Block' 
                        alertDescription='Are you sure you want to delete this codeblock permanently?'
                        buttonDiv={<TrashIcon size={18} className='cursor-pointer'/>}
                        alertActionText='Delete'
                    />
                    <SquarePlusIcon className='cursor-pointer' size={18}  onClick={()=>addCodeBlock(block.id)}/>
                </div>
                </div>
            ))}

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
        </div>
    )
}