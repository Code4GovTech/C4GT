import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
  onClick?: () => void;
  headerContent?: React.ReactNode;
  badge?: string;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  children, 
  className = '', 
  imageSrc, 
  imageAlt,
  footer,
  elevation = 'medium',
  hoverEffect = true,
  onClick,
  headerContent,
  badge,
  loading = false,
  ...props 
}) => {
  // Determine shadow class based on elevation
  const shadowClass = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg'
  }[elevation];

  // Determine hover effect class
  const hoverClass = hoverEffect ? 'hover:shadow-xl transform hover:-translate-y-1' : '';
  
  // Cursor pointer if onClick is provided
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-white ${shadowClass} rounded-lg overflow-hidden border border-gray-200 
      ${hoverClass} transition duration-300 ease-in-out ${cursorClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Header content if provided */}
      {headerContent && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          {headerContent}
        </div>
      )}
      
      {/* Image with optional badge */}
      {imageSrc && (
        <div className="relative">
          <img 
            src={imageSrc} 
            alt={imageAlt || title || 'Card image'} 
            className="w-full h-56 object-cover" 
          />
          {badge && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
      )}
      
      {/* Main content */}
      <div className="p-6">
        {title && <h2 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h2>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
