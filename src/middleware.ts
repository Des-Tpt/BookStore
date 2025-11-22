import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;

        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/dasboard") && token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true, 
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};
