import { format } from 'date-fns';
import { Order } from '../../types';
import { Button } from '../ui/Button';
import { Printer } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
}

export const OrderDetail = ({ order, onClose }: OrderDetailProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">{order.id}</h2>
              <p className="text-gray-500">
                {format(new Date(order.timestamp), 'PPpp')}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handlePrint} variant="secondary" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button onClick={onClose} variant="secondary" size="sm">
                Close
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>R{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>R{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Status History</h3>
            <div className="space-y-2">
              {order.statusHistory.map((status, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="capitalize">{status.status}</span>
                  <span className="text-gray-500">
                    {format(new Date(status.timestamp), 'PPpp')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};