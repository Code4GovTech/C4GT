import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: any; // For any additional props
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const sizeClass = `button-${size}`;
  const variantClass = `button-${variant}`;
  const disabledClass = disabled ? 'button-disabled' : '';

  const combinedClass = `button ${sizeClass} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
