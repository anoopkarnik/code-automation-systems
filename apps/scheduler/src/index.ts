import db from '@repo/prisma-db/client';
require('dotenv').config();
import { logger } from '@repo/winston-logger/index';
import { createEvent, updateEvent, updateWorkflowLastRun } from '@repo/prisma-db/repo/workflow';
import cronParser from 'cron-parser';
import moment from 'moment-timezone';

async function main() {
    while(1){
        const workflows = await db.workflow.findMany({
            where:{
                publish: true,
                trigger: {
                    type:{
                        triggerType:{
                            name: 'Schedule'
                        }
                    }
                }

            },
            include:{
               trigger:{
                     include:{
                          type: {
                                include:{
                                    triggerType: true
                          }
                     }
               }
            }
        }})
        workflows.forEach(async workflow => {
            if (workflow.trigger?.type.name === 'Cron'){
                logger.info(`Processing cron workflow ${workflow.id}`);
                const metadata:any = workflow.trigger?.metadata;
                const startDate = new Date(metadata?.startDate);
                const now = new Date();
                const timezone = metadata?.timezone;
                const cronExpression = metadata?.cronExpression;
                let lastRun;
                if (workflow.lastRun){
                    lastRun = new Date(workflow.lastRun);
                }
                else{
                    lastRun = new Date(metadata.startDate);
                }
                const interval = cronParser.parseExpression(cronExpression,{currentDate: lastRun, tz: timezone});
                let nextRun:Date = interval.next().toDate ();
                const local_time = moment(new Date())
                let eventMetadata = {
                    trigger: {
                        result:{
                            nextRun: nextRun.toLocaleString('en-US', { timeZone: timezone }),
                            runTime: local_time.format('YYYY-MM-DD HH:mm:ss')
                        },
                        logs:[  ]
                    }
                }

                if (now >= nextRun && now >= startDate){
                    logger.info(`Creating event for workflow ${workflow.id}`);
                    const event = await createEvent( workflow.id,'STARTED',eventMetadata)
                    updateWorkflowLastRun(workflow.id, now.toLocaleString('en-US', { timeZone: timezone }));
                }else{
                    logger.info(`Next run for workflow ${workflow.name} is scheduled for: ${nextRun.toLocaleString('en-US', { timeZone: timezone })}`);
                }

            }
        })
        await new Promise(r => setTimeout(r, 60000))
    }
}


main()