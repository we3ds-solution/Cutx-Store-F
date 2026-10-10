import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users, Zap, Flag, ArrowRight, type LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { WaveDivider } from "@/components/wave-divider";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const VALUE_ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "sparkles": Sparkles,
  "users":    Users,
  "zap":      Zap,
  "flag":     Flag,
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;
  const [, navigate] = useLocation();
  useSEO({ title: "About", description: "Cut X Egypt — cut and penetration resistant clothing for daily use, athletes and security teams. An Egyptian protective-apparel brand." });

  return (
    <Layout>
      {/* ── HERO ─── */}
      <PageHero
        badge="Cut X"
        title={a.heroTitle}
        subtitle={a.heroSubtitle}
        bgImage="/images/banners/cta.jpg"
        overlayOpacity={0.65}
        light
        className="min-h-[260px] sm:min-h-[320px]"
      />

      {/* Wave divider */}
      <WaveDivider variant="cinematic" size="sm" />

      {/* ── MISSION ─── */}
      <section className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary bg-primary/10 rounded-[var(--radius-pill)] px-3 py-1 mb-5"
            >
              {a.missionTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              {a.heroSubtitle}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">{a.missionText}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" className="h-11 px-7 gap-2" onClick={() => navigate("/shop")}>
                {t.nav.shop} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-7" onClick={() => navigate("/contact")}>
                {t.nav.contact}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] bg-muted shadow-lift-lg">
              <img
                src="/images/banners/hero.jpg"
                alt="Cut X protective apparel"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-5 -start-5 h-28 w-28 rounded-[var(--radius-xl)] bg-primary flex items-center justify-center shadow-lift-lg">
              <span className="text-primary-foreground text-sm font-black text-center leading-tight px-2">
                Cut<br />X
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider variant="gentle" size="sm" />

      {/* ── VALUES ─── */}
      <section className="section-tinted">
        <div className="section-inner">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{a.valuesTitle}</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {a.values.map((val) => {
              const Icon = VALUE_ICONS[val.iconId] ?? Sparkles;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeUp()}
                  className="value-card"
                >
                  <div className="icon-block mx-auto mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <WaveDivider flip variant="gentle" size="sm" />

      {/* ── STATS ─── */}
      <section className="section-inner">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold">{a.statsTitle}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {a.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp()}
              className="stat-card"
            >
              <p className="text-3xl sm:text-4xl font-black text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Wave divider */}
      <WaveDivider variant="cinematic" size="sm" />

      {/* ── CTA BANNER ─── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/banners/cta.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="section-eyebrow opacity-70 mb-3">{t.brand} {t.brandSuffix}</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.tagline}</h2>
          <p className="opacity-70 mb-7 leading-relaxed">{t.demoNotice}</p>
          <Button variant="secondary" size="lg" className="h-11 px-8 gap-2" onClick={() => navigate("/shop")}>
            {t.shopNow} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
