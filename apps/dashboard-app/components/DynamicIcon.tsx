import Image from 'next/image';
import * as Icons from 'lucide-react';

export default function DynamicIcon({ icon }:any) {
  const IconComponent:any = Icons[icon as keyof typeof Icons];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon.startsWith('/') ? (
        <Image src={icon} className="h-6 w-6" alt="" width={24} height={24} />
      ) : IconComponent ? (
        <IconComponent className="h-6 w-6" />
      ) : (
        <span>Icon not found</span>
      )}
    </div>
  );
}
