import { NextResponse } from 'next/server';
import Category from '@/model/Category';
import connectDB from '@/lib/mongodb';

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find({})
            .select('name description slug');

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách danh mục' },
            { status: 500 }
        );
    }
}
