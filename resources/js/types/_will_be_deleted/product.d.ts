import { Review } from './review';

export type Product = {
    id: string;
    name: string;
    quantity?: number;
    description?: string;
    food_type?: string[];
    price_discount: number;
    price_origin?: number;
    image: string;
    category: string;
    popular?: boolean;
    rating: number;
    preparation_time?: string;
    badge?: string;
    reviews?: Review[];
};
