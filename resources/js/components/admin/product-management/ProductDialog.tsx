import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductRow } from '@/pages/admin/product-management';
import { X } from 'lucide-react';
import { useState } from 'react';

type ProductDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: ProductRow) => void;
    product: ProductRow | null;
};

export function ProductDialog({
    isOpen,
    onClose,
    onSave,
    product,
}: ProductDialogProps) {
    const initialFormData: ProductRow = product ?? {
        id: 0,
        name: '',
        category: 'Makanan',
        price_origin: 0,
        price_discount: null,
        stock: 0,
        branch: '',
        image: '',
        description: '',
        rating: 0,
        status: 'Aktif',
    };

    const [formData, setFormData] = useState<ProductRow>(initialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ProductRow = {
            ...(product ? { id: product.id } : {}),
            ...formData,
            image:
                formData.image ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
            rating: product?.rating ?? 0,
        };

        onSave(payload);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">

                {/* ================= HEADER ================= */}
                <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-4">
                    <h2 className="text-lg font-semibold">
                        {product ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1 hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* ================= BODY (SCROLL AREA) ================= */}
                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Nama Produk */}
                            <div className="md:col-span-2">
                                <Label>Nama Produk *</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            {/* Kategori */}
                            <div>
                                <Label>Kategori *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            category: value as any,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Makanan">Makanan</SelectItem>
                                        <SelectItem value="Minuman">Minuman</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cabang */}
                            <div>
                                <Label>Cabang *</Label>
                                <Select
                                    value={formData.branch}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            branch: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Cabang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Jakarta Pusat">
                                            Jakarta Pusat
                                        </SelectItem>
                                        <SelectItem value="Jakarta Selatan">
                                            Jakarta Selatan
                                        </SelectItem>
                                        <SelectItem value="Jakarta Barat">
                                            Jakarta Barat
                                        </SelectItem>
                                        <SelectItem value="Jakarta Timur">
                                            Jakarta Timur
                                        </SelectItem>
                                        <SelectItem value="Jakarta Utara">
                                            Jakarta Utara
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Harga */}
                            <div>
                                <Label>Harga *</Label>
                                <Input
                                    type="number"
                                    value={formData.price_origin}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price_origin: Number(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>

                            {/* Stok */}
                            <div>
                                <Label>Stok *</Label>
                                <Input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            stock: Number(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>

                            {/* Harga Diskon */}
                            <div>
                                <Label>Harga Diskon</Label>
                                <Input
                                    type="number"
                                    value={formData.price_discount ?? ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price_discount: e.target.value
                                                ? Number(e.target.value)
                                                : null,
                                        })
                                    }
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <Label>Status *</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            status: value as any,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Aktif">Aktif</SelectItem>
                                        <SelectItem value="Tidak Aktif">
                                            Tidak Aktif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* URL Gambar */}
                            <div className="md:col-span-2">
                                <Label>URL Gambar</Label>
                                <Input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image: e.target.value,
                                        })
                                    }
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="mt-1 text-sm text-slate-500">
                                    Kosongkan untuk menggunakan gambar default
                                </p>
                            </div>

                            {/* Deskripsi */}
                            <div className="md:col-span-2">
                                <Label>Deskripsi *</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* ================= FOOTER ================= */}
                        <div className="sticky bottom-0 z-20 flex justify-end gap-3 border-t bg-white pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Batal
                            </Button>
                            <Button type="submit">
                                {product ? 'Simpan Perubahan' : 'Tambah Produk'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
