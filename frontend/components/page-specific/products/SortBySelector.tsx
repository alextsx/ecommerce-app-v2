import { HTMLAttributes } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/shadcn-utils';

export const ProductsSortBySelector = ({ className }: HTMLAttributes<typeof Select>) => {
  return (
    <Select defaultValue="1">
      <SelectTrigger className={cn(className, 'w-60')}>
        <SelectValue placeholder="Select Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Price: Low to High</SelectItem>
        <SelectItem value="2">Price: High to Low</SelectItem>
        <SelectItem value="3">Reviews: High to Low</SelectItem>
        <SelectItem value="4">Reviews: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
};
