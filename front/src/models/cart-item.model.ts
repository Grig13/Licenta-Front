import { Cart } from "./cart.model";
import { Product } from "./product.model";

export interface CartItem {
    id: string;
    cartId: string;
    cart: Cart;
    productId: string;
    product: Product;
    quantity: number;
    subtotal: number;
  }
  