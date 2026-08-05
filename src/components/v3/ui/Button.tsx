import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'fab';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-md gap-2',
    lg: 'text-base px-7 py-3.5 rounded-lg gap-2.5',
  };

  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-gold hover:shadow-lg',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60',
    outline: 'border border-amber-500/50 hover:border-amber-400 text-amber-400 hover:bg-amber-500/10',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/60',
    gradient: 'gold-gradient-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-luxury',
    fab: 'fixed bottom-6 right-6 z-40 bg-amber-500 hover:bg-amber-400 text-slate-950 p-4 rounded-full shadow-glow-gold transition-all duration-300 hover:scale-110'
  };

  return (
    <button
      className={clsx(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
