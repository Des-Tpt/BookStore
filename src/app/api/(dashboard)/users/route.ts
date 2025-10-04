import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/model/User';

export async function GET() {
    try {
        await connectDB();
        const users = await User.find()

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Không thể tải danh sách sách' },
            { status: 500 }
        );
    }
}
