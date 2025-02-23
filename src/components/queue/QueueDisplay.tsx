import { formatDistanceToNow } from 'date-fns';
import { useOrderStore } from '../../store/useOrderStore';

export const QueueDisplay = () => {
  const orders = useOrderStore((state) => state.orders);

  const preparingOrders = orders.filter((order) => order.status === 'preparing');
  const readyOrders = orders.filter((order) => order.status === 'ready');

  return (
    <div className="flex flex-col gap-4 lg:grid grid-cols-2 lg:gap-4 space-y-0">
      <div className="bg-white rounded-lg shadow-md p-4 mx-4">
        <h2 className="text-xl font-semibold mb-4">Preparing</h2>
        <div className="space-y-4">
          {preparingOrders.map((order) => (
            <div
              key={order.id}
              className="border-l-4 border-blue-500 pl-4 py-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Est. Time: {order.estimatedTime} mins
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(order.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mx-4">
        <h2 className="text-xl font-semibold mb-4">Ready for Collection</h2>
        <div className="space-y-4">
          {readyOrders.map((order) => (
            <div
              key={order.id}
              className="border-l-4 border-green-500 pl-4 py-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{order.id}</h3>
                <p className="text-sm text-gray-500">
                  Ready{' '}
                  {formatDistanceToNow(
                    new Date(
                      order.statusHistory.find((h) => h.status === 'ready')
                        ?.timestamp || ''
                    ),
                    { addSuffix: true }
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};