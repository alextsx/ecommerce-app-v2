import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/shadcn-utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | undefined;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            error && 'border-destructive  focus-visible:ring-destructive ring-inset'
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <p className="text-sm font-medium text-destructive pl-2 mb-2" {...props}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
