import connectDB from "@/lib/mongodb";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const title = formData.get("title");
        const author = formData.get("author");
        const category = formData.get("categoryId");
        const stock = Number(formData.get("stock") as string);
        const price = Number(formData.get("price") as string);
        const description = formData.get("description");
        const publishedYear = Number(formData.get("publishedYear") as string);
        const imageUrl = formData.get("imageUrl");

        if (!title || !author || !category || !price || !stock || !description) {
            return NextResponse.json({ success: false, error: "Vui lòng nhập đầy đủ các dữ liệu cần thiết" }, { status: 400 });
        }

        await Book.create({ title, author, category, price, stock, description, publishedYear, imageUrl });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Lỗi server" }, { status: 500 });
    }
}