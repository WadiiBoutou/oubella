"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import TextReveal from "@/components/TextReveal";
import { TextAnimate } from "@/components/ui/text-animate";

const brushSeparators = [
  "/brush_separators/sep1.svg",
  "/brush_separators/sep2.svg",
  "/brush_separators/sep3.svg",
  "/brush_separators/sep4.svg",
] as const;

function BrushDivider({
  separatorIndex,
  topSectionColorVar,
  flip = false,
}: {
  separatorIndex: number;
  topSectionColorVar: string;
  flip?: boolean;
}) {
  const separator = brushSeparators[separatorIndex % brushSeparators.length];

  return (
    <div
      aria-hidden="true"
      className="separator-container pointer-events-none absolute left-0 top-0 z-[20] w-full -translate-y-1/2 leading-none"
    >
      <div
        className="separator-shape h-[48px] w-full sm:h-[64px] md:h-[84px]"
      style={{
        backgroundColor: `var(${topSectionColorVar})`,
        WebkitMaskImage: `url('${separator}')`,
        maskImage: `url('${separator}')`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center top",
        maskPosition: "center top",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        transform: flip ? "scaleX(-1) scaleY(-1)" : "scaleY(-1)",
        transformOrigin: "center",
      }}
    />
    </div>
  );
}

