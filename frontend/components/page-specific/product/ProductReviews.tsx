import { Dispatch, SetStateAction } from 'react';
import { ReviewCard } from '@/components/card/ReviewCard';
import { TabsContent } from '@/components/ui/tabs';

export const ProductReviews = ({
  page,
  setPage
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <TabsContent value="reviews" className="space-y-4">
      <ReviewCard
        review={{
          rating: 4,
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatem.',
          createdAt: '2021-08-24T18:25:43.511Z',
          user: {
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
          }
        }}
      />
      <ReviewCard
        review={{
          rating: 4,
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatem.',
          createdAt: '2021-08-24T18:25:43.511Z',
          user: {
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
          }
        }}
      />
    </TabsContent>
  );
};
