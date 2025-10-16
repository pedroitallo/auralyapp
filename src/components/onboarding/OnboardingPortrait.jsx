
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { portraitImages } from './portraitData';
import { useMixpanel } from '../analytics/useMixpanel';

export default function OnboardingPortrait({ formData }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState(null);
  const { track } = useMixpanel(); // Initialize Mixpanel tracking hook

  useEffect(() => {
    // --- Lógica de seleção de imagem ---
    const getPortrait = () => {
      if (!formData || !formData.gender || !formData.age_range) {
        // Fallback se não houver dados do formulário
        const fallbackUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/837fab260_image.png";
        setPortraitUrl(fallbackUrl);
        localStorage.setItem('holyguide_soulmate_portrait_url', fallbackUrl);
        return;
      }
      
      const genderCode = formData.gender === 'man' ? 'H' : 'M';
      const ageRange = formData.age_range;
      
      const searchKey = `${genderCode}[-\\[]?${ageRange}`;
      
      const matchingImages = portraitImages.filter(url => {
        const regex = new RegExp(searchKey, 'i');
        return regex.test(url);
      });

      if (matchingImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingImages.length);
        const selectedUrl = matchingImages[randomIndex];
        setPortraitUrl(selectedUrl);
        localStorage.setItem('holyguide_soulmate_portrait_url', selectedUrl); // Salva no localStorage
      } else {
        const fallbackUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/837fab260_image.png";
        setPortraitUrl(fallbackUrl);
        localStorage.setItem('holyguide_soulmate_portrait_url', fallbackUrl); // Salva fallback no localStorage
      }
    };
    
    getPortrait();
    // --- Fim da lógica ---

    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleExploreGuide = () => {
    localStorage.setItem('holyguide_onboarding_complete', 'true'); // Marca o onboarding como concluído
    
    // Track onboarding completion
    track('onboarding_complete', {
      user_gender: formData?.gender,
      user_age_range: formData?.age_range
    });
    
    window.location.href = '/journeys'; // Redireciona diretamente para journeys
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-serif text-3xl md:text-4xl text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        The Soulmate Portrait
      </motion.h1>
      
      <motion.p
        className="text-purple-200 text-lg mb-8 max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        This is the face that carries the other half of your essence...
      </motion.p>

      <div className="relative mb-8">
        {!showImage || !portraitUrl ? (
          // Suspense loading effect
          <motion.div
            className="w-80 h-80 rounded-2xl border-4 border-white/20 bg-gradient-to-br from-purple-800/50 to-indigo-800/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center space-y-4">
              <motion.div
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-purple-200 text-sm">Revealing your soulmate...</p>
            </div>
          </motion.div>
        ) : (
          // Actual image with reveal effect
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={portraitUrl}
              alt="Your Soulmate"
              className="w-80 h-80 rounded-2xl shadow-2xl border-4 border-white/20 object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none"></div>
          </motion.div>
        )}
      </div>

      {showImage && (
        <motion.div
          className="space-y-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-purple-200 leading-relaxed">
            The eyes that will recognize your soul, the smile that will feel like home, 
            and the presence that will complete your spiritual journey.
          </p>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleExploreGuide}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View My Divine Soul Details
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
