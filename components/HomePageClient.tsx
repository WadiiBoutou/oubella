"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Marquee } from "@/components/Marquee";
import TextReveal from "@/components/TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type PillarVariant = "argan" | "safran" | "amlou" | "honey";

const PILLAR: Record<
  PillarVariant,
  {
    icon: string;
    iconClass: string;
    circleClass: string;
    hoverRadial: string;
    hoverBar: string;
  }
> = {
  argan: {
    icon: "water_drop",
    iconClass: "text-[var(--color-pillar-argan)]",
    circleClass:
      "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-pillar-argan)_38%,transparent),color-mix(in_srgb,var(--color-pillar-argan)_12%,transparent))] border-[color-mix(in_srgb,var(--color-pillar-argan)_35%,transparent)] shadow-[0_10px_28px_color-mix(in_srgb,var(--color-pillar-argan)_32%,transparent)]",
    hoverRadial:
      "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-pillar-argan)_35%,transparent),transparent_58%)]",
    hoverBar:
      "from-[color-mix(in_srgb,var(--color-pillar-argan)_55%,transparent)] via-[color-mix(in_srgb,var(--color-pillar-argan)_22%,transparent)] to-accent-indigo/25",
  },
  safran: {
    icon: "local_florist",
    iconClass: "text-primary",
    circleClass:
      "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-primary)_38%,transparent),color-mix(in_srgb,var(--color-accent-red)_15%,transparent))] border-primary/45 shadow-[0_10px_28px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]",
    hoverRadial:
      "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_38%,transparent),transparent_58%)]",
    hoverBar: "from-primary/70 via-accent-red/35 to-primary/20",
  },
  amlou: {
    icon: "breakfast_dining",
    iconClass: "text-[var(--color-pillar-amlou)]",
    circleClass:
      "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-pillar-amlou)_40%,transparent),color-mix(in_srgb,var(--color-pillar-amlou)_12%,transparent))] border-[color-mix(in_srgb,var(--color-pillar-amlou)_45%,transparent)] shadow-[0_10px_28px_color-mix(in_srgb,var(--color-pillar-amlou)_32%,transparent)]",
    hoverRadial:
      "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-pillar-amlou)_38%,transparent),transparent_58%)]",
    hoverBar:
      "from-[color-mix(in_srgb,var(--color-pillar-amlou)_60%,transparent)] via-[color-mix(in_srgb,var(--color-tertiary)_28%,transparent)] to-accent-indigo/20",
  },
  honey: {
    icon: "hive",
    iconClass: "text-[var(--color-pillar-honey)]",
    circleClass:
      "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-tertiary)_42%,transparent),color-mix(in_srgb,var(--color-pillar-honey)_18%,transparent))] border-[color-mix(in_srgb,var(--color-pillar-honey)_50%,transparent)] shadow-[0_10px_28px_color-mix(in_srgb,var(--color-pillar-honey)_35%,transparent)]",
    hoverRadial:
      "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-pillar-honey)_40%,transparent),transparent_58%)]",
    hoverBar:
      "from-[color-mix(in_srgb,var(--color-pillar-honey)_65%,transparent)] via-tertiary/35 to-accent-indigo/20",
  },
};

