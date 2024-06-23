'use client'
import { cn } from '@repo/ui/lib/utils'
import { MenuIcon} from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChevronsLeft } from 'lucide-react'

interface LeftSidebarProps {
    children: React.ReactNode;
}

const LeftSidebar = ({children}:LeftSidebarProps) => {

    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"div">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove",handleMouseMove)
        document.addEventListener("mouseup",handleMouseUp)
    }

    const handleMouseMove = (e:MouseEvent) =>{
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth< 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty('left',`${newWidth}px`)
            navbarRef.current.style.setProperty('width',`calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () =>{
        isResizingRef.current = false;
        document.removeEventListener("mousemove",handleMouseMove)
        document.removeEventListener("mouseup",handleMouseUp)
    }

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
        <div ref={sidebarRef} className={cn('group/sidebar min-h-screen bg-secondary overflow-y-auto relative w-60 flex flex-col z-[99999]',
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "w-0"
        )}>
            <div onClick={collapse} className={cn('rounded-lg hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer',
                isMobile && "opacity-100",
            )}>
                <ChevronsLeft className='h-6 w-6'/>
            </div>
            {children}
            <div onMouseDown={handleMouseDown} onClick={resetWidth}
            className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'/>
        </div>
        <div ref={navbarRef} className={cn('absolute z-[9999] left-60 w-[calc(100%-240px)] ',
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "left-[0px] w-full"
        )}>
            <nav className='bg-transparent px-3 py-2 w-full '>
                {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className='text-white h-6 w-6'/>}
            </nav>

        </div>
    </>
  )
}

export default LeftSidebar;