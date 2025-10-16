import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, Sparkles, Infinity, Zap, Mail, Music, ArrowDown, X, Clock } from 'lucide-react';

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const backContentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
};

const iconMap = {
  energy: Sparkles,
  appearance: Eye,
  destiny: Infinity,
  activation: Zap,
  letter: Mail,
};

const CardFront = ({ data, isLocked, showTimer }) => {
  const Icon = iconMap[data.type] || Sparkles;
  
  return (
    <motion.div className="flex flex-col items-center justify-center text-center p-6 h-full">
      <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${isLocked ? 'bg-white/5' : 'bg-purple-500/20'}`}>
        {isLocked ? (
          showTimer ? (
            <Clock className="w-8 h-8 text-purple-300/50 animate-pulse" />
          ) : (
            <Lock className="w-8 h-8 text-purple-300/50" />
          )
        ) : (
          <Icon className="w-8 h-8 text-purple-300 animate-pulse" />
        )}
      </div>
      <h3 className={`font-semibold text-lg ${isLocked ? 'text-white/40' : 'text-white'}`}>{data.front.title}</h3>
      <p className={`text-sm ${isLocked ? 'text-purple-200/40' : 'text-purple-200'}`}>{data.front.subtitle}</p>
      {!isLocked && <div className="absolute bottom-4 text-purple-300 text-xs animate-bounce">Tap to reveal</div>}
      {isLocked && showTimer && (
        <div className="absolute bottom-4 text-purple-300/60 text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          Time-locked
        </div>
      )}
    </motion.div>
  );
};

const CardBack = ({ data, onClose }) => {
  const renderContent = () => {
    switch (data.type) {
      case 'appearance':
        return (
          <>
            <motion.div 
              className="relative rounded-lg overflow-hidden mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img src={data.back.image} alt={data.back.title} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
            <ul className="space-y-2 text-purple-200 text-sm list-inside list-disc marker:text-purple-400">
              {data.back.content.map((item, index) => <li key={index} className="leading-relaxed">{item}</li>)}
            </ul>
          </>
        );
      case 'letter':
         return (
            <div className="text-purple-200 text-sm space-y-4 text-left italic font-serif bg-black/20 p-4 rounded-lg">
              {data.back.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          );
      default:
        return (
          <ul className="space-y-3 text-purple-200 text-sm list-inside list-disc marker:text-purple-400">
            {data.back.content.map((item, index) => <li key={index} className="leading-relaxed">{item}</li>)}
          </ul>
        );
    }
  };

  return (
    <motion.div 
      className="p-6 h-full w-full overflow-y-auto relative"
      variants={backContentVariants}
      initial="hidden"
      animate="visible"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 z-10"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <h3 className="text-xl font-bold text-white mb-4 text-center pr-8">{data.back.title}</h3>
      {renderContent()}
    </motion.div>
  );
};

export default function DestinyCard({ data, isLocked, onReveal, showTimer = false }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isLocked && !isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  const handleClose = () => {
    setIsRevealed(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative w-full min-h-[220px] rounded-3xl border transition-all duration-500 overflow-hidden
        ${isLocked 
          ? 'bg-gray-900/30 border-white/10 cursor-not-allowed' 
          : 'bg-gray-900/60 border-purple-500/30 cosmic-glow-sm cursor-pointer hover:border-purple-400'
        }
        ${isRevealed ? 'min-h-[400px] border-purple-400' : ''}
      `}
      onClick={!isRevealed ? handleReveal : undefined}
      layout
    >
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="front"
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CardFront data={data} isLocked={isLocked} showTimer={showTimer} />
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
            <CardBack data={data} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}