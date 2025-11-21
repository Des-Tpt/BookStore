import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Providers from "./provider";

export const metadata: Metadata = {
    title: "Book Store",
    description: "Next.js Book Store Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
                <Toaster position="top-right" reverseOrder={false} />
            </body>
        </html>
    );
}
