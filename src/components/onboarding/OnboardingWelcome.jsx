
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useMixpanel } from '../analytics/useMixpanel';

const AuraMessage = ({ children, delay = 0 }) =>
<motion.div
  className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center space-x-4 max-w-sm mx-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay }}>

    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688921c0fcef3790376fdc81/1e269c925_CapturadeTela2025-07-28as112413.png" alt="Madame Aura" className="w-12 h-12 rounded-full border-2 border-purple-300 object-cover" />
    <p className="text-white text-left text-base leading-snug">
      {children}
    </p>
  </motion.div>;


export default function OnboardingWelcome({ onNext }) {
  const { track } = useMixpanel();

  const handleStart = () => {
    // Track when the user initiates the onboarding flow
    track('Onboarding_initiate');
    onNext();
  };

  return (
    <div className="max-w-sm mx-auto text-center space-y-8">
      <AuraMessage delay={0.2}>
        Welcome to your journey of soulmate revelation, my dear. The drawing of your soulmate's face is already ready, and I will reveal it in the next moments.
      </AuraMessage>
      
      <div className="space-y-4">
        <motion.p className="text-purple-200 text-sm"

        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}>From now on, you will have access to Auraly, my exclusive app where your journey will be guided step by step, including:


        </motion.p>
        
        <motion.div
          className="space-y-3 text-left bg-purple-900/30 border border-purple-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}>

          <div className="flex items-start space-x-3">
            <span className="text-purple-300">🔮</span>
            <p className="text-purple-100 text-sm">
              <strong>Your Soulmate's Portrait</strong> – the image that reveals who is destined to cross your path.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-purple-300">🌙</span>
            <p className="text-purple-100 text-sm">
              <strong>Access to Madame Aura</strong> – your spiritual guide for deep readings and unique revelations.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-purple-300">✨</span>
            <p className="text-purple-100 text-sm">
              <strong>Love predictions and astral readings</strong> – answers about your future and relationships.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}>

        <Button
          onClick={handleStart}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-4 rounded-2xl">

          START REVELATION NOW
        </Button>
      </motion.div>
    </div>);

}