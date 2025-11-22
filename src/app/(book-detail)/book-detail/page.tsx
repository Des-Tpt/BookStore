'use client'
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Star, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
  description: string;
  stock: number;
  publishedYear: number;
  rating: number;
}

interface Review {
  _id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

const mockedBook: Book = {
  _id: '1',
  title: 'Lập Trình React Pro',
  author: 'Nguyễn Văn A',
  price: 250000,
  imageUrl: 'https://reactjsexample.com/content/images/2019/04/React-16.jpg',
  category: { _id: '1', name: 'Công Nghệ' },
  description: 'Hướng dẫn chi tiết về React từ cơ bản đến nâng cao. Cuốn sách này sẽ giúp bạn nắm vững các khái niệm cơ bản của React và các pattern advanced.',
  stock: 15,
  publishedYear: 2023,
  rating: 4.5
};

const mockedReviews: Review[] = [
  {
    _id: '1',
    author: 'Trần Minh Hiếu',
    rating: 5,
    title: 'Sách rất hay, dễ hiểu',
    content: 'Nội dung được trình bày rất rõ ràng, từng chương được xây dựng logic từ cơ bản đến nâng cao. Mình học được rất nhiều điều bổ ích.',
    date: '2024-01-15',
    helpful: 45
  },
  {
    _id: '2',
    author: 'Lê Thu Hằng',
    rating: 4,
    title: 'Tốt nhưng cần thêm bài tập',
    content: 'Sách có nội dung tốt nhưng cần thêm nhiều bài tập thực hành để người học có thể luyện tập.',
    date: '2024-01-10',
    helpful: 32
  },
  {
    _id: '3',
    author: 'Phạm Quốc Bảo',
    rating: 4,
    title: 'Rất giá trị cho người mới bắt đầu',
    content: 'Tôi là người mới bắt đầu và cuốn sách này rất hữu ích. Giải thích cách mã hoạt động rất chi tiết.',
    date: '2024-01-05',
    helpful: 28
  }
];

const relatedBooks = [
  {
    _id: '2',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 220000,
    imageUrl: 'https://m.media-amazon.com/images/I/7185IMvz88L.jpg',
    rating: 4.3
  },
  {
    _id: '3',
    title: 'Clean Code',
    author: 'Robert Martin',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=280&fit=crop',
    rating: 4.8
  },
  {
    _id: '7',
    title: 'Lập Trình Python',
    author: 'Hoàng Văn E',
    price: 240000,
    imageUrl: 'https://tuhoclaptrinh.edu.vn/upload/post/16/44/30/ngon-ngu-lap-trinh-python-la-gi-487407.jpg',
    rating: 4.9
  }
];
function BookDetailContent() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} cuốn "${mockedBook.title}" vào giỏ hàng`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <a href="#" className="hover:text-indigo-600">Trang chủ</a> /
          <a href="#" className="hover:text-indigo-600 ml-1">Sách</a> /
          <span className="ml-1 text-gray-800">{mockedBook.title}</span>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hình ảnh */}
            <div className="flex justify-center">
              <img
                src={mockedBook.imageUrl}
                alt={mockedBook.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            {/* Thông tin */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {mockedBook.category.name}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">{mockedBook.title}</h1>
              <p className="text-lg text-gray-600 mb-4">Tác giả: {mockedBook.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(mockedBook.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({mockedBook.rating} / 5)</span>
                <span className="text-gray-600">• 120 đánh giá</span>
              </div>

              {/* Giá */}
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-gray-600 mb-2">Giá:</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {mockedBook.price.toLocaleString('vi-VN')} đ
                </p>
              </div>

              {/* Tình trạng */}
              <div className="mb-6">
                <p className="text-gray-800 font-semibold mb-2">Tình trạng:</p>
                <p className={`text-lg font-semibold ${mockedBook.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mockedBook.stock > 0 ? `Còn ${mockedBook.stock} cuốn` : 'Hết hàng'}
                </p>
              </div>

              {/* Số lượng */}
              <div className="mb-6">
                <p className="text-gray-800 font-semibold mb-3">Số lượng:</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 w-10 h-10 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 w-10 h-10 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm Vào Giỏ
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`px-6 py-3 rounded-lg border-2 transition font-semibold ${isFavorite
                      ? 'bg-red-50 border-red-600 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-red-600'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600' : ''}`} />
                </button>
                <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-indigo-600 transition font-semibold">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Thông tin bổ sung */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Giao hàng miễn phí</p>
                    <p className="text-sm text-gray-600">Đơn hàng từ 100.000đ trở lên</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Hoàn trả 30 ngày</p>
                    <p className="text-sm text-gray-600">Hoàn trả toàn bộ tiền nếu không hài lòng</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Thanh toán an toàn</p>
                    <p className="text-sm text-gray-600">Các phương thức thanh toán được bảo vệ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab thông tin */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b flex gap-8 px-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'description'
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-600 border-transparent hover:text-indigo-600'
                }`}
            >
              Mô Tả
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'details'
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-600 border-transparent hover:text-indigo-600'
                }`}
            >
              Chi Tiết
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'reviews'
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-600 border-transparent hover:text-indigo-600'
                }`}
            >
              Đánh Giá ({mockedReviews.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">{mockedBook.description}</p>
                <p className="text-gray-700 leading-relaxed">
                  Cuốn sách này được thiết kế cho cả người mới bắt đầu và các lập trình viên có kinh nghiệm muốn nâng cao kỹ năng React của mình. Mỗi chương đều kết hợp lý thuyết với các ví dụ thực tế để bạn có thể áp dụng ngay vào dự án của mình.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600">Tác giả</p>
                    <p className="font-semibold text-gray-800">{mockedBook.author}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Năm xuất bản</p>
                    <p className="font-semibold text-gray-800">{mockedBook.publishedYear}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Danh mục</p>
                    <p className="font-semibold text-gray-800">{mockedBook.category.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Số trang</p>
                    <p className="font-semibold text-gray-800">450 trang</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Loại bìa</p>
                    <p className="font-semibold text-gray-800">Bìa cứng</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Trọng lượng</p>
                    <p className="font-semibold text-gray-800">650g</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {mockedReviews.map(review => (
                  <div key={review._id} className="border-b pb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-3">{review.content}</p>
                    <button className="text-sm text-gray-600 hover:text-indigo-600">
                      👍 Hữu ích ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản Phẩm Liên Quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBooks.map(book => (
              <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative overflow-hidden bg-gray-200 h-64">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{book.author}</p>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({book.rating})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">{book.price.toLocaleString('vi-VN')} đ</span>
                    <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailContent;