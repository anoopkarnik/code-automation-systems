import { Card, CardContent } from './ui/Card';
import { BeatLoader } from 'react-spinners';

const LoadingCard = (
) => {

  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <Card className='flex items-center justify-center w-[20%] h-[20%] bg-background text-foreground shadow-xl shadow-white/20'>
        <CardContent>
          <div className='text-4xl font-black animate-pulse text-center mb-4'>
            LOADING
          </div>
          <BeatLoader size={50} color='white'/>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingCard;