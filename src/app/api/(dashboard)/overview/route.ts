import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Book from '@/model/Book';
import Category from '@/model/Category';

export async function GET() {
    try {
        await connectDB();

        const bookCount = await Book.countDocuments();
        const categoryCount = await Category.countDocuments();
        const recentBooks = await Book.find({})
            .sort({ createdAt: -1 })
            .limit(6)
            .select('title author price');

        const averagePriceAgg = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: '$price' },
                },
            },
        ]);

        const averagePrice = averagePriceAgg.length > 0 ? averagePriceAgg[0].averagePrice : 0;

        const totalStockAgg = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalStock: { $sum: '$stock' },
                },
            },
        ]);

        const totalStock = totalStockAgg.length > 0 ? totalStockAgg[0].totalStock : 0;

        const booksByCategory = await Book.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryInfo',
                },
            },
            {
                $unwind: {
                    path: '$categoryInfo',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    name: '$categoryInfo.name',
                    slug: '$categoryInfo.slug',
                },
            },
            {
                $sort: { count: -1 },
            },
        ]);

        return NextResponse.json({
            status: 200,
            data: {
                bookCount,
                categoryCount,
                averagePrice,
                recentBooks,
                booksByCategory,
                totalStock,
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách sách' },
            { status: 500 }
        );
    }
}