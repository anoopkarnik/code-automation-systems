import type {Meta, StoryObj} from '@storybook/react';

import { Button } from '../../../components/atoms/shadcn/Button';

import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Button> = {
    title: "atoms/shadcn/Button",
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
        size: "lg", 
        children: "Default Button",
    }
}

export const FormButton: Story = {
    args: {
        variant: "secondary",
        size: "lg", 
        children: "Form Button",
    }
}

export const NotesButton: Story = {
    args: {
        variant: "outline",
        size: "lg", 
        children: "Notes Button",
    }
}

export const WorkflowButton: Story = {
    args: {
        variant: "default",
        size: "lg", 
        children: "Workflow Button",
        className: "w-full"
    }
}