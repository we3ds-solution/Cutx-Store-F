import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Instagram, Facebook, Globe, Clock, Send, type LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { SuccessCheckArt } from "@/components/empty-state-art";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/contexts/LangContext";
import { useSEO } from "@/lib/useSEO";
import { useToast } from "@/hooks/use-toast";

const INFO_ICONS: Record<string, LucideIcon> = {
  "instagram": Instagram,
  "facebook":  Facebook,
  "globe":     Globe,
  "clock":     Clock,
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

export default function ContactPage() {
  const { t } = useLang();
  const { toast } = useToast();
  const c = t.contact;

  useSEO({
    title: "Contact Us",
    description: "Contact Cut X Egypt — follow the official Instagram and Facebook channels for orders and questions.",
  });

  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast({ title: c.successMsg, description: c.demoOnlyNote });
  };

  return (
    <Layout>
      <PageHero
        badge="Cut X"
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        bgImage="/images/banners/cta.jpg"
        overlayOpacity={0.7}
        light
        className="min-h-[240px] sm:min-h-[280px]"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <motion.div className="lg:col-span-3" variants={fadeUp(0.05)} initial="hidden" animate="show">
            <Card className="border-border/60 shadow-sm">
              <CardContent className="pt-7 pb-7 px-6 sm:px-8">
                <h2 className="text-xl font-bold mb-6">{c.formTitle}</h2>

                {sent ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <SuccessCheckArt width={160} height={160} />
                    <p className="font-semibold text-base">{c.successMsg}</p>
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed demo-strip rounded-[var(--radius-md)] px-3 py-2">
                      {c.demoOnlyNote}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    >
                      {c.sendAnother}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">{c.name}</Label>
                        <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">{c.email}</Label>
                        <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="h-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">{c.subject}</Label>
                      <Input id="subject" name="subject" required value={form.subject} onChange={handleChange} className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">{c.message}</Label>
                      <Textarea id="message" name="message" required value={form.message} onChange={handleChange} rows={5} className="resize-none" placeholder="How can we help?" />
                    </div>
                    <p className="text-xs text-muted-foreground">{c.demoOnlyNote}</p>
                    <Button type="submit" className="w-full h-11 gap-2" disabled={loading}>
                      {loading
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> {c.sending}</>
                        : <><Send className="h-4 w-4" /> {c.send}</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2 space-y-5" variants={fadeUp(0.15)} initial="hidden" animate="show">
            <div>
              <h2 className="text-xl font-bold mb-1">{c.infoTitle}</h2>
              <p className="text-sm text-muted-foreground">{c.infoNote}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {c.info.map((item, i) => {
                const Icon = INFO_ICONS[item.iconId] ?? Globe;
                const href =
                  item.iconId === "instagram"
                    ? "https://www.instagram.com/cutx_eg/"
                    : item.iconId === "facebook"
                      ? "https://www.facebook.com/p/Cut-X-100088062586202/"
                      : undefined;
                const inner = (
                  <>
                    <div className="h-9 w-9 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 break-words">{item.value}</p>
                    </div>
                  </>
                );
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp(0.06 * i)}
                    initial="hidden"
                    animate="show"
                    className="flex gap-3 p-4 rounded-[var(--radius-lg)] border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="flex gap-3 min-w-0">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
