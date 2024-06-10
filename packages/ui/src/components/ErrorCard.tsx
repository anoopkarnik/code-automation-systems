import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { BsExclamationTriangle } from 'react-icons/bs';

interface ErrorCardProps {
  backFunction?:any
}

const ErrorCard = ({backFunction}
  :ErrorCardProps
) => {

  return (
    <Card className='w-[40%] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center flex items-center justify-center gap-4 my-4'>
          <BsExclamationTriangle/> Error
        </div>
        <div className='text-md font-extralight text-center'>Oops! Something went wrong!</div>
      </CardHeader>
      <CardFooter className='flex justify-center'>
        <div onClick={backFunction} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>Back to login</div>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard;