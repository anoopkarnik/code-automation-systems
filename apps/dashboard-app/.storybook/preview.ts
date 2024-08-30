import type { Preview } from "@storybook/react";
import "../../../packages/ui/src/styles/shadcn-rose.css"
import { themes } from '@storybook/theming';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, appBg: 'bg-background' },
      other: { ...themes.normal, appBg: 'bg-red-400' },
      // Override the default light theme
      light: { ...themes.normal, appBg: 'bg-background' }
    }
  },
};

export default preview;
