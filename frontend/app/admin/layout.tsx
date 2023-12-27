import { PropsWithChildren } from 'react';
import { FaBox, FaList, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full max-h-screen overflow-scroll min-h-screen pb-[92px]">{children}</div>
      <aside className="w-full sticky bottom-0 h-auto py-8 bg-background px-4 flex flex-row justify-center items-center gap-4 pt-5 border-r-2 ">
        <Link href="/admin/categories">
          <Button className="text-lg" variant="default">
            <FaList className="mr-2" />
            Manage Categories
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button className="text-lg" variant="default">
            <FaBox className="mr-2" />
            Manage Products
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button className="text-lg" variant="default">
            <FaShoppingCart className="mr-2" />
            Manage Orders
          </Button>
        </Link>
      </aside>
    </div>
  );
};

export default AdminLayout;
