import React from 'react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  goldBorder = false,
  hoverEffect = true,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-lg transition-all duration-300 p-6',
        goldBorder ? 'glass-panel-gold' : 'glass-panel',
        hoverEffect && 'hover:-translate-y-1.5 hover:shadow-luxury hover:border-amber-500/40',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};
