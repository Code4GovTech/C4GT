import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../app/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Defines the visual style of the button',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Controls the size of the button',
    },
    label: {
      control: 'text',
      description: 'Text displayed inside the button',
    },
    buttonClick: {
      action: 'clicked',
      description: 'Event emitted when the button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button',
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/**
 * Primary button is used for main actions and to guide users to the most important action.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Primary Action',
  },
};

/**
 * Secondary button is used for secondary actions that don't require as much emphasis.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    label: 'Secondary Action',
  },
};
