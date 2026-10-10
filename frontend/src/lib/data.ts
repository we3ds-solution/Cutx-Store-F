import { Product } from "./types";

/**
 * Cut X Egypt — draft/demo catalog.
 *
 * Every entry below is a DEMO record (isDemo: true) derived from the only
 * verified brand facts available: the official Instagram bio
 * (@cutx_eg — "Fully tested cut and penetration resistant clothing · Variety
 * of products · For daily use, athletes, security") and the public Shark Tank
 * Egypt appearance. No official price list, size chart, inventory feed, lab
 * report, or certification was published at the time of writing, so prices are
 * clearly-marked EGP drafts and ratings/reviews are disabled (0).
 * See docs/CUTX-CATALOG.md and docs/CUTX-BRAND-RESEARCH.md.
 *
 * Categories reflect the three audiences named in the brand bio plus a
 * protective-accessories range. Specs contain no protection ratings or
 * material claims beyond the brand's own positioning.
 */

const BLACK = { name: "Black", nameAr: "أسود", hex: "#141416" };
const CHARCOAL = { name: "Charcoal", nameAr: "فحمي", hex: "#3A3A41" };
const RED = { name: "Cut Red", nameAr: "أحمر", hex: "#E10600" };
const SAND = { name: "Sand", nameAr: "رملي", hex: "#C9B896" };
const OLIVE = { name: "Olive", nameAr: "زيتي", hex: "#5A5C3A" };
const NAVY = { name: "Navy", nameAr: "كحلي", hex: "#1E3A5F" };

