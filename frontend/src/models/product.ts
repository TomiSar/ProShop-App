import { User } from './user';
import { Review } from './review';

export interface Product {
  _id?: string; // Optional ID
  user: User['_id']; // Match mongoose _id
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
