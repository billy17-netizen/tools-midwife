'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, AlertTriangle, Heart, Landmark, Phone, FileText, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// Normal range data
const normalRangeData = [
  {
    id: 'hemoglobin',
    category: 'Darah',
    title: 'Hemoglobin (Hb)',
    normalRange: 'Wanita: 12-16 g/dL',
    pregnancyRange: 'Trimester 1: ≥11 g/dL\nTrimester 2: ≥10.5 g/dL\nTrimester 3: ≥11 g/dL',
    interpretation: [
      { range: '<10.5 g/dL', status: 'Anemia', action: 'Pemberian tablet Fe dan evaluasi penyebab' },
      { range: '<8 g/dL', status: 'Anemia sedang-berat', action: 'Rujuk ke dokter untuk evaluasi lebih lanjut' }
    ]
  },
  {
    id: 'hematocrit',
    category: 'Darah',
    title: 'Hematokrit (Hct)',
    normalRange: 'Wanita: 36-47%',
    pregnancyRange: 'Trimester 1: 31-41%\nTrimester 2: 30-39%\nTrimester 3: 28-40%',
    interpretation: [
      { range: '<30%', status: 'Anemia', action: 'Evaluasi bersama dengan Hb' }
    ]
  },
  {
    id: 'blood-glucose',
    category: 'Metabolik',
    title: 'Glukosa Darah Puasa',
    normalRange: '70-100 mg/dL',
    pregnancyRange: '<92 mg/dL',
    interpretation: [
      { range: '92-126 mg/dL', status: 'Prediabetes / intoleransi glukosa', action: 'Evaluasi dengan tes OGTT' },
      { range: '>126 mg/dL', status: 'Diabetes mellitus', action: 'Rujuk ke dokter spesialis' }
    ]
  },
  {
    id: 'blood-pressure',
    category: 'Kardiovaskular',
    title: 'Tekanan Darah',
    normalRange: '<120/80 mmHg',
    pregnancyRange: '<140/90 mmHg',
    interpretation: [
      { range: '140/90 - 159/109 mmHg', status: 'Hipertensi dalam kehamilan', action: 'Pemantauan ketat dan rujuk jika disertai protein urin' },
      { range: '≥160/110 mmHg', status: 'Hipertensi berat', action: 'Rujuk segera ke rumah sakit' }
    ]
  },
  {
    id: 'proteinuria',
    category: 'Urin',
    title: 'Protein Urin',
    normalRange: 'Negatif',
    pregnancyRange: 'Negatif / Trace',
    interpretation: [
      { range: '1+', status: 'Proteinuria ringan', action: 'Evaluasi tekanan darah dan pemantauan' },
      { range: '≥2+', status: 'Proteinuria bermakna', action: 'Evaluasi untuk preeklampsia, perlu rujukan' }
    ]
  },
  {
    id: 'fundal-height',
    category: 'Fisik',
    title: 'Tinggi Fundus Uteri',
    normalRange: 'N/A',
    pregnancyRange: 'Sesuai usia kehamilan (cm):\nTrimester 2-3: Usia kehamilan (minggu) ± 2 cm',
    interpretation: [
      { range: '>2 cm dari usia kehamilan', status: 'Kemungkinan: makrosomia, kehamilan ganda, polihidramnion', action: 'Evaluasi dengan USG' },
      { range: '<2 cm dari usia kehamilan', status: 'Kemungkinan: IUGR, oligohidramnion', action: 'Evaluasi dengan USG' }
    ]
  },
];

