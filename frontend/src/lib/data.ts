import { Product } from "./types";

/**
 * Cut X Egypt — draft/demo catalog. See docs/CUTX-CATALOG.md.
 * Sample stock 25 enables cart/checkout walkthroughs; still isDemo.
 */

const BLACK = { name: "Black", nameAr: "أسود", hex: "#111111" };
const CHARCOAL = { name: "Charcoal", nameAr: "فحمي", hex: "#36454F" };
const NAVY = { name: "Navy", nameAr: "كحلي", hex: "#1B2A4A" };
const OLIVE = { name: "Olive", nameAr: "زيتي", hex: "#556B2F" };
const RED = { name: "Safety Red", nameAr: "أحمر سلامة", hex: "#E10600" };

export const products: Product[] = [
  {
    id: 1,
    slug: "everyday-protective-tee",
    name: "Cut X Everyday Protective Tee",
    nameAr: "تيشيرت كت إكس للحماية اليومية",
    price: 1450,
    image: "/images/products/everyday-protective-tee.jpg",
    images: ["/images/products/everyday-protective-tee.jpg", "/images/products/everyday-protective-tee.svg"],
    category: "Daily Essentials",
    tags: ["daily", "tee", "everyday", "cut-resistant"],
    isNew: true,
    isFeatured: true,
    description: "The everyday Cut X tee: a clean, regular-fit T-shirt built around the brand's protective concept for daily wear. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr: "التيشيرت اليومي من كت إكس: تصميم عملي بقصّة مريحة للاستخدام اليومي ضمن فكرة الملابس المقاومة للقطع. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BLACK, CHARCOAL, RED],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Regular fit", "Crew neckline", "Machine washable"],
    detailsAr: ["قصّة عادية", "ياقة دائرية", "قابل للغسل في الغسالة"],
  },
  {
    id: 2,
    slug: "urban-protective-hoodie",
    name: "Cut X Urban Protective Hoodie",
    nameAr: "هودي كت إكس العملي",
    price: 2400,
    image: "/images/products/urban-protective-hoodie.jpg",
    images: ["/images/products/urban-protective-hoodie.jpg", "/images/products/urban-protective-hoodie.svg"],
    category: "Daily Essentials",
    tags: ["daily", "hoodie", "layering", "cut-resistant"],
    isNew: false,
    isFeatured: true,
    description: "An urban hoodie layer for cooler evenings and outdoor routines, built in the Cut X protective direction. Demo listing — final specs to be confirmed.",
    descriptionAr: "هودي حضري للأجواء الأبرد والمشاوير الخارجية في اتجاه الحماية من كت إكس. إدراج تجريبي — المواصفات النهائية تُؤكَّد لاحقاً.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [CHARCOAL, BLACK],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Relaxed fit", "Kangaroo pocket", "Machine washable"],
    detailsAr: ["قصّة واسعة", "جيب كنغر", "قابل للغسل في الغسالة"],
  },
  {
    id: 3,
    slug: "training-long-sleeve",
    name: "Cut X Training Long-Sleeve",
    nameAr: "كم طويل كت إكس للتدريب",
    price: 1650,
    image: "/images/products/training-long-sleeve.jpg",
    images: ["/images/products/training-long-sleeve.jpg", "/images/products/training-long-sleeve.svg"],
    category: "Athletic Protection",
    tags: ["athletic", "training", "long-sleeve"],
    isNew: true,
    description: "Long-sleeve training top for athletes who want coverage without giving up movement. Demo listing.",
    descriptionAr: "كم طويل للتدريب مع تغطية وحرية حركة. إدراج تجريبي.",
    sizes: ["S", "M", "L", "XL"],
    colors: [NAVY, BLACK],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Athletic fit", "Breathable", "Machine washable"],
    detailsAr: ["قصّة رياضية", "يسمح بالتهوية", "قابل للغسل في الغسالة"],
  },
  {
    id: 4,
    slug: "compression-training-pants",
    name: "Cut X Compression Training Pants",
    nameAr: "بنطلون ضغط كت إكس للتدريب",
    price: 1750,
    image: "/images/products/compression-training-pants.jpg",
    images: ["/images/products/compression-training-pants.jpg", "/images/products/compression-training-pants.svg"],
    category: "Athletic Protection",
    tags: ["athletic", "pants", "compression"],
    isNew: false,
    description: "Compression-style training pants for focused sessions and warm-ups. Demo listing.",
    descriptionAr: "بنطلون تدريب بنمط الضغط. إدراج تجريبي.",
    sizes: ["S", "M", "L", "XL"],
    colors: [BLACK, CHARCOAL],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Compression fit", "Stretch fabric", "Machine washable"],
    detailsAr: ["قصّة ضغط", "قماش مطاط", "قابل للغسل في الغسالة"],
  },
  {
    id: 5,
    slug: "track-protective-jacket",
    name: "Cut X Track Protective Jacket",
    nameAr: "جاكيت رياضي كت إكس",
    price: 2600,
    image: "/images/products/track-protective-jacket.jpg",
    images: ["/images/products/track-protective-jacket.jpg", "/images/products/track-protective-jacket.svg"],
    category: "Athletic Protection",
    tags: ["athletic", "jacket", "track"],
    isNew: true,
    isFeatured: true,
    description: "Track jacket layer for athletes between sessions and outdoor runs. Demo listing.",
    descriptionAr: "جاكيت رياضي بين الحصص والجري. إدراج تجريبي.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [NAVY, BLACK],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Athletic fit", "Full zip", "Machine washable"],
    detailsAr: ["قصّة رياضية", "سحاب كامل", "قابل للغسل في الغسالة"],
  },
  {
    id: 6,
    slug: "duty-protective-jacket",
    name: "Cut X Duty Protective Jacket",
    nameAr: "جاكيت مهام كت إكس",
    price: 3200,
    image: "/images/products/duty-protective-jacket.jpg",
    images: ["/images/products/duty-protective-jacket.jpg", "/images/products/duty-protective-jacket.svg"],
    category: "Security & Workwear",
    tags: ["security", "jacket", "duty"],
    isNew: true,
    isFeatured: true,
    description: "Duty-oriented jacket for security and industrial shift wear. Demo listing.",
    descriptionAr: "جاكيت للمهام الأمنية والورديات الصناعية. إدراج تجريبي.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [OLIVE, BLACK],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Work fit", "Multiple pockets", "Machine washable"],
    detailsAr: ["قصّة عمل", "جيوب متعددة", "قابل للغسل في الغسالة"],
  },
  {
    id: 7,
    slug: "tactical-overshirt",
    name: "Cut X Tactical Overshirt",
    nameAr: "قميص تكتيكي كت إكس",
    price: 2100,
    image: "/images/products/tactical-overshirt.jpg",
    images: ["/images/products/tactical-overshirt.jpg", "/images/products/tactical-overshirt.svg"],
    category: "Security & Workwear",
    tags: ["security", "overshirt", "tactical"],
    isNew: false,
    description: "Overshirt layer for duty and utility looks. Demo listing.",
    descriptionAr: "قميص فوقي للمهام والمظهر العملي. إدراج تجريبي.",
    sizes: ["S", "M", "L", "XL"],
    colors: [CHARCOAL, OLIVE],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Regular fit", "Button front", "Machine washable"],
    detailsAr: ["قصّة عادية", "أزرار أمامية", "قابل للغسل في الغسالة"],
  },
  {
    id: 8,
    slug: "protective-gloves",
    name: "Cut X Protective Gloves",
    nameAr: "قفازات كت إكس",
    price: 650,
    image: "/images/products/protective-gloves.jpg",
    images: ["/images/products/protective-gloves.jpg", "/images/products/protective-gloves.svg"],
    category: "Accessories",
    tags: ["accessories", "gloves"],
    isNew: false,
    description: "Protective gloves accessory for training and duty support. Demo listing.",
    descriptionAr: "قفازات حماية للتدريب ودعم المهام. إدراج تجريبي.",
    sizes: ["S", "M", "L"],
    colors: [BLACK],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Snug fit", "Grip palm", "Hand wash"],
    detailsAr: ["مقاس محكم", "راحة بقبضة", "غسيل يدوي"],
  },
  {
    id: 9,
    slug: "protective-arm-sleeves",
    name: "Cut X Protective Arm Sleeves",
    nameAr: "أكمام ذراع كت إكس",
    price: 550,
    image: "/images/products/protective-arm-sleeves.jpg",
    images: ["/images/products/protective-arm-sleeves.jpg", "/images/products/protective-arm-sleeves.svg"],
    category: "Accessories",
    tags: ["accessories", "sleeves"],
    isNew: false,
    description: "Arm sleeves for added coverage during sport and outdoor work. Demo listing.",
    descriptionAr: "أكمام ذراع لتغطية إضافية. إدراج تجريبي.",
    sizes: ["S", "M", "L"],
    colors: [BLACK, NAVY],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Stretch fit", "Pair", "Hand wash"],
    detailsAr: ["قصّة مطاط", "زوج", "غسيل يدوي"],
  },
  {
    id: 10,
    slug: "protective-neck-gaiter",
    name: "Cut X Protective Neck Gaiter",
    nameAr: "واقي رقبة كت إكس",
    price: 450,
    image: "/images/products/protective-neck-gaiter.jpg",
    images: ["/images/products/protective-neck-gaiter.jpg", "/images/products/protective-neck-gaiter.svg"],
    category: "Accessories",
    tags: ["accessories", "gaiter"],
    isNew: false,
    description: "Neck gaiter accessory for weather and light coverage needs. Demo listing.",
    descriptionAr: "واقي رقبة للأجواء والتغطية الخفيفة. إدراج تجريبي.",
    sizes: ["One Size"],
    colors: [BLACK, CHARCOAL],
    stock: 25,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["One-size stretch", "Multi-way wear", "Hand wash"],
    detailsAr: ["مقاس واحد مطاط", "يُلبس بعدة طرق", "غسيل يدوي"],
  },
];

