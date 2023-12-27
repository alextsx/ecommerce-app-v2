import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { OrderItemType } from '@/redux/order/order.types';

type OrderItemsSheetContentProps = {
  orderItems: OrderItemType[];
};

export const OrderItemsSheetContent = ({ orderItems }: OrderItemsSheetContentProps) => {
  return (
    <SheetContent className="w-6/12 sm:max-w-none overflow-scroll">
      <SheetHeader>
        <SheetTitle>Order item list</SheetTitle>
        <SheetDescription>Order items related to your order</SheetDescription>
      </SheetHeader>
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
              <div>Unit Price: {item.unitPrice}</div>
              <div>Total: {item.total}</div>
            </div>
          </CardContent>
          <CardFooter className="p-0"></CardFooter>
        </Card>
      ))}
    </SheetContent>
  );
};
