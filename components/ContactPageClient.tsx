"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import TextReveal from "@/components/TextReveal";
import { TextAnimate } from "@/components/ui/text-animate";

export default function ContactPageClient() {
  const { t } = useLanguage();
  const whatsappNumber = "212676767676";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(t.contact.form.subjects?.[0] ?? "");
  const [message, setMessage] = useState("");

  const whatsappHref = useMemo(() => {
    const cleaned = {
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    };

    const lines = [
      "Bonjour,",
      "",
      `Nom: ${cleaned.name || "-"}`,
      `Email: ${cleaned.email || "-"}`,
      `Objet: ${cleaned.subject || "-"}`,
      "",
      cleaned.message ? `Message: ${cleaned.message}` : `Message: -`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [email, message, name, subject]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <header className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden">
        <img
          src="/images/desert.webp"
          alt="Desert landscape background"
          className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
        />
        {/* Soft elegant overlay to pop text and feather into next section */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay"
          style={{ opacity: 0.05 }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[160px] md:h-[220px]"
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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-28 pb-20 sm:px-6 md:px-12 text-start">
          <div className="max-w-2xl">
            <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-surface mb-6 block drop-shadow-md">
              {t.contact.hero.label}
            </span>
            <div className="space-y-1 mb-8">
              {(Array.isArray(t.contact.hero.title) ? t.contact.hero.title : [t.contact.hero.title]).map((line, i) => (
                <div key={i}>
                  <TextReveal delay={i * 0.15}>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold !text-white leading-[1.1] tracking-tight drop-shadow-lg">
                      {line}
                    </h1>
                  </TextReveal>
                </div>
              ))}
            </div>
            <TextAnimate
              as="p"
              animation="fadeIn"
              by="word"
              once
              className="max-w-xl text-lg md:text-xl leading-relaxed text-surface drop-shadow-md"
            >
              {t.contact.hero.desc}
            </TextAnimate>
          </div>
        </div>
      </header>

      {/* Contact & Form Section */}
      <section className="bg-surface-container-low py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
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
                    <div dir="ltr">
                      <TextAnimate
                        as="p"
                        animation="fadeIn"
                        by="word"
                        once
                        className="text-on-surface-variant"
                      >
                        {t.common.phoneValue}
                      </TextAnimate>
                    </div>
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
}

