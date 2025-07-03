export type PurchaseRecord = {
    cartId: string;
    amountPaid: number;
    date: Date;
};

export type User = {
    id: string;
    name: string;
    isVip: boolean;
    purchaseHistory: PurchaseRecord[];
};