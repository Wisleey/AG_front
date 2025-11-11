/**
 * Componente Input reutilizável - Design 2025
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full" style={{ position: 'relative', zIndex: 10 }}>
        {label && (
          <label 
            className="block text-sm font-medium text-neutral-300 mb-2"
            style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}
          >
            {label}
            {props.required && <span className="text-brand-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input-modern',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          style={{ 
            position: 'relative', 
            zIndex: 20, 
            pointerEvents: 'auto',
            cursor: props.disabled ? 'not-allowed' : 'text'
          }}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';



