'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/card/ProductCard';
import { usePaginationLabels } from '@/hooks/usePaginationLabels';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { parseProductsSearchParams } from '@/lib/parseProductsSearchParams';
import { useGetProductsQuery } from '@/redux/products/products.api.slice';

export const ProductCardsSection = () => {
  const searchParams = useSearchParams();
  const { updateURL } = useUpdateURL();
  const parsedSearchParams = parseProductsSearchParams(searchParams);

  const updatePage = (page: number) => {
    updateURL('page', page.toString());
  };

  const { data: productsResponse, isLoading, isFetching } = useGetProductsQuery(parsedSearchParams);
  const products = productsResponse?.data || [];
  const { last_page, currentPage } = productsResponse?.meta || { last_page: 1, currentPage: 1 };

  const { PaginationButtons } = usePaginationLabels({
    pageCount: last_page,
    page: currentPage,
    setPage: updatePage
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!products || !products.length) return <div>No products found</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-y-10 gap-x-8 justify-center">
        {products?.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
      <div className="flex justify-end px-10 bg-background border rounded-md py-4 mt-8">
        <PaginationButtons />
      </div>
    </>
  );
};
