'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
    { name: t.nav.about, href: '/about' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.huiles, href: '/gallery' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const panelVariants = {
    closed: { x: '-100%' },
    open: { x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const rightPanelVariants = {
    closed: { x: '100%' },
    open: { x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: '100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
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
        <div className="fixed inset-0 z-[100] flex overflow-hidden">
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
            className="relative w-full lg:w-[60%] h-full bg-surface border-r border-primary/5 flex flex-col justify-center px-10 md:px-24 z-20"
          >
            <motion.div variants={staggerLinks} initial="closed" animate="open" className="space-y-6 md:space-y-10">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} variants={linkVariants} className="group flex items-center gap-8">
                  <span className="text-secondary/30 font-headline text-lg italic">(0{i + 1})</span>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`text-5xl md:text-8xl font-headline font-bold uppercase tracking-tighter transition-colors hover:text-tertiary ${
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
            className="hidden lg:flex relative w-[40%] h-full bg-primary-container text-surface flex-col justify-between p-20 z-20 shadow-2xl"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-surface/20 rounded-full font-label text-[10px] uppercase tracking-[0.3em] hover:bg-surface hover:text-primary-container transition-all"
              >
                {t.common.close}
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-12">
               <div className="w-48 h-48 rounded-full border border-surface/10 flex items-center justify-center p-8">
                  <img src={t.common.logo} alt="Logo" className="w-full h-full object-contain invert opacity-90" />
               </div>
               <h2 className="text-4xl font-headline font-bold tracking-tighter uppercase">{t.common.name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-12 text-start">
              <div className="space-y-4">
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold">{t.common.emailLabel}</p>
                <p className="text-sm border-b border-surface/10 pb-2">contact@oubella.ma</p>
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mt-8">{t.common.phoneLabel}</p>
                <p className="text-sm">{t.common.phoneValue}</p>
              </div>
              <div className="space-y-4">
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold">{t.common.officeLabel}</p>
                <p className="text-sm border-b border-surface/10 pb-2">{t.common.officeValue}</p>
                <p className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mt-8">{t.common.socialLabel}</p>
                <div className="flex gap-4">
                   <span className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 cursor-pointer">Instagram</span>
                   <span className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 cursor-pointer">Facebook</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
               <p className="text-[10px] opacity-30 uppercase tracking-[0.2em]">{t.footer.rights}</p>
               <span className="font-headline text-6xl opacity-5 italic text-surface select-none">Heritage</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
