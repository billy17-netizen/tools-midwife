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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Search, Plus, Calendar, UserCircle, FileText, Edit, Trash2, Archive, Printer, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const GSAPScrollTrigger = dynamic(
  () => import('@/components/animations/GSAPScrollTrigger'),
  { ssr: false }
);

const GSAPAnimation = dynamic(
  () => import('@/components/animations/GSAPAnimation'),
  { ssr: false }
);

// Sample patient data
const samplePatients = [
  {
    id: 'P001',
    name: 'Siti Rahayu',
    age: 28,
    address: 'Jl. Melati No. 45, Surabaya',
    phone: '081234567890',
    lastVisit: '2023-05-15',
    gestationalAge: '32 minggu',
    status: 'Hamil'
  },
  {
    id: 'P002',
    name: 'Dewi Ayu',
    age: 24,
    address: 'Jl. Dahlia No. 12, Surabaya',
    phone: '082345678901',
    lastVisit: '2023-05-18',
    gestationalAge: '36 minggu',
    status: 'Hamil'
  },
  {
    id: 'P003',
    name: 'Rina Susanti',
    age: 30,
    address: 'Jl. Mawar No. 7, Sidoarjo',
    phone: '083456789012',
    lastVisit: '2023-05-20',
    gestationalAge: '-',
    status: 'Postpartum (5 hari)'
  },
  {
    id: 'P004',
    name: 'Maya Indah',
    age: 26,
    address: 'Jl. Anggrek No. 23, Surabaya',
    phone: '084567890123',
    lastVisit: '2023-05-10',
    gestationalAge: '28 minggu',
    status: 'Hamil'
  },
  {
    id: 'P005',
    name: 'Lina Wijaya',
    age: 32,
    address: 'Jl. Kenanga No. 15, Gresik',
    phone: '085678901234',
    lastVisit: '2023-05-22',
    gestationalAge: '-',
    status: 'Postpartum (3 hari)'
  }
];

// Form schema for new patient
const patientFormSchema = z.object({
  name: z.string().min(2, { message: "Nama pasien wajib diisi" }),
  age: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 15 && num <= 60;
  }, {
    message: "Usia harus antara 15-60 tahun",
  }),
  address: z.string().min(5, { message: "Alamat wajib diisi minimal 5 karakter" }),
  phone: z.string().min(10, { message: "Nomor telepon wajib diisi minimal 10 digit" }),
  nik: z.string().optional(),
  bloodType: z.string().optional(),
  status: z.enum(["Hamil", "Postpartum", "Tidak Hamil"], {
    required_error: "Status pasien wajib dipilih",
  }),
  gestationalAge: z.string().optional(),
  lmp: z.string().optional(),
  notes: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

