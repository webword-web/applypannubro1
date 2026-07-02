import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppSticky } from "@/components/layout/WhatsAppSticky";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APPLY PANNU BRO | One Stop Solution For All Your Needs",
  description: "Your trusted digital service partner for government services, certificates, and applications.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1a56db",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/50 dark:bg-black font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppSticky />
      </body>
    </html>
  );
}
