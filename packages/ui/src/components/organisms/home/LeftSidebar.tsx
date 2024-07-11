'use client'
import { cn } from '@repo/ui/lib/utils'
import { LogOut} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChevronsLeft } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/molecules/shadcn/Tooltip'

interface LeftSidebarProps {
    sidebarItems:any
    redirect: (href: string) => void
}


const LeftSidebar = ({sidebarItems,redirect}:LeftSidebarProps) => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isNotMobile = useMediaQuery("(min-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"div">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    

    const resetWidth = () =>{
        if (sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                'width',
                isMobile ? "0" : "calc(100% - 240px)"
            )
            navbarRef.current.style.setProperty('left',isMobile ? "100%" : "240px")
        }
        setTimeout(()=>{
            setIsResetting(false);
        })
    }

    const collapse =() =>{
        if (sidebarRef.current && navbarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty('width','100%')
            navbarRef.current.style.setProperty('left','0')
            setTimeout(()=>{
                setIsResetting(false);
            })
        }
    }

    useEffect(()=>{
        if (isMobile){
            collapse();
        }else{  
            resetWidth();
        }
    
    },[isMobile])

    useEffect(()=>{
        if (isMobile){
            collapse();
        }
    },[isMobile,pathname])
    
  return (
    <>
        <div ref={sidebarRef} className={cn('group/sidebar min-h-screen bg-secondary overflow-auto sticky flex flex-col z-[99999] ',
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "w-0",
            isNotMobile && "min-w-[240px]"
        )}>
            <div onClick={collapse} className={cn('rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer',
                isMobile && "opacity-100",
            )}>
                {isMobile && <ChevronsLeft className='h-6 w-6'/>}
            </div>
            <div className='mt-10 ml-2'>
                {sidebarItems.map((item:any,index:number)=>(
                    <div key={index} onClick={()=>redirect(item.href)}
                    className={cn('flex items-center gap-2 p-2 mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer mb-4 ',
                        pathname === item.href && 'bg-neutral-400'
                    )}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><item.icon className='h-6 w-6' /></TooltipTrigger>
                                <TooltipContent>{item.title}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {isNotMobile && <span>{item.title}</span>}
                    </div>
                ))}
            </div>
            <div onClick={resetWidth}
            className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'/>
        </div>
        <div ref={navbarRef} className={cn('absolute z-[9999] left-60 w-[calc(100%-240px)] top-[50%]  ',
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "left-[0px] w-full"
        )}>
            <nav className='bg-transparent px-3 py-2 w-full '>
                {isCollapsed && <LogOut onClick={resetWidth} role="button" className='text-black dark:text-white h-6 w-6'/>}
            </nav>

        </div>
    </>
  )
}

export default LeftSidebar;