export const products: Product[] = [
  /* ── DAILY ESSENTIALS ─────────────────────────────── */
  {
    id: 1,
    slug: "everyday-protective-tee",
    name: "Cut X Everyday Protective Tee",
    nameAr: "تيشيرت كت إكس اليومي",
    price: 1450,
    image: "/images/products/everyday-protective-tee-photo.jpg",
    images: [
      "/images/products/everyday-protective-tee-photo.jpg",
      "/images/products/everyday-protective-tee-alt.svg",
    ],
    category: "Daily Essentials",
    tags: ["daily", "tee", "everyday", "cut-resistant"],
    isNew: true,
    isFeatured: true,
    description:
      "The everyday Cut X tee: a clean, regular-fit T-shirt built around the brand's protective concept for daily wear. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "التيشيرت اليومي من كت إكس: تصميم عملي بقصّة مريحة للاستخدام اليومي ضمن فكرة الملابس المقاومة للقطع. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BLACK, CHARCOAL, RED],
    stock: 0,
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
    images: [
      "/images/products/urban-protective-hoodie.jpg",
      "/images/products/urban-protective-hoodie.svg",
    ],
    category: "Daily Essentials",
    tags: ["daily", "hoodie", "layering", "cut-resistant"],
    isNew: false,
    isFeatured: true,
    description:
      "A relaxed pullover hoodie for everyday layering, positioned in the Cut X daily-wear range. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "هودي عملي بقصّة مريحة للبس اليومي ضمن تشكيلة كت إكس. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [CHARCOAL, BLACK, SAND],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Relaxed fit", "Kangaroo pocket", "Adjustable hood"],
    detailsAr: ["قصّة مريحة", "جيب أمامي", "غطاء رأس قابل للضبط"],
  },

  /* ── ATHLETIC PROTECTION ──────────────────────────── */
  {
    id: 3,
    slug: "training-long-sleeve",
    name: "Cut X Training Long-Sleeve",
    nameAr: "تيشيرت كت إكس الرياضي بكم",
    price: 1650,
    image: "/images/products/training-long-sleeve.jpg",
    images: [
      "/images/products/training-long-sleeve.jpg",
      "/images/products/training-long-sleeve.svg",
    ],
    category: "Athletic Protection",
    tags: ["athletic", "training", "sport", "long-sleeve"],
    isNew: true,
    isFeatured: true,
    description:
      "A long-sleeve training top for athletes who want coverage during workouts and outdoor sessions. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "تيشيرت رياضي بكم طويل للرياضيين لتغطية أكبر أثناء التمرين. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BLACK, RED, NAVY],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Athletic fit", "Long sleeves", "Lightweight feel"],
    detailsAr: ["قصّة رياضية", "أكمام طويلة", "خامة خفيفة"],
  },
  {
    id: 4,
    slug: "compression-training-pants",
    name: "Cut X Compression Training Pants",
    nameAr: "بنطلون كت إكس الرياضي",
    price: 1750,
    image: "/images/products/compression-training-pants.jpg",
    images: [
      "/images/products/compression-training-pants.jpg",
      "/images/products/compression-training-pants.svg",
    ],
    category: "Athletic Protection",
    tags: ["athletic", "training", "pants", "compression"],
    isNew: false,
    description:
      "Fitted training pants for running, gym work and field sports. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "بنطلون رياضي بقصّة محكمة للجري والجيم والرياضات الميدانية. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BLACK, CHARCOAL],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Fitted training cut", "Elastic waistband", "Side pocket"],
    detailsAr: ["قصّة رياضية محكمة", "حزام خصر مطاطي", "جيب جانبي"],
  },
  {
    id: 5,
    slug: "track-protective-jacket",
    name: "Cut X Track Protective Jacket",
    nameAr: "جاكيت كت إكس الرياضي",
    price: 2600,
    image: "/images/products/track-protective-jacket.jpg",
    images: [
      "/images/products/track-protective-jacket.jpg",
      "/images/products/track-protective-jacket.svg",
    ],
    category: "Athletic Protection",
    tags: ["athletic", "jacket", "track", "training"],
    isNew: false,
    isFeatured: true,
    description:
      "A full-zip track jacket for warm-ups, cool-downs and off-field wear. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "جاكيت رياضي بسحّاب كامل للإحماء والاستخدام اليومي. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [NAVY, BLACK, RED],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Full-zip front", "Stand collar", "Zip side pockets"],
    detailsAr: ["سحّاب أمامي كامل", "ياقة عالية", "جيوب جانبية بسحّاب"],
  },

  /* ── SECURITY & WORKWEAR ──────────────────────────── */
  {
    id: 6,
    slug: "duty-protective-jacket",
    name: "Cut X Duty Protective Jacket",
    nameAr: "جاكيت كت إكس للمهام",
    price: 3200,
    image: "/images/products/duty-protective-jacket.jpg",
    images: [
      "/images/products/duty-protective-jacket.jpg",
      "/images/products/duty-protective-jacket.svg",
    ],
    category: "Security & Workwear",
    tags: ["security", "duty", "workwear", "jacket"],
    isNew: true,
    isFeatured: true,
    description:
      "A structured duty jacket for security teams and industrial shifts where durable outerwear matters. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "جاكيت عملي لفرق الأمن والورديات الصناعية حيث تهم المتانة. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [OLIVE, BLACK],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Structured workwear cut", "Multiple utility pockets", "Reinforced seams"],
    detailsAr: ["قصّة عملية", "جيوب متعددة", "خياطة مقواة"],
  },
  {
    id: 7,
    slug: "tactical-overshirt",
    name: "Cut X Tactical Overshirt",
    nameAr: "قميص كت إكس العملي",
    price: 2100,
    image: "/images/products/tactical-overshirt.jpg",
    images: [
      "/images/products/tactical-overshirt.jpg",
      "/images/products/tactical-overshirt.svg",
    ],
    category: "Security & Workwear",
    tags: ["security", "workwear", "overshirt", "duty"],
    isNew: false,
    description:
      "A button-front overshirt that layers over base clothing on shift. Demo listing — final fabric, fit and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "قميص خارجي بأزرار يُلبس فوق الملابس الأساسية أثناء العمل. هذا إدراج تجريبي — التفاصيل النهائية للخامة والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [CHARCOAL, BLACK, OLIVE],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Button front", "Chest pockets", "Layering fit"],
    detailsAr: ["أزرار أمامية", "جيوب صدر", "قصّة مناسبة للطبقات"],
  },

  /* ── ACCESSORIES ──────────────────────────────────── */
  {
    id: 8,
    slug: "protective-gloves",
    name: "Cut X Protective Gloves",
    nameAr: "قفازات كت إكس",
    price: 650,
    image: "/images/products/protective-gloves.jpg",
    images: [
      "/images/products/protective-gloves.jpg",
      "/images/products/protective-gloves.svg",
    ],
    category: "Accessories",
    tags: ["accessories", "gloves", "protection"],
    isNew: true,
    isFeatured: false,
    description:
      "Protective gloves for handling, riding and site work. Demo listing — final materials, sizing and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "قفازات للاستخدام العملي والمواقع. هذا إدراج تجريبي — التفاصيل النهائية للخامات والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L", "XL"],
    colors: [BLACK, CHARCOAL],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Grip palm", "Elastic cuff", "Touchscreen-friendly"],
    detailsAr: ["راحة متماسكة", "معصم مطاطي", "متوافق مع شاشات اللمس"],
  },
  {
    id: 9,
    slug: "protective-arm-sleeves",
    name: "Cut X Protective Arm Sleeves",
    nameAr: "أكمام كت إكس للذراع",
    price: 550,
    image: "/images/products/protective-arm-sleeves.jpg",
    images: [
      "/images/products/protective-arm-sleeves.jpg",
      "/images/products/protective-arm-sleeves.svg",
    ],
    category: "Accessories",
    tags: ["accessories", "sleeves", "training", "work"],
    isNew: false,
    description:
      "Pull-on arm sleeves (sold as a pair) for training and site tasks. Demo listing — final materials, sizing and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "أكمام ذراع (تُباع كزوج) للتمرين ومهام العمل. هذا إدراج تجريبي — التفاصيل النهائية للخامات والمقاسات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["S", "M", "L"],
    colors: [BLACK, RED],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["Sold as a pair", "Elastic grip top", "Lightweight knit"],
    detailsAr: ["يُباع كزوج", "شريط مطاطي علوي", "نسيج خفيف"],
  },
  {
    id: 10,
    slug: "protective-neck-gaiter",
    name: "Cut X Protective Neck Gaiter",
    nameAr: "غطاء الرقبة من كت إكس",
    price: 450,
    image: "/images/products/protective-neck-gaiter.jpg",
    images: [
      "/images/products/protective-neck-gaiter.jpg",
      "/images/products/protective-neck-gaiter.svg",
    ],
    category: "Accessories",
    tags: ["accessories", "gaiter", "daily", "riding"],
    isNew: false,
    description:
      "A versatile neck gaiter for commuting, riding and dusty sites. Demo listing — final materials and availability to be confirmed against official Cut X details.",
    descriptionAr:
      "غطاء رقبة متعدد الاستخدام للتنقل والمواقع. هذا إدراج تجريبي — التفاصيل النهائية للخامات والتوافر تُؤكَّد مع البيانات الرسمية.",
    sizes: ["One Size"],
    colors: [BLACK, CHARCOAL, OLIVE],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    isDemo: true,
    details: ["One-size stretch fit", "Multi-way wear", "Breathable knit"],
    detailsAr: ["مقاس واحد مطاطي", "يُلبس بعدة طرق", "نسيج يسمح بالتهوية"],
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

/** Demo commerce defaults — configurable, NOT official Cut X policy. */
export const DEMO_FREE_SHIPPING_THRESHOLD = 2000; // EGP
export const DEMO_SHIPPING_FEE = 60; // EGP

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

/** Localize a stored (English) color name for cart/checkout display. */
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
    image: "/images/categories/daily-essentials.svg",
    desc: "Protective wear for every day",
    descAr: "ملابس حماية للاستخدام اليومي",
  },
  "Athletic Protection": {
    image: "/images/categories/athletic-protection.svg",
    desc: "Coverage for training & sport",
    descAr: "تغطية للتمرين والرياضة",
  },
  "Security & Workwear": {
    image: "/images/categories/security-workwear.svg",
    desc: "Duty-ready outerwear",
    descAr: "ملابس جاهزة للمهام",
  },
  Accessories: {
    image: "/images/categories/accessories.svg",
    desc: "Gloves, sleeves & extras",
    descAr: "قفازات وأكمام وإضافات",
  },
};
