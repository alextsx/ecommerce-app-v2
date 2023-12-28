import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DetailedAdminOrderType, OrderItemType } from '@/redux/order/order.types';

type AdminOrderDetailsSheetContentProps = Pick<DetailedAdminOrderType, 'orderItems' | 'customer'>;

export const AdminOrderDetailsSheetContent = ({
  orderItems,
  customer
}: AdminOrderDetailsSheetContentProps) => {
  return (
    <SheetContent className="w-6/12 sm:max-w-none overflow-scroll">
      <SheetHeader>
        <SheetTitle>Order details</SheetTitle>
        <SheetDescription>Every bit of detail related to the order</SheetDescription>
      </SheetHeader>
      <Separator className="h-[2px] my-5" />
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-5">
            <span className="whitespace-nowrap font-semibold">Customer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{customer.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Full Name:</span>
            <span>{`${customer.firstName} ${customer.lastName}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone:</span>
            <span>{customer.phone}</span>
          </div>
          <Separator className="h-[1px] my-5" />
          <h3 className="font-semibold mt-4">Billing address</h3>
          <div className="flex justify-between">
            <span>Country</span>
            <span>{customer.billingAddress.country}</span>
          </div>
          <div className="flex justify-between">
            <span>City</span>
            <span>{customer.billingAddress.city}</span>
          </div>
          <div className="flex justify-between">
            <span>Address1</span>
            <span>{customer.billingAddress.line1}</span>
          </div>
          <div className="flex justify-between">
            <span>Address2</span>
            <span>{customer.billingAddress.line2 ?? '-'}</span>
          </div>
          <Separator className="h-[1px] my-5" />
          <h3 className="font-semibold mt-4">Shipping address</h3>
          <div className="flex justify-between">
            <span>Country</span>
            <span>{customer.shippingAddress.country}</span>
          </div>
          <div className="flex justify-between">
            <span>City</span>
            <span>{customer.shippingAddress.city}</span>
          </div>
          <div className="flex justify-between">
            <span>Address1</span>
            <span>{customer.shippingAddress.line1}</span>
          </div>
          <div className="flex justify-between">
            <span>Address2</span>
            <span>{customer.shippingAddress.line2 ?? '-'}</span>
          </div>
        </CardContent>
      </Card>
      <Separator className="h-[2px] my-5" />
      {orderItems?.map((item: OrderItemType, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-5">
              <span className="whitespace-nowrap font-semibold">{item.quantity} x </span>
              <span>{item.product.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className=" px-[4.5rem]">
            <div className="flex">
              {item.product.productImages.map((image, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={image.url}
                  className="ml-6"
                  width={100}
                  height={100}
                  alt="product image"
                />
              ))}
            </div>
            <div className="h-full flex flex-col justify-between">
              <div>Unit Price: ${parseFloat(item.unitPrice).toFixed(2)}</div>
              <div>Total: ${parseFloat(item.total).toFixed(2)}</div>
            </div>
          </CardContent>
          <CardFooter className="p-0"></CardFooter>
        </Card>
      ))}
    </SheetContent>
  );
};
