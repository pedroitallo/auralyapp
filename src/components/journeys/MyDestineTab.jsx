
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
};

const originalDestineData = [
  {
    id: 1,
    type: 'energy',
    title: "Soulmate Energy Revelation",
    lockHours: 24,
    content: [
      "Channeling: 'The soul seeking you in this plane carries the energy of a wise protector...'",
      "Vibrational Field: Strong, protective, sensitive and healing."
    ]
  },
  {
    id: 3,
    type: 'destiny',
    title: "Your Love Destiny",
    lockHours: 24,
    blurContent: true,
    content: [
      "Spiritual Timeline: Your souls are in the 'Cosmic Recognition' phase. You may have already crossed paths briefly.",
      "Reconnections: This is not a new bond, but a deep spiritual reunion from past lives.",
      "Couple's Mission: Together, you are mirrors of expansion, destined to amplify healing and light in the world."
    ]
  },
  {
    id: 4,
    type: 'activation',
    title: "Activate Soul Connection",
    content: [
      "Activation Mantra: 'I invoke the universe to align our paths. What is meant to be will manifest in divine timing.'",
      "Energetic Alignment: Wear something blue on Thursdays - this strengthens your magnetic field for love.",
      "Dream Connection: Before sleeping, whisper 'Find me' three times. Your souls will begin communicating through dreams."
    ]
  },
  {
    id: 5,
    type: 'letter',
    title: "A Letter For You",
    lockHours: 48,
    lockMessage: "Channeling message from your soulmate...",
    content: [
      "My beloved,",
      "Even before seeing your face, my soul already recognized yours. In every sunrise, in every deep silence, there's a whisper that leads me to you.",
      "I feel your presence in the smallest things... In the wind that touches my face, in the scent that surrounds me without warning, in the sudden calm that reminds me that somewhere you exist.",
      "There were lives when we found each other and lives when we lost each other... but there was always an invisible thread connecting us, even when our paths seemed distant. This thread is made of love, patience, and destiny — and it has never broken.",
      "I know your pain, your fears, and your most secret hopes. And even without having touched you yet, I carry with me the promise to care for your heart as if it were part of mine. Because it is.",
      "The moment of our meeting is written in the stars and aligned with perfect timing. When we see each other, there will be no doubt — the recognition will be immediate, as if the entire world disappeared and only we two remained.",
      "Until then, keep living, dreaming, and preparing... I am on my way. I have always been on my way to you.",
      "With all the love that is already yours,",
      "Your Soulmate"
    ]
  },
];

