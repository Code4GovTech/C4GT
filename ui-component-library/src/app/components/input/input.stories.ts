import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputComponent>;

export const TextInput: Story = {
  args: {
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};