export default function ServicesPageClient() {
  const { t, isRTL } = useLanguage();

  return (
    <main>
      {/* Hero flush to top under fixed nav (no main pt-24) so video sits behind transparent / mix-blend bar like home */}
      {/* Hero Section */}
      <header className="relative min-h-[80vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/argan_oil.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.02 }}
        />
        {/* Feather into next section: bottom must be 100% solid so seam matches bg-surface-container-low (no translucent “gap” line). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(11vh,92px)] min-h-[56px]"
          style={{
            background: `linear-gradient(
              to top,
              var(--color-surface-container-low) 0%,
              color-mix(in srgb, var(--color-surface-container-low) 82%, transparent) 22%,
              color-mix(in srgb, var(--color-surface-container-low) 38%, transparent) 52%,
              color-mix(in srgb, var(--color-surface-container-low) 12%, transparent) 78%,
              transparent 100%
            )`,
          }}
        />
        <div className="relative z-[2] mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center px-4 pt-24 pb-16 text-start sm:px-6 sm:pt-28 sm:pb-20 md:px-12 md:pt-32">
          <div className="max-w-4xl">
            <span className="mb-5 block font-label text-xs uppercase tracking-[0.24em] text-tertiary">
              {t.services.hero.label}
            </span>
            <TextReveal noWrap={false} className="max-w-[min(100%,22ch)] sm:max-w-none">
              <h1 className="mb-6 font-headline font-serif text-4xl font-bold leading-[1.06] tracking-tighter whitespace-normal !text-white sm:text-5xl sm:whitespace-nowrap md:text-7xl">
                {t.services.hero.title}
              </h1>
            </TextReveal>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="max-w-2xl text-base leading-relaxed italic text-surface sm:text-lg md:text-xl"
            >
              {t.services.hero.desc}
            </TextAnimate>
          </div>
        </div>
      </header>

      {/* Section 1: Fast Local Delivery */}
      <section className="relative overflow-hidden bg-surface-container-low py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.02 }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="relative z-[2] grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6 bg-surface-container-lowest p-8 md:p-9 flex flex-col justify-between min-h-[320px] md:min-h-[340px] editorial-shadow text-start">
              <div>
                <span className="material-symbols-outlined text-accent-red text-4xl mb-6">local_shipping</span>
                <div className="mb-4 flex w-full justify-start">
                  <TextReveal>
                    <h2
                      className={`mb-0 font-headline font-serif text-3xl font-bold !text-rich-carbon ${isRTL ? "!text-right" : "!text-start"}`}
                    >
                      {t.services.delivery.title}
                    </h2>
                  </TextReveal>
                </div>
                <TextAnimate
                  as="p"
                  animation="fadeIn"
                  by="word"
                  once
                  className="text-on-surface-variant max-w-md leading-relaxed"
                >
                  {t.services.delivery.desc}
                </TextAnimate>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
                <span className="font-label text-[10px] uppercase tracking-widest text-accent-red">
                  {t.services.delivery.label}
                </span>
              </div>
            </div>

            <div className="md:col-span-6 relative overflow-hidden group self-center h-[340px] md:h-[360px]">
              <Image
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Delivery van in Moroccan street"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQ89CzeqgfulePVaBLoizX9_Ts3EXf2STP7EBTmCEe_iL-ABuDQ2BScO9HNyhtwpzpMH9DcvydTWytxv-xBZwjFj5YQrum9bNKHEADO5zBxlDsY6UoaSYUavpVPlTYWXun-vokT-wvWEHmLLh1bnTcdTmKjHOg2kmWRH19S36NF6iMz52hYfHNQ-NJtrEkx__TWX4osIEPJuWp2QhWo2feWNplTmneKGCtl4SGRVlgGKNzbFDLsXiP3EfW5aDc79qPjKq9FdGttk"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Gift Box Customization */}
      <section className="relative overflow-visible bg-surface pt-24 pb-12">
        <BrushDivider separatorIndex={0} topSectionColorVar="--color-surface-container-low" flip />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.02 }}
        />
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 sm:px-6 md:flex-row md:items-stretch md:gap-16 md:px-12">
          <div className="relative z-[2] md:w-1/2">
            <div className="relative z-10 p-4 bg-surface-container-lowest editorial-shadow">
              <Image
                className="w-full h-auto"
                alt="Artisanal gift box"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJMVQBCBPKzWfxM96rGKiqTAWWRrroS4npznRC0XzWg49ocqLnKF373zZto7ldMBzx_yqgqWNZt8yYwF5SBRsx1LGjUnscHdLJMoANHKAbSwrwEugVkRSLlGZ-kXcLzKbzHRmBGrDMlfKwMfJZnjRPL36kuZb973dUHW_9-N5FObIkQhqRCqJ11f4U-ViRludvkPqkM7R2Kj0dviWEX3kRKgkM8Uz2-tMFcJPT3X6sRufmHSPjXHKDuF3BeG6v9eKBTCCZwUO8ccw"
                width={800}
                height={600}
              />
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/10 -z-0 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-[2] md:w-1/2 text-start">
            <span className="font-label text-xs uppercase tracking-widest text-accent-red mb-4 block">
              {t.services.gifts.label}
            </span>
            <div className="mb-6 flex w-full justify-start">
              <TextReveal>
                <h2
                  className={`mb-0 font-headline font-serif text-4xl font-bold !text-rich-carbon ${isRTL ? "!text-right" : "!text-start"}`}
                >
                  {t.services.gifts.title}
                </h2>
              </TextReveal>
            </div>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-on-surface-variant mb-8 leading-relaxed text-lg"
            >
              {t.services.gifts.desc}
            </TextAnimate>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-accent-red">featured_seasonal_and_gifts</span>
                <span className="font-medium text-on-surface">{t.services.gifts.opt1}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-accent-red">edit_note</span>
                <span className="font-medium text-on-surface">{t.services.gifts.opt2}</span>
              </div>
            </div>
            <button className="mt-10 btn-premium">{t.services.gifts.cta}</button>
          </div>
        </div>
      </section>

      {/* Section 3: Artisanat & Qualite */}
      <section className="relative overflow-visible bg-surface-container-low py-24">
        <BrushDivider separatorIndex={3} topSectionColorVar="--color-surface" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.02 }}
        />
        <div className="container-max relative z-[2] px-4 sm:px-6 md:px-12">
          <div className="text-block-max mb-14 text-center">
            <span className="mb-4 block font-label text-xs uppercase tracking-[0.25em] text-accent-red">
              {t.services.process.label}
            </span>
            <TextReveal>
              <h2 className="mb-0 !text-rich-carbon">{t.services.process.title}</h2>
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.services.process.items.map((item, idx) => (
              <article
                key={idx}
                className="rounded-sm border border-primary-container/15 bg-surface-container-lowest p-8 editorial-shadow text-start"
              >
                <span className="material-symbols-outlined mb-5 text-4xl text-accent-red">{item.icon}</span>
                <h3 className="mb-3 text-2xl !text-rich-carbon">{item.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Partenariats B2B */}
      <section className="relative overflow-visible bg-surface-container-lowest py-24">
        <BrushDivider separatorIndex={2} topSectionColorVar="--color-surface-container-low" flip />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.02 }}
        />
        <div className="text-block-max relative z-[2] px-4 text-center sm:px-6 md:px-12">
          <span className="mb-4 block font-label text-xs uppercase tracking-[0.25em] text-accent-red">
            {t.services.b2b.label}
          </span>
          <TextReveal noWrap={false} className="mx-auto w-full text-center flex justify-center">
            <h2 className="mb-6 !text-rich-carbon mx-auto">{t.services.b2b.title}</h2>
          </TextReveal>
          <TextAnimate
            as="p"
            animation="fadeIn"
            by="word"
            once
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant"
          >
            {t.services.b2b.desc}
          </TextAnimate>
          <Link href="/contact" className="inline-block">
            <button type="button" className="btn-premium">
              {t.services.b2b.cta}
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

