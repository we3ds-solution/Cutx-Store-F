export interface Product {
  id: number;
  slug: string;
  name: string;
  /** Arabic product name (natural copy, not a literal translation). */
  nameAr: string;
  /** Draft/demo price in Egyptian Pounds. See docs/CUTX-CATALOG.md. */
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  isNew: boolean;
  isFeatured?: boolean;
  description: string;
  /** Arabic product description. */
  descriptionAr: string;
  sizes: string[];
  colors: { name: string; nameAr: string; hex: string }[];
  stock: number;
  /** Demo rating placeholder. 0 + reviewCount 0 hides ratings in the UI. */
  rating: number;
  reviewCount: number;
  /**
   * True while the listing is a clearly-identified draft/demo record.
   * All catalog entries are drafts until official Cut X product details
   * (price, sizes, availability) are published. See docs/CUTX-CATALOG.md.
   */
  isDemo: boolean;
  /** Honest, non-certified product notes (fit, use, care). No lab claims. */
  details: string[];
  detailsAr: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
