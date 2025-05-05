import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Layouts/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const DefaultHeader: Story = {
  args: {
    title: 'My App',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
};
