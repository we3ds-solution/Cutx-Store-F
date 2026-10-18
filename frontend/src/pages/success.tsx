import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ShoppingBag, ShieldAlert, ArrowRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { useLang } from "@/contexts/LangContext";

/**
 * Demo order confirmation. Only renders the confirmation state when a demo
 * order reference from /checkout exists in this session — direct visits see
 * an explicit "no recent order" state and the bag is never touched here
 * (checkout already cleared it on submit).
 *
 * Session value may be a plain string (current checkout) or JSON `{ ref }`
 * (older shape) — both are accepted.
 */
function readDemoOrderRef(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("ref");
    if (fromQuery && fromQuery.trim()) return fromQuery.trim();

    const raw = sessionStorage.getItem("cutx-demo-order");
    if (!raw) return null;
    if (raw.startsWith("{")) {
      const parsed = JSON.parse(raw) as { ref?: string };
      return parsed.ref?.trim() || null;
    }
    return raw.trim() || null;
  } catch {
    return null;
  }
}

export default function SuccessPage() {
  const [, navigate] = useLocation();
  const { t } = useLang();
  const s = t.success;
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    setRef(readDemoOrderRef());
  }, []);

  return (
    <Layout>
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md w-full">
          {ref ? (
            <>
              <div className="relative inline-flex mb-6">
                <div className="h-24 w-24 rounded-[var(--radius-pill)] bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{s.title}</h1>
              <div className="rounded-[var(--radius-lg)] border border-border/60 bg-muted/30 px-4 py-3 flex gap-3 text-start mb-4">
                <ShieldAlert className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs text-muted-foreground leading-relaxed">{s.subtitle}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {s.orderNumber}
                <span className="font-mono font-bold text-foreground">{ref}</span>
              </p>

              <Button onClick={() => navigate("/")} size="lg" className="h-12 px-8 gap-2 mt-8">
                {s.continueShopping} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </>
          ) : (
            <>
              <div className="relative inline-flex mb-6">
                <div className="h-24 w-24 rounded-[var(--radius-pill)] bg-muted flex items-center justify-center">
                  <SearchX className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{s.noOrderTitle}</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">{s.noOrderSubtitle}</p>
              <Button onClick={() => navigate("/shop")} size="lg" className="h-12 px-8 gap-2">
                <ShoppingBag className="h-4 w-4" />
                {s.continueShopping}
              </Button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
