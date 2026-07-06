import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium font-[family-name:var(--font-inter)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'btn-metallic-accent text-text-primary shadow-[0_10px_25px_-8px_rgba(10,10,10,0.35)] hover:brightness-105 hover:saturate-125',
        secondary: 'border border-accent text-text-primary hover:bg-surface',
        ghost: 'text-text-primary hover:bg-surface',
      },
      size: {
        sm: 'h-10 px-5 text-caption',
        md: 'h-11 px-8 text-body',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
