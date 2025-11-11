/**
 * Componente Alert para mensagens
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
  className?: string;
}

export function Alert({ type = 'info', children, className }: AlertProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-4 flex items-start gap-3',
        styles[type],
        className
      )}
      role="alert"
    >
      <span className="text-xl font-bold">{icons[type]}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}




