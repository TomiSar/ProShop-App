import { User } from './user';

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: User['_id']; // Match mongoose _id
}
