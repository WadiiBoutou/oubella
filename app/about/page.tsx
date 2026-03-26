'use client';

import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '@/components/TextReveal';
import { TextAnimate } from '@/components/ui/text-animate';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <main className="pt-24">
      {/* Hero Section: Our Roots */}
      <section className="relative px-6 md:px-24 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 text-start">
            <span className="inline-block label-md uppercase tracking-[0.2em] text-accent-red font-bold mb-6">{t.about.hero.label}</span>
            <TextReveal>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight mb-0 !text-rich-carbon">{t.about.hero.title}</h1>
            </TextReveal>
            <div className="reveal w-20 h-px bg-primary/20 mt-8 mb-8"></div>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-lg leading-relaxed text-on-surface-variant max-w-xl mb-8"
            >
              {t.about.hero.desc}
            </TextAnimate>
            <div className="flex items-center gap-4 italic font-headline text-secondary text-xl border-l-4 border-primary/20 rtl:border-l-0 rtl:border-r-4 pl-6 pr-6 py-2">
              &ldquo;{t.about.hero.quote}&rdquo;
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                alt="Close-up of weathered hands"
                src="/images/heritage.webp"
              />
              <div className="absolute -bottom-8 -left-8 hidden md:block w-64 aspect-square rounded-sm overflow-hidden border-8 border-surface shadow-xl">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVt2LJEoGSBWga5EEjilA-gwCOhSzOSh_rE6dsPX-DMnK3vST9p8NrluJWeQk2G7Q2KIRaWDgLjxvYNolI_vRJpFAa58FgQ22iiGvbf54siAcnMfDBJWy-FoLBYKtIX6qOySoQQYxsyCE0ZOqgdUns4mGYZ2eiPPtaSiW3LurwcN2LmAVmXFDfGPosdiG9FDu-f_C6bEN-e2OgoKYnigbEIPF4CC8yHYZRPw4BxdajMRm-PbMR84eV-2lyOvJ7TmGxKXYtr-zqLmY" alt="Small detail"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Integration Section */}
      <section className="py-24 px-6 md:px-24 bg-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <img
              className="w-full aspect-[3/4] object-cover rounded-sm editorial-shadow"
              alt="Ancient Kasbah"
              src="/images/biosphere.webp"
            />
          </div>
          <div className="md:w-1/2 space-y-6 text-start">
             <span className="font-label text-xs uppercase tracking-widest text-accent-red font-bold">{t.about.heritage.unesco}</span>
             <TextReveal>
              <h2 className="font-headline text-4xl text-rich-carbon mb-0 !text-rich-carbon">{t.about.heritage.title}</h2>
             </TextReveal>
             <div className="reveal w-16 h-px bg-accent-red mt-4 mb-6"></div>
             <TextAnimate
               as="p"
               animation="fadeIn"
               by="word"
               once
               className="text-on-surface-variant leading-relaxed"
             >
               {t.about.heritage.desc}
             </TextAnimate>
             <TextAnimate
               as="p"
               animation="fadeIn"
               by="word"
               once
               className="text-on-surface-variant leading-relaxed font-light italic"
             >
               {t.about.heritage.narrative}
             </TextAnimate>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-surface-container-low pt-24 pb-12 px-6 md:px-24">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-rich-carbon mb-0 !text-rich-carbon">{t.about.mission.title}</h2>
          </TextReveal>
          <div className="reveal w-24 h-1 bg-outline-variant mx-auto mt-6 mb-8"></div>
          <TextAnimate
            as="p"
            animation="fadeIn"
            by="word"
            once
            className="text-xl text-on-surface-variant max-w-3xl mx-auto font-body"
          >
            {t.about.mission.desc}
          </TextAnimate>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="p-8 bg-surface-container-lowest rounded-sm shadow-sm flex flex-col items-center text-center editorial-shadow">
            <span className="material-symbols-outlined text-4xl text-accent-red mb-6">verified</span>
            <TextAnimate
              as="h3"
              animation="fadeIn"
              by="word"
              once
              className="text-xl font-headline font-bold mb-4"
            >
              {t.about.mission.purity}
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-sm text-on-surface-variant leading-relaxed"
            >
              {t.about.mission.purityDesc}
            </TextAnimate>
          </div>
          <div className="p-8 bg-surface-container-lowest rounded-sm shadow-sm flex flex-col items-center text-center editorial-shadow">
            <span className="material-symbols-outlined text-4xl text-accent-red mb-6">groups</span>
            <TextAnimate
              as="h3"
              animation="fadeIn"
              by="word"
              once
              className="text-xl font-headline font-bold mb-4"
            >
              {t.about.mission.fair}
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-sm text-on-surface-variant leading-relaxed"
            >
              {t.about.mission.fairDesc}
            </TextAnimate>
          </div>
          <div className="p-8 bg-surface-container-lowest rounded-sm shadow-sm flex flex-col items-center text-center editorial-shadow">
            <span className="material-symbols-outlined text-4xl text-accent-red mb-6">history_edu</span>
            <TextAnimate
              as="h3"
              animation="fadeIn"
              by="word"
              once
              className="text-xl font-headline font-bold mb-4"
            >
              {t.about.mission.knowhow}
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-sm text-on-surface-variant leading-relaxed"
            >
              {t.about.mission.knowhowDesc}
            </TextAnimate>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
