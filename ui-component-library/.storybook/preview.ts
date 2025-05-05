import '../src/styles.css';  // adjust if you're using SCSS or CSS
import type { Preview } from '@storybook/angular'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;