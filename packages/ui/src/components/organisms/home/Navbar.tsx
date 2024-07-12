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
    <div className=' p-1 flex items-center justify-between bg-secondary dark:bg-secondary sticky top-0 z-20 border-b-[1px] border-border dark:border-border px-4'>
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
            <Theme setTheme={setTheme}/>
            <UserDropdown 
                triggerChildren={
                    <div className='flex items-center cursor-pointer'>
                        <Avatar className="w-12 h-12 dark:w-10 dark:h-10 border-[1px] border-border shadow-lg shadow-border/10">
                            <AvatarImage  src={user?.image }/>
                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <GoTriangleDown className='bg-inherit '/>
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