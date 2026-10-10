import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types";
import { getColorName, getProductName } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const [, navigate] = useLocation();
  const { addToCart, cart } = useCart();
  const { t, lang } = useLang();
  const { toast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);
  const displayName = getProductName(product, lang);
  const hasRatings = product.reviewCount > 0;
  const unavailable = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unavailable) return;
    const size = product.sizes[0];
    const color = product.colors[0].name;
    const existingItem = cart.find(
      (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
    );
    addToCart({ ...product, quantity: 1, selectedSize: size, selectedColor: color });
    if (existingItem) {
      toast({ title: t.qtyUpdated, description: `${displayName} — ${size}, ${getColorName(product.colors[0], lang)}` });
    } else {
      toast({ title: t.product.addedToCart, description: `${displayName} — ${size}, ${getColorName(product.colors[0], lang)}` });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
    toast({
      title: isWishlisted ? t.removedFromWishlist : t.addedToWishlist,
      description: isWishlisted ? displayName : `${displayName} — ${t.wishlistNote}`,
    });
  };

  const goToProduct = () => navigate(`/product/${product.slug}`);

  return (
    <Card className="rounded-[var(--radius-md)] overflow-hidden group border-card shadow-lift-sm hover:shadow-lift-md hover:-translate-y-[2px] transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)] cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-t-[var(--radius-md)]" onClick={goToProduct}>
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-t-[var(--radius-md)] rounded-b-none" />
        )}
        <img
          src={product.image}
          alt={displayName}
          onLoad={() => setImgLoaded(true)}
          className={`object-cover w-full h-full group-hover:scale-[1.06] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="text-[10px] py-0 px-2 h-5">{t.newArrival}</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="text-[10px] py-0 px-2 h-5">{t.sale}</Badge>
          )}
          {product.isDemo && (
            <Badge variant="outline" className="text-[10px] py-0 px-2 h-5 bg-background/80 backdrop-blur">{t.demo}</Badge>
          )}
          {unavailable && (
            <Badge variant="destructive" className="text-[10px] py-0 px-2 h-5">{t.product.outOfStock}</Badge>
          )}
        </div>
        <button
          className="absolute top-2 end-2 h-8 w-8 rounded-[var(--radius-pill)] bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
          onClick={handleWishlist}
          aria-label={t.wishlist}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-[color:var(--color-wishlist)] text-[color:var(--color-wishlist)]" : "text-muted-foreground"}`}
          />
        </button>
        {!unavailable && (
          <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-[var(--duration-base)]">
            <Button size="sm" className="w-full" onClick={handleQuickAdd}>
              {t.addToCart}
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-3 space-y-1" onClick={goToProduct}>
        <p className="text-sm font-medium line-clamp-1">{displayName}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {hasRatings && (
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="rounded-[var(--radius-md)] overflow-hidden border-card">
      <div className="aspect-[3/4] bg-muted animate-pulse" />
      <CardContent className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
