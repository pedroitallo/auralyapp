import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LockedDestinyTab() {
  const navigate = useNavigate();

  const handleReveal = () => {
    navigate(createPageUrl('onboarding'));
  };

  return (
    <div className="bg-gray-900/50 border border-purple-500/30 rounded-3xl p-8 flex flex-col items-center text-center cosmic-glow-sm space-y-6 animate-in fade-in duration-500">
      <div className="bg-purple-500/10 rounded-full p-4 border border-purple-500/20">
        <Lock className="w-10 h-10 text-purple-300" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Your Journey is Locked</h2>
        <p className="text-purple-200 max-w-xs mx-auto">
          Complete the revelation to unlock your soulmate's details and start your destiny path.
        </p>
      </div>
      <Button 
        onClick={handleReveal}
        className="w-full max-w-sm bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-6 py-3 text-base"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        REVEAL MY SOULMATE
      </Button>
    </div>
  );
}