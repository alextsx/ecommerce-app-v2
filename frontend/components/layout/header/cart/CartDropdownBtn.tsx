'use client';

import { MdOutlineShoppingBag } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { selectCart } from '@/redux/cart/cart.slice';

export const CartDropdownBtn = () => {
  const cartItems = useSelector(selectCart);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <Link href="/cart" className="mt-2 mr-5">
      <Button variant="outline" className="relative h-10 w-10 p-1">
        <MdOutlineShoppingBag className="h-10 w-10 " />
        <span className="absolute top-0 right-0 bg-red-500 z-99 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {cartItemsCount}
        </span>
      </Button>
    </Link>
  );
};
