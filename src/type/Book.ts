export interface Book {
    _id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    category: {
        _id: string;
        name: string;
    };
    description: string;
    stock: number;
    publishedYear: number;
}
