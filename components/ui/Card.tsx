/**
 * Componente Card reutilizável - Design 2025
 */

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  hover = true,
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-dark-500 border-dark-300',
    gradient: 'gradient-border',
    glass: 'glass border-white/10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl shadow-lg border overflow-visible transition-all duration-300',
        variants[variant],
        hover && 'hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1',
        className
      )}
      style={{ position: 'relative', zIndex: 1 }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-5 border-b border-dark-300', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={cn('px-6 py-5', className)} 
      style={{ position: 'relative', zIndex: 2 }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-5 bg-dark-600/50 border-t border-dark-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-xl font-heading font-bold text-white', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <p
      className={cn('text-neutral-400 text-sm leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}



