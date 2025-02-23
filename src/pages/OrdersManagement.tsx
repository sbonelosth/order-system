import { OrdersList } from '../components/orders/OrdersList';

export const OrdersManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <OrdersList />
      </div>
    </div>
  );
};