import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/model/Book';
import User from '@/model/User';
import bcrypt from 'bcryptjs';

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();
        const { userId } = await params;

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: 'Không tìm thấy người dùng!' },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi lấy dữ liệu người dùng!' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();
        const { userId } = await params;
        const formData = await request.formData();

        const updateData: any = {};
        for (const [key, value] of formData.entries()) {
            if (value !== null && value !== "") {
                if (key === "password") {
                    const hashedPassword = await bcrypt.hash(value as string, 10);
                    updateData["password"] = hashedPassword;
                } else {
                    updateData[key] = value;
                }
            }
        }

        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updateUser) {
            return NextResponse.json({ success: false, error: "Không tìm thấy người dùng cần update!" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi cập nhật người dùng!' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();
        const { userId } = await params;

        const book = await Book.findByIdAndDelete(userId);

        if (!book) {
            return NextResponse.json({ success: false, error: "Không tìm thấy người dùng cần xóa!" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi xóa người dùng!' },
            { status: 500 }
        );
    }
}
