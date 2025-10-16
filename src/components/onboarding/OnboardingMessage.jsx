import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function OnboardingMessage({ onNext }) {
  const [revelationStage, setRevelationStage] = useState('preparing'); // preparing -> revealing -> complete

  useEffect(() => {
    // Stage 1: Preparing (2 seconds)
    const timer1 = setTimeout(() => {
      setRevelationStage('revealing');
    }, 2000);

    // Stage 2: Revealing (3 seconds) 
    const timer2 = setTimeout(() => {
      setRevelationStage('complete');
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (revelationStage === 'preparing') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="font-serif text-2xl md:text-3xl text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Preparando sua revelação...
        </motion.h1>

        <motion.div
          className="w-80 h-80 rounded-2xl border-4 border-purple-500/50 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 flex items-center justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-center space-y-4">
            <motion.div
              className="w-16 h-16 border-4 border-purple-300/50 border-t-purple-300 rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-purple-200 text-sm">Conectando com as energias cósmicas...</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (revelationStage === 'revealing') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="font-serif text-2xl md:text-3xl text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Os sinais estão claros...
        </motion.h1>

        <motion.p
          className="text-purple-200 text-lg mb-8 max-w-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Sua alma gêmea está prestes a se revelar diante de você.
        </motion.p>

        <motion.div
          className="relative w-80 h-80 rounded-2xl border-4 border-purple-400/70 bg-gradient-to-br from-purple-700/40 to-indigo-700/40 flex items-center justify-center mb-6 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mystical revealing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/30 to-transparent"
            animate={{ 
              y: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ 
              x: ['-100%', '100%'],
              opacity: [0, 0.7, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          <div className="text-center space-y-4 z-10">
            <motion.div
              className="text-6xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            <p className="text-purple-200 text-sm">Revelando sua alma gêmea...</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Complete stage - show the final message and button
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-serif text-3xl md:text-4xl text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Revelação Completa!
      </motion.h1>

      <motion.p
        className="text-purple-200 text-lg mb-12 max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Sua alma gêmea foi revelada. Prepare-se para descobrir seu destino.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          size="lg"
        >
          👉 Ver Minha Alma Gêmea
        </Button>
      </motion.div>
    </motion.div>
  );
}