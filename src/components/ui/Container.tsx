import { cn } from '@/lib/cn';

type ContainerWidth = 'narrow' | 'default' | 'wide';

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  narrow: 'max-w-narrow',
  default: 'max-w-default',
  wide: 'max-w-wide',
};

export function Container({
  width = 'default',
  className,
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-6 md:px-8', WIDTH_CLASS[width], className)}>
      {children}
    </div>
  );
}
