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
    title: "Information We Collect",
    body: `When you use this Cut X Egypt demo storefront, the following may be stored **locally in your own browser only**:\n\n• **Cart contents** and language preference (localStorage).\n• **Demo order reference** for the current session (sessionStorage).\n• **Contact form input** — the demo form does not transmit anywhere.\n\nThere is no backend server in this project, so no personal data leaves your device.`,
  },
  {
    title: "How We Use Your Information",
    body: `Locally stored data is used only to:\n\n• Keep your bag and language choice between visits on the same device.\n• Show the demo order confirmation after a demo checkout.\n\nNo analytics, advertising trackers, or third-party data sharing are built into this storefront.`,
  },
  {
    title: "Sharing of Information",
    body: `We do not sell, trade, or rent personal data. Because there is no backend, there are no service providers receiving your data from this site. When live commerce launches with real payment and shipping providers, this policy will be updated to name them.`,
  },
  {
    title: "Cookies & Tracking",
    body: `This demo uses browser storage (localStorage/sessionStorage) to remember cart contents and language — not third-party cookies. You can clear site data in your browser settings at any time. The cookie banner's preferences apply to these local mechanisms only.`,
  },
  {
    title: "Data Retention",
    body: `Local data stays on your device until you clear it or use the in-app controls (e.g. clearing the bag). No order records are retained anywhere else because no orders are transmitted.`,
  },
  {
    title: "Your Rights",
    body: `Because all demo data lives in your own browser, you can access or delete it at any time by clearing this site's storage. Once official sales channels open, contact details for privacy requests will be published here.`,
  },
  {
    title: "Security",
    body: `Demo sign-in is local-only and unverified — do not reuse real passwords on this site. No payment details are ever requested or processed here.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy as the storefront moves from demo to live commerce. Material changes will be noted by updating the date below.`,
  },
  {
    title: "Contact Us",
    body: `Questions about this policy? Reach Cut X through the official public channels:\n\n**Cut X Egypt**\nInstagram: @cutx_eg\nFacebook: Cut X\n\nNo official support email, phone or address is published yet.`,
  },
];

export default function PrivacyPage() {
  const { t } = useLang();
  useSEO({ title: "Privacy Policy", description: "Cut X Egypt demo privacy policy — local-only data, no backend, no payment processing." });

  return (
    <Layout>
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
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
          Last updated: <strong>January 1, 2025</strong>. This policy applies to all users of{" "}
          <span className="font-semibold">{t.brand}</span>.
        </motion.p>

        {/* Introduction */}
        <motion.div className="mb-10" variants={fadeUp(0.05)} initial="hidden" animate="show">
          <p className="text-muted-foreground leading-relaxed">
            At Cut X Egypt, honesty comes first. This Privacy Policy explains what demo data stays in your browser
            when you use this storefront, and what will change once real commerce launches.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              variants={fadeUp(0.05 * i)}
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
              <div className="text-muted-foreground text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
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
