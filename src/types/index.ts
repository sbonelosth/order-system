export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'main' | 'sides' | 'drinks' | 'desserts';
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  timestamp: string;
  total: number;
  estimatedTime: number;
  statusHistory: {
    status: string;
    timestamp: string;
  }[];
}