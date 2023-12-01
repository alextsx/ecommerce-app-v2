'use client';

import { CartTable } from '@/components/page-specific/cart/CartTable';
import { cartTableColumns, cartTableData } from '@/components/page-specific/cart/CartTableColumns';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  return (
    <>
      <CartTable columns={cartTableColumns} data={cartTableData} />
      <div className="text-right">
        <Button className="rounded-none" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </>
  );
};

export default CartPage;
