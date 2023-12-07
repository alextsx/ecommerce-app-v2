'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { CartItem } from '@/redux/cart/cart.types';

type DataTableProps = {
  columns: ColumnDef<CartItem>[];
  data: CartItem[];
};

export const CartTable = ({ columns, data }: DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-left text-md font-medium uppercase tracking-wider"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="border-gray-500 hover:bg-background  font-bold">
            <TableCell className="text-right" colSpan={4}>
              Total Price: ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
