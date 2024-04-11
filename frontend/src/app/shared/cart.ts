import { Product } from "./product";

export interface Cart {
    id: number;
    productId: number;
    userId: number;
    quantity: number;
    total: number;
    product?: Product;
}