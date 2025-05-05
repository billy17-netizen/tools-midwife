import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const ToolsBidanLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 40 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`${className}`}
    >
      {/* Background circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="url(#gradient)" 
        stroke="#2E86AB" 
        strokeWidth="3"
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E86AB" />
          <stop offset="100%" stopColor="#F24236" />
        </linearGradient>
      </defs>
      
      {/* Stethoscope icon */}
      <path 
        d="M40 55 L60 55 Q70 55 70 45 Q70 35 60 35 L40 35" 
        fill="none" 
        stroke="white" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
      
      {/* Medical cross */}
      <path 
        d="M50 30 L50 70 M30 50 L70 50" 
        stroke="white" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
    </svg>
  );
}; 