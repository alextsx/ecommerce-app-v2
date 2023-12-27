import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DetailedOrderType } from '@/redux/order/order.types';
import { OrderItemsSheet } from './sheet/DetailsSheet';

export const OrderHistoryTableColumns: ColumnDef<DetailedOrderType>[] = [
  {
    accessorKey: 'createdAt',
    header: () => <div className="uppercase font-mono">Order placement date</div>,
    cell: ({ row }) => (
      <div className="p-3">{format(new Date(row.original.createdAt), 'MM/dd/yyyy')}</div>
    )
  },
  {
    accessorKey: 'fulfillmentStatus',
    header: () => <div className="uppercase font-mono">Fulfillment Status</div>,
    cell: ({ row }) => <div className="p-3">{row.original.fulfillmentStatus}</div>
  },
  {
    accessorKey: 'paymentStatus',
    header: () => <div className="uppercase font-mono">Payment Status</div>,
    cell: ({ row }) => <div className="p-3">{row.original.paymentStatus}</div>
  },
  {
    accessorKey: 'total',
    header: () => <div className="uppercase font-mono">Total price</div>,
    cell: ({ row }) => <div className="p-3">${parseFloat(row.original.total).toFixed(2)}</div>
  },
  {
    accessorKey: 'paymentMethod',
    header: () => <div className="uppercase font-mono">Payment Method</div>,
    cell: ({ row }) => <div className="p-3">{row.original.paymentMethod}</div>
  },
  {
    accessorKey: 'orderItems',
    header: () => <div className="uppercase font-mono">Details</div>,
    cell: ({ row }) => (
      <div className="p-3">
        <OrderItemsSheet orderItems={row.original.orderItems} />
      </div>
    )
  }
];
