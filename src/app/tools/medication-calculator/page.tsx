'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// Medication data
interface Medication {
  id: string;
  name: string;
  category: string;
  dosagePerKg: number;
  maxDosage: number;
  unit: string;
  frequency: string;
  notes: string;
}

const medications: Medication[] = [
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    category: 'Analgesic',
    dosagePerKg: 15,
    maxDosage: 1000,
    unit: 'mg',
    frequency: '4-6 jam',
    notes: 'Maksimal 4 kali sehari. Tidak melebihi 4000 mg per hari untuk dewasa.'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    category: 'NSAID',
    dosagePerKg: 10,
    maxDosage: 800,
    unit: 'mg',
    frequency: '6-8 jam',
    notes: 'Diminum setelah makan. Tidak untuk anak <6 bulan.'
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    category: 'Antibiotic',
    dosagePerKg: 25,
    maxDosage: 500,
    unit: 'mg',
    frequency: '8 jam',
    notes: 'Dihabiskan sesuai anjuran dokter, biasanya 5-7 hari.'
  },
  {
    id: 'cefixime',
    name: 'Cefixime',
    category: 'Antibiotic',
    dosagePerKg: 8,
    maxDosage: 400,
    unit: 'mg',
    frequency: '12 jam',
    notes: 'Dapat dikonsumsi sebelum atau sesudah makan.'
  },
  {
    id: 'dexamethasone',
    name: 'Dexamethasone',
    category: 'Steroid',
    dosagePerKg: 0.3,
    maxDosage: 16,
    unit: 'mg',
    frequency: '24 jam',
    notes: 'Digunakan hanya dengan resep dokter.'
  }
];

