'use client';

import { useSearchParams } from 'next/navigation';
import { BaseTable } from '@/components/table/BaseTable';
import { usePaginationLabels } from '@/hooks/usePaginationLabels';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { parseProductsSearchParams } from '@/lib/parseProductsSearchParams';
import { useGetAdminOrderHistoryQuery } from '@/redux/order/order.api.slice';
import { AdminOrderHistoryTableColumns } from './TableColumns';

const AdminOrderHistoryTable = () => {
  const searchParams = useSearchParams();
  const { updateURL } = useUpdateURL();
  const parsedSearchParams = parseProductsSearchParams(searchParams);

  const updatePage = (page: number) => {
    updateURL('page', page.toString());
  };
  const {
    data: ordersResponse,
    isLoading,
    isFetching
  } = useGetAdminOrderHistoryQuery(parsedSearchParams);

  const orders = ordersResponse?.data || [];

  const { last_page, currentPage } = ordersResponse?.meta || { last_page: 1, currentPage: 1 };

  const { PaginationButtons } = usePaginationLabels({
    pageCount: last_page,
    page: currentPage,
    setPage: updatePage
  });

  return (
    <>
      <BaseTable
        columns={AdminOrderHistoryTableColumns}
        data={orders}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <div className="mt-8 ml-auto bg-background border flex justify-end p-4">
        <PaginationButtons />
      </div>
    </>
  );
};

export default AdminOrderHistoryTable;
