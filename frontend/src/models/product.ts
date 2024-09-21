import { User } from './user';
import { Review } from './review';

export interface Product {
  id?: string; // Optional ID
  user: User['id'];
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
  createdAt: Date;
  updatedAt: Date;
}
