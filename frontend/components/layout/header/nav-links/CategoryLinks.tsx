'use client';

import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/shadcn-utils';
import { useGetCategoriesQuery } from '@/redux/categories/categories.api.slice';
import { NavLink } from './NavLink';

export const CategoryLinks = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const pathName = usePathname();
  console.log(pathName);
  const isActive = pathName.startsWith('/products');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          isActive
            ? 'hover:text-foreground/80 text-foreground/60 font-semibold'
            : 'hover:text-foreground/80 text-foreground/40'
        )}
      >
        Shop
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-flow-col grid-rows-6 gap-4 p-2">
          {categories?.map((category) => (
            <DropdownMenuItem className="px-2" key={category.slug}>
              <NavLink label={category.name} href={`/products/${category.slug}`} />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
