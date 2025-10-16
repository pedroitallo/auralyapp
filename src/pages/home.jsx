import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { createPageUrl } from "@/utils";

import AuralyLogo from "../components/common/AuralyLogo";
import WelcomeHeader from "../components/home/WelcomeHeader";
import DownloadAppButton from "../components/home/DownloadAppButton";
import FirebaseNotificationManager from "../components/notifications/FirebaseNotificationManager";
import NotificationPermission from "../components/notifications/NotificationPermission";
import SplashScreen from '../components/common/SplashScreen';
import DivineSoulMapCard from '../components/home/DivineSoulMapCard';
import HomeActionButtons from '../components/home/HomeActionButtons';
import TodaysFeatures from '../components/home/TodaysFeatures';
import HoroscopeCard from '../components/horoscope/HoroscopeCard';
import { useMixpanel } from '../components/analytics/useMixpanel';

export default function Home() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(false);
  
  const { track } = useMixpanel();

  useEffect(() => {
    track('view_home');
    
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    
    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasShownSplash', 'true');
    }

    loadData();
  }, [track]);

  const loadData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <FirebaseNotificationManager />
      <NotificationPermission />
      
      <div className="px-4 pt-8 pb-8 animate-in fade-in duration-500">
        <div className="max-w-sm mx-auto space-y-6">
          <AuralyLogo className="mb-4" />
          <WelcomeHeader user={user} />

          <HoroscopeCard />

          <TodaysFeatures />
          
          <DivineSoulMapCard />
          
          <HomeActionButtons />

          <DownloadAppButton />
        </div>
      </div>
    </>
  );
}