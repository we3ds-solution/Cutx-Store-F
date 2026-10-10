import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Truck, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { DEMO_FREE_SHIPPING_THRESHOLD, DEMO_SHIPPING_FEE, getProductName, localizeColorName } from "@/lib/data";

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { cart, clearCart } = useCart();
  const { t, lang } = useLang();
  const { toast } = useToast();
  const c = t.checkout;

  useSEO({ title: c.title, description: c.demoTitle });

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Egypt",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFree = subtotal >= DEMO_FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : DEMO_SHIPPING_FEE;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const ref = `CX-${Date.now().toString(36).toUpperCase()}`;
    try {
      sessionStorage.setItem("cutx-demo-order", ref);
    } catch {
      /* ignore */
    }
    clearCart();
    setLoading(false);
    toast({ title: c.proceedPayment, description: `${c.orderSummary} · ${formatPrice(total)}` });
    navigate(`/success?ref=${encodeURIComponent(ref)}`);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-20 w-20 mx-auto rounded-[var(--radius-pill)] bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h1 className="text-xl font-bold">{c.emptyCart}</h1>
            <Button onClick={() => navigate("/shop")}>{t.cart.continueShopping}</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{c.demoTitle}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.demoBody}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8">{c.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">{c.shippingInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">{c.fullName}</Label>
                    <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">{c.email}</Label>
                    <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="h-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{c.phone}</Label>
                  <Input id="phone" name="phone" required value={form.phone} onChange={handleChange} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">{c.address}</Label>
                  <Input id="address" name="address" required value={form.address} onChange={handleChange} className="h-10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">{c.city}</Label>
                    <Input id="city" name="city" required value={form.city} onChange={handleChange} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="postalCode">{c.postalCode}</Label>
                    <Input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">{c.country}</Label>
                    <Input id="country" name="country" required value={form.country} onChange={handleChange} className="h-10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin me-2" />{c.processing}</>
              ) : (
                `${c.proceedPayment} · ${formatPrice(total)}`
              )}
            </Button>
          </form>

          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center justify-between">
                  {c.orderSummary}
                  <Badge variant="secondary">{cart.reduce((s, i) => s + i.quantity, 0)} {t.cart.items}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pe-1">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <div className="relative h-16 w-16 rounded-[var(--radius-lg)] overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={getProductName(item, lang)} className="w-full h-full object-cover" />
                        <Badge className="absolute -top-1 -end-1 h-4 w-4 p-0 flex items-center justify-center text-[9px] rounded-[var(--radius-pill)]">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium line-clamp-1">{getProductName(item, lang)}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.size} {item.selectedSize} · {localizeColorName(item.selectedColor, lang)}
                        </p>
                        <p className="text-sm font-semibold mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/60 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{c.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{c.shipping}</span>
                    <span className={shippingFree ? "text-green-600 font-medium" : ""}>
                      {shippingFree ? c.freeShipping : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>{c.total}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { icon: Package, label: t.cart.shippingNote },
                    { icon: Truck, label: t.cart.shippingNote },
                    { icon: ShieldAlert, label: c.demoTitle },
                  ].map(({ icon: Icon }, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-[var(--radius-lg)] border border-border/60">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
