import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { CommonModule } from '@angular/common';

import Button from './button.component';
import Header from './header.component';
import Page from './page.component';

const meta: Meta<Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [Button, Header],
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<Page>;

export const LoggedOut: Story = {
  render: (args: Page) => ({
    props: args,
  }),
};

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const LoggedIn: Story = {
  render: (args: Page) => ({
    props: args,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
