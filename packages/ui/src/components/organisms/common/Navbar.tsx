import { Button } from '../../molecules/shadcn/Button';
import { Avatar, AvatarImage,AvatarFallback } from '../../molecules/shadcn/Avatar';
import { Theme } from './Theme';
import { GoTriangleDown } from "react-icons/go";
import { UserDropdown } from './UserDropdown';

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
    <div className=' p-1 flex items-center justify-between mx-4 bg-background dark:bg-background 
    border-b-2 '>
        <div className='flex items-center gap-4'>
            {appIcon && <img src={appIcon} alt={appName} className='w-10 h-10'/>}
            {appName && <h1 className='text-2xl font-bold hidden sm:block'>{appName}</h1>}
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