import { Product } from "./product.model";

export class ProductComments{
    id!: string;
    content!: string;
    grade?: number;
    productId!: string;
    product?: Product;
}