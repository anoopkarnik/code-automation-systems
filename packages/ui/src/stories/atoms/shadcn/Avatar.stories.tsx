import type {Meta, StoryObj} from '@storybook/react';

import { Avatar } from '../../../components/atoms/shadcn/Avatar';

import {action} from "@storybook/addon-actions";

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
        children: "Default Avatar",
    }
}
