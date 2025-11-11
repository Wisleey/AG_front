/**
 * Componente Button reutilizável - Design 2025
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-lg hover:shadow-brand-500/50 focus:ring-brand-500 hover:scale-105 rounded-full',
    secondary:
      'bg-dark-400 text-white hover:bg-dark-300 border border-dark-300 hover:border-brand-500/50 focus:ring-brand-500 rounded-xl',
    danger: 
      'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/50 focus:ring-red-500 hover:scale-105 rounded-full',
    ghost: 
      'bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white focus:ring-brand-500 rounded-xl',
    outline:
      'border-2 border-brand-500 text-brand-500 hover:bg-brand-500/10 hover:border-brand-600 focus:ring-brand-500 hover:scale-105 rounded-full',
    gradient:
      'bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 text-white shadow-xl hover:shadow-brand-500/60 focus:ring-brand-500 animate-gradient-x hover:scale-105 rounded-full bg-200%',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}




