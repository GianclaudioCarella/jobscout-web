import * as React from "react"
import { cn } from "@/lib/utils"

// Input props interface extending native input props
export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  helperText?: string;
}

// Input component with forwarded ref
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, ...props }, ref) => {
    const inputClasses = cn(
      // Base styles
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
      // File input styles
      "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
      // Disabled styles
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      // Focus styles
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      // Error styles
      error 
        ? "border-destructive ring-destructive/20 dark:ring-destructive/40" 
        : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      // Responsive text size
      "md:text-sm",
      className
    )

    return (
      <div className="space-y-1">
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={inputClasses}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// Default export for consistency
export default Input
