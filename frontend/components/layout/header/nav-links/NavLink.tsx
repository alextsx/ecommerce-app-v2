'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/shadcn-utils';

type NavLinkProps = {
  label: string;
  href: string;
};

export const NavLink = ({ label, href }: NavLinkProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isActive = pathName === href && searchParams.toString() === '';
  return (
    <Link
      className={cn(
        'transition-colors',
        isActive
          ? 'hover:text-foreground/80 text-foreground/60 font-semibold'
          : 'hover:text-foreground/80 text-foreground/40'
      )}
      href={href}
    >
      {label}
    </Link>
  );
};
