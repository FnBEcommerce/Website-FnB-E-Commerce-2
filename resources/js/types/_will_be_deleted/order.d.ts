import type { Product } from './product';

export type Order = {
    product: Product;
    quantity: number;
    total: number;
    delivery_fee: number;
    subtotal: number;
};
