// Type declarations for UI components
declare module '@/components/ui/table' {
  import { FC, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
  
  export type TableProps = HTMLAttributes<HTMLTableElement>;
  export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
  export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
  export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
  export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
  export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
  export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
  export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
  
  export const Table: FC<TableProps>;
  export const TableHeader: FC<TableHeaderProps>;
  export const TableBody: FC<TableBodyProps>;
  export const TableFooter: FC<TableFooterProps>;
  export const TableRow: FC<TableRowProps>;
  export const TableHead: FC<TableHeadProps>;
  export const TableCell: FC<TableCellProps>;
  export const TableCaption: FC<TableCaptionProps>;
} 