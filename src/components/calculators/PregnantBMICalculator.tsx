'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BMIResult {
  bmi: number;
  category: string;
  recommendation: string;
  color: string;
}

export const PregnantBMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [weekOfPregnancy, setWeekOfPregnancy] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const heightNum = parseFloat(height) / 100;
    const weightNum = parseFloat(weight);

    if (!heightNum || !weightNum) {
      alert('Please enter valid height and weight');
      return;
    }

    const bmi = weightNum / (heightNum * heightNum);
    let category = '';
    let recommendation = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Aim to gain 28-40 lbs during pregnancy';
      color = 'text-yellow-600';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal Weight';
      recommendation = 'Aim to gain 25-35 lbs during pregnancy';
      color = 'text-green-600';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      recommendation = 'Aim to gain 15-25 lbs during pregnancy';
      color = 'text-orange-600';
    } else {
      category = 'Obese';
      recommendation = 'Aim to gain 11-20 lbs during pregnancy';
      color = 'text-red-600';
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      recommendation,
      color
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pregnancy BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Height (cm)</label>
            <Input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
            />
          </div>
          <div>
            <label className="block mb-2">Weight (kg)</label>
            <Input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </div>
          <div>
            <label className="block mb-2">Weeks of Pregnancy</label>
            <Input 
              type="number" 
              value={weekOfPregnancy}
              onChange={(e) => setWeekOfPregnancy(e.target.value)}
              placeholder="Enter weeks of pregnancy"
            />
          </div>
          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Results</h3>
            <p>BMI: <span className={`font-bold ${result.color}`}>{result.bmi}</span></p>
            <p>Category: <span className={`font-bold ${result.color}`}>{result.category}</span></p>
            <div className="mt-2 text-sm">
              <strong>Recommendation:</strong> {result.recommendation}
              <p className="mt-2 text-xs text-gray-600">
                Note: Always consult with your healthcare provider for personalized advice.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 