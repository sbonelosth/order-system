import { useState } from 'react';
import { MenuItem } from '../../types';
import { useOrderStore } from '../../store/useOrderStore';
import { Button } from '../ui/Button';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
}

const FilterButton = ({ category, onClick, isActive }: { category: string; onClick: () => void; isActive: boolean }) => (
  <button
    onClick={onClick}
    className={`mr-2 px-4 py-2 rounded-lg ${isActive ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'}`}
  >
    {category}
  </button>
);

export const MenuGrid = ({ items }: MenuGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const addToCart = useOrderStore((state) => state.addToCart);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <FilterButton category="All" onClick={() => setSelectedCategory(null)} isActive={selectedCategory === null} />
        <FilterButton category="Main" onClick={() => setSelectedCategory('main')} isActive={selectedCategory === 'main'} />
        <FilterButton category="Sides" onClick={() => setSelectedCategory('sides')} isActive={selectedCategory === 'sides'} />
        <FilterButton category="Drinks" onClick={() => setSelectedCategory('drinks')} isActive={selectedCategory === 'drinks'} />
        <FilterButton category="Desserts" onClick={() => setSelectedCategory('desserts')} isActive={selectedCategory === 'desserts'} />
        <div onClick={() => setIsGridView(!isGridView)} className="ml-4 cursor-pointer p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
          {isGridView ? <LayoutGrid size={24} /> : <LayoutList size={24} />}
        </div>
      </div>
      <div className={`md:max-h-[80vh] grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 p-4 overflow-y-auto`}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${isGridView ? '' : 'flex'}`}
          >
            <img
              src={item.image}
              alt={item.name}
              className={`w-full object-cover ${isGridView ? 'h-48' : 'h-36 w-36'}`}
            />
            <div className={`p-4 ${isGridView ? '' : 'flex flex-col justify-center items-start'}`}>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">R{item.price.toFixed(2)}</p>
              <Button
                onClick={() => handleAddToCart(item)}
                className={`mt-4 ${isGridView ? 'w-full' : ''}`}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};