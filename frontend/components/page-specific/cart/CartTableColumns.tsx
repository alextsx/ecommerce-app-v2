'use client';

import { FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

export const cartTableData: Product[] = [
  {
    id: '1',
    price: 999.99,
    discounted_price: 799.99,
    product_name: 'Apple iPhone 12',
    quantity: 1
  },
  {
    id: '2',
    price: 1399.99,
    discounted_price: 1199.99,
    product_name: 'Samsung Galaxy S21',
    quantity: 2
  },
  {
    id: '3',
    price: 699.99,
    discounted_price: 599.99,
    product_name: 'Google Pixel 6',
    quantity: 1
  },
  {
    id: '4',
    price: 399.99,
    discounted_price: 349.99,
    product_name: 'OnePlus Nord 2',
    quantity: 3
  },
  {
    id: '5',
    price: 1199.99,
    discounted_price: 999.99,
    product_name: 'Apple MacBook Air',
    quantity: 1
  }
];

export const cartTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'product_name',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="flex flex-row justify-start gap-10 items-center">
        <Image src="https://loremflickr.com/50/50" width={50} height={50} alt="Product Image" />
        {row.original.product_name}
      </div>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div className="flex flex-row items-center justify-center">
        <Button
          variant="default"
          className="w-5 h-5 rounded-none flex justify-center items-center p-0"
        >
          <FaMinus className="h-2 w-2 text-primary-foreground" />
        </Button>
        <div className="text-xs mx-2">{row.original.quantity}</div>
        <Button
          variant="default"
          className="rounded-none w-5 h-5 flex justify-center items-center p-0"
        >
          <FaPlus className="h-2 w-2 text-primary-foreground" />
        </Button>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="flex justify-center items-center flex-col">
        <div className="text-sm text-gray-900 line-through dark:text-gray-100">
          {row.original.price}$
        </div>
        <div className="text-sm text-red-600 dark:text-red-400">
          {row.original.discounted_price}$
        </div>
      </div>
    )
  },
  {
    header: 'Total',
    cell: ({ row }) => (
      <div className="flex justify-center items-center flex-col">
        <div className="text-sm text-gray-900 line-through dark:text-gray-100">
          {row.original.price * row.original.quantity}$
        </div>
        <div className="text-sm text-red-600 dark:text-red-400">
          {row.original.discounted_price * row.original.quantity}$
        </div>
      </div>
    )
  }
];
