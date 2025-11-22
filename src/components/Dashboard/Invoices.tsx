'use client'
import { Invoice } from '@/type/Invoice';
import { Edit, Eye, Filter, Search, Printer, AlertCircle, CheckCircle, Clock, TrendingUp, Sparkles, FileText, DownloadCloud } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState, useMemo, memo } from 'react';
import InvoiceViewPopup from './InvoiceView';
import InvoiceStatusPopup from './InvoiceStatus';

interface InvoicesPageProps {
    invoices: Invoice[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    selectedStatus: string;
    setSelectedStatus: Dispatch<SetStateAction<string>>;
    onUpdateInvoice?: (invoiceId: string, data: Partial<Invoice>) => void;
}

const InvoiceRow = memo(({
    invoice,
    onView,
    onEdit,
    formatPrice,
    formatDate
}: {
    invoice: Invoice;
    onView: (invoice: Invoice) => void;
    onEdit: (invoice: Invoice) => void;
    formatPrice: (price: number) => string;
    formatDate: (date: string | Date) => string;
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'failed': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            case 'paid': return <CheckCircle size={14} className="mr-1" />;
            case 'pending': return <Clock size={14} className="mr-1" />;
            case 'failed': return <AlertCircle size={14} className="mr-1" />;
            default: return null;
        }
    };

    return (
        <tr className="border-b border-gray-100/50 hover:bg-blue-50/30 transition-colors duration-150 group">
            <td className="py-6 px-6">
                <p className="font-semibold text-gray-900">#{invoice._id?.slice(-8).toUpperCase()}</p>
                <p className="text-sm text-gray-500">{formatDate(invoice.createdAt)}</p>
            </td>
            <td className="py-6 px-6">
                <div className="space-y-1">
                    <p className="font-medium text-gray-900">{invoice.userId.name}</p>
                    <p className="text-sm text-gray-500">{invoice.userId.email}</p>
                </div>
            </td>
            <td className="py-6 px-6">
                <span className="text-gray-700 font-medium">{invoice.items.length} sản phẩm</span>
            </td>
            <td className="py-6 px-6">
                <span className="font-bold text-lg text-green-600">
                    {formatPrice(invoice.totalAmount)}
                </span>
            </td>
            <td className="py-6 px-6">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(invoice.paymentStatus)}`}>
                    {getStatusIcon(invoice.paymentStatus)}
                    {getStatusLabel(invoice.paymentStatus)}
                </span>
            </td>
            <td className="py-6 px-6">
                <div className="flex items-center justify-center space-x-2">
                    <button
                        onClick={() => onView(invoice)}
                        className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors duration-150"
                        title="Xem chi tiết"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => onEdit(invoice)}
                        className="p-2.5 text-purple-600 hover:bg-purple-100 rounded-xl transition-colors duration-150"
                        title="Cập nhật"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-150"
                        title="In hóa đơn"
                    >
                        <Printer size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
});

InvoiceRow.displayName = 'InvoiceRow';

const InvoicesPage = ({
    invoices,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    onUpdateInvoice
}: InvoicesPageProps) => {
    const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
    const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice: Invoice) => {
            const matchesSearch = !searchTerm.trim() ||
                invoice.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice._id?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = !selectedStatus || invoice.paymentStatus === selectedStatus;
            return matchesSearch && matchesStatus;
        });
    }, [invoices, searchTerm, selectedStatus]);

    const formatPrice = useMemo(() => {
        return (price: number): string => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        };
    }, []);

    const formatDate = useMemo(() => {
        return (date: string | Date): string => {
            return new Date(date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        };
    }, []);

    const getStatusStats = useMemo(() => {
        return {
            total: invoices.length,
            paid: invoices.filter(inv => inv.paymentStatus === 'paid').length,
            pending: invoices.filter(inv => inv.paymentStatus === 'pending').length,
            failed: invoices.filter(inv => inv.paymentStatus === 'failed').length,
            totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)
        };
    }, [invoices]);

    const handleViewInvoice = (invoice: Invoice) => {
        setViewInvoice(invoice);
    };

    const handleEditInvoice = (invoice: Invoice) => {
        setEditInvoice(invoice);
    };

    const handleUpdateStatus = (status: string) => {
        if (editInvoice && onUpdateInvoice) {
            onUpdateInvoice(editInvoice._id || '', { paymentStatus: status });
            setEditInvoice(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Quản lý Hóa đơn
                                    </h1>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <p className="text-gray-600 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                                            Tổng cộng <span className="font-semibold text-blue-600 mx-1">{getStatusStats.total}</span> đơn hàng
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Sparkles className="h-4 w-4 mr-1" />
                                            {filteredInvoices.length} hiển thị
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <p className="text-sm text-green-600 font-medium">Đã thanh toán</p>
                                <p className="text-2xl font-bold text-green-700">{getStatusStats.paid}</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                                <p className="text-sm text-yellow-600 font-medium">Chờ thanh toán</p>
                                <p className="text-2xl font-bold text-yellow-700">{getStatusStats.pending}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên khách, email hoặc mã đơn hàng..."
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
                                    value={selectedStatus}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
                                    className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-150 bg-white appearance-none text-gray-700"
                                >
                                    <option value="">Tất cả trạng thái</option>
                                    <option value="paid">Đã thanh toán</option>
                                    <option value="pending">Chờ thanh toán</option>
                                    <option value="failed">Thanh toán thất bại</option>
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
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Mã đơn hàng</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Khách hàng</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Số sản phẩm</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Tổng tiền</th>
                                    <th className="text-left py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Trạng thái</th>
                                    <th className="text-center py-6 px-6 font-bold text-gray-800 text-sm uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.map((invoice: Invoice) => (
                                    <InvoiceRow
                                        key={invoice._id}
                                        invoice={invoice}
                                        onView={handleViewInvoice}
                                        onEdit={handleEditInvoice}
                                        formatPrice={formatPrice}
                                        formatDate={formatDate}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {filteredInvoices.length === 0 && (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Không tìm thấy hóa đơn nào</p>
                                <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${viewInvoice ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${viewInvoice ? 'opacity-50' : 'opacity-0'}`} onClick={() => setViewInvoice(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${viewInvoice ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <InvoiceViewPopup
                        invoice={viewInvoice}
                        isOpen={!!viewInvoice}
                        onClose={() => setViewInvoice(null)}
                        formatPrice={formatPrice}
                        formatDate={formatDate}
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 ${editInvoice ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${editInvoice ? 'opacity-50' : 'opacity-0'}`} onClick={() => setEditInvoice(null)} />
                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${editInvoice ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <InvoiceStatusPopup
                        invoice={editInvoice}
                        isOpen={!!editInvoice}
                        onClose={() => setEditInvoice(null)}
                        onUpdate={handleUpdateStatus}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvoicesPage;