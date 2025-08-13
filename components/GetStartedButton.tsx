import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface GetStartedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export default function GetStartedButton({ 
  href = '/pricing',
  variant = 'primary', 
  size = 'md',
  children = 'Get Started',
  fullWidth = false,
  className = '',
  ...props 
}: GetStartedButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/25',
    secondary: 'bg-transparent border border-gray-600 hover:border-orange-500 text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();
  
  const button = (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
  
  if (href) {
    return <Link href={href}>{button}</Link>;
  }
  
  return button;
}