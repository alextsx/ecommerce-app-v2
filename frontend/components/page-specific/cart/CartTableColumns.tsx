'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/redux/cart/cart.types';
import { CartMinusBtn } from './CartMinusBtn';
import { CartPlusBtn } from './CartPlusBtn';

export const cartTableColumns: ColumnDef<CartItem>[] = [
  {
    accessorKey: 'product_name',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="flex flex-row justify-start gap-10 items-center">
        <Image src={row.original.imageUrl} width={50} height={50} alt="Product Image" />
        {row.original.name}
      </div>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div className="flex flex-row items-center justify-center">
        <CartMinusBtn cartItem={row.original} />
        <div className="text-xs mx-2">{row.original.quantity}</div>
        <CartPlusBtn cartItem={row.original} />
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center flex-col">
          <div className="text-sm text-gray-900 dark:text-gray-100">{row.original.price}$</div>
        </div>
      );
      /*       return (
        <div className="flex justify-center items-center flex-col">
          <div className="text-sm text-gray-900 line-through dark:text-gray-100">
            {row.original.price}$
          </div>
          <div className="text-sm text-red-600 dark:text-red-400">
            {row.original.discounted_price}$
          </div>
        </div>
      ); */
    }
  },
  {
    header: 'Total',
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center flex-col">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {row.original.price * row.original.quantity}$
          </div>
        </div>
      );

      /*       return (
        <div className="flex justify-center items-center flex-col">
          <div className="text-sm text-gray-900 line-through dark:text-gray-100">
            {row.original.price * row.original.quantity}$
          </div>
          <div className="text-sm text-red-600 dark:text-red-400">
            {row.original.discounted_price * row.original.quantity}$
          </div>
        </div>
      ); */
    }
  }
];
