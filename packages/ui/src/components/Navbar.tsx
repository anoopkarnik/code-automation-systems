import React from 'react'
import { Button } from './ui/Button';
import { Avatar, AvatarImage,AvatarFallback } from './ui/Avatar';
import { Theme } from './Theme';

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
}



export const Navbar = ({appName,appIcon, screens, user,setTheme,onSignin,onSignout}:NavbarProps) => {
  return (
    <div className=' p-4 flex items-center justify-between mx-4 bg-background dark:bg-background 
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
            <img src={user?.image} alt={user?.name} className='w-10 h-10 rounded-full'/>
            <Button variant='default' className='mx-2' onClick={user? onSignout : onSignin}>
                {user ? "Logout" : "Login"}
            </Button>
        </div>
    </div>
  )
}