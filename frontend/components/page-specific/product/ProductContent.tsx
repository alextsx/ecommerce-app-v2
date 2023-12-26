'use client';

import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { IconStar } from '@/components/icon/IconStar';
import { ProductRating } from '@/components/ProductRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useGetProductQuery } from '@/redux/product/product.api.slice';

export const ProductContent = ({ slug }: { slug: string }) => {
  const { data: product, isLoading, isFetching } = useGetProductQuery(slug);
  const { addToCart } = useAddToCart();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    name,
    description,
    productImages,
    rating,
    formattedPrice,
    discountedPriceFormatted,
    category
  } = product;
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
            <h1 className="font-bold text-3xl">{name}</h1>
            <div className="text-3xl font-bold">
              {discountedPriceFormatted ? (
                <div className="flex text-muted-foreground flex-col gap-2">
                  <p className="line-through">{formattedPrice}</p>
                  <p className="text-green-700 font-bold ">{discountedPriceFormatted}</p>
                </div>
              ) : (
                <p className="text-4xl">{formattedPrice}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex items-center gap-0.5">
              <ProductRating rating={rating} />
            </div>
            <Badge className="w-auto h-auto text-md">{category}</Badge>
          </div>
        </div>
        <p className="text-gray-500">{description}</p>
        <Button
          className="relative text-lg"
          size="lg"
          onClick={() => {
            addToCart(product);
          }}
        >
          <FaShoppingCart className="w-5 h-5 absolute right-4 top-3" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
