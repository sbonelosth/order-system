import { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { Button } from '../ui/Button';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, createOrder } = useOrderStore();
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="sticky inset-0 bg-white rounded-lg shadow-md p-4 mx-4">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="max-h-[50vh] space-y-4 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">R{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PlusCircle size={20} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>R{total.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="flex items-center mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Cash
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Card
                </label>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <Button onClick={createOrder} className="w-full mb-2">
                Checkout
              </Button>
              <Button
                variant="danger"
                onClick={clearCart}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};