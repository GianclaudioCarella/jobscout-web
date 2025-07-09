export { Header } from './Header';
export { JobCard } from './JobCard';
export { SearchForm } from './SearchForm';
export { LoadingState } from './LoadingState';
export { EmptyState } from './EmptyState';
export { JobsList } from './JobsList';
export { Layout } from './Layout';

export type { JobCardProps } from './JobCard';
export type { SearchFormData } from './SearchForm';

// Export all UI components with both named and default exports
export { Button, buttonVariants, type ButtonProps, type ButtonVariants } from './Button';
export { Input, type InputProps } from './Input';
export { Label, type LabelProps } from './Label';
export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableRow, 
  TableHead, 
  TableCell, 
  TableCaption,
  type TableProps,
  type TableRowProps 
} from './Table';

// Default exports for convenience
export { default as ButtonComponent } from './Button';
export { default as InputComponent } from './Input';
export { default as LabelComponent } from './Label';
export { default as TableComponent } from './Table';