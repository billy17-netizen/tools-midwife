import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tools Bidan",
  description: "Digital tools for modern midwives",
  icons: {
    icon: '/favicon.svg',
  },
  applicationName: 'Tools Bidan',
  keywords: ['midwifery', 'healthcare', 'digital tools', 'medical calculators'],
  authors: [{ name: 'Tools Bidan Team' }],
  colorScheme: 'light',
  themeColor: '#2E86AB',
  openGraph: {
    title: 'Tools Bidan - Digital Resources for Midwives',
    description: 'Comprehensive digital tools and calculators for midwives and healthcare professionals',
    type: 'website',
    url: 'https://toolsbidan.com', // Replace with your actual domain
    images: [
      {
        url: '/images/midwife-healthcare.jpg',
        width: 1200,
        height: 630,
        alt: 'Tools Bidan - Midwifery Digital Platform'
      }
    ]
  }
}; 