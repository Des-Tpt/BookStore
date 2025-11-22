import { Invoice } from "@/type/Invoice";

export const fetchInvoices = async (): Promise<Invoice[]> => {
    try {
        const response = await fetch('/api/invoices', {
            method: 'GET',
        });

        const result = await response.json();

        if (Array.isArray(result)) {
            return result;
        } else {
            return [];
        }

    } catch (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }
};


export const updateInvoice = async (invoiceId: string, data: Partial<Invoice>): Promise<Invoice | null> => {
    try {
        const response = await fetch(`/api/invoices/${invoiceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update invoice');
        }

        const updatedInvoice = await response.json();
        return updatedInvoice.data;
    } catch (error) {
        console.error('Error updating invoice:', error);
        return null;
    }
};
