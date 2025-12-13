import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< Updated upstream
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/pages/admin/product-management';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
=======
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductRow } from '@/pages/admin/product-management';
// import type { Product } from '@/types';
import { X } from 'lucide-react';
import { useState } from 'react';
>>>>>>> Stashed changes

type ProductDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
<<<<<<< Updated upstream
    product: Product | null;
=======
    product: ProductRow | null;
>>>>>>> Stashed changes
};

export function ProductDialog({
    isOpen,
    onClose,
    onSave,
    product,
}: ProductDialogProps) {
<<<<<<< Updated upstream
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
        }
    }, [product, isOpen]);
=======
    const initialFormData = product
        ? product
        : {
              id: 0,
              name: '',
              category: 'Makanan',
              price_origin: 0,
              price_discount: 0,
              stock: 0,
              branch: '',
              image: '',
              description: '',
              rating: 0,
              status: 'Aktif',
          };

    console.log('initialFormData', initialFormData);

    const [formData, setFormData] = useState<ProductRow>(initialFormData);

    // useEffect(() => {
    //     if (product) {
    //         setFormData({
    //             name: product.name,
    //             category: product.category,
    //             price: product?.price_origin?.toString(),
    //             stock: product.stock.toString(),
    //             branch: product.branch,
    //             image: product.image,
    //             description: product.description,
    //             discount: product.discount?.toString() || '',
    //             status: product.status,
    //         });
    //     } else {
    //         setFormData({
    //             name: '',
    //             category: 'Makanan',
    //             price: '',
    //             stock: '',
    //             branch: '',
    //             image: '',
    //             description: '',
    //             discount: '',
    //             status: 'Aktif',
    //         });
    //     }
    // }, [product, isOpen]);
>>>>>>> Stashed changes

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

<<<<<<< Updated upstream
        const productData = {
            ...(product ? { id: product.id } : {}),
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
=======
        const productData /* : ProductRow */ = {
            ...(product ? { id: product.id } : {}),
            name: formData.name,
            category: formData.category,
            price_origin: formData.price_origin,
            stock: formData.stock,
>>>>>>> Stashed changes
            branch: formData.branch,
            image:
                formData.image ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
            description: formData.description,
<<<<<<< Updated upstream
            discount: formData.discount
                ? parseFloat(formData.discount)
                : undefined,
            status: formData.status,
            rating: product?.rating,
=======
            price_discount: formData.price_discount
                ? formData.price_discount
                : null,
            status: formData.status,
            rating: product?.rating ?? 0,
>>>>>>> Stashed changes
        };

        onSave(productData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
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

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <Label htmlFor="name">Nama Produk *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Masukkan nama produk"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Kategori *</Label>
                            <Select
<<<<<<< Updated upstream
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value as any,
                                    })
                                }
                                required
                            >
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
=======
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        category: value as any,
                                    })
                                }
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Makanan">
                                        Makanan
                                    </SelectItem>
                                    <SelectItem value="Minuman">
                                        Minuman
                                    </SelectItem>
                                </SelectContent>
>>>>>>> Stashed changes
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="branch">Cabang *</Label>
                            <Select
<<<<<<< Updated upstream
                                id="branch"
                                value={formData.branch}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        branch: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Pilih Cabang</option>
                                <option value="Jakarta Pusat">
                                    Jakarta Pusat
                                </option>
                                <option value="Jakarta Selatan">
                                    Jakarta Selatan
                                </option>
                                <option value="Jakarta Barat">
                                    Jakarta Barat
                                </option>
                                <option value="Jakarta Timur">
                                    Jakarta Timur
                                </option>
                                <option value="Jakarta Utara">
                                    Jakarta Utara
                                </option>
=======
                                value={formData.branch}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        branch: value,
                                    })
                                }
                            >
                                <SelectTrigger id="branch">
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
>>>>>>> Stashed changes
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="price">Harga (Rp) *</Label>
                            <Input
                                id="price"
                                type="number"
<<<<<<< Updated upstream
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value,
=======
                                value={formData.price_origin}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price_origin: parseFloat(
                                            e.target.value,
                                        ),
>>>>>>> Stashed changes
                                    })
                                }
                                placeholder="35000"
                                required
                                min="0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="stock">Stok *</Label>
                            <Input
                                id="stock"
                                type="number"
                                value={formData.stock}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
<<<<<<< Updated upstream
                                        stock: e.target.value,
=======
                                        stock: parseFloat(e.target.value),
>>>>>>> Stashed changes
                                    })
                                }
                                placeholder="50"
                                required
                                min="0"
                            />
                        </div>

                        <div>
<<<<<<< Updated upstream
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
                                placeholder="10"
                                min="0"
                                max="100"
=======
                            <Label htmlFor="discount">Harga Diskon (Rp)</Label>
                            <Input
                                id="discount"
                                type="number"
                                value={formData.price_discount ?? ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price_discount: parseFloat(
                                            e.target.value,
                                        ),
                                    })
                                }
                                placeholder="5000"
                                min="0"
>>>>>>> Stashed changes
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select
<<<<<<< Updated upstream
                                id="status"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value as any,
                                    })
                                }
                                required
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
=======
                                value={formData.status}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        status: value as any,
                                    })
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="Tidak Aktif">
                                        Tidak Aktif
                                    </SelectItem>
                                </SelectContent>
>>>>>>> Stashed changes
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <Label htmlFor="image">URL Gambar</Label>
                            <Input
                                id="image"
                                type="url"
<<<<<<< Updated upstream
                                value={formData.image}
=======
                                value={formData.image || ''}
>>>>>>> Stashed changes
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

                        <div className="md:col-span-2">
                            <Label htmlFor="description">Deskripsi *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Masukkan deskripsi produk"
                                rows={4}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
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
    );
}
