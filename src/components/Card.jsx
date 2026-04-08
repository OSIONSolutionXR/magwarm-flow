import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-[1.2rem] bg-white/70 dark:bg-[hsl(210,20%,10%)]/70 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]',
        'border border-white/30 dark:border-white/15',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}
