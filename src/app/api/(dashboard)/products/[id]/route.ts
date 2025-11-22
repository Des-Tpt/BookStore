// src/app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Hàm kết nối Mongoose của bạn
import Book from '@/model/Book';     // Model Book của bạn
import mongoose from 'mongoose';      

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 1. Kiểm tra tính hợp lệ của ID MongoDB
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID sản phẩm không hợp lệ.' }, { status: 400 });
    }

    // 2. Kết nối Database
    await connectDB(); 

    // 3. Truy vấn Mongoose (BỎ .lean() để tránh lỗi serialize)
    // Sẽ trả về một Mongoose Document
    const product = await Book.findById(id);

    // 4. Xử lý kết quả 404
    if (!product) {
      return NextResponse.json({ error: 'Không tìm thấy sản phẩm.' }, { status: 404 });
    }

    // 5. Sửa lỗi _id:
    // Chuyển Mongoose Document thành đối tượng JavaScript thuần túy
    const productObject = product.toObject();

    // Chuyển đổi ObjectId thành string để tránh lỗi serialize khi trả về JSON
    const productData = {
        ...productObject,
        _id: productObject._id.toString(), 
        // Đảm bảo các trường liên quan đến ID khác (nếu có) cũng được chuyển đổi, ví dụ category
        category: productObject.category ? productObject.category.toString() : null,
    };

    return NextResponse.json(productData);

  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ.' }, { status: 500 });
  }
}