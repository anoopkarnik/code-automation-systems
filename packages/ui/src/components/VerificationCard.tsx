import { FormResult } from './FormResult';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';

import { BeatLoader } from 'react-spinners';

interface VerificationCardProps {
  error?:string;  
  success?:string;
  backFunction?:any;
}

const VerificationCard = ({error,success,backFunction}
  :VerificationCardProps
) => {

  return (
    <Card className='w-[40%] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center flex items-center justify-center gap-4 my-4'>
           Verification
        </div>
        <div className='text-md font-extralight text-center'>Confirming your verification!</div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center'>
          {(!success && !error) && <BeatLoader size={20} color='black'/>}
          {!success && <FormResult type="error" message={error }/>}
          <FormResult type="success" message={success}/>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
      <div onClick={backFunction} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>
          Back to Login
      </div>
      </CardFooter>
    </Card>
  )
}

export default VerificationCard;