import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const role = formData.get("role") as string;
        const address = formData.get("address") as string;
        const phone = formData.get("phone");

        if (!name || !email || !password || !role) {
            return NextResponse.json({ success: false, error: "Vui lòng nhập đầy đủ các dữ liệu cần thiết" }, { status: 400 });
        }

        await User.create({ name, email, password, role, address, phone });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Lỗi server" }, { status: 500 });
    }
}