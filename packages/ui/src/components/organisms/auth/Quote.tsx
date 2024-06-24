interface QuoteProps {
    quote: string,
    author: string,
    credential: string
}

const Quote = ({quote,author,credential}:QuoteProps) => {
  return (
    <div className='h-screen flex justify-center items-center flex-col text-black'>
        <div className='flex flex-col justify-center text-left mx-[10%]'>
            <div className='text-4xl font-bold '>
                {quote}
            </div>
            <div className='max-w-md text-left text-2xl font-semibold mt-4 '>
                {author}
            </div>
            <div className='max-w-md text-left text-xl text-gray-400  '>
               {credential}
            </div>
        </div>
    </div>
  )
}

export default Quote