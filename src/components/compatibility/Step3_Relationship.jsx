import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const relationships = [
  { name: 'Friends', emoji: '👥' },
  { name: 'Acquaintances', emoji: '🤝' },
  { name: 'Dating', emoji: '💕' },
  { name: 'Married', emoji: '💍' },
  { name: 'Exes', emoji: '💔' },
  { name: 'Crush', emoji: '😍' },
];

const RelationshipCard = ({ item, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`cursor-pointer rounded-xl p-4 text-center border-2 transition-all duration-300 flex items-center justify-center space-x-3 ${isSelected ? 'bg-purple-600/30 border-purple-500' : 'bg-white/5 border-transparent'}`}
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-2xl">{item.emoji}</span>
    <span className="font-semibold">{item.name}</span>
  </motion.div>
);

const Step3_Relationship = ({ onNext, formData }) => {
  const [relationship, setRelationship] = useState(formData.relationship);

  const canContinue = relationship !== '';

  const handleNext = () => {
    if (canContinue) {
      onNext({ relationship });
    }
  };

  return (
    <div className="text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">What's your relationship?</h1>
        <p className="text-purple-200 mt-2">This helps us understand the nature of your cosmic bond.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {relationships.map(item => (
          <RelationshipCard
            key={item.name}
            item={item}
            isSelected={relationship === item.name.toLowerCase()}
            onClick={() => setRelationship(item.name.toLowerCase())}
          />
        ))}
      </div>

      <div className="pt-4">
        <Button
          onClick={handleNext}
          disabled={!canContinue}
          className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:opacity-50 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          Check Compatibility
        </Button>
      </div>
    </div>
  );
};

export default Step3_Relationship;