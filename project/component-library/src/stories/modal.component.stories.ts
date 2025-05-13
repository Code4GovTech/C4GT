import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from '../app/modal/modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible and reusable modal component with header, content, footer, and close functionality.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading displayed at the top of the modal.',
    },
    content: {
      control: 'text',
      description: 'The main content or message shown inside the modal.',
    },
    confirmText: {
      control: 'text',
      description: 'Text shown on the confirm/accept button.',
    },
    cancelText: {
      control: 'text',
      description: 'Text shown on the cancel/reject button.',
    },
    showCloseBtn: {
      control: 'boolean',
      description: 'Whether to show the top-right close (X) button.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible or hidden.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer with action buttons.',
    },
  },
  args: {
    title: 'Modal Title',
    content: 'This is an example of modal content for demonstration purposes.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    showCloseBtn: true,
    isOpen: true,
    showFooter: true,
  },
};

export default meta;
export type Story = StoryObj<ModalComponent>;

export const Default: Story = {};

export const WithoutFooter: Story = {
  args: {
    showFooter: false,
  },
};

export const OnlyConfirm: Story = {
  args: {
    cancelText: '',
  },
};

export const OnlyCancel: Story = {
  args: {
    confirmText: '',
  },
};

export const NoCloseButton: Story = {
  args: {
    showCloseBtn: false,
  },
};

export const HiddenModal: Story = {
  args: {
    isOpen: false,
  },
};
