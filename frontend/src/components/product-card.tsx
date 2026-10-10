import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { useToast } from "@/hooks/use-toast";
import { formatPrice, getProductName, getColorName } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: number) => void;
}

export function ProductCard({ product, isWishlisted = false, onToggleWishlist }: ProductCardProps) {
  const [, navigate] = useLocation();
  const { addItem, items } = useCart();
  const { t, lang } = useLang();
  const { toast } = useToast();
  const [imgIdx, setImgIdx] = useState(0);

  const displayName = getProductName(product, lang);
  const unavailable = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unavailable) return;
    const size = product.sizes[0];
    const color = product.colors[0]?.name ?? "";
    const existing = items.find(
      (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
    );
    addItem(product, size, color, 1);
    if (existing) {
      toast({ title: t.qtyUpdated, description: `${displayName} — ${size}, ${getColorName(product.colors[0], lang)}` });
    } else {
      toast({ title: t.addToCart, description: displayName });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist?.(product.id);
    toast({
      title: isWishlisted ? t.removedFromWishlist : t.addedToWishlist,
      description: displayName,
    });
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border/60 hover:shadow-md transition-shadow"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.images[imgIdx] ?? product.images[0]}
          alt={displayName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onMouseEnter={() => product.images[1] && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        />
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {product.isNew && <Badge className="text-[10px]">{t.newArrival}</Badge>}
          {product.isDemo && <Badge variant="secondary" className="text-[10px]">{t.demo}</Badge>}
          {unavailable && <Badge variant="destructive" className="text-[10px]">{t.product.outOfStock}</Badge>}
        </div>
        {onToggleWishlist && (
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute top-2 end-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={t.wishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
          </button>
        )}
        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            className="w-full"
            disabled={unavailable}
            onClick={handleQuickAdd}
          >
            {unavailable ? t.product.outOfStock : t.addToCart}
          </Button>
        </div>
      </div>
      <CardContent className="p-3 space-y-1">
        <p className="text-sm font-medium line-clamp-1">{displayName}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.rating > 0 && (
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
    <Card className="overflow-hidden border-border/60">
      <div className="aspect-[3/4] bg-muted animate-pulse" />
      <CardContent className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
