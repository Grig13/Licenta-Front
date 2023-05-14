import { CartItem } from "./cart-item.model";

export class Cart{
    id!: string;
    userId!: string;
    items?: CartItem[];
}