import * as React from "react";
import { Label, type LabelProps } from "./Label";
import { Input, type InputProps } from "./Input";
import { cn } from "@/lib/utils";

// Form field props
export interface FormFieldProps {
  label?: string;
  labelProps?: LabelProps;
  inputProps?: InputProps;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

// Form field component for better composition
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label, 
    labelProps, 
    inputProps, 
    error, 
    helperText, 
    required, 
    className,
    ...props 
  }, ref) => {
    const fieldId = inputProps?.id || `field-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label 
            htmlFor={fieldId}
            required={required}
            error={hasError}
            {...labelProps}
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={fieldId}
          error={hasError}
          helperText={error || helperText}
          {...inputProps}
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;