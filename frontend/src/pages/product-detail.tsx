import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { Heart, ShoppingBag, ChevronRight, Star, Info, Ruler, ChevronLeft, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, getProductName, getProductDescription, getColorName, localizeColorName } from "@/lib/data";
import { getProductReviews, getRatingBreakdown, type Review } from "@/lib/reviews";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

function StarRating({ rating, count }: { rating: number; count: number }) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "fill-[color:var(--color-rating)] text-[color:var(--color-rating)]" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-sm text-muted-foreground">({count} {t.product.reviews})</span>
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }} className="py-5 border-b border-border/50 last:border-0">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-[var(--radius-pill)] bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xs">{review.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="font-semibold text-sm">{review.author}</span>
            {review.verified && (<Badge variant="secondary" className="text-[10px] h-4 px-1.5 font-normal">{t.verified}</Badge>)}
            <span className="text-xs text-muted-foreground ms-auto">{review.date}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-[color:var(--color-rating)] text-[color:var(--color-rating)]" : "text-muted-foreground/20"}`} />
            ))}
          </div>
          <p className="font-semibold text-sm mb-1">{review.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
          <button className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ThumbsUp className="h-3 w-3" />{t.helpful} ({review.helpful})
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type SortMode = "recent" | "highest" | "lowest";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { addToCart, cart } = useCart();
  const { t, lang } = useLang();
  const { toast } = useToast();
  const p = t.product;

  const product = products.find((pr) => pr.slug === slug);
  const displayName = product ? getProductName(product, lang) : "";
  const displayDesc = product ? getProductDescription(product, lang) : "";
  const displayDetails = product ? (lang === "ar" ? product.detailsAr : product.details) : [];

  useSEO({ title: displayName || undefined, description: displayDesc || undefined, image: product?.image });

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleWishlistRelated = (id: number) => setWishlist((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const allReviews = useMemo(() => getProductReviews(slug ?? ""), [slug]);
  const breakdown = useMemo(() => getRatingBreakdown(allReviews), [allReviews]);
  const sortedReviews = useMemo(() => {
    const copy = [...allReviews];
    if (sortMode === "highest") return copy.sort((a, b) => b.rating - a.rating);
    if (sortMode === "lowest") return copy.sort((a, b) => a.rating - b.rating);
    return copy;
  }, [allReviews, sortMode]);
  const visibleReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold">{p.notFound}</h1>
          <p className="text-muted-foreground">{p.notFoundSubtitle}</p>
          <Button onClick={() => navigate("/shop")}>{p.backToShop}</Button>
        </div>
      </Layout>
    );
  }

  const related = [
    ...products.filter((pr) => pr.category === product.category && pr.id !== product.id),
    ...products.filter((pr) => pr.category !== product.category && pr.id !== product.id),
  ].slice(0, 4);

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    const existingItem = cart.find((i) => i.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor);
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    toast({
      title: existingItem ? t.qtyUpdated : p.addedToCart,
      description: `${displayName} — ${selectedSize}, ${localizeColorName(selectedColor, lang)}${existingItem ? ` (×${existingItem.quantity + quantity})` : ""}`,
    });
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    toast({
      title: wishlisted ? t.removedFromWishlist : t.savedToWishlist,
      description: wishlisted ? displayName : `${displayName} — ${t.wishlistNote}`,
    });
  };

  const sizeRows = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) => product.sizes.includes(s));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">{t.nav.home}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button onClick={() => navigate("/shop")} className="hover:text-foreground transition-colors">{t.nav.shop}</button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <button onClick={() => navigate(`/shop?cat=${encodeURIComponent(product.category)}`)} className="hover:text-foreground transition-colors">
            {t.categories[product.category as keyof typeof t.categories] ?? product.category}
          </button>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{displayName}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-muted">
              {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={activeImg} src={product.images[activeImg] ?? product.image} alt={displayName} onLoad={() => setImgLoaded(true)} initial={{ opacity: 0 }} animate={{ opacity: imgLoaded ? 1 : 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="w-full h-full object-cover" />
              </AnimatePresence>
              {product.isNew && <Badge className="absolute top-3 start-3">{t.newArrival}</Badge>}
              {product.isDemo && <Badge variant="outline" className="absolute bottom-3 start-3 bg-background/80 backdrop-blur">{t.demo}</Badge>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => { setImgLoaded(false); setActiveImg(i); }} className={`shrink-0 h-20 w-20 rounded-[var(--radius-md)] overflow-hidden border-2 transition-all ${i === activeImg ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt={`${displayName} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{displayName}</h1>
              {product.reviewCount > 0 && <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} /></div>}
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">{displayDesc}</p>
            {product.isDemo && <p className="text-xs font-medium rounded-[var(--radius-md)] px-3 py-2 demo-strip w-fit">{p.demoNote}</p>}
            {displayDetails.length > 0 && (
              <ul className="text-sm text-muted-foreground space-y-1 list-disc ps-5">
                {displayDetails.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}
            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">{p.selectSize}</Label>
                <button onClick={() => setShowSizeGuide(true)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <Ruler className="h-3.5 w-3.5" /> {p.sizeGuide}
                </button>
              </div>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`sz-${size}`} className="sr-only" />
                    <Label htmlFor={`sz-${size}`} className={`cursor-pointer flex h-10 min-w-[2.5rem] px-3 items-center justify-center rounded-[var(--radius-sm)] border text-sm font-medium transition-all select-none ${selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="font-semibold">{p.selectColor}{selectedColor && <span className="font-normal text-muted-foreground ms-1.5">— {localizeColorName(selectedColor, lang)}</span>}</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.name}>
                    <RadioGroupItem value={color.name} id={`col-${color.name}`} className="sr-only" />
                    <Label htmlFor={`col-${color.name}`} className={`cursor-pointer flex items-center gap-2 h-10 px-3 rounded-[var(--radius-sm)] border text-sm font-medium transition-all select-none ${selectedColor === color.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                      <span className="h-4 w-4 rounded-[var(--radius-pill)] border border-border/60 shrink-0" style={{ backgroundColor: color.hex }} />
                      {getColorName(color, lang)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center gap-3">
              <Label className="font-semibold">{p.quantity}</Label>
              <div className="flex items-center gap-0 border border-border rounded-[var(--radius-sm)] overflow-hidden">
                <button className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1 || product.stock === 0}>−</button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40" onClick={() => setQuantity((q) => Math.min(product.stock > 0 ? product.stock : 1, q + 1))} disabled={product.stock === 0 || quantity >= product.stock}>+</button>
              </div>
              {product.stock === 0 ? (
                <span className="text-xs font-medium text-destructive">{p.outOfStock}{product.isDemo ? ` · ${t.demo}` : ""}</span>
              ) : (
                <span className="text-xs text-muted-foreground">{product.stock} {p.inStock}</span>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <Button className="flex-1 h-12 text-base font-semibold gap-2" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingBag className="h-5 w-5" />
                {product.stock === 0 ? p.outOfStock : t.addToCart}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-[var(--radius-sm)]" onClick={handleWishlist} aria-label={t.wishlist}>
                <Heart className={`h-5 w-5 transition-colors ${wishlisted ? "fill-[color:var(--color-wishlist)] text-[color:var(--color-wishlist)]" : ""}`} />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1.5 pt-2 border-t border-border">
              <p className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 shrink-0" /> {t.cart.shippingNote}</p>
            </div>
          </div>
        </div>

        {allReviews.length > 0 && (
          <div className="mt-14 space-y-4">
            <h2 className="text-xl font-bold">{p.reviews}</h2>
            {visibleReviews.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)}
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold mb-6">{p.relatedProducts}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((pr) => (
                <ProductCard key={pr.id} product={pr} isWishlisted={wishlist.includes(pr.id)} onToggleWishlist={toggleWishlistRelated} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
        <DialogContent>
          <DialogHeader><DialogTitle>{p.sizeGuideTitle}</DialogTitle></DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-start py-2">{p.sizeTable.size}</th>
                  <th className="text-start py-2">{p.sizeTable.chest}</th>
                  <th className="text-start py-2">{p.sizeTable.waist}</th>
                  <th className="text-start py-2">{p.sizeTable.hips}</th>
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((s) => {
                  const row = p.sizeTable[s as keyof typeof p.sizeTable];
                  if (!Array.isArray(row)) return null;
                  return (
                    <tr key={s} className="border-b border-border/50">
                      {row.map((cell, i) => <td key={i} className="py-2">{cell}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
