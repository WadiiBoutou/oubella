'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5 pt-16 pb-8 text-white mt-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 md:px-24 w-full max-w-[1920px] mx-auto mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <img src={t.common.logo} alt="Logo" className="w-10 h-10 grayscale opacity-90 invert" />
             <span className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">{t.common.name}</span>
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
            <li><Link className="font-body text-sm text-white/50 hover:text-accent-red transition-all" href="/about">{t.nav.about}</Link></li>
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
            <p className="text-sm font-body text-white/50">{t.common.phoneValue}</p>
            <p className="text-sm font-body text-white/50 uppercase tracking-widest">contact@oubella.ma</p>
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse pt-4">
            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/5" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/5" href="#">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/5" href="#">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 pt-8 mx-8 md:mx-24 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label text-[10px] text-white/30 tracking-[0.2em] uppercase">
          {t.footer.rights}
        </p>
        <div className="flex items-center gap-6 font-label text-[10px] text-white/30 tracking-[0.4em] uppercase">
          <span>AGADIR</span>
          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>MARRAKECH</span>
          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>CASABLANCA</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
