'use client';

import { useSearchParams } from 'next/navigation';
import { BaseTable } from '@/components/table/BaseTable';
import { usePaginationLabels } from '@/hooks/usePaginationLabels';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { parseProductsSearchParams } from '@/lib/parseProductsSearchParams';
import { useGetProductsQuery } from '@/redux/products/products.api.slice';
import { ProductsListTableColumns } from './TableColumns';

const ProductsListTable = () => {
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

  return (
    <>
      <BaseTable
        columns={ProductsListTableColumns}
        data={products}
        isFetching={isFetching}
        isLoading={isLoading}
      />

      <div className="mt-8 ml-auto bg-background border flex justify-end p-4">
        <PaginationButtons />
      </div>
    </>
  );
};

export default ProductsListTable;
