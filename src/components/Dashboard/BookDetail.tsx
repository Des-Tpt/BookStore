'use client'
import { Book } from '@/type/Book';
import { X, BookOpen, User, Tag, DollarSign, Calendar, FileText, Star, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface BookViewPopupProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
}

const BookViewPopup = ({ book, isOpen, onClose }: BookViewPopupProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !book) return null;

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300 ease-out animate-in fade-in-0 scale-in-95"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Chi tiết sách</h2>
                            <p className="text-white/80 text-sm">Thông tin đầy đủ về cuốn sách</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg z-40 transition-all duration-200 group"
                    >
                        <X size={20} className="text-white group-hover:rotate-90 transition-all duration-200" />
                    </button>
                </div>

                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-100px)] scrollbar-hide">
                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                            <div className="relative group">
                                <div className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ${isImageLoaded ? 'shadow-indigo-500/20' : ''
                                    }`}>
                                    {!isImageLoaded && (
                                        <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                                        </div>
                                    )}
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className={`w-full h-80 object-cover rounded-2xl transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                            } group-hover:scale-105`}
                                        onLoad={() => setIsImageLoaded(true)}
                                    />

                                    {/* Image overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 space-y-6">
                            <div className="group">
                                <div className="flex items-center mb-2">
                                    <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tên sách</label>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                                    {book.title}
                                </h3>
                                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <div className="flex items-center mb-2">
                                        <User className="h-4 w-4 mr-2 text-green-500" />
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tác giả</label>
                                    </div>
                                    <p className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                                        {book.author}
                                    </p>
                                </div>

                                <div className="group">
                                    <div className="flex items-center mb-2">
                                        <Tag className="h-4 w-4 mr-2 text-purple-500" />
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Danh mục</label>
                                    </div>
                                    <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
                                        <Tag className="h-3 w-3 mr-1" />
                                        {book.category.name}
                                    </span>
                                </div>

                                <div className="group">
                                    <div className="flex items-center mb-2">
                                        <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Giá bán</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            {formatPrice(book.price)}
                                        </p>
                                    </div>
                                </div>

                                {book.publishedYear && (
                                    <div className="group">
                                        <div className="flex items-center mb-2">
                                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Năm xuất bản</label>
                                        </div>
                                        <p className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                            {book.publishedYear}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {book.description && (
                                <div className="group">
                                    <div className="flex items-center mb-3">
                                        <FileText className="h-4 w-4 mr-2 text-teal-500" />
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mô tả</label>
                                    </div>
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">💡 Mẹo:</span> Nhấn ESC để đóng cửa sổ này
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookViewPopup;