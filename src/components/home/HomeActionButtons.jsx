import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen, MessageCircle, Compass, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useMixpanel } from '../analytics/useMixpanel';

const ActionButtonCard = ({ title, description, icon: Icon, url, onChatClick }) => {
  const { trackButtonClick } = useMixpanel();
  
  const handleClick = () => {
    trackButtonClick(title, 'Home Action Buttons');
    if (onChatClick) {
      onChatClick();
    }
  };

  const content = (
    <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:border-[var(--text-secondary)]/40 group-active:scale-95 cosmic-glow flex items-center justify-between h-full">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-[var(--text-secondary)] text-xs">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-[var(--text-primary)] transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  );

  if (url) {
    return (
      <Link to={url} className="block group" onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={handleClick} className="block group cursor-pointer">
      {content}
    </div>
  );
};

export default function HomeActionButtons() {
    const [showAuraPopup, setShowAuraPopup] = useState(false);
    const { trackButtonClick, trackFeatureUsed } = useMixpanel();

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

    const handlePurchase = () => {
        trackClick('get_my_reading');
        trackButtonClick('Get My Reading - $9', 'Aura Popup');
        window.open('https://payments.securitysacred.online/checkout/184553763:1', '_blank');
    };

    const handleAuraPopupOpen = () => {
        setShowAuraPopup(true);
        trackFeatureUsed('Spiritual Chat Popup');
    };

  return (
    <>
    <div className="space-y-4">
      <ActionButtonCard
        title="Daily Reading"
        description="Personalized insights and guidance"
        icon={BookOpen}
        url={createPageUrl('guides')}
      />
      <ActionButtonCard
        title="Spiritual Chat"
        description="Guided spiritual conversations"
        icon={MessageCircle}
        onChatClick={handleAuraPopupOpen}
      />
      <ActionButtonCard
        title="Journey"
        description="Discover your spiritual path"
        icon={Compass}
        url={createPageUrl('journeys')}
      />
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
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png" 
                            alt="Madame Aura" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 mx-auto"
                        />
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