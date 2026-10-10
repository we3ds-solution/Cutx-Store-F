import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

export default function PrivacyPage() {
  const { t } = useLang();
  const p = t.privacy;

  useSEO({
    title: p.heroTitle,
    description: p.heroSubtitle,
  });

  return (
    <Layout>
      <PageHero
        badge="Cut X"
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
        bgImage="/images/banners/cta.jpg"
        overlayOpacity={0.7}
        light
        className="min-h-[220px] sm:min-h-[260px]"
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <motion.p
          variants={fadeUp(0.05)}
          initial="hidden"
          animate="show"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {p.lastUpdatedLabel}: <strong>{p.lastUpdatedDate}</strong>. {p.intro}
        </motion.p>

        {p.sections.map((section, i) => (
          <motion.div
            key={section.title}
            variants={fadeUp(0.06 + i * 0.04)}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <h2 className="text-lg font-bold">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.body}</p>
          </motion.div>
        ))}
      </section>
    </Layout>
  );
}
