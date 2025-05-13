import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from '../app/header/header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Layout/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive and responsive header component with support for logo, navigation, user profile, search, and theme customization.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main heading or brand name/logo text.',
    },
    userAvatarUrl: {
      control: 'text',
      description: 'Path or URL to display the user avatar/profile image (for logged-in state).',
    },
    logoUrl: {
      control: 'text',
      description: 'URL/path to the logo image (optional if using title).',
    },
    navLinks: {
      control: 'object',
      description: 'Array of navigation link objects with properties like label and URL.',
    },
    showAuthButton: {
      control: 'boolean',
      description: 'Toggle visibility of Login/Signup or Logout buttons.',
    },
  },
  args: {
    // Default Values
    title: 'StoryBook',
    logoUrl: 'https://img.icons8.com/?size=100&id=71256&format=png&color=000000',
    userAvatarUrl: 'https://img.icons8.com/?size=100&id=71256&format=png&color=000000',
    navLinks: {},
    showAuthButton: false,
  }
};

export default meta;
export type Story = StoryObj<HeaderComponent>;


export const Default: Story = {
  args: {
    title: 'StoryBook',
    logoUrl: 'https://img.icons8.com/?size=100&id=71256&format=png&color=000000',
    userAvatarUrl: 'https://avatars.githubusercontent.com/u/132006996?v=4',
    navLinks: {
      Products: '/products',
      About: '/about',
      Blog: '/blog',
      Pricing: '/pricing'
    },    
    showAuthButton: true,
  }
};


