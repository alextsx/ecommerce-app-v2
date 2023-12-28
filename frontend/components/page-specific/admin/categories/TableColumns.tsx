import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Category } from '@/redux/categories/categories.types';
import { DeleteButton } from './delete/DeleteButton';

export const CategoriesListTableColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="uppercase font-mono text-center">Name</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.name}</div>
  },
  {
    accessorKey: 'slug',
    header: () => <div className="uppercase font-mono text-center">Slug</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.slug}</div>
  },
  {
    accessorKey: 'operations',
    header: () => <div className="uppercase font-mono text-center">Operations</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center justify-center items-center flex gap-10">
        <Link href={`/admin/categories/update/${row.original.slug}`}>
          <Button className="text-lg" variant="default">
            Update
          </Button>
        </Link>
        <DeleteButton slug={row.original.slug} />
      </div>
    )
  }
];
