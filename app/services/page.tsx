'use client';

import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '@/components/TextReveal';
import { TextAnimate } from '@/components/ui/text-animate';

const ServicesPage = () => {
  const { t } = useLanguage();

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <header className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto text-start">
        <div className="flex flex-col md:flex-row gap-12 items-end">
          <div className="md:w-2/3">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-accent-red mb-4 block">{t.services.hero.label}</span>
            <TextReveal>
              <h1 className="font-headline text-5xl md:text-7xl font-bold text-rich-carbon leading-tight tracking-tighter mb-0 !text-rich-carbon">
                {t.services.hero.title}
              </h1>
            </TextReveal>
          </div>
          <div className="md:w-1/3 pb-2">
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-on-surface-variant leading-relaxed text-lg italic"
            >
              {t.services.hero.desc}
            </TextAnimate>
          </div>
        </div>
      </header>

      {/* Section 1: Fast Local Delivery */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-surface-container-lowest p-10 flex flex-col justify-between min-h-[400px] editorial-shadow text-start">
              <div>
                <span className="material-symbols-outlined text-accent-red text-4xl mb-6">local_shipping</span>
                <TextAnimate
                  as="h2"
                  animation="fadeIn"
                  by="word"
                  once
                  className="font-headline text-3xl font-bold mb-4 text-rich-carbon"
                >
                  {t.services.delivery.title}
                </TextAnimate>
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
                <span className="font-label text-[10px] uppercase tracking-widest text-accent-red">{t.services.delivery.label}</span>
              </div>
            </div>
            <div className="md:col-span-5 relative overflow-hidden group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Delivery van in Moroccan street"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQ89CzeqgfulePVaBLoizX9_Ts3EXf2STP7EBTmCEe_iL-ABuDQ2BScO9HNyhtwpzpMH9DcvydTWytxv-xBZwjFj5YQrum9bNKHEADO5zBxlDsY6UoaSYUavpVPlTYWXun-vokT-wvWEHmLLh1bnTcdTmKjHOg2kmWRH19S36NF6iMz52hYfHNQ-NJtrEkx__TWX4osIEPJuWp2QhWo2feWNplTmneKGCtl4SGRVlgGKNzbFDLsXiP3EfW5aDc79qPjKq9FdGttk"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Gift Box Customization */}
      <section className="pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="relative z-10 p-4 bg-surface-container-lowest editorial-shadow">
              <img
                className="w-full h-auto"
                alt="Artisanal gift box"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJMVQBCBPKzWfxM96rGKiqTAWWRrroS4npznRC0XzWg49ocqLnKF373zZto7ldMBzx_yqgqWNZt8yYwF5SBRsx1LGjUnscHdLJMoANHKAbSwrwEugVkRSLlGZ-kXcLzKbzHRmBGrDMlfKwMfJZnjRPL36kuZb973dUHW_9-N5FObIkQhqRCqJ11f4U-ViRludvkPqkM7R2Kj0dviWEX3kRKgkM8Uz2-tMFcJPT3X6sRufmHSPjXHKDuF3BeG6v9eKBTCCZwUO8ccw"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/10 -z-0 rounded-full blur-3xl"></div>
          </div>
          <div className="md:w-1/2 text-start">
            <span className="font-label text-xs uppercase tracking-widest text-accent-red mb-4 block">{t.services.gifts.label}</span>
            <TextAnimate
              as="h2"
              animation="fadeIn"
              by="word"
              once
              className="font-headline text-4xl font-bold text-rich-carbon mb-6"
            >
              {t.services.gifts.title}
            </TextAnimate>
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
            <button className="mt-10 btn-premium">
              {t.services.gifts.cta}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
