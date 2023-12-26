import React from 'react';
import { IconStar } from '@/components/icon/IconStar';
import { IconStarHalf } from '@/components/icon/IconStarHalf';

export const ProductRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <IconStar key={i} className="w-5 h-5 fill-primary" />
      ))}
      {halfStar && <IconStarHalf className="w-5 h-5 fill-primary" />}
      {[...Array(emptyStars)].map((_, i) => (
        <IconStar
          key={i + fullStars + (halfStar ? 1 : 0)}
          className="w-5 h-5 fill-muted stroke-muted-foreground"
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1"> ({rating})</span>
    </>
  );
};
