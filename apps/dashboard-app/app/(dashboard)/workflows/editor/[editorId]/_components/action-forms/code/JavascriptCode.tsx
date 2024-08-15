import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useContext, useState } from 'react';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import  { Alert, AlertDescription } from '@repo/ui/molecules/shadcn/Alert';
import { useToast } from '../../../../../../../../hooks/useToast';
import { getSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { createActionAction, updateActionAction } from '../../../../../../../../actions/workflows/workflow';
import { set } from 'date-fns';

export const JavascriptCode = ({funcType,nodeType,type,subType,node}: any) => {
    const {toast} = useToast();
    const { editorId} = useParams();
    const router = useRouter();
    const editor = useContext(EditorContext);
    const [code, setCode] = useState(node?.metadata?.code || '// Write your javascript code here');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [logs, setLogs] = useState('');
    const compileCode = () => {
        setError('');
        setOutput('');
    
        try {
          // Create a new Function from the code string
          const compiledFunction = new Function(code);

          // Capture console.log output
          const originalLog = console.log;
          let logs:any = [];
          console.log = (...args) => {
            logs.push(args.join(' '));
          };
    
          // Execute the compiled function
          const res = compiledFunction();
    
          // Restore original console.log
          console.log = originalLog;
          setOutput(res);
    
          setLogs(logs.join('\n'));
        } catch (err:any) {
          setError(err.toString());
        }
      };
      const onSubmit = async () => {
        const session = await getSession()
        const userId = session?.user?.id
        let metadata = {
            code: code
        }
        const params = {
            workflowId: editorId,
            actionId: subType.id,
            metadata,
            sortingOrder: editor.actions.length
        }
        let res;
        if (funcType == 'create'){
            res = await createActionAction(params)
        }
        else{
            res = await updateActionAction({id:node.id, actionId:node.actionId, metadata:metadata })
        }
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
            router.refresh()
            router.push(`/workflows/editor/${editorId}`)
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }

    const modifyCode = (value: string) => {
        if (typeof value === 'string') {
            setCode(value);
        }
        else if (typeof value === 'object') {
            setCode(JSON.stringify(value));
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <CodeMirror
                value={code}
                onChange={(value) => modifyCode(value)}
                height="500px"
                theme="dark"
                extensions={[javascript({ jsx: true })]}
                className="border rounded"
            />
            <div className='flex w-full justify-center gap-4'>
                <Button className='w-[30%]' onClick={compileCode}>Compile and Run</Button>
                <Button className='w-[30%]' variant="default" type="submit" onClick={onSubmit} > Add Action</Button>
            </div>
            {output && (
                <Alert>
                <AlertDescription>
                    <pre>{typeof output === 'object' ?
                     JSON.stringify(output) : output }</pre>
                </AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive">
                <AlertDescription>
                    <pre>{error}</pre>
                </AlertDescription>
                </Alert>
            )}
            {logs && (
                <Alert variant="default">
                <AlertDescription>
                    <pre>{logs}</pre>
                </AlertDescription>
                </Alert>
            )}
        </div>
    )
}