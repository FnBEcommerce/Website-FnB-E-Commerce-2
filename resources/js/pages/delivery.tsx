import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
    Calendar,
    CheckCircle2,
    Home,
    MapPin,
    Package,
    Phone,
    Truck,
    Store,
    MessageCircle,
    User,
    Bike,
    Clock,
    ShoppingBag,
    Mail
} from 'lucide-react';
import { OrderDetails } from './checkout';

// --- Interfaces ---
interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface OrderItem {
    order_id: number;
    orderdetail_quantity: number;
    orderdetail_subtotal: string;
    product: {
        date_created: string;
        last_updated: string;
        product_category: string;
        product_description: string;
        product_id: number;
        product_name: string;
        product_price: string;
        product_stock: number;
        product_image?: string; // Added optional image field
    };
}

interface DeliveryPageProps {
    orderNumber?: string;
    cartItems?: CartItem[]; // Keep for fallback images if needed
    orderDetails?: OrderDetails;
    onBackToHome?: () => void;
    orderItems?: OrderItem[];
}

export default function Delivery({
    orderNumber = "-",
    cartItems = [],
    orderDetails,
    onBackToHome = () => {},
    orderItems = [],
}: DeliveryPageProps) {
    // --- Safe Data Handling ---
    const safeOrderItems = Array.isArray(orderItems) ? orderItems : [];
    
    // --- Calculations ---
    const subtotal = safeOrderItems.length > 0
        ? safeOrderItems
            .map((item) => {
                const val = parseInt(item.orderdetail_subtotal);
                return isNaN(val) ? 0 : val;
            })
            .reduce((prev, next) => prev + next, 0)
        : 0;

    const shipping = subtotal > 200000 ? 0 : 12000; // Adjusted threshold example
    const tax = Math.ceil(subtotal * 0.11);
    const total = subtotal + shipping + tax;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1); // 1 day delivery assumption

    // --- Mock Data for Features ---
    const nearestBranch = {
        name: "Cabang Jakarta Selatan (Pusat)",
        distance: "2.3 km",
        address: "Jl. Senopati No. 10, Jakarta"
    };

    const courierInfo = {
        name: "Budi Santoso",
        plate: "B 1234 XYZ",
        status: "Menuju lokasi restoran"
    };

    const recommendations = [
        { id: 101, name: "Ice Matcha Latte", discount: "20%", price: "24000" },
        { id: 102, name: "Choco Croissant", discount: "15%", price: "18000" }
    ];

    // --- Tracking Logic ---
    // In a real app, this comes from backend status
    const currentStepIndex = 2; // 0: Confirmed, 1: Processing, 2: Shipped, 3: Delivered
    const trackingSteps = [
        { icon: CheckCircle2, label: 'Dikonfirmasi', date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
        { icon: Store, label: 'Diproses Dapur', date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
        { icon: Bike, label: 'Diantar Kurir', date: 'Sedang berlangsung', completed: true }, // Active
        { icon: Home, label: 'Tiba di Lokasi', date: 'Est. 30 min', completed: false },
    ];

    const progressValue = (currentStepIndex / (trackingSteps.length - 1)) * 100;

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 font-sans">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">

                {/* Header Section with AI Chat Button */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Status Pesanan</h1>
                        <p className="text-muted-foreground">Lacak pengiriman makananmu secara real-time.</p>
                    </div>
                    <Button variant="outline" className="gap-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                        <MessageCircle className="h-4 w-4" />
                        Tanya AI Chatbot (WhatsApp)
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* LEFT COLUMN: Tracking & Details (Span 2) */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Status Card */}
                        <Card className="overflow-hidden border-primary/20 shadow-sm">
                            <div className="bg-primary/5 p-6 text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary animate-pulse">
                                    <Bike className="h-7 w-7" />
                                </div>
                                <h2 className="text-xl font-semibold text-primary">Pesanan Sedang Diantar</h2>
                                <p className="text-sm text-muted-foreground">Order #{orderNumber} • Estimasi tiba 13:45 WIB</p>
                            </div>
                            
                            <div className="p-6">
                                {/* Visual Progress Bar */}
                                <div className="relative mb-8 mt-2">
                                    <Progress value={progressValue} className="h-2 bg-gray-100" />
                                    <div className="absolute top-0 flex w-full -translate-y-1/2 justify-between px-1">
                                        {trackingSteps.map((step, index) => {
                                            const isActive = index <= currentStepIndex;
                                            return (
                                                <div key={index} className={`flex flex-col items-center gap-2 bg-white px-2 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-gray-200 bg-gray-50'}`}>
                                                        <step.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="hidden text-xs font-medium sm:block">{step.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Detailed Activity Log */}
                                <div className="space-y-4 rounded-lg bg-gray-50 p-4 text-sm">
                                    {trackingSteps.map((step, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <step.icon className={`h-4 w-4 ${i <= currentStepIndex ? 'text-primary' : 'text-gray-300'}`} />
                                                <span className={i <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'}>{step.label}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{step.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Delivery Details Grid */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Branch Info (Fitur Cabang Terdekat) */}
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Store className="h-4 w-4" />
                                        Cabang Pemroses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{nearestBranch.name}</p>
                                    <p className="text-sm text-muted-foreground">{nearestBranch.address}</p>
                                    <Badge variant="secondary" className="mt-2 text-xs">Jarak: {nearestBranch.distance}</Badge>
                                </CardContent>
                            </Card>

                            {/* Courier Info (Fitur Delivery) */}
                            <Card className="border-l-4 border-l-orange-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Bike className="h-4 w-4" />
                                        Kurir Pengantar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{courierInfo.name}</p>
                                            <p className="text-xs text-muted-foreground">{courierInfo.plate}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <Button size="sm" variant="outline" className="h-7 w-full text-xs">Chat</Button>
                                        <Button size="sm" variant="outline" className="h-7 w-full text-xs">Telpon</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                         {/* Smart Recommendations (Fitur Rekomendasi Diskon) */}
                         <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-pink-700">
                                    <ShoppingBag className="h-5 w-5" />
                                    Spesial Untukmu (Diskon!)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                {recommendations.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Rp {parseInt(item.price).toLocaleString('id-ID')}</p>
                                        </div>
                                        <Badge className="bg-pink-500 hover:bg-pink-600">-{item.discount}</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: Summary & Address (Span 1) */}
                    <div className="space-y-6">
                        {/* Shipping Address */}
                        <Card>
                            <CardHeader className="bg-gray-50/50 pb-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    Alamat Pengiriman
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 text-sm">
                                <div className="space-y-1">
                                    <p className="font-semibold">{orderDetails?.shipping?.fullName || "Nama Penerima"}</p>
                                    <p className="text-muted-foreground">{orderDetails?.shipping?.address || "Alamat lengkap..."}</p>
                                    <p className="text-muted-foreground">
                                        {orderDetails?.shipping?.city || "Kota"}, {orderDetails?.shipping?.state || "Provinsi"} {orderDetails?.shipping?.zipCode}
                                    </p>
                                    <p className="text-muted-foreground">Indonesia</p>
                                </div>
                                <Separator className="my-3" />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-3.5 w-3.5" />
                                        <span className="truncate">{orderDetails?.shipping?.email || "email@example.com"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>{orderDetails?.shipping?.phone || "08xx-xxxx-xxxx"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Summary */}
                        <Card>
                            <CardHeader className="bg-gray-50/50 pb-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Package className="h-4 w-4 text-primary" />
                                    Rincian Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="mb-4 max-h-[200px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                                    {safeOrderItems.map((item, i) => (
                                        <div key={i} className="flex justify-between gap-3 text-sm">
                                            <div className="flex gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-500">
                                                    {item.orderdetail_quantity}x
                                                </div>
                                                <div>
                                                    <p className="font-medium line-clamp-1">{item.product.product_name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @ Rp {parseInt(item.product.product_price).toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-medium">
                                                Rp {(parseInt(item.product.product_price) * item.orderdetail_quantity).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />
                                
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Ongkir (Jarak &lt; 5km)</span>
                                        <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                                            {shipping === 0 ? "GRATIS" : `Rp ${shipping.toLocaleString('id-ID')}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pajak (11%)</span>
                                        <span>Rp {tax.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                
                                <Separator className="my-4" />
                                
                                <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                                    <span className="font-semibold text-primary">Total Bayar</span>
                                    <span className="text-lg font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Button 
                                        className="w-full bg-primary hover:bg-primary/90" 
                                        size="lg"
                                        onClick={onBackToHome}
                                    >
                                        Belanja Lagi
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Unduh Invoice
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>Butuh bantuan? Hubungi <span className="text-primary hover:underline cursor-pointer">Support</span> atau gunakan Chatbot AI kami.</p>
                </div>
            </div>
        </div>
    );
}