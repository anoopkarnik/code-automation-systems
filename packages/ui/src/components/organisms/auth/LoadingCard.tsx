import { Card, CardContent } from '../../molecules/shadcn/Card';
import { BeatLoader } from 'react-spinners';

const LoadingCard = (
) => {

  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <Card className='flex items-center justify-center w-[20%] h-[20%] bg-background text-foreground shadow-xl shadow-white/20'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='text-4xl font-black animate-pulse text-center mb-4'>
              LOADING
            </div>
            <BeatLoader size={30} color='white'/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingCard;