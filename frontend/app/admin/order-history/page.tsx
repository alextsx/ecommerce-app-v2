import AdminOrderHistoryTable from '@/components/page-specific/admin/order-history/Table';

const AdminOrderHistoryPage = () => {
  return (
    <main className="w-full flex justify-between flex-col relative px-28">
      <div className="flex flex-row justify-start items-start mb-10">
        <h1 className="ml-2 text-3xl font-bold">Order history</h1>
      </div>
      <div>
        <AdminOrderHistoryTable />
      </div>
    </main>
  );
};

export default AdminOrderHistoryPage;
