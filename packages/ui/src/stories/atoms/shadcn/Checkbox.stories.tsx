import type {Meta, StoryObj} from '@storybook/react';

import { Checkbox } from '../../../components/atoms/shadcn/Checkbox';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Checkbox> = {
    title: "atoms/shadcn/Checkbox",
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        children: "Default Checkbox",
    }
}
