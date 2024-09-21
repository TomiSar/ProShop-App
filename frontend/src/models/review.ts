import { User } from './user';

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: User['id'];
}
