'use client'
import { cn } from '@repo/ui/lib/utils'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../atoms/shadcn/Tooltip";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
const LeftSidebarItem = ({index,item,redirect,isMobile,isCollapsed}:any) =>{
    const [showSubItems, setShowSubItems] = useState<any>({});
    const pathname = usePathname();
    const {theme} = useTheme();
    
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
                    className={cn('flex items-center gap-2 p-2 mx-2 text-button rounded-lg hover:bg-destructive/10 transition cursor-pointer ',
                        pathname === item.href && 'bg-destructive/30'
                    )}>
                    <TooltipProvider>
                        <Tooltip>
                            {item.icon && <item.icon className='h-4 w-4 opacity-60' />}
                            {!item.icon && <img src={item.image} className='h-4 w-4' />}
                            <TooltipContent>{item.title}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className='flex items-center justify-between w-full'>
                        {(!isMobile || (isMobile && !isCollapsed)) && item.title} 
                        {showSubItems[index] ?
                         <CircleChevronUp className='w-4 h-4 opacity-60'/> :
                          <CircleChevronDown className='w-4 h-4 opacity-60'/>
                        }
                    </div>
                </div>
                <>
                {showSubItems[index] && item.subItems.map((subItem: any, subIndex: number) => (
                    <div key={subIndex} onClick={() => redirect(subItem.href)}
                        className={cn('flex items-center gap-2 p-2  rounded-lg text-paragraph hover:bg-destructive/10 transition cursor-pointer  ',
                            pathname === subItem.href && 'bg-destructive/30',
                            isMobile && 'ml-4',
                            !isMobile && 'mx-4'
                        )}>
                        <TooltipProvider>
                            <Tooltip>
                                {subItem.icon && <subItem.icon className='h-4 w-4 opacity-60' />}
                                {!subItem.icon && <img src={subItem.image} className='h-4 w-4' />}
                                <TooltipContent>{subItem.title}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {(!isMobile || (isMobile && !isCollapsed)) && <span>{subItem.title}</span>}
                    </div>
                ))} 
                </>
            </div> )
            :
            <div onClick={() => redirect(item.href)}
                className={cn('flex items-center gap-2 p-2 mx-2 rounded-lg text-button hover:bg-destructive/10 transition cursor-pointer',
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
                {(!isMobile || (isMobile && !isCollapsed)) && <span>{item.title}</span>}
            </div>
}
        
    </div>
    )
}
export default LeftSidebarItem;