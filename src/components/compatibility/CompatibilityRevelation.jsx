import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Step1_Identity from './Step1_Identity';
import Step2_Signs from './Step2_Signs';
import Step3_Relationship from './Step3_Relationship';
import LoadingScreen from './LoadingScreen';
import ResultScreen from './ResultScreen';
import ProgressDots from './ProgressDots';

const CompatibilityRevelation = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    person1: { name: '', gender: '', sign: null },
    person2: { name: 'You', gender: '', sign: null },
    relationship: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleFinalSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 5000);
  };

  const handleRestart = () => {
    setStep(1);
    setFormData({
      person1: { name: '', gender: '', sign: null },
      person2: { name: 'You', gender: '', sign: null },
      relationship: '',
    });
    setShowResult(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_Identity onNext={handleNext} formData={formData} />;
      case 2:
        return <Step2_Signs onNext={handleNext} formData={formData} />;
      case 3:
        return <Step3_Relationship onNext={handleFinalSubmit} formData={formData} />;
      default:
        return <Step1_Identity onNext={handleNext} formData={formData} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showResult) {
    return <ResultScreen formData={formData} onRestart={handleRestart} onBack={onBack} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="min-h-screen bg-gradient-to-b from-[#101427] to-[#1C132F] text-white font-sans flex flex-col p-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');
        .font-sans { font-family: 'Nunito Sans', sans-serif; }
      `}</style>
      
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <button onClick={handleBackStep} className="text-purple-300 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-grow text-center pr-6">
          <ProgressDots current={step} total={3} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CompatibilityRevelation;