'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '@/components/TextReveal';
import { TextAnimate } from '@/components/ui/text-animate';

const ContactPage = () => {
  const { t } = useLanguage();
  const whatsappNumber = '212676767676';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>(t.contact.form.subjects?.[0] ?? '');
  const [message, setMessage] = useState('');

  const whatsappHref = useMemo(() => {
    const cleaned = {
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    };

    const lines = [
      `Bonjour,`,
      ``,
      `Nom: ${cleaned.name || '-'}`,
      `Email: ${cleaned.email || '-'}`,
      `Objet: ${cleaned.subject || '-'}`,
      ``,
      cleaned.message ? `Message: ${cleaned.message}` : `Message: -`,
    ];

    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [email, message, name, subject]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-start">
            <span className="font-label text-xs font-bold uppercase tracking-[0.1em] text-accent-red mb-4 block">{t.contact.hero.label}</span>
            <div className="space-y-1">
              {(Array.isArray(t.contact.hero.title) ? t.contact.hero.title : [t.contact.hero.title]).map((line, i) => (
                <div key={i}>
                  <TextReveal delay={i * 0.15}>
                    <h1 className="font-headline text-5xl md:text-6xl font-bold text-rich-carbon mb-0 !text-rich-carbon leading-tight">{line}</h1>
                  </TextReveal>
                </div>
              ))}
            </div>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="text-lg text-on-surface-variant leading-relaxed max-w-xl mt-8"
            >
              {t.contact.hero.desc}
            </TextAnimate>
          </div>
          <div className="relative h-[400px] w-full bg-surface-container-low overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              alt="Assorted terracotta pots"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXc15FUTFbO17RLwPcRWiIfG_GUEY2ePQwhqPD8XcKy_RU4OGHyH9Kb38tL4dJvuOUTdAzFP4f_McwoAJI7hbRqQ-9avdJnfJoLL8TS_LkVezlWncs5riBsZ0T6oS6_-fGiE4c3CjITWJ1nKuEiINxO8ddZ3p2P2AXq9VVRJT3VRFWoRPAwQmg5QKkyNxf-4hu2LYiiQEYn0JTreaEbyTP_22ReC4zajb7FjEnrtzoRGUhJdpbYeb5Bkh84ttjpVKUwVHQU3XFIxk"
            />
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section className="bg-surface-container-low py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-12 text-start">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-accent-red/10 p-3 rounded-full text-accent-red">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <TextAnimate
                      as="h3"
                      animation="fadeIn"
                      by="word"
                      once
                      className="font-headline text-xl font-bold text-rich-carbon mb-2"
                    >
                      {t.contact.details.headquarters}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="fadeIn"
                      by="word"
                      once
                      className="text-on-surface-variant"
                    >
                      {t.contact.details.address}
                    </TextAnimate>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-accent-red/10 p-3 rounded-full text-accent-red">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <TextAnimate
                      as="h3"
                      animation="fadeIn"
                      by="word"
                      once
                      className="font-headline text-xl font-bold text-rich-carbon mb-2"
                    >
                      {t.contact.details.email}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="fadeIn"
                      by="word"
                      once
                      className="text-on-surface-variant"
                    >
                      contact@artisanalterroir.ma
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="fadeIn"
                      by="word"
                      once
                      className="text-on-surface-variant"
                    >
                      support@artisanalterroir.ma
                    </TextAnimate>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-accent-red/10 p-3 rounded-full text-accent-red">
                    <span className="material-symbols-outlined">phone_in_talk</span>
                  </div>
                  <div>
                    <TextAnimate
                      as="h3"
                      animation="fadeIn"
                      by="word"
                      once
                      className="font-headline text-xl font-bold text-rich-carbon mb-2"
                    >
                      {t.contact.details.phone}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="fadeIn"
                      by="word"
                      once
                      className="text-on-surface-variant"
                    >
                      {t.common.phoneValue}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="fadeIn"
                      by="word"
                      once
                      className="text-on-surface-variant"
                    >
                      {t.contact.details.availability}
                    </TextAnimate>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 editorial-shadow border border-outline-variant/10 text-start">
              <TextReveal>
                <h2 className="font-headline text-3xl font-bold text-rich-carbon mb-0 !text-rich-carbon">{t.contact.form.title}</h2>
              </TextReveal>
              <div className="reveal w-20 h-px bg-accent-red mt-4 mb-10"></div>
              <form className="space-y-8" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant flex gap-1">
                      {t.contact.form.name} <span className="text-accent-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      required
                      className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest focus:ring-accent-red py-4 px-4 text-sm outline-none transition-all"
                      placeholder={t.contact.form.nameLoc}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant flex gap-1">
                      {t.contact.form.email} <span className="text-accent-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      required
                      className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest focus:ring-accent-red py-4 px-4 text-sm outline-none transition-all"
                      placeholder={t.contact.form.emailLoc}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2 text-start">
                  <label htmlFor="subject" className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t.contact.form.subject}</label>
                  <select
                    id="subject"
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest focus:ring-accent-red py-4 px-4 text-sm outline-none transition-all appearance-none cursor-pointer"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    {t.contact.form.subjects.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant flex gap-1">
                    {t.contact.form.message} <span className="text-accent-red" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest focus:ring-accent-red py-4 px-4 text-sm outline-none transition-all resize-none"
                    placeholder={t.contact.form.messageLoc}
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button className="w-full md:w-auto btn-premium" type="submit">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
