// components/Logo.tsx
import React from 'react';

export const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 100"
        className="h-16"
      >
        <g transform="translate(50,25)">
          {/* Connected Nodes Pattern */}
          <g className="node-pattern">
            {/* Main Nodes */}
            <circle cx="20" cy="20" r="6" fill="#0A2647"/>
            <circle cx="60" cy="20" r="6" fill="#0A2647"/>
            <circle cx="40" cy="50" r="6" fill="#0A2647"/>
            
            {/* Connecting Lines */}
            <line x1="20" y1="20" x2="60" y2="20" stroke="#0A2647" strokeWidth="1.5"/>
            <line x1="20" y1="20" x2="40" y2="50" stroke="#0A2647" strokeWidth="1.5"/>
            <line x1="60" y1="20" x2="40" y2="50" stroke="#0A2647" strokeWidth="1.5"/>
            
            {/* Accent Rings */}
            <circle cx="20" cy="20" r="12" fill="none" stroke="#007AFF" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="60" cy="20" r="12" fill="none" stroke="#007AFF" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="40" cy="50" r="12" fill="none" stroke="#007AFF" strokeWidth="0.5" opacity="0.6"/>
          </g>
          
          {/* Typography */}
          <g transform="translate(90,0)">
            <text y="25" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="600" fill="#0A2647">
              Federico Martinez
            </text>
            <text y="50" fontFamily="Inter, sans-serif" fontSize="14" fill="#444444">
              Technical Partner
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};