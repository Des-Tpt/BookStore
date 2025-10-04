import connectDB from "@/lib/mongodb";
import Category from "@/model/Category";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
    try {
        await connectDB();
        const { categoryId } = await params;
        const formData = await req.formData();

        const updateData: any = {};
        for (const [key, value] of formData.entries()) {
            if (value !== null && value !== "") {
                updateData[key] = value;
            }
        }

        const updateCategory = await Category.findByIdAndUpdate(categoryId, updateData);

        if (!updateCategory) {
            return NextResponse.json({ success: false, error: "Không tìm thấy danh mục cần update!" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi cập nhật danh mục!' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ categoryId: string }> }) {
    try {
        await connectDB();
        const { categoryId } = await params;

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return NextResponse.json({ sucess: false, error: "Không tìm thấy danh mục cần xóa!" })
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi xóa danh mục!' },
            { status: 500 }
        );
    }
}
