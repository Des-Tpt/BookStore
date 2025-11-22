// src/app/products/[id]/page.tsx

import React from 'react';

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  _id: string;
  title: string;       
  price: number;
  author: string;
  description: string;
  imageUrl: string;
}

// Hàm fetch data phía Server Component
async function getProductDetail(id: string): Promise<Product | null> {
  // SỬ DỤNG CỔNG 3002 NHƯ HIỆN TẠI TRÊN TERMINAL CỦA BẠN
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'; 
  
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }
    
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
    return null;
  }
}

// Component chính (Server Component)
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = await getProductDetail(productId);

  // Xử lý 404
  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-600 mt-20">404 - Không tìm thấy Sản phẩm</h1>
        <p className="mt-4 text-lg text-gray-600">Sản phẩm với ID: {productId} không tồn tại.</p>
      </div>
    );
  }

  // Giao diện Chi tiết Sản phẩm
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* --- KHỐI 1: THÔNG TIN SẢN PHẨM CHÍNH --- */}
      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-xl overflow-hidden mb-8">
        
        {/* Cột hình ảnh */}
        <div className="lg:w-1/2 p-6 flex justify-center items-center bg-white border-r border-gray-100">
          <img 
            src={product.imageUrl || '/placeholder.png'} 
            alt={product.title} 
            className="w-auto h-auto max-h-[500px] object-contain rounded-lg shadow-sm"
          />
        </div>

        {/* Cột thông tin */}
        <div className="lg:w-1/2 p-6 md:p-10 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">Tác giả: <span className="font-semibold text-gray-800">{product.author}</span></p>
          
          <div className="text-4xl md:text-5xl font-bold text-red-600 mb-8 bg-red-50 p-4 rounded-lg inline-block border border-red-100 self-start">
            {product.price.toLocaleString('vi-VN')} VNĐ
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Giới thiệu ngắn</h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-justify line-clamp-4">
            {product.description || "Sản phẩm này hiện chưa có mô tả chi tiết."}
          </p>

          {/* Phần nút bấm (Đã căn chỉnh cân đối) */}
          <div className="mt-auto flex flex-col md:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center border-2 border-red-600 bg-white text-red-600 py-3 px-6 rounded-lg text-lg font-bold uppercase tracking-wide hover:bg-red-50 transition duration-300 h-14">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm vào giỏ
            </button>
            <button className="flex-1 flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-bold uppercase tracking-wide hover:bg-red-700 transition duration-300 shadow-lg h-14">
              Mua ngay
            </button>
          </div>

          <div className="mt-6 pt-4 border-t text-sm text-gray-500">
            Mã sản phẩm: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{product._id}</span>
          </div>
        </div>
      </div>

      {/* --- KHỐI 2: MÔ TẢ CHI TIẾT & THÔNG SỐ (PHẦN MỚI THÊM) --- */}
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">Thông tin chi tiết</h3>
        
        {/* Bảng thông số kỹ thuật giả lập (Để giao diện đẹp hơn) */}
        <div className="mb-8">
            <table className="w-full text-left border-collapse">
                <tbody>
                    <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/3">Tác giả</td>
                        <td className="py-3 px-4 text-gray-800">{product.author}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600">Nhà xuất bản</td>
                        <td className="py-3 px-4 text-gray-800">NXB Hội Nhà Văn (Ví dụ)</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600">Năm xuất bản</td>
                        <td className="py-3 px-4 text-gray-800">2024</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600">Hình thức</td>
                        <td className="py-3 px-4 text-gray-800">Bìa Mềm</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-4">Nội dung sản phẩm</h3>
        <div className="text-gray-700 leading-8 text-lg text-justify space-y-4">
          {/* Hiển thị mô tả đầy đủ ở đây */}
          <p>{product.description}</p>
          
          {/* Đoạn văn mẫu để nhìn giao diện đầy đặn hơn nếu mô tả ngắn */}
          <p>
            Đây là cuốn sách tuyệt vời dành cho những ai đam mê lĩnh vực này. Nội dung sách được trình bày khoa học, dễ hiểu, đi từ cơ bản đến nâng cao. Tác giả {product.author} đã dành nhiều tâm huyết để đúc kết những kiến thức quý báu, giúp người đọc dễ dàng tiếp cận và áp dụng vào thực tế.
          </p>
          <p>
            Sách được in trên chất liệu giấy chất lượng cao, chống lóa, giúp bảo vệ mắt khi đọc trong thời gian dài. Thiết kế bìa sách ấn tượng, phù hợp để làm quà tặng hoặc trưng bày trong tủ sách của bạn.
          </p>
        </div>
      </div>

    </div>
  );
}