import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../app/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A customizable input field supporting various states, styles, and behaviors.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'Specifies the input type (e.g., text, email, password)',
    },
    value: {
      control: 'text',
      description: 'Initial value of the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text inside the input',
    },
    label: {
      control: 'text',
      description: 'Label displayed above or beside the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field when true',
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only when true',
    },
    required: {
      control: 'boolean',
      description: 'Marks the input as required',
    },
    autocomplete: {
      control: 'boolean',
      description: 'Enable or disable browser autocomplete',
    },
    variant: {
      control: 'radio',
      options: ['outline', 'filled'],
      description: 'Visual variant of the input',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the input field',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, input takes full container width',
    },
  },
  args: {
    type: 'text',
    value: '',
    placeholder: 'Enter your name',
    label: 'Name',
    disabled: false,
    readonly: false,
    required: false,
    autocomplete: false,
    variant: 'outline',
    size: 'medium',
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {},
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Enter email',
    label: 'Email',
    type: 'email',
  },
};

export const DisabledInput: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    placeholder: 'This field is disabled',
  },
};

export const ReadOnlyInput: Story = {
  args: {
    label: 'Read-Only',
    readonly: true,
    value: 'You cannot edit this',
  },
};

export const RequiredInput: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'Must fill this',
  },
};

export const FullWidthInput: Story = {
  args: {
    label: 'Full Width',
    fullWidth: true,
    placeholder: 'Takes full width',
  },
};


export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline style',
    label: 'Outline',
  },
};

export const FilledVariantWithValue: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input',
    label: 'Filled Input',
    value: 'Pre-filled text',
  },
};


export const SmallSize: Story = {
  args: {
    size: 'small',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};
