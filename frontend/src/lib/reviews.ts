export interface Review {
  id: number;
  productSlug: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

/**
 * No verified customer reviews exist for Cut X products yet, so this list is
 * intentionally empty. Fabricating reviews, ratings or review counts would be
 * misleading. The helpers below are kept so the reviews UI can light up
 * automatically once real feedback is collected.
 */
export const reviews: Review[] = [];

/** Get reviews for a specific product slug */
export function getProductReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

/** Compute rating breakdown percentages */
export function getRatingBreakdown(productReviews: Review[]): Record<number, number> {
  if (!productReviews.length) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    counts[r.rating] = (counts[r.rating] || 0) + 1;
  });
  const total = productReviews.length;
  return Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, Math.round((v / total) * 100)])
  );
}
