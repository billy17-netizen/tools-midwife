'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, differenceInDays, differenceInWeeks } from 'date-fns';
import { id } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// Define the form schema
const formSchema = z.object({
  lastPeriodDate: z.date({
    required_error: "Tanggal HPHT wajib diisi",
  }),
  examDate: z.date({
    required_error: "Tanggal pemeriksaan wajib diisi",
  }).optional(),
  cycleLength: z.number().min(21, {
    message: "Siklus minimal 21 hari",
  }).max(35, {
    message: "Siklus maksimal 35 hari",
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PregnancyCalculatorPage() {
  const [result, setResult] = useState<{
    gestationalAge: { weeks: number; days: number };
    dueDate: Date;
    trimester: string;
    nextAppointmentDate: Date;
    importantMilestones: Array<{ title: string; date: Date; description: string }>;
  } | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examDate: new Date(),
      cycleLength: 28,
    },
  });

  function onSubmit(values: FormValues) {
    const { lastPeriodDate, examDate = new Date(), cycleLength = 28 } = values;
    
    // Calculate due date using Naegele's rule (add 280 days to LMP)
    // Standard is 280 days, but adjust for cycle length other than 28 days
    const adjustment = cycleLength - 28;
    const dueDate = addDays(lastPeriodDate, 280 + adjustment);
    
    // Calculate gestational age
    const totalDays = differenceInDays(examDate, lastPeriodDate);
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    
    // Determine trimester
    let trimester;
    if (weeks < 13) {
      trimester = "Trimester 1";
    } else if (weeks < 27) {
      trimester = "Trimester 2";
    } else {
      trimester = "Trimester 3";
    }

    // Calculate next appointment date based on gestational age
    let nextAppointmentDate;
    if (weeks < 28) {
      // Monthly appointments until 28 weeks
      nextAppointmentDate = addDays(examDate, 30);
    } else if (weeks < 36) {
      // Biweekly appointments from 28 to 36 weeks
      nextAppointmentDate = addDays(examDate, 14);
    } else {
      // Weekly appointments from 36 weeks until delivery
      nextAppointmentDate = addDays(examDate, 7);
    }

    // Important pregnancy milestones
    const milestones = [
      {
        title: "Deteksi Detak Jantung Janin",
        date: addDays(lastPeriodDate, 42), // Around 6 weeks
        description: "Detak jantung janin dapat terdeteksi dengan USG transvaginal."
      },
      {
        title: "USG Trimester Pertama",
        date: addDays(lastPeriodDate, 84), // Around 12 weeks
        description: "Pemeriksaan USG untuk memastikan usia kehamilan dan skrining awal."
      },
      {
        title: "USG Morfologi",
        date: addDays(lastPeriodDate, 140), // Around 20 weeks
        description: "Pemeriksaan USG detail untuk melihat anatomi dan perkembangan janin."
      },
      {
        title: "Tes Diabetes Gestasional",
        date: addDays(lastPeriodDate, 182), // Around 26 weeks
        description: "Skrining untuk diabetes gestasional."
      },
      {
        title: "Vaksinasi TT (Tetanus Toxoid)",
        date: addDays(lastPeriodDate, 210), // Around 30 weeks
        description: "Vaksinasi untuk perlindungan ibu dan bayi dari tetanus."
      },
      {
        title: "Posisi Janin",
        date: addDays(lastPeriodDate, 245), // Around 35 weeks
        description: "Pemeriksaan posisi janin menjelang persalinan."
      },
    ];

    // Set the result
    setResult({
      gestationalAge: { weeks, days },
      dueDate,
      trimester,
      nextAppointmentDate,
      importantMilestones: milestones,
    });
  }

  // Gestational age stages and development
  const stagesInfo = [
    { weeks: 12, title: "Trimester 1", description: "Pembentukan organ-organ vital janin dan plasenta." },
    { weeks: 27, title: "Trimester 2", description: "Pertumbuhan cepat dan perkembangan sistem organ janin." },
    { weeks: 40, title: "Trimester 3", description: "Pematangan organ dan persiapan untuk kelahiran." },
  ];

  function getStageInfo(weeks: number) {
    if (weeks <= 12) return stagesInfo[0];
    if (weeks <= 27) return stagesInfo[1];
    return stagesInfo[2];
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 w-full">
      <div className="max-w-3xl mx-auto">
        <GSAPAnimation animationType="fadeIn" delay={0.2}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">Kalkulator Kehamilan</h1>
            <p className="text-gray-600">
              Hitung usia kehamilan, perkiraan tanggal persalinan, dan jadwal pemeriksaan berdasarkan HPHT.
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
              <CardTitle>Hitung Usia Kehamilan dan HPL</CardTitle>
              <CardDescription>
                Masukkan tanggal HPHT (Hari Pertama Haid Terakhir) untuk menghitung.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="lastPeriodDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal HPHT</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal hover:border-[#2E86AB] hover:ring-[#2E86AB]/20",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: id })
                                    ) : (
                                      <span>Pilih tanggal</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Tanggal hari pertama haid terakhir.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="examDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Pemeriksaan</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal hover:border-[#2E86AB] hover:ring-[#2E86AB]/20",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: id })
                                    ) : (
                                      <span>Pilih tanggal</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Tanggal pemeriksaan saat ini.
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
                    delay={0.3}
                    className="w-full"
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#2E86AB] to-[#2E86AB]/80 hover:shadow-md transition-all duration-300"
                    >
                      Hitung Usia Kehamilan
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
                <CardTitle>Hasil Perhitungan</CardTitle>
                <CardDescription>
                  Berikut hasil perhitungan usia kehamilan dan informasi penting lainnya.
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
                      <p className="text-sm font-medium text-gray-500 mb-1">Usia Kehamilan</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">
                          {result.gestationalAge.weeks} minggu {result.gestationalAge.days} hari
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium text-gray-500 mb-1">Perkiraan Tanggal Persalinan</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">
                          {format(result.dueDate, "dd MMMM yyyy", { locale: id })}
                        </span>
                      </div>
                    </div>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger 
                    animationType="fadeIn" 
                    start="top 95%"
                    delay={0.2}
                  >
                    <Alert className="bg-[#2E86AB]/5 border-[#2E86AB]/20">
                      <AlertTitle className="text-[#2E86AB]">
                        {result.trimester} - {getStageInfo(result.gestationalAge.weeks).title}
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        {getStageInfo(result.gestationalAge.weeks).description}
                      </AlertDescription>
                    </Alert>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger 
                    animationType="slideUp" 
                    start="top 95%"
                    delay={0.3}
                  >
                    <div className="bg-[#F7F7F2] p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-lg mb-4">Jadwal Pemeriksaan Berikutnya</h3>
                      <p className="text-[#2E86AB] font-medium">
                        {format(result.nextAppointmentDate, "dd MMMM yyyy", { locale: id })}
                      </p>
                    </div>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger 
                    animationType="fadeIn" 
                    start="top 95%"
                    delay={0.4}
                  >
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Milestone Penting</h3>
                      <div className="grid gap-4">
                        {result.importantMilestones.map((milestone, index) => (
                          <GSAPScrollTrigger
                            key={index}
                            animationType="slideIn"
                            start="top 95%"
                            delay={0.1 * index}
                          >
                            <div className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-[#2E86AB]">{milestone.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                  {format(milestone.date, "dd MMM yyyy", { locale: id })}
                                </span>
                              </div>
                            </div>
                          </GSAPScrollTrigger>
                        ))}
                      </div>
                    </div>
                  </GSAPScrollTrigger>
                </div>
              </CardContent>
            </Card>
          </GSAPScrollTrigger>
        )}
      </div>
    </div>
  );
} 