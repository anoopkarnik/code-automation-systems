import type {Meta, StoryObj} from '@storybook/react';

import { Input } from '../../../components/atoms/shadcn/Input';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Input> = {
    title: "atoms/shadcn/Input",
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Default Input",
        className: "w-full"
    }
}

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Password Input",
        className: "w-[300px]"
    }
}

export const SearchNotes: Story = {
    args: {
        placeholder: "Search Notes",
        className: "w-[70vw] m-4"
    }
}
