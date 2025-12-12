import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Star, Trash2 } from 'lucide-react';
import { Product } from './ProductManagement';

type ProductTableProps = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
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

    return (
        // <div className="overflow-x-auto">
        //     <table className="w-full">
        //         <thead>
        //             <tr className="border-b border-slate-200">
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Produk
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Kategori
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Harga
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Stok
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Cabang
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Rating
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Status
        //                 </th>
        //                 <th className="px-4 py-3 text-left text-slate-700">
        //                     Aksi
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {products.length === 0 ? (
        //                 <tr>
        //                     <td
        //                         colSpan={8}
        //                         className="py-8 text-center text-slate-500"
        //                     >
        //                         Tidak ada produk ditemukan
        //                     </td>
        //                 </tr>
        //             ) : (
        //                 products.map((product) => (
        //                     <tr
        //                         key={product.id}
        //                         className="border-b border-slate-100 hover:bg-slate-50"
        //                     >
        //                         <td className="px-4 py-4">
        //                             <div className="flex items-center gap-3">
        //                                 <img
        //                                     src={product.image}
        //                                     alt={product.name}
        //                                     className="h-12 w-12 rounded-lg object-cover"
        //                                 />
        //                                 <div>
        //                                     <div className="text-slate-900">
        //                                         {product.name}
        //                                     </div>
        //                                     <div className="text-sm text-slate-500">
        //                                         {product.description}
        //                                     </div>
        //                                     {product.discount && (
        //                                         <Badge
        //                                             variant="success"
        //                                             className="mt-1"
        //                                         >
        //                                             Diskon {product.discount}%
        //                                         </Badge>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         </td>
        //                         <td className="px-4 py-4">
        //                             <Badge
        //                                 variant={
        //                                     product.category === 'Makanan'
        //                                         ? 'default'
        //                                         : 'secondary'
        //                                 }
        //                             >
        //                                 {product.category}
        //                             </Badge>
        //                         </td>
        //                         <td className="px-4 py-4 text-slate-900">
        //                             {formatCurrency(product.price)}
        //                         </td>
        //                         <td className="px-4 py-4">
        //                             <span
        //                                 className={
        //                                     product.stock < 30
        //                                         ? 'text-red-600'
        //                                         : 'text-slate-900'
        //                                 }
        //                             >
        //                                 {product.stock} unit
        //                             </span>
        //                         </td>
        //                         <td className="px-4 py-4 text-slate-600">
        //                             {product.branch}
        //                         </td>
        //                         <td className="px-4 py-4">
        //                             {product.rating ? (
        //                                 <div className="flex items-center gap-1">
        //                                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        //                                     <span className="text-slate-900">
        //                                         {product.rating.toFixed(1)}
        //                                     </span>
        //                                 </div>
        //                             ) : (
        //                                 <span className="text-slate-400">
        //                                     -
        //                                 </span>
        //                             )}
        //                         </td>
        //                         <td className="px-4 py-4">
        //                             <Badge
        //                                 variant={
        //                                     product.status === 'Aktif'
        //                                         ? 'success'
        //                                         : 'secondary'
        //                                 }
        //                             >
        //                                 {product.status}
        //                             </Badge>
        //                         </td>
        //                         <td className="px-4 py-4">
        //                             <div className="flex items-center gap-2">
        //                                 <Button
        //                                     variant="ghost"
        //                                     size="sm"
        //                                     onClick={() => onEdit(product)}
        //                                 >
        //                                     <Edit2 className="h-4 w-4" />
        //                                 </Button>
        //                                 <Button
        //                                     variant="ghost"
        //                                     size="sm"
        //                                     onClick={() => {
        //                                         if (
        //                                             confirm(
        //                                                 `Yakin ingin menghapus ${product.name}?`,
        //                                             )
        //                                         ) {
        //                                             onDelete(product.id);
        //                                         }
        //                                     }}
        //                                 >
        //                                     <Trash2 className="h-4 w-4 text-red-600" />
        //                                 </Button>
        //                             </div>
        //                         </td>
        //                     </tr>
        //                 ))
        //             )}
        //         </tbody>
        //     </table>
        // </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
    {/* Header */}
    <div className="border-b p-6">
        <h3 className="text-gray-900 font-bold">Daftar Produk</h3>
        <p className="mt-1 text-gray-500">
            Total {products.length} produk terdaftar
        </p>
    </div>

    {/* Table */}
    <div className="px-6 overflow-x-auto rounded-md">
        <table className="w-full border-separate border-spacing-0">
            <thead>
                <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-slate-700">Produk</th>
                    <th className="px-4 py-3 text-left text-slate-700">Kategori</th>
                    <th className="px-4 py-3 text-left text-slate-700">Harga</th>
                    <th className="px-4 py-3 text-left text-slate-700">Stok</th>
                    <th className="px-4 py-3 text-left text-slate-700">Cabang</th>
                    <th className="px-4 py-3 text-left text-slate-700">Rating</th>
                    <th className="px-4 py-3 text-left text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left text-slate-700">Aksi</th>
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
                            {/* Produk + Gambar */}
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <div className="text-slate-900 font-medium">
                                            {product.name}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {product.description}
                                        </div>

                                        {product.discount && (
                                            <Badge
                                                variant="success"
                                                className="mt-1"
                                            >
                                                Diskon {product.discount}%
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </td>

                            {/* Kategori */}
                            <td className="px-4 py-4">
                                <Badge
                                    variant={
                                        product.category === "Makanan"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {product.category}
                                </Badge>
                            </td>

                            {/* Harga */}
                            <td className="px-4 py-4 text-slate-900">
                                {formatCurrency(product.price)}
                            </td>

                            {/* Stok */}
                            <td className="px-4 py-4">
                                <span
                                    className={
                                        product.stock < 30
                                            ? "text-red-600 font-medium"
                                            : "text-slate-900"
                                    }
                                >
                                    {product.stock} unit
                                </span>
                            </td>

                            {/* Cabang */}
                            <td className="px-4 py-4 text-slate-600">
                                {product.branch}
                            </td>

                            {/* Rating */}
                            <td className="px-4 py-4">
                                {product.rating ? (
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-slate-900">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                                <Badge
                                    variant={
                                        product.status === "Aktif"
                                            ? "destructive"
                                            : "default"
                                    }
                                >
                                    {product.status}
                                </Badge>
                            </td>

                            {/* Aksi */}
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
</div>

    );
}
