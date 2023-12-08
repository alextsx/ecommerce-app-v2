'use client';

import { ProductCard } from '@/components/card/ProductCard';
import { useGetProductsQuery } from '@/redux/products/products.api.slice';

export const ProductCardsSection = () => {
  const { data: products, isLoading, isFetching } = useGetProductsQuery();

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!products) return <div>No products found</div>;

  return (
    <div className="grid grid-cols-3 gap-y-10 gap-x-8 justify-center">
      {products?.map((product) => <ProductCard key={product.slug} product={product} />)}
    </div>
  );
};