export const categories = [
  "All",
  "Daily Essentials",
  "Athletic Protection",
  "Security & Workwear",
  "Accessories",
];

export const featuredProducts = products.filter((p) => p.isFeatured);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

export const DEMO_FREE_SHIPPING_THRESHOLD = 2000;
export const DEMO_SHIPPING_FEE = 60;

export function getProductName(p: Product, lang: "en" | "ar"): string {
  return lang === "ar" ? p.nameAr : p.name;
}

export function getProductDescription(p: Product, lang: "en" | "ar"): string {
  return lang === "ar" ? p.descriptionAr : p.description;
}

export function getColorName(
  c: { name: string; nameAr: string },
  lang: "en" | "ar"
): string {
  return lang === "ar" ? c.nameAr : c.name;
}

export function localizeColorName(name: string, lang: "en" | "ar"): string {
  if (lang === "en") return name;
  for (const p of products) {
    const found = p.colors.find((c) => c.name === name);
    if (found) return found.nameAr;
  }
  return name;
}

export const categoryMeta: Record<string, { image: string; desc: string; descAr: string }> = {
  "Daily Essentials": {
    image: "/images/categories/daily-essentials.jpg",
    desc: "Protective wear for every day",
    descAr: "ملابس حماية للاستخدام اليومي",
  },
  "Athletic Protection": {
    image: "/images/categories/athletic-protection.jpg",
    desc: "Coverage for training & sport",
    descAr: "تغطية للتمرين والرياضة",
  },
  "Security & Workwear": {
    image: "/images/categories/security-workwear.jpg",
    desc: "Duty-ready outerwear",
    descAr: "ملابس جاهزة للمهام",
  },
  Accessories: {
    image: "/images/categories/accessories.jpg",
    desc: "Gloves, sleeves & extras",
    descAr: "قفازات وأكمام وإضافات",
  },
};
