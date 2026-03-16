import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: 'Welcome to the Card!',
    content: 'This is a default card with a title and some content.',
  },
};

export const WithLongText: Story = {
  args: {
    title: 'Card with more content',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
  },
};
