import { TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, subtitle, bgColor, iconColor }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    bgColor: string;
    iconColor: string;
}) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-150">
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {subtitle && (
                    <p className="text-sm text-gray-500 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        {subtitle}
                    </p>
                )}
            </div>
            <div className={`p-3 ${bgColor} rounded-xl`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
        </div>
    </div>
);

export default StatCard;