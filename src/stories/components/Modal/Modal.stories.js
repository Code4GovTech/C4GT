import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Hello Modal">
        <p>This is a simple modal window with Tailwind CSS.</p>
      </Modal>
    </>
  );
};
