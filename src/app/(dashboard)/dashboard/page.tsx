'use client'
import { addBook, deleteBook, editBook, fetchBooks } from "@/action/bookAction";
import { addCategory, deleteCategory, editCategory, fetchCategories } from "@/action/categoryAction";
import { addUser, deleteUser, editUser, fetchUser } from "@/action/userAction";
import BooksPage from "@/components/Dashboard/Books";
import CategoriesPage from "@/components/Dashboard/Categories";
import DashboardOverview from "@/components/Dashboard/Overview";
import Sidebar from "@/components/Dashboard/Sidebar";
import UsersPage from "@/components/Dashboard/User";
import { Book } from "@/type/Book";
import { Category } from "@/type/Categories";
import { User } from "@/type/User";
import { set } from "mongoose";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const book = await fetchBooks();
            const categories = await fetchCategories();
            const user = await fetchUser();

            if (categories) {
                setCategories(categories);
            }

            if (book) {
                setBooks(book);
            }

            if (user) {
                setUsers(user);
            }
        } catch {
            toast.error('Lỗi khi tải dữ liệu!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddBook = async (bookData: any) => {
        const result = await addBook(bookData);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleEditBook = async (bookData: any) => {
        const result = await editBook(bookData);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleDeleteBook = async (bookId: string) => {
        const result = await deleteBook(bookId);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleAddCategory = async (categoryData: any) => {
        const result = await addCategory(categoryData);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleEditCategory = async (categoryData: any) => {
        const result = await editCategory(categoryData);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleDeleteCategory = async (categoryId: string) => {
        const result = await deleteCategory(categoryId);
        if (result) {
            await fetchData();
        }
        return result;
    };

    const handleAddUser = async (userData: any) => {
        const result = await addUser(userData);
        if (result) {
            await fetchData();
        }
        return result;
    }

    const handleEditUser = async (userData: any) => {
        const result = await editUser(userData);
        if (result) {
            await fetchData();
        }
        return result;
    }

    const handleDeleteUser = async (userId: string) => {
        const result = await deleteUser(userId);
        if (result) {
            await fetchData();
        }
        return result;
    }

    const renderCurrentPage = () => {
        switch (activeTab) {
            case 'books':
                return (
                    <BooksPage
                        books={books}
                        categories={categories}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        onAddBook={handleAddBook}
                        onDeleteBook={handleDeleteBook}
                        onEditBook={handleEditBook}
                    />
                );

            case 'categories':
                return (
                    <CategoriesPage
                        categories={categories}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onAddCategory={handleAddCategory}
                        onEditCategory={handleEditCategory}
                        onDeleteCategory={handleDeleteCategory}
                    />
                );

            case 'overview':
                return (
                    <DashboardOverview />
                );
            case 'users':
                return (
                    <UsersPage
                        users={users}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onAddUser={handleAddUser}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                    />
                );

            default:
                return (
                    <DashboardOverview />
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (!categories || !books || !users) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
                <p className="text-gray-600">Không thể tải dữ liệu</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {renderCurrentPage()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;