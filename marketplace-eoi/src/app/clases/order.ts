import { AddedArticle } from './added-article';
import { Article } from './article';

export class Order {
  id?: string;
  name: string;
  date: Date;
  totalPedido: number;
  articles: AddedArticle[];
}
