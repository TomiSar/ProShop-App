export interface User {
  _id: string; // Match mongoose _id
  name: string;
  email: string;
  isAdmin: boolean;
}
