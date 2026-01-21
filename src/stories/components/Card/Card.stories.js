import React from 'react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Welcome to Storybook',
  description: 'This is a simple reusable Card component using Tailwind CSS.',
  children: <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Action</button>,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  children: (
    <div>
      <h3 className="text-lg font-medium">Custom Card</h3>
      <p className="text-sm text-gray-500">This card shows fully custom content inside.</p>
    </div>
  ),
};
