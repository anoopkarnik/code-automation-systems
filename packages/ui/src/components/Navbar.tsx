import React from 'react'
import { Button } from './ui/Button';
import { Avatar, AvatarImage,AvatarFallback } from './ui/Avatar';
import { Theme } from './Theme';
import { GoTriangleDown } from "react-icons/go";
import {
    LogOut,
    Settings,
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/Dropdown"
import { UserDropdown } from './UserDropdown';
import { SettingsDialog } from './SettingsDialog';
  

interface NavbarProps {
    appName?: string;
    appIcon?: string;
    screens?: {
        screenName?: string;
        screenIcon?: string;
    }[];
    user?:any;
    setTheme?:any;
    onSignin?:any;
    onSignout?:any;
    resetFunction?:any;
}



export const Navbar = ({appName,appIcon, screens, user,setTheme,onSignin,
    onSignout,resetFunction}:NavbarProps) => {

    
  return (
    <div className=' p-1 flex items-center justify-between mx-4 bg-background dark:bg-background 
    border-b-2 '>
        <div className='flex items-center gap-4'>
            {appIcon && <img src={appIcon} alt={appName} className='w-10 h-10'/>}
            {appName && <h1 className='text-2xl font-bold'>{appName}</h1>}
        </div>
        <div className='flex items-center'>
            {screens && screens.map((screen, index) => (
                <Button key={index} variant='outline' className='mx-2'>
                    {screen.screenName}
                </Button>
            ))}
        </div>
        <div className='flex items-center gap-4'>
            <Theme setTheme={setTheme}/>
            <UserDropdown 
                triggerChildren={
                    <div className='flex items-center'>
                        <Avatar className="w-10 h-10">
                            <AvatarImage  src={user?.image }/>
                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <GoTriangleDown className='bg-background '/>
                    </div>
                }
                logoutFunction={onSignout}
                user={user}
                resetFunction={resetFunction}
            />
                
        </div>
    </div>
  )
}