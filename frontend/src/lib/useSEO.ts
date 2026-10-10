import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const BASE_TITLE = "Cut X Egypt — Cut-Resistant Apparel";
const BASE_DESC =
  "Cut X Egypt: cut and penetration resistant clothing for daily use, athletes and security teams. Browse the demo catalog in EGP, in English and Arabic.";

export function useSEO({ title, description, image }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Cut X Egypt` : BASE_TITLE;
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.content = content;
    };

    const desc = description ?? BASE_DESC;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);
    if (image) {
      setMeta('meta[property="og:image"]', image);
      setMeta('meta[name="twitter:image"]', image);
    }

    return () => {
      document.title = BASE_TITLE;
      setMeta('meta[name="description"]', BASE_DESC);
      setMeta('meta[property="og:title"]', BASE_TITLE);
      setMeta('meta[property="og:description"]', BASE_DESC);
      setMeta('meta[name="twitter:title"]', BASE_TITLE);
      setMeta('meta[name="twitter:description"]', BASE_DESC);
    };
  }, [title, description, image]);
}
