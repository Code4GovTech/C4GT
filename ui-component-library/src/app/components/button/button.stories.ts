import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  render: (args: ButtonComponent) => ({
    component: ButtonComponent,
    props: args,
    styles: [`.btn { background-color: #f50057; color: white; }`],
  }),
  args: {
    label: 'Secondary Button',
  },
};
