import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const useUpdateURL = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateURL = useDebouncedCallback((paramKey: string, paramValue: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!paramValue) {
      newSearchParams.delete(paramKey);
    } else {
      newSearchParams.set(paramKey, paramValue);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  });

  return { updateURL };
};