const ProductPillarCard = ({
  title,
  desc,
  variant,
}: {
  title: string;
  desc: string;
  variant: PillarVariant;
}) => {
  const s = PILLAR[variant];
  return (
    <div className="group relative bg-surface-container-lowest p-6 sm:p-8 md:p-10 editorial-shadow rounded-sm flex flex-col items-start text-start transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-outline-variant/5 overflow-hidden">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${s.hoverRadial}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r ${s.hoverBar} transform scale-x-0 group-hover:scale-x-100 origin-start rtl:origin-end transition-transform duration-500`}
      />

      <div
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 border ${s.circleClass}`}
      >
        <span className={`material-symbols-outlined text-3xl ${s.iconClass}`}>{s.icon}</span>
      </div>
      <h3 className="relative z-10 mb-2 font-headline text-xl sm:text-[1.35rem] font-bold leading-tight !text-rich-carbon">{title}</h3>
      <p className="relative z-10 text-on-surface-variant text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const ReviewCard = ({
  name,
  role,
  body,
  rating,
}: {
  name: string;
  role: string;
  body: string;
  rating: number;
}) => (
  <div className="relative flex h-full min-h-[200px] w-[min(100%,280px)] shrink-0 flex-col justify-between p-5 sm:w-[300px] sm:p-6 bg-surface-container-lowest rounded-sm border border-primary-container/20 overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-tertiary)_22%,transparent),transparent_60%)]"
    />
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-tertiary text-xs"
          style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}` }}
        >
          star
        </span>
      ))}
    </div>
    <p className="relative z-10 text-on-surface-variant italic mb-6 text-sm flex-grow">
      &ldquo;{body}&rdquo;
    </p>
    <div className="relative z-10 border-t border-primary/10 pt-4 text-start">
      <p className="font-headline font-bold text-rich-carbon text-sm leading-none mb-1">
        {name}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-accent-red font-bold">{role}</p>
    </div>
  </div>
);

export default function HomePageClient() {
  const { t, lang, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for general elements
      gsap.utils
        .toArray<HTMLElement>(".reveal:not(.text-reveal-target)")
        .forEach((elem) => {
          gsap.fromTo(elem, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

      // Mosaic timeline progress + dots
      const timelineSection = containerRef.current?.querySelector(
        ".mosaic-timeline-section"
      ) as HTMLElement | null;
      const progressEl = containerRef.current?.querySelector(
        ".mosaic-timeline-progress"
      ) as HTMLElement | null;

      if (timelineSection && progressEl) {
        const items = gsap.utils.toArray<HTMLElement>(".mosaic-timeline-item", timelineSection);
        const dotFills = items
          .map((item) => item.querySelector<HTMLElement>(".mosaic-timeline-dot-fill"))
          .filter(Boolean) as HTMLElement[];

        // Dot fill "circle" sits inside a wrapper. Use the wrapper for geometry, because
        // the inner dot is scaled to 0 initially.
        const dotWrappers = dotFills.map((dotFill) => dotFill.parentElement as HTMLElement | null);
        if (dotWrappers.some((w) => !w)) return;

        let maxHeightPx = 0;
        let dotThresholdsPx: number[] = [];
        const filled = new Array(dotFills.length).fill(false);

        const measure = () => {
          const timelineRect = timelineSection.getBoundingClientRect();
          // Use the progress element's actual top as the geometry reference.
          // This prevents tiny layout offsets (padding/borders) from desyncing
          // the bar "touch" moment from the circle fill moment.
          const barTop = progressEl.getBoundingClientRect().top;
          maxHeightPx = Math.max(1, timelineRect.bottom - barTop);

          dotThresholdsPx = (dotWrappers as HTMLElement[]).map((wrapper) => {
            const r = wrapper.getBoundingClientRect();
            const centerY = r.top + r.height / 2 - barTop;
            return centerY;
          });
        };

        const applyByProgress = (progress: number, animate: boolean) => {
          const clamped = Math.min(1, Math.max(0, progress));
          const barHeightPx = clamped * maxHeightPx;

          // IMPORTANT: set bar height in pixels (not %) so it matches the same
          // geometry we measure for the circle fill thresholds.
          progressEl.style.height = `${Math.max(0, Math.min(maxHeightPx, barHeightPx))}px`;

          dotFills.forEach((dotFill, idx) => {
            const shouldFill = barHeightPx >= dotThresholdsPx[idx];
            if (shouldFill && !filled[idx]) {
              filled[idx] = true;
              if (animate) {
                gsap.to(dotFill, { scale: 1, ease: "power3.out", duration: 0.35 });
              } else {
                gsap.set(dotFill, { scale: 1 });
              }
            } else if (!shouldFill && filled[idx]) {
              filled[idx] = false;
              if (animate) {
                gsap.to(dotFill, { scale: 0, ease: "power3.out", duration: 0.2 });
              } else {
                gsap.set(dotFill, { scale: 0 });
              }
            }
          });
        };

        // Initialize
        gsap.set(progressEl, { height: 0 });
        dotFills.forEach((dotFill) => gsap.set(dotFill, { scale: 0 }));
        measure();

        ScrollTrigger.create({
          trigger: timelineSection,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
          onRefresh: (self) => {
            measure();
            // Keep state deterministic after refresh/resize: reset and apply instantly.
            filled.fill(false);
            dotFills.forEach((dotFill) => gsap.set(dotFill, { scale: 0 }));
            applyByProgress(self.progress, false);
          },
          onUpdate: (self) => {
            applyByProgress(self.progress, true);
          },
        });
      }

      // Mosaic images
      gsap.utils.toArray<HTMLElement>(".mosaic-img").forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
            },
          }
        );
      });
    }, containerRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  // Split testimonials into two rows
  const half = Math.ceil(t.testimonials.items.length / 2);
  const row1 = t.testimonials.items.slice(0, half);
  const row2 = t.testimonials.items.slice(half);

  const mosaicItems = [
    {
      src: "/images/products/argan.webp",
      title: { fr: "Huile d'Argan", ar: "زيت الأركان" },
      desc: { fr: "Pressée à froid, pure et riche en vitamine E.", ar: "معصورة على البارد، نقية وغنية بفيتامين E." },
    },
    {
      src: "/images/products/safran.webp",
      title: { fr: "Safran de Taliouine", ar: "زعفران تاليوين" },
      desc: { fr: "Arôme intense, récolté à l'aube fleur par fleur.", ar: "رائحة قوية، يُجنى فجراً زهرةً زهرة." },
    },
    {
      src: "/images/products/amlou.webp",
      title: { fr: "Amlou Royal", ar: "أملو ملكي" },
      desc: { fr: "Amandes grillées, miel et argan — texture soyeuse.", ar: "لوز محمص، عسل وأركان — قوام مخملي." },
    },
    {
      src: "/images/products/honey.webp",
      title: { fr: "Miel Sauvage", ar: "عسل بري" },
      desc: { fr: "Notes florales profondes, récolte artisanale.", ar: "نفحات زهرية عميقة، حصاد تقليدي." },
    },
    {
      src: "/images/products/blacksoap.webp",
      title: { fr: "Savon Noir", ar: "صابون بلدي" },
      desc: { fr: "Rituel du hammam, exfoliation douce et efficace.", ar: "طقس الحمام المغربي، تقشير لطيف وفعّال." },
    },
    {
      src: "/images/products/rosewater.webp",
      title: { fr: "Eau de Rose", ar: "ماء الورد" },
      desc: { fr: "Fraîcheur délicate, tonifie et illumine.", ar: "انتعاش لطيف، ينشّط ويمنح إشراقة." },
    },
  ] as const;

  return (
    <div ref={containerRef} className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="Cinematic Moroccan Landscape"
            className="w-full h-full object-cover contrast-[1.02] saturate-[1.05]"
            src="/images/hero.webp"
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,color-mix(in_srgb,var(--color-tertiary)_28%,transparent),transparent_55%)] opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-rich-carbon)_10%,transparent),color-mix(in_srgb,var(--color-rich-carbon)_55%,transparent))] opacity-70" />
          <div aria-hidden="true" className="absolute inset-0 grain-overlay" />
        </div>
        <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6 container-max">
          {/* Mini-Logo Header as per reference */}
          <div className="reveal mb-8">
            <img src={t.common.logo} alt="Mini-Logo" className="h-14 w-14 grayscale-0 brightness-110 drop-shadow-[0_15px_30px_color-mix(in_srgb,var(--color-rich-carbon)_50%,transparent)] sm:h-16 sm:w-16" />
          </div>

          <div className="relative flex flex-col items-center mb-10">
            <div className="absolute inset-0 blur-3xl bg-black/50 scale-[1.5] rounded-full pointer-events-none" aria-hidden="true" />
            {t.hero.title.map((line, i) => (
              <div key={i} className={i === 0 ? "relative z-10 mb-4 md:mb-6" : "relative z-10"}>
                <TextReveal delay={i * 0.2}>
                  <h1 className="text-white font-headline text-[clamp(2rem,9vw,6rem)] font-bold tracking-tight !text-white mb-0 inline-block leading-[1.12] md:text-8xl md:leading-[1.18] [text-shadow:_0_4px_30px_rgba(0,0,0,0.8),_0_2px_10px_rgba(0,0,0,0.6)] pb-[0.08em] pt-[0.04em]">
                    {line}
                  </h1>
                </TextReveal>
              </div>
            ))}
          </div>

          <div className="reveal mt-4">
            <Link href="/gallery" className="inline-block">
              <button className="btn-premium px-8 py-4 text-xs tracking-[0.25em] uppercase bg-hero-cta border-white/5 font-bold text-tertiary transition-all hover:bg-rich-carbon sm:px-12 sm:py-5 sm:text-sm sm:tracking-[0.3em]">
                {t.hero.cta}
              </button>
            </Link>
          </div>

          {/* Trust strip (premium micro-credibility) */}
          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            {t.trust.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                <span
                  className="material-symbols-outlined text-[18px] text-tertiary opacity-90 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/90 group-hover:text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-accent-indigo/[0.05] py-2 border-y border-outline-variant/10" dir="ltr">
        <Marquee pauseOnHover reverse={isRTL} className="[--duration:40s]">
          {t.marquee.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4 py-1">
              <span className="material-symbols-outlined text-tertiary text-[10px]">verified</span>
              <span className="font-sans font-medium text-xs text-accent-indigo whitespace-nowrap uppercase tracking-[0.2em]">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* SECTION 1 - THE STORY */}
      <section className="relative bg-primary-container section-padding text-surface">
        {/* Background depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--color-tertiary)_28%,transparent),transparent_45%)] opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grain-overlay" />
        <div className="container-max grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative z-10 space-y-8 text-start">
            <TextReveal delay={0.1}>
              <span className="font-label text-xs uppercase tracking-[0.4em] text-tertiary font-bold">{t.story.label}</span>
            </TextReveal>
            <div className="space-y-1">
              {t.story.title.map((line, i) => (
                <div key={i}>
                  <TextReveal delay={0.25 + i * 0.15}>
                    <h2 className="text-white text-start italic mb-0 !text-white leading-tight">{line}</h2>
                  </TextReveal>
                </div>
              ))}
            </div>
            <p className="reveal text-surface/90 font-light lg:mb-12">
              {t.story.desc}
            </p>
            <div className="reveal pt-4">
              {/* CTA frame */}
              <div className="mb-6 h-px w-20 bg-accent-red/40" aria-hidden="true" />
              <Link href="/gallery" className="inline-block">
                <button type="button" className="btn-premium">
                  {t.hero.cta}
                </button>
              </Link>
            </div>
          </div>
          <div className="relative z-10 group">
            <div className="reveal aspect-[4/5] overflow-hidden rounded-sm shadow-2xl skew-y-1">
              <img alt="Women Cooperative" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" src="/images/woman_amlou.webp" />
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-tertiary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - PRODUCT PILLARS */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-16 text-start">
            <div className="reveal inline-flex items-center gap-3">
              <span className="font-label text-xs uppercase tracking-[0.4em] text-accent-red font-bold">
                {t.story.label}
              </span>
              <span className="h-px w-10 bg-outline-variant/40" aria-hidden="true" />
            </div>
            <TextReveal>
              <h2 className="mt-6 mb-0 text-start font-headline text-3xl font-bold !text-rich-carbon text-rich-carbon sm:text-4xl md:text-5xl">
                {t.nav.huiles}
              </h2>
            </TextReveal>
            <div className="reveal w-24 h-px bg-accent-red/40 mt-6" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductPillarCard title={t.pillars[0].title} desc={t.pillars[0].desc} variant="argan" />
            <ProductPillarCard title={t.pillars[1].title} desc={t.pillars[1].desc} variant="safran" />
            <ProductPillarCard title={t.pillars[2].title} desc={t.pillars[2].desc} variant="amlou" />
            <ProductPillarCard title={t.pillars[3].title} desc={t.pillars[3].desc} variant="honey" />
          </div>
        </div>
      </section>

      {/* SECTION 3 - REGIONAL ORIGINS */}
      <section className="relative overflow-hidden section-padding text-white bg-primary-container/95">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/patterns/pattern.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "150px 150px",
            opacity: 0.08,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,color-mix(in_srgb,var(--color-rich-carbon)_55%,transparent)_95%),radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--color-surface)_35%,transparent),transparent_58%),radial-gradient(circle_at_78%_82%,color-mix(in_srgb,var(--color-tertiary)_6%,transparent),transparent_62%),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-rich-carbon)_52%,transparent),color-mix(in_srgb,var(--color-rich-carbon)_58%,transparent))]"
          style={{ boxShadow: "var(--shadow-inset-ambient)" }}
        />
        <div className="container-max relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-14 items-center">
          <div className="lg:w-1/2 reveal order-2 lg:order-1 rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-[2px] p-4 md:p-5">
            <img src="/images/sous_massa.webp" alt="Souss-Massa" className="w-full h-auto rounded-sm object-cover" />
          </div>
          <div className="lg:w-1/2 space-y-12 text-start order-1 lg:order-2 rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-[2px] p-6 md:p-8">
            <TextReveal>
              <h2 className="text-white text-start mb-0 !text-white">{t.origins.title}</h2>
            </TextReveal>
            <div className="reveal w-20 h-px bg-tertiary mb-12"></div>
            <div className="space-y-12 relative">
              {/* Timeline spine */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute ${
                  isRTL ? "right-5" : "left-5"
                } top-4 bottom-4 w-px bg-tertiary/25`}
              />
              {t.origins.regions.map((region, idx) => (
                <div
                  key={idx}
                  className={`group relative transition-all duration-500 pl-10 rtl:pl-0 rtl:pr-10`}
                >
                  {/* Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute ${
                      isRTL ? "right-0" : "left-0"
                    } top-0 w-10 h-10 rounded-full bg-primary-container/40 border border-tertiary/30 flex items-center justify-center shadow-[0_0_0_rgba(0,0,0,0)] group-hover:border-tertiary/70 transition-colors duration-500`}
                  >
                    <span className="font-headline font-bold text-sm text-tertiary">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Connector notch */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-[18px] h-px w-12 ${
                      isRTL ? "right-4" : "left-4"
                    } bg-tertiary/20 group-hover:bg-tertiary/50 transition-colors duration-500`}
                  />

                  <TextReveal delay={idx * 0.15}>
                    <h3 className="text-white mb-0 !text-white">{region.name}</h3>
                  </TextReveal>
                  <p className="reveal text-tertiary text-sm uppercase tracking-widest">{region.flavor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - THE PROCESS */}
      <section className="section-padding bg-surface-container-high/30">
        <div className="container-max">
          <div className="text-block-max mb-16 px-4">
            <TextReveal>
              <h2 className="text-rich-carbon tracking-tighter mb-0 !text-rich-carbon">{t.process.title}</h2>
            </TextReveal>
            <div className="reveal w-24 h-1 bg-accent-red mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div
              className="hidden md:block absolute top-[46px] left-0 w-full h-px -z-0 bg-gradient-to-r from-accent-red/0 via-accent-red/30 via-tertiary/30 to-accent-indigo/0"
              aria-hidden="true"
            />
            {t.process.steps.map((step, idx) => (
              <div key={idx} className="group flex flex-col items-center transition-transform duration-500">
                <div
                  className="reveal relative z-10 w-20 h-20 rounded-full bg-surface-container-lowest editorial-shadow flex items-center justify-center mb-8 border border-tertiary/20 transition-all duration-500 group-hover:shadow-2xl group-hover:border-tertiary/40 group-hover:scale-[1.05] overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-tertiary)_35%,transparent),transparent_60%)]"
                  />
                  <span className="relative z-10 text-2xl font-headline text-tertiary transition-colors duration-300 group-hover:text-rich-carbon">
                    0{idx + 1}
                  </span>
                </div>
                <div className="mb-4">
                  <TextReveal delay={idx * 0.15}>
                    <h3 className="text-rich-carbon text-center mb-0 !text-rich-carbon">{step.label}</h3>
                  </TextReveal>
                </div>
                <p className="reveal text-on-surface-variant text-center text-sm transition-all duration-500 group-hover:text-on-surface-variant/95">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - RITUALS */}
      <section className="relative overflow-hidden section-padding bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/patterns/pattern3.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "170px 170px",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/55 via-transparent to-surface/55 z-[1]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grain-overlay" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            boxShadow: "var(--shadow-ritual-frame)",
          }}
        />
        <div className="container-max relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
          <div className="space-y-8 text-start lg:w-1/2 lg:space-y-10 rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-6 md:p-10 editorial-shadow">
            <TextReveal>
              <h2 className="mb-0 text-start font-headline !text-rich-carbon leading-tight text-rich-carbon text-2xl sm:text-3xl md:text-4xl">
                {t.ritual.magazine.title}
              </h2>
            </TextReveal>
            <div className="reveal mb-6 h-px w-20 bg-accent-indigo lg:mb-8"></div>
            <p className="reveal mb-6 font-sans font-medium text-base italic leading-relaxed text-on-surface-variant sm:mb-8 sm:text-lg md:text-xl">
              {t.ritual.magazine.desc}
            </p>
            <ul className="space-y-5 lg:mb-12">
              {t.ritual.benefits.map((benefit, idx) => (
                <li key={idx} className="reveal group flex items-start gap-4">
                  <div className="mt-0.5 w-9 h-9 rounded-full bg-accent-indigo/10 border border-outline-variant/20 flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-tertiary/60 group-hover:bg-accent-indigo/15">
                    <span
                      className="material-symbols-outlined text-accent-red text-[18px] opacity-90 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      verified
                    </span>
                  </div>
                  <span className="text-secondary font-medium tracking-tight uppercase text-xs pt-0.5 group-hover:text-white/90 transition-colors duration-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <div className="reveal pt-4">
              <button className="btn-indigo uppercase">Découvrir le rituel</button>
            </div>
          </div>
          <div className="lg:w-1/2 group rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-4 md:p-5 editorial-shadow">
            <div className="reveal relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-outline-variant/10 bg-surface-container-lowest">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-indigo/15 via-transparent to-black/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-70 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--color-tertiary)_30%,transparent),transparent_55%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-8 w-28 h-28 bg-tertiary/10 rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <img
                alt="Product"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXc15FUTFbO17RLwPcRWiIfG_GUEY2ePQwhqPD8XcKy_RU4OGHyH9Kb38tL4dJvuOUTdAzFP4f_McwoAJI7hbRqQ-9avdJnfJoLL8TS_LkVezlWncs5riBsZ0T6oS6_-fGiE4c3CjITWJ1nKuEiINxO8ddZ3p2P2AXq9VVRJT3VRFWoRPAwQmg5QKkyNxf-4hu2LYiiQEYn0JTreaEbyTP_22ReC4zajb7FjEnrtzoRGUhJdpbYeb5Bkh84ttjpVKUwVHQU3XFIxk"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - VISUAL MOSAIC */}
      <section className="relative overflow-hidden section-padding bg-surface-container-high/20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grain-overlay" />
        <div className="container-max relative z-10">
          <div className="text-block-max mb-16 text-center md:mb-24">
            <TextReveal>
              <h2 className="text-rich-carbon mb-0 !text-rich-carbon">{t.gallery.title}</h2>
            </TextReveal>
            <div className="reveal mx-auto mt-6 h-1 w-20 bg-tertiary md:w-24"></div>
          </div>

          <div className="mosaic-timeline-section relative">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-outline-variant/30 md:block" />
            <div className="pointer-events-none absolute left-1/2 top-0 hidden w-px -translate-x-1/2 origin-top bg-tertiary mosaic-timeline-progress md:block" />

            <div className="space-y-20 md:space-y-28">
              {mosaicItems.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const title = item.title[lang];
                const desc = item.desc[lang];

                const imageBlock = (
                  <div className="reveal">
                    <div className="mosaic-img overflow-hidden rounded-sm editorial-shadow border border-outline-variant/10">
                      <img
                        src={item.src}
                        alt={title}
                        className="h-[220px] w-full rounded-sm object-cover grayscale-[15%] transition-all duration-700 hover:grayscale-0 sm:h-[280px] md:h-[420px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );

                const textBlock = (
                  <div className={`reveal ${isRTL ? "text-right" : "text-left"} space-y-3`}>
                    <div className="inline-flex items-center gap-3">
                      <span className="font-label text-[10px] uppercase tracking-[0.35em] text-accent-red font-bold">
                        {lang === "fr" ? "Sélection" : "مختارات"}
                      </span>
                      <span className="h-px w-10 bg-outline-variant/40" />
                    </div>
                    <h3 className="mb-0 font-headline text-xl text-rich-carbon !text-rich-carbon sm:text-2xl md:text-3xl">{title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">{desc}</p>
                  </div>
                );

                return (
                  <div
                    key={item.src}
                    className="mosaic-timeline-item relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14"
                  >
                    {/* Mobile: keep one clear sequence per item (text then image), no alternating columns. */}
                    <div className="min-w-0 space-y-5 md:hidden">
                      {textBlock}
                      {imageBlock}
                    </div>

                    {/* Desktop/tablet: keep alternating timeline layout. */}
                    <div className="hidden min-w-0 md:block md:pr-10 lg:pr-12">
                      {isEven ? imageBlock : textBlock}
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/40 bg-surface">
                        <div className="h-4 w-4 origin-center scale-0 rounded-full bg-tertiary mosaic-timeline-dot-fill" />
                      </div>
                    </div>

                    <div className="hidden min-w-0 md:block md:pl-10 lg:pl-12">
                      {isEven ? textBlock : imageBlock}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="reveal mt-20 text-center sm:mt-32">
            <Link href="/gallery" className="inline-block">
              <button type="button" className="btn-premium uppercase text-primary-container">
                {t.gallery.cta}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 - TESTIMONIALS (Grid Marquee) */}
      <section className="section-padding overflow-hidden bg-surface border-t border-accent-red/10 flex flex-col">
        <div className="container-max mb-12 text-center">
          <TextReveal>
            <h2 className="text-rich-carbon mb-0 !text-rich-carbon">{t.testimonials.title}</h2>
          </TextReveal>
          <div className="reveal w-16 h-1 bg-accent-red mx-auto mt-4"></div>
        </div>

        <div className="relative flex flex-col -space-y-px">
          <Marquee pauseOnHover reverse={isRTL} className="[--duration:60s] [--gap:0px]">
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <ReviewCard key={`r1-${idx}`} {...item} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse={!isRTL} className="[--duration:45s] [--gap:0px] -mt-px relative z-10">
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <ReviewCard key={`r2-${idx}`} {...item} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-surface to-transparent sm:w-24 md:w-32"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-surface to-transparent sm:w-24 md:w-32"></div>
        </div>
      </section>
    </div>
  );
}

