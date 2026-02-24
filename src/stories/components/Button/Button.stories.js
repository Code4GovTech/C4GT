import React from 'react';
import Button from '../../../components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
  size: 'medium',
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Danger Button',
  variant: 'danger',
  size: 'medium',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Button',
  variant: 'success',
  size: 'medium',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline Button',
  variant: 'outline',
  size: 'medium',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  variant: 'primary',
  size: 'medium',
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Button',
  variant: 'primary',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Button',
  variant: 'primary',
  size: 'large',
};
