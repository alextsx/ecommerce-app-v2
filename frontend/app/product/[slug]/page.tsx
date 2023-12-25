'use client';

import { useState } from 'react';
import { ProductContent } from '@/components/page-specific/product/ProductContent';
import { ProductReviews } from '@/components/page-specific/product/ProductReviews';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndividualProduct = ({ params: { slug } }: { params: { slug: string } }) => {
  const [reviewPage, setReviewPage] = useState(1);

  return (
    <div className="py-10 max-w-6xl space-y-8">
      <ProductContent slug={slug} />
      <Tabs defaultValue="reviews">
        <div className="border border-gray-200 p-2 bg-background dark:border-gray-800 rounded-lg">
          <TabsList className="w-[400px] grid p-1 grid-cols-2 h-full">
            <TabsTrigger className="text-lg" value="reviews">
              Reviews
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="related-products">
              Related products
            </TabsTrigger>
          </TabsList>
        </div>
        <ProductReviews slug={slug} page={reviewPage} setPage={setReviewPage} />
      </Tabs>
    </div>
  );
};

export default IndividualProduct;
