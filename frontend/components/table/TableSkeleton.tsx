import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export const TableSkeleton = ({
  col_length,
  row_length
}: {
  col_length: number;
  row_length: number;
}) => {
  return (
    <>
      {Array.from({ length: row_length }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: col_length }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="w-[130px] h-5 bg-slate-200" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
