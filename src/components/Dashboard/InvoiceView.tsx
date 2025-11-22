'use client'
import { Invoice } from '@/type/Invoice';
import { X, FileText, User, Mail, Phone, MapPin, ShoppingCart, DollarSign, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface InvoiceViewPopupProps {
    invoice: Invoice | null;
    isOpen: boolean;
    onClose: () => void;
    formatPrice: (price: number) => string;
    formatDate: (date: string | Date) => string;
}

const InvoiceViewPopup = ({
    invoice,
    isOpen,
    onClose,
    formatPrice,
    formatDate
}: InvoiceViewPopupProps) => {
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

    if (!isOpen || !invoice) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'from-green-600 to-emerald-600';
            case 'pending': return 'from-yellow-600 to-amber-600';
            case 'failed': return 'from-red-600 to-rose-600';
            default: return 'from-gray-600 to-gray-600';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'paid': return 'Đã thanh toán';
            case 'pending': return 'Chờ thanh toán';
            case 'failed': return 'Thanh toán thất bại';
            default: return 'Không xác định';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle className="h-5 w-5" />;
            case 'pending': return <Clock className="h-5 w-5" />;
            case 'failed': return <AlertCircle className="h-5 w-5" />;
            default: return null;
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'cash': return 'Thanh toán tiền mặt';
            case 'card': return 'Thẻ tín dụng';
            case 'banking': return 'Chuyển khoản ngân hàng';
            case 'momo': return 'Ví MoMo';
            case 'zalopay': return 'ZaloPay';
            default: return method;
        }
    };

    return (
        <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300 ease-out animate-in fade-in-0 scale-in-95"
            onClick={(e) => e.stopPropagation()}
        >
            <div className={`relative bg-gradient-to-r ${getStatusColor(invoice.paymentStatus)} p-6`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Chi tiết hóa đơn</h2>
                            <p className="text-white/80 text-sm">#{invoice._id?.slice(-8).toUpperCase()}</p>
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
            </div>

            <div className="overflow-y-auto max-h-[calc(95vh-100px)] scrollbar-hide">
                <div className="p-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Trạng thái thanh toán</p>
                            <div className="flex items-center space-x-2">
                                {getStatusIcon(invoice.paymentStatus)}
                                <span className={`text-lg font-bold bg-gradient-to-r ${getStatusColor(invoice.paymentStatus)} bg-clip-text text-transparent`}>
                                    {getStatusLabel(invoice.paymentStatus)}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Ngày tạo</p>
                            <p className="text-lg font-semibold text-gray-800">{formatDate(invoice.createdAt)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center mb-4">
                                    <User className="h-5 w-5 mr-2 text-blue-500" />
                                    <h3 className="text-lg font-bold text-gray-900">Thông tin khách hàng</h3>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <User className="h-4 w-4 mt-1 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600">Tên khách hàng</p>
                                            <p className="text-gray-900 font-semibold">{invoice.userId.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Mail className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="text-gray-900 font-semibold">{invoice.userId.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Phone className="h-4 w-4 mt-1 text-purple-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600">Số điện thoại</p>
                                            <p className="text-gray-900 font-semibold">{invoice.userId.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {invoice.shippingAddress && (
                                <div>
                                    <div className="flex items-center mb-4">
                                        <MapPin className="h-5 w-5 mr-2 text-red-500" />
                                        <h3 className="text-lg font-bold text-gray-900">Địa chỉ giao hàng</h3>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200 space-y-3">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold text-gray-900">{invoice.shippingAddress.fullName}</span>
                                        </p>
                                        <p className="text-sm text-gray-700">{invoice.shippingAddress.address}</p>
                                        <p className="text-sm text-gray-700">
                                            {invoice.shippingAddress.city}, {invoice.shippingAddress.country}
                                        </p>
                                        <p className="text-sm text-gray-700">{invoice.shippingAddress.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center mb-4">
                                    <ShoppingCart className="h-5 w-5 mr-2 text-purple-500" />
                                    <h3 className="text-lg font-bold text-gray-900">Chi tiết sản phẩm</h3>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 space-y-4 max-h-96 overflow-y-auto">
                                    {invoice.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start pb-4 border-b border-purple-200 last:border-0">
                                            <div>
                                                <p className="text-sm text-gray-600">Sản phẩm</p>
                                                <p className="font-semibold text-gray-900">{item.book.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">Số lượng: <span className="font-medium">{item.quantity}</span></p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Giá</p>
                                                <p className="font-bold text-purple-600">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="h-5 w-5 text-yellow-600" />
                                        <span className="font-semibold text-gray-800">Tổng cộng</span>
                                    </div>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {formatPrice(invoice.totalAmount)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center mb-3">
                                    <CreditCard className="h-5 w-5 mr-2 text-indigo-500" />
                                    <h3 className="font-bold text-gray-900">Phương thức thanh toán</h3>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200">
                                    <p className="text-gray-900 font-semibold">{getPaymentMethodLabel(invoice.paymentMethod)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">💡 Mẹo:</span> Nhấn ESC để đóng cửa sổ này
                        </div>
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
    );
};

export default InvoiceViewPopup;