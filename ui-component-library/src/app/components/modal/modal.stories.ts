import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const OpenModal: Story = {
  args: {
    title: 'Storybook Modal',
    content: 'This modal is open by default.',
    isOpen: true,
  },
};

export const ClosedModal: Story = {
  args: {
    isOpen: false,
  },
};
