import cron from 'node-cron';
import { getActiveWorkflows, updateWorkflowLastRun } from '@repo/prisma-db/repo/workflow';
import cronParser from 'cron-parser';
import { runWebhook } from './actions/webhook';

export const scheduleJob = async ()=>{
    const job = cron.schedule( "* * * * *",startWorkflows,{scheduled: true,runOnInit:true})
    console.log('Job scheduled');
    return job;
}

export const startWorkflows = async () => {
    const workflows = await getActiveWorkflows();
    workflows.forEach(async (workflow:any) => {
        console.log('Starting workflow',workflow.name);
        const trigger = workflow.nodes.find((node:any) => node.type === 'Trigger');
        const actions = workflow.nodes.filter((node:any) => node.type === 'Action');
        if (trigger && trigger.actionType === 'Schedule' && trigger.subActionType === 'Cron'){ 
            const actionData = JSON.parse(trigger.actionData);
            const startDate = new Date(actionData['Start Date']);
            const now = new Date();
            const timezone = actionData['Timezone'];
            const cronExpression = actionData['Cron Expression']; 
            const lastRun = new Date(workflow.lastRun || startDate);
            const interval = cronParser.parseExpression(cronExpression,{currentDate:lastRun, tz: timezone});
            const nextRun = interval.next().toDate();
            if (now >= nextRun && now >= startDate){
                console.log('Starting actions based on trigger for',workflow.name);
                await startActions(actions);
                await updateWorkflowLastRun(workflow.id,now.toLocaleString('en-US', { timeZone: timezone }));
            }
            else{
                console.log(`Next run for workflow ${workflow.name} is scheduled for: ${nextRun.toLocaleString('en-US', { timeZone: timezone })}`);
            }
        }
    })
}

export const startActions = async (actions:any[]) => {
    actions.forEach(async (action:any) => {
        if (action.actionType === 'Webhook'){
            await runWebhook(action);
        }
    })
}
