# RDP Website Tools untuk Bidan
### Rancangan Desain Produk Aplikasi Web

## 1. Pendahuluan

### 1.1 Latar Belakang
Website ini dirancang sebagai platform digital untuk memudahkan para bidan dalam menjalankan tugas-tugas profesional mereka. Dengan menyediakan berbagai tools seperti kalkulator zat besi, kalkulator kehamilan, dan fitur lainnya, website ini bertujuan meningkatkan efisiensi pelayanan kebidanan.

### 1.2 Tujuan
- Menyediakan tools digital yang praktis dan akurat untuk bidan
- Membantu monitoring kesehatan ibu hamil dan bayi
- Meningkatkan efisiensi dan akurasi dalam pengambilan keputusan medis
- Memberikan referensi cepat untuk parameter-parameter kesehatan penting

### 1.3 Target Pengguna
- Bidan praktik mandiri
- Bidan di klinik/rumah sakit
- Mahasiswa kebidanan
- Perawat yang menangani kesehatan ibu

## 2. Fitur Utama

### 2.1 Kalkulator Zat Besi
**Deskripsi**: Tool untuk menghitung kebutuhan zat besi ibu hamil berdasarkan berbagai parameter.

**Input**:
- Usia gestasi (minggu)
- Tinggi badan (cm)
- Berat badan awal (kg)  
- Berat badan saat ini (kg)
- Status anemia (ya/tidak)
- Hasil lab (kadar hemoglobin)

**Output**:
- Kebutuhan zat besi harian
- Rekomendasi dosis suplemen
- Status anemia
- Saran tindak lanjut

**Rumus**:
- Kebutuhan zat besi = (BB awal + Pertambahan BB) x 18 mg/kg + 500 mg (untuk janin dan plasenta)
- Dosis suplemen = (Target Hb - Hb aktual) x BB x 2.5

### 2.2 Kalkulator Kehamilan
**Deskripsi**: Tool untuk menghitung usia kehamilan, perkiraan persalinan, dan trimester.

**Input**:
- Hari Pertama Haid Terakhir (HPHT)
- Tanggal pemeriksaan
- Siklus haid (opsional)

**Output**:
- Usia gestasi (minggu + hari)
- Perkiraan persalinan (HPL)
- Trimester kehamilan
- Grafik pertumbuhan

**Rumus**:
- Usia gestasi = Tanggal sekarang - HPHT
- HPL = HPHT + 280 hari (Rumus Naegele)

### 2.3 Kalkulator BMI Ibu Hamil
**Deskripsi**: Penghitung BMI khusus untuk ibu hamil dengan rekomendasi pertambahan berat badan.

**Input**:
- Tinggi badan (cm)
- Berat badan pre-pregnancy (kg)

**Output**:
- BMI pre-pregnancy
- Kategori BMI
- Target pertambahan BB per trimester
- Grafik pertambahan BB ideal

### 2.4 Kalkulator Dosis Obat
**Deskripsi**: Penghitung dosis obat umum untuk ibu dan bayi.

**Fitur**:
- Database obat kebidanan
- Perhitungan dosis berdasarkan BB
- Konversi satuan dosis
- Warning efek samping

**Input**:
- Nama obat
- Berat badan
- Kondisi khusus

**Output**:
- Dosis yang tepat
- Interval pemberian
- Kontraindikasi
- Efek samping

### 2.5 Growth Chart/Kurva Pertumbuhan
**Deskripsi**: Grafik pertumbuhan janin dan bayi.

**Fitur**:
- Kurva WHO untuk berat badan bayi
- Grafik tinggi fundus uteri
- Grafik lingkar kepala janin
- Plot percentile

### 2.6 Checklist Pemeriksaan
**Deskripsi**: Daftar periksa standar untuk setiap kunjungan ANC/PNC.

**ANC Checklist**:
- Pengukuran vital signs
- TFU (Tinggi Fundus Uteri)
- DJJ (Denyut Jantung Janin)
- Leopold maneuver
- Protein urin
- Edema

