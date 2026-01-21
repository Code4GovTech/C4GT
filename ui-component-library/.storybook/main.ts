import { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/angular',
  webpackFinal: async (config) => {
    // Ensure config.module exists before accessing rules
    if (config.module?.rules === undefined) {
      config.module = { rules: [] }; // Initialize if it's undefined
    }

    // Adding CSS loader to handle CSS files
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: /src/,
    });

    return config;
  },
};

export default config;
