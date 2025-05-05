# Tools Bidan (Midwife Tools)

A modern web application that provides digital tools for midwives to enhance their professional practice efficiency and accuracy.

![Tools Bidan Banner](https://github.com/billy17-netizen/tools-midwife/blob/main/public/banner.png?raw=true)

## Overview

Tools Bidan is a comprehensive digital platform designed specifically for midwives. It provides various calculators, charts, checklists, and reference tools to assist midwives in their daily professional tasks.

## Features

- **Kalkulator Zat Besi (Iron Calculator)**: Calculate iron needs for pregnant women based on health parameters.
- **Kalkulator Kehamilan (Pregnancy Calculator)**: Calculate gestational age, estimated due date, and trimester based on last menstrual period.
- **Kalkulator BMI Ibu Hamil (Pregnant BMI Calculator)**: Calculate BMI for pregnant women with weight gain recommendations.
- **Kalkulator Dosis Obat (Medication Dosage Calculator)**: Calculate medication dosages for mothers and babies.
- **Kurva Pertumbuhan (Growth Chart)**: Charts for fetal and baby growth according to WHO standards.
- **Checklist Pemeriksaan (Examination Checklist)**: Standard checklists for ANC/PNC visits.
- **Info Rujukan Cepat (Quick Reference)**: Quick reference for health parameters.
- **Catatan Pasien (Patient Records)**: Digital record system for patients.

## Tech Stack

- **Framework**: Next.js with TypeScript
- **UI Library**: Tailwind CSS with Shadcn UI components
- **Forms**: React Hook Form with Zod validation
- **Date Management**: date-fns
- **Charts**: Chart.js with react-chartjs-2

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tools-midwife.git
cd tools-midwife
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
tools-midwife/
├── src/
│   ├── app/                 # App Router
│   │   ├── tools/           # Tools pages
│   │   │   ├── iron-calculator/
│   │   │   ├── pregnancy-calculator/
│   │   │   └── ...
│   │   ├── about/           # About page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components
│   └── lib/                 # Utilities and helpers
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Project dependencies
```

## Deployment

This application can be easily deployed to Vercel:

```bash
npm install -g vercel
vercel
```

## Color Scheme

- Primary: #2E86AB (Medical Blue)
- Secondary: #F24236 (Emergency Red)
- Accent: #F6F5AE (Soft Yellow)
- Neutral: #F7F7F2 (Off White)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Chart.js](https://www.chartjs.org/)

## Contact

If you have any questions or feedback, please reach out to us at [contact@toolsbidan.com](mailto:contact@toolsbidan.com).
