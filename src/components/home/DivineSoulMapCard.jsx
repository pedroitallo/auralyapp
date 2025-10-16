import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Map, ChevronRight } from 'lucide-react';

const DivineIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2L14.09 8.26L20.36 10.34L14.09 12.42L12 18.68L9.91 12.42L3.64 10.34L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 6L17.37 8.26L15.11 8.89L17.37 9.52L18 11.78L18.63 9.52L20.89 8.89L18.63 8.26L18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18L6.63 15.74L8.89 15.11L6.63 14.48L6 12.22L5.37 14.48L3.11 15.11L5.37 15.74L6 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function DivineSoulMapCard() {
  return (
    <div className="bg-[var(--card-background)] p-6 rounded-2xl border border-[var(--card-border)] cosmic-glow shadow-2xl animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <DivineIcon />
        <h3 className="text-xl font-semibold text-white">Map of the Divine Soul</h3>
        <p className="text-purple-200 text-sm max-w-[250px]">
          Discover your inner wisdom and spiritual guidance
        </p>
        <Link to={createPageUrl('journeys')} className="w-full">
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-6 py-3"
          >
            Access the Map of the Soul <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}