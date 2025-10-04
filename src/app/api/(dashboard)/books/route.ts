import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Book from '@/model/Book';

export async function GET() {
    try {
        await connectDB();
        const books = await Book.find({})
            .populate('category', 'name')
            .select('title author price imageUrl stock category publishedYear');

        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách sách' },
            { status: 500 }
        );
    }
}
