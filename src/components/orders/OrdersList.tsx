import { format } from 'date-fns';
import { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { Button } from '../ui/Button';
import { OrderDetail } from './OrderDetail';
import { Order } from '../../types';

export const OrdersList = () => {
  const { orders, updateOrderStatus, cancelOrder } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4 mx-4 lg:grid lg:grid-cols-2 lg:gap-4 space-y-0">
      {sortedOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedOrder(order)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{order.id}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(order.timestamp), 'PPp')}
              </p>
            </div>
            <div className="space-x-2">
              {order.status === 'pending' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'preparing');
                  }}
                  size="sm"
                >
                  Start Preparing
                </Button>
              )}
              {order.status === 'preparing' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'ready');
                  }}
                  size="sm"
                >
                  Mark Ready
                </Button>
              )}
              {order.status === 'ready' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'completed');
                  }}
                  size="sm"
                >
                  Complete Order
                </Button>
              )}
              {['pending', 'preparing'].includes(order.status) && (
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelOrder(order.id);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium">Items:</h4>
            <ul className="mt-2 space-y-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>R{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              <span
                className={`px-2 py-1 rounded-full ${
                  {
                    pending: 'bg-yellow-100 text-yellow-800',
                    preparing: 'bg-blue-100 text-blue-800',
                    ready: 'bg-green-100 text-green-800',
                    completed: 'bg-gray-100 text-gray-800',
                    cancelled: 'bg-red-100 text-red-800',
                  }[order.status]
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="font-semibold">
              Total: R{order.total.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
      
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};