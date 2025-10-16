import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PowerEnergyLesson = () => {
  useEffect(() => {
    // Load the vTurb script dynamically
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/8f5333fd-fe8a-42cd-9840-10519ad6c7c7/players/68972eed30627daa3dfb44e8/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const scripts = document.head.querySelectorAll('script[src*="converteai.net"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">Power Energy Activation</h2>
        <p className="text-purple-200 mt-2">
          Watch this guided session to unlock and align your inner energy centers.
        </p>
      </div>
      <div className="bg-black rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-4">
        <vturb-smartplayer 
          id="vid-68972eed30627daa3dfb44e8" 
          style={{ display: 'block', margin: '0 auto', width: '100%' }}
        ></vturb-smartplayer>
      </div>
      <div className="mt-6 text-center text-purple-300 text-sm bg-black/20 p-4 rounded-lg">
        <p>Find a quiet space, use headphones for the best experience, and allow the frequencies to resonate with your being.</p>
      </div>
    </div>
  );
};

export default function ExploreJourneyPage() {
  const [searchParams] = useSearchParams();
  const [journeyId, setJourneyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    setJourneyId(id);
    setIsLoading(false);
  }, [searchParams]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white">
          <Loader className="w-8 h-8 animate-spin mb-4" />
          <p>Loading your journey...</p>
        </div>
      );
    }

    switch (journeyId) {
      case 'powerenergy':
        return <PowerEnergyLesson />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center text-white bg-red-900/20 border border-red-500/50 p-8 rounded-2xl">
            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold">Journey Not Found</h2>
            <p className="text-red-200 mt-2">The spiritual path you're looking for is not available.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen px-4 pt-12 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to={createPageUrl('journeys')}>
            <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journeys
            </Button>
          </Link>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}