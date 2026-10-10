import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using Cut X Egypt's demo storefront, you confirm that you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.`,
  },
  {
    title: "Demo Storefront Status",
    body: `This website is a **demonstration storefront**. Product listings, prices in EGP, availability, shipping rates and checkout are illustrative drafts — not offers for sale. No payment is processed and no order placed here creates a purchase contract.`,
  },
  {
    title: "Products & Availability",
    body: `All products shown are draft listings based on the public Cut X brand positioning. Specifications, sizes, colours and availability will be confirmed when official product details are published. Placeholder graphics are used instead of product photography until official imagery is available.`,
  },
  {
    title: "Protective Claims",
    body: `Cut X describes its concept as cut and penetration resistant clothing. This site makes **no certified protection ratings, laboratory claims, or material specifications** — such details will only appear here once officially published and substantiated by the brand. Protective apparel does not guarantee safety in all situations.`,
  },
  {
    title: "Pricing",
    body: `All prices are shown in **Egyptian Pounds (EGP)** as configurable demo values. They are not confirmed retail prices and may change when official pricing is announced.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website — including text, graphics, placeholder artwork, and software — is the property of its respective owners. Product photography rights remain with Cut X. You may not reproduce or distribute site content without permission.`,
  },
  {
    title: "User Accounts",
    body: `Account sign-in on this demo is local-only: credentials are not verified against any server and sessions are not persisted. Do not reuse real passwords here.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, the operators of this demo storefront shall not be liable for any damages arising from the use of — or inability to use — this website or its draft listings.`,
  },
  {
    title: "Changes to These Terms",
    body: `We may update these Terms of Service at any time as the storefront moves from demo to live commerce. Continued use of the site after changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "Contact",
    body: `Questions about these Terms? Reach Cut X through the official public channels:\n\n**Cut X Egypt**\nInstagram: @cutx_eg\nFacebook: Cut X\n\nNo official phone, address or support email is published yet.`,
  },
];

export default function TermsPage() {
  const { t } = useLang();
  useSEO({ title: "Terms of Service", description: "Cut X Egypt demo storefront terms — draft listings, EGP demo pricing, and no live payment processing." });

  return (
    <Layout>
      <PageHero
        badge="Legal"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        bgImage="/images/banners/cta.jpg"
        overlayOpacity={0.72}
        light
        className="min-h-[220px] sm:min-h-[260px]"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Last updated */}
        <motion.p
          className="text-sm text-muted-foreground mb-10 pb-6 border-b border-border"
          variants={fadeUp(0)}
          initial="hidden"
          animate="show"
        >
          Last updated: <strong>January 1, 2025</strong>. These terms govern your use of{" "}
          <span className="font-semibold">{t.brand}</span>'s website and services.
        </motion.p>

        {/* Introduction */}
        <motion.div className="mb-10" variants={fadeUp(0.05)} initial="hidden" animate="show">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to Cut X Egypt. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of this demo
            storefront for Cut X protective apparel. Please read them carefully.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              variants={fadeUp(0.04 * i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-[var(--radius-pill)] bg-primary/10 text-primary text-xs font-black shrink-0">
                  {i + 1}
                </span>
                {sec.title}
              </h2>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {sec.body.split("\n\n").map((para, j) => (
                  <p key={j} className="mb-3 last:mb-0">
                    {para.split("\n").map((line, k) => (
                      <span key={k}>
                        {line.split(/\*\*(.*?)\*\*/g).map((chunk, l) =>
                          l % 2 === 1 ? <strong key={l}>{chunk}</strong> : chunk
                        )}
                        {k < para.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
