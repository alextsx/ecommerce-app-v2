import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DetailedOrderType } from '@/redux/order/order.types';
import { OrderItemsSheet } from './sheet/DetailsSheet';

export const OrderHistoryTableColumns: ColumnDef<DetailedOrderType>[] = [
  {
    accessorKey: 'createdAt',
    header: () => <div className="uppercase font-mono text-center">Order placement date</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center">
        {format(new Date(row.original.createdAt), 'MM/dd/yyyy HH:mm')}
      </div>
    )
  },
  {
    accessorKey: 'fulfillmentStatus',
    header: () => <div className="uppercase font-mono text-center">Fulfillment Status</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.fulfillmentStatus}</div>
  },
  {
    accessorKey: 'paymentStatus',
    header: () => <div className="uppercase font-mono text-center">Payment Status</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.paymentStatus}</div>
  },
  {
    accessorKey: 'total',
    header: () => <div className="uppercase font-mono text-center">Total price</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center">${parseFloat(row.original.total).toFixed(2)}</div>
    )
  },
  {
    accessorKey: 'paymentMethod',
    header: () => <div className="uppercase font-mono text-center">Payment Method</div>,
    cell: ({ row }) => <div className="p-3 text-center">{row.original.paymentMethod}</div>
  },
  {
    accessorKey: 'orderItems',
    header: () => <div className="uppercase font-mono text-center">Details</div>,
    cell: ({ row }) => (
      <div className="p-3 text-center">
        <OrderItemsSheet orderItems={row.original.orderItems} />
      </div>
    )
  }
];
