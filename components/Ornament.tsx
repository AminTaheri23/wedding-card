import React from 'react';

export const OrnamentTop: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 500 150" className={className} fill="currentColor">
    <path d="M250,80 C180,80 150,120 80,120 S0,80 0,80 V0 H500 V80 C500,80 420,120 350,120 S320,80 250,80 Z" opacity="0.1" />
    <path d="M250,60 C200,60 180,90 100,90 S0,60 0,60 V0 H500 V60 C500,60 400,90 320,90 S300,60 250,60 Z" />
    <circle cx="250" cy="90" r="10" />
  </svg>
);

export const OrnamentBottom: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 500 150" className={className} fill="currentColor">
    <path d="M250,70 C320,70 350,30 420,30 S500,70 500,70 V150 H0 V70 C0,70 80,30 150,30 S180,70 250,70 Z" opacity="0.1" />
    <path d="M250,90 C300,90 320,60 400,60 S500,90 500,90 V150 H0 V90 C0,90 100,60 180,60 S200,90 250,90 Z" />
    <circle cx="250" cy="60" r="10" />
  </svg>
);