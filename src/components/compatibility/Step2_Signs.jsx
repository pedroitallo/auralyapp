import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { zodiacSigns } from './data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';

const SignCard = ({ sign, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`flex-shrink-0 cursor-pointer rounded-full w-24 h-24 p-2 text-center border-2 transition-all duration-300 flex flex-col items-center justify-center ${isSelected ? 'bg-purple-600/40 border-purple-500' : 'bg-white/5 border-transparent'}`}
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-3xl mb-1">{sign.icon}</span>
    <span className="text-xs font-semibold">{sign.name}</span>
  </motion.div>
);

const Step2_Signs = ({ onNext, formData }) => {
  const [yourSign, setYourSign] = useState(formData.person2.sign);
  const [theirSign, setTheirSign] = useState(formData.person1.sign);

  const canContinue = yourSign && theirSign;

  const handleNext = () => {
    if (canContinue) {
      onNext({
        person1: { ...formData.person1, sign: theirSign },
        person2: { ...formData.person2, sign: yourSign },
      });
    }
  };
  
  const handleSkip = () => {
      const randomSign1 = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
      const randomSign2 = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
      onNext({
        person1: { ...formData.person1, sign: randomSign1 },
        person2: { ...formData.person2, sign: randomSign2 },
      });
  }

  return (
    <div className="text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Choose the signs</h1>
        <p className="text-purple-200 mt-2">Zodiac signs reveal the core energies of your connection.</p>
      </motion.div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Your Sign</h3>
          <div className="flex items-center justify-end mb-2">
            <div className="flex items-center space-x-1 text-purple-300 text-xs">
              <span>Drag to explore</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 p-4">
              {zodiacSigns.map(sign => (
                <SignCard key={`your-${sign.name}`} sign={sign} isSelected={yourSign?.name === sign.name} onClick={() => setYourSign(sign)} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Their Sign</h3>
          <div className="flex items-center justify-end mb-2">
            <div className="flex items-center space-x-1 text-purple-300 text-xs">
              <span>Drag to explore</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
           <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 p-4">
              {zodiacSigns.map(sign => (
                <SignCard key={`their-${sign.name}`} sign={sign} isSelected={theirSign?.name === sign.name} onClick={() => setTheirSign(sign)} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      
       <Button
        onClick={handleSkip}
        variant="link"
        className="text-purple-300"
      >
        Don't know → continue without
      </Button>

      <div className="pt-2">
        <Button
          onClick={handleNext}
          disabled={!canContinue}
          className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:opacity-50 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default Step2_Signs;