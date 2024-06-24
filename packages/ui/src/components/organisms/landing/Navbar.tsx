import { Button } from '../../molecules/shadcn/Button';
interface NavbarProps {
    appName?: string;
    appIcon?: string;
    screens?: {
        screenName?: string;
        screenHref?: string;

    }[];
    onSignin?:any;
    onSignup?:any;
}

export const Navbar = ({appName,appIcon, screens,onSignin,onSignup}:NavbarProps) => {

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
        <div className='flex items-center'>
            <div className='flex items-center gap-4'>
                <Button variant='outline' onClick={onSignin}>Login</Button>
                <Button onClick={onSignup}>Sign Up</Button>
            </div>
        </div>
    </div>
  )
}