import { Button } from '../../atoms/shadcn/Button';
import { Avatar, AvatarImage,AvatarFallback } from '../../atoms/shadcn/Avatar';
import { Theme } from './Theme';
import { GoTriangleDown } from "react-icons/go";
import { UserDropdown } from './UserDropdown';
import { Notification } from './Notification';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '../../../lib/utils';

interface NavbarProps {
    title?: string;
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



export const Navbar = ({title, screens, user,setTheme,
    onSignout,resetFunction}:NavbarProps) => {
        const isMobile = useMediaQuery("(max-width: 640px)");
    
  return (
    <div className=' p-1 flex items-center justify-between bg-inherit sticky top-0 z-20  px-4 py-2'>
        <div className='flex items-center'>
           {!isMobile && title && <div className='text-lg font-normal'>{title}</div>}
        </div>
        <div className={cn('flex items-center gap-4',
            isMobile && 'gap-2'
        )}>
            <Notification/>
            <Theme setTheme={setTheme}/>
            <UserDropdown 
                triggerChildren={
                    <Button variant="outline"  className="w-9 h-9 dark:w-10 dark:h-10 rounded-full">
                        <Avatar className="w-9 h-9 shadow-lg shadow-border/10">
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