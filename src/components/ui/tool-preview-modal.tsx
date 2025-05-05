'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

type ToolPreviewModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  toolLink: string;
};

export default function ToolPreviewModal({
  title,
  isOpen,
  onClose,
  toolLink,
}: ToolPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-xs animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E86AB]">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span className="font-medium text-gray-800">{title}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <Button 
            className="w-full bg-[#2E86AB] hover:bg-[#2E86AB]/90 text-white"
            asChild
          >
            <Link href={toolLink}>Mulai Gunakan Tools</Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-gray-200"
            onClick={onClose}
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
} 