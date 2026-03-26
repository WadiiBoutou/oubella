import type { Metadata } from "next";
import { Inter, Noto_Serif, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WipeTransition from "@/components/WipeTransition";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrollProvider from "@/context/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${cairo.variable} antialiased`}
      >
        <LanguageProvider>
          <SmoothScrollProvider>
            <Navbar />
            <WipeTransition>{children}</WipeTransition>
            <Footer />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
