'use client'
import { Book } from '@/type/Book';
import { Category } from '@/type/Categories';
import { Edit, Eye, Filter, Plus, Search, Trash2, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState, useMemo, memo } from 'react';
import BookViewPopup from './BookDetail';
import BookFormPopup from './BookForm';
import BookDeletePopup from './BookDelete';

interface BooksPageProps {
    books: Book[];
    categories: Category[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    onAddBook?: (bookData: Partial<Book>) => void;
    onEditBook?: (bookData: Partial<Book>) => void;
    onDeleteBook?: (bookId: string) => void;
}

const BookRow = memo(({
    book,
    onView,
    onEdit,
    onDelete,
    formatPrice
}: {
    book: Book;
    onView: (book: Book) => void;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
    formatPrice: (price: number) => string;
}) => (
    <tr className="border-b border-gray-100/50 hover:bg-blue-50/30 transition-colors duration-150 group">
        <td className="py-6 px-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-14 h-18 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                        {book.title}
                    </p>
                    <p className="text-sm text-gray-500">#{book._id.slice(-6)}</p>
                </div>
            </div>
        </td>
        <td className="py-6 px-6">
            <span className="text-gray-700 font-medium">{book.author}</span>
        </td>
        <td className="py-6 px-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {book.category.name}
            </span>
        </td>
        <td className="py-6 px-6">
            <span className="font-bold text-lg text-green-600">
                {formatPrice(book.price)}
            </span>
        </td>
        <td className="py-6 px-6">
            <span className="text-gray-700 font-medium">{book.stock}</span>
        </td>
        <td className="py-6 px-6">
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => onView(book)}
                    className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors duration-150"
                    title="Xem chi tiết"
                >
                    <Eye size={18} />
                </button>
                <button
                    onClick={() => onEdit(book)}
                    className="p-2.5 text-green-600 hover:bg-green-100 rounded-xl transition-colors duration-150"
                    title="Chỉnh sửa"
                >
                    <Edit size={18} />
                </button>
                <button
                    onClick={() => onDelete(book)}
                    className="p-2.5 text-red-600 hover:bg-red-100 rounded-xl transition-colors duration-150"
                    title="Xóa sách"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </td>
    </tr>
));

BookRow.displayName = 'BookRow';

const BooksPage = ({
    books,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    onAddBook,
    onEditBook,
    onDeleteBook
}: BooksPageProps) => {
    const [viewBook, setViewBook] = useState<Book | null>(null);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [deleteBook, setDeleteBook] = useState<Book | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredBooks = useMemo(() => {
        return books.filter((book: Book) => {
            const matchesSearch = !searchTerm.trim() ||
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || book.category._id === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [books, searchTerm, selectedCategory]);

    const formatPrice = useMemo(() => {
        return (price: number): string => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        };
    }, []);

    const handleViewBook = (book: Book) => {
        setViewBook(book);
    };

    const handleEditBook = (book: Book) => {
        setEditBook(book);
    };

    const handleDeleteBook = (book: Book) => {
        setDeleteBook(book);
    };

    const handleAddBook = (bookData: Partial<Book>) => {
        if (onAddBook) {
            onAddBook(bookData);
        }
        setShowAddForm(false);
    };

    const handleUpdateBook = (bookData: Partial<Book>) => {
        if (onEditBook) {
            onEditBook(bookData);
        }
        setEditBook(null);
    };

    const handleConfirmDelete = async () => {
        if (deleteBook && onDeleteBook) {
            setIsDeleting(true);
            try {
                await onDeleteBook(deleteBook._id);
                setDeleteBook(null);
            } catch (error) {
                console.error('Error deleting book:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 ">
                                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                                    <BookOpen className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Quản lý Sách
                                    </h1>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <p className="text-gray-600 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                                            Tổng cộng <span className="font-semibold text-blue-600 mx-1">{books.length}</span> cuốn sách
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Sparkles className="h-4 w-4 mr-1" />
                                            {filteredBooks.length} hiển thị
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 flex items-center gap-3 font-medium"
                        >
                            <Plus size={20} />
                            <span>Thêm sách mới</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 bg-white text-gray-700 placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div className="lg:w-64">
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={selectedCategory}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-150 bg-white appearance-none text-gray-700"
                                >
                                    <option value="">Tất cả danh mục</option>
                                    {categories.map((category: Category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Sách</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Tác giả</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Danh mục</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Giá</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Tồn kho</th>
                                    <th className="text-center py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book: Book) => (
                                    <BookRow
                                        key={book._id}
                                        book={book}
                                        onView={handleViewBook}
                                        onEdit={handleEditBook}
                                        onDelete={handleDeleteBook}
                                        formatPrice={formatPrice}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {filteredBooks.length === 0 && (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <BookOpen className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Không tìm thấy sách nào</p>
                                <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${viewBook ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${viewBook ? 'opacity-50' : 'opacity-0'}`} onClick={() => setViewBook(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${viewBook ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <BookViewPopup
                        book={viewBook}
                        isOpen={!!viewBook}
                        onClose={() => setViewBook(null)}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${showAddForm ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${showAddForm ? 'opacity-50' : 'opacity-0'}`} onClick={() => setShowAddForm(false)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${showAddForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <BookFormPopup
                        categories={categories}
                        isOpen={showAddForm}
                        onClose={() => setShowAddForm(false)}
                        onSubmit={handleAddBook}
                        isEdit={false}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${editBook ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${editBook ? 'opacity-50' : 'opacity-0'}`} onClick={() => setEditBook(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${editBook ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <BookFormPopup
                        book={editBook}
                        categories={categories}
                        isOpen={!!editBook}
                        onClose={() => setEditBook(null)}
                        onSubmit={handleUpdateBook}
                        isEdit={true}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${deleteBook ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${deleteBook ? 'opacity-50' : 'opacity-0'}`} onClick={() => setDeleteBook(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${deleteBook ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <BookDeletePopup
                        book={deleteBook}
                        isOpen={!!deleteBook}
                        onClose={() => setDeleteBook(null)}
                        onConfirm={handleConfirmDelete}
                        isDeleting={isDeleting}
                    />
                </div>
            </div>
        </div>
    );
};

export default BooksPage;