import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");

        if (!email || !password || !name) {
            return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin!" }, { status: 400 });
        }

        const isValidEmail = await User.findOne({ email });
        if (isValidEmail) {
            return NextResponse.json({ message: "Email đã được sử dụng!" }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(password.toString(), 10);

        await User.create({ email, password: hashPassword, name, role: "user" });

        return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Đăng ký không thành công, vui lòng thử lại sau!" }, { status: 500 });
    }
}