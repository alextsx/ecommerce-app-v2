'use client';

import { useSearchParams } from 'next/navigation';
import { IconStar } from '@/components/icon/IconStar';
import { Button } from '@/components/ui/button';
import { useUpdateURL } from '@/hooks/useUpdateURL';

export const RatingFilter = () => {
  const searchParams = useSearchParams();
  const selectedReview = searchParams.get('rating') || '';
  const { updateURL } = useUpdateURL();

  const onReviewSelect = (rating: string) => {
    if (rating === selectedReview) {
      updateURL('rating', null);
    } else {
      updateURL('rating', rating);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Reviews</h3>
      <div className="flex flex-col">
        {[5, 4, 3, 2, 1].map((elem) => (
          <Button
            variant="ghost"
            key={elem}
            onClick={() => onReviewSelect(String(elem))}
            className="flex items-start justify-start pl-[2px]"
          >
            {Array.from({ length: elem }).map((_, j) => (
              <IconStar key={j} className="w-4 h-4 fill-current text-yellow-500 mr-1" />
            ))}
            <span className="text-sm text-gray-500 ml-2">{elem}+</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
