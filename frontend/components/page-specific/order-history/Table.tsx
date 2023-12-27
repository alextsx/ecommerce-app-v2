'use client';

import { BaseTable } from '@/components/table/BaseTable';
import { useGetOrderHistoryQuery } from '@/redux/order/order.api.slice';
import { OrderHistoryTableColumns } from './TableColumns';

const OrderHistoryTable = () => {
  const { data, isLoading, isFetching } = useGetOrderHistoryQuery();
  return (
    <BaseTable
      columns={OrderHistoryTableColumns}
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
};

export default OrderHistoryTable;
