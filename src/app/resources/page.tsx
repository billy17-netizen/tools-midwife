'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

// Define types for resources
type Resource = {
  title: string;
  source: string;
  date: string;
  link: string;
  summary: string;
  tags: string[];
};

type ResourceCategories = {
  guidelines: Resource[];
  research: Resource[];
  nutrition: Resource[];
  tools: Resource[];
};

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'research' | 'nutrition' | 'tools'>('guidelines');

  const resources: ResourceCategories = {
    guidelines: [
      {
        title: "WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience",
        source: "World Health Organization",
        date: "2023",
        link: "https://www.who.int/publications/i/item/9789241549912",
        summary: "Rekomendasi komprehensif untuk perawatan antenatal yang berfokus pada pengalaman kehamilan positif. Mencakup nutrisi, evaluasi dan pencegahan penyakit, dan dukungan sistem kesehatan.",
        tags: ["ANC", "WHO", "Kehamilan"]
      },
      {
        title: "Panduan Praktik Kebidanan dan Kandungan",
        source: "POGI (Perkumpulan Obstetri dan Ginekologi Indonesia)",
        date: "2022",
        link: "https://pogi.or.id/publish/praktek-kebidanan-dan-kandungan/",
        summary: "Panduan terbaru untuk praktik kebidanan dan kandungan di Indonesia yang memuat standar pelayanan kebidanan berdasarkan bukti ilmiah terkini.",
        tags: ["POGI", "Kebidanan", "Standar Pelayanan"]
      },
      {
        title: "Pedoman Pelayanan Antenatal Terpadu",
        source: "Kementerian Kesehatan RI",
        date: "2021",
        link: "https://kesga.kemkes.go.id/pedoman-antenatal-terpadu",
        summary: "Pedoman nasional mengenai pelayanan antenatal terpadu yang meliputi skrining, diagnosis, dan tatalaksana faktor risiko serta komplikasi kehamilan.",
        tags: ["Kemenkes", "ANC", "Terpadu"]
      },
      {
        title: "Implementing Midwifery Continuity of Care Models",
        source: "International Confederation of Midwives",
        date: "2023",
        link: "https://www.internationalmidwives.org/our-work/policy-and-practice/",
        summary: "Panduan untuk implementasi model pelayanan kebidanan berkelanjutan yang mengutamakan kontinuitas perawatan dari satu bidan atau tim bidan kecil.",
        tags: ["ICM", "Continuity of Care", "Model Pelayanan"]
      },
    ],
    research: [
      {
        title: "Effect of Delayed vs Immediate Cord Clamping on Maternal and Infant Outcomes",
        source: "American Journal of Obstetrics and Gynecology",
        date: "2023",
        link: "https://www.ajog.org/article/recent-studies-on-cord-clamping",
        summary: "Studi meta-analisis yang menunjukkan bahwa penundaan penjepitan tali pusat terkait dengan peningkatan kadar hemoglobin pada bayi dan penurunan risiko anemia.",
        tags: ["Tali Pusat", "Hemoglobin", "Meta-analisis"]
      },
      {
        title: "Aspirin Use to Prevent Preeclampsia and Adverse Perinatal Outcomes",
        source: "The Lancet",
        date: "2022",
        link: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(22)00211-X/fulltext",
        summary: "Penelitian terbaru yang mengevaluasi efektivitas aspirin dosis rendah dalam pencegahan preeklamsia pada wanita berisiko tinggi dan hasil perinatal yang merugikan.",
        tags: ["Preeklamsia", "Aspirin", "Pencegahan"]
      },
      {
        title: "Exclusive Breastfeeding Duration and Infant Growth Outcomes",
        source: "Journal of Pediatrics",
        date: "2023",
        link: "https://www.jpeds.com/article/breastfeeding-duration-2023",
        summary: "Penelitian kohort yang mengevaluasi hubungan antara durasi pemberian ASI eksklusif dengan pertumbuhan dan perkembangan bayi selama dua tahun pertama kehidupan.",
        tags: ["ASI", "Pertumbuhan Bayi", "Perkembangan"]
      },
      {
        title: "Pengaruh Senam Hamil Terhadap Kenyamanan Ibu Hamil Trimester III",
        source: "Jurnal Kesehatan Ibu dan Anak Indonesia",
        date: "2023",
        link: "https://jurnalkia.com/index.php/article/2023",
        summary: "Penelitian yang menunjukkan bahwa senam hamil secara teratur pada trimester ketiga dapat mengurangi keluhan umum dan meningkatkan kenyamanan selama kehamilan.",
        tags: ["Senam Hamil", "Trimester III", "Kenyamanan"]
      },
    ],
    nutrition: [
      {
        title: "Rekomendasi Nutrisi untuk Ibu Hamil dan Menyusui",
        source: "Indonesian Society of Obstetrics and Gynecology Nutrition Task Force",
        date: "2023",
        link: "https://nutrition-pregnancy.id/recomendations",
        summary: "Pedoman terbaru tentang kebutuhan nutrisi untuk ibu hamil dan menyusui, termasuk suplemen zat besi, asam folat, dan pola makan seimbang.",
        tags: ["Nutrisi", "Ibu Hamil", "Menyusui"]
      },
      {
        title: "Nutrition During Pregnancy and Lactation: An Implementation Guide",
        source: "National Academies of Sciences, Engineering, and Medicine",
        date: "2022",
        link: "https://www.nationalacademies.org/nutrition-during-pregnancy",
        summary: "Panduan implementasi untuk profesional kesehatan tentang nutrisi yang optimal selama kehamilan dan menyusui berdasarkan bukti ilmiah terkini.",
        tags: ["Nutrisi", "Kehamilan", "Laktasi"]
      },
      {
        title: "Angka Kecukupan Gizi untuk Ibu Hamil",
        source: "Kementerian Kesehatan RI",
        date: "2023",
        link: "https://gizi.kemkes.go.id/akg-ibu-hamil",
        summary: "Standar angka kecukupan gizi yang direkomendasikan untuk ibu hamil sesuai trimester dan kondisi khusus seperti usia atau kehamilan ganda.",
        tags: ["AKG", "Gizi", "Trimester"]
      },
      {
        title: "Dietary Interventions to Prevent Gestational Diabetes",
        source: "Diabetes Care Journal",
        date: "2023",
        link: "https://care.diabetesjournals.org/content/dietary-interventions-gdm",
        summary: "Ulasan sistematis tentang efektivitas intervensi diet untuk pencegahan dan pengelolaan diabetes gestasional pada wanita hamil.",
        tags: ["Diabetes Gestasional", "Diet", "Pencegahan"]
      },
    ],
    tools: [
      {
        title: "WHO Reproductive Health Library",
        source: "World Health Organization",
        date: "2023",
        link: "https://extranet.who.int/rhl",
        summary: "Sumber daya digital berdasarkan bukti untuk praktik kesehatan reproduksi dan kebidanan, termasuk panduan praktik klinis dan alat pembelajaran.",
        tags: ["WHO", "Digital", "Kesehatan Reproduksi"]
      },
      {
        title: "App Bidan KIA",
        source: "Kementerian Kesehatan RI",
        date: "2022",
        link: "https://play.google.com/store/apps/bidan-kia",
        summary: "Aplikasi resmi untuk membantu bidan dalam pelayanan KIA yang mencakup pemantauan kehamilan, persalinan, dan pertumbuhan anak sesuai standar nasional.",
        tags: ["Aplikasi", "KIA", "Pemantauan"]
      },
      {
        title: "Safe Delivery App",
        source: "Maternity Foundation",
        date: "2023",
        link: "https://www.maternity.dk/safe-delivery-app/",
        summary: "Aplikasi yang menyediakan panduan berbasis bukti untuk menangani komplikasi kehamilan dan persalinan dalam format video dan daftar periksa.",
        tags: ["Aplikasi", "Persalinan", "Komplikasi"]
      },
      {
        title: "SI-MUTU KIA",
        source: "Kementerian Kesehatan RI",
        date: "2023",
        link: "https://simutu.kemkes.go.id/",
        summary: "Sistem informasi untuk pemantauan mutu pelayanan kesehatan ibu dan anak yang membantu evaluasi dan peningkatan kualitas layanan kebidanan.",
        tags: ["Sistem Informasi", "Mutu", "Evaluasi"]
      },
    ]
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#2E86AB]/20 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 -left-24 w-56 sm:w-72 h-56 sm:h-72 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl animate-pulse-slower"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#F6F5AE]/30 rounded-full opacity-30 blur-3xl animate-float"></div>
      
      <div className="container mx-auto py-12 px-4 sm:px-6 relative z-10">
        <GSAPScrollTrigger animationType="fadeIn" className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 bg-[#2E86AB]/10 text-[#2E86AB] text-sm font-medium rounded-full mb-3">
            Referensi Terbaru
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-6">
            Sumber Rujukan untuk Bidan
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Kumpulan pedoman, penelitian, dan sumber daya terbaru untuk mendukung praktik kebidanan berbasis bukti.
          </p>
        </GSAPScrollTrigger>

        <Tabs defaultValue="guidelines" className="w-full max-w-5xl mx-auto" value={activeTab} onValueChange={(value) => setActiveTab(value as 'guidelines' | 'research' | 'nutrition' | 'tools')}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="guidelines" className="data-[state=active]:bg-[#2E86AB]/10 data-[state=active]:text-[#2E86AB]">
              Pedoman
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-[#2E86AB]/10 data-[state=active]:text-[#2E86AB]">
              Penelitian
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-[#2E86AB]/10 data-[state=active]:text-[#2E86AB]">
              Nutrisi
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-[#2E86AB]/10 data-[state=active]:text-[#2E86AB]">
              Alat Bantu
            </TabsTrigger>
          </TabsList>
          
          {(Object.keys(resources) as Array<keyof ResourceCategories>).map((category) => (
            <TabsContent 
              key={category} 
              value={category} 
              className="mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources[category].map((resource, idx) => (
                  <GSAPScrollTrigger 
                    key={idx} 
                    animationType="fadeIn" 
                    delay={0.1 * idx}
                    className="h-full"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all h-full border border-gray-100">
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {resource.tags.map((tag, tagIdx) => (
                            <span 
                              key={tagIdx} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2E86AB]/10 text-[#2E86AB]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <CardTitle className="text-lg text-gray-800">{resource.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center justify-between">
                            <span className="text-[#2E86AB] font-medium">{resource.source}</span>
                            <span className="text-gray-500 text-sm">{resource.date}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 text-sm">{resource.summary}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="text-[#2E86AB] border-[#2E86AB]/20 hover:bg-[#2E86AB]/5 hover:border-[#2E86AB]/30 transition-all w-full"
                        >
                          <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                            Lihat Referensi
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </GSAPScrollTrigger>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <GSAPScrollTrigger animationType="fadeIn" className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#2E86AB]/5 to-[#F24236]/5 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Butuh Referensi Lebih Spesifik?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Kami selalu memperbarui halaman ini dengan sumber referensi terbaru. Jika Anda membutuhkan informasi lebih spesifik, silakan hubungi tim kami.
            </p>
            <Button className="bg-gradient-to-r from-[#2E86AB] to-[#F24236] hover:shadow-md hover:scale-105 transition-all duration-300">
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 