import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrollProvider from "@/context/SmoothScrollProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#9e3e26",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tissouan.com"),
  title: {
    default: "Tissouan | Terroir Marocain d'Exception",
    template: "%s | Tissouan",
  },
  description:
    "Découvrez le meilleur du terroir marocain avec Tissouan. Safran, huile d'argan, amlou et produits artisanaux d'exception issus d'une agriculture durable.",
  keywords: [
    "safran",
    "huile d'argan",
    "amlou",
    "terroir marocain",
    "produits artisanaux",
    "maroc",
    "gastronomie marocaine",
    "bien-être naturel",
  ],
  authors: [{ name: "Tissouan" }],
  creator: "Tissouan",
  publisher: "Tissouan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tissouan.com",
    title: "Tissouan | Terroir Marocain d'Exception",
    description:
      "Le meilleur du terroir marocain : safran pur, huile d'argan certifiée, amlou traditionnel et artisanat haut de gamme.",
    siteName: "Tissouan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tissouan - Terroir Marocain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tissouan | Terroir Marocain d'Exception",
    description:
      "Le meilleur du terroir marocain : safran pur, huile d'argan certifiée, amlou traditionnel et artisanat haut de gamme.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tissouan",
    "image": "https://tissouan.com/LOGO3.webp",
    "@id": "https://tissouan.com",
    "url": "https://tissouan.com",
    "telephone": "+212000000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Agadir",
      "addressLocality": "Agadir",
      "postalCode": "80000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.4278,
      "longitude": -9.5875
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/tissouan",
      "https://www.facebook.com/tissouan"
    ]
  };

  return (
    <html lang="fr" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/Telma-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <LanguageProvider>
          <SmoothScrollProvider>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
