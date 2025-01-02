import { OrdersList } from '../components/orders/OrdersList';

export const OrdersManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        <OrdersList />
      </div>
    </div>
  );
};