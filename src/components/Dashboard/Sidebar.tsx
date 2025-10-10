'use client'
import { User as UserType } from '@/type/User';
import { BookOpen, Grid3X3, LayoutDashboard, User, X, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [user, setUser] = useState<Partial<UserType> | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { data } = useSession();
    const router = useRouter();

    const handleNavigation = (tab: string) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    useEffect(() => {
        if (data && data.user) {
            setUser(data.user as Partial<UserType>);
        }
        else {
            setUser(null);
        }
    }, [data]);

    useEffect(() => {
        // Close user menu when sidebar closes
        if (!sidebarOpen) {
            setUserMenuOpen(false);
        }
    }, [sidebarOpen]);

    return (
        <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 backdrop-blur-sm shadow-xl border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
                <div className="relative flex items-center justify-between h-20 px-6 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            BookStore
                        </h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 p-2 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto">
                <div className="px-3 mb-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"></div>
                        Quản lý
                    </h3>
                </div>

                <button
                    onClick={() => handleNavigation('overview')}
                    className={`group w-full flex items-center px-4 py-3.5 text-left text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'overview'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-gray-600 hover:bg-white/70 hover:backdrop-blur-sm hover:shadow-md hover:text-gray-900'
                        }`}
                >
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${activeTab === 'overview'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 group-hover:shadow-md'
                        }`}>
                        <LayoutDashboard size={18} />
                    </div>
                    Tổng quan
                    {activeTab === 'overview' && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                </button>

                <button
                    onClick={() => handleNavigation('books')}
                    className={`group w-full flex items-center px-4 py-3.5 text-left text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'books'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-gray-600 hover:bg-white/70 hover:backdrop-blur-sm hover:shadow-md hover:text-gray-900'
                        }`}
                >
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${activeTab === 'books'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 group-hover:shadow-md'
                        }`}>
                        <BookOpen size={18} />
                    </div>
                    Quản lý Sách
                    {activeTab === 'books' && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                </button>

                <button
                    onClick={() => handleNavigation('categories')}
                    className={`group w-full flex items-center px-4 py-3.5 text-left text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'categories'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-gray-600 hover:bg-white/70 hover:backdrop-blur-sm hover:shadow-md hover:text-gray-900'
                        }`}
                >
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${activeTab === 'categories'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 group-hover:shadow-md'
                        }`}>
                        <Grid3X3 size={18} />
                    </div>
                    Quản lý Danh mục
                    {activeTab === 'categories' && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                </button>

                <button
                    onClick={() => handleNavigation('users')}
                    className={`group w-full flex items-center px-4 py-3.5 text-left text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'users'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-gray-600 hover:bg-white/70 hover:backdrop-blur-sm hover:shadow-md hover:text-gray-900'
                        }`}
                >
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${activeTab === 'users'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 group-hover:shadow-md'
                        }`}>
                        <User size={18} />
                    </div>
                    Quản lý Người dùng
                    {activeTab === 'users' && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                </button>
            </nav>

            <div className="mt-auto border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                {user && (
                    <div className="relative p-4">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                        >
                            <div className="flex-shrink-0 relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <span className="text-white font-bold text-sm">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-semibold text-gray-900">
                                    {user.name || 'Người dùng'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email || ''}
                                </p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <div className={`absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-200 ${userMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                            }`}>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;