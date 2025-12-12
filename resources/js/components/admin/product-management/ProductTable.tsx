import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Edit2, Star, Trash2 } from 'lucide-react';

type ProductTableProps = {
    products: any; //FIXME: Ganti any
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export function ProductTable({
    products,
    onEdit,
    onDelete,
}: ProductTableProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    console.log('products[0]', products[0]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-slate-700">
                            Produk
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Kategori
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Harga
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Stok
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Cabang
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Rating
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left text-slate-700">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td
                                colSpan={8}
                                className="py-8 text-center text-slate-500"
                            >
                                Tidak ada produk ditemukan
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image || undefined}
                                            alt={product.name}
                                            className="h-12 w-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <div className="text-slate-900">
                                                {product.name}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {product.description}
                                            </div>
                                            {product.badge && (
                                                <Badge
                                                    variant="default"
                                                    className="mt-1 bg-green-100 text-green-800"
                                                >
                                                    Diskon {product.badge}%
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <Badge
                                        variant={
                                            product.category === 'Makanan'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {product.category}
                                    </Badge>
                                </td>
                                <td className="px-4 py-4 text-slate-900">
                                    {formatCurrency(product.price_discount)}
                                </td>
                                <td className="px-4 py-4">
                                    <span
                                        className={
                                            product.quantity < 30
                                                ? 'text-red-600'
                                                : 'text-slate-900'
                                        }
                                    >
                                        {product.quantity} unit
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-slate-600">
                                    {/* {product.branch} */}
                                </td>
                                <td className="px-4 py-4">
                                    {product.rating ? (
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-slate-900">
                                                {product.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <Badge
                                        className={
                                            product.popular
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }
                                    >
                                        {product.popular
                                            ? 'Aktif'
                                            : 'Tidak Aktif'}
                                    </Badge>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(product)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        `Yakin ingin menghapus ${product.name}?`,
                                                    )
                                                ) {
                                                    onDelete(product.id);
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
