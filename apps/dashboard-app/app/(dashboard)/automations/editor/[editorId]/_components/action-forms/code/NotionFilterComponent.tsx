import React, { useEffect, useState } from 'react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { Input } from '@repo/ui/atoms/shadcn/Input';
import { queryNotionDatabaseProperties } from '../../../../../../../actions/notion/notion';
import { CircleXIcon, RecycleIcon, Trash2Icon } from 'lucide-react';
import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog';

interface Rule {
  name: string;
  type: string;
  condition: string;
  value: string;
}

interface FilterGroup {
  logic: string; // 'and' or 'or'
  rules: Rule[];
}

const NotionFilterComponent = ({dbId,access_token,modifyFilterBody}:any) => {
    const [properties, setProperties] = useState<any>({})
    const [groupCondition, setGroupCondition] = useState('and')
    const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
        { logic: 'and', rules: [{ name: '', type: '', condition: '', value: '' }] },
    ]);
  
    let conditions:any = {
        "checkbox": ["equals", "does_not_equal"],
        "date": ["after","before", "is_empty", "is_not_empty", "next_month", "next_week", "next_year","on_or_after",
            "on_or_before","past_month","past_week","past_year","this_week"],
        "files": ["is_empty", "is_not_empty"],
        "formula": ["equals", "does_not_equal", "is_empty", "is_not_empty", "contains","does_not_contain",
            "ends_with","starts_with","after","before", "next_month", "next_week", "next_year","on_or_after",
            "on_or_before","past_month","past_week","past_year","this_week"],
        "multi_select": ["contains","does_not_contain","is_empty","is_not_empty"],
        "number": ["equals", "does_not_equal","greater_than", "greater_than_or_equal_to","less_than","less_than_or_equal_to",
            "is_empty","is_not_empty"],
        "relation": ["is_empty", "is_not_empty", "contains","does_not_contain"],
        "rich_text": ["equals", "does_not_equal", "is_empty", "is_not_empty", "contains","does_not_contain",
            "ends_with","starts_with"],
        "rollup": ["any", "every", "none" ],
        "select": ["equals", "does_not_equal", "is_empty", "is_not_empty"],
        "status": ["equals", "does_not_equal", "is_empty", "is_not_empty"],
        "timestamp": ["created_time","last_edited_time"]
    }

    // Function to add a new rule to a filter group
    const addRuleToGroup = (groupIndex: number) => {
        const updatedGroups:any = [...filterGroups];
        updatedGroups[groupIndex].rules.push({ name: '', condition: '', value: '' });
        modifyFilterBody(groupCondition,updatedGroups)
        setFilterGroups(updatedGroups);
    };

    // Function to add a new filter group
    const addFilterGroup = () => {
        setFilterGroups([...filterGroups, { logic: 'or', rules: [{ name: '', type: '', condition: '', value: '' }] }]);
    };

    // Function to handle changing a rule
    const handleRuleChange = (groupIndex: number, ruleIndex: number, key: string, value: string) => {
        const updatedGroups:any = [...filterGroups];
        if (key === 'name') {
            const type = properties[value].type;
            updatedGroups[groupIndex].rules[ruleIndex]['type'] = properties[value].type;
            updatedGroups[groupIndex].rules[ruleIndex][key] = value;
        }
        else if (key === 'value') {
            if ( updatedGroups[groupIndex].rules[ruleIndex]['type'] === 'number') {
                updatedGroups[groupIndex].rules[ruleIndex][key] = Number(value);
            }
            else{
                updatedGroups[groupIndex].rules[ruleIndex][key] = value;
            }
        }
        else {
            updatedGroups[groupIndex].rules[ruleIndex][key] = value;
        }

        modifyFilterBody(groupCondition,updatedGroups)
        setFilterGroups(updatedGroups);
    };

    // Function to remove a single rule from a group
    const removeRuleFromGroup = (groupIndex: number, ruleIndex: number) => {
        const updatedGroups:any = [...filterGroups];
        updatedGroups[groupIndex].rules = updatedGroups[groupIndex].rules.filter((_:any, i:any) => i !== ruleIndex);
        modifyFilterBody(groupCondition,updatedGroups)
        setFilterGroups(updatedGroups);
    };


  useEffect(() => {
    const fetchDatabaseProperties= async () => {
        if (!dbId) return;
        if (!access_token) return;
        const res:any = await queryNotionDatabaseProperties({apiToken: access_token, database_id:dbId.replaceAll("-","")});
        setProperties(res.properties)
    }
    fetchDatabaseProperties()
  },[dbId,access_token])

  const handleSelect = (value:any) =>{
    setGroupCondition(value)
    modifyFilterBody(groupCondition,filterGroups)
  }

  const modifyRuleLogic = (groupIndex: number, value: string) => {
    const updatedGroups:any = [...filterGroups];
    updatedGroups[groupIndex].logic = value;
    modifyFilterBody(groupCondition,updatedGroups)
    setFilterGroups(updatedGroups);
  }

  return (
    <div className="rounded-md border-border/30 border-2 p-4">
        <div className="flex items-center mb-2">
            <Select onValueChange={handleSelect}>
                <SelectTrigger>
                    <SelectValue>{groupCondition}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="and">and</SelectItem>
                    <SelectItem value="or">or</SelectItem>
                </SelectContent>
            </Select>
        </div>

      {filterGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="filter-group mb-4 p-4 rounded-lg shadow-md relative">
            <ConfirmDialog
                alertActionFunction={() => setFilterGroups(filterGroups.filter((_, i) => i !== groupIndex))} 
                alertTitle='Delete Filter Group' 
                alertDescription='Are you sure you want to delete this filter group permanently ?'
                buttonDiv={<CircleXIcon className='h-5 w-5 absolute top-6 right-6 cursor-pointer text-foreground/50' />}
                alertActionText='Delete'
            />
          <div className="rules space-y-4 border-border/30 border-2 p-4">
            {group.rules.map((rule, ruleIndex) => (
            <div key={ruleIndex} className="grid grid-cols-12 justify-center items-center gap-2">
                {/* name Selector */}
                {ruleIndex === 1 && <Select onValueChange={(value)=>modifyRuleLogic(groupIndex,value)}>
                    <SelectTrigger className='col-span-2'>
                        <SelectValue>{group.logic}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="and">and</SelectItem>
                        <SelectItem value="or">or</SelectItem>
                    </SelectContent>
                </Select>}
                {ruleIndex !== 1 && <div className='col-span-2' ></div>}
                <Select onValueChange={(value) => handleRuleChange(groupIndex, ruleIndex, 'name', value)}>
                  <SelectTrigger className='col-span-3'> 
                    <SelectValue>{filterGroups[groupIndex]?.rules[ruleIndex]?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(properties).map((property:any) => (
                        <SelectItem key={property} value={property}>{property}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Condition Selector */}
                <Select onValueChange={(value) => handleRuleChange(groupIndex, ruleIndex, 'condition', value)}>
                  <SelectTrigger className='col-span-2'>
                    <SelectValue>{rule.condition}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {filterGroups[groupIndex] && filterGroups[groupIndex].rules[ruleIndex] && 
                    conditions[properties[filterGroups[groupIndex].rules[ruleIndex]['name']]?.type]?.
                    map((condition: string, i: number) => (
                        <SelectItem key={i} value={condition}>{condition}</SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                {/* Value Input */}
                <Input
                  value={rule.value}
                  onChange={(e) => handleRuleChange(groupIndex, ruleIndex, 'value', e.target.value)}
                  placeholder="Enter value"
                  className="col-span-4 bg-background dark:bg-background text-foreground dark:text-foreground"
                />
                <ConfirmDialog
                    alertActionFunction={() => removeRuleFromGroup(groupIndex, ruleIndex)} 
                    alertTitle='Delete Filter Rule' 
                    alertDescription='Are you sure you want to delete this filter rule permanently ?'
                    buttonDiv={<Trash2Icon className='w-5 h-5 cursor-pointer col-span-1 text-foreground/50' />}
                    alertActionText='Delete'
                />
              </div>
            ))}

            <Button onClick={() => addRuleToGroup(groupIndex)} className="mt-2" variant="outline">
              + Add Rule
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addFilterGroup} variant="outline">
        + Add Filter Group
      </Button>
    </div>
  );
};

export default NotionFilterComponent;
