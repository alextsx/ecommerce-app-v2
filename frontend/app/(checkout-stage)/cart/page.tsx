'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { CartTable } from '@/components/page-specific/cart/CartTable';
import { cartTableColumns } from '@/components/page-specific/cart/CartTableColumns';
import { Button } from '@/components/ui/button';
import { selectCart } from '@/redux/cart/cart.slice';

const CartPage = () => {
  const cartItems = useSelector(selectCart);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col my-auto justify-center items-center">
        <div className="text-3xl font-bold">Your cart is empty</div>
        <div className="text-xl">Add some items to your cart</div>
      </div>
    );
  }

  return (
    <div className="w-auto my-auto">
      <CartTable columns={cartTableColumns} data={cartItems} />
      <div className="text-right mt-5">
        <Link href="/checkout">
          <Button className="rounded-none" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
