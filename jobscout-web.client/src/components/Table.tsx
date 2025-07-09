import * as React from "react"
import { cn } from "@/lib/utils"

// Table container props
export interface TableProps extends React.ComponentProps<"table"> {
  striped?: boolean
  hoverable?: boolean
}

// Table component with enhanced features
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, hoverable, ...props }, ref) => {
    return (
      <div
        data-slot="table-container"
        className="relative w-full overflow-x-auto"
      >
        <table
          ref={ref}
          data-slot="table"
          className={cn(
            "w-full caption-bottom text-sm",
            striped && "[&_tbody_tr:nth-child(even)]:bg-muted/50",
            hoverable && "[&_tbody_tr]:hover:bg-muted/50",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Table.displayName = "Table"

// Table header component
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"thead">
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot="table-header"
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
))

TableHeader.displayName = "TableHeader"

// Table body component
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"tbody">
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))

TableBody.displayName = "TableBody"

// Table footer component
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"tfoot">
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))

TableFooter.displayName = "TableFooter"

// Table row component with enhanced props
export interface TableRowProps extends React.ComponentProps<"tr"> {
  selected?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      data-state={selected ? "selected" : undefined}
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
)

TableRow.displayName = "TableRow"

// Table head component
export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"th">
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot="table-head"
    className={cn(
      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))

TableHead.displayName = "TableHead"

// Table cell component
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"td">
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn(
      "p-2 align-middle whitespace-nowrap",
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))

TableCell.displayName = "TableCell"

// Table caption component
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentProps<"caption">
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
))

TableCaption.displayName = "TableCaption"

// Default exports
export default Table
