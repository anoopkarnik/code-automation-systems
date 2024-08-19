'use client' 
import React, { useContext, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@repo/ui/molecules/shadcn/Dialog';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { queryNotionPageAction } from '../../../../actions/notion/notion';
import { ConnectionsContext } from '../../../../providers/connections-provider';
import { format } from 'date-fns';


const SkillTreeDialog = ({ title, content }: any) => {

    const [pages, setPages] = useState<any>([]);
    const connectionsContext = useContext(ConnectionsContext);
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null); // State to track selected page ID

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const fetchPages = async () => {
      console.log(content, apiToken)
      if (!content || !apiToken) return;
      for (let page of content) {
        const data = await queryNotionPageAction({apiToken, pageId: page });
        console.log(data)
        setPages((pages: any) => [...pages, data]);
      }
    }
    setPages([]);
    fetchPages();
    event.stopPropagation();  // Prevent the event from bubbling up to the Card
  };

  const handlePageClick = (page: any) => {
    let id = page.Name.replaceAll(' ','-').replaceAll('/','-') + '-'+ page.id.replaceAll('-','');
    console.log(id)
    const url = `https://www.notion.so/${id}`; // Replace with your desired URL
    window.open(url, '_blank');
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={handleClick}>{title}</Button>
      </DialogTrigger>
      <DialogContent className='h-[90vh] min-w-[80%]  flex flex-col'>
        <DialogHeader>
          <DialogTitle className='text-center mb-4'>{title}</DialogTitle>
        </DialogHeader>
        <div className='flex-1 overflow-y-auto'>
          {pages && pages.length > 0 ? (
            <div className='flex flex-col'>
              {pages.map((page: any, index: number) => (
                <div key={index} className='cursor-pointer hover:bg-gray-800 p-4' onClick={() => handlePageClick(page)}>
                    <div className='flex items-center justify-start gap-2'>
                      {page.Name} 
                      <DialogDescription>{page['Review Date'] ? format(page['Review Date'], "dd MMMyy") : ''} | </DialogDescription>
                      <DialogDescription>{page?.['Self Grade Name']}</DialogDescription>
                    </div>
                    <DialogDescription>{page.Description ? page.Description : 'No Description Available'}</DialogDescription>
                </div>
              ))}
            </div>
          ) : (
            <p>No {title.toLowerCase()} available.</p>
          )}
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillTreeDialog;
