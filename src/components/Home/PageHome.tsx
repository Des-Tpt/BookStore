import Link from 'next/link';
// Không cần import 'react' vì Next.js đã tự động lo việc này

// -----------------------------------------------------------------
// 1. DỮ LIỆU GIẢ (MOCK DATA)
// -----------------------------------------------------------------

// Định nghĩa kiểu dữ liệu (Types)
type Book = { 
  _id: string; 
  title: string; 
  author: string; 
  price: number; 
  imageUrl: string; 
};
type Category = { 
  _id: string; 
  name: string; 
};

// Danh sách sách giả
const mockBooks: Book[] = [
  { _id: '1', title: 'Lập trình Next.js 14 Toàn tập', author: 'Tác giả A', price: 150000, imageUrl: 'https://via.placeholder.com/300x400/09f/fff.png?text=Next.js' },
  { _id: '2', title: 'Học TypeScript trong 3 ngày', author: 'Tác giả B', price: 120000, imageUrl: 'https://via.placeholder.com/300x400/f60/fff.png?text=TypeScript' },
  { _id: '3', title: 'MongoDB cho người mới bắt đầu', author: 'Tác giả C', price: 180000, imageUrl: 'https://via.placeholder.com/300x400/0c6/fff.png?text=MongoDB' },
  { _id: '4', title: 'React Nâng Cao và Patterns', author: 'Tác giả D', price: 90000, imageUrl: 'https://via.placeholder.com/300x400/999/fff.png?text=React' },
];

// Danh sách thể loại giả
const mockCategories: Category[] = [
  { _id: 'c1', name: 'Lập trình' },
  { _id: 'c2', name: 'Công nghệ' },
  { _id: 'c3', name: 'Phát triển bản thân' },
  { _id: 'c4', name: 'Kinh doanh' },
];


// -----------------------------------------------------------------
// 2. COMPONENT TRANG CHỦ
// -----------------------------------------------------------------

export default function HomePage() {
  // Lấy dữ liệu giả (trong thực tế, bạn sẽ dùng 'await' ở đây)
  const books = mockBooks;
  const categories = mockCategories;

  return (
    // Xóa các class "flex-col items-center justify-between p-24" cũ
    <main className="min-h-screen bg-gray-50">
      
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4">Chào mừng đến với BookStore</h1>
          <p className="text-xl mb-8 opacity-90">Nơi tốt nhất để tìm cuốn sách tiếp theo của bạn.</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="#featured-books" 
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition text-lg"
            >
              Khám phá sách
            </Link>
            {/* Đây là nút đi tới Dashboard của bạn */}
            <Link 
              href="/dashboard" 
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition text-lg"
            >
              Tới trang Quản lý
            </Link>
          </div>
        </div>
      </section>

      {/* --- Categories Section --- */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Duyệt theo Thể loại</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category._id}`} // Dẫn tới trang thể loại (ví dụ)
                className="px-5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-blue-500 hover:text-white transition shadow-sm"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Books Section --- */}
      <section id="featured-books" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Sách Nổi Bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Lặp qua danh sách sách và hiển thị */}
            {books.map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 group">
                {/* Link tới trang chi tiết sách */}
                <Link href={`/book/${book._id}`} className="block"> 
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">{book.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{book.author}</p>
                    <p className="text-xl font-bold text-blue-600">
                      {/* Định dạng tiền tệ VNĐ */}
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
                    </p>
                  </div>
                </Link>
                {/* Nút thêm vào giỏ hàng */}
                <div className="p-4 pt-0">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                      Thêm vào giỏ
                    </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      
      {/* --- Footer --- */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} BookStore. Xây dựng bởi bạn và tôi.</p>
        </div>
      </footer>

    </main>
  );
}