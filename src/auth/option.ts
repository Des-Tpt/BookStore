import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // Đây là đăng nhập kiểu thủ công.
            // Sau này có thể thêm các provider khác như Google...
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Vì là đăng nhập thủ công nên cần tự viết thêm hàm authorize
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("EmailNotFound");
                }

                const isValid = await bcrypt.compare(credentials!.password, user.password);
                if (!isValid) {
                    throw new Error("InvalidPassword");
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            }
        }),
    ],

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
};
