import { Category } from './category';

export class Product {
  id?: number;
  name: string = '';
  price: number = 0;
  description: string = '';
  category: Category = new Category();
}
