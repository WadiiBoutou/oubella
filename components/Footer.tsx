'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-rich-carbon border-t border-white/5 pt-12 pb-8 text-white mt-auto w-full sm:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grain-overlay" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 md:px-24 w-full max-w-[1920px] mx-auto mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <img src={t.common.logo} alt="Logo" className="w-10 h-10 grayscale opacity-90 invert" />
             <span className="text-xl font-headline font-bold text-white tracking-tighter uppercase sm:text-2xl">{t.common.name}</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed font-body normal-case max-w-xs">
            {t.footer.desc}
          </p>
        </div>

        {/* Navigation Column */}
        <div className="space-y-6">
          <h5 className="font-label text-xs tracking-[0.3em] uppercase text-white font-bold opacity-90">{t.footer.nav.toUpperCase()}</h5>
          <ul className="space-y-4">
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/">{t.nav.terroir}</Link></li>
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/services">{t.nav.services}</Link></li>
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/contact">{t.nav.contact}</Link></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="space-y-6">
          <h5 className="font-label text-xs tracking-[0.3em] uppercase text-white font-bold opacity-90">{t.nav.huiles.toUpperCase()}</h5>
          <ul className="space-y-4">
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/gallery">{t.pillars[0].title}</Link></li>
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/gallery">{t.pillars[1].title}</Link></li>
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/gallery">{t.pillars[2].title}</Link></li>
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/gallery">{t.pillars[3].title}</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-6">
          <h5 className="font-label text-xs tracking-[0.3em] uppercase text-white font-bold opacity-90">{t.nav.contact.toUpperCase()}</h5>
          <div className="space-y-4">
            <p className="text-sm font-body text-white/50 leading-relaxed uppercase tracking-wider">{t.contact.details.address}</p>
            <p className="text-sm font-body text-white/50">
              <span dir="ltr" className="inline-block">
                {t.common.phoneValue}
              </span>
            </p>
            <p className="text-sm font-body text-white/50 uppercase tracking-widest">contact@oubella.ma</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/5 pt-6 sm:pt-8 mx-4 sm:mx-8 md:mx-24 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start">
        <p className="font-label text-[10px] text-white/30 tracking-[0.2em] uppercase">
          {t.footer.rights}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-label text-[10px] text-white/30 tracking-[0.35em] uppercase md:tracking-[0.4em]">
          <span>AGADIR</span>
          <span className="hidden h-1 w-1 shrink-0 rounded-full bg-white/20 sm:inline-block" aria-hidden="true" />
          <span>MARRAKECH</span>
          <span className="hidden h-1 w-1 shrink-0 rounded-full bg-white/20 sm:inline-block" aria-hidden="true" />
          <span>CASABLANCA</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
