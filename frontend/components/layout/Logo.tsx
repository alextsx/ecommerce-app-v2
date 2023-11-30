import { FaShopify } from 'react-icons/fa';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link className="flex items-center space-x-2" href="/">
      <FaShopify className="text-2xl" />
      <span className="font-bold inline-block">ecommerce app</span>
    </Link>
  );
};
