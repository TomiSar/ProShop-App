import { User } from './user';
import { Product } from './product';

export interface OrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product['_id'];
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface Order {
  id?: string; // Optional ID
  user: User['_id']; // Match mongoose _id
  orderItems: OrderItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}
