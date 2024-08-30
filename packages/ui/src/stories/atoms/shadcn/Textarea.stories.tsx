import type {Meta, StoryObj} from '@storybook/react';

import { Textarea } from '../../../components/atoms/shadcn/Textarea';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Textarea> = {
    title: "atoms/shadcn/Textarea",
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        placeholder: "Default Textarea",
        className: "w-[300px]"
    }
}
