import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "ar";

/**
 * Cut X Egypt — single translation source of truth.
 * Brand voice: confident, technical, Egyptian-market friendly.
 * No invented contact details, policies, prices or certifications live here —
 * anything unverified is either omitted or explicitly labelled as demo.
 */
export const translations = {
  en: {
    brand: "Cut X",
    brandSuffix: "Egypt",
    tagline: "Cut-resistant apparel for daily life, sport and duty",
    nav: { home: "Home", shop: "Shop", about: "About", contact: "Contact" },
    search: "Search products...",
    categories: {
      All: "All",
      "Daily Essentials": "Daily Essentials",
      "Athletic Protection": "Athletic Protection",
      "Security & Workwear": "Security & Workwear",
      Accessories: "Accessories",
    },
    newArrival: "New",
    sale: "Sale",
    demo: "Demo",
    addToCart: "Add to Cart",
    wishlist: "Wishlist",
    viewAll: "View All",
    shopNow: "Shop Now",
    explore: "Our Story",
    demoNotice:
      "Demo catalog — product details, prices and availability are drafts until official Cut X information is published.",
    home: {
      heroTitle: "CUT X",
      heroSubtitle:
        "Cut and penetration resistant clothing — built for daily use, athletes and security teams across Egypt.",
      heroBadge: "Cut-Resistant Apparel · Egypt",
      promos: [
        { iconId: "shield-check", text: "Cut-Resistant Concept" },
        { iconId: "truck", text: "Egypt Delivery" },
        { iconId: "sparkles", text: "Everyday, Sport & Duty" },
        { iconId: "badge-check", text: "As seen on Shark Tank" },
      ],
      shopByCategory: "Shop by Category",
      newArrivals: "New Arrivals",
      newArrivalsSubtitle: "The latest additions to the Cut X range",
      featured: "Featured Collection",
      featuredSubtitle: "Standout pieces from the current range",
      trending: "Explore the Range",
      trendingSubtitle: "Protective wear for every routine",
      featuredBannerTitle: "Engineered for Real Life",
      featuredBannerSubtitle:
        "From morning commutes to night shifts — apparel designed around protection without giving up everyday comfort.",
      audiencesTitle: "Built for Three Fronts",
      audiencesSubtitle: "The audiences Cut X designs for",
      audiences: [
        { iconId: "sun", title: "Daily Use", desc: "Comfortable protective pieces for commutes, errands and everyday routines." },
        { iconId: "zap", title: "Athletes", desc: "Coverage and confidence for training, running and field sports." },
        { iconId: "shield-check", title: "Security & Industry", desc: "Duty-ready layers for security teams and industrial shifts." },
      ],
    },
    cart: {
      title: "Your Bag",
      items: "items",
      empty: "Your bag is empty",
      emptySubtitle: "Add something protective",
      total: "Total",
      checkout: "Checkout",
      continueShopping: "Continue Shopping",
      subtotal: "Subtotal",
      free: "Free",
      shipping: "Shipping",
      shippingNote: "Demo rates — final shipping confirmed at order time",
    },
    checkout: {
      title: "Checkout",
      email: "Email Address",
      fullName: "Full Name",
      address: "Street Address",
      city: "City",
      postalCode: "Postal Code",
      country: "Country",
      phone: "Phone Number",
      proceedPayment: "Place Demo Order",
      processing: "Placing order...",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      size: "Size",
      color: "Color",
      quantity: "Qty",
      emptyCart: "Your bag is empty",
      shippingInfo: "Delivery Information",
      freeShipping: "FREE",
      demoTitle: "Demo checkout — no payment connected",
      demoBody:
        "Online payment is not connected yet. Placing this order is a demo only: nothing will be charged and no real order is sent. Share your details and we will treat this as an enquiry.",
    },
    success: {
      title: "Demo Order Received!",
      subtitle:
        "This was a demonstration checkout — no payment was processed and no real order was placed. We will announce real ordering once official Cut X sales channels open.",
      continueShopping: "Continue Shopping",
      orderNumber: "Demo ref #",
      noOrderTitle: "No recent order",
      noOrderSubtitle: "Your bag is untouched. Browse the range and place a demo order from checkout.",
    },
    auth: {
      login: "Sign In",
      register: "Create Account",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      loginSwitch: "Don't have an account?",
      registerSwitch: "Already have an account?",
      signUp: "Sign up",
      signIn: "Sign in",
      profile: "Profile",
      orders: "My Orders",
      logout: "Sign Out",
      demoNote: "Demo sign-in — kept on this device only.",
    },
    product: {
      relatedProducts: "You May Also Like",
      sizeGuide: "Size Guide",
      sizeGuideTitle: "Size Guide",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      reviews: "reviews",
      description: "Description",
      details: "Details & Care",
      selectSize: "Select Size",
      selectColor: "Select Color",
      quantity: "Quantity",
      notFound: "Product Not Found",
      notFoundSubtitle: "The product you're looking for doesn't exist.",
      backToShop: "Back to Shop",
      tags: "Tags",
      addedToCart: "Added to bag!",
      demoNote: "Demo listing — final specs, price and availability to be confirmed.",
      noReviews: "No customer reviews yet. Be the first to review once sales open.",
      sizeTable: {
        size: "Size", chest: "Chest", waist: "Waist", hips: "Hips",
        XS: ["XS", "32–33″", "26–27″", "34–35″"],
        S:  ["S",  "34–35″", "28–29″", "36–37″"],
        M:  ["M",  "36–37″", "30–31″", "38–39″"],
        L:  ["L",  "38–39″", "32–33″", "40–41″"],
        XL: ["XL", "40–42″", "34–36″", "42–44″"],
        XXL:["XXL","44–46″", "38–40″", "46–48″"],
      },
    },
    about: {
      heroTitle: "Our Story",
      heroSubtitle: "Protective clothing for real Egyptian routines",
      missionTitle: "Who We Are",
      missionText:
        "Cut X is an Egyptian brand developing cut and penetration resistant clothing for daily use, athletes and security teams. The brand introduced itself to a national audience on Shark Tank Egypt and continues to build its first product range for the local market.",
      valuesTitle: "What We Design For",
      values: [
        { iconId: "shield-check", title: "Everyday Protection", desc: "Protective thinking built into pieces you can actually wear every day." },
        { iconId: "zap", title: "Movement", desc: "Cuts that let athletes train, run and compete without restriction." },
        { iconId: "users", title: "Duty", desc: "Practical layers for security companies and industrial shifts." },
        { iconId: "flag", title: "Made for Egypt", desc: "An Egyptian brand designing for Egyptian routines, climate and streets." },
      ],
      statsTitle: "Cut X at a Glance",
      stats: [
        { value: "3", label: "Audiences Served" },
        { value: "4", label: "Product Ranges" },
        { value: "EGP", label: "Local Pricing" },
        { value: "TV", label: "Shark Tank Feature" },
      ],
    },
    contact: {
      heroTitle: "Get in Touch",
      heroSubtitle: "Follow the official Cut X channels",
      formTitle: "Send a Message",
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      successMsg: "Message noted! This demo form does not send anywhere yet.",
      infoTitle: "Official Channels",
      infoNote: "Verified public pages — official phone, address and email are not published yet.",
      info: [
        { iconId: "instagram", label: "Instagram", value: "@cutx_eg" },
        { iconId: "facebook", label: "Facebook", value: "Cut X" },
        { iconId: "globe", label: "Website", value: "cutx-egy.com (coming soon)" },
        { iconId: "clock", label: "Support", value: "Replies via social channels" },
      ],
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      subtitle: "This cut didn't land where expected.",
      cta: "Back to Shop",
    },
    footer: {
      tagline: "Cut-resistant apparel for daily life, sport and duty.",
      shop: "Shop",
      company: "Company",
      follow: "Follow Cut X",
      links: {
        newArrivals: "New Arrivals",
        daily: "Daily Essentials",
        athletic: "Athletic Protection",
        security: "Security & Workwear",
        accessories: "Accessories",
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      newsletterTitle: "Stay in the loop",
      newsletterPlaceholder: "your@email.com",
      newsletterBtn: "Subscribe",
      newsletterNote: "Demo form — subscriptions are not collected yet.",
      rights: "All rights reserved.",
      demoLine: "Demo storefront — catalog data is illustrative until official details are published.",
    },
  },
  ar: {
    brand: "كت إكس",
    brandSuffix: "مصر",
    tagline: "ملابس مقاومة للقطع للحياة اليومية والرياضة والمهام",
    nav: { home: "الرئيسية", shop: "المتجر", about: "من نحن", contact: "تواصل" },
    search: "ابحث عن منتج...",
    categories: {
      All: "الكل",
      "Daily Essentials": "أساسيات يومية",
      "Athletic Protection": "حماية رياضية",
      "Security & Workwear": "أمن ومهام",
      Accessories: "إكسسوارات",
    },
    newArrival: "جديد",
    sale: "تخفيض",
    demo: "تجريبي",
    addToCart: "أضف للحقيبة",
    wishlist: "المفضلة",
    viewAll: "عرض الكل",
    shopNow: "تسوق الآن",
    explore: "قصتنا",
    demoNotice:
      "كتالوج تجريبي — تفاصيل المنتجات والأسعار والتوافر مسودات لحين نشر المعلومات الرسمية من كت إكس.",
    home: {
      heroTitle: "كت إكس",
      heroSubtitle:
        "ملابس مقاومة للقطع والاختراق — للاستخدام اليومي والرياضيين وفرق الأمن في جميع أنحاء مصر.",
      heroBadge: "ملابس مقاومة للقطع · مصر",
      promos: [
        { iconId: "shield-check", text: "فكرة مقاومة للقطع" },
        { iconId: "truck", text: "توصيل داخل مصر" },
        { iconId: "sparkles", text: "يومي ورياضي ومهام" },
        { iconId: "badge-check", text: "كما ظهرنا في شارك تانك" },
      ],
      shopByCategory: "تسوق حسب الفئة",
      newArrivals: "وصل حديثاً",
      newArrivalsSubtitle: "أحدث إضافات تشكيلة كت إكس",
      featured: "المجموعة المميزة",
      featuredSubtitle: "قطع مختارة من التشكيلة الحالية",
      trending: "اكتشف التشكيلة",
      trendingSubtitle: "ملابس حماية لكل يوم",
      featuredBannerTitle: "مصممة للحياة الحقيقية",
      featuredBannerSubtitle:
        "من مشوار الصبح لشيفت بالليل — ملابس مبنية على الحماية من غير ما تضحي بالراحة اليومية.",
      audiencesTitle: "مصممة لثلاث جبهات",
      audiencesSubtitle: "الفئات التي تصمم لها كت إكس",
      audiences: [
        { iconId: "sun", title: "الاستخدام اليومي", desc: "قطع حماية مريحة للمشاوير والمواصلات وروتين كل يوم." },
        { iconId: "zap", title: "الرياضيون", desc: "تغطية وثقة للتمرين والجري والرياضات الميدانية." },
        { iconId: "shield-check", title: "الأمن والصناعة", desc: "طبقات عملية لفرق الأمن والورديات الصناعية." },
      ],
    },
    cart: {
      title: "حقيبتك",
      items: "قطع",
      empty: "حقيبتك فارغة",
      emptySubtitle: "أضف قطعة حماية",
      total: "الإجمالي",
      checkout: "الدفع",
      continueShopping: "مواصلة التسوق",
      subtotal: "المجموع الفرعي",
      free: "مجاناً",
      shipping: "الشحن",
      shippingNote: "أسعار تجريبية — الشحن النهائي يُؤكَّد عند الطلب",
    },
    checkout: {
      title: "الدفع",
      email: "البريد الإلكتروني",
      fullName: "الاسم الكامل",
      address: "عنوان الشارع",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      country: "الدولة",
      phone: "رقم الهاتف",
      proceedPayment: "تأكيد طلب تجريبي",
      processing: "جارٍ تأكيد الطلب...",
      orderSummary: "ملخص الطلب",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      total: "الإجمالي",
      size: "المقاس",
      color: "اللون",
      quantity: "الكمية",
      emptyCart: "حقيبتك فارغة",
      shippingInfo: "معلومات التوصيل",
      freeShipping: "مجاناً",
      demoTitle: "دفع تجريبي — لا يوجد دفع إلكتروني بعد",
      demoBody:
        "الدفع الإلكتروني غير مفعل بعد. هذا الطلب تجريبي فقط: لن يتم خصم أي مبلغ ولن يُرسل طلب حقيقي.",
    },
    success: {
      title: "تم استلام طلبك التجريبي!",
      subtitle:
        "كانت هذه عملية دفع تجريبية — لم يتم خصم أي مبلغ ولم يُسجَّل طلب حقيقي. سنعلن عن فتح الطلبات الحقيقية مع إطلاق قنوات البيع الرسمية.",
      continueShopping: "مواصلة التسوق",
      orderNumber: "مرجع تجريبي #",
      noOrderTitle: "لا يوجد طلب حديث",
      noOrderSubtitle: "حقيبتك كما هي. تصفح التشكيلة وأكّد طلباً تجريبياً من صفحة الدفع.",
    },
    auth: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      loginBtn: "دخول",
      registerBtn: "إنشاء حساب",
      loginSwitch: "ليس لديك حساب؟",
      registerSwitch: "لديك حساب؟",
      signUp: "سجّل",
      signIn: "ادخل",
      profile: "الملف الشخصي",
      orders: "طلباتي",
      logout: "خروج",
      demoNote: "تسجيل تجريبي — يُحفظ على جهازك فقط.",
    },
    product: {
      relatedProducts: "قد يعجبك أيضاً",
      sizeGuide: "دليل المقاسات",
      sizeGuideTitle: "دليل المقاسات",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      reviews: "تقييمات",
      description: "الوصف",
      details: "التفاصيل والعناية",
      selectSize: "اختر المقاس",
      selectColor: "اختر اللون",
      quantity: "الكمية",
      notFound: "المنتج غير موجود",
      notFoundSubtitle: "المنتج الذي تبحث عنه غير موجود.",
      backToShop: "العودة للمتجر",
      tags: "الوسوم",
      addedToCart: "أضيف للحقيبة!",
      demoNote: "إدراج تجريبي — المواصفات والسعر والتوافر النهائي تُؤكَّد لاحقاً.",
      noReviews: "لا توجد تقييمات بعد. كن أول من يقيّم عند فتح البيع.",
      sizeTable: {
        size: "المقاس", chest: "الصدر", waist: "الخصر", hips: "الوركان",
        XS: ["XS", "٨٣–٨٤ سم", "٦٦–٦٩ سم", "٨٦–٨٩ سم"],
        S:  ["S",  "٨٦–٨٩ سم", "٧١–٧٤ سم", "٩١–٩٤ سم"],
        M:  ["M",  "٩١–٩٤ سم", "٧٦–٧٩ سم", "٩٦–٩٩ سم"],
        L:  ["L",  "٩٦–٩٩ سم", "٨١–٨٤ سم", "١٠١–١٠٤ سم"],
        XL: ["XL", "١٠١–١٠٧ سم", "٨٦–٩١ سم", "١٠٧–١١٢ سم"],
        XXL:["XXL","١١٢–١١٧ سم", "٩٧–١٠٢ سم", "١١٧–١٢٢ سم"],
      },
    },
    about: {
      heroTitle: "قصتنا",
      heroSubtitle: "ملابس حماية لروتين المصريين الحقيقي",
      missionTitle: "من نحن",
      missionText:
        "كت إكس علامة مصرية تطور ملابس مقاومة للقطع والاختراق للاستخدام اليومي والرياضيين وفرق الأمن. قدّمت العلامة نفسها لجمهور واسع عبر برنامج شارك تانك مصر، وتواصل بناء أولى تشكيلاتها للسوق المحلي.",
      valuesTitle: "نصمم من أجل",
      values: [
        { iconId: "shield-check", title: "حماية يومية", desc: "فكر الحماية مدمج في قطع تقدر تلبسها كل يوم فعلاً." },
        { iconId: "zap", title: "الحركة", desc: "قصّات تسمح للرياضيين بالتمرين والجري بحرية." },
        { iconId: "users", title: "المهام", desc: "طبقات عملية لشركات الأمن والورديات الصناعية." },
        { iconId: "flag", title: "صنع لمصر", desc: "علامة مصرية تصمم لروتين المصريين ومناخهم وشوارعهم." },
      ],
      statsTitle: "كت إكس في لمحة",
      stats: [
        { value: "3", label: "فئات مستهدفة" },
        { value: "4", label: "خطوط منتجات" },
        { value: "ج.م", label: "أسعار محلية" },
        { value: "TV", label: "ظهور في شارك تانك" },
      ],
    },
    contact: {
      heroTitle: "تواصل معنا",
      heroSubtitle: "تابع القنوات الرسمية لكت إكس",
      formTitle: "أرسل رسالة",
      name: "اسمك",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال",
      sending: "جارٍ الإرسال...",
      successMsg: "تم تسجيل رسالتك! هذا النموذج تجريبي ولا يُرسل لأي مكان بعد.",
      infoTitle: "القنوات الرسمية",
      infoNote: "صفحات عامة موثقة — الهاتف والعنوان والبريد الرسمي غير منشورين بعد.",
      info: [
        { iconId: "instagram", label: "إنستجرام", value: "@cutx_eg" },
        { iconId: "facebook", label: "فيسبوك", value: "Cut X" },
        { iconId: "globe", label: "الموقع", value: "cutx-egy.com (قريباً)" },
        { iconId: "clock", label: "الدعم", value: "الرد عبر قنوات السوشيال" },
      ],
    },
    notFound: {
      code: "404",
      title: "الصفحة غير موجودة",
      subtitle: "يبدو أن هذه القطعة لم تصل لمكانها.",
      cta: "العودة للمتجر",
    },
    footer: {
      tagline: "ملابس مقاومة للقطع للحياة اليومية والرياضة والمهام.",
      shop: "المتجر",
      company: "الشركة",
      follow: "تابع كت إكس",
      links: {
        newArrivals: "وصل حديثاً",
        daily: "أساسيات يومية",
        athletic: "حماية رياضية",
        security: "أمن ومهام",
        accessories: "إكسسوارات",
        about: "من نحن",
        contact: "تواصل معنا",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
      },
      newsletterTitle: "ابقَ على اطلاع",
      newsletterPlaceholder: "بريدك@example.com",
      newsletterBtn: "اشترك",
      newsletterNote: "نموذج تجريبي — الاشتراكات لا تُجمَع بعد.",
      rights: "جميع الحقوق محفوظة.",
      demoLine: "واجهة تجريبية — بيانات الكتالوج استرشادية لحين نشر التفاصيل الرسمية.",
    },
  },
};

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: typeof translations.en;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("cutx-lang") || localStorage.getItem("sh-lang");
      return (saved as Lang) === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  });
  const isRTL = lang === "ar";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar-EG" : "en";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.style.setProperty(
      "--app-font-sans",
      "'Cairo', system-ui, sans-serif"
    );
    try {
      localStorage.setItem("cutx-lang", lang);
      localStorage.removeItem("sh-lang");
    } catch {
      /* storage unavailable — language still applies for this session */
    }
  }, [lang, isRTL]);

  const toggleLang = () => {
    document.body.classList.add("lang-switching");
    setTimeout(() => {
      setLang((l) => (l === "en" ? "ar" : "en"));
      setTimeout(() => document.body.classList.remove("lang-switching"), 30);
    }, 160);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
