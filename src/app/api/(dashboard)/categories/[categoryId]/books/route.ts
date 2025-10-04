import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/model/Book';

export async function GET(request: Request, { params }: { params: Promise<{ categoryId: string }> }) {
    try {
        await connectDB();
        const { categoryId } = await params;
        const books = await Book.find({ categoryId })
            .populate('category', 'name')
            .select('title author price imageUrl');

        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách sách theo danh mục' },
            { status: 500 }
        );
    }
}
