'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/card/ProductCard';
import { parseProductsSearchParams } from '@/lib/parseProductsSearchParams';
import { useGetProductsQuery } from '@/redux/products/products.api.slice';

export const ProductCardsSection = () => {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseProductsSearchParams(searchParams);
  const { data: products, isLoading, isFetching } = useGetProductsQuery(parsedSearchParams);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!products || !products.length) return <div>No products found</div>;

  return (
    <div className="grid grid-cols-3 gap-y-10 gap-x-8 justify-center">
      {products?.map((product) => <ProductCard key={product.slug} product={product} />)}
    </div>
  );
};
