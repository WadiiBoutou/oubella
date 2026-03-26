'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Marquee } from '@/components/Marquee';
import TextReveal from '@/components/TextReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link'; // Added Link import
import { NumberTicker } from '@/components/ui/number-ticker';
import { translations } from '@/i18n/translations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProductPillarCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <div className="group bg-surface-container-lowest p-10 editorial-shadow rounded-sm flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-outline-variant/5">
    <div className="w-16 h-16 rounded-full bg-accent-indigo/10 flex items-center justify-center mb-6 text-on-secondary-fixed transition-transform duration-500 group-hover:scale-110">
      <span className="material-symbols-outlined text-3xl text-accent-indigo">{icon}</span>
    </div>
    <h3 className="mb-4 text-rich-carbon">{title}</h3>
    <p className="text-on-surface-variant mb-6">{desc}</p>
  </div>
);

const ReviewCard = ({ name, role, body, rating }: { name: string; role: string; body: string; rating: number }) => (
  <div className="flex flex-col justify-between w-[300px] p-6 bg-surface-container-lowest rounded-none border border-primary-container/20 h-full relative group">
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}` }}>star</span>
      ))}
    </div>
    <p className="text-on-surface-variant italic mb-6 text-sm flex-grow">
      &ldquo;{body}&rdquo;
    </p>
    <div className="border-t border-primary/10 pt-4 text-start">
      <p className="font-headline font-bold text-rich-carbon text-sm leading-none mb-1">{name}</p>
      <p className="text-[10px] uppercase tracking-widest text-accent-red font-bold">{role}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const { t, lang, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for general elements
      gsap.utils.toArray<HTMLElement>('.reveal:not(.text-reveal-target)').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Mosaic timeline progress + dots
      const timelineSection = containerRef.current?.querySelector('.mosaic-timeline-section') as HTMLElement | null;
      const progressEl = containerRef.current?.querySelector('.mosaic-timeline-progress') as HTMLElement | null;
      if (timelineSection && progressEl) {
        gsap.set(progressEl, { height: 0 });
        ScrollTrigger.create({
          trigger: timelineSection,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: true,
          onUpdate: (self) => {
            progressEl.style.height = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('.mosaic-timeline-item').forEach((item) => {
        const dot = item.querySelector<HTMLElement>('.mosaic-timeline-dot-fill');
        if (!dot) return;
        gsap.set(dot, { scale: 0 });
        gsap.to(dot, {
          scale: 1,
          ease: 'power3.out',
          duration: 0.35,
          scrollTrigger: {
            trigger: item,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Mosaic images
      gsap.utils.toArray<HTMLElement>('.mosaic-img').forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
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
      src: '/images/products/argan.webp',
      title: { fr: "Huile d'Argan", ar: 'زيت الأركان' },
      desc: { fr: 'Pressée à froid, pure et riche en vitamine E.', ar: 'معصورة على البارد، نقية وغنية بفيتامين E.' },
    },
    {
      src: '/images/products/safran.webp',
      title: { fr: 'Safran de Taliouine', ar: 'زعفران تاليوين' },
      desc: { fr: "Arôme intense, récolté à l'aube fleur par fleur.", ar: 'رائحة قوية، يُجنى فجراً زهرةً زهرة.' },
    },
    {
      src: '/images/products/amlou.webp',
      title: { fr: 'Amlou Royal', ar: 'أملو ملكي' },
      desc: { fr: "Amandes grillées, miel et argan — texture soyeuse.", ar: 'لوز محمص، عسل وأركان — قوام مخملي.' },
    },
    {
      src: '/images/products/honey.webp',
      title: { fr: 'Miel Sauvage', ar: 'عسل بري' },
      desc: { fr: 'Notes florales profondes, récolte artisanale.', ar: 'نفحات زهرية عميقة، حصاد تقليدي.' },
    },
    {
      src: '/images/products/blacksoap.webp',
      title: { fr: 'Savon Noir', ar: 'صابون بلدي' },
      desc: { fr: 'Rituel du hammam, exfoliation douce et efficace.', ar: 'طقس الحمام المغربي، تقشير لطيف وفعّال.' },
    },
    {
      src: '/images/products/rosewater.webp',
      title: { fr: 'Eau de Rose', ar: 'ماء الورد' },
      desc: { fr: 'Fraîcheur délicate, tonifie et illumine.', ar: 'انتعاش لطيف، ينشّط ويمنح إشراقة.' },
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
            src="/hero.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 opacity-90"></div>
        </div>
        <div className="relative z-10 text-center px-6 container-max flex flex-col items-center">
          {/* Mini-Logo Header as per reference */}
          <div className="reveal mb-8">
            <img src={t.common.logo} alt="Mini-Logo" className="w-16 h-16 grayscale-0 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] brightness-110" />
          </div>

          <div className="flex flex-col items-center mb-10">
            {t.hero.title.map((line, i) => (
              <div key={i} className={i === 0 ? 'mb-2' : ''}>
                <TextReveal delay={i * 0.2}>
                  <h1 className="text-white font-headline text-5xl md:text-8xl font-bold tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] !text-white mb-0 inline-block uppercase">
                    {line}
                  </h1>
                </TextReveal>
              </div>
            ))}
          </div>

          <div className="reveal mt-4">
            <Link href="/gallery" className="inline-block">
              <button className="btn-premium px-12 py-5 text-sm tracking-[0.3em] uppercase bg-[#1A2634] border-white/5 hover:bg-black transition-all text-tertiary font-bold">
                {t.hero.cta}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-accent-indigo/[0.05] py-2 border-y border-outline-variant/10" dir="ltr">
        <Marquee pauseOnHover className="[--duration:40s]">
          {translations.fr.marquee.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4 py-1">
              <span className="material-symbols-outlined text-tertiary text-[10px]">verified</span>
              <span className="font-headline text-xs text-accent-indigo whitespace-nowrap uppercase tracking-[0.2em]">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* SECTION 1 - PRODUCT PILLARS */}
      <section className="section-padding container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductPillarCard title={t.pillars[0].title} desc={t.pillars[0].desc} icon="water_drop" />
          <ProductPillarCard title={t.pillars[1].title} desc={t.pillars[1].desc} icon="local_florist" />
          <ProductPillarCard title={t.pillars[2].title} desc={t.pillars[2].desc} icon="breakfast_dining" />
          <ProductPillarCard title={t.pillars[3].title} desc={t.pillars[3].desc} icon="eco" />
        </div>
      </section>

      {/* SECTION 2 - THE STORY */}
      <section className="bg-primary-container section-padding text-surface">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8 text-start">
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
            <p className="reveal text-surface/80 font-light lg:mb-12">
              {t.story.desc}
            </p>
            <div className="reveal pt-4">
              <button className="btn-premium">{t.hero.cta}</button>
            </div>
          </div>
          <div className="relative group">
            <div className="reveal aspect-[4/5] overflow-hidden rounded-sm shadow-2xl skew-y-1">
              <img alt="Women Cooperative" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" src="/images/woman_amlou.webp" />
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-tertiary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - THE PROCESS */}
      <section className="section-padding bg-surface-container-high/30">
        <div className="container-max">
          <div className="text-block-max mb-16 px-4">
            <TextReveal>
              <h2 className="text-rich-carbon tracking-tighter mb-0 !text-rich-carbon">{t.process.title}</h2>
            </TextReveal>
            <div className="reveal w-24 h-1 bg-accent-red mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-px bg-primary/10 -z-0"></div>
            {t.process.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="reveal relative z-10 w-20 h-20 rounded-full bg-surface-container-lowest editorial-shadow flex items-center justify-center mb-8 border border-tertiary/20">
                  <span className="text-2xl font-headline text-tertiary">0{idx + 1}</span>
                </div>
                <div className="mb-4">
                  <TextReveal delay={idx * 0.15}>
                    <h3 className="text-rich-carbon text-center mb-0 !text-rich-carbon">{step.label}</h3>
                  </TextReveal>
                </div>
                <p className="reveal text-on-surface-variant text-center text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - REGIONAL ORIGINS */}
      <section className="section-padding bg-primary-container/95 text-white">
        <div className="container-max flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2 reveal order-2 lg:order-1">
            <img src="/images/sous_massa.webp" alt="Souss-Massa" className="w-full h-auto rounded-sm object-cover" />
          </div>
          <div className="lg:w-1/2 space-y-12 text-start order-1 lg:order-2">
            <TextReveal>
              <h2 className="text-white text-start mb-0 !text-white">{t.origins.title}</h2>
            </TextReveal>
            <div className="reveal w-20 h-px bg-tertiary mb-12"></div>
            <div className="space-y-12">
              {t.origins.regions.map((region, idx) => (
                <div key={idx} className="border-l-2 border-tertiary pl-10 rtl:border-l-0 rtl:border-r-2 rtl:pr-10">
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

      {/* SECTION 5 - RITUALS */}
      <section className="section-padding bg-surface">
        <div className="container-max flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2 space-y-10 text-start">
            <TextReveal>
              <h2 className="text-rich-carbon text-start mb-0 !text-rich-carbon leading-tight">{t.ritual.magazine.title}</h2>
            </TextReveal>
            <div className="reveal w-20 h-px bg-accent-indigo mb-8"></div>
            <p className="reveal text-xl text-on-surface-variant italic font-headline leading-relaxed mb-8">
              {t.ritual.magazine.desc}
            </p>
            <ul className="space-y-6 lg:mb-12">
              {t.ritual.benefits.map((benefit, idx) => (
                <li key={idx} className="reveal flex items-center gap-6">
                  <div className="w-2 h-2 rounded-full bg-accent-indigo shrink-0"></div>
                  <span className="text-secondary font-medium tracking-tight uppercase text-xs">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="reveal pt-4">
              <button className="btn-indigo uppercase">Découvrir le rituel</button>
            </div>
          </div>
          <div className="lg:w-1/2 group">
            <div className="reveal relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <img alt="Product" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXc15FUTFbO17RLwPcRWiIfG_GUEY2ePQwhqPD8XcKy_RU4OGHyH9Kb38tL4dJvuOUTdAzFP4f_McwoAJI7hbRqQ-9avdJnfJoLL8TS_LkVezlWncs5riBsZ0T6oS6_-fGiE4c3CjITWJ1nKuEiINxO8ddZ3p2P2AXq9VVRJT3VRFWoRPAwQmg5QKkyNxf-4hu2LYiiQEYn0JTreaEbyTP_22ReC4zajb7FjEnrtzoRGUhJdpbYeb5Bkh84ttjpVKUwVHQU3XFIxk" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - TRUST BAR */}
      <section className="bg-primary/5 section-padding border-y border-outline-variant/10">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-stretch">
            <div className="reveal bg-surface-container-lowest editorial-shadow border border-outline-variant/10 rounded-sm p-10 text-center">
              <div className="flex items-end justify-center gap-2">
                <NumberTicker value={100} className="font-headline text-6xl md:text-7xl tracking-tight !text-rich-carbon" />
                <span className="font-headline text-3xl md:text-4xl text-rich-carbon mb-1">%</span>
              </div>
              <div className="reveal w-12 h-px bg-accent-red mx-auto mt-6 mb-4" />
              <p className="font-label text-xs uppercase tracking-[0.35em] text-accent-indigo font-bold mb-0">
                {lang === 'fr' ? 'Bio certifié' : 'عضوي معتمد'}
              </p>
            </div>

            <div className="reveal bg-surface-container-lowest editorial-shadow border border-outline-variant/10 rounded-sm p-10 text-center">
              <div className="flex items-end justify-center gap-3">
                <NumberTicker value={12850} className="font-headline text-6xl md:text-7xl tracking-tight !text-rich-carbon" />
                <span className="font-headline text-3xl md:text-4xl text-rich-carbon mb-1">+</span>
              </div>
              <div className="reveal w-12 h-px bg-accent-red mx-auto mt-6 mb-4" />
              <p className="font-label text-xs uppercase tracking-[0.35em] text-accent-indigo font-bold mb-0">
                {lang === 'fr' ? 'Commandes livrées' : 'طلبات مُسلّمة'}
              </p>
            </div>

            <div className="reveal bg-surface-container-lowest editorial-shadow border border-outline-variant/10 rounded-sm p-10 text-center">
              <div className="flex items-end justify-center gap-3">
                <NumberTicker value={24} className="font-headline text-6xl md:text-7xl tracking-tight !text-rich-carbon" />
                <span className="font-headline text-3xl md:text-4xl text-rich-carbon mb-1">
                  {lang === 'fr' ? 'villes' : 'مدن'}
                </span>
              </div>
              <div className="reveal w-12 h-px bg-accent-red mx-auto mt-6 mb-4" />
              <p className="font-label text-xs uppercase tracking-[0.35em] text-accent-indigo font-bold mb-0">
                {lang === 'fr' ? 'Couvertes au Maroc' : 'مغطاة داخل المغرب'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - VISUAL MOSAIC */}
      <section className="section-padding bg-surface-container-high/20">
        <div className="container-max">
          <div className="text-block-max mb-24 text-center">
            <TextReveal>
              <h2 className="text-rich-carbon mb-0 !text-rich-carbon">{t.gallery.title}</h2>
            </TextReveal>
            <div className="reveal w-24 h-1 bg-tertiary mx-auto mt-6"></div>
          </div>
          <div className="mosaic-timeline-section relative">
            {/* Center rail */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-outline-variant/30" />
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px bg-tertiary mosaic-timeline-progress origin-top" />

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
                        className="w-full h-[320px] md:h-[420px] object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 rounded-sm"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );

                const textBlock = (
                  <div className={`reveal ${isRTL ? 'text-right' : 'text-left'} space-y-3`}>
                    <div className="inline-flex items-center gap-3">
                      <span className="font-label text-[10px] uppercase tracking-[0.35em] text-accent-red font-bold">
                        {lang === 'fr' ? 'Sélection' : 'مختارات'}
                      </span>
                      <span className="h-px w-10 bg-outline-variant/40" />
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl text-rich-carbon mb-0 !text-rich-carbon">{title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">{desc}</p>
                  </div>
                );

                return (
                  <div
                    key={item.src}
                    className="mosaic-timeline-item relative grid grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center"
                  >
                    <div className="min-w-0 pr-6 md:pr-10 lg:pr-12">
                      {isEven ? imageBlock : textBlock}
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant/40 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-tertiary scale-0 mosaic-timeline-dot-fill origin-center" />
                      </div>
                    </div>

                    <div className="min-w-0 pl-6 md:pl-10 lg:pl-12">
                      {isEven ? textBlock : imageBlock}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="reveal mt-32 text-center">
            <button className="btn-premium uppercase text-primary-container">
              {t.gallery.cta}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS (Grid Marquee) */}
      <section className="section-padding overflow-hidden bg-surface border-t border-accent-red/10 flex flex-col">
        <div className="container-max mb-12 text-center">
          <TextReveal>
            <h2 className="text-rich-carbon mb-0 !text-rich-carbon">{t.testimonials.title}</h2>
          </TextReveal>
          <div className="reveal w-16 h-1 bg-accent-red mx-auto mt-4"></div>
        </div>
        <div className="relative flex flex-col -space-y-px">
          <Marquee pauseOnHover className="[--duration:60s] [--gap:0px]">
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <ReviewCard key={`r1-${idx}`} {...item} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:45s] [--gap:0px] -mt-px relative z-10">
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <ReviewCard key={`r2-${idx}`} {...item} />
            ))}
          </Marquee>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
