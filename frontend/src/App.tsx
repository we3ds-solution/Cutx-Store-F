import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/home";

/**
 * Route-level code splitting: only the landing page (Home) ships in the
 * initial bundle. Every other route loads on demand, which is what makes
 * first paint fast — the browser transforms/downloads far fewer modules.
 */
const ShopPage = lazy(() => import("@/pages/shop"));
const CheckoutPage = lazy(() => import("@/pages/checkout"));
const SuccessPage = lazy(() => import("@/pages/success"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const NotFound = lazy(() => import("@/pages/not-found"));

/** Dependency-free route fallback — pure CSS so it paints instantly. */
function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
      <div
        className="h-10 w-10 rounded-full border-2 border-muted border-t-primary animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <CartProvider>
          <AuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </CartProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
