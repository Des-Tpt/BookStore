// src/app/(books)/books/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';

// --- PHẦN 1: Giao diện Lọc (Client Component) ---
// Component này xử lý việc thay đổi URL khi người dùng chọn tiêu chí lọc.
// Nó phải là 'use client' vì nó sử dụng các hooks của Next.js (useRouter, useSearchParams).
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface FilterProps {
    currentCategory: string | null;
}

const FilterSidebar: React.FC<FilterProps> = ({ currentCategory }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Các danh mục có sẵn
    const categories = ['Fiction', 'Science', 'History', 'Technology'];

    const handleFilterChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        // Nếu đã chọn danh mục này, thì nhấp lại để hủy chọn (xóa param)
        if (currentCategory === category) {
            params.delete('category');
        } else {
            // Thiết lập danh mục mới
            params.set('category', category);
        }

        // Cập nhật URL. Việc này sẽ trigger việc render lại toàn bộ trang (Server Component)
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <aside className="w-64 p-4 border-r">
            <h3 className="text-lg font-bold mb-4">Danh mục</h3>
            <div className="space-y-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleFilterChange(category)}
                        className={`block w-full text-left py-1 px-3 rounded ${
                            currentCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-4">Sắp xếp</h3>
            {/* Thêm bộ lọc sắp xếp tương tự tại đây nếu cần */}
            <Link href={`${pathname}?${new URLSearchParams({ category: currentCategory || '' }).toString()}&sort=price_asc`}
                className="block text-blue-500 hover:underline"
            >
                Giá tăng dần
            </Link>
        </aside>
    );
};

// --- PHẦN 2: Danh sách Sản phẩm (Client Component) ---
// Component này chỉ đơn thuần hiển thị dữ liệu đã được Server Component truyền vào.
interface Book {
    id: number;
    title: string;
    category: string;
    price: number;
}

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
        <div className="flex-1 p-6">
<h2 className="text-2xl font-bold mb-6">Kết quả ({books.length} sách)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="border p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                        <p className="text-sm text-gray-500">{book.category}</p>
                        <p className="text-lg font-bold mt-2 text-red-600">${book.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- PHẦN 3: Trang Chính (Server Component) ---
// Đây là Server Component chính. Nó nhận Search Params từ URL.
interface BooksPageProps {
    searchParams: {
        category?: string;
        sort?: string;
    };
}

// Hàm giả định gọi cơ sở dữ liệu để lấy sách
// Trong thực tế, bạn sẽ gọi API hoặc hàm truy vấn DB trực tiếp tại đây.
const getFilteredBooks = async (params: BooksPageProps['searchParams']): Promise<Book[]> => {
    // Độ trễ mô phỏng việc gọi API/DB
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const allBooks: Book[] = [
        { id: 1, title: "Harry Potter 1", category: "Fiction", price: 15.99 },
        { id: 2, title: "A Brief History of Time", category: "Science", price: 12.50 },
        { id: 3, title: "The Martian", category: "Fiction", price: 18.00 },
        { id: 4, title: "Clean Code", category: "Technology", price: 35.00 },
        { id: 5, title: "Sapiens", category: "History", price: 20.99 },
    ];

    let filteredBooks = allBooks;

    // 1. Lọc theo Danh mục
    if (params.category) {
        filteredBooks = filteredBooks.filter(book => 
            book.category.toLowerCase() === params.category!.toLowerCase()
        );
    }
    
    // 2. Lọc theo Sắp xếp
    if (params.sort === 'price_asc') {
        filteredBooks.sort((a, b) => a.price - b.price);
    } 

    return filteredBooks;
};


export default async function BooksPage({ searchParams }: BooksPageProps) {
    
    // Đọc các tham số lọc hiện tại
    const currentCategory = searchParams.category || null;

    // Lấy dữ liệu đã lọc (Xảy ra trên Server)
    const books = await getFilteredBooks(searchParams);

    return (
        <div className="flex min-h-screen">
            {/* Bộ lọc (Client Component) */}
            {/* Dùng Suspense để bao bọc Client Component dùng useSearchParams */}
            <Suspense fallback={<div>Loading Filters...</div>}>
                <FilterSidebar currentCategory={currentCategory} />
            </Suspense>

            {/* Danh sách Sản phẩm (Client Component) */}
            <BookList books={books} />
        </div>
    );
}
// Lưu ý: Đảm bảo đã cài đặt Tailwind CSS nếu bạn sử dụng các class như 'flex', 'p-4', 'border', v.v.
