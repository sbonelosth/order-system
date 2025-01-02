import { MenuItem } from '../../types';
import { useOrderStore } from '../../store/useOrderStore';
import { Button } from '../ui/Button';

interface MenuGridProps {
  items: MenuItem[];
}

export const MenuGrid = ({ items }: MenuGridProps) => {
  const addToCart = useOrderStore((state) => state.addToCart);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <Button
              onClick={() => handleAddToCart(item)}
              className="w-full mt-2"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};