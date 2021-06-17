import { Order } from './order';
export class User {
  id?: string;
  name: string;
  password: string;
  pedidos?: Order[];
}
