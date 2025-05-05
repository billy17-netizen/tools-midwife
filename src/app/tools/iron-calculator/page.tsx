'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
import GSAPAnimation from '@/components/animations/GSAPAnimation';

const LottieAnimation = dynamic(
  () => import('@/components/animations/LottieAnimation'),
  { ssr: false }
);

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

// Define the form schema
const formSchema = z.object({
  gestationAge: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num <= 42;
  }, {
    message: 'Gestational age must be between 1-42 weeks',
  }),
  height: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 120 && num < 200;
  }, {
    message: 'Height must be between 120-200 cm',
  }),
  initialWeight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 30 && num < 150;
  }, {
    message: 'Initial weight must be between 30-150 kg',
  }),
  currentWeight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 30 && num < 200;
  }, {
    message: 'Current weight must be between 30-200 kg',
  }),
  isAnemic: z.string(),
  hemoglobin: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 5 && num < 20;
  }, {
    message: 'Hemoglobin must be between 5-20 g/dL',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function IronCalculatorPage() {
  const [result, setResult] = useState<{
    dailyNeed: number;
    supplementDose: number;
    anemiaStatus: string;
    recommendation: string;
  } | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gestationAge: '',
      height: '',
      initialWeight: '',
      currentWeight: '',
      isAnemic: 'no',
      hemoglobin: '',
    },
  });

  function onSubmit(values: FormValues) {
    // Convert string values to numbers
    const gestationAge = parseFloat(values.gestationAge);
    const initialWeight = parseFloat(values.initialWeight);
    const currentWeight = parseFloat(values.currentWeight);
    const hemoglobin = parseFloat(values.hemoglobin);
    const isAnemic = values.isAnemic === 'yes';

    // Calculate weight gain
    const weightGain = currentWeight - initialWeight;

    // Calculate daily iron need using the formula from the RDP
    const dailyNeed = ((initialWeight + weightGain) * 18) / 1000 + 0.5; // in grams, converted to mg by dividing by 1000

    // Determine anemia status based on hemoglobin level
    let anemiaStatus = '';
    let supplementDose = 0;
    let recommendation = '';

    if (hemoglobin < 11) {
      anemiaStatus = 'Anemia';
      // Calculate supplement dose using formula from RDP
      const targetHb = 11; // target hemoglobin level
      supplementDose = (targetHb - hemoglobin) * currentWeight * 2.5;
      
      if (hemoglobin < 7) {
        recommendation = 'Severe anemia. Refer to healthcare facility for further treatment.';
      } else if (hemoglobin < 9) {
        recommendation = 'Moderate anemia. Provide iron supplements and monitor regularly.';
      } else {
        recommendation = 'Mild anemia. Provide iron supplements as prescribed and educate on diet.';
      }
    } else {
      anemiaStatus = 'No anemia';
      supplementDose = isAnemic ? 60 : 30; // standard prophylactic dose
      recommendation = 'No anemia. Provide prophylactic iron supplements and diet education.';
    }

    // Set the result
    setResult({
      dailyNeed: parseFloat(dailyNeed.toFixed(2)),
      supplementDose: parseFloat(supplementDose.toFixed(2)),
      anemiaStatus,
      recommendation,
    });
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E86AB]/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <GSAPScrollTrigger animationType="slideUp" className="text-center mb-8">
          <div className="inline-block mb-4">
            <LottieAnimation 
              animationPath="/animations/heartbeat.json" 
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-2">Iron Calculator</h1>
          <p className="text-gray-600">
            Calculate daily iron requirements and recommended supplement dosage for pregnant women.
          </p>
        </GSAPScrollTrigger>

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 85%"
          className="w-full"
        >
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent">
              <CardTitle>Input Data</CardTitle>
              <CardDescription>
                Enter pregnant woman's data to calculate iron requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="gestationAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gestational Age (weeks)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Example: 28"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the pregnancy age in weeks.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.15} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Example: 160"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter height in centimeters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="initialWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Initial Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Example: 55"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Weight before pregnancy in kilograms.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.25} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="currentWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Example: 62"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Current weight in kilograms.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.3} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="isAnemic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Anemia Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="focus:ring-[#2E86AB]/20">
                                  <SelectValue placeholder="Select anemia status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Does the mother have a history of anemia?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </GSAPScrollTrigger>

                    <GSAPScrollTrigger animationType="slideIn" delay={0.35} start="top 90%" className="w-full">
                      <FormField
                        control={form.control}
                        name="hemoglobin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hemoglobin Level (g/dL)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Example: 11.5"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the current hemoglobin level.
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
                      Calculate Iron Requirements
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
                <CardTitle>Calculation Results</CardTitle>
                <CardDescription>
                  Here are the calculated iron requirements and recommended supplement dosage.
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
                      <p className="text-sm font-medium text-gray-500 mb-1">Daily Iron Requirement</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">{result.dailyNeed}</span>
                        <span className="ml-1 text-gray-700">mg/day</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium text-gray-500 mb-1">Recommended Supplement Dosage</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#2E86AB]">{result.supplementDose}</span>
                        <span className="ml-1 text-gray-700">mg/day</span>
                      </div>
                    </div>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger 
                    animationType="fadeIn" 
                    start="top 95%"
                    delay={0.2}
                  >
                    <Alert className={`
                      ${result.anemiaStatus === 'Anemia' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}
                    `}>
                      <div className="flex items-center gap-2">
                        <LottieAnimation 
                          animationPath="/animations/heartbeat.json" 
                          width={30}
                          height={30}
                        />
                        <AlertTitle className={`${
                          result.anemiaStatus === 'Anemia' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          Status: {result.anemiaStatus}
                        </AlertTitle>
                      </div>
                      <AlertDescription className="mt-2">
                        {result.recommendation}
                      </AlertDescription>
                    </Alert>
                  </GSAPScrollTrigger>

                  <GSAPScrollTrigger 
                    animationType="reveal" 
                    start="top 95%"
                    delay={0.3}
                  >
                    <div className="p-4 rounded-lg bg-[#F7F7F2] border border-gray-100">
                      <h3 className="font-medium text-gray-900 mb-2">Notes:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Iron requirements increase during pregnancy</li>
                        <li>Consume iron-rich foods such as red meat, spinach, and legumes</li>
                        <li>Take vitamin C with iron supplements to improve absorption</li>
                        <li>Avoid drinking tea or coffee along with iron supplements</li>
                      </ul>
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