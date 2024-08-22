import { Card, CardContent } from '../../molecules/shadcn/Card';
import { BeatLoader } from 'react-spinners';

const LoadingCard = ({title,description}:any) => {

  return (
    <div className='w-full flex items-center justify-center mt-10'>
      <Card className='flex items-center justify-center bg-background text-foreground shadow-xl shadow-white/20 p-4'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='text-4xl font-black animate-pulse text-center mb-4'>
              Loading {title}
            </div>
            <div className='text-lg animate-pulse text-center'>
              {description}
            </div>
            <BeatLoader size={20} color='white'/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingCard;