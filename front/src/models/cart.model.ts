import { Product } from "./product.model";

export class Cart{
    id!: string;
    productId?: string;
    quantity?: number;
    totalPrice?: number;
    products?: Product[];
}