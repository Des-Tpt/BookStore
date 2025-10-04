import Category from "@/model/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        if (!name || !description) {
            return NextResponse.json({ success: false, error: "Vui lòng nhập đầy đủ các dữ liệu cần thiết" }, { status: 400 });
        }

        const slug = slugify(name);

        await Category.create({ name, description, slug });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
    }
}

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
}
