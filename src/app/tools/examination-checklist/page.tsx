'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Printer, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// ANC checklist items
const ancItems = [
  {
    id: 'section-1',
    title: 'Identifikasi & Administrasi',
    items: [
      { id: 'item-1-1', label: 'Verifikasi identitas pasien' },
      { id: 'item-1-2', label: 'Update data kontak pasien' },
      { id: 'item-1-3', label: 'Rekam tanggal kunjungan' },
      { id: 'item-1-4', label: 'Periksa status BPJS/asuransi' },
      { id: 'item-1-5', label: 'Konfirmasi usia kehamilan (HPHT/USG)' },
    ]
  },
  {
    id: 'section-2',
    title: 'Pemeriksaan Fisik',
    items: [
      { id: 'item-2-1', label: 'Ukur tekanan darah' },
      { id: 'item-2-2', label: 'Ukur berat badan' },
      { id: 'item-2-3', label: 'Ukur tinggi fundus uteri (TFU)' },
      { id: 'item-2-4', label: 'Periksa denyut jantung janin (DJJ)' },
      { id: 'item-2-5', label: 'Periksa posisi janin (Leopold)' },
      { id: 'item-2-6', label: 'Periksa edema (wajah, tangan, kaki)' },
      { id: 'item-2-7', label: 'Ukur LILA (trimester 1)' },
    ]
  },
  {
    id: 'section-3',
    title: 'Pemeriksaan Laboratorium',
    items: [
      { id: 'item-3-1', label: 'Periksa hemoglobin (Hb)' },
      { id: 'item-3-2', label: 'Periksa golongan darah & rhesus (trimester 1)' },
      { id: 'item-3-3', label: 'Periksa protein urine' },
      { id: 'item-3-4', label: 'Periksa gula darah' },
      { id: 'item-3-5', label: 'Skrining HIV, Hepatitis B, Sifilis (trimester 1)' },
    ]
  },
  {
    id: 'section-4',
    title: 'Suplementasi & Imunisasi',
    items: [
      { id: 'item-4-1', label: 'Berikan tablet tambah darah (Fe)' },
      { id: 'item-4-2', label: 'Berikan suplemen asam folat' },
      { id: 'item-4-3', label: 'Berikan vitamin' },
      { id: 'item-4-4', label: 'Berikan imunisasi TT sesuai jadwal' },
    ]
  },
  {
    id: 'section-5',
    title: 'Edukasi & Konseling',
    items: [
      { id: 'item-5-1', label: 'Edukasi nutrisi ibu hamil' },
      { id: 'item-5-2', label: 'Informasi tanda bahaya kehamilan' },
      { id: 'item-5-3', label: 'Persiapan persalinan dan KB' },
      { id: 'item-5-4', label: 'Jadwalkan kunjungan berikutnya' },
      { id: 'item-5-5', label: 'Periksa buku KIA' },
    ]
  },
];

