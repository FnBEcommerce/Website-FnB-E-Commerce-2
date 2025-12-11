import { PeriodType } from '@/pages/admin/cashflow-management';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
    period: PeriodType;
    setPeriod: (period: PeriodType) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export function DateRangeFilter({
    period,
    setPeriod,
    selectedDate,
    setSelectedDate,
}: DateRangeFilterProps) {
    const periods: { value: PeriodType; label: string }[] = [
        { value: 'daily', label: 'Harian' },
        { value: 'weekly', label: 'Mingguan' },
        { value: 'monthly', label: 'Bulanan' },
        { value: 'yearly', label: 'Tahunan' },
    ];

    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            {/* Period Selector */}
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
                {periods.map((p) => (
                    <button
                        key={p.value}
                        onClick={() => setPeriod(p.value)}
                        className={`rounded-md px-4 py-2 transition-all ${
                            period === p.value
                                ? 'bg-white text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Date Picker */}
            <div className="relative">
                <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="appearance-none rounded-lg border bg-white py-2 pr-4 pl-9 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
            </div>
        </div>
    );
}
