import { PropsWithChildren } from 'react';
import { BottomNav } from '@/components/layout/admin/BottomNav';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full max-h-screen overflow-scroll min-h-screen pb-[92px]">{children}</div>
      <BottomNav />
    </div>
  );
};

export default AdminLayout;
