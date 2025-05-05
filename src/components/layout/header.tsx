'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ToolPreviewModal from '@/components/ui/tool-preview-modal';
import { ToolsBidanLogo } from '@/components/ui/logo';

export default function Header() {
  // Add client-side flag to prevent initial render mismatch
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    title: '',
    link: ''
  });
  const pathname = usePathname();

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update active route and close mobile menu when route changes
  useEffect(() => {
    if (isClient) {
      setIsMenuOpen(false);
      setActiveRoute(pathname);
    }
  }, [pathname, isClient]);

  // Scroll event handler with client-side check
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Navigation items (moved outside to prevent recreation)
  const navItems = [
    { href: '/tools', label: 'Tools', route: '/tools' },
    { href: '/resources', label: 'Referensi', route: '/resources' },
    { href: '/about', label: 'Tentang', route: '/about' },
  ];

  // Prevent rendering before client-side hydration
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <ToolsBidanLogo size={40} />
            <span className="font-poppins font-bold text-xl">Tools Bidan</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <ToolsBidanLogo 
              className="transition-transform group-hover:scale-105 duration-300" 
              size={40} 
            />
            <span className="font-poppins font-bold text-xl bg-gradient-to-r from-[#2E86AB] to-[#F24236] text-transparent bg-clip-text">
              Tools Bidan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "font-medium text-gray-600 hover:text-[#2E86AB] transition-colors duration-300 relative",
                  activeRoute === item.route 
                    ? "text-[#2E86AB] font-semibold" 
                    : "hover:text-[#2E86AB]"
                )}
              >
                {item.label}
                {activeRoute === item.route && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2E86AB]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-5">
              <span className={cn(
                "absolute block h-0.5 bg-gray-600 transform transition-all duration-300",
                isMenuOpen ? "rotate-45 top-2.5 w-5" : "w-5 top-1.5"
              )}></span>
              <span className={cn(
                "absolute block h-0.5 bg-gray-600 transform transition-all duration-300 top-2.5 w-5",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}></span>
              <span className={cn(
                "absolute block h-0.5 bg-gray-600 transform transition-all duration-300",
                isMenuOpen ? "-rotate-45 top-2.5 w-5" : "w-5 top-3.5"
              )}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={cn(
        "fixed inset-0 bg-white/95 backdrop-blur-md z-40 transform transition-transform duration-300 md:hidden overflow-y-auto",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <nav className="container mx-auto px-4 flex flex-col pt-24 pb-8 space-y-6">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "text-2xl font-semibold text-gray-800 hover:text-[#2E86AB] transition-colors duration-300 py-3 border-b border-gray-200",
                activeRoute === item.route ? "text-[#2E86AB]" : ""
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Tool Preview Modal */}
      <ToolPreviewModal 
        isOpen={previewModal.isOpen}
        title={previewModal.title}
        toolLink={previewModal.link}
        onClose={() => setPreviewModal({...previewModal, isOpen: false})}
      />
    </>
  );
} 