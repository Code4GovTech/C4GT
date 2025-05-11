import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '../app/card/card.component';

// Define metadata for the component
const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  render: (args: CardComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title displayed in the overlay caption',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle displayed below the title',
    },
    badgeText: {
      control: 'text',
      description: 'Text displayed in the feature badge',
    },
    bodyText: {
      control: 'text',
      description: 'Main content text in the card body',
    },
    imageSrc: {
      control: 'text',
      description: 'URL for the card image',
    },
    showBadge: {
      control: 'boolean',
      description: 'Whether to show the feature badge',
    },
  },
  args: {
    // Default values for the stories
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    badgeText: 'Featured',
    bodyText: 'This is the main content of the card. It provides information related to the card title and subtitle.',
    imageSrc: 'https://source.unsplash.com/random/400x220/?nature',
    showBadge: true,
  },
};

export default meta;

export const Default = {
  args: {
    // Using default args from meta
  },
};