
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../../components/atoms/shadcn/Tooltip';

export default {
  title: 'Atoms/shadcn/Tooltip',
  component: Tooltip,
  subcomponents: { TooltipTrigger, TooltipContent, TooltipProvider },

} as Meta;

type TooltipStoryProps = {
  sideOffset?: number;
  className?: string;
};
type Story = StoryObj<typeof Tooltip>;
export const Default: Story = {
  args: {
    children: 'Hover me',
  }
};