const LockedCard = ({ data, remainingTime }) => {
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <motion.div
      variants={containerVariants.item}
      className="bg-gray-900/60 border border-purple-500/30 rounded-3xl p-6 cosmic-glow-sm relative overflow-hidden"
    >
      <h3 className="text-xl font-bold text-white mb-4 text-center">{data.title}</h3>
      
      <div className="absolute inset-0 top-16 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto border-2 border-purple-400/30">
            <Lock className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <p className="text-white font-semibold">{data.lockMessage || "Unlocking Soon"}</p>
            <div className="flex items-center justify-center space-x-2 text-purple-200 mt-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{hours}h {minutes}m remaining</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={data.blurContent ? "filter blur-sm" : ""}>
        <div className="space-y-2">
          {data.content.slice(0, 2).map((item, index) => (
            <p key={index} className="text-purple-200 text-sm">{item.substring(0, 50)}...</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const RevealedCard = ({ data }) => {
  const renderContent = () => {
    if (data.type === 'letter') {
      return (
        <div className="text-purple-200 text-sm space-y-4 text-left italic font-serif bg-black/20 p-4 rounded-lg">
          {data.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      );
    }

    return (
      <ul className="space-y-3 text-purple-200 text-sm list-inside list-disc marker:text-purple-400">
        {data.content.map((item, index) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div
      variants={containerVariants.item}
      className="bg-gray-900/60 border border-purple-500/30 rounded-3xl p-6 cosmic-glow-sm"
    >
      <h3 className="text-xl font-bold text-white mb-4 text-center">{data.title}</h3>
      {renderContent()}
    </motion.div>
  );
};

const MadameAuraCard = ({ onChatNow }) => {
  const trackClick = async (buttonType) => {
    try {
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buttonType })
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleGetReading = () => {
    trackClick('get_my_reading');
    onChatNow();
  };

  return (
    <motion.div
      variants={containerVariants.item}
      className="bg-gray-900/60 border border-purple-500/30 rounded-3xl p-6 flex flex-col items-center text-center cosmic-glow-sm"
    >
      <div className="relative flex-shrink-0 mb-4">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png" 
          alt="Madame Aura" 
          className="w-24 h-24 rounded-full object-cover border-2 border-purple-400"
        />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
      </div>
      <div className="space-y-3 mb-6">
        <h3 className="text-xl font-bold text-white">Madame Aura</h3>
        <p className="text-purple-300 font-medium">Love & Soulmate Expert</p>
        <p className="text-purple-200 text-sm leading-relaxed px-2">
          Start a private consultation with Madame Aura and ask for advice and clear doubts about your soulmate and love destiny. You can ask anything you want to Madame Aura for unlimited time.
        </p>
      </div>
      <Button 
        onClick={handleGetReading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-6 py-3"
      >
        Chat Now
      </Button>
    </motion.div>
  );
};

const SoulmateProfileHeader = ({ portraitUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 mb-8"
    >
      <div className="relative w-full max-w-sm mx-auto">
        <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl">
          <img 
            src={portraitUrl || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/837fab260_image.png'} 
            alt="Your Soulmate" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-4 right-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full px-3 py-1.5 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-white fill-white" />
              <span className="text-white font-bold text-base">92%</span>
            </div>
            <span className="text-white text-[10px] font-medium">compatibility</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/60 border border-purple-500/30 rounded-3xl p-6 space-y-4 cosmic-glow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-purple-300 text-sm">Zodiac Sign</p>
            <p className="text-white font-semibold text-lg">♊ Gemini</p>
          </div>
          <div className="space-y-1">
            <p className="text-purple-300 text-sm">Element</p>
            <p className="text-white font-semibold text-lg">Air</p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-purple-500/20">
          <p className="text-purple-300 text-sm">Personality</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-600/30 rounded-full text-purple-100 text-sm">Compassionate</span>
            <span className="px-3 py-1 bg-purple-600/30 rounded-full text-purple-100 text-sm">Protective</span>
            <span className="px-3 py-1 bg-purple-600/30 rounded-full text-purple-100 text-sm">Intuitive</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-purple-500/20">
          <p className="text-purple-300 text-sm">Soul Connection</p>
          <p className="text-white text-sm leading-relaxed">
            Your souls share a deep karmic bond from past lives. This connection is meant to bring healing, growth, and unconditional love.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function MyDestineTab() {
  const [showAuraPopup, setShowAuraPopup] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState('');
  const [unlockedCards, setUnlockedCards] = useState({});
  const [remainingTimes, setRemainingTimes] = useState({});

  useEffect(() => {
    const storedPortraitUrl = localStorage.getItem('holyguide_soulmate_portrait_url');
    if (storedPortraitUrl) {
      setPortraitUrl(storedPortraitUrl);
    }

    // Check unlock times
    const onboardingCompleteTime = localStorage.getItem('holyguide_onboarding_complete_time');
    if (!onboardingCompleteTime) {
      const now = Date.now();
      localStorage.setItem('holyguide_onboarding_complete_time', now.toString());
    }

    const checkUnlockStatus = () => {
      const completedTime = parseInt(localStorage.getItem('holyguide_onboarding_complete_time') || Date.now());
      const now = Date.now();
      const newUnlockedCards = {};
      const newRemainingTimes = {};

      originalDestineData.forEach(card => {
        if (card.lockHours) {
          const unlockTime = completedTime + (card.lockHours * 60 * 60 * 1000);
          const isUnlocked = now >= unlockTime;
          newUnlockedCards[card.id] = isUnlocked;
          if (!isUnlocked) {
            newRemainingTimes[card.id] = unlockTime - now;
          }
        } else {
          newUnlockedCards[card.id] = true;
        }
      });

      setUnlockedCards(newUnlockedCards);
      setRemainingTimes(newRemainingTimes);
    };

    checkUnlockStatus();
    const interval = setInterval(checkUnlockStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = () => {
    window.open('https://payments.securitysacred.online/checkout/184553763:1', '_blank');
  };

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Your Soulmate Journey</h2>
          <p className="text-purple-200">Discover the soul destined for you.</p>
        </div>

        <SoulmateProfileHeader portraitUrl={portraitUrl} />

        <div className="text-center pt-4">
          <h3 className="text-xl font-semibold text-white mb-2">Soul Revelations</h3>
          <p className="text-purple-200 text-sm">Deeper insights about your connection.</p>
        </div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {originalDestineData.map((data) => (
            unlockedCards[data.id] ? (
              <RevealedCard key={data.id} data={data} />
            ) : (
              <LockedCard key={data.id} data={data} remainingTime={remainingTimes[data.id] || 0} />
            )
          ))}
          <MadameAuraCard onChatNow={() => setShowAuraPopup(true)} />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showAuraPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAuraPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center max-w-sm w-full cosmic-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-shrink-0 mb-4">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png" alt="Madame Aura" className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 mx-auto"/>
                <div className="absolute top-0 right-[calc(50%-48px)] w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Madame Aura is Online!</h2>
              <p className="text-purple-200 mb-4">
                Join the queue in the next 2 minutes to get advice on your soulmate journey for just <span className="font-bold text-yellow-300">$9</span>.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={handlePurchase} className="w-full bg-purple-600 hover:bg-purple-700">
                  Get My Reading for $9
                </Button>
                <Button onClick={() => setShowAuraPopup(false)} variant="ghost" className="text-purple-300 hover:text-white">
                  Maybe Later
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
