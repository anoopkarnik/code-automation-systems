'use client' 
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@repo/ui/molecules/shadcn/Dialog';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import Notes from './Notes';


const SkillTreeDialog = ({ title, ids}: any) => {

    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
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
        <Notes title={title} ids={ids}/>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillTreeDialog;
