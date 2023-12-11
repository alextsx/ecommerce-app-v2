import { ReadonlyURLSearchParams } from 'next/navigation';

export const parseProductsSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const allowedSearchParams = [
    'page',
    'sort',
    'name',
    'minPrice',
    'maxPrice',
    'rating',
    'category'
  ];

  const parsedSearchParams: Record<string, string> = {};

  const searchParamsEntries = searchParams.entries();

  for (const [key, value] of searchParamsEntries) {
    if (allowedSearchParams.includes(key)) {
      parsedSearchParams[key] = value;
    }
  }

  return parsedSearchParams;
};
