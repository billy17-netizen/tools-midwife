'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import GSAPAnimation from "@/components/animations/GSAPAnimation";

const LottieAnimation = dynamic(
  () => import('@/components/animations/LottieAnimation'),
  { ssr: false }
);

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

export default function Home() {
  // Array of tools based on RDP
  const tools = [
    {
      title: "Kalkulator Zat Besi",
      description: "Menghitung kebutuhan zat besi ibu hamil berdasarkan parameter kesehatan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"></path>
          <path d="M15 8.5V7"></path>
          <path d="M18 10V7"></path>
          <path d="M18 22v-8.3a4 4 0 0 0-4-4c-1.1 0-1.1-1.1-1.1-1.1"></path>
          <path d="M15 22v-4"></path>
          <path d="M12 22v-1.3"></path>
          <path d="M18 22H9"></path>
        </svg>
      ),
      href: "/tools/iron-calculator",
    },
    {
      title: "Kalkulator Kehamilan",
      description: "Menghitung usia kehamilan dan perkiraan persalinan berdasarkan HPHT.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M6 9a6 6 0 1 1 12 0c0 3.1-5 8-6 9.4C11 17 6 12.1 6 9Z"></path>
          <circle cx="12" cy="9" r="1"></circle>
        </svg>
      ),
      href: "/tools/pregnancy-calculator",
    },
    {
      title: "Kalkulator BMI",
      description: "Penghitung BMI khusus ibu hamil dengan rekomendasi pertambahan berat badan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M16 12h2v4h2a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2h2v-4h2"></path>
          <path d="M12 2a2 2 0 0 0-2 2v8h4V4a2 2 0 0 0-2-2Z"></path>
        </svg>
      ),
      href: "/tools/bmi-calculator",
    },
    {
      title: "Kalkulator Dosis Obat",
      description: "Penghitung dosis obat umum untuk ibu dan bayi berdasarkan berat badan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="m9 11 3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
      href: "/tools/medication-calculator",
    },
    {
      title: "Kurva Pertumbuhan",
      description: "Grafik pertumbuhan janin dan bayi sesuai standar WHO.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
      href: "/tools/growth-chart",
    },
    {
      title: "Checklist Pemeriksaan",
      description: "Daftar periksa standar untuk setiap kunjungan ANC/PNC.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M9 9h6"></path>
          <path d="M9 12h6"></path>
          <path d="M9 15h6"></path>
        </svg>
      ),
      href: "/tools/examination-checklist",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Enhanced Clean Design */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#2E86AB]/5 to-[#F24236]/5 overflow-hidden py-20">
        {/* Background Gradient and Shapes */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-b from-[#2E86AB] to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-t from-[#F24236] to-transparent blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <GSAPAnimation animationType="fadeIn" delay={0.2}>
              <div className="inline-flex items-center justify-center bg-[#2E86AB]/10 text-[#2E86AB] px-4 py-2 rounded-full text-sm font-medium border border-[#2E86AB]/20">
                <span className="w-2 h-2 bg-[#2E86AB] rounded-full mr-2 animate-pulse"></span>
                Platform Digital untuk Bidan
              </div>
            </GSAPAnimation>
            
            <GSAPAnimation animationType="fadeIn" delay={0.4}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#2E86AB] to-[#F24236] text-transparent bg-clip-text leading-tight">
                Tools Bidan: Sahabat Digital Praktik Kebidanan
              </h1>
            </GSAPAnimation>
            
            <GSAPAnimation animationType="fadeIn" delay={0.6}>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Akses cepat berbagai kalkulator medis esensial dan sumber daya terpercaya untuk meningkatkan efisiensi dan akurasi dalam pelayanan kebidanan.
              </p>
            </GSAPAnimation>
            
            <GSAPAnimation animationType="fadeIn" delay={0.8}>
              <div className="flex justify-center space-x-4">
                <Link 
                  href="/tools" 
                  className="bg-[#2E86AB] hover:bg-[#1E5A8C] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center group"
                >
                  Jelajahi Tools
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
                <Link 
                  href="/about" 
                  className="border-2 border-[#2E86AB]/30 text-[#2E86AB] font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-[#2E86AB]/10 inline-flex items-center group"
                >
                  Tentang Kami
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </Link>
              </div>
            </GSAPAnimation>
          </div>
        </div>
      </section>

      {/* Tools Section - Enhanced */}
      <section className="py-16 sm:py-24 w-full bg-[#F7F7F2]/50">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPScrollTrigger animationType="slideUp" className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent inline-block">Tools Utama untuk Praktik Anda</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full my-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai tools digital yang praktis dan akurat untuk membantu para bidan dalam melayani pasien.
            </p>
          </GSAPScrollTrigger>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <GSAPScrollTrigger 
                key={index} 
                animationType="fadeIn" 
                delay={0.15 * index}
                start="top 85%"
                className="w-full h-full"
              >
                <Link href={tool.href} className="block w-full h-full group">
                  <Card className="h-full w-full border border-gray-100 hover:border-[#2E86AB]/30 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg hover:shadow-[#2E86AB]/5 transition-all duration-300 overflow-hidden relative rounded-xl flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5AE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardHeader className="flex flex-row items-center gap-4 sm:gap-5 pb-2 sm:pb-3 w-full px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0">
                      <div className="bg-gradient-to-br from-[#2E86AB]/10 to-[#F24236]/10 p-3 sm:p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {tool.icon}
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-semibold group-hover:text-[#2E86AB] transition-colors duration-300">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pt-0 pb-5 flex-grow">
                      <CardDescription className="text-sm sm:text-base text-gray-600">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </GSAPScrollTrigger>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - New */}
      <section className="py-16 sm:py-24 w-full bg-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GSAPScrollTrigger animationType="slideUp" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent inline-block">Bagaimana Tools Bidan Bekerja?</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full my-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Sangat mudah untuk mulai menggunakan Tools Bidan dalam praktik sehari-hari Anda.
            </p>
          </GSAPScrollTrigger>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <GSAPScrollTrigger animationType="fadeIn" delay={0.4}>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-[#E1F5FE] text-[#2E86AB] p-4 rounded-full text-3xl font-bold border-4 border-[#B3E5FC]">1</div>
                <h3 className="text-xl font-semibold">Pilih Tool</h3>
                <p className="text-gray-600">Pilih kalkulator atau sumber daya yang Anda butuhkan dari daftar.</p>
              </div>
            </GSAPScrollTrigger>
            
            <GSAPScrollTrigger animationType="fadeIn" delay={0.6}>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-[#FFEBEE] text-[#F24236] p-4 rounded-full text-3xl font-bold border-4 border-[#FFCDD2]">2</div>
                <h3 className="text-xl font-semibold">Masukkan Data</h3>
                <p className="text-gray-600">Input data yang relevan dengan kondisi pasien Anda.</p>
              </div>
            </GSAPScrollTrigger>
            
            <GSAPScrollTrigger animationType="fadeIn" delay={0.8}>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-[#E8F5E9] text-[#4CAF50] p-4 rounded-full text-3xl font-bold border-4 border-[#C8E6C9]">3</div>
                <h3 className="text-xl font-semibold">Dapatkan Hasil</h3>
                <p className="text-gray-600">Tools akan segera memberikan hasil atau informasi yang Anda butuhkan.</p>
              </div>
            </GSAPScrollTrigger>
          </div>
        </div>
      </section>

      {/* Features Section - Updated Card Styling */}
      <section className="py-20 sm:py-28 w-full bg-gradient-to-b from-white to-[#F7F7F2]/50">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPScrollTrigger animationType="slideUp" className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent inline-block">Fitur Unggulan Kami</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full my-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Platform yang dirancang khusus untuk memenuhi kebutuhan para bidan dalam praktik sehari-hari.
            </p>
          </GSAPScrollTrigger>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Feature Card 1: Akurat & Terpercaya */}
            <GSAPScrollTrigger 
              animationType="fadeIn" 
              start="top 85%"
              className="w-full flex"
            >
              <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-[#E1F5FE] to-[#B3E5FC] p-4 rounded-full inline-flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E86AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#2E86AB] transition-colors duration-300">Akurat & Terpercaya</h3>
                <p className="text-base text-gray-600 leading-relaxed flex-grow">Perhitungan dan informasi berdasarkan standar medis terkini dan sumber terpercaya.</p>
              </div>
            </GSAPScrollTrigger>

            {/* Feature Card 2: Akses Mudah */}
            <GSAPScrollTrigger 
              animationType="fadeIn" 
              start="top 85%"
              delay={0.15}
              className="w-full flex"
            >
              <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3] p-4 rounded-full inline-flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#FF8F00] transition-colors duration-300">Akses Mudah</h3>
                <p className="text-base text-gray-600 leading-relaxed flex-grow">Dapat diakses kapan saja, di mana saja melalui perangkat apa pun.</p>
              </div>
            </GSAPScrollTrigger>

            {/* Feature Card 3: User-Friendly */}
            <GSAPScrollTrigger 
              animationType="fadeIn" 
              start="top 85%"
              delay={0.3}
              className="w-full flex"
            >
              <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD0] p-4 rounded-full inline-flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AD1457" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <path d="M9 9h.01"></path>
                    <path d="M15 9h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#AD1457] transition-colors duration-300">User-Friendly</h3>
                <p className="text-base text-gray-600 leading-relaxed flex-grow">Antarmuka yang intuitif dan mudah digunakan bahkan untuk pengguna baru.</p>
              </div>
            </GSAPScrollTrigger>

            {/* Feature Card 4: Efisiensi Praktik */}
            <GSAPScrollTrigger 
              animationType="fadeIn" 
              start="top 85%"
              delay={0.45}
              className="w-full flex"
            >
              <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] p-4 rounded-full inline-flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1v3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <path d="M4 9s1-1 4-1 5 2 8 2 4-1 4-1v3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <circle cx="4" cy="20" r="2"></circle>
                    <circle cx="16" cy="20" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#2E7D32] transition-colors duration-300">Efisiensi Praktik</h3>
                <p className="text-base text-gray-600 leading-relaxed flex-grow">Menghemat waktu dan mengurangi kesalahan dalam perhitungan rutin.</p>
              </div>
            </GSAPScrollTrigger>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Placeholder */}
      {/* You can add a testimonial section here later if needed */}

      {/* Call to Action Section - Placeholder */}
      {/* You can add a call to action section here later if needed */}
    </div>
  );
}

/* Add these animations to your globals.css */
/* 
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes pulse-slower {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 6s ease-in-out infinite;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
*/
