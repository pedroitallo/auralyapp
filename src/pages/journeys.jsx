
import React, { useState, useEffect } from 'react';
import { journeysData } from '../components/journeys/data';
import { Compass } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyDestineTab from '../components/journeys/MyDestineTab';
import LoveInsightTab from '../components/journeys/LoveInsightTab';
import LockedDestinyTab from '../components/journeys/LockedDestinyTab';
import DownloadAppButton from '../components/home/DownloadAppButton';
import GiftOffer from '../components/journeys/GiftOffer';
import AuralyLogo from '../components/common/AuralyLogo';
import { useMixpanel } from '../components/analytics/useMixpanel';

export default function JourneysPage() {
  const [onboardingComplete, setOnboardingComplete] = useState(true);
  const { track } = useMixpanel();

  useEffect(() => {
    track('view_lovemap');

    const mainOnboardingDone = localStorage.getItem('holyguide_onboarding_complete') === 'true';
    setOnboardingComplete(mainOnboardingDone);
  }, [track]);

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AuralyLogo className="mb-4" />
        
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-3">
            <Compass className="w-7 h-7 text-purple-300" />
            <h1 className="text-3xl font-light text-white">Love Map</h1>
          </div>
          <p className="text-purple-200 text-sm">
            Your interactive guide to love and connection.
          </p>
        </div>

        <GiftOffer />

        <Tabs defaultValue="destiny" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/60 p-1.5 rounded-full border border-white/10">
            <TabsTrigger value="destiny" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">My Soulmate</TabsTrigger>
            <TabsTrigger value="insight" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">
              Love Insight
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="destiny" className="mt-6">
            {onboardingComplete ? <MyDestineTab /> : <LockedDestinyTab />}
          </TabsContent>

          <TabsContent value="insight" className="mt-6">
            <LoveInsightTab />
          </TabsContent>
        </Tabs>
        <div className="max-w-sm mx-auto">
          <DownloadAppButton />
        </div>
      </div>
    </div>
  );
}
