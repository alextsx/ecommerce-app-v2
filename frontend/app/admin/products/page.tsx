import Link from 'next/link';
import ProductsListTable from '@/components/page-specific/admin/products/Table';
import { Button } from '@/components/ui/button';

const AdminProductsPage = () => {
  return (
    <main className="w-full flex justify-between flex-col relative px-28">
      <div className="flex flex-row justify-between items-start my-10">
        <h1 className="ml-2 text-3xl font-bold">List of products</h1>
        <Link href="/admin/products/create">
          <Button className="text-lg" variant="default">
            Add new product +
          </Button>
        </Link>
      </div>
      <div>
        <ProductsListTable />
      </div>
    </main>
  );
};

export default AdminProductsPage;
