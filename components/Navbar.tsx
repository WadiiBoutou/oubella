'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MobileMenu from './MobileMenu';

// LETTER ROLL HOVER EFFECT (disabled for RTL — splitting glyphs breaks Arabic shaping)
function RollLink({
  children,
  href,
  className,
  plain,
}: {
  children: string;
  href: string;
  className?: string;
  plain?: boolean;
}) {
  if (plain) {
    return (
      <Link
        href={href}
        className={`inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-carbon focus-visible:ring-accent-red rounded-sm ${className || ""}`}
      >
        {children}
      </Link>
    );
  }

  const letters = [...children];

  return (
    <Link
      href={href}
      className={`group relative inline-block overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-carbon focus-visible:ring-accent-red rounded-sm ${className || ""}`}
      style={{ height: "1.3em" }}
    >
      <span className="sr-only">{children}</span>
      <span className="flex absolute top-0 left-0" aria-hidden="true">
        {letters.map((char, i) => (
          <span
            key={`top-${i}`}
            className="inline-block transition-transform group-hover:-translate-y-full"
            style={{
              transitionDuration: "0.25s",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              transitionDelay: `${i * (0.12 / letters.length)}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="flex" aria-hidden="true">
        {letters.map((char, i) => (
          <span
            key={`bot-${i}`}
            className="inline-block transition-transform translate-y-full group-hover:translate-y-0"
            style={{
              transitionDuration: "0.25s",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              transitionDelay: `${i * (0.12 / letters.length)}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Link>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { lang, setLang, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.terroir, href: '/' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.huiles, href: '/gallery' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <>
      {/* 1. LAYER FOR STATIC UN-BLENDED ASSETS (LOGO) + BACKGROUND */}
      <nav className={`fixed top-0 w-full z-50 text-white transition-all duration-700 ease-in-out pointer-events-none ${
        hasScrolled ? 'glass-effect border-b border-primary-container/10 py-3 shadow-md shadow-primary-container/5' : 'bg-transparent border-b border-transparent py-6'
      }`}>
        <div className="nav-page-gutter flex max-w-[1920px] mx-auto justify-between items-center pointer-events-auto md:px-12">
          <Link href="/" className="flex items-center group" aria-label={t.common.name}>
            <Image
              src="/LOGO1.webp"
              alt="Tissouan Logo"
              width={168}
              height={48}
              priority
              className={`object-contain transition-all duration-500 ${hasScrolled ? "h-10 w-auto max-w-[140px]" : "h-12 w-auto max-w-[168px] group-hover:rotate-12"}`}
            />
          </Link>
          <div className="hidden md:flex items-center gap-10 opacity-0 pointer-events-none">
            {navLinks.map((link) => (
              <div key={link.name} className={`font-label text-xs uppercase tracking-[0.2em] transition-all pb-1`}>
                {link.name}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 opacity-0 pointer-events-none">
            <button className="flex items-center gap-2 font-bold text-xs uppercase border border-white/30 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-sm">language</span>
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>
            <button className="flex flex-col gap-1.5">
              <div className="h-0.5 w-6 bg-white" />
              <div className="h-0.5 w-6 bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. LAYER FOR BLENDED DYNAMIC ITEMS (LINKS, TITLES, BUTTONS) */}
      <nav className={`fixed top-0 w-full z-[51] mix-blend-difference text-white transition-all duration-700 ease-in-out pointer-events-none bg-transparent ${
        hasScrolled ? 'py-3' : 'py-6'
      }`}>
        <div className="nav-page-gutter flex max-w-[1920px] mx-auto justify-between items-center pointer-events-auto md:px-12">
          {/* Logo link with invisible image, passing through clicks conceptually */}
          <Link href="/" className="flex items-center group pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <Image
              src="/LOGO1.webp"
              alt=""
              width={168}
              height={48}
              aria-hidden="true"
              className={`object-contain opacity-0 transition-all duration-500 ${hasScrolled ? "h-10 w-auto max-w-[140px]" : "h-12 w-auto max-w-[168px]"}`}
            />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <RollLink
                key={link.name}
                href={link.href}
                plain={isRTL}
                className={`shrink-0 whitespace-nowrap font-label text-xs uppercase tracking-[0.2em] transition-all pb-1 hover:opacity-60 ${
                  pathname === link.href
                    ? 'font-bold border-b border-white'
                    : 'opacity-90'
                }`}
              >
                {link.name}
              </RollLink>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              aria-label={lang === 'fr' ? 'Changer en Arabe' : 'تغيير إلى الفرنسية'}
              title={lang === 'fr' ? 'Changer en Arabe' : 'تغيير إلى الفرنسية'}
              className="flex items-center gap-2 transition-all font-bold text-xs uppercase border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-carbon focus-visible:ring-accent-red"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">language</span>
              <span aria-hidden="true">{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>
            
            <button
              className="flex flex-col gap-1.5 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-carbon focus-visible:ring-accent-red p-1 rounded-sm"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t.common.close === "Fermer" ? "Ouvrir le menu de navigation" : "فتح قائمة التنقل"}
              aria-expanded={isMenuOpen}
            >
              <div className="h-0.5 w-6 transition-colors duration-500 bg-white" aria-hidden="true"/>
              <div className="h-0.5 w-6 transition-colors duration-500 bg-white" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </nav>

      {/* NEW FULL SCREEN MENU */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default Navbar;
