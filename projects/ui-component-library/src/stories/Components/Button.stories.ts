// src/stories/Components/Button.stories.ts

import { moduleMetadata } from '@storybook/angular';
import { ComponentsModule } from '../../../src/app/components/components.module';
import { HostComponent } from '../../../src/app/components/button/host.component';

export default {
  title: 'Components/Button',
  component: HostComponent,
  decorators: [
    moduleMetadata({
      imports: [ComponentsModule],
    }),
  ],
  args: {
    label: 'Primary Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Primary = {};
