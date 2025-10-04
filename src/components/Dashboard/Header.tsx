'use client'
import { BookOpen, Grid3X3, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setSidebarOpen }: HeaderProps) => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 p-2"
            >
                <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
            </div>
        </div>
    </header>
);

export default Header;