import { ProductComments } from "./product-comments.model";

export class Product {
    id!: string;
    name!: string;
    description!: string;
    price!: number;
    comments?: ProductComments[];
}