import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToggleToast } from '@/hooks/useToggleToast';
import { addToCart } from '@/redux/cart/cart.slice';
import { Product } from '@/redux/product/product.types';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const toast = useToggleToast();
  return (
    <div className="w-80 h-[400px] border-2 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 relative">
      <div className="h-3/5 relative">
        <Image
          className="object-cover"
          src={product.productImages?.[0]}
          alt={product.name}
          layout="fill"
        />
      </div>
      <div className="absolute bottom-0 w-full xl:h-2/5 h-3/5 bg-primary-foreground p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold overflow-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal cursor-default">
            {product.name}
          </h2>
          {product.discountedPriceFormatted ? (
            <div className="flex text-muted-foreground flex-row gap-8">
              <p className="line-through text-lg">{product.formattedPrice}</p>
              <p className="text-green-700 font-bold text-xl">{product.discountedPriceFormatted}</p>
            </div>
          ) : (
            <p className="text-lg">{product.formattedPrice}</p>
          )}
          <Separator className="w-80 relative -left-4 mt-2" />
        </div>
        <div className="overflow-hidden text-ellipsis relative top-1 transform max.w-full h-full">
          <p className="absolute left-0 text-sm mt-2 h-full w-full text-left group-hover:hidden hidden xl:inline">
            {product.description ?? 'No description'}
          </p>
          <div className="absolute w-full h-full top-14 left-6   xl:top-4 xl:left-0 xl:opacity-0 opacity-100  justify-between flex-col group-hover:opacity-100 transition-opacity duration-200 xl:flex xl:justify-between xl:flex-row">
            <Link href={`product/${product.slug}`}>
              <Button variant="outline">View Product</Button>
            </Link>
            {/*TODO CUSTOMHOOK */}
            <Button
              onClick={() => {
                dispatch(addToCart(product));
                toast({
                  title: 'Success',
                  description: `${product.name} added to cart`,
                  variant: 'constructive'
                });
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
