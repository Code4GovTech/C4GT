import React, { useState } from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Default = () => {
  const [text, setText] = useState('');

  return (
    <Input
      label="Name"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter your name"
    />
  );
};
