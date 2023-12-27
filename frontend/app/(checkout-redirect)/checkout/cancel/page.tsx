import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';

const CheckoutCancel = () => {
  return (
    <>
      <CardHeader className="border-b-2">
        <h1 className="mx-auto text-3xl font-bold">😢 Order Cancelled</h1>
      </CardHeader>
      <CardContent className="mt-8">
        <h2 className="text-xl font-semibold text-red-700 mb-2">🚫 Your Order Was Not Completed</h2>
        <p className="text-md text-gray-700 mb-10">
          It seems like you&apos;ve cancelled the checkout process. Don&apos;t worry, your items are
          still in the cart.
        </p>

        <h2 className="text-xl font-semibold text-orange-700 mb-2">🛒 Return to Cart?</h2>
        <p className="text-md text-gray-700 mb-10">
          You can review your items and try checking out again. Click the button below to go back to
          your cart.
        </p>
        <div className="flex justify-end pr-8">
          <Link href="/cart">
            <Button className="text-lg" variant="default">
              <FaShoppingCart className="mr-2" />
              Go to Cart
            </Button>
          </Link>
        </div>
      </CardContent>
    </>
  );
};

export default CheckoutCancel;
