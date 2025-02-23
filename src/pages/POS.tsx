import { MenuGrid } from '../components/pos/MenuGrid';
import { Cart } from '../components/pos/Cart';
import { menuItems } from '../data/menuItems';

export const POS = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MenuGrid items={menuItems} />
          </div>
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};