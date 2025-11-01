import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '../app/card/card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive card component with customizable image, title, body, and optional buttons or badges.',
      },
    },
  },
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
    showLikeBtn: {
      control: 'boolean',
      description: 'Whether to show the like button',
    },
    showShareBtn: {
      control: 'boolean',
      description: 'Whether to show the share button',
    },
    readMoreClick: {
      action: 'clicked',
      description: 'Event emitted when Read More button is clicked',
      table: {
        category: 'Events',
      }
    },
    likeClick: {
      action: 'clicked',
      description: 'Event emitted when Like button is clicked',
      table: {
        category: 'Events',
      }
    },
    shareClick: {
      action: 'clicked',
      description: 'Event emitted when Share button is clicked',
      table: {
        category: 'Events',
      }
    }
  },
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    badgeText: 'Featured',
    bodyText: 'This is the main content of the card. It provides information related to the card title and subtitle.',
    imageSrc: 'https://fastly.picsum.photos/id/152/500/400.webp?hmac=MjztqHCLWbwBDYk9VHKPUe_aDUlVgoH4qWdWd1CAuko',
    showBadge: true,
    showLikeBtn: true,
    showShareBtn: true,
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {};

export const NoBadge: Story = {
  args: {
    showBadge: false,
  },
};

export const Minimal: Story = {
  args: {
    showBadge: false,
    showLikeBtn: false,
    showShareBtn: false,
  },
};

export const LongText: Story = {
  args: {
    bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut elit ut mauris fermentum imperdiet. 
               Quisque sit amet luctus justo. Vivamus efficitur urna nec urna tincidunt, vitae tempor nisl porta.`,
  },
};

export const NoImage: Story = {
  args: {
    imageSrc: '',
  },
};

export const BadgeHighlight: Story = {
  args: {
    title: '',
    subtitle: '',
    bodyText: '',
    showLikeBtn: true,
    showShareBtn: true,
    showBadge: true,
    badgeText: 'New!',
    imageSrc: 'https://fastly.picsum.photos/id/152/500/400.webp?hmac=MjztqHCLWbwBDYk9VHKPUe_aDUlVgoH4qWdWd1CAuko',
  },
};

