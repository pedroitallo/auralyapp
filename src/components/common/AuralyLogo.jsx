import React from 'react';

export default function AuralyLogo({ className = "" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688921c0fcef3790376fdc81/82b61c0af_NameLogo.png"
        alt="Auraly"
        className="h-8 w-auto"
      />
    </div>
  );
}