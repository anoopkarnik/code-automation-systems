'use client'
import { cn } from '@repo/ui/lib/utils'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../atoms/shadcn/Tooltip";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import { useState } from "react";


const LeftSidebarItem = ({index,item,redirect}:any) =>{
    const [showSubItems, setShowSubItems] = useState<any>({});
    const pathname = usePathname();
    
    const toggleSubItems = (index:any) => {
        setShowSubItems((prev:any) =>({
            ...prev,
            [index]: !prev[index]
        }))

    }

    return (
        <div >
        {item.subItems && item.subItems.length > 0 ? (
            <div >
                <div onClick={() => toggleSubItems(index)}
                    className={cn('flex items-center gap-2 p-2 mx-2 text-md rounded-lg hover:bg-destructive/10 transition cursor-pointer ',
                        pathname === item.href && 'bg-destructive/30'
                    )}>
                    <TooltipProvider>
                        <Tooltip>
                            {item.icon && <item.icon className='h-4 w-4' />}
                            {!item.icon && <img src={item.image} className='h-4 w-4' />}
                            <TooltipContent>{item.title}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className='flex items-center justify-between w-full'>
                        {item.title} 
                        {showSubItems[index] ?
                         <CircleChevronUp className='w-4 h-4'/> :
                          <CircleChevronDown className='w-4 h-4'/>
                        }
                    </div>
                </div>
                <>
                {showSubItems[index] && item.subItems.map((subItem: any, subIndex: number) => (
                    <div key={subIndex} onClick={() => redirect(subItem.href)}
                        className={cn('flex items-center gap-2 p-2 mx-8 rounded-lg text-sm hover:bg-destructive/10 transition cursor-pointer  ',
                            pathname === subItem.href && 'bg-destructive/30'
                        )}>
                        <TooltipProvider>
                            <Tooltip>
                                {subItem.icon && <subItem.icon className='h-4 w-4' />}
                                {!subItem.icon && <img src={subItem.image} className='h-4 w-4' />}
                                <TooltipContent>{subItem.title}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {<span>{subItem.title}</span>}
                    </div>
                ))} 
                </>
            </div> )
            :
            <div onClick={() => redirect(item.href)}
                className={cn('flex items-center gap-2 p-2 mx-2 rounded-lg text-md hover:bg-destructive/10 transition cursor-pointer',
                    pathname === item.href && 'bg-destructive/30'
                )}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {item.icon && <item.icon className='h-4 w-4' />}
                            {!item.icon && <img src={item.image} className='h-4 w-4' />}
                        </TooltipTrigger>
                        <TooltipContent >{item.title}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {<span>{item.title}</span>}
            </div>
}
        
    </div>
    )
}
export default LeftSidebarItem;