import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { generatePageLabelsArray } from '@/lib/generatePageLabelsArray';

export const usePaginationLabels = ({
  pageCount,
  page,
  setPage
}: {
  pageCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const pageLabelsArray = useMemo(
    () =>
      generatePageLabelsArray({
        pageCount,
        pageIndex: page
      }),
    [pageCount, page]
  );

  const PaginationButtons = () => (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="text-md"
        onClick={() => {
          if (page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
        disabled={page <= 1}
      >
        Previous
      </Button>
      {pageLabelsArray.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return <span key={index}>{pageNumber}</span>;
        } else {
          return (
            <Button
              variant="outline"
              size="sm"
              className="text-md"
              onClick={() => setPage(pageNumber)}
              key={index}
              disabled={page === pageNumber}
            >
              {pageNumber}
            </Button>
          );
        }
      })}
      <Button
        variant="outline"
        size="sm"
        className="text-md"
        onClick={() => {
          if (page < pageCount) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={page >= pageCount}
      >
        Next
      </Button>
    </div>
  );

  return { PaginationButtons };
};
