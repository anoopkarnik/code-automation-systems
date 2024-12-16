import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/Card'
import { Skeleton } from '../shadcn/Skeleton'

const HeaderCard = ({title,description,value,type,prefix,suffix}:any) => {
  return (
    <Card className="flex flex-col items-start justify-between ">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {value?
              <div className='font-emphasized'>
                {prefix}
                {type=="Currency"?Math.round(value)/1000 +"k":value}
                {suffix}
              </div>:
            <Skeleton/>}
            {value == 0 &&               
              <div className='font-emphasized'>
                {prefix}
                {value}
                {suffix}
              </div>}
        </CardContent>
    </Card>
  )
}

export default HeaderCard