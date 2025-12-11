export type Product = {
    id: string;
    name: string;
    quantity?: number;
    description?: string;
    foodType?: string[];
    priceDiscount: number;
    priceOrigin?: number;
    image: string;
    category: string;
    popular?: boolean;
    rating: number;
    preparationTime?: string;
};
