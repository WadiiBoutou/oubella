"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Huile d'Argan Rare",
    description: "Extraite à froid des fruits de l'arganier du Souss, cette huile aux reflets dorés est un miracle de la nature pour la peau et les cheveux. Un soin ancestral pur et certifié, pilier de la culture cosmétique berbère.",
    backgroundColor: "#C5B358", // Gold
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img src="/images/products/argan.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Huile d'Argan" />
      </div>
    ),
  },
  {
    title: "Safran Pur de Taliouine",
    description: "L'or rouge des plateaux de l'Anti-Atlas. Chaque pistil est trié à la main aux premières lueurs, garantissant une puissance aromatique et colorante d'exception pour vos créations culinaires les plus fines.",
    backgroundColor: "#800000", // Deep Red
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img src="/images/products/safran.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Safran Pur" />
      </div>
    ),
  },
  {
    title: "L'Amlou Artisanal",
    description: "Un mariage onctueux d'amandes grillées, d'huile d'argan et de miel pur. La quintessence de la gourmandise berbère, riche en énergie et en saveurs authentiques. Préparez-vous à une explosion de terroir.",
    backgroundColor: "#D2B48C", // Tan
    isLight: true,
    content: (
      <div className="flex h-full w-full items-center justify-center">
      <img src="/images/products/amlou.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Amlou" />
      </div>
    ),
  },
  {
    title: "Miel de Thym Sauvage",
    description: "Récolté dans les hauteurs arides, ce miel de caractère offre des notes boisées et des vertus thérapeutiques puissantes. Un trésor apicole issu d'une flore sauvage protégée.",
    backgroundColor: "#F9A602", // Amber
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
      <img src="/images/products/honey.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Miel de Thym" />
      </div>
    ),
  },
  {
    title: "Savon Noir Traditionnel",
    description: "Purifié à l'huile d'olive, ce soin exfoliant emblématique du rituel du hammam libère la peau de ses impuretés tout en la laissant d'une douceur veloutée incomparable. La base indispensable du soin marocain.",
    backgroundColor: "#2F4F4F", // Dark Slate
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img src="/images/products/blacksoap.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Savon Noir" />
      </div>
    ),
  },
  {
    title: "Dattes Majhoul de l'Atlas",
    description: "Surnommées le 'Diamant du Désert', ces dattes charnues et fondantes sont récoltées dans les palmeraies des vallées préservées. Un délice sucré 100% naturel et riche en minéraux.",
    backgroundColor: "#5C4033", // Brown
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
      <img src="/images/products/dates.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Dattes Majhoul" />
      </div>
    ),
  },
  {
    title: "Ghassoul Minéral",
    description: "Argile volcanique unique au Moyen-Atlas, elle s'utilise en masque pour absorber les impuretés et purifier le cuir chevelu. 'La terre qui lave', utilisée par les femmes marocaines depuis des millénaires.",
    backgroundColor: "#8B7D7B", // Clay Pink
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
      <img src="/images/products/rhasoul.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Ghassoul" />
      </div>
    ),
  },
  {
    title: "Eau de Rose de Kelaat M'Gouna",
    description: "Distillée à partir de pétales de roses fraîches cueillies à l'aube, cette eau florale rafraîchit le teint et apaise les sens avec son parfum délicat. Une caresse de fraîcheur purifiante.",
    backgroundColor: "#F3C1C6", // Rose
    isLight: true,
    content: (
      <div className="flex h-full w-full items-center justify-center">
      <img src="/images/products/rosewater.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Eau de Rose" />
      </div>
    ),
  },
  {
    title: "Zaatar Sauvage Parfumé",
    description: "Cueillie dans la montagne, cette herbe aromatique séchée au soleil est indispensable au quotidien. Son parfum camphré et ses propriétés digestives en font l'allié parfait de vos infusions et plats.",
    backgroundColor: "#556B2F", // Dark Olive
    isLight: false,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img src="/images/products/zaatar.webp" className="w-auto h-auto max-w-full max-h-[80%] object-contain rounded-sm" alt="Zaatar" />
      </div>
    ),
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <StickyScroll content={content} />
    </main>
  );
}
