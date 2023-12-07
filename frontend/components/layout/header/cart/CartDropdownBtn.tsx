import { MdOutlineShoppingBag } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CartDropdownBtn = () => {
  return (
    <Link href="/cart" className="mt-2 mr-5">
      <Button variant="outline" className="relative h-10 w-10 p-1">
        <MdOutlineShoppingBag className="h-10 w-10 " />
      </Button>
    </Link>
  );
};
