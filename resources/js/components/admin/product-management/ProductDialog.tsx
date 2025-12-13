import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from './ProductManagement';

type ProductDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
    product: Product | null;
};

export function ProductDialog({
    isOpen,
    onClose,
    onSave,
    product,
}: ProductDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Makanan' as 'Makanan' | 'Minuman',
        price: '',
        stock: '',
        branch: '',
        image: '',
        description: '',
        discount: '',
        status: 'Aktif' as 'Aktif' | 'Tidak Aktif',
    });

    useEffect(() => {
    if (product) {
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            branch: product.branch,
            image: product.image,
            description: product.description,
            discount: product.discount?.toString() || '',
            status: product.status,
        });

        // 👇 tampilkan gambar lama
        setImagePreview(product.image);
        setImageFile(null);
    } else {
        setFormData({
            name: '',
            category: 'Makanan',
            price: '',
            stock: '',
            branch: '',
            image: '',
            description: '',
            discount: '',
            status: 'Aktif',
        });

        setImagePreview('');
        setImageFile(null);
    }
}, [product, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = formData.image;

        if (imageFile) {
            imageUrl = URL.createObjectURL(imageFile);
        }

        const productData = {
            ...(product ? { id: product.id } : {}),
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            branch: formData.branch,
            image:
                imageUrl ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
            description: formData.description,
            discount: formData.discount
                ? parseFloat(formData.discount)
                : undefined,
            status: formData.status,
            rating: product?.rating,
        };

        onSave(productData);
        onClose();
    };

    const baseFieldClass =
    "mt-1 w-full rounded-md border border-slate-300 bg-gray-100 px-3 py-2 text-sm text-slate-900 \
    focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200";

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
        {/* HEADER */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <h2 className="text-slate-900">
                {product ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <button
                onClick={onClose}
                className="text-slate-400 transition-colors hover:text-slate-600"
            >
                <X className="h-5 w-5" />
            </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nama Produk */}
                <div className="md:col-span-2">
                    <Label htmlFor="name">Nama Produk *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Masukkan nama produk"
                        required
                        className={baseFieldClass}
                    />
                </div>

                {/* Kategori */}
                <div>
                    <Label htmlFor="category">Kategori *</Label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value as any,
                            })
                        }
                        required
                        className={baseFieldClass}
                    >
                        <option value="">Pilih kategori</option>
                        <option value="Makanan">Makanan</option>
                        <option value="Minuman">Minuman</option>
                    </select>
                </div>

                {/* Cabang */}
                <div>
                    <Label htmlFor="branch">Cabang *</Label>
                    <select
                        id="branch"
                        value={formData.branch}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                branch: e.target.value,
                            })
                        }
                        required
                        className={baseFieldClass}
                    >
                        <option value="">Pilih cabang</option>
                        <option value="Jakarta Pusat">Jakarta Pusat</option>
                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                        <option value="Jakarta Barat">Jakarta Barat</option>
                        <option value="Jakarta Timur">Jakarta Timur</option>
                        <option value="Jakarta Utara">Jakarta Utara</option>
                    </select>
                </div>

                {/* Harga */}
                <div>
                    <Label htmlFor="price">Harga (Rp) *</Label>
                    <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="35000"
                        min="0"
                        required
                        className={baseFieldClass}
                    />
                </div>

                {/* Stok */}
                <div>
                    <Label htmlFor="stock">Stok *</Label>
                    <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                        }
                        placeholder="50"
                        min="0"
                        required
                        className={baseFieldClass}
                    />
                </div>

                {/* Diskon */}
                <div>
                    <Label htmlFor="discount">Diskon (%)</Label>
                    <Input
                        id="discount"
                        type="number"
                        value={formData.discount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                discount: e.target.value,
                            })
                        }
                        min="0"
                        max="100"
                        placeholder="10"
                        className={baseFieldClass}
                    />
                </div>

                {/* Status */}
                <div>
                    <Label htmlFor="status">Status *</Label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: e.target.value as any,
                            })
                        }
                        required
                        className={baseFieldClass}
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                    <Label htmlFor="image">Gambar Produk</Label>

                    <div className="mt-1 flex items-center gap-4">
                        {/* Preview */}
                        <div className="h-24 w-24 overflow-hidden rounded-md border bg-slate-100">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Upload */}
                        <label
                            htmlFor="image"
                            className="cursor-pointer rounded-md border bg-white px-4 py-2 text-sm
                                    transition hover:bg-slate-50
                                    focus-within:border-orange-500
                                    focus-within:ring-2 focus-within:ring-orange-500"
                        >
                            Pilih Gambar
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setImageFile(file);
                                    setImagePreview(URL.createObjectURL(file));
                                }}
                            />
                        </label>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        JPG / PNG • Maksimal 2MB
                    </p>
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2">
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Masukkan deskripsi produk"
                        required
                        className={baseFieldClass}
                    />
                </div>
            </div>

            {/* FOOTER BUTTON */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Batal
                </Button>
                <Button type="submit">
                    {product ? 'Simpan Perubahan' : 'Tambah Produk'}
                </Button>
            </div>
        </form>
    </div>
</div>

    );
}
