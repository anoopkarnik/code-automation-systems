import type {Meta, StoryObj} from '@storybook/react';

import { Avatar, AvatarImage } from '../../../components/atoms/shadcn/Avatar';

import {action} from "@storybook/addon-actions";
import { AvatarFallback } from '@radix-ui/react-avatar';

const meta: Meta<typeof Avatar> = {
    title: "atoms/shadcn/Avatar",
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        className: "w-9 h-9 border-[1px] border-border shadow-lg shadow-border/10",
        children: <><AvatarImage  src="https://randomuser.me/api/portraits/women/46.jpg"/>
        <AvatarFallback>A</AvatarFallback></>,
    }
}