// PNC checklist items
const pncItems = [
  {
    id: 'pnc-section-1',
    title: 'Pemeriksaan Ibu',
    items: [
      { id: 'pnc-item-1-1', label: 'Ukur tekanan darah' },
      { id: 'pnc-item-1-2', label: 'Ukur suhu tubuh' },
      { id: 'pnc-item-1-3', label: 'Periksa involusi uterus' },
      { id: 'pnc-item-1-4', label: 'Periksa lochia' },
      { id: 'pnc-item-1-5', label: 'Periksa payudara dan ASI' },
      { id: 'pnc-item-1-6', label: 'Periksa luka perineum/operasi' },
      { id: 'pnc-item-1-7', label: 'Evaluasi tanda infeksi' },
      { id: 'pnc-item-1-8', label: 'Periksa hemoglobin (jika perlu)' },
    ]
  },
  {
    id: 'pnc-section-2',
    title: 'Pemeriksaan Bayi',
    items: [
      { id: 'pnc-item-2-1', label: 'Ukur berat badan bayi' },
      { id: 'pnc-item-2-2', label: 'Ukur panjang badan bayi' },
      { id: 'pnc-item-2-3', label: 'Ukur lingkar kepala bayi' },
      { id: 'pnc-item-2-4', label: 'Periksa tali pusat' },
      { id: 'pnc-item-2-5', label: 'Periksa BAB/BAK' },
      { id: 'pnc-item-2-6', label: 'Evaluasi refleks' },
      { id: 'pnc-item-2-7', label: 'Periksa ikterus' },
      { id: 'pnc-item-2-8', label: 'Evaluasi menyusui' },
    ]
  },
  {
    id: 'pnc-section-3',
    title: 'Suplementasi & Imunisasi',
    items: [
      { id: 'pnc-item-3-1', label: 'Berikan vitamin A pada ibu' },
      { id: 'pnc-item-3-2', label: 'Berikan tablet Fe' },
      { id: 'pnc-item-3-3', label: 'Berikan imunisasi Hepatitis B pada bayi' },
      { id: 'pnc-item-3-4', label: 'Berikan imunisasi BCG (bila belum)' },
      { id: 'pnc-item-3-5', label: 'Berikan imunisasi Polio (bila belum)' },
    ]
  },
  {
    id: 'pnc-section-4',
    title: 'Edukasi & Konseling',
    items: [
      { id: 'pnc-item-4-1', label: 'Edukasi perawatan payudara' },
      { id: 'pnc-item-4-2', label: 'Edukasi ASI eksklusif' },
      { id: 'pnc-item-4-3', label: 'Edukasi perawatan tali pusat' },
      { id: 'pnc-item-4-4', label: 'Edukasi tanda bahaya pada ibu' },
      { id: 'pnc-item-4-5', label: 'Edukasi tanda bahaya pada bayi' },
      { id: 'pnc-item-4-6', label: 'Konseling KB pasca persalinan' },
      { id: 'pnc-item-4-7', label: 'Jadwalkan kunjungan berikutnya' },
    ]
  },
];

