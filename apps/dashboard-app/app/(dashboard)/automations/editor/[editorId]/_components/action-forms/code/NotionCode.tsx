import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getDatabases } from '../../../../../../../actions/notion/notion';
import { getNotionConnection } from '../../../../../../../actions/connections/notion-connections';
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect';
import NotionFilterComponent from './NotionFilterComponent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs';
import NotionPropertiesComponent from './NotionPropertiesComponent';
import NotionChildrenComponent from './NotionChildrenComponent';


const NotionCode = () => {
    
    //Notion Variables
    const [notionAccounts, setNotionAccounts] = useState<any>([])
    const [selectedNotionAccount, setSelectedNotionAccount] = useState('')
    const [databases, setDatabases] = useState<any>([])
    const [selectedDatabase, setSelectedDatabase] = useState('')
    const [filterBody, setFilterBody] = useState<any>({})
    const [children, setChildren] = useState<any>({})
    const [properties, setProperties] = useState<any>({})

    const [sampleCode, setSampleCode] = useState('');

    const [variable, setVariable] = useState<any>('');
    const session = useSession();
    const userId = session?.data?.user?.id;


    const fetchSampleQueryDatabaseCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/notion/queryNotionDatabase.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);
            text = text.replaceAll("{{db_id}}", JSON.parse(selectedDatabase).id.replaceAll("-",""));
            text = text.replaceAll("{{filter_body}}", JSON.stringify(filterBody));
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchSampleCreatePageCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/notion/createNotionPage.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);
            text = text.replaceAll("{{db_id}}", JSON.parse(selectedDatabase).id.replaceAll("-",""));

            let lines = text.split('\n')
            let propertiesIndex= -1
            // Find the index of the line where `properties = {}` is located
            lines.forEach((line:any, index:any) => {
                if (line.includes('properties = {}')) {
                    propertiesIndex = index;
                }
                
            });
            lines.splice(propertiesIndex+1,0,properties.join('\n'))
            setSampleCode(lines.join('\n'));

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchSampleUpdatePageCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/notion/updateNotionPage.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);

            
            let lines = text.split('\n')
            let propertiesIndex= -1
            // Find the index of the line where `properties = {}` is located
            lines.forEach((line:any, index:any) => {
                if (line.includes('properties = {}')) {
                    propertiesIndex = index;
                }
                
            });
            lines.splice(propertiesIndex+1,0,properties.join('\n'))
            setSampleCode(lines.join('\n'));


        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchAppendBlockChildren = async () => {
        try {
            const response = await fetch('/samplePythonCodes/notion/appendBlockChildren.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);

            
            let lines = text.split('\n')
            let childrenIndex= -1
            // Find the index of the line where `children = []` is located
            lines.forEach((line:any, index:any) => {
                if (line.includes('children = []')) {
                    childrenIndex = index;
                }
                
            });
            lines.splice(childrenIndex+1,0,children.join('\n'))
            setSampleCode(lines.join('\n'));


        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const modifyFilterBody = (groupCondition:any,filterGroup:any) => {
        let filterBody:any = {}
        filterBody['filter'] = {}
        filterBody['filter'][groupCondition] = []
        filterGroup.forEach((group:any) => {
            let groupBody:any = {}
            groupBody[group.logic] = []
            group.rules.forEach((rule:any) => {
                let ruleBody:any = {}
                ruleBody['property'] = rule.name
                ruleBody[rule.type] = {}
                ruleBody[rule.type][rule.condition] = rule.value
                groupBody[group.logic].push(ruleBody)
            })
            filterBody['filter'][groupCondition].push(groupBody)
        })
        setFilterBody(filterBody)

    }

    const modifyProperties = (properties:any) => {
        let lines:any = []
        properties.forEach((property:any) => {
            if (property.type === 'text' || property.type === 'rich_text'){
                lines.push(
                    `properties["${property.name}"] = {"rich_text": [{"text": {"content": ${property.value}}}]}`
                )
            }
            else if (property.type === "title"){
                lines.push(
                    `properties["${property.name}"] = {"title": [{"text": {"content": "${property.value}"}}]}`
                )
            }
            else if (property.type === "date"){
                lines.push(
                    `properties["${property.name}"] = {"date": {"start": "${property.value}"}}`
                )
            }
            else if (property.type === "number"){
                lines.push(
                    `properties["${property.name}"] = {"number": ${property.value}}`
                )
            }
            else if (property.type === "file_url" || property.type === "files"){
                lines.push(
                    `properties["${property.name}"] = {"files": [{"type": "external", "name":"Cover", "external": {"url": "${property.value}"}}]}`
                )
            }
            else if (property.type === "url"){
                lines.push(
                    `properties["${property.name}"] = {"url": "${property.value}"}`
                )
            }
            else if (property.type === "checkbox"){
                lines.push(
                    `properties["${property.name}"] = {"checkbox": ${property.value}}`
                )
            }
            else if (property.type === "select"){
                lines.push(
                    `properties["${property.name}"] = {"select": {"name": "${property.value}"}}`
                )
            }
            else if (property.type === "multi_select"){
                lines.push(
                    `properties["${property.name}"] = {"multi_select":[{"name": "${property.value}"}]}`
                )
            }
            else if (property.type === "relation"){
                lines.push(
                    `properties["${property.name}"] = {"relation": [{"id": "${property.value}"}]}`
                )
            }
            else if (property.type === "status"){
                lines.push(
                    `properties["${property.name}"] = {"status": {"name": "${property.value}"}}`
                )
            }
        })
        setProperties(lines)
    }

    const modifyChildrenBody = (children:any) => {
        let lines:any = []
        children.forEach((child:any) => {
            if (child.type === "table_of_contents"){
                lines.push(
                    `children.append({"type": "${child.type}"`
                )
            }
            else if(child.type === "embed"){
                lines.push(
                    `children.append({"type": "${child.type}", "${child.type}": {"url": "${child.value}"}})`
                )
            }
            else {
                lines.push(
                    `children.append({"type": "${child.type}", "${child.type}": {"rich_text": [{"type": "text", "text": {"content": "${child.value}"}}]}})`
                )
            }
        })
        setChildren(lines)
    }

    useEffect(() => {
        const fetchNotionDetails = async () => {
            if (!userId) return;
            const res:any = await getNotionConnection(userId);
            setNotionAccounts(res);
            if(!selectedNotionAccount) return;
            const databases:any = await getDatabases(selectedNotionAccount);
            setDatabases(databases);
        }

        fetchNotionDetails()
    },[userId, selectedNotionAccount,selectedDatabase])

  return (
    <div>
        <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%]'>
            <Label className='ml-2'>Notion Account</Label>
            <Select onValueChange={(value) => setSelectedNotionAccount(value)} defaultValue={selectedNotionAccount}>
                <SelectTrigger>
                    <SelectValue placeholder='Select Notion Account'/>  
                </SelectTrigger>
                <SelectContent>
                    {notionAccounts?.map((account:any) => (
                        <SelectItem key={account.id} value={account.accessToken}>{account.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        {selectedNotionAccount && 
            <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%] '>
                <Label className='ml-2'>Notion Databases</Label>
                <SearchableSelect
                    name="Database"
                    options={databases || []}
                    selectedOption={selectedDatabase }
                    onChange={(value:any)=>{setSelectedDatabase(value)}}/>
                </div>}
        {selectedDatabase && 
            <div>
                <Tabs className='w-full' defaultValue='Filters'>
                    <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
                        <TabsTrigger key="Filters" value="Filters" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                          <div>Filters</div>
                        </TabsTrigger>
                        <TabsTrigger key="Properties" value="Properties" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                          <div>Properties</div>
                        </TabsTrigger>
                        <TabsTrigger key="Children" value="Children" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
                          <div>Children</div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='Filters'>
                        <NotionFilterComponent dbId={JSON.parse(selectedDatabase).id.replaceAll("-","")}
                            access_token={selectedNotionAccount}
                            modifyFilterBody={modifyFilterBody}/>
                    </TabsContent>
                    <TabsContent value='Properties'>
                        <NotionPropertiesComponent dbId={JSON.parse(selectedDatabase).id.replaceAll("-","")}
                            access_token={selectedNotionAccount}
                            modifyProperties={modifyProperties}/>
                    </TabsContent>
                    <TabsContent value='Children'>
                        <NotionChildrenComponent dbId={JSON.parse(selectedDatabase).id.replaceAll("-","")}
                            access_token={selectedNotionAccount}
                            modifyChildrenBody={modifyChildrenBody}/>
                    </TabsContent>

                </Tabs>
            </div>}
        <div className='flex flex-wrap gap-2 mt-4 ml-2 items-center'>
            {selectedNotionAccount && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(selectedNotionAccount)}>
                    Get Access Token
                </Button> }
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(JSON.parse(selectedDatabase).id.replaceAll("-",""))}>
                    Get Database ID
                </Button>}
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={fetchSampleQueryDatabaseCode}>
                    Query Database Sample Code
                </Button>}
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={fetchSampleCreatePageCode}>
                    Create Notion Page Sample Code
                </Button>}
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={fetchSampleUpdatePageCode}>
                    Update Notion Page Sample Code
                </Button>}
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={fetchAppendBlockChildren}>
                    Append Children Block Sample Code
                </Button>}
        </div>
        {variable && <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />}
        {sampleCode && <textarea className='p-2 mt-4 w-full h-96' value={sampleCode} placeholder='Sample Code' />}
        
    </div>
  )
}

export default NotionCode