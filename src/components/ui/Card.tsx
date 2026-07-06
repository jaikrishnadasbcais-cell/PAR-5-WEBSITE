import { cn } from '@/lib/cn';

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:shadow-[0_4px_12px_-2px_rgba(10,10,10,0.1),0_28px_50px_-10px_rgba(10,10,10,0.22)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
