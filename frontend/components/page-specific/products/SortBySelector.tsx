'use client';

import { HTMLAttributes } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { cn } from '@/lib/shadcn-utils';

export const ProductsSortBySelector = ({ className }: HTMLAttributes<typeof Select>) => {
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get('sort') || '';
  const { updateURL } = useUpdateURL();

  const onSortSelect = (sort: string) => {
    if (sort === selectedSort) {
      updateURL('sort', null);
    } else {
      updateURL('sort', sort);
    }
  };

  return (
    <Select onValueChange={onSortSelect} value={selectedSort}>
      <SelectTrigger className={cn(className, 'w-60')}>
        <SelectValue placeholder="Select Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price_asc">Price: Low to High</SelectItem>
        <SelectItem value="price_desc">Price: High to Low</SelectItem>
        <SelectItem value="rating_desc">Reviews: High to Low</SelectItem>
        <SelectItem value="rating_asc"> Reviews: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
};
