import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function GiftOffer() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const isOfferClosed = localStorage.getItem('holyguide_gift_offer_closed') === 'true';
    if (!isOfferClosed) {
      // Delay appearance slightly to not be too intrusive
      const timer = setTimeout(() => {
        setIsCardVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseCard = () => {
    setIsCardVisible(false);
    localStorage.setItem('holyguide_gift_offer_closed', 'true');
  };

  return (
    <AnimatePresence>
      {isCardVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg relative flex items-center justify-between text-white my-6"
        >
          <div className="flex items-center space-x-3">
            <Gift className="w-6 h-6" />
            <div>
              <p className="font-bold">You've won a gift!</p>
              <p className="text-sm">Click to see your exclusive offer.</p>
            </div>
          </div>
          <Link to={createPageUrl("offerchat")}>
            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
              Open
            </Button>
          </Link>
          <button
            onClick={handleCloseCard}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}