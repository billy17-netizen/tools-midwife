import "./globals.css";
import { Roboto_Mono, Inter, Poppins } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading';
import type { Metadata } from 'next';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap'
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap'
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: {
    default: 'Tools Bidan - Digital Resources for Midwives',
    template: '%s | Tools Bidan'
  },
  description: 'Comprehensive digital tools and calculators for midwives and healthcare professionals. Simplify medical calculations and resource management.',
  keywords: [
    'midwife tools', 
    'pregnancy calculator', 
    'BMI calculator', 
    'medical resources', 
    'healthcare professionals'
  ],
  authors: [{ name: 'Tools Bidan Team' }],
  creator: 'Tools Bidan Development Team',
  publisher: 'Tools Bidan',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://toolsbidan.com',
    title: 'Tools Bidan - Digital Resources for Midwives',
    description: 'Comprehensive digital tools and calculators for midwives and healthcare professionals.',
    siteName: 'Tools Bidan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools Bidan - Digital Resources for Midwives',
    description: 'Comprehensive digital tools and calculators for midwives and healthcare professionals.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable} ${robotoMono.variable} antialiased bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen flex flex-col`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <main className="flex-grow p-4 md:p-6 w-full">
            {children}
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
