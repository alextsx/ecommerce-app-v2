'use client';

import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { IconStar } from '@/components/icon/IconStar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToggleToast } from '@/hooks/useToggleToast';
import { addToCart } from '@/redux/cart/cart.slice';
import { useGetProductQuery } from '@/redux/product/product.api.slice';
import { ProductRating } from './ProductRating';

export const ProductContent = ({ slug }: { slug: string }) => {
  const dispatch = useDispatch();
  const toast = useToggleToast();
  const { data: product, isLoading, isFetching } = useGetProductQuery(slug);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, description, price, productImages, category } = product;
  const largeImage = productImages?.[0] ?? '';
  const thumbnailImages = productImages?.slice(1, 4);

  return (
    <div className="bg-background px-20 py-10 border rounded-lg grid md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start space-y-4">
        <Image
          alt="Product Image"
          className="aspect-square object-cover border border-gray-200 w-3/4 rounded-lg overflow-hidden dark:border-gray-800"
          height={400}
          src={largeImage}
          width={400}
        />
        <div className="grid grid-cols-3 gap-2 w-3/4">
          {thumbnailImages?.map((image, index) => (
            <Image
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
              height={200}
              key={index}
              src={image}
              width={200}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="text-3xl font-bold">
              {product.discountedPriceFormatted ? (
                <div className="flex text-muted-foreground flex-col gap-2">
                  <p className="line-through">{product.formattedPrice}</p>
                  <p className="text-green-700 font-bold ">{product.discountedPriceFormatted}</p>
                </div>
              ) : (
                <p className="text-4xl">{product.formattedPrice}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex items-center gap-0.5">
              <ProductRating rating={product.rating} />({product.rating})
            </div>
            <Badge className="w-auto h-auto text-md">{product.category}</Badge>
          </div>
        </div>
        <p className="text-gray-500">{product.description}</p>
        <Button
          className="relative text-lg"
          size="lg"
          onClick={() => {
            dispatch(addToCart(product));
            toast({
              title: 'Success',
              description: `${product.name} added to cart`,
              variant: 'constructive'
            });
          }}
        >
          <FaShoppingCart className="w-5 h-5 absolute right-4 top-3" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
