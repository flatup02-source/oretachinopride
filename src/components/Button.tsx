import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-press-start';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-prideRed text-white hover:bg-prideOrange border-2 border-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-700 text-white hover:bg-gray-600 border-2 border-gray-500';
      break;
    case 'danger':
      variantStyles = 'bg-red-800 text-white hover:bg-red-700 border-2 border-red-600';
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;