import type {Meta, StoryObj} from '@storybook/react';

import { Alert } from '../../../components/atoms/shadcn/Alert';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Alert> = {
    title: "atoms/shadcn/Alert",
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    args: {
        variant: "default",
        children: "Default Alert",
    }
}
