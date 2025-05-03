import React from 'react';

const Header = ({ title, subtitle, className = '' }) => (
  <header className={`p-4 bg-gray-100 border-b border-gray-200 ${className}`}>
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </header>
);

export default Header;