// Form schema
const formSchema = z.object({
  patientType: z.string().min(1, { message: "Pilih tipe pasien" }),
  weight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num < 200;
  }, {
    message: "Berat badan harus antara 0-200 kg",
  }),
  age: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Usia harus lebih dari atau sama dengan 0",
  }),
  medicationId: z.string().min(1, { message: "Pilih obat" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MedicationCalculatorPage() {
  const [result, setResult] = useState<{
    medication: Medication;
    dosePerTime: number;
    dailyDose: number;
    adjustedDose: number;
    isMaxDose: boolean;
    formulation?: string;
  } | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientType: "child",
      weight: "",
      age: "",
      medicationId: "",
    },
  });

  function onSubmit(values: FormValues) {
    const medication = medications.find(med => med.id === values.medicationId);
    
    if (!medication) return;
    
    const weight = parseFloat(values.weight);
    const age = parseFloat(values.age);
    
    // Calculate base dose per kg
    let dosePerTime = weight * medication.dosagePerKg;
    
    // Check if exceeds max dose
    const isMaxDose = dosePerTime > medication.maxDosage;
    
    // Adjust dose based on patient type and age
    let adjustedDose = dosePerTime;
    
    if (values.patientType === "infant" && age < 1) {
      adjustedDose = dosePerTime * 0.5; // 50% dose for infants under 1 year
    } else if (isMaxDose) {
      adjustedDose = medication.maxDosage; // Cap at max dose
    }
    
    // Calculate daily dose (assuming 4 times a day as average)
    const timesPerDay = medication.frequency.includes("4-6") ? 4 : 
                        medication.frequency.includes("6-8") ? 3 : 
                        medication.frequency.includes("8") ? 3 : 
                        medication.frequency.includes("12") ? 2 : 1;
    
    const dailyDose = adjustedDose * timesPerDay;
    
    // Determine common formulation
    let formulation;
    if (medication.category === "Analgesic" || medication.category === "NSAID") {
      if (weight < 10) {
        formulation = "Sirup 120mg/5mL";
      } else if (weight < 30) {
        formulation = "Sirup 250mg/5mL";
      } else {
        formulation = "Tablet 500mg";
      }
    } else if (medication.category === "Antibiotic") {
      if (weight < 20) {
        formulation = "Sirup 125mg/5mL";
      } else {
        formulation = "Kapsul 250mg";
      }
    }
    
    setResult({
      medication,
      dosePerTime: parseFloat(dosePerTime.toFixed(2)),
      dailyDose: parseFloat(dailyDose.toFixed(2)),
      adjustedDose: parseFloat(adjustedDose.toFixed(2)),
      isMaxDose,
      formulation,
    });
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E86AB]/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <GSAPAnimation animationType="fadeIn" delay={0.2}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-2">
              Kalkulator Dosis Obat
            </h1>
            <p className="text-gray-600">
              Hitung dosis obat yang tepat berdasarkan berat badan dan usia
            </p>
          </div>
        </GSAPAnimation>

        <Tabs defaultValue="calculator" className="w-full">
          <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator">Kalkulator</TabsTrigger>
              <TabsTrigger value="info">Informasi Obat</TabsTrigger>
            </TabsList>
          </GSAPScrollTrigger>

          <TabsContent value="calculator">
            <GSAPScrollTrigger 
              animationType="slideUp" 
              start="top 85%"
              className="w-full"
            >
              <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
                  <CardTitle>Input Data Pasien</CardTitle>
                  <CardDescription>
                    Masukkan data pasien dan pilih obat untuk menghitung dosis yang tepat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                          <FormField
                            control={form.control}
                            name="patientType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tipe Pasien</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="focus:ring-[#2E86AB]/20">
                                      <SelectValue placeholder="Pilih tipe pasien" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="infant">Bayi (0-1 tahun)</SelectItem>
                                    <SelectItem value="child">Anak (1-12 tahun)</SelectItem>
                                    <SelectItem value="teen">Remaja (12-18 tahun)</SelectItem>
                                    <SelectItem value="adult">Dewasa (&gt;18 tahun)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Pilih kategori usia pasien
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                          <FormField
                            control={form.control}
                            name="medicationId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jenis Obat</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="focus:ring-[#2E86AB]/20">
                                      <SelectValue placeholder="Pilih obat" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {medications.map(med => (
                                      <SelectItem key={med.id} value={med.id}>
                                        {med.name} ({med.category})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Pilih obat yang ingin dihitung dosisnya
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideIn" delay={0.3} start="top 90%" className="w-full">
                          <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Berat Badan (kg)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Masukkan berat badan"
                                    {...field}
                                    className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Berat badan pasien dalam kilogram
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideIn" delay={0.4} start="top 90%" className="w-full">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usia (tahun)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Masukkan usia"
                                    {...field}
                                    className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Usia pasien dalam tahun
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </GSAPScrollTrigger>
                      </div>

                      <GSAPScrollTrigger 
                        animationType="fadeIn" 
                        start="top 95%" 
                        delay={0.5}
                        className="w-full"
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#2E86AB] to-[#2E86AB]/80 hover:shadow-md transition-all duration-300"
                        >
                          Hitung Dosis Obat
                        </Button>
                      </GSAPScrollTrigger>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </GSAPScrollTrigger>

            {result && (
              <GSAPScrollTrigger 
                animationType="scale" 
                start="top 90%"
                className="mt-8"
              >
                <Card className="overflow-hidden border-[#2E86AB]/20 border shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
                    <CardTitle>Hasil Kalkulasi Dosis Obat</CardTitle>
                    <CardDescription>
                      Hasil perhitungan dosis {result.medication.name} berdasarkan data pasien
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <GSAPScrollTrigger 
                        animationType="slideUp" 
                        start="top 95%"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                          <p className="text-sm font-medium text-gray-500 mb-1">Dosis per Pemberian</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-[#2E86AB]">
                              {result.adjustedDose}
                            </span>
                            <span className="ml-1 text-gray-700">{result.medication.unit}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Interval: Setiap {result.medication.frequency}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                          <p className="text-sm font-medium text-gray-500 mb-1">Total Dosis Harian</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-[#2E86AB]">
                              {result.dailyDose}
                            </span>
                            <span className="ml-1 text-gray-700">{result.medication.unit}/hari</span>
                          </div>
                        </div>
                      </GSAPScrollTrigger>

                      <GSAPScrollTrigger 
                        animationType="fadeIn" 
                        start="top 95%"
                        delay={0.2}
                      >
                        <Alert className={`
                          ${result.isMaxDose ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}
                        `}>
                          <AlertTitle className={`${
                            result.isMaxDose ? 'text-amber-700' : 'text-green-700'
                          }`}>
                            {result.isMaxDose 
                              ? 'Dosis Telah Disesuaikan (Melebihi Dosis Maksimal)'
                              : 'Dosis Dalam Rentang Normal'}
                          </AlertTitle>
                          <AlertDescription className="mt-2">
                            {result.isMaxDose 
                              ? `Dosis dihitung ({result.dosePerTime} ${result.medication.unit}) melebihi dosis maksimal, disesuaikan menjadi ${result.adjustedDose} ${result.medication.unit}.`
                              : `Dosis berada dalam rentang aman untuk pasien dengan berat badan dan usia tersebut.`}
                          </AlertDescription>
                        </Alert>
                      </GSAPScrollTrigger>

                      {result.formulation && (
                        <GSAPScrollTrigger 
                          animationType="slideUp" 
                          start="top 95%"
                          delay={0.3}
                        >
                          <div className="bg-[#F7F7F2] p-4 rounded-lg border border-gray-100">
                            <h3 className="font-semibold text-lg mb-2">Formulasi yang Disarankan</h3>
                            <p className="text-[#2E86AB] font-medium">
                              {result.formulation}
                            </p>
                          </div>
                        </GSAPScrollTrigger>
                      )}

                      <GSAPScrollTrigger 
                        animationType="fadeIn" 
                        start="top 95%"
                        delay={0.4}
                      >
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                          <h3 className="font-semibold text-blue-800 mb-2">Catatan Penting</h3>
                          <p className="text-blue-700 text-sm">
                            {result.medication.notes}
                          </p>
                        </div>
                      </GSAPScrollTrigger>
                    </div>
                  </CardContent>
                </Card>
              </GSAPScrollTrigger>
            )}
          </TabsContent>

          <TabsContent value="info">
            <GSAPScrollTrigger 
              animationType="slideUp" 
              start="top 85%"
              className="w-full"
            >
              <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
                  <CardTitle>Informasi Obat</CardTitle>
                  <CardDescription>
                    Daftar obat dan informasi dosis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medications.map((med, index) => (
                      <GSAPScrollTrigger
                        key={med.id}
                        animationType="slideIn"
                        start="top 95%"
                        delay={0.1 * index}
                      >
                        <div className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                              <h3 className="font-medium text-[#2E86AB]">{med.name}</h3>
                              <p className="text-sm text-gray-500">{med.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                Dosis: {med.dosagePerKg} {med.unit}/kg
                              </p>
                              <p className="text-xs text-gray-600">
                                Max: {med.maxDosage} {med.unit} | Interval: {med.frequency}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs italic mt-2 text-gray-600">{med.notes}</p>
                        </div>
                      </GSAPScrollTrigger>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </GSAPScrollTrigger>
          </TabsContent>
        </Tabs>

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-8"
        >
          <Alert className="bg-amber-50 border border-amber-100">
            <AlertTitle className="text-amber-800">Disclaimer Medis</AlertTitle>
            <AlertDescription className="text-amber-700 text-sm">
              Kalkulator ini hanya sebagai panduan. Selalu konsultasikan dengan tenaga medis profesional sebelum memberikan obat. Dosis dapat bervariasi berdasarkan kondisi klinis, penyakit penyerta, dan faktor-faktor lainnya.
            </AlertDescription>
          </Alert>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 