// Danger signs data
const dangerSignsData = [
  {
    id: 'bleeding',
    title: 'Perdarahan',
    signs: [
      'Perdarahan pervaginam pada trimester pertama, kedua, atau ketiga',
      'Perdarahan pasca persalinan',
      'Perdarahan dengan nyeri perut hebat'
    ],
    action: 'Rujuk segera ke rumah sakit. Harus diperlakukan sebagai kegawatdaruratan. Jika perdarahan banyak, pasang infus untuk mengatasi syok.',
    severity: 'high'
  },
  {
    id: 'preeclampsia',
    title: 'Tanda Preeklampsia',
    signs: [
      'Tekanan darah ≥140/90 mmHg',
      'Proteinuria ≥2+',
      'Sakit kepala hebat',
      'Gangguan penglihatan (pandangan kabur, melihat bintik-bintik)',
      'Pembengkakan pada wajah, tangan, atau kaki yang signifikan'
    ],
    action: 'Rujuk segera ke rumah sakit. Preeklampsia berat memerlukan penanganan di rumah sakit.',
    severity: 'high'
  },
  {
    id: 'fever',
    title: 'Demam Tinggi',
    signs: [
      'Suhu badan ≥38°C',
      'Disertai menggigil',
      'Disertai nyeri saat berkemih'
    ],
    action: 'Evaluasi untuk infeksi (ISK, malaria, dengue). Jika disertai tanda syok atau keadaan umum buruk, rujuk segera.',
    severity: 'medium'
  },
  {
    id: 'labor',
    title: 'Tanda Persalinan Prematur',
    signs: [
      'Kontraksi teratur sebelum usia kehamilan 37 minggu',
      'Pecah ketuban sebelum waktunya',
      'Nyeri perut bawah yang menetap'
    ],
    action: 'Rujuk ke rumah sakit untuk penilaian dan penanganan lebih lanjut.',
    severity: 'medium'
  },
  {
    id: 'fetal-movement',
    title: 'Penurunan Gerakan Janin',
    signs: [
      'Gerakan janin berkurang drastis atau tidak terasa',
      'Gerakan janin <10 kali dalam 12 jam saat hamil tua'
    ],
    action: 'Evaluasi DJJ dan rujuk untuk pemantauan kesejahteraan janin.',
    severity: 'medium'
  },
  {
    id: 'emergency-postpartum',
    title: 'Kegawatan Postpartum',
    signs: [
      'Perdarahan postpartum (>500 ml)',
      'Demam tinggi pasca persalinan',
      'Bau tidak enak dari vagina',
      'Bengkak, nyeri dan kemerahan pada payudara disertai demam'
    ],
    action: 'Rujuk segera. Jika perdarahan postpartum, lakukan penanganan awal untuk atonia uteri.',
    severity: 'high'
  },
];

// Emergency protocol data
const emergencyProtocolData = [
  {
    id: 'postpartum-hemorrhage',
    title: 'Perdarahan Postpartum',
    steps: [
      { id: 'step-1', title: 'Panggil bantuan', content: 'Aktivasi sistem bantuan darurat' },
      { id: 'step-2', title: 'Evaluasi perdarahan', content: 'Perkirakan jumlah darah yang keluar' },
      { id: 'step-3', title: 'Uterotonika', content: 'Berikan oksitosin 10 IU IM' },
      { id: 'step-4', title: 'Pijat uterus', content: 'Lakukan masase uterus' },
      { id: 'step-5', title: 'Eksplorasi', content: 'Periksa adanya sisa plasenta atau laserasi' },
      { id: 'step-6', title: 'Pasang IV line', content: 'Pasang infus dengan kateter besar (16-18G)' },
      { id: 'step-7', title: 'Kompresi bimanual', content: 'Lakukan kompresi bimanual jika perdarahan berlanjut' },
      { id: 'step-8', title: 'Rujuk', content: 'Rujuk ke fasilitas kesehatan yang lebih tinggi' },
    ]
  },
  {
    id: 'preeclampsia-management',
    title: 'Penanganan Preeklampsia',
    steps: [
      { id: 'step-1', title: 'Evaluasi kondisi', content: 'Ukur tekanan darah, periksa protein urine' },
      { id: 'step-2', title: 'Antikonvulsan', content: 'Berikan MgSO4 sebagai pencegahan kejang' },
      { id: 'step-3', title: 'Antihipertensi', content: 'Berikan obat antihipertensi jika TD ≥160/110 mmHg' },
      { id: 'step-4', title: 'Posisi miring kiri', content: 'Posisikan pasien miring ke kiri' },
      { id: 'step-5', title: 'Persiapan rujukan', content: 'Siapkan transportasi untuk rujukan ke rumah sakit' },
      { id: 'step-6', title: 'Pemantauan', content: 'Pantau tanda vital dan kondisi pasien selama perjalanan' },
    ]
  },
  {
    id: 'neonatal-resuscitation',
    title: 'Resusitasi Neonatus',
    steps: [
      { id: 'step-1', title: '30 detik pertama', content: 'Keringkan, posisikan, bersihkan jalan napas' },
      { id: 'step-2', title: 'Evaluasi', content: 'Nilai pernapasan, frekuensi jantung, dan warna' },
      { id: 'step-3', title: 'Ventilasi', content: 'Berikan ventilasi tekanan positif jika tidak bernapas atau gasping' },
      { id: 'step-4', title: 'Chest compression', content: 'Lakukan kompresi dada jika HR <60 bpm setelah 30 detik ventilasi' },
      { id: 'step-5', title: 'Obat-obatan', content: 'Pertimbangkan epinefrin jika HR tetap <60 bpm' },
      { id: 'step-6', title: 'Pasca resusitasi', content: 'Berikan perawatan pasca resusitasi dan rujuk' },
    ]
  },
];

