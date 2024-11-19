import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import  { Alert, AlertDescription } from '@repo/ui/atoms/shadcn/Alert';
import { useToast } from '../../../../../../../../hooks/useToast';
import { getSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { createActionAction, runPythonCode, updateActionAction } from '../../../../../../../actions/workflows/workflow';

import CodeConstruction from './CodeConstruction';
import PythonCodeBlock from './PythonCodeBlock';

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

export const PythonCode = ({funcType,nodeType,type,subType,node}: any) => {
    const {toast} = useToast();
    const params = useParams();
    const editorId = params?.editorId
    const router = useRouter();
    const editor = useContext(EditorContext);
    // const [codeBlocks, setCodeBlocks] = useState(node?.metdata?.code||[{ id: 0, code: '# Write your python code here' }]);
    const [codeBlocks, setCodeBlocks] = useState<CodeBlockProps[]>([]);

    const [output, setOutput] = useState<any>('');
    const [error, setError] = useState<any>('');
    const [logs, setLogs] = useState<any>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCodeBlocks(node?.metadata?.codeBlocks || [{ id: 0, title: "Code Block 1" , variables:[],  code: '# Write your python code here' }])
    },[node])

    // Function to add a new code block
    const addCodeBlock = (id: number) => {

        const newCodeBlock = { id: id + 1, title: "Code Block " + String(id+1),variables: [], code: '# Write your python code here' };
    
        // Increment the IDs of the code blocks after the insertion point
        const updatedCodeBlocks = codeBlocks.map((block:any) => {
            if (block.id > id) {
                return { ...block, id: block.id + 1 }; // Increment id for blocks after the current one
            }
            return block;
        });
    
        // Insert the new code block at the correct position
        const finalCodeBlocks = [
            ...updatedCodeBlocks.slice(0, id + 1), // Keep the blocks before and at the insertion point
            newCodeBlock,                          // Add the new code block
            ...updatedCodeBlocks.slice(id + 1),    // Add the remaining blocks
        ];
    
        setCodeBlocks(finalCodeBlocks); // Update state with new code blocks
    };

    const runAllCode = async () => {
        setError('');
        setOutput('');
        setLoading(true);
        let completeCode = codeBlocks.map((block:any) => 
            {        
                let code = block.code;
                block.variables.forEach((variable:any) => {
                   code = code.replaceAll("{{"+variable.key+"}}",variable.value)
                })
                return code
            }).join('\n')
        try {
            const res = await runPythonCode(completeCode);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
        setLoading(false);
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

     // Function to copy all code blocks to clipboard
    const copyAllCode = () => {
        let allCode = codeBlocks.map((block:any) => 
            {        
                let code = block.code;
                block.variables.forEach((variable:any) => {
                   code = code.replaceAll("{{"+variable.key+"}}",variable.value)
                })
                return code
            }).join('\n\n')
        navigator.clipboard.writeText(allCode).then(() => {
            toast({title: "Copied", description: "All code blocks copied to clipboard!", variant: 'default'})
        }).catch(err => {
            toast({title: "Error", description: "Failed to copy code.", variant: 'destructive'})
            console.error("Error copying code:", err);
        });
    };

    // Function to remove a code block
    const removeCodeBlock = (id: number) => {
        setCodeBlocks(codeBlocks.filter((block:any) => block.id !== id));
    };

    const removeVariable = (id: number, index: number) => {
        const updatedCodeBlocks = codeBlocks.map((block:any) => {
            if (block.id === id) {
                block.variables = block.variables.filter((_:any, i:any) => i !== index);
            }
            return block;
        });
        setCodeBlocks(updatedCodeBlocks);
    }

    const runTillCurrentCode = async (id:number) => {
        setError('');
        setOutput('');
        setLoading(true);
        let completeCode = codeBlocks.slice(0,id+1).map((block:any) => 
            {        
                let code = block.code;
                block.variables.forEach((variable:any) => {
                   code = code.replaceAll("{{"+variable.key+"}}",variable.value)
                })
                return code
            }).join('\n')
        try {
            const res = await runPythonCode(completeCode);
            setOutput(res?.result);
            setLogs(res?.success);
            setError(res?.error);
            
        } catch (err:any) {
            setError(err.toString());
        }
        setLoading(false);
    };

    // Function to handle code updates
    const modifyCode = (id: number, value: string) => {
        setCodeBlocks(
            codeBlocks.map((block:any) => (block.id === id ? { ...block, code: value } : block))
        );
     };

     const modifyTitle = (id: number, value: string) => {
        setCodeBlocks(
            codeBlocks.map((block:any) => (block.id === id ? { ...block, title: value } : block))
        );
     }

     const addVariable = (id: number,key:string, value:string) => {
        const updatedCodeBlocks = codeBlocks.map((block:any) => {
            if (block.id === id) {
                block.variables.push({ key, value });
            }
            return block;
        });
        setCodeBlocks(updatedCodeBlocks);
     }



    return (
        <div className='relative flex flex-col gap-4'>

              {/* Overlay for loading */}
            {loading && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-[5000]">
                    <div className="text-white text-lg">Currently Running Code...</div>
                </div>
            )}

            <CodeConstruction/>
            <div className='flex flex-wrap w-full justify-center gap-4'>
                <Button size="lg" variant="default" type="submit" onClick={onSubmit} > Add / Edit Action</Button>
                <Button size="lg" onClick={runAllCode}>Run all Code Blocks</Button>
                <Button size="lg" onClick={copyAllCode}>Copy All Code</Button>
                <Button size="lg" onClick={()=> addCodeBlock(-1)}>Add First code block </Button>
                
            </div>
            <div className='text-button mt-2'>Code Blocks</div>
            {codeBlocks.map((block: any,index: number) => (
                <PythonCodeBlock block={block} modifyTitle={modifyTitle} removeVariable={removeVariable} 
                addVariable={addVariable} modifyCode={modifyCode} addCodeBlock={addCodeBlock} 
                removeCodeBlock={removeCodeBlock} runTillCurrentCode={runTillCurrentCode} index={index}/>
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