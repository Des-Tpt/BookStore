'use client'
import { registerUser } from "@/action/userAction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Mail, Lock, User, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'email' | 'password' | 'confirmPassword') => {
        if (type === 'name') {
            setName(e.currentTarget.value);
        } else if (type === 'email') {
            setEmail(e.currentTarget.value);
        } else if (type === 'password') {
            setPassword(e.currentTarget.value);
        } else {
            setConfirmPassword(e.currentTarget.value);
        }
        setError('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            setIsSubmitting(false);
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            setIsSubmitting(false);
            toast.error('Mật khẩu quá ngắn');
            return;
        }

        try {
            const res = await registerUser({ name, email, password });
            if (res) {
                console.log('Registration successful', res);
                router.push('/login');
                router.refresh();
                setError('');
            } else {
                setError('Đăng ký không thành công. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại sau.');
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-200 ease-out">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
                    <div className="text-center">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <UserPlus className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Tạo tài khoản mới
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Đăng ký để bắt đầu
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <User className="h-4 w-4 mr-2 text-green-500" />
                            Họ và tên <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
                            placeholder="Nguyễn Văn A"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Mail className="h-4 w-4 mr-2 text-blue-500" />
                            Email <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleInputChange(e, 'email')}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Lock className="h-4 w-4 mr-2 text-purple-500" />
                            Mật khẩu <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => handleInputChange(e, 'password')}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Lock className="h-4 w-4 mr-2 text-purple-500" />
                            Xác nhận mật khẩu <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            required
                            className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        />
                        <label className="text-sm text-gray-600">
                            Tôi đồng ý với{' '}
                            <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                Điều khoản dịch vụ
                            </a>
                            {' '}và{' '}
                            <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                Chính sách bảo mật
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Đang đăng ký...
                            </>
                        ) : (
                            <>
                                <UserPlus className="h-5 w-5" />
                                Đăng ký
                            </>
                        )}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">hoặc</span>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Đăng nhập ngay
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;