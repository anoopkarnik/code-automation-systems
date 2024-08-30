import type {Meta, StoryObj} from '@storybook/react';

import { Label } from '../../../components/atoms/shadcn/Label';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Label> = {
    title: "atoms/shadcn/Label",
    component: Label,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        children: "Default Label",
        htmlFor: "airplane-mode"
    }
}

export const SelectLabel: Story = {
    args: {
        children: "Select Label",
        className: "ml-2"
    }
}

export const DbLabel: Story = {
    args: {
        children: "Db Label",
        className: "ml-2 text-xl mb-4"
    }
}