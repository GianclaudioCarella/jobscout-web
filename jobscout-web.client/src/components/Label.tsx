import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

// Label props interface
export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
  error?: boolean;
}

// Label component with enhanced functionality
export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, error, children, ...props }, ref) => {
  const labelClasses = cn(
    "flex items-center gap-2 text-sm leading-none font-medium select-none",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    error && "text-destructive",
    className
  )

  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={labelClasses}
      {...props}
    >
      {children}
      {required && (
        <span className="text-destructive ml-1" aria-label="required">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  )
})

Label.displayName = "Label"

// Default export for consistency
export default Label
