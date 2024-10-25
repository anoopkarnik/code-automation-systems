import React, { useEffect, useState } from 'react'
import { queryNotionDatabaseProperties } from '../../../../../../../actions/notion/notion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog'
import { Trash2Icon } from 'lucide-react'

const NotionPropertiesComponent = ({dbId,access_token,modifyProperties}:any) => {
    const [properties, setProperties] = useState<any>({})
    const [selectedProperties, setSelectedProperties] = useState<any>([
        { name: '', type: '', value: '' }
    ])

    useEffect(() => {
        const fetchDatabaseProperties= async () => {
            if (!dbId) return;
            if (!access_token) return;
            const res:any = await queryNotionDatabaseProperties({apiToken: access_token, database_id:dbId.replaceAll("-","")});
            setProperties(res.properties)
        }
        fetchDatabaseProperties()
      },[dbId,access_token])

    const modifyProperty = (index:any, key:any, value:any) => {
        const pastProperties = [...selectedProperties]
        pastProperties[index][key] = value
        if (key == "name") {    
            pastProperties[index].type =properties[pastProperties[index][key]].type
        }
        
        setSelectedProperties(pastProperties)
        modifyProperties(pastProperties)
    }

    const addProperty = () => {
        const newProperty = { name: '', type: '', value: '' }
        setSelectedProperties([...selectedProperties,newProperty])
    }

    const removeProperty = (index:any) => {
        const pastProperties = [...selectedProperties]
        setSelectedProperties(pastProperties.filter((_:any, i:any) => i !== index))
    }

  return (
    <div className='rounded-md border-border/30 border-2 p-4 flex flex-col gap-4 '>
        {selectedProperties.map((property:any,index:number) => (
            <div key={index} className="grid grid-cols-10 gap-2  items-center">
                <div>Property {index+1}</div>
                <Select onValueChange={(value) => modifyProperty(index,"name", value)}>
                    <SelectTrigger className='col-span-4'> 
                    <SelectValue>{selectedProperties[index].name}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                    {Object.keys(properties).map((property:any) => (
                        <SelectItem key={property} value={property}>{property}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                {selectedProperties[index].type && 
                    (selectedProperties[index].type != "select" && selectedProperties[index].type != "multi_select") &&  
                    <Input 
                        placeholder='Enter Value'  
                        className='col-span-4' 
                        onChange={(e) => modifyProperty(index,"value",e.target.value)}
                    />
                }
                 {selectedProperties[index].type && 
                    (selectedProperties[index].type == "multi_select") &&  
                    <Select onValueChange={(value) => modifyProperty(index,"value", value)}>
                        <SelectTrigger className='col-span-4'> 
                            <SelectValue>{selectedProperties[index].value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {properties[selectedProperties[index]?.name].multi_select.options.map((property:any) => (
                                <SelectItem key={property.name} value={property.name}>{property.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                }
                {selectedProperties[index].type && 
                    (selectedProperties[index].type == "select") &&  
                    <Select onValueChange={(value) => modifyProperty(index,"value", value)}>
                        <SelectTrigger className='col-span-4'> 
                            <SelectValue>{selectedProperties[index].value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {properties[selectedProperties[index]?.name].select.options.map((property:any) => (
                                <SelectItem key={property.name} value={property.name}>{property.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                }
                 <ConfirmDialog
                    alertActionFunction={() => removeProperty(index)} 
                    alertTitle='Delete Property' 
                    alertDescription='Are you sure you want to delete this property?'
                    buttonDiv={<Trash2Icon className='w-5 h-5 cursor-pointer col-span-1 text-foreground/50' />}
                    alertActionText='Delete'
                />
            </div>
        ))}
        <Button onClick={addProperty} variant="outline" className='mt-4'>Add Property</Button>

    </div>
  )
}

export default NotionPropertiesComponent