import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  showBorder?: boolean;
  variant?: 'default' | 'gradient';
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  className = '',
  showBorder = true,
  variant = 'default'
}) => {
  const baseStyles = "p-5 shadow-sm";
  const variantStyles = {
    default: "bg-white dark:bg-gray-800",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600"
  };
  
  const titleStyles = {
    default: "text-2xl font-bold text-gray-800 dark:text-white",
    gradient: "text-3xl font-bold text-white"
  };
  
  const subtitleStyles = {
    default: "text-sm text-gray-500 dark:text-gray-300 mt-1",
    gradient: "text-base text-gray-200 mt-2"
  };
  
  const borderStyles = showBorder ? "border-b border-gray-200 dark:border-gray-700" : "";
  
  return (
    <header className={`${baseStyles} ${variantStyles[variant]} ${borderStyles} ${className}`}>
      <h1 className={titleStyles[variant]}>{title}</h1>
      {subtitle && <p className={subtitleStyles[variant]}>{subtitle}</p>}
    </header>
  );
};

export default Header;
