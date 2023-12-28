'use client';

import OrderHistoryTable from '@/components/page-specific/order-history/Table';
import withAuthenticationProtection from '@/hocs/withAuthenticationProtection';

const OrderHistoryPage = () => {
  return (
    <main className="w-full flex justify-between flex-col relative px-28">
      <div className="flex flex-row justify-start items-start mb-10">
        <h1 className="ml-2 text-3xl font-bold">Order history</h1>
      </div>
      <div>
        <OrderHistoryTable />
      </div>
    </main>
  );
};

export default withAuthenticationProtection(OrderHistoryPage);