**PNC Checklist**:
- Vital signs
- Kontraksi uterus
- Perdarahan
- ASI
- Involusi uterus

### 2.7 Info Rujukan Cepat
**Deskripsi**: Informasi rujukan medis cepat.

**Konten**:
- Normal ranges (HB, GDA, dll)
- Tanda bahaya kehamilan
- Protokol kegawatdaruratan
- Kontak rumah sakit rujukan

### 2.8 Catatan Pasien
**Deskripsi**: Sistem pencatatan digital untuk setiap pasien.

**Fitur**:
- Riwayat kehamilan
- Hasil pemeriksaan
- Jadwal kontrol
- Status imunisasi
- Export/print rekam medis

## 3. Spesifikasi Teknis

### 3.1 Frontend
- Framework: React.js dengan TypeScript
- UI Library: Material-UI/Shadcn UI
- State Management: Redux/Context API
- Responsive Design: Mobile-first approach

### 3.2 Backend
- Framework: Node.js dengan Express
- Database: MongoDB/PostgreSQL
- Authentication: JWT + OAuth2
- Storage: Cloud storage untuk file uploads

### 3.3 Hosting
- Platform: AWS/Google Cloud
- CDN: CloudFront/Cloud CDN
- SSL/HTTPS: Let's Encrypt
- Backup: Daily automated backup

### 3.4 Keamanan
- Data encryption at rest
- HTTPS only
- Rate limiting
- Input sanitization
- Role-based access control

## 4. User Interface Design

### 4.1 Layout Umum
- Header dengan logo dan navigasi
- Sidebar untuk quick access tools
- Main content area
- Footer dengan informasi kontak

### 4.2 Color Scheme
- Primary: #2E86AB (Medical Blue)
- Secondary: #F24236 (Emergency Red)
- Accent: #F6F5AE (Soft Yellow)
- Neutral: #F7F7F2 (Off White)

### 4.3 Typography
- Heading: Poppins
- Body: Inter
- Medical terms: Roboto Mono

### 4.4 Dashboard
- Cards untuk quick access tools
- Recent calculations/records
- Notification center
- Search functionality

## 5. User Flow

### 5.1 Onboarding
1. Landing page
2. Registrasi/Login
3. Profile setup
4. Tutorial penggunaan tools

### 5.2 Daily Usage
1. Login dashboard
2. Akses tools favorit
3. Input data pasien
4. Generate hasil
5. Save/Export hasil

### 5.3 Emergency Scenario
1. Quick access emergency tools
2. Protokol rujukan
3. Kontak emergency
4. Print emergency form

## 6. Fase Pengembangan

### 6.1 MVP (Minimum Viable Product)
- Kalkulator zat besi
- Kalkulator kehamilan
- BMI calculator
- Basic user authentication

### 6.2 Phase 2
- Dosis calculator
- Growth charts
- Checklists
- Print/Export features

### 6.3 Phase 3
- Patient records
- Multi-user support
- Mobile app
- Offline capability

## 7. Maintenance & Updates

### 7.1 Regular Updates
- Guidelines medis terbaru
- Security patches
- UI/UX improvements
- Feature additions

### 7.2 Support
- User documentation
- Video tutorials
- Email support
- FAQ section

## 8. Legal & Compliance
- HIPAA compliance
- Data privacy (GDPR/equivalent)
- Medical disclaimer
- Terms of service

## 9. Budget Estimation

### 9.1 Development Cost
- Frontend development: 3-4 months
- Backend development: 2-3 months
- Testing & QA: 1 month
- Total: 6-8 months

### 9.2 Operational Cost
- Hosting: $50-100/month
- SSL Certificate: $100/year
- Maintenance: 20% of development cost/year

## 10. Success Metrics
- User adoption rate
- Tools usage frequency  
- User satisfaction score
- Reduction in calculation errors
- Time saved per user

## Kesimpulan
Website ini dirancang untuk menjadi toolkit komprehensif bagi para bidan, meningkatkan efisiensi dan akurasi pelayanan kebidanan dengan teknologi digital modern.
