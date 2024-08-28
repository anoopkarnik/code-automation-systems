import type {Meta, StoryObj} from '@storybook/react';

import { Tooltip } from '../../../components/atoms/shadcn/Tooltip';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Tooltip> = {
    title: "atoms/shadcn/Tooltip",
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        children: "Default Tooltip",
    }
}
