import { ProductComments } from "./product-comments.model";


export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    comments?: ProductComments[];
}
  
  