import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Invoice from '@/model/Invoice';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const body = await request.json();

        const invoice = await Invoice.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true, runValidators: true }
        ).populate('userId', '_id name email phone');

        if (!invoice) {
            return NextResponse.json(
                { error: 'Hóa đơn không tồn tại' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Cập nhật hóa đơn thành công',
                data: invoice
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating invoice:', error);
        return NextResponse.json(
            { error: 'Không thể cập nhật hóa đơn' },
            { status: 500 }
        );
    }
}
