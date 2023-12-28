import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { DetailedAdminOrderType } from '@/redux/order/order.types';
import { AdminOrderDetailsSheetContent } from './DetailsSheetContent';

type AdminOrderDetailsSheetProps = Pick<DetailedAdminOrderType, 'orderItems' | 'customer'>;

export function AdminOrderDetailsSheet({ orderItems, customer }: AdminOrderDetailsSheetProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="h-6 w-6 p-0"
        >
          <span className="sr-only">Open menu</span>
          <FaEye className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <AdminOrderDetailsSheetContent orderItems={orderItems} customer={customer} />
    </Sheet>
  );
}
