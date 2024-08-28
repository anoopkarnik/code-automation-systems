import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import HeaderCard from '@repo/ui/molecules/common/HeaderCard';
import { getCalendarSummary, getTasksSummary, getWeeklyPlannerSummary } from '../../../../actions/notion/planner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { Checkbox } from '@repo/ui/molecules/shadcn/Checkbox';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { createNotionPageAction, modifyNotionPageAction } from '../../../../actions/notion/notion';
import SchedulerForm from './SchedulerForm';
import TaskForm from './TaskForm';
import WeeklyPlannerForm from './WeeklyPlannerForm';

const Overview = () => {
  
  const connectionsContext = useContext(ConnectionsContext);
  const apiToken = connectionsContext?.notionNode?.accessToken;
  const schedulerDbId = connectionsContext?.notionNode?.schedulerDb?.id
  const calendarDbId = connectionsContext?.notionNode?.calendarDb?.id
  const eisenhowerMatrixDbId = connectionsContext?.notionNode?.eisenhowerMatrixDb?.id
  const weeklyPlannerDbId = connectionsContext?.notionNode?.weeklyPlannerDb?.id
  const timeTrackingDbId = connectionsContext?.notionNode?.timeTrackingDb?.id
  const [scheduledTasks, setScheduledTasks] = useState<any>([])
  const [scheduledHabits, setScheduledHabits] = useState<any>([])
  const [scheduledPayments, setScheduledPayments] = useState<any>([])
  const [uiTasks, setUiTasks] = useState<any>([])
  const [uniTasks, setUniTasks] = useState<any>([])
  const [nuiTasks, setNuiTasks] = useState<any>([])
  const [weeklyPlannerTasks, setWeeklyPlannerTasks] = useState<any>([])
  const [totalHoursLeft, setTotalHoursLeft] = useState<any>(0)
  
  useEffect(()=>{
    const getSummary = async () => {
      if(calendarDbId && eisenhowerMatrixDbId){
        const {tasks, habits, payments} = await getCalendarSummary({apiToken, calendarDbId})
        setScheduledTasks(tasks)
        setScheduledHabits(habits)
        setScheduledPayments(payments)
        const {uiTasks, uniTasks, nuiTasks} = await getTasksSummary({apiToken, eisenhowerMatrixDbId})
        setUiTasks(uiTasks)
        setUniTasks(uniTasks)
        setNuiTasks(nuiTasks)
        const {weeklyPlannerTasks,totalHoursLeft} = await getWeeklyPlannerSummary({apiToken, weeklyPlannerDbId})
        setWeeklyPlannerTasks(weeklyPlannerTasks.results)
        setTotalHoursLeft(totalHoursLeft)
      } 
    }
    getSummary()
  },[apiToken, calendarDbId, eisenhowerMatrixDbId, weeklyPlannerDbId])

  const handleItemsCheckChange = async (id:string, key:string, value:boolean) => {

    let properties:any = [
      {
        name: key,
        type: 'checkbox',
        value: value
      }
    ]
    await modifyNotionPageAction({apiToken,page_id: id, properties})

  } 

  const [timers, setTimers] = useState<any>({});

  const selectTimer = async (taskId:any) => {
    if (timers[taskId]?.intervalId) {
      await stopTimer(taskId);
    } else{
      await startTimer(taskId);
    }
  }

  // Function to start the timer
  const startTimer = async (taskId:any) => {
    const properties:any = [
      {name: 'Name', type: 'title', value: 'Time Tracking'},
      {name: 'Start Time', type: 'date', value: new Date().toISOString()},
      {name: 'Status', type: 'select', value: 'Running'},
      {name: 'Weekly Planner', type: 'relation', value: [taskId]}
    ]
    const page = await createNotionPageAction({apiToken, dbId: timeTrackingDbId, properties});
    setTimers((prevTimers:any) => {
      const newTimers:any = { ...prevTimers };
      if (!newTimers[taskId]) {
        newTimers[taskId] = { startTime: Date.now(), elapsed: 0, intervalId: null,pageId: page.id };
      } else {
        newTimers[taskId].startTime = Date.now();
      }

      newTimers[taskId].intervalId = setInterval(() => {
        setTimers((prev:any) => ({
          ...prev,
          [taskId]: { ...prev[taskId], elapsed: Date.now() - prev[taskId].startTime },
        }));
      }, 1000);

      return newTimers;
    });
  };

  // Function to stop the timer
  const stopTimer = async (taskId:any) => {
    const properties:any = [
      {name: 'End Time', type: 'date', value: new Date().toISOString()},
      {name: 'Status', type: 'select', value: 'Paused'}
    ]
    const page = await modifyNotionPageAction({apiToken, pageId: timers[taskId].pageId, properties});
    setTimers((prevTimers:any) => {
      const newTimers:any = { ...prevTimers };
      if (newTimers[taskId] && newTimers[taskId].intervalId) {
        clearInterval(newTimers[taskId].intervalId);
        newTimers[taskId].intervalId = null; 
        newTimers[taskId].pageId = null;
      }
      return newTimers;
    });
    const {weeklyPlannerTasks,totalHoursLeft} = await getWeeklyPlannerSummary({apiToken, weeklyPlannerDbId})
    setWeeklyPlannerTasks(weeklyPlannerTasks.results)
  };

  // Helper function to format time in HH:MM:SS
  const formatTime = (elapsed:any) => {
    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <div className='w-[95%] mx-[2.5%] my-6 '>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
        <HeaderCard title='Scheduled Habits Left' description='Habits Left to do ' value={`${scheduledHabits.length}`}/>
        <HeaderCard title='Scheduled Tasks Left' description='Tasks left to do ' value={`${scheduledTasks.length}`}/>
        <HeaderCard title='Scheduled Payments Left' description='Payments left to do today' value={`${scheduledPayments.length}`}/>
        <HeaderCard title='Important and Urgent Tasks Left' description='Urgent and Important Tasks Left to do' value={`${uiTasks.length}`}/>
        <HeaderCard title='Important and Not Urgent Tasks Left' description='Urgent and Not Important Tasks Left to do' value={`${uniTasks.length}`}/>
        <HeaderCard title='Not Important and Urgent Tasks Left' description='Important and Not Urgent Tasks Left to do' value={`${nuiTasks.length}`}/>
        <HeaderCard title='Tasks Left for this week' description='Number of Tasks | Time Remaining to still complete this week' value={`${weeklyPlannerTasks?.length}`}/>
        <HeaderCard title='Deep Hours worked on ' description='Deep Hours done this day | Average Deep Hours completed this week' value={`${totalHoursLeft}`}/>
      </div>
      <div>
        <Accordion type="single" collapsible className='w-full'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className='flex justify-between items-center w-full mr-2'>
                <div> Add New Schedule, New Task, New Weekly Deep Work Plan</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SchedulerForm/>
              <TaskForm/>
              <WeeklyPlannerForm/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
                <div> Scheduled Things to do </div>
              </div>
            </AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='my-4 border-r-2 mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Tasks Left</h1>
                        {scheduledTasks?.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Name']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Completed',!task.Completed)}/>
                              <Checkbox id ='not completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Not Completed',!task.Completed)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className='my-4 border-r-2 mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Habits Left</h1>
                        {scheduledHabits.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Name']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Completed',!task.Completed)}/>
                              <Checkbox id ='not completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Not Completed',!task.Completed)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className='my-4  mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Payments Left</h1>
                        {scheduledPayments.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Name']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Completed',!task.Completed)}/>
                              <Checkbox id ='not completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Not Completed',!task.Completed)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
                <div> Tasks to do </div>
              </div>
            </AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='my-4 border-r-2 mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Urgent and Important Tasks</h1>
                        {uiTasks?.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Task']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Done',!task.Done)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className='my-4 border-r-2 mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Urgent and Not Important Tasks</h1>
                        {uniTasks.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Task']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Done',!task.Done)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className='my-4  mx-2 px-2'>
                      <h1 className='text-2xl font-medium my-4 text-left underline'>Not Urgent and Important Tasks</h1>
                        {nuiTasks.map((task:any) => (
                          <div key={task.id} className='flex items-center justify-between'>
                            <div>{task['Task']}</div>
                            <div className='flex items-center gap-2'>
                              <Checkbox id ='completed' onCheckedChange={()=> handleItemsCheckChange(task.id,'Done',!task.Done)}/>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
            <div className='flex justify-between items-center w-full mr-2'>
                <div> Weekly Planned Deep Work to do </div>
              </div>
            </AccordionTrigger>
              <AccordionContent>
              <div className='my-4 mx-2 px-2'>
                <div className='flex flex-col'>
                  <div  className='grid grid-cols-5 mt-2 items-center justify-center gap-10 font-black border-border/30 border-b-2 pb-2'>
                      <div className=''>Name</div>
                      <div >Remaining Time (in Hrs)</div>
                      <div>Total Time Spent</div>
                      <div>Start / Stop Timer</div>
                      <div>Completed</div>
                  </div>
                  {weeklyPlannerTasks?.map((task:any) => (
                    <div key={task.id} className='grid grid-cols-5 mt-2 items-center justify-center gap-10 '>
                      <div className=''>{task['Name']}</div>
                      <div >{task['Remaining Time (in Hrs)']}</div>
                      <div>{task['Total Time Spent']}</div>
                      <Button  onClick={() => selectTimer(task.id)}>
                        {timers[task.id]?.intervalId ? formatTime(timers[task.id].elapsed) : 'Start'}
                      </Button>
                      <Checkbox id='completed' onCheckedChange={() => handleItemsCheckChange(task.id, 'Completed', !task.Completed)}/>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
      </div>
    </div>
  )
}

export default Overview