// Referral hospital data
const referralHospitalData = [
  {
    id: 'hospital-1',
    name: 'RSUD Dr. Soetomo',
    level: 'Tersier',
    address: 'Jl. Mayjen Prof. Dr. Moestopo No.6-8, Surabaya',
    phone: '(031) 5501078',
    specialties: ['Umum', 'Kandungan', 'Neonatal', 'NICU']
  },
  {
    id: 'hospital-2',
    name: 'RSUD Dr. Saiful Anwar',
    level: 'Tersier',
    address: 'Jl. Jaksa Agung Suprapto No.2, Malang',
    phone: '(0341) 362101',
    specialties: ['Umum', 'Kandungan', 'Neonatal', 'NICU']
  },
  {
    id: 'hospital-3',
    name: 'RSUD Sidoarjo',
    level: 'Sekunder',
    address: 'Jl. Mojopahit No.667, Sidoarjo',
    phone: '(031) 8961649',
    specialties: ['Umum', 'Kandungan', 'Neonatal']
  },
  {
    id: 'hospital-4',
    name: 'RSI Jemursari',
    level: 'Sekunder',
    address: 'Jl. Jemursari No.51-57, Surabaya',
    phone: '(031) 8284505',
    specialties: ['Umum', 'Kandungan', 'Neonatal']
  },
  {
    id: 'hospital-5',
    name: 'RSIA Kendangsari MERR',
    level: 'Khusus',
    address: 'Jl. Raya MERR, Surabaya',
    phone: '(031) 99853100',
    specialties: ['Kandungan', 'Neonatal']
  },
];

