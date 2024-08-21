import { Button } from '../../molecules/shadcn/Button';
import { Avatar, AvatarImage,AvatarFallback } from '../../molecules/shadcn/Avatar';
import { Theme } from './Theme';
import { GoTriangleDown } from "react-icons/go";
import { UserDropdown } from './UserDropdown';
import { BellIcon } from 'lucide-react';
import { Notification } from './Notification';

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



export const Navbar = ({appName,appIcon, screens, user,setTheme,
    onSignout,resetFunction}:NavbarProps) => {

    
  return (
    <div className=' p-1 flex items-center justify-between bg-secondary dark:bg-secondary sticky top-0 z-20 border-b-[1px] border-border dark:border-border px-4 py-2'>
        <div className='flex items-center gap-4'>
            {appIcon && <img src={appIcon} alt={appName} className='w-10 h-10 hidden sm:block'/>}
            {appName && <h1 className='text-2xl font-bold hidden sm:block'>{appName}</h1>}
        </div>
        <div className='flex items-center'>
            {screens && screens.map((screen, index) => (
                <Button key={index} variant='outline' className='mx-2 '>
                    {screen.screenName}
                </Button>
            ))}
        </div>
        <div className='flex items-center gap-4'>
            <Notification/>
            <Theme setTheme={setTheme}/>
            <UserDropdown 
                triggerChildren={
                    <Button variant="outline"  className="w-9 h-9 dark:w-10 dark:h-10 rounded-full">
                        <Avatar className="w-9 h-9 border-[1px] border-border shadow-lg shadow-border/10">
                            <AvatarImage  src={user?.image }/>
                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <GoTriangleDown className='bg-inherit '/>
                    </Button>
                }
                logoutFunction={onSignout}
                user={user}
                resetFunction={resetFunction}
            />
                
        </div>
    </div>
  )
}