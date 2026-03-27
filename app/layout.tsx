import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrollProvider from "@/context/SmoothScrollProvider";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Oubella",
  description: "Découvrez le meilleur du terroir marocain avec Oubella. Safran, Huile d'Argan, Amlou et produits artisanaux d'exception.",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
