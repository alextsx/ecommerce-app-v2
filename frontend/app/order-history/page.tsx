import React from 'react';
import OrderHistoryTable from '@/components/page-specific/order-history/Table';

const OrderHistoryPage = () => {
  return (
    <main className="w-full flex justify-between flex-col relative px-28">
      <div className="flex flex-row justify-start items-start">
        <h1 className="ml-2 text-2xl font-bold">Order history</h1>
      </div>
      <div>
        <OrderHistoryTable />
      </div>
    </main>
  );
};

export default OrderHistoryPage;
