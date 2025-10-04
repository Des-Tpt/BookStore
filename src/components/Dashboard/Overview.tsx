'use client'
import { BookOpen, FolderOpen, DollarSign, Package, TrendingUp, Sparkles, BarChart3 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';

interface Book {
    _id: string;
    title: string;
    author: string;
    price: number;
}

interface CategoryStat {
    _id: string;
    count: number;
    name: string;
    slug: string;
}

interface DashboardData {
    bookCount: number;
    categoryCount: number;
    averagePrice: number;
    totalStock: number;
    recentBooks: Book[];
    booksByCategory: CategoryStat[];
}

const DashboardOverview = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/overview');
            const result = await response.json();
            if (result.status === 200) {
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
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

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
                <p className="text-gray-600">Không thể tải dữ liệu</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                            <BarChart3 className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Tổng quan Dashboard
                            </h1>
                            <p className="text-gray-600 flex items-center mt-1">
                                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                                Thống kê và phân tích dữ liệu
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={BookOpen}
                        title="Tổng số sách"
                        value={data.bookCount}
                        subtitle="Sách trong kho"
                        bgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                    <StatCard
                        icon={FolderOpen}
                        title="Danh mục"
                        value={data.categoryCount}
                        subtitle="Đang hoạt động"
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                    />
                    <StatCard
                        icon={DollarSign}
                        title="Giá trung bình"
                        value={formatCurrency(data.averagePrice)}
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                    />
                    <StatCard
                        icon={Package}
                        title="Tổng tồn kho"
                        value={data.totalStock}
                        subtitle="Cuốn sách"
                        bgColor="bg-orange-100"
                        iconColor="text-orange-600"
                    />
                </div>

                {/* Recent Books & Category Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Books */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Sách mới nhất</h2>
                            <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            {data.recentBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-150"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">{book.title}</p>
                                        <p className="text-sm text-gray-500">{book.author}</p>
                                    </div>
                                    <span className="ml-4 font-bold text-blue-600 whitespace-nowrap">
                                        {formatCurrency(book.price)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Books by Category */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Sách theo danh mục</h2>
                            <FolderOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="space-y-4">
                            {data.booksByCategory.slice(0, 6).map((category) => (
                                <div
                                    key={category._id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <FolderOpen className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{category.name || 'Chưa phân loại'}</p>
                                            <p className="text-xs text-gray-500">{category.slug || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                        {category.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Distribution Chart */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Phân bố theo danh mục</h2>
                    <div className="space-y-3">
                        {data.booksByCategory.map((category, index) => {
                            const percentage = (category.count / data.bookCount) * 100;
                            const colors = [
                                'bg-blue-500',
                                'bg-purple-500',
                                'bg-green-500',
                                'bg-orange-500',
                                'bg-pink-500',
                                'bg-indigo-500',
                                'bg-teal-500',
                            ];
                            return (
                                <div key={category._id} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-gray-700">
                                            {category.name || 'Chưa phân loại'}
                                        </span>
                                        <span className="text-gray-500">
                                            {category.count} ({percentage.toFixed(1)}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;