// Form schema
const formSchema = z.object({
  patientName: z.string().min(2, { message: "Nama pasien wajib diisi" }),
  patientId: z.string().min(2, { message: "ID pasien wajib diisi" }),
  visitDate: z.string({
    required_error: "Tanggal kunjungan wajib diisi",
  }),
  checklist: z.record(z.boolean().default(false)),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExaminationChecklistPage() {
  const [activeTab, setActiveTab] = useState("anc");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientId: "",
      visitDate: new Date().toISOString().split('T')[0],
      checklist: {},
      notes: "",
    },
  });

  // Function to calculate completion percentage
  const calculateCompletion = (itemList: any[]) => {
    const allItems = itemList.flatMap(section => section.items.map(item => item.id));
    const checkedItems = allItems.filter(id => completedItems[id]);
    return Math.round((checkedItems.length / allItems.length) * 100);
  };

  const ancCompletionPercentage = calculateCompletion(ancItems);
  const pncCompletionPercentage = calculateCompletion(pncItems);

  // Handle form submission
  function onSubmit(values: FormValues) {
    setIsSubmitted(true);
    // In a real app, you would save to database here
    console.log("Form values:", values);
    console.log("Completed items:", completedItems);
  }

  // Toggle completion status of an item
  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
              Checklist Pemeriksaan
            </h1>
            <p className="text-gray-600">
              Daftar periksa standar untuk kunjungan ANC dan PNC
            </p>
          </div>
        </GSAPAnimation>

        <GSAPScrollTrigger 
          animationType="slideUp" 
          start="top 85%"
          className="w-full"
        >
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
              <CardTitle>Informasi Pasien</CardTitle>
              <CardDescription>
                Masukkan data pasien untuk dokumentasi pemeriksaan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="patientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Pasien</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan nama pasien"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.15} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Pasien</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan ID pasien"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="visitDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Kunjungan</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>
                  </div>
                  
                  <Tabs 
                    defaultValue="anc" 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="mt-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="anc" className="text-sm">
                          Antenatal Care (ANC)
                        </TabsTrigger>
                        <TabsTrigger value="pnc" className="text-sm">
                          Postnatal Care (PNC)
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="flex items-center text-sm">
                        <span className="mr-2">Progress:</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"
                            style={{ width: `${activeTab === "anc" ? ancCompletionPercentage : pncCompletionPercentage}%` }}
                          />
                        </div>
                        <span className="ml-2">{activeTab === "anc" ? ancCompletionPercentage : pncCompletionPercentage}%</span>
                      </div>
                    </div>
                    
                    <TabsContent value="anc" className="mt-0">
                      <div className="space-y-6">
                        {ancItems.map((section, index) => (
                          <GSAPScrollTrigger
                            key={section.id}
                            animationType="fadeIn"
                            delay={0.1 * index}
                            start="top 90%"
                            className="w-full"
                          >
                            <Card>
                              <CardHeader className="py-3 bg-gray-50">
                                <CardTitle className="text-lg font-medium">
                                  {section.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {section.items.map((item) => (
                                    <div 
                                      key={item.id}
                                      className={`flex items-start space-x-3 p-2 rounded-md ${
                                        completedItems[item.id] ? 'bg-[#2E86AB]/5' : ''
                                      }`}
                                    >
                                      <div 
                                        className="cursor-pointer" 
                                        onClick={() => toggleItem(item.id)}
                                      >
                                        {completedItems[item.id] ? (
                                          <CheckCircle className="h-5 w-5 text-[#2E86AB]" />
                                        ) : (
                                          <Circle className="h-5 w-5 text-gray-300" />
                                        )}
                                      </div>
                                      <span 
                                        className={`${
                                          completedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-700'
                                        }`}
                                      >
                                        {item.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </GSAPScrollTrigger>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pnc" className="mt-0">
                      <div className="space-y-6">
                        {pncItems.map((section, index) => (
                          <GSAPScrollTrigger
                            key={section.id}
                            animationType="fadeIn"
                            delay={0.1 * index}
                            start="top 90%"
                            className="w-full"
                          >
                            <Card>
                              <CardHeader className="py-3 bg-gray-50">
                                <CardTitle className="text-lg font-medium">
                                  {section.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {section.items.map((item) => (
                                    <div 
                                      key={item.id}
                                      className={`flex items-start space-x-3 p-2 rounded-md ${
                                        completedItems[item.id] ? 'bg-[#2E86AB]/5' : ''
                                      }`}
                                    >
                                      <div 
                                        className="cursor-pointer" 
                                        onClick={() => toggleItem(item.id)}
                                      >
                                        {completedItems[item.id] ? (
                                          <CheckCircle className="h-5 w-5 text-[#2E86AB]" />
                                        ) : (
                                          <Circle className="h-5 w-5 text-gray-300" />
                                        )}
                                      </div>
                                      <span 
                                        className={`${
                                          completedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-700'
                                        }`}
                                      >
                                        {item.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </GSAPScrollTrigger>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <GSAPScrollTrigger
                    animationType="fadeIn"
                    delay={0.3}
                    start="top 90%"
                    className="w-full"
                  >
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catatan Tambahan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tambahkan catatan khusus tentang pemeriksaan ini"
                              {...field}
                              className="min-h-[100px] focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </GSAPScrollTrigger>
                  
                  <GSAPScrollTrigger 
                    animationType="fadeIn" 
                    start="top 95%" 
                    delay={0.4}
                    className="flex flex-col sm:flex-row gap-4 justify-end"
                  >
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Printer size={16} />
                      <span>Cetak</span>
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-[#2E86AB] to-[#2E86AB]/80 flex items-center gap-2"
                    >
                      <Save size={16} />
                      <span>Simpan Pemeriksaan</span>
                    </Button>
                  </GSAPScrollTrigger>
                </form>
              </Form>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>

        {isSubmitted && (
          <GSAPAnimation animationType="fadeIn" delay={0.2} className="mb-8">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Pemeriksaan telah disimpan!</AlertTitle>
              <AlertDescription className="text-green-700">
                Data pemeriksaan telah berhasil disimpan ke dalam sistem.
              </AlertDescription>
            </Alert>
          </GSAPAnimation>
        )}

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-4"
        >
          <Card className="overflow-hidden border-gray-100 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/5 to-transparent">
              <CardTitle className="text-lg">Panduan Penggunaan</CardTitle>
              <CardDescription>
                Cara menggunakan checklist pemeriksaan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-4">
                <p>
                  Checklist ini dirancang untuk memastikan bahwa semua aspek penting dalam pemeriksaan
                  ANC (Antenatal Care) dan PNC (Postnatal Care) tercakup dengan baik.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700">
                  <li>Pilih jenis pemeriksaan (ANC atau PNC) sesuai kebutuhan</li>
                  <li>Isi data pasien dengan lengkap untuk keperluan dokumentasi</li>
                  <li>Klik pada item checklist yang telah dilakukan pemeriksaannya</li>
                  <li>Tambahkan catatan khusus jika diperlukan</li>
                  <li>Klik tombol "Simpan Pemeriksaan" setelah selesai</li>
                  <li>Gunakan tombol "Cetak" untuk mencetak hasil pemeriksaan</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 