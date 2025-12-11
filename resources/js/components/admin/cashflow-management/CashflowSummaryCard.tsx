import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface CashflowSummaryCardProps {
  title: string;
  amount: number;
  growth: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  isPercentage?: boolean;
}

export function CashflowSummaryCard({
  title,
  amount,
  growth,
  icon: Icon,
  iconBgColor,
  iconColor,
  isPercentage = false,
}: CashflowSummaryCardProps) {
  const isPositive = growth >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600">{title}</p>
          <p className="text-gray-900 mt-2">
            {isPercentage ? `${amount.toFixed(1)}%` : formatCurrency(amount)}
          </p>
        </div>
        <div className={`${iconBgColor} ${iconColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
          {isPositive ? '+' : ''}{growth.toFixed(1)}%
        </span>
        <span className="text-gray-500">vs periode sebelumnya</span>
      </div>
    </div>
  );
}
