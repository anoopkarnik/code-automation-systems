import React, { useEffect, useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn/Select';
import { Input } from '../../atoms/shadcn/Input';


interface SearchableSelectProps {
    name: string;
    options: any[];
    selectedOption: any;
    onChange: any
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ name, options, selectedOption, onChange }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const filtered = options.filter((option) => {
            if (!option.name) return false;
            return option.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Ensure the selected database is included in the filtered list
        if (selectedOption?.id) {
            const selectedOptionVar = JSON.parse(selectedOption);
            if (!filtered.some((db) => db.id === selectedOptionVar.id)) {
                filtered.push(selectedOptionVar);
            }
        }

        setFilteredOptions(filtered);
    }, [searchQuery, options, selectedOption]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
      if (isOpen && inputRef.current) {
          setTimeout(() => {
              inputRef.current?.focus()
          }, 0)
      }
  }, [isOpen])

    return (
        <>
          <Select value={selectedOption} onValueChange={onChange} onOpenChange={setIsOpen}>
              <SelectTrigger className='w-full'>
                  <SelectValue placeholder={`Select ${name}`} />
              </SelectTrigger>
              <SelectContent className='z-[500]'>
                  <Input
                      ref={inputRef}
                      placeholder={`Search ${name}`}
                      className='w-full '
                      value={searchQuery}
                      onChange={handleSearch}
                  />
                  {filteredOptions.length > 0 &&
                      filteredOptions.map((option) => (
                          <SelectItem
                              key={option.id}
                              value={JSON.stringify({
                                  id: option.id,
                                  icon: option.icon,
                                  name: option.name,
                                  accessToken: option.accessToken,
                              })}
                          >
                              <div className='flex items-center justify-center gap-4'>
                                  <div>{option.icon || '⛁'}</div>
                                  <div className='flex flex-col items-start justify-center'>
                                      <div>{option.name}</div>
                                  </div>
                              </div>
                          </SelectItem>
                      ))}
              </SelectContent>
          </Select>
        </>
    );
};

export default SearchableSelect;
