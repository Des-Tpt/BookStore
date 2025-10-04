import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/model/Book';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;

        const book = await Book.findById(id)
            .populate('category', 'name')
            .select('title author description price imageUrl stock category');

        if (!book) {
            return NextResponse.json(
                { error: 'Không tìm thấy sản phẩm!' },
                { status: 404 }
            );
        }

        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi lấy dữ liệu sản phẩm!' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const formData = await request.formData();

        const updateData: any = {};
        for (const [key, value] of formData.entries()) {
            if (value !== null && value !== "") {
                if (key === "price" || key === "publishedYear") {
                    updateData[key] = Number(value);
                } else {
                    updateData[key] = value;
                }
            }
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBook) {
            return NextResponse.json({ success: false, error: "Không tìm thấy sản phẩm cần update!" }, { status: 404 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi cập nhật sản phẩm!' },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return NextResponse.json({ success: false, error: "Không tìm thấy sản phẩm cần xóa!" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi xóa sản phẩm!' },
            { status: 500 }
        );
    }
}
