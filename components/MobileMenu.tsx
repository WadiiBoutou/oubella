'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { name: t.nav.terroir, href: '/' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.huiles, href: '/gallery' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const panelVariants = {
    closed: { x: '-100%' },
    open: { x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    exit: { x: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const rightPanelVariants = {
    closed: { x: '100%' },
    open: { x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    exit: { x: '100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const staggerLinks = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* LTR structure: keeps flex order + slide animations aligned (RTL on <html> reverses flex-row and breaks panels) */
        <div className="fixed inset-0 z-[100] flex overflow-hidden" dir="ltr">
          {/* Backdrop Darkening */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Left Panel: Tabs */}
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative z-20 flex h-full w-full flex-col justify-center border-r border-primary/5 bg-surface px-5 sm:px-10 md:px-16 lg:w-[60%] lg:px-24"
          >
            <motion.div variants={staggerLinks} initial="closed" animate="open" className="space-y-4 sm:space-y-6 md:space-y-10">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} variants={linkVariants} className="group flex items-center gap-3 sm:gap-6 md:gap-8">
                  <span className="text-secondary/30 font-headline text-sm italic sm:text-lg" aria-hidden="true">
                    (0{i + 1})
                  </span>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`text-[clamp(1.75rem,7vw,4.5rem)] font-headline font-bold uppercase tracking-tighter transition-colors hover:text-tertiary md:text-7xl lg:text-8xl ${
                      pathname === link.href ? 'text-primary' : 'text-primary-container'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Panel: Logo & Info */}
          <motion.div
            variants={rightPanelVariants}
            initial="closed"
            animate="open"
            exit="exit"
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative z-20 hidden h-full w-[40%] flex-col justify-between bg-primary-container p-20 text-surface shadow-2xl lg:flex"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-surface/20 rounded-full font-label text-[10px] uppercase tracking-[0.3em] hover:bg-surface hover:text-primary-container transition-all"
              >
                {t.common.close}
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-52 w-52 items-center justify-center rounded-full border border-surface/10 p-8 sm:h-56 sm:w-56 relative overflow-hidden">
                <Image
                  src="/LOGO2.webp"
                  alt={t.common.name}
                  width={208}
                  height={208}
                  className="h-full w-full object-contain opacity-95"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 text-start">
              <div className="space-y-4">
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold">{t.common.emailLabel}</p>
                <p className="text-sm border-b border-surface/10 pb-2">contact@tissouan.ma</p>
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mt-8">{t.common.phoneLabel}</p>
                <p className="text-sm">
                  <span dir="ltr" className="inline-block">
                    {t.common.phoneValue}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end">
               <span className="font-headline text-6xl opacity-5 italic text-surface select-none">Heritage</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
