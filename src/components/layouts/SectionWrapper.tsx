import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'gray' | 'blue' | 'gradient' | 'transparent';
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = '',
  containerClassName = '',
  background = 'white',
  padding = 'medium',
  maxWidth = 'xl'
}) => {
  const getBackgroundClasses = () => {
    switch (background) {
      case 'gray':
        return 'bg-gray-50';
      case 'blue':
        return 'bg-blue-50';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-white';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'py-8 lg:py-12';
      case 'large':
        return 'py-20 lg:py-32';
      default:
        return 'py-12 lg:py-20';
    }
  };

  const getMaxWidthClasses = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-2xl';
      case 'md':
        return 'max-w-4xl';
      case 'lg':
        return 'max-w-6xl';
      case 'xl':
        return 'max-w-7xl';
      case '2xl':
        return 'max-w-screen-2xl';
      case 'full':
        return 'max-w-full';
      default:
        return 'max-w-7xl';
    }
  };

  return (
    <section 
      id={id}
      className={`${getBackgroundClasses()} ${getPaddingClasses()} ${className}`}
    >
      <div className={`container mx-auto px-4 ${getMaxWidthClasses()} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;