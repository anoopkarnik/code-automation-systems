import type {Meta, StoryObj} from '@storybook/react';

import { Button } from '@repo/ui/molecules/shadcn/Button';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Button> = {
    title: "Components/Molecules/Shadcn/Button",
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    }
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: "default",
        size: "sm",
        disabled: false,
        onClick: action('default button clicked'),
        children: "Default Button",
        className: "shadow-lg"
    }
}