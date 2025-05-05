'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/loading';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const router = useRouter();

  // Handle card click
  const handleCardClick = (e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingToolId(toolId);
    
    // Navigate after a small delay to show loading effect
    setTimeout(() => {
      router.push(`/tools/${toolId}`);
    }, 500);
  };

  // Array of tools based on RDP
  const allTools = [
    {
      id: 'iron-calculator',
      title: 'Kalkulator Zat Besi',
      description: 'Menghitung kebutuhan zat besi ibu hamil berdasarkan berbagai parameter kesehatan.',
      longDescription: 'Tool ini menghitung kebutuhan zat besi harian dan rekomendasi dosis suplemen berdasarkan parameter seperti usia gestasi, berat badan, tinggi badan, dan hasil lab hemoglobin.',
      category: 'kalkulator',
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
    },
    {
      id: 'pregnancy-calculator',
      title: 'Kalkulator Kehamilan',
      description: 'Menghitung usia kehamilan dan perkiraan persalinan berdasarkan HPHT.',
      longDescription: 'Tool ini menghitung usia gestasi, HPL (Hari Perkiraan Lahir), dan trimester kehamilan berdasarkan tanggal HPHT (Hari Pertama Haid Terakhir) dengan menggunakan rumus Naegele.',
      category: 'kalkulator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M6 9a6 6 0 1 1 12 0c0 3.1-5 8-6 9.4C11 17 6 12.1 6 9Z"></path>
          <circle cx="12" cy="9" r="1"></circle>
        </svg>
      ),
    },
    {
      id: 'bmi-calculator',
      title: 'Kalkulator BMI Ibu Hamil',
      description: 'Penghitung BMI khusus ibu hamil dengan rekomendasi pertambahan berat badan.',
      longDescription: 'Tool ini menghitung BMI pre-pregnancy, memberikan kategori BMI, dan memberikan target pertambahan berat badan ideal selama kehamilan per trimester.',
      category: 'kalkulator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M16 12h2v4h2a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2h2v-4h2"></path>
          <path d="M12 2a2 2 0 0 0-2 2v8h4V4a2 2 0 0 0-2-2Z"></path>
        </svg>
      ),
    },
    {
      id: 'medication-calculator',
      title: 'Kalkulator Dosis Obat',
      description: 'Penghitung dosis obat umum untuk ibu dan bayi.',
      longDescription: 'Tool ini membantu menghitung dosis yang tepat untuk berbagai obat yang umum digunakan dalam kebidanan, berdasarkan berat badan pasien dan kondisi khusus.',
      category: 'kalkulator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="m9 11 3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
    },
    {
      id: 'growth-curve',
      title: 'Kurva Pertumbuhan',
      description: 'Grafik pertumbuhan janin dan bayi sesuai standar WHO.',
      longDescription: 'Tool ini menyediakan kurva pertumbuhan untuk memantau perkembangan janin dan bayi, termasuk kurva WHO untuk berat badan bayi, grafik tinggi fundus uteri, dan grafik lingkar kepala janin.',
      category: 'grafik',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
    },
    {
      id: 'examination-checklist',
      title: 'Checklist Pemeriksaan',
      description: 'Daftar periksa standar untuk setiap kunjungan ANC/PNC.',
      longDescription: 'Tool ini menyediakan checklist standar untuk pemeriksaan ANC (Antenatal Care) dan PNC (Postnatal Care) untuk memastikan semua aspek penting diperiksa dalam setiap kunjungan.',
      category: 'checklist',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M9 9h6"></path>
          <path d="M9 12h6"></path>
          <path d="M9 15h6"></path>
        </svg>
      ),
    },
    {
      id: 'reference-info',
      title: 'Info Rujukan Cepat',
      description: 'Informasi rujukan medis cepat untuk parameter kesehatan.',
      longDescription: 'Tool ini menyediakan informasi rujukan cepat untuk parameter kesehatan seperti normal ranges (HB, GDA, dll), tanda bahaya kehamilan, protokol kegawatdaruratan, dan kontak rumah sakit rujukan.',
      category: 'referensi',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
    },
    {
      id: 'patient-records',
      title: 'Catatan Pasien',
      description: 'Sistem pencatatan digital untuk setiap pasien.',
      longDescription: 'Tool ini memungkinkan pencatatan digital untuk setiap pasien, termasuk riwayat kehamilan, hasil pemeriksaan, jadwal kontrol, dan status imunisasi, dengan kemampuan export/print rekam medis.',
      category: 'catatan',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
        </svg>
      ),
    },
  ];

  // Group tools by category
  const categories = [
    { id: 'all', label: 'Semua Tools' },
    { id: 'kalkulator', label: 'Kalkulator' },
    { id: 'grafik', label: 'Grafik & Chart' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'referensi', label: 'Referensi' },
    { id: 'catatan', label: 'Catatan' },
  ];

  // Filter tools based on search query
  const filteredTools = allTools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.longDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full relative overflow-hidden">
      {/* Show loading spinner when isLoading is true */}
      {isLoading && <LoadingSpinner />}
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#2E86AB]/20 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 -left-24 w-56 sm:w-72 h-56 sm:h-72 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl animate-pulse-slower"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#F6F5AE]/30 rounded-full opacity-30 blur-3xl animate-float"></div>
      
      <div className="container mx-auto py-12 px-4 sm:px-6 relative z-10">
        <GSAPScrollTrigger animationType="fadeIn" className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 bg-[#2E86AB]/10 text-[#2E86AB] text-sm font-medium rounded-full mb-3">
            Peralatan Digital
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-4">
            Tools untuk Bidan
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#2E86AB] to-[#F24236] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kumpulan tools digital untuk membantu para bidan dalam memberikan pelayanan terbaik kepada pasien.
          </p>
        </GSAPScrollTrigger>

        <GSAPScrollTrigger animationType="fadeIn" delay={0.2} className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Cari tools..."
              className="pl-10 pr-4 py-2 border-gray-200 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </GSAPScrollTrigger>

        <Tabs defaultValue="all" className="w-full overflow-hidden">
          <TabsList className="w-full flex overflow-x-auto justify-start mb-8 pb-2 space-x-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm px-4 py-2 data-[state=active]:bg-[#2E86AB] data-[state=active]:text-white flex-shrink-0"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools
                  .filter((tool) => category.id === 'all' || tool.category === category.id)
                  .map((tool, index) => (
                    <GSAPScrollTrigger
                      key={tool.id}
                      animationType="fadeIn"
                      delay={0.1 * index}
                      className="h-full"
                    >
                      <div onClick={(e) => handleCardClick(e, tool.id)}>
                        <Card className={`h-full hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-100 bg-white/90 backdrop-blur-sm cursor-pointer ${loadingToolId === tool.id ? 'opacity-70' : ''}`}>
                          <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-[#2E86AB]/10 p-3 rounded-lg">
                              {tool.icon}
                            </div>
                            <CardTitle className="text-lg text-gray-800">{tool.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-4 text-gray-600">{tool.description}</CardDescription>
                            <p className="text-sm text-gray-500">{tool.longDescription}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </GSAPScrollTrigger>
                  ))}
              </div>
              
              {filteredTools.filter((tool) => category.id === 'all' || tool.category === category.id).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada tools yang ditemukan dengan kata kunci "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 text-[#2E86AB] border-[#2E86AB]/20 hover:bg-[#2E86AB]/5"
                    onClick={() => setSearchQuery('')}
                  >
                    Reset Pencarian
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <GSAPScrollTrigger animationType="fadeIn" delay={0.4} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#2E86AB]/5 to-[#F24236]/5 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingin Tool Khusus?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Jika Anda membutuhkan tool khusus yang belum tersedia di sini, silakan hubungi tim kami untuk solusi yang disesuaikan.
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