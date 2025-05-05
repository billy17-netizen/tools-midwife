'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

interface BMIRecommendation {
  category: string;
  weightGainLow: number;
  weightGainHigh: number;
  description: string;
  color: string;
  englishCategory?: string;
}

export default function PregnantBMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [weekOfPregnancy, setWeekOfPregnancy] = useState<string>('');
  const [prePregnancyBMI, setPrePregnancyBMI] = useState<number | null>(null);
  const [weightGainRecommendation, setWeightGainRecommendation] = useState<BMIRecommendation | null>(null);

  const bmiCategories: BMIRecommendation[] = [
    {
      category: 'Kekurangan Berat Badan',
      englishCategory: 'Underweight',
      weightGainLow: 12.5,
      weightGainHigh: 18,
      description: 'Anda memerlukan penambahan berat badan yang lebih tinggi',
      color: 'text-yellow-600'
    },
    {
      category: 'Berat Badan Normal',
      englishCategory: 'Normal Weight',
      weightGainLow: 11.5,
      weightGainHigh: 16,
      description: 'Pertambahan berat badan sesuai dengan rekomendasi standar',
      color: 'text-green-600'
    },
    {
      category: 'Kelebihan Berat Badan',
      englishCategory: 'Overweight',
      weightGainLow: 7,
      weightGainHigh: 11.5,
      description: 'Pertambahan berat badan perlu dikendalikan',
      color: 'text-orange-600'
    },
    {
      category: 'Obesitas',
      englishCategory: 'Obese',
      weightGainLow: 5,
      weightGainHigh: 9,
      description: 'Pertambahan berat badan harus sangat hati-hati',
      color: 'text-red-600'
    }
  ];

  const calculateBMI = () => {
    const heightM = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    const pregnancyWeeks = parseFloat(weekOfPregnancy);
    
    if (heightM > 0 && weightKg > 0) {
      const bmi = weightKg / (heightM * heightM);
      setPrePregnancyBMI(parseFloat(bmi.toFixed(1)));

      // Determine weight gain recommendation
      const recommendation = bmiCategories.find(category => 
        bmi < 18.5 ? category.category === 'Kekurangan Berat Badan' :
        bmi < 25 ? category.category === 'Berat Badan Normal' :
        bmi < 30 ? category.category === 'Kelebihan Berat Badan' :
        category.category === 'Obesitas'
      );

      setWeightGainRecommendation(recommendation || null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E86AB]/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-xl mx-auto relative z-10">
        <GSAPAnimation animationType="fadeIn" delay={0.2}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-2">
              Kalkulator BMI Ibu Hamil
            </h1>
            <p className="text-gray-600">
              Hitung BMI dan rekomendasi penambahan berat badan selama kehamilan
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
              <CardTitle className="text-2xl font-bold text-center text-[#2E86AB]">
                Input Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <GSAPScrollTrigger animationType="slideIn" delay={0.1} start="top 90%" className="w-full">
                  <div>
                    <Label htmlFor="height" className="text-gray-700">Tinggi Badan (cm)</Label>
                    <Input 
                      id="height"
                      type="number" 
                      placeholder="Masukkan tinggi badan" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-2 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                    />
                  </div>
                </GSAPScrollTrigger>
                
                <GSAPScrollTrigger animationType="slideIn" delay={0.2} start="top 90%" className="w-full">
                  <div>
                    <Label htmlFor="weight" className="text-gray-700">Berat Badan Sebelum Hamil (kg)</Label>
                    <Input 
                      id="weight"
                      type="number" 
                      placeholder="Masukkan berat badan sebelum hamil" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-2 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                    />
                  </div>
                </GSAPScrollTrigger>
                
                <GSAPScrollTrigger animationType="slideIn" delay={0.3} start="top 90%" className="w-full">
                  <div>
                    <Label htmlFor="pregnancy-weeks" className="text-gray-700">Minggu Kehamilan</Label>
                    <Input 
                      id="pregnancy-weeks"
                      type="number" 
                      placeholder="Masukkan minggu kehamilan" 
                      value={weekOfPregnancy}
                      onChange={(e) => setWeekOfPregnancy(e.target.value)}
                      className="mt-2 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                    />
                  </div>
                </GSAPScrollTrigger>
                
                <GSAPScrollTrigger animationType="fadeIn" delay={0.4} start="top 90%" className="w-full">
                  <Button 
                    onClick={calculateBMI} 
                    className="w-full bg-gradient-to-r from-[#2E86AB] to-[#2E86AB]/80 hover:shadow-md transition-all duration-300"
                  >
                    Hitung BMI
                  </Button>
                </GSAPScrollTrigger>
                
                {prePregnancyBMI !== null && weightGainRecommendation && (
                  <GSAPScrollTrigger animationType="scale" start="top 90%" className="w-full">
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">
                        Hasil Perhitungan
                      </h3>
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-gray-100 shadow-md">
                        <GSAPScrollTrigger animationType="slideUp" delay={0.1} start="top 95%" className="w-full">
                          <p className="text-lg mb-2">
                            BMI Pra-Kehamilan: <span className="font-bold text-[#2E86AB]">{prePregnancyBMI}</span>
                          </p>
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideUp" delay={0.2} start="top 95%" className="w-full">
                          <p className={`text-lg font-semibold ${weightGainRecommendation.color}`}>
                            Kategori: {weightGainRecommendation.category} 
                            <span className="text-sm ml-2 text-gray-600">
                              ({weightGainRecommendation.englishCategory})
                            </span>
                          </p>
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideUp" delay={0.3} start="top 95%" className="w-full">
                          <p className="mt-2 text-gray-700">
                            Rekomendasi Penambahan Berat Badan: 
                            <span className="font-bold text-[#2E86AB] ml-1">
                              {weightGainRecommendation.weightGainLow} - {weightGainRecommendation.weightGainHigh} kg
                            </span>
                          </p>
                        </GSAPScrollTrigger>

                        <GSAPScrollTrigger animationType="slideUp" delay={0.4} start="top 95%" className="w-full">
                          <p className="mt-2 italic text-gray-600 bg-[#2E86AB]/5 p-3 rounded-lg">
                            {weightGainRecommendation.description}
                          </p>
                        </GSAPScrollTrigger>
                      </div>
                    </div>
                  </GSAPScrollTrigger>
                )}
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>

        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-8"
        >
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-100">
            <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">
              Catatan Penting
            </h4>
            <ul className="list-none space-y-3 text-gray-700">
              {[
                'Konsultasikan hasil dengan dokter atau bidan Anda',
                'Setiap kehamilan memiliki kebutuhan yang berbeda',
                'Pertambahan berat badan mempengaruhi kesehatan ibu dan janin',
                'Pola makan sehat dan olahraga ringan sangat dianjurkan',
                'Berat badan ideal berbeda untuk setiap tahap kehamilan'
              ].map((note, index) => (
                <GSAPScrollTrigger
                  key={index}
                  animationType="slideIn"
                  start="top 95%"
                  delay={0.1 * index}
                >
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2E86AB] to-[#F24236]"></span>
                    <span>{note}</span>
                  </li>
                </GSAPScrollTrigger>
              ))}
            </ul>
          </div>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 