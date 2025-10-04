'use client'
import { Book } from '@/type/Book';
import { AlertTriangle, X } from 'lucide-react';
import React from 'react';

interface BookDeletePopupProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

const BookDeletePopup = ({ book, isOpen, onClose, onConfirm, isDeleting = false }: BookDeletePopupProps) => {
    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Xác nhận xóa sách</h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <p className="text-gray-700 mb-2">
                            Bạn có chắc chắn muốn xóa sách này không?
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">{book.title}</p>
                                    <p className="text-sm text-gray-600">Tác giả: {book.author}</p>
                                    <p className="text-sm text-gray-600">Danh mục: {book.category.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác. Sách sẽ bị xóa vĩnh viễn khỏi hệ thống.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Đang xóa...
                            </>
                        ) : (
                            'Xác nhận xóa'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDeletePopup;