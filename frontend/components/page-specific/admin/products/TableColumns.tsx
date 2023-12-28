import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Product } from '@/redux/product/product.types';
import { ProductDeleteButton } from './delete/DeleteButton';

export const ProductsListTableColumns: ColumnDef<Product>[] = [
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
    accessorKey: 'price',
    header: () => <div className="uppercase font-mono text-center">Price</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.formattedPrice}</div>
  },
  {
    accessorKey: 'discountedPrice',
    header: () => <div className="uppercase font-mono text-center">Discounted Price</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center">{row.original.discountedPriceFormatted ?? '-'}</div>
    )
  },
  {
    accessorKey: 'inventory',
    header: () => <div className="uppercase font-mono text-center">Inventory</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.inventory}</div>
  },
  {
    accessorKey: 'operations',
    header: () => <div className="uppercase font-mono text-center">Operations</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center justify-center items-center flex gap-10">
        <Link href={`/admin/products/update/${row.original.slug}`}>
          <Button className="text-lg" variant="default">
            Update
          </Button>
        </Link>
        <ProductDeleteButton slug={row.original.slug} />
      </div>
    )
  }
];