export default function ReferenceInfoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState({
    normalRange: normalRangeData,
    dangerSigns: dangerSignsData,
    emergencyProtocol: emergencyProtocolData,
    referralHospital: referralHospitalData
  });

  // Filter data based on search query
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    
    // Filter normal range data
    const filteredNormalRange = normalRangeData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.normalRange.toLowerCase().includes(query) ||
      item.pregnancyRange.toLowerCase().includes(query)
    );
    
    // Filter danger signs data
    const filteredDangerSigns = dangerSignsData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.signs.some(sign => sign.toLowerCase().includes(query)) ||
      item.action.toLowerCase().includes(query)
    );
    
    // Filter emergency protocol data
    const filteredEmergencyProtocol = emergencyProtocolData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.steps.some(step => 
        step.title.toLowerCase().includes(query) || 
        step.content.toLowerCase().includes(query)
      )
    );
    
    // Filter referral hospital data
    const filteredReferralHospital = referralHospitalData.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.level.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      item.specialties.some(specialty => specialty.toLowerCase().includes(query))
    );
    
    setFilteredData({
      normalRange: filteredNormalRange,
      dangerSigns: filteredDangerSigns,
      emergencyProtocol: filteredEmergencyProtocol,
      referralHospital: filteredReferralHospital
    });
  };

  // Reset search
  const resetSearch = () => {
    setSearchQuery('');
    setFilteredData({
      normalRange: normalRangeData,
      dangerSigns: dangerSignsData,
      emergencyProtocol: emergencyProtocolData,
      referralHospital: referralHospitalData
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E86AB]/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <GSAPAnimation animationType="fadeIn" delay={0.2}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-2">
              Info Rujukan Cepat
            </h1>
            <p className="text-gray-600">
              Informasi medis dan rujukan untuk parameter kesehatan ibu dan bayi
            </p>
          </div>
        </GSAPAnimation>

        <GSAPScrollTrigger 
          animationType="slideUp" 
          start="top 85%"
          className="w-full mb-8"
        >
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
              <CardTitle>Pencarian Cepat</CardTitle>
              <CardDescription>
                Masukkan kata kunci untuk mencari informasi medis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Cari parameter, tanda bahaya, protokol..."
                    className="pl-10 pr-4 py-2 border-gray-200 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-[#2E86AB] hover:bg-[#2E86AB]/90"
                >
                  Cari
                </Button>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={resetSearch}
                    className="border-gray-200"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>

        <Tabs defaultValue="normal-range" className="w-full">
          <TabsList className="w-full flex overflow-x-auto justify-start mb-6 pb-2 space-x-2">
            <TabsTrigger
              value="normal-range"
              className="text-sm px-4 py-2 data-[state=active]:bg-[#2E86AB] data-[state=active]:text-white flex-shrink-0"
            >
              Nilai Normal
            </TabsTrigger>
            <TabsTrigger
              value="danger-signs"
              className="text-sm px-4 py-2 data-[state=active]:bg-[#2E86AB] data-[state=active]:text-white flex-shrink-0"
            >
              Tanda Bahaya
            </TabsTrigger>
            <TabsTrigger
              value="emergency-protocol"
              className="text-sm px-4 py-2 data-[state=active]:bg-[#2E86AB] data-[state=active]:text-white flex-shrink-0"
            >
              Protokol Kegawatdaruratan
            </TabsTrigger>
            <TabsTrigger
              value="referral-hospital"
              className="text-sm px-4 py-2 data-[state=active]:bg-[#2E86AB] data-[state=active]:text-white flex-shrink-0"
            >
              Rumah Sakit Rujukan
            </TabsTrigger>
          </TabsList>

          {/* Normal Range Tab */}
          <TabsContent value="normal-range">
            <div className="space-y-6">
              {filteredData.normalRange.length > 0 ? (
                filteredData.normalRange.map((item, index) => (
                  <GSAPScrollTrigger
                    key={item.id}
                    animationType="fadeIn"
                    delay={0.1 * index}
                    start="top 90%"
                    className="w-full"
                  >
                    <Card className="overflow-hidden border-gray-100">
                      <CardHeader className="py-4 bg-[#2E86AB]/5">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2 bg-[#2E86AB]/20 text-[#2E86AB] hover:bg-[#2E86AB]/30">
                              {item.category}
                            </Badge>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Nilai Normal</h4>
                            <p className="text-gray-700 whitespace-pre-line">{item.normalRange}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Nilai Normal Kehamilan</h4>
                            <p className="text-gray-700 whitespace-pre-line">{item.pregnancyRange}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Interpretasi</h4>
                          <div className="space-y-2">
                            {item.interpretation.map((interp, idx) => (
                              <div key={idx} className="p-2 bg-gray-50 rounded-md">
                                <div className="flex flex-col sm:flex-row sm:gap-4">
                                  <div className="font-medium mb-1 sm:mb-0 sm:w-1/4">{interp.range}</div>
                                  <div className="sm:w-1/4">{interp.status}</div>
                                  <div className="text-gray-600 sm:w-2/4">{interp.action}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GSAPScrollTrigger>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada data nilai normal yang sesuai dengan pencarian Anda</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Danger Signs Tab */}
          <TabsContent value="danger-signs">
            <div className="space-y-6">
              {filteredData.dangerSigns.length > 0 ? (
                filteredData.dangerSigns.map((item, index) => (
                  <GSAPScrollTrigger
                    key={item.id}
                    animationType="fadeIn"
                    delay={0.1 * index}
                    start="top 90%"
                    className="w-full"
                  >
                    <Card className="overflow-hidden border-gray-100">
                      <CardHeader className={`py-4 ${
                        item.severity === 'high' 
                          ? 'bg-red-50' 
                          : item.severity === 'medium' 
                            ? 'bg-amber-50' 
                            : 'bg-blue-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`${
                              item.severity === 'high' 
                                ? 'text-red-500' 
                                : item.severity === 'medium' 
                                  ? 'text-amber-500' 
                                  : 'text-blue-500'
                            }`} size={20} />
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <Badge className={`${
                            item.severity === 'high' 
                              ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                              : item.severity === 'medium' 
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}>
                            {item.severity === 'high' 
                              ? 'Kegawatdaruratan' 
                              : item.severity === 'medium' 
                                ? 'Perlu Perhatian Segera' 
                                : 'Perlu Evaluasi'
                            }
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Tanda dan Gejala</h4>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                          {item.signs.map((sign, idx) => (
                            <li key={idx} className="text-gray-700">{sign}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Tindakan</h4>
                        <Alert className={`${
                          item.severity === 'high' 
                            ? 'bg-red-50 border-red-200' 
                            : item.severity === 'medium' 
                              ? 'bg-amber-50 border-amber-200' 
                              : 'bg-blue-50 border-blue-200'
                        }`}>
                          <AlertDescription>
                            {item.action}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </GSAPScrollTrigger>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada data tanda bahaya yang sesuai dengan pencarian Anda</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Emergency Protocol Tab */}
          <TabsContent value="emergency-protocol">
            <div className="space-y-6">
              {filteredData.emergencyProtocol.length > 0 ? (
                filteredData.emergencyProtocol.map((protocol, index) => (
                  <GSAPScrollTrigger
                    key={protocol.id}
                    animationType="fadeIn"
                    delay={0.1 * index}
                    start="top 90%"
                    className="w-full"
                  >
                    <Card className="overflow-hidden border-gray-100">
                      <CardHeader className="py-4 bg-[#2E86AB]/5">
                        <CardTitle className="text-lg">{protocol.title}</CardTitle>
                        <CardDescription>
                          Protokol penanganan kegawatdaruratan
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                          {protocol.steps.map((step, stepIdx) => (
                            <div
                              key={step.id}
                              className="p-3 border border-gray-100 rounded-md bg-white sm:w-[calc(50%-0.5rem)] flex items-start gap-3"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E86AB]/10 flex items-center justify-center text-[#2E86AB] font-medium">
                                {stepIdx + 1}
                              </div>
                              <div>
                                <h4 className="font-medium">{step.title}</h4>
                                <p className="text-sm text-gray-600">{step.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-2">
                          <AlertCircle className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                          <p className="text-sm text-amber-800">
                            Protokol ini adalah panduan umum. Selalu sesuaikan dengan kondisi spesifik pasien dan sumber daya yang tersedia.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </GSAPScrollTrigger>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada protokol kegawatdaruratan yang sesuai dengan pencarian Anda</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Referral Hospital Tab */}
          <TabsContent value="referral-hospital">
            <div className="space-y-6">
              {filteredData.referralHospital.length > 0 ? (
                filteredData.referralHospital.map((hospital, index) => (
                  <GSAPScrollTrigger
                    key={hospital.id}
                    animationType="fadeIn"
                    delay={0.1 * index}
                    start="top 90%"
                    className="w-full"
                  >
                    <Card className="overflow-hidden border-gray-100">
                      <CardHeader className="py-4 bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Landmark className="text-[#2E86AB]" size={20} />
                              {hospital.name}
                            </CardTitle>
                            <CardDescription>
                              Rumah Sakit {hospital.level}
                            </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {hospital.specialties.map((specialty, idx) => (
                              <Badge 
                                key={idx}
                                className="bg-[#2E86AB]/10 text-[#2E86AB] hover:bg-[#2E86AB]/20"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <FileText className="text-gray-400 mt-0.5" size={18} />
                            <span className="text-gray-700">{hospital.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="text-gray-400" size={18} />
                            <a 
                              href={`tel:${hospital.phone}`} 
                              className="text-[#2E86AB] hover:underline"
                            >
                              {hospital.phone}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GSAPScrollTrigger>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada rumah sakit rujukan yang sesuai dengan pencarian Anda</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-12"
        >
          <Card className="overflow-hidden border-gray-100 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/5 to-transparent">
              <CardTitle className="text-lg">Informasi Tambahan</CardTitle>
              <CardDescription>
                Panduan penggunaan info rujukan cepat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-4">
                <p>
                  Info rujukan cepat ini disediakan sebagai bantuan dalam pengambilan keputusan klinis.
                  Selalu gunakan penilaian klinis Anda dan sesuaikan dengan kondisi dan kebutuhan spesifik pasien.
                </p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-700">Tips Penggunaan</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
                        <li>Gunakan fitur pencarian untuk menemukan informasi dengan cepat</li>
                        <li>Tanda bahaya ditandai dengan warna berbeda berdasarkan tingkat kegawatan</li>
                        <li>Protokol kegawatdaruratan disusun sebagai langkah-langkah berurutan</li>
                        <li>Informasi rumah sakit rujukan selalu diperbarui secara berkala</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gray-700">Pertimbangan Penting</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
                        <li>Nilai normal dapat berbeda tergantung metode dan laboratorium</li>
                        <li>Tanda bahaya mungkin berbeda pada setiap pasien</li>
                        <li>Selalu konfirmasi ketersediaan rumah sakit rujukan sebelum merujuk</li>
                        <li>Sesuaikan protokol dengan sumber daya yang tersedia di tempat Anda</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="p-3 mt-4 bg-[#2E86AB]/5 border border-[#2E86AB]/20 rounded-md flex items-start gap-2">
                  <Heart className="text-[#2E86AB] mt-0.5" size={18} />
                  <p className="text-[#2E86AB]/80">
                    Jika Anda memiliki saran untuk penambahan atau pembaruan informasi, silakan hubungi tim pengembang.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 