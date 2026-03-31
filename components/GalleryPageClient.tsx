"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

function ProductImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-8">
      <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-sm overflow-hidden border border-white/15 bg-black/15 shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 400px) 100vw, 400px"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/* Backgrounds reference @theme in app/globals.css (--color-gallery-*) for a single source of truth */
const GALLERY_SLIDES = [
  { src: "/images/products/argan.webp", backgroundColor: "var(--color-gallery-argan)", isLight: false, layout: "frame" as const },
  { src: "/images/products/safran.webp", backgroundColor: "var(--color-gallery-safran)", isLight: false, layout: "frame" as const },
  { src: "/images/products/amlou.webp", backgroundColor: "var(--color-gallery-amlou)", isLight: true, layout: "frame" as const },
  { src: "/images/products/honey.webp", backgroundColor: "var(--color-gallery-honey)", isLight: false, layout: "frame" as const },
  { src: "/images/products/blacksoap.webp", backgroundColor: "var(--color-gallery-blacksoap)", isLight: false, layout: "frame" as const },
  { src: "/images/products/dates.webp", backgroundColor: "var(--color-gallery-dates)", isLight: false, layout: "frame" as const },
  { src: "/images/products/rhasoul.webp", backgroundColor: "var(--color-gallery-rhasoul)", isLight: false, layout: "contain" as const },
  { src: "/images/products/rosewater.webp", backgroundColor: "var(--color-gallery-rosewater)", isLight: true, layout: "frame" as const },
  { src: "/images/products/zaatar.webp", backgroundColor: "var(--color-gallery-zaatar)", isLight: false, layout: "frame" as const },
] as const;

export default function GalleryPageClient() {
  const { t } = useLanguage();

  const content = useMemo(() => {
    return t.gallery.items.map((item, i) => {
      const meta = GALLERY_SLIDES[i];
      const imageBlock =
        meta.layout === "contain" ? (
          <div className="flex h-full w-full items-center justify-center relative">
            <Image
              src={meta.src}
              fill
              sizes="100vw"
              className="rounded-sm object-contain p-4"
              alt={item.alt}
            />
          </div>
        ) : (
          <ProductImageFrame src={meta.src} alt={item.alt} />
        );

      return {
        title: item.title,
        description: item.desc,
        backgroundColor: meta.backgroundColor,
        isLight: meta.isLight,
        content: imageBlock,
      };
    });
  }, [t.gallery.items]);

  return (
    <main className="min-h-screen pt-16 sm:pt-20">
      <StickyScroll content={content} />
    </main>
  );
}
