import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Invoice from '@/model/Invoice';

export async function GET() {
    try {
        await connectDB();
        const invoices = await Invoice.find({})
            .populate('userId', '_id name email phone')
            .populate('items.book', '_id title')

        return NextResponse.json(invoices, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách hóa đơn' },
            { status: 500 }
        );
    }
}
