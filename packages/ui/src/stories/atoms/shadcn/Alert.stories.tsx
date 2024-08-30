import type {Meta, StoryObj} from '@storybook/react';

import { Alert, AlertDescription } from '../../../components/atoms/shadcn/Alert';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Alert> = {
    title: "atoms/shadcn/Alert",
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
}

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    args: {
        children: (<AlertDescription><pre>Default</pre> </AlertDescription>),
    }
}

export const Destructive: Story = {
    args: {
        children: (<AlertDescription><pre>Destructive</pre> </AlertDescription>),
        variant: "destructive"
    }
}
