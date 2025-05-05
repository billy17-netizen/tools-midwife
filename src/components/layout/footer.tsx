import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#2E86AB]/20 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -top-48 right-0 w-96 h-96 bg-[#F24236]/10 rounded-full opacity-20 blur-3xl"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E86AB] to-[#F24236] flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">TB</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">Tools Bidan</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Platform digital untuk memudahkan para bidan dalam menjalankan tugas profesional mereka dengan berbagai tools praktis.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#2E86AB] transition-colors duration-300 transform hover:scale-110" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2E86AB] transition-colors duration-300 transform hover:scale-110" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2E86AB] transition-colors duration-300 transform hover:scale-110" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">Tools</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/iron-calculator" className="text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#2E86AB] transition-colors duration-300"></span>
                  Kalkulator Zat Besi
                </Link>
              </li>
              <li>
                <Link href="/tools/pregnancy-calculator" className="text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#2E86AB] transition-colors duration-300"></span>
                  Kalkulator Kehamilan
                </Link>
              </li>
              <li>
                <Link href="/tools/bmi-calculator" className="text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#2E86AB] transition-colors duration-300"></span>
                  Kalkulator BMI
                </Link>
              </li>
              <li>
                <Link href="/tools/medication-calculator" className="text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#2E86AB] transition-colors duration-300"></span>
                  Kalkulator Dosis Obat
                </Link>
              </li>
              <li>
                <Link href="/tools/growth-chart" className="text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#2E86AB] transition-colors duration-300"></span>
                  Kurva Pertumbuhan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-[#2E86AB] to-[#F24236] bg-clip-text text-transparent">Kontak</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2E86AB] to-[#F24236] rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600 group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-[#2E86AB]/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span className="group-hover:text-[#2E86AB] transition-colors duration-300">+62 123 4567 890</span>
              </li>
              <li className="flex items-center text-gray-600 group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-[#2E86AB]/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="m22 6-10 7L2 6"></path></svg>
                </div>
                <span className="group-hover:text-[#2E86AB] transition-colors duration-300">info@toolsbidan.com</span>
              </li>
              <li className="flex items-center text-gray-600 group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-[#2E86AB]/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <span className="group-hover:text-[#2E86AB] transition-colors duration-300">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tools Bidan. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="/privacy" className="hover:text-[#2E86AB] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#2E86AB] transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-[#2E86AB] transition-colors duration-300">
              Medical Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 