'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { useGetPriceRangeQuery } from '@/redux/products/products.api.slice';

export const PriceFilter = () => {
  const searchParams = useSearchParams();
  const { updateURL } = useUpdateURL();
  const initialMinPrice = searchParams.get('minPrice') || 0;
  const initialMaxPrice = searchParams.get('maxPrice') || 100;

  const [minPrice, setMinPrice] = useState<number>(Number(initialMinPrice));
  const [maxPrice, setMaxPrice] = useState<number>(Number(initialMaxPrice));

  const { data: priceRange, isLoading, isFetching } = useGetPriceRangeQuery();

  const handleValueChange = ([min, max]: [number, number]) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  useEffect(() => {
    updateURL('minPrice', String(minPrice));
  }, [minPrice, updateURL]);

  useEffect(() => {
    updateURL('maxPrice', String(maxPrice));
  }, [maxPrice, updateURL]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Price</h3>
      <div className="flex justify-around gap-2 items-center">
        <span>${minPrice}</span>
        <Slider
          min={priceRange?.min || 0}
          max={priceRange?.max || 100}
          value={[minPrice, maxPrice]}
          step={1}
          onValueChange={handleValueChange}
        />
        <span>${maxPrice}</span>
      </div>
    </div>
  );
};
