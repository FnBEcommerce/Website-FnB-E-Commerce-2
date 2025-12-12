import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone_number: string | null;
    birth_date: string | null;
    gender: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    label: string | null;
    alt_street: string | null;
    alt_city: string | null;
    alt_state: string | null;
    alt_label: string | null;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface Courier {
    id: number;
    name: string;
    license_plate: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price_origin: number | null;
    price_discount: number;
    quantity: number;
    image: string | null;
    popular: boolean;
    rating: number;
    preparation_time: string | null;
    badge: string | null;
    food_type: any | null;
    created_at: string;
    updated_at: string;
}

export interface ShopBranch {
    id: number;
    name: string;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    shop_branch_id: number;
    courier_id: number | null;
    payment_method: string;
    status: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    confirmed_at: string | null;
    processed_at: string | null;
    estimated_delivery_at: string | null;
    delivered_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    order_id: number;
    transaction_status: string;
    amount: number;
    payment_gateway_reference: string | null;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    type: string | null;
    description: string;
    created_at: string;
    updated_at: string;
}
