import type { Product } from './product';

export type Order = {
    product: Product;
    quantity: number;
    total: number;
    deliveryFee: number;
    subtotal: number;
};