export default function PatientRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [patients, setPatients] = useState(samplePatients);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  // Filter patients based on search query and selected tab
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'pregnant') return matchesSearch && patient.status === 'Hamil';
    if (selectedTab === 'postpartum') return matchesSearch && patient.status.includes('Postpartum');
    
    return matchesSearch;
  });

  // Initialize the form
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: "",
      address: "",
      phone: "",
      nik: "",
      bloodType: "",
      status: "Hamil",
      gestationalAge: "",
      lmp: "",
      notes: "",
    },
  });

  // Handle form submission
  function onSubmit(values: PatientFormValues) {
    // In a real app, you would save to database here
    const newPatient = {
      id: `P00${patients.length + 1}`,
      name: values.name,
      age: parseFloat(values.age),
      address: values.address,
      phone: values.phone,
      lastVisit: format(new Date(), 'yyyy-MM-dd'),
      gestationalAge: values.status === 'Hamil' ? values.gestationalAge || '-' : '-',
      status: values.status
    };
    
    setPatients([...patients, newPatient]);
    setIsAddingPatient(false);
    form.reset();
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2E86AB]/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-[#F24236]/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <GSAPAnimation animationType="fadeIn" delay={0.2}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent mb-2">
              Catatan Pasien
            </h1>
            <p className="text-gray-600">
              Sistem pencatatan digital untuk pasien kebidanan
            </p>
          </div>
        </GSAPAnimation>

        <GSAPScrollTrigger 
          animationType="slideUp" 
          start="top 85%"
          className="w-full mb-8"
        >
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/10 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <CardTitle>Daftar Pasien</CardTitle>
                <CardDescription>
                  Kelola data dan catatan pasien Anda
                </CardDescription>
              </div>
              
              <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2E86AB] hover:bg-[#2E86AB]/90 flex items-center gap-2">
                    <Plus size={16} />
                    <span>Tambah Pasien</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tambah Pasien Baru</DialogTitle>
                    <DialogDescription>
                      Masukkan data pasien baru ke dalam sistem.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Lengkap*</FormLabel>
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
                        
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Usia*</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Masukkan usia"
                                  {...field}
                                  className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>No. Telepon*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Masukkan nomor telepon"
                                  {...field}
                                  className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="nik"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NIK</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Masukkan NIK (opsional)"
                                  {...field}
                                  className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alamat*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan alamat lengkap"
                                {...field}
                                className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="bloodType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Golongan Darah</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="focus:ring-[#2E86AB]/20">
                                    <SelectValue placeholder="Pilih golongan darah" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="AB">AB</SelectItem>
                                  <SelectItem value="O">O</SelectItem>
                                  <SelectItem value="Belum diketahui">Belum diketahui</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status*</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="focus:ring-[#2E86AB]/20">
                                    <SelectValue placeholder="Pilih status pasien" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Hamil">Hamil</SelectItem>
                                  <SelectItem value="Postpartum">Postpartum</SelectItem>
                                  <SelectItem value="Tidak Hamil">Tidak Hamil</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {form.watch('status') === 'Hamil' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="lmp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>HPHT</FormLabel>
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
                          
                          <FormField
                            control={form.control}
                            name="gestationalAge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usia Kehamilan</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: 32 minggu"
                                    {...field}
                                    className="focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catatan Tambahan</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tambahkan catatan khusus tentang pasien (opsional)"
                                {...field}
                                className="min-h-[100px] focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingPatient(false)}
                          className="mt-4"
                        >
                          Batal
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-[#2E86AB] hover:bg-[#2E86AB]/90 mt-4"
                        >
                          Simpan Pasien
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Cari pasien berdasarkan nama, ID, atau alamat..."
                      className="pl-10 pr-4 py-2 border-gray-200 focus:border-[#2E86AB] focus:ring-[#2E86AB]/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-200"
                      onClick={() => setSearchQuery('')}
                      disabled={!searchQuery}
                    >
                      Reset
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-200"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <Tabs 
                  defaultValue="all" 
                  value={selectedTab}
                  onValueChange={setSelectedTab}
                  className="w-full"
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="pregnant">Hamil</TabsTrigger>
                    <TabsTrigger value="postpartum">Postpartum</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    <GSAPScrollTrigger animationType="fadeIn" start="top 90%">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead className="w-[100px]">ID</TableHead>
                              <TableHead>Nama</TableHead>
                              <TableHead className="hidden md:table-cell">Usia</TableHead>
                              <TableHead className="hidden md:table-cell">Status</TableHead>
                              <TableHead className="hidden md:table-cell">Kunjungan Terakhir</TableHead>
                              <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPatients.length > 0 ? (
                              filteredPatients.map((patient, index) => (
                                <TableRow key={patient.id} className="hover:bg-gray-50">
                                  <TableCell className="font-medium">{patient.id}</TableCell>
                                  <TableCell>{patient.name}</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.age} tahun</TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      patient.status === 'Hamil' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : patient.status.includes('Postpartum') 
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {patient.status}
                                    </span>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <FileText size={16} className="text-gray-600" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Edit size={16} className="text-gray-600" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                  Tidak ada data pasien yang ditemukan
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </GSAPScrollTrigger>
                  </TabsContent>
                  
                  <TabsContent value="pregnant" className="space-y-4">
                    <GSAPScrollTrigger animationType="fadeIn" start="top 90%">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead className="w-[100px]">ID</TableHead>
                              <TableHead>Nama</TableHead>
                              <TableHead className="hidden md:table-cell">Usia</TableHead>
                              <TableHead className="hidden md:table-cell">Usia Kehamilan</TableHead>
                              <TableHead className="hidden md:table-cell">Kunjungan Terakhir</TableHead>
                              <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPatients.length > 0 ? (
                              filteredPatients.map((patient, index) => (
                                <TableRow key={patient.id} className="hover:bg-gray-50">
                                  <TableCell className="font-medium">{patient.id}</TableCell>
                                  <TableCell>{patient.name}</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.age} tahun</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.gestationalAge}</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <FileText size={16} className="text-gray-600" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Edit size={16} className="text-gray-600" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                  Tidak ada data pasien hamil yang ditemukan
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </GSAPScrollTrigger>
                  </TabsContent>
                  
                  <TabsContent value="postpartum" className="space-y-4">
                    <GSAPScrollTrigger animationType="fadeIn" start="top 90%">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead className="w-[100px]">ID</TableHead>
                              <TableHead>Nama</TableHead>
                              <TableHead className="hidden md:table-cell">Usia</TableHead>
                              <TableHead className="hidden md:table-cell">Status</TableHead>
                              <TableHead className="hidden md:table-cell">Kunjungan Terakhir</TableHead>
                              <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPatients.length > 0 ? (
                              filteredPatients.map((patient, index) => (
                                <TableRow key={patient.id} className="hover:bg-gray-50">
                                  <TableCell className="font-medium">{patient.id}</TableCell>
                                  <TableCell>{patient.name}</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.age} tahun</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.status}</TableCell>
                                  <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <FileText size={16} className="text-gray-600" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Edit size={16} className="text-gray-600" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                  Tidak ada data pasien postpartum yang ditemukan
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </GSAPScrollTrigger>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>
        
        <GSAPScrollTrigger 
          animationType="fadeIn" 
          start="top 90%"
          delay={0.3}
          className="mt-4"
        >
          <Card className="overflow-hidden border-gray-100 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#2E86AB]/5 to-transparent">
              <CardTitle className="text-lg">Fitur Catatan Pasien</CardTitle>
              <CardDescription>
                Manfaat penggunaan sistem pencatatan digital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#2E86AB]">Data yang Disimpan</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                    <li>Identitas dan data demografis pasien</li>
                    <li>Riwayat kehamilan dan persalinan</li>
                    <li>Hasil pemeriksaan ANC dan PNC</li>
                    <li>Riwayat imunisasi ibu dan bayi</li>
                    <li>Catatan kesehatan terkait kehamilan</li>
                    <li>Jadwal kontrol dan kunjungan</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#2E86AB]">Keuntungan Sistem Digital</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                    <li>Akses cepat ke data pasien</li>
                    <li>Pantau perkembangan pasien secara efisien</li>
                    <li>Pencatatan terstruktur dan standardisasi data</li>
                    <li>Kemudahan berbagi informasi antar tenaga kesehatan</li>
                    <li>Ekspor dan cetak rekam medis dengan mudah</li>
                    <li>Simpan data dengan aman dan terorganisir</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </GSAPScrollTrigger>
      </div>
    </div>
  );
} 