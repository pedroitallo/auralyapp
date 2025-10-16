import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Step1_Identity from '../components/compatibility/Step1_Identity';
import Step2_Signs from '../components/compatibility/Step2_Signs';
import Step3_Relationship from '../components/compatibility/Step3_Relationship';
import LoadingScreen from '../components/compatibility/LoadingScreen';
import ResultScreen from '../components/compatibility/ResultScreen';
import ProgressDots from '../components/compatibility/ProgressDots';

const CompatibilityRevelationPage = () => {
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

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleFinalSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 5000); // 5-second loading
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
    return <ResultScreen formData={formData} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101427] to-[#1C132F] text-white font-sans flex flex-col p-6">
       <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');
          .font-sans { font-family: 'Nunito Sans', sans-serif; }
        `}</style>
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        {step > 1 && (
          <button onClick={handleBack} className="text-purple-300 hover:text-white">
            <ArrowLeft size={24} />
          </button>
        )}
        <div className={`flex-grow ${step === 1 ? 'text-center' : 'text-center pr-6'}`}>
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
    </div>
  );
};

export default CompatibilityRevelationPage;