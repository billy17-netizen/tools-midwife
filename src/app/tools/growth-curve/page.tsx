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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine
} from 'recharts';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// Growth chart reference data (simplified WHO standards)
interface GrowthStandard {
  months: number;
  lengthHeightBoys: { p3: number; p15: number; p50: number; p85: number; p97: number };
  lengthHeightGirls: { p3: number; p15: number; p50: number; p85: number; p97: number };
  weightBoys: { p3: number; p15: number; p50: number; p85: number; p97: number };
  weightGirls: { p3: number; p15: number; p50: number; p85: number; p97: number };
  headCircumferenceBoys: { p3: number; p15: number; p50: number; p85: number; p97: number };
  headCircumferenceGirls: { p3: number; p15: number; p50: number; p85: number; p97: number };
}

const growthStandards: GrowthStandard[] = [
  {
    months: 0,
    lengthHeightBoys: { p3: 46.3, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.4 },
    lengthHeightGirls: { p3: 45.6, p15: 47.2, p50: 49.1, p85: 51.0, p97: 52.7 },
    weightBoys: { p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.7, p97: 4.0 },
    weightGirls: { p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.6, p97: 3.9 },
    headCircumferenceBoys: { p3: 32.1, p15: 33.1, p50: 34.5, p85: 35.8, p97: 36.9 },
    headCircumferenceGirls: { p3: 31.7, p15: 32.7, p50: 33.9, p85: 35.1, p97: 36.1 }
  },
  {
    months: 3,
    lengthHeightBoys: { p3: 57.6, p15: 59.5, p50: 61.4, p85: 63.3, p97: 65.0 },
    lengthHeightGirls: { p3: 56.0, p15: 57.8, p50: 59.8, p85: 61.8, p97: 63.5 },
    weightBoys: { p3: 5.0, p15: 5.6, p50: 6.4, p85: 7.2, p97: 7.9 },
    weightGirls: { p3: 4.5, p15: 5.1, p50: 5.8, p85: 6.6, p97: 7.2 },
    headCircumferenceBoys: { p3: 38.0, p15: 39.2, p50: 40.5, p85: 41.7, p97: 42.6 },
    headCircumferenceGirls: { p3: 37.0, p15: 38.1, p50: 39.5, p85: 40.7, p97: 41.7 }
  },
  {
    months: 6,
    lengthHeightBoys: { p3: 63.6, p15: 65.6, p50: 67.6, p85: 69.6, p97: 71.3 },
    lengthHeightGirls: { p3: 61.8, p15: 63.8, p50: 65.7, p85: 67.7, p97: 69.4 },
    weightBoys: { p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.5 },
    weightGirls: { p3: 5.8, p15: 6.4, p50: 7.3, p85: 8.2, p97: 8.9 },
    headCircumferenceBoys: { p3: 41.2, p15: 42.4, p50: 43.3, p85: 44.6, p97: 45.5 },
    headCircumferenceGirls: { p3: 40.0, p15: 41.0, p50: 42.2, p85: 43.4, p97: 44.3 }
  },
  {
    months: 9,
    lengthHeightBoys: { p3: 68.2, p15: 70.2, p50: 72.3, p85: 74.4, p97: 76.2 },
    lengthHeightGirls: { p3: 66.3, p15: 68.4, p50: 70.4, p85: 72.5, p97: 74.3 },
    weightBoys: { p3: 7.4, p15: 8.1, p50: 9.0, p85: 9.9, p97: 10.7 },
    weightGirls: { p3: 6.7, p15: 7.4, p50: 8.2, p85: 9.2, p97: 10.0 },
    headCircumferenceBoys: { p3: 42.9, p15: 44.0, p50: 45.2, p85: 46.3, p97: 47.1 },
    headCircumferenceGirls: { p3: 41.6, p15: 42.6, p50: 43.8, p85: 45.0, p97: 45.9 }
  },
  {
    months: 12,
    lengthHeightBoys: { p3: 71.8, p15: 73.9, p50: 76.1, p85: 78.2, p97: 80.1 },
    lengthHeightGirls: { p3: 70.0, p15: 72.1, p50: 74.3, p85: 76.4, p97: 78.3 },
    weightBoys: { p3: 8.1, p15: 8.9, p50: 9.6, p85: 10.5, p97: 11.4 },
    weightGirls: { p3: 7.3, p15: 8.1, p50: 8.9, p85: 9.9, p97: 10.8 },
    headCircumferenceBoys: { p3: 44.0, p15: 45.1, p50: 46.2, p85: 47.4, p97: 48.2 },
    headCircumferenceGirls: { p3: 42.7, p15: 43.7, p50: 44.9, p85: 46.1, p97: 47.0 }
  },
  {
    months: 18,
    lengthHeightBoys: { p3: 77.2, p15: 79.4, p50: 81.8, p85: 84.2, p97: 86.1 },
    lengthHeightGirls: { p3: 75.6, p15: 77.9, p50: 80.2, p85: 82.6, p97: 84.6 },
    weightBoys: { p3: 9.1, p15: 9.9, p50: 10.9, p85: 12.0, p97: 12.9 },
    weightGirls: { p3: 8.2, p15: 9.1, p50: 10.0, p85: 11.1, p97: 12.1 },
    headCircumferenceBoys: { p3: 45.2, p15: 46.1, p50: 47.2, p85: 48.5, p97: 49.3 },
    headCircumferenceGirls: { p3: 43.8, p15: 44.8, p50: 46.0, p85: 47.2, p97: 48.1 }
  },
  {
    months: 24,
    lengthHeightBoys: { p3: 81.8, p15: 84.1, p50: 86.8, p85: 89.3, p97: 91.5 },
    lengthHeightGirls: { p3: 80.2, p15: 82.6, p50: 85.0, p85: 87.6, p97: 89.7 },
    weightBoys: { p3: 9.9, p15: 10.8, p50: 11.8, p85: 13.0, p97: 14.0 },
    weightGirls: { p3: 9.0, p15: 9.9, p50: 10.9, p85: 12.1, p97: 13.2 },
    headCircumferenceBoys: { p3: 45.9, p15: 46.8, p50: 48.0, p85: 49.2, p97: 50.1 },
    headCircumferenceGirls: { p3: 44.5, p15: 45.5, p50: 46.7, p85: 47.9, p97: 48.8 }
  },
];

// Form schema
const formSchema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  age: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 60;
  }, {
    message: "Usia harus antara 0-60 bulan",
  }),
  weight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num < 30;
  }, {
    message: "Berat badan harus antara 0-30 kg",
  }),
  height: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 30 && num < 120;
  }, {
    message: "Tinggi badan harus antara 30-120 cm",
  }),
  headCircumference: z.string().optional().refine((val) => {
    if (!val) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 30 && num < 60;
  }, {
    message: "Lingkar kepala harus antara 30-60 cm",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function GrowthCurvePage() {
  const [result, setResult] = useState<{
    ageInMonths: number;
    gender: string;
    weight: { value: number; percentile: number; status: string };
    height: { value: number; percentile: number; status: string };
    headCircumference?: { value: number; percentile: number; status: string };
    bmi: { value: number; status: string };
  } | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      age: "",
      weight: "",
      height: "",
      headCircumference: "",
    },
  });

  function onSubmit(values: FormValues) {
    const ageInMonths = parseFloat(values.age);
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);
    const headCircumference = values.headCircumference ? parseFloat(values.headCircumference) : undefined;
    
    // Find closest age standard
    const closestAgeStandard = growthStandards.reduce((prev, curr) => {
      return Math.abs(curr.months - ageInMonths) < Math.abs(prev.months - ageInMonths) ? curr : prev;
    });
    
    // Get reference data based on gender
    const weightRef = values.gender === "male" ? closestAgeStandard.weightBoys : closestAgeStandard.weightGirls;
    const heightRef = values.gender === "male" ? closestAgeStandard.lengthHeightBoys : closestAgeStandard.lengthHeightGirls;
    const headRef = values.gender === "male" ? closestAgeStandard.headCircumferenceBoys : closestAgeStandard.headCircumferenceGirls;
    
    // Calculate percentiles and status
    const weightPercentile = calculatePercentile(weight, weightRef);
    const heightPercentile = calculatePercentile(height, heightRef);
    const headPercentile = headCircumference ? calculatePercentile(headCircumference, headRef) : undefined;
    
    // Calculate BMI and status
    const bmi = weight / ((height / 100) * (height / 100));
    const bmiStatus = getBMIStatus(bmi, ageInMonths);
    
    // Set results
    setResult({
      ageInMonths,
      gender: values.gender,
      weight: {
        value: weight,
        percentile: weightPercentile,
        status: getWeightStatus(weightPercentile)
      },
      height: {
        value: height,
        percentile: heightPercentile,
        status: getHeightStatus(heightPercentile)
      },
      headCircumference: headCircumference ? {
        value: headCircumference,
        percentile: headPercentile!,
        status: getHeadCircumferenceStatus(headPercentile!)
      } : undefined,
      bmi: {
        value: parseFloat(bmi.toFixed(1)),
        status: bmiStatus
      }
    });
  }

  // Helper functions
  function calculatePercentile(value: number, reference: any): number {
    if (value <= reference.p3) return 3;
    if (value <= reference.p15) return 15;
    if (value <= reference.p50) return 50;
    if (value <= reference.p85) return 85;
    if (value <= reference.p97) return 97;
    return 97;
  }

  function getWeightStatus(percentile: number): string {
    if (percentile <= 3) return "Berat Badan Sangat Kurang";
    if (percentile <= 15) return "Berat Badan Kurang";
    if (percentile <= 85) return "Berat Badan Normal";
    if (percentile <= 97) return "Berat Badan Lebih";
    return "Berat Badan Sangat Lebih";
  }

  function getHeightStatus(percentile: number): string {
    if (percentile <= 3) return "Sangat Pendek";
    if (percentile <= 15) return "Pendek";
    if (percentile <= 85) return "Normal";
    if (percentile <= 97) return "Tinggi";
    return "Sangat Tinggi";
  }

  function getHeadCircumferenceStatus(percentile: number): string {
    if (percentile <= 3) return "Mikrosefali";
    if (percentile <= 15) return "Di Bawah Rata-Rata";
    if (percentile <= 85) return "Normal";
    if (percentile <= 97) return "Di Atas Rata-Rata";
    return "Makrosefali";
  }

  function getBMIStatus(bmi: number, ageInMonths: number): string {
    if (ageInMonths <= 24) {
      // Untuk anak di bawah 2 tahun
      if (bmi < 14.5) return "Gizi Kurang";
      if (bmi < 18.5) return "Normal";
      if (bmi < 21) return "Risiko Gizi Lebih";
      return "Gizi Lebih";
    } else {
      // Untuk anak di atas 2 tahun
      if (bmi < 14) return "Gizi Kurang";
      if (bmi < 17) return "Normal";
      if (bmi < 19) return "Risiko Gizi Lebih";
      return "Gizi Lebih";
    }
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
              Kurva Pertumbuhan Anak
            </h1>
            <p className="text-gray-600">
              Evaluasi pertumbuhan anak berdasarkan standar WHO
            </p>
          </div>
        </GSAPAnimation>

        <GSAPScrollTrigger 
          animationType="slideUp" 
          start="top 85%"
          className="w-full"
        >
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
              <CardTitle>Input Data Anak</CardTitle>
              <CardDescription>
                Masukkan data pengukuran anak untuk melihat kurva pertumbuhan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Jenis Kelamin</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Laki-laki
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Perempuan
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </GSAPScrollTrigger>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usia (bulan)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Masukkan usia dalam bulan"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Usia anak dalam bulan (0-60 bulan)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.25} start="top 90%" className="w-full">
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
                              Berat badan dalam kilogram
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.3} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tinggi Badan (cm)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Masukkan tinggi badan"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Tinggi badan dalam sentimeter
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.35} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="headCircumference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lingkar Kepala (cm) <span className="text-gray-500 text-xs ml-1">(Opsional)</span></FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Masukkan lingkar kepala"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Lingkar kepala dalam sentimeter (opsional)
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
                    delay={0.4}
                    className="w-full"
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#2E86AB] to-[#2E86AB]/80 hover:shadow-md transition-all duration-300"
                    >
                      Evaluasi Pertumbuhan
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
                <CardTitle>Hasil Evaluasi Pertumbuhan</CardTitle>
                <CardDescription>
                  Analisis pertumbuhan anak berdasarkan standar WHO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <GSAPScrollTrigger 
                    animationType="slideUp" 
                    start="top 95%"
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium text-gray-500 mb-1">Berat Badan</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">
                          {result.weight.value} kg
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"
                            style={{ width: `${result.weight.percentile}%` }}
                          ></div>
                        </div>
                        <p className={`text-sm mt-2 ${getStatusColor(result.weight.status)}`}>
                          {result.weight.status}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium text-gray-500 mb-1">Tinggi Badan</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">
                          {result.height.value} cm
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"
                            style={{ width: `${result.height.percentile}%` }}
                          ></div>
                        </div>
                        <p className={`text-sm mt-2 ${getStatusColor(result.height.status)}`}>
                          {result.height.status}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium text-gray-500 mb-1">BMI</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">
                          {result.bmi.value}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className={`text-sm mt-2 ${getStatusColor(result.bmi.status)}`}>
                          {result.bmi.status}
                        </p>
                      </div>
                    </div>
                  </GSAPScrollTrigger>

                  {result.headCircumference && (
                    <GSAPScrollTrigger 
                      animationType="slideUp" 
                      start="top 95%"
                      delay={0.2}
                    >
                      <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100">
                        <h3 className="font-medium text-gray-700 mb-2">Lingkar Kepala</h3>
                        <div className="flex items-center mb-2">
                          <span className="text-xl font-bold text-[#2E86AB] mr-2">
                            {result.headCircumference.value} cm
                          </span>
                          <span className={`text-sm ${getStatusColor(result.headCircumference.status)}`}>
                            ({result.headCircumference.status})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"
                            style={{ width: `${result.headCircumference.percentile}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Persentil: {result.headCircumference.percentile}%
                        </p>
                      </div>
                    </GSAPScrollTrigger>
                  )}

                  <GSAPScrollTrigger 
                    animationType="fadeIn" 
                    start="top 95%"
                    delay={0.3}
                  >
                    <Alert className="bg-[#2E86AB]/5 border-[#2E86AB]/20">
                      <AlertTitle className="text-[#2E86AB]">
                        Rekomendasi Tindak Lanjut
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        {getRecommendation(result)}
                      </AlertDescription>
                    </Alert>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger
                    animationType="fadeIn"
                    start="top 95%"
                    delay={0.4}
                  >
                    <div className="mt-6">
                      <Tabs defaultValue="weight" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                          <TabsTrigger value="weight">Berat Badan</TabsTrigger>
                          <TabsTrigger value="height">Tinggi Badan</TabsTrigger>
                          {result.headCircumference && (
                            <TabsTrigger value="head">Lingkar Kepala</TabsTrigger>
                          )}
                        </TabsList>
                        
                        <TabsContent value="weight">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Kurva Pertumbuhan: Berat Badan</CardTitle>
                              <CardDescription>
                                Berdasarkan standar WHO untuk anak {result.gender === 'male' ? 'laki-laki' : 'perempuan'}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart
                                    data={generateWeightChartData(result.gender, result.ageInMonths, result.weight.value)}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                      dataKey="age" 
                                      label={{ value: 'Usia (bulan)', position: 'insideBottomRight', offset: -5 }}
                                    />
                                    <YAxis 
                                      label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }}
                                      domain={['auto', 'auto']}
                                    />
                                    <Tooltip formatter={(value) => [`${value} kg`]} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line 
                                      name="P3" 
                                      type="monotone" 
                                      dataKey="p3" 
                                      stroke="#d1d5db" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P15" 
                                      type="monotone" 
                                      dataKey="p15" 
                                      stroke="#9ca3af" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P50" 
                                      type="monotone" 
                                      dataKey="p50" 
                                      stroke="#4b5563" 
                                      strokeWidth={2} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P85" 
                                      type="monotone" 
                                      dataKey="p85" 
                                      stroke="#9ca3af" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P97" 
                                      type="monotone" 
                                      dataKey="p97" 
                                      stroke="#d1d5db" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="Anak" 
                                      type="monotone" 
                                      dataKey="child" 
                                      stroke="#2E86AB" 
                                      strokeWidth={3} 
                                      dot={{ stroke: '#2E86AB', strokeWidth: 2, r: 6 }} 
                                    />
                                    <ReferenceLine 
                                      x={result.ageInMonths} 
                                      stroke="#F24236" 
                                      strokeWidth={1} 
                                      strokeDasharray="3 3" 
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="height">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Kurva Pertumbuhan: Tinggi Badan</CardTitle>
                              <CardDescription>
                                Berdasarkan standar WHO untuk anak {result.gender === 'male' ? 'laki-laki' : 'perempuan'}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart
                                    data={generateHeightChartData(result.gender, result.ageInMonths, result.height.value)}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                      dataKey="age" 
                                      label={{ value: 'Usia (bulan)', position: 'insideBottomRight', offset: -5 }}
                                    />
                                    <YAxis 
                                      label={{ value: 'Tinggi (cm)', angle: -90, position: 'insideLeft' }}
                                      domain={['auto', 'auto']}
                                    />
                                    <Tooltip formatter={(value) => [`${value} cm`]} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line 
                                      name="P3" 
                                      type="monotone" 
                                      dataKey="p3" 
                                      stroke="#d1d5db" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P15" 
                                      type="monotone" 
                                      dataKey="p15" 
                                      stroke="#9ca3af" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P50" 
                                      type="monotone" 
                                      dataKey="p50" 
                                      stroke="#4b5563" 
                                      strokeWidth={2} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P85" 
                                      type="monotone" 
                                      dataKey="p85" 
                                      stroke="#9ca3af" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="P97" 
                                      type="monotone" 
                                      dataKey="p97" 
                                      stroke="#d1d5db" 
                                      strokeWidth={1} 
                                      dot={false} 
                                    />
                                    <Line 
                                      name="Anak" 
                                      type="monotone" 
                                      dataKey="child" 
                                      stroke="#2E86AB" 
                                      strokeWidth={3} 
                                      dot={{ stroke: '#2E86AB', strokeWidth: 2, r: 6 }} 
                                    />
                                    <ReferenceLine 
                                      x={result.ageInMonths} 
                                      stroke="#F24236" 
                                      strokeWidth={1} 
                                      strokeDasharray="3 3" 
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {result.headCircumference && (
                          <TabsContent value="head">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Kurva Pertumbuhan: Lingkar Kepala</CardTitle>
                                <CardDescription>
                                  Berdasarkan standar WHO untuk anak {result.gender === 'male' ? 'laki-laki' : 'perempuan'}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="h-[300px] w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                      data={generateHeadCircumferenceChartData(result.gender, result.ageInMonths, result.headCircumference.value)}
                                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis 
                                        dataKey="age" 
                                        label={{ value: 'Usia (bulan)', position: 'insideBottomRight', offset: -5 }}
                                      />
                                      <YAxis 
                                        label={{ value: 'Lingkar Kepala (cm)', angle: -90, position: 'insideLeft' }}
                                        domain={['auto', 'auto']}
                                      />
                                      <Tooltip formatter={(value) => [`${value} cm`]} />
                                      <Legend verticalAlign="top" height={36} />
                                      <Line 
                                        name="P3" 
                                        type="monotone" 
                                        dataKey="p3" 
                                        stroke="#d1d5db" 
                                        strokeWidth={1} 
                                        dot={false} 
                                      />
                                      <Line 
                                        name="P15" 
                                        type="monotone" 
                                        dataKey="p15" 
                                        stroke="#9ca3af" 
                                        strokeWidth={1} 
                                        dot={false} 
                                      />
                                      <Line 
                                        name="P50" 
                                        type="monotone" 
                                        dataKey="p50" 
                                        stroke="#4b5563" 
                                        strokeWidth={2} 
                                        dot={false} 
                                      />
                                      <Line 
                                        name="P85" 
                                        type="monotone" 
                                        dataKey="p85" 
                                        stroke="#9ca3af" 
                                        strokeWidth={1} 
                                        dot={false} 
                                      />
                                      <Line 
                                        name="P97" 
                                        type="monotone" 
                                        dataKey="p97" 
                                        stroke="#d1d5db" 
                                        strokeWidth={1} 
                                        dot={false} 
                                      />
                                      <Line 
                                        name="Anak" 
                                        type="monotone" 
                                        dataKey="child" 
                                        stroke="#2E86AB" 
                                        strokeWidth={3} 
                                        dot={{ stroke: '#2E86AB', strokeWidth: 2, r: 6 }} 
                                      />
                                      <ReferenceLine 
                                        x={result.ageInMonths} 
                                        stroke="#F24236" 
                                        strokeWidth={1} 
                                        strokeDasharray="3 3" 
                                      />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        )}
                      </Tabs>
                    </div>
                  </GSAPScrollTrigger>
                </div>
              </CardContent>
            </Card>
          </GSAPScrollTrigger>
        )}

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-8"
        >
          <Card className="overflow-hidden border-gray-100 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/5 to-transparent">
              <CardTitle className="text-lg">Standar Pertumbuhan WHO</CardTitle>
              <CardDescription>
                Referensi standar pertumbuhan anak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-4">
                <p>
                  Standar pertumbuhan WHO digunakan untuk memantau pertumbuhan dan perkembangan anak.
                  Standar ini dibuat berdasarkan penelitian multicenter pada anak-anak dari 6 negara berbeda.
                </p>
                <p>
                  Persentil menunjukkan posisi relatif pengukuran anak di dalam populasi referensi:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Di bawah persentil 3: Sangat di bawah rata-rata</li>
                  <li>Persentil 3-15: Di bawah rata-rata</li>
                  <li>Persentil 15-85: Normal</li>
                  <li>Persentil 85-97: Di atas rata-rata</li>
                  <li>Di atas persentil 97: Sangat di atas rata-rata</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
}

// Helper functions
function getStatusColor(status: string): string {
  if (status.includes('Kurang') || status.includes('Pendek') || status.includes('Mikrosefali')) {
    return 'text-amber-600';
  }
  if (status.includes('Normal') || status.includes('Rata-Rata')) {
    return 'text-green-600';
  }
  if (status.includes('Lebih') || status.includes('Tinggi') || status.includes('Makrosefali')) {
    return 'text-blue-600';
  }
  return 'text-gray-600';
}

function getRecommendation(result: any): string {
  // Generate recommendation based on the assessment
  const concerns = [];
  
  if (result.weight.status.includes('Kurang')) {
    concerns.push('berat badan di bawah normal');
  } else if (result.weight.status.includes('Lebih')) {
    concerns.push('berat badan di atas normal');
  }
  
  if (result.height.status.includes('Pendek')) {
    concerns.push('tinggi badan di bawah normal');
  } else if (result.height.status.includes('Tinggi')) {
    concerns.push('tinggi badan di atas normal');
  }
  
  if (result.headCircumference && (result.headCircumference.status.includes('Mikrosefali') || result.headCircumference.status.includes('Makrosefali'))) {
    concerns.push('lingkar kepala di luar rentang normal');
  }
  
  if (concerns.length === 0) {
    return "Pertumbuhan anak berada dalam rentang normal. Lanjutkan pemantauan rutin sesuai jadwal.";
  } else {
    return `Anak memiliki ${concerns.join(' dan ')}. Disarankan untuk berkonsultasi dengan dokter anak untuk evaluasi lebih lanjut dan penanganan yang sesuai.`;
  }
}

function generateWeightChartData(gender: string, currentAge: number, currentWeight: number) {
  // Generate data points for different ages
  const data = [];
  const agePoints = [0, 3, 6, 9, 12, 18, 24];
  
  // Add additional points if the child's age doesn't match standard points
  if (!agePoints.includes(currentAge)) {
    agePoints.push(currentAge);
    agePoints.sort((a, b) => a - b);
  }
  
  for (const age of agePoints) {
    const standard = growthStandards.find(s => s.months === age) || 
                    growthStandards.reduce((prev, curr) => 
                      Math.abs(curr.months - age) < Math.abs(prev.months - age) ? curr : prev
                    );
    
    const weightRef = gender === "male" ? standard.weightBoys : standard.weightGirls;
    
    const dataPoint = {
      age,
      p3: weightRef.p3,
      p15: weightRef.p15,
      p50: weightRef.p50,
      p85: weightRef.p85,
      p97: weightRef.p97,
      child: age === currentAge ? currentWeight : null
    };
    
    data.push(dataPoint);
  }
  
  return data;
}

function generateHeightChartData(gender: string, currentAge: number, currentHeight: number) {
  // Generate data points for different ages
  const data = [];
  const agePoints = [0, 3, 6, 9, 12, 18, 24];
  
  // Add additional points if the child's age doesn't match standard points
  if (!agePoints.includes(currentAge)) {
    agePoints.push(currentAge);
    agePoints.sort((a, b) => a - b);
  }
  
  for (const age of agePoints) {
    const standard = growthStandards.find(s => s.months === age) || 
                    growthStandards.reduce((prev, curr) => 
                      Math.abs(curr.months - age) < Math.abs(prev.months - age) ? curr : prev
                    );
    
    const heightRef = gender === "male" ? standard.lengthHeightBoys : standard.lengthHeightGirls;
    
    const dataPoint = {
      age,
      p3: heightRef.p3,
      p15: heightRef.p15,
      p50: heightRef.p50,
      p85: heightRef.p85,
      p97: heightRef.p97,
      child: age === currentAge ? currentHeight : null
    };
    
    data.push(dataPoint);
  }
  
  return data;
}

function generateHeadCircumferenceChartData(gender: string, currentAge: number, currentHeadCirc: number) {
  // Generate data points for different ages
  const data = [];
  const agePoints = [0, 3, 6, 9, 12, 18, 24];
  
  // Add additional points if the child's age doesn't match standard points
  if (!agePoints.includes(currentAge)) {
    agePoints.push(currentAge);
    agePoints.sort((a, b) => a - b);
  }
  
  for (const age of agePoints) {
    const standard = growthStandards.find(s => s.months === age) || 
                    growthStandards.reduce((prev, curr) => 
                      Math.abs(curr.months - age) < Math.abs(prev.months - age) ? curr : prev
                    );
    
    const headRef = gender === "male" ? standard.headCircumferenceBoys : standard.headCircumferenceGirls;
    
    const dataPoint = {
      age,
      p3: headRef.p3,
      p15: headRef.p15,
      p50: headRef.p50,
      p85: headRef.p85,
      p97: headRef.p97,
      child: age === currentAge ? currentHeadCirc : null
    };
    
    data.push(dataPoint);
  }
  
  return data;
} 