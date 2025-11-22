'use client'
import { useState } from 'react';
import { Trash2, ShoppingCart, Check } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  book: Book;
  quantity: number;
}

const mockedBooks: Book[] = [
  {
    _id: '1',
    title: 'Lập Trình React Pro',
    author: 'Nguyễn Văn A',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1752199718118-133cba05df0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '2',
    title: 'Clean Code',
    author: 'Robert Martin',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1752199718118-133cba05df0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '3',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 220000,
    imageUrl: 'https://images.unsplash.com/photo-1752199718118-133cba05df0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const paymentMethods = [
  { id: 'credit_card', name: 'Thẻ Tín Dụng' },
  { id: 'debit_card', name: 'Thẻ Ghi Nợ' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bank_transfer', name: 'Chuyển Khoản Ngân Hàng' }
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: mockedBooks[0], quantity: 1 },
    { book: mockedBooks[1], quantity: 2 },
    { book: mockedBooks[2], quantity: 1 }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: 'Việt Nam'
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const updateQuantity = (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(cartItems.map(item =>
      item.book._id === bookId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (bookId: string) => {
    setCartItems(cartItems.filter(item => item.book._id !== bookId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shippingFee = 30000;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shippingFee + tax;

  const handleSubmit = () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt Hàng Thành Công!</h1>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xác nhận.</p>
          <button
            onClick={() => setOrderComplete(false)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Quay Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Giỏ Hàng */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Giỏ Hàng ({cartItems.length} sản phẩm)
              </h2>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.book._id} className="flex gap-4 pb-4 border-b">
                    <img
                      src={item.book.imageUrl}
                      alt={item.book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.book.title}</h3>
                      <p className="text-sm text-gray-600">{item.book.author}</p>
                      <p className="font-bold text-indigo-600 mt-2">
                        {item.book.price.toLocaleString('vi-VN')} đ
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                          className="bg-gray-200 w-8 h-8 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                          className="bg-gray-200 w-8 h-8 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.book._id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thông Tin Giao Hàng */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thông Tin Giao Hàng</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Thành phố"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Quốc gia"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Phương Thức Thanh Toán */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 mb-3">Phương Thức Thanh Toán</h3>
                  <div className="space-y-2">
                    {paymentMethods.map(method => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-800">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isProcessing ? 'Đang xử lý...' : 'Thanh Toán'}
                </button>
              </div>
            </div>
          </div>

          {/* Tóm Tắt Đơn Hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm Tắt Đơn Hàng</h2>

              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền hàng:</span>
                  <span className="font-semibold">{subtotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold">{shippingFee.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế (10%):</span>
                  <span className="font-semibold">{tax.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 text-lg">
                <span className="font-bold text-gray-800">Tổng cộng:</span>
                <span className="font-bold text-indigo-600 text-2xl">
                  {total.toLocaleString('vi-VN')} đ
                </span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                ✓ Miễn phí hoàn hàng 30 ngày
                <br />✓ Hỗ trợ 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}