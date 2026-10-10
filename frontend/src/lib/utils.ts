import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  const lang = typeof document !== "undefined" && document.documentElement.lang === "ar" ? "ar-EG" : "en-EG";
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);
}
