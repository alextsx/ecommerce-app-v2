'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

export const NameFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get the current 'name' search parameter
  const initialName = searchParams.get('name') || '';
  const [name, setName] = useState(initialName);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updateURL = useDebouncedCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('name', name);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }, 300);

  // Call updateURL whenever name changes
  useEffect(() => {
    updateURL();
  }, [name, updateURL]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Product name</h2>
      <Input
        aria-label="Search"
        className="w-full py-2 px-3 border border-gray-300 rounded-md bg-primary-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Search..."
        type="text"
        onChange={handleChange}
        value={name}
      />
    </div>
  );
};
