'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { useGetPriceRangeQuery } from '@/redux/products/products.api.slice';

export const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [userMinPrice, setUserMinPrice] = useState<number | null>(null);
  const [userMaxPrice, setUserMaxPrice] = useState<number | null>(null);

  const { data: priceRange, isLoading, isFetching } = useGetPriceRangeQuery();
  const { updateURL } = useUpdateURL();

  const handleValueChange = ([min, max]: [number, number]) => {
    setMinPrice(min);
    setMaxPrice(max);
    setUserMinPrice(min);
    setUserMaxPrice(max);
  };

  useEffect(() => {
    if (priceRange) {
      setMinPrice(priceRange.min);
      setMaxPrice(priceRange.max);
    }
  }, [priceRange]);

  useEffect(() => {
    if (userMinPrice !== null) {
      updateURL('minPrice', String(userMinPrice));
    }
  }, [userMinPrice, updateURL]);

  useEffect(() => {
    if (userMaxPrice !== null) {
      updateURL('maxPrice', String(userMaxPrice));
    }
  }, [userMaxPrice, updateURL]);

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
