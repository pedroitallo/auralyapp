import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex flex-col items-center justify-center text-center p-6 z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-6xl mb-6">✨</div>
      <h1 className="text-3xl font-bold text-white mb-4">Aligning the stars…</h1>
      <p className="text-purple-200">Calculating your cosmic connection.</p>
    </motion.div>
    <div className="w-full max-w-sm bg-gray-700/50 rounded-full h-2.5 mt-8 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 5, ease: 'linear' }}
      />
    </div>
  </div>
);

export default LoadingScreen;