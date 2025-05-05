'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#2E86AB]/20 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 -left-24 w-56 sm:w-72 h-56 sm:h-72 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl animate-pulse-slower"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#F6F5AE]/30 rounded-full opacity-30 blur-3xl animate-float"></div>
      
      <div className="container mx-auto py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <GSAPScrollTrigger animationType="fadeIn" className="text-center mb-16">
            <div className="flex flex-col items-center justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100/80 text-gray-700 text-sm font-medium rounded-full mb-3">
                Keunggulan Platform
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-6">
                Mengapa Menggunakan Tools Bidan?
              </h1>
              <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Sebuah platform digital yang dirancang untuk memudahkan para bidan dalam menjalankan tugas-tugas profesional mereka.
              </p>
            </div>
          </GSAPScrollTrigger>

          <div className="prose max-w-none">
            <GSAPScrollTrigger animationType="slideUp" className="mb-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-md">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-6">
                  Latar Belakang
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-0">
                  Website ini dirancang sebagai platform digital untuk memudahkan para bidan dalam menjalankan tugas-tugas profesional mereka. 
                  Dengan menyediakan berbagai tools seperti kalkulator zat besi, kalkulator kehamilan, dan fitur lainnya, website ini bertujuan 
                  meningkatkan efisiensi pelayanan kebidanan.
                </p>
              </div>
            </GSAPScrollTrigger>
            
            <GSAPScrollTrigger animationType="fadeIn" delay={0.2} className="my-16">
              <div className="bg-[#F7F7F2]/70 backdrop-blur-sm p-10 rounded-2xl shadow-md border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#2E86AB]/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">
                    Tujuan Utama
                  </h2>
                </div>
                <ul className="list-none space-y-4 text-gray-700 pl-0">
                  {[
                    "Menyediakan tools digital yang praktis dan akurat untuk bidan",
                    "Membantu monitoring kesehatan ibu hamil dan bayi",
                    "Meningkatkan efisiensi dan akurasi dalam pengambilan keputusan medis",
                    "Memberikan referensi cepat untuk parameter-parameter kesehatan penting"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center bg-white/60 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#2E86AB] to-[#F24236] rounded-full flex items-center justify-center text-white mr-4 shadow-sm">
                        {index + 1}
                      </div>
                      <p className="text-lg m-0">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </GSAPScrollTrigger>

            <GSAPScrollTrigger animationType="fadeIn" className="my-16">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-8 text-center">
                Fitur Utama
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Kalkulator Zat Besi",
                    description: "Menghitung kebutuhan zat besi ibu hamil berdasarkan berbagai parameter kesehatan.",
                    path: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2 M15 8.5V7 M18 10V7 M18 22v-8.3a4 4 0 0 0-4-4c-1.1 0-1.1-1.1-1.1-1.1 M15 22v-4 M12 22v-1.3 M18 22H9",
                  },
                  {
                    title: "Kalkulator Kehamilan",
                    description: "Menghitung usia kehamilan, perkiraan persalinan, dan trimester berdasarkan HPHT.",
                    path: "M6 9a6 6 0 1 1 12 0c0 3.1-5 8-6 9.4C11 17 6 12.1 6 9Z M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
                  },
                  {
                    title: "Kalkulator BMI",
                    description: "Penghitung BMI khusus ibu hamil dengan rekomendasi pertambahan berat badan.",
                    path: "M16 12h2v4h2a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2h2v-4h2 M12 2a2 2 0 0 0-2 2v8h4V4a2 2 0 0 0-2-2Z",
                  },
                  {
                    title: "Kalkulator Dosis Obat",
                    description: "Penghitung dosis obat umum untuk ibu dan bayi berdasarkan berat badan.",
                    path: "m9 11 3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
                  },
                ].map((feature, index) => (
                  <GSAPScrollTrigger
                    key={index}
                    animationType="slideUp"
                    delay={0.1 * index}
                    className="h-full"
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-gradient-to-br from-[#2E86AB]/20 to-[#F24236]/10 p-3 rounded-xl">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-[#2E86AB]"
                          >
                            <path d={feature.path}></path>
                          </svg>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </GSAPScrollTrigger>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Kurva Pertumbuhan",
                    description: "Grafik pertumbuhan janin dan bayi sesuai standar WHO.",
                    path: "M3 3v18h18 m-2-12-5 5-4-4-3 3",
                  },
                  {
                    title: "Checklist Pemeriksaan",
                    description: "Daftar periksa standar untuk setiap kunjungan ANC/PNC.",
                    path: "M3 3h18v18H3z M9 9h6 M9 12h6 M9 15h6",
                  },
                  {
                    title: "Info Rujukan Cepat",
                    description: "Informasi rujukan medis cepat untuk parameter kesehatan.",
                    path: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M12 16v-4 M12 8h.01",
                  },
                  {
                    title: "Catatan Pasien",
                    description: "Sistem pencatatan digital untuk setiap pasien.",
                    path: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
                  },
                ].map((feature, index) => (
                  <GSAPScrollTrigger
                    key={index}
                    animationType="slideUp"
                    delay={0.1 * (index + 4)}
                    className="h-full"
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-gradient-to-br from-[#2E86AB]/20 to-[#F24236]/10 p-3 rounded-xl">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-[#2E86AB]"
                          >
                            <path d={feature.path}></path>
                          </svg>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </GSAPScrollTrigger>
                ))}
              </div>
            </GSAPScrollTrigger>

            <GSAPScrollTrigger animationType="fadeIn" delay={0.2} className="my-16">
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E86AB]/10 to-[#F24236]/5 z-0"></div>
                <div className="relative p-10 z-10">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-8 text-center">
                    Target Pengguna
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Bidan praktik mandiri",
                      "Bidan di klinik/rumah sakit", 
                      "Mahasiswa kebidanan",
                      "Perawat yang menangani kesehatan ibu"
                    ].map((user, i) => (
                      <div key={i} className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2E86AB] to-[#F24236] rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <p className="text-lg font-medium m-0">{user}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GSAPScrollTrigger>

            <GSAPScrollTrigger animationType="fadeIn" className="my-16">
              <div className="bg-gradient-to-r from-[#2E86AB] to-[#F24236] text-white p-10 rounded-2xl shadow-lg">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6">Siap Mencoba Tools Bidan?</h2>
                  <p className="mb-8 text-lg opacity-90">
                    Tingkatkan efisiensi dan akurasi layanan kebidanan Anda dengan tools digital kami.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    asChild
                    className="text-[#2E86AB] font-medium hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 px-8"
                  >
                    <Link href="/tools" className="flex items-center">
                      Mulai Gunakan Tools
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </GSAPScrollTrigger>

            <GSAPScrollTrigger animationType="fadeIn" delay={0.1} className="mt-16">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-md">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-4">
                  Disclaimer Medis
                </h2>
                <div className="text-gray-600 p-5 bg-[#F7F7F2]/50 rounded-xl leading-relaxed">
                  <p>
                    Tools yang disediakan dalam website ini hanya sebagai alat bantu dan tidak menggantikan penilaian klinis profesional kesehatan. 
                    Setiap keputusan medis harus didasarkan pada penilaian menyeluruh terhadap kondisi pasien dan konsultasi dengan profesional kesehatan yang berkualifikasi.
                  </p>
                </div>
              </div>
            </GSAPScrollTrigger>
          </div>
        </div>
      </div>
    </div>
  );
} 