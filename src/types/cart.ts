import type { Product } from "./product";

export type CartType = 'COMUN' | 'FECHA_ESPECIAL' | 'VIP';

export type CartItem = {
    product: Product;
    quantity: number;
}

export type Cart = {
    id: string;
    type: CartType;
    items: CartItem[];
    createdAt: Date;
    userId: string;
    isCompleted: boolean;
    completedAt?: Date;
}