import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const ImageOrIcon = ({item,height,width,opacity}:any) => {
    const {theme} = useTheme();
    const [image,setImage] = useState<any>(null);

    useEffect(() => {
        if (item.image){
            setImage(theme === "dark" ? item.imageDark : item.image);
        }
    },[theme,item])

  return (
    <>
        {item.icon && <item.icon className={`w-${width} h-${height} opacity-${opacity}`} />}
        {!item.icon && <Image src={image} alt={item.alt} height={height} width={width} />}
    </>
  )
}

export default ImageOrIcon