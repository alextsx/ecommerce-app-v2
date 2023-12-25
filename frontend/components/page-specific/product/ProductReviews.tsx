import { Dispatch, SetStateAction } from 'react';
import { ReviewCard } from '@/components/card/ReviewCard';
import { TabsContent } from '@/components/ui/tabs';
import { usePaginationLabels } from '@/hooks/usePaginationLabels';
import { generatePageLabelsArray } from '@/lib/generatePageLabelsArray';
import { useGetReviewsQuery } from '@/redux/reviews/reviews.api.slice';

export const ProductReviews = ({
  page,
  setPage,
  slug
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  slug: string;
}) => {
  const { data: reviewsResponse, isFetching, isLoading } = useGetReviewsQuery({ slug, page });
  const reviews = reviewsResponse?.data || [];
  const { last_page, currentPage } = reviewsResponse?.meta || { last_page: 0, currentPage: 0 };

  const { PaginationButtons } = usePaginationLabels({
    pageCount: last_page,
    page: currentPage,
    setPage
  });

  return (
    <>
      <TabsContent value="reviews" className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
        <div className="flex justify-end px-10 bg-background border rounded-md py-4 mt-8">
          <PaginationButtons />
        </div>
      </TabsContent>
    </>
  );
};
