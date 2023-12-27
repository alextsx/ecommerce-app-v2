import Link from 'next/link';
import CategoriesListTable from '@/components/page-specific/admin/categories/Table';
import { Button } from '@/components/ui/button';

const AdminCategoriesPage = () => {
  return (
    <main className="w-full flex justify-between flex-col relative px-28">
      <div className="flex flex-row justify-between items-start my-10">
        <h1 className="ml-2 text-3xl font-bold">List of categories</h1>
        <Link href="/admin/categories/create">
          <Button className="text-lg" variant="default">
            Add new category +
          </Button>
        </Link>
      </div>
      <div>
        <CategoriesListTable />
      </div>
    </main>
  );
};

export default AdminCategoriesPage;
