import { CartState } from '../slices/cartSlice';

export const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartState): CartState => {
  // Calculate items price
  // Calculate shipping price (If order over 100$ free else 10$ shipping price)
  // Calculate tax price (15% of item price)
  // Calculate total price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  state.itemsPrice = addDecimals(itemsPrice);
  state.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(itemsPrice * 0.15);
  state.totalPrice = addDecimals(
    itemsPrice + parseFloat(state.shippingPrice) + parseFloat(state.taxPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
