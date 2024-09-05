'use client'
import { cn } from '@repo/ui/lib/utils'
import { usePathname } from 'next/navigation'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChevronsLeft, AlignJustifyIcon, PlusIcon, MinusIcon, CircleChevronDown, CircleChevronUp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../atoms/shadcn/Tooltip'
import LeftSidebarItem from './LeftSidebarItem'

interface LeftSidebarProps {
    appName: string
    appIcon: string
    sidebarStartItems: any
    sidebarEndItems: any
    redirect: (href: string) => void
}

const LeftSidebar = ({ appName, appIcon,sidebarStartItems, sidebarEndItems, redirect }: LeftSidebarProps) => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isNotMobile = useMediaQuery("(min-width: 640px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"div">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                'width',
                isMobile ? "0" : "calc(100% - 240px)"
            )
            navbarRef.current.style.setProperty('left', isMobile ? "100%" : "240px")
        }
        setTimeout(() => {
            setIsResetting(false);
        })
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty('width', '60%')
            navbarRef.current.style.setProperty('left', '0')
            setTimeout(() => {
                setIsResetting(false);
            })
        }
    }

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }

    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [isMobile, pathname])

    return (
        <>
            <div ref={sidebarRef} className={cn('group/sidebar max-h-screen bg-secondary overflow-auto sticky flex flex-col z-10 overflow-y-auto',
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0",
                isNotMobile && "min-w-[240px]"
            )}>
                <div onClick={collapse} className={cn('rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer',
                    isMobile && "opacity-100",
                )}>
                    {isMobile && <ChevronsLeft className='h-6 w-6' />}
                </div>
                <div className='py-4 px-2 flex flex-col justify-between flex-grow'>
                    <div>
                        <div className='flex items-center justify-center gap-4 w-full border-border/40 border-b-2 pb-4'>
                            {appIcon && <img src={appIcon} alt={appName} className='w-8 h-8'/>}
                            {appName && <h1 className='text-xl font-bold '>{appName}</h1>}
                        </div>
                        <div className='pt-4'>
                            {sidebarStartItems.map((item: any, index: number) => (
                            <LeftSidebarItem key={index} index={index} item={item} redirect={redirect} />
                            ))}
                        </div>
                    </div>
                    <div>
                        {sidebarEndItems.map((item: any, index: number) => (
                        <LeftSidebarItem key={index} index={index} item={item} redirect={redirect} />
                        ))}
                    </div>
                </div>
                <div onClick={resetWidth}
                    className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0' />
            </div>
            <div ref={navbarRef} className={cn('absolute left-60 w-[calc(100%-240px)] top-[1%] z-30',
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "left-[0px] w-full"
            )}>
                <nav className='bg-transparent px-3 py-2 w-full '>
                    {isCollapsed && <AlignJustifyIcon onClick={resetWidth} role="button" className='text-black dark:text-white h-6 w-6' />}
                </nav>

            </div>
        </>
    )
}

export default LeftSidebar;
