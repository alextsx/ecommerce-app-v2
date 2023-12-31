'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { cn } from '@/lib/shadcn-utils';
import { useGetCategoriesQuery } from '@/redux/categories/categories.api.slice';

export const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { updateURL } = useUpdateURL();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(selectedCategory);

  const onCategorySelect = (categorySlug: string) => {
    if (categorySlug === category) {
      setCategory(null);
    } else {
      setCategory(categorySlug);
    }
    setOpen(false);
  };

  useEffect(() => {
    updateURL('category', category);
  }, [category, updateURL]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Categories</h3>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedCategory
              ? categories?.find((category) => category.slug === selectedCategory)?.name
              : 'Select a category...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-scroll overflow-x-hidden mb-0">
              {categories?.map((category) => (
                <CommandItem key={category.slug} value={category.slug} onSelect={onCategorySelect}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedCategory === category.slug ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
