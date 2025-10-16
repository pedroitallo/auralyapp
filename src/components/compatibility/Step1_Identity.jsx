import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserPlus, Users } from 'lucide-react';

const GenderCard = ({ icon, label, isSelected, onClick }) => {
  const Icon = icon;
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 text-center border-2 transition-all duration-300 ${isSelected ? 'bg-purple-600/30 border-purple-500' : 'bg-white/5 border-transparent'}`}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className={`mx-auto mb-2 w-8 h-8 ${isSelected ? 'text-white' : 'text-purple-300'}`} />
      <span className="font-semibold">{label}</span>
    </motion.div>
  );
};

const Step1_Identity = ({ onNext, formData }) => {
  const [name, setName] = useState(formData.person1.name);
  const [gender, setGender] = useState(formData.person1.gender);

  const canContinue = name.trim() !== '' && gender !== '';

  const handleNext = () => {
    if (canContinue) {
      onNext({ person1: { ...formData.person1, name, gender } });
    }
  };

  return (
    <div className="text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-3xl font-bold">Tell us about you</h1>
        <p className="text-purple-200 mt-2">Let's start with some basic info to align the energies.</p>
      </motion.div>

      <div className="space-y-6">
        <div>
          <label className="block text-left text-lg font-semibold mb-2">What is the person's name</label>
          <Input
            placeholder="Enter the person’s name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 h-14 text-lg text-center rounded-xl placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-left text-lg font-semibold mb-2">Select a Gender</label>
          <div className="grid grid-cols-3 gap-4">
            <GenderCard icon={User} label="Male" isSelected={gender === 'Male'} onClick={() => setGender('Male')} />
            <GenderCard icon={UserPlus} label="Female" isSelected={gender === 'Female'} onClick={() => setGender('Female')} />
            <GenderCard icon={Users} label="Non-binary" isSelected={gender === 'Non-binary'} onClick={() => setGender('Non-binary')} />
          </div>
        </div>
      </div>

      <div className="pt-4">
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

export default Step1_Identity;