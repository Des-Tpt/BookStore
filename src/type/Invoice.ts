export interface Invoice {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        phone: number;
    };
    items: [{
        book: {
            _id: string;
            title: string;
        };
        quantity: number;
        price: number;
    }],
    totalAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    shippingAddress?: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        country: string;
    }
    createdAt: Date;
}