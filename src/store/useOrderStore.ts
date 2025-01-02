import { create } from 'zustand';
import { CartItem, Order } from '../types';
import { generateOrderNumber } from '../lib/orderNumber';

interface OrderStore {
  orders: Order[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  cart: [],
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  createOrder: () =>
    set((state) => {
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      
      const newOrder: Order = {
        id: generateOrderNumber(),
        items: [...state.cart],
        status: 'pending',
        timestamp: new Date().toISOString(),
        total,
        estimatedTime: 15 + Math.floor(Math.random() * 15),
        statusHistory: [
          { status: 'pending', timestamp: new Date().toISOString() }
        ],
      };

      return {
        orders: [...state.orders, newOrder],
        cart: [],
      };
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              statusHistory: [
                ...order.statusHistory,
                { status, timestamp: new Date().toISOString() },
              ],
            }
          : order
      ),
    })),

  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'cancelled',
              statusHistory: [
                ...order.statusHistory,
                { status: 'cancelled', timestamp: new Date().toISOString() },
              ],
            }
          : order
      ),
    })),
}));