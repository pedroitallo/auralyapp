import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OnboardingConnection({ onNext, onBack }) {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const handleNext = () => {
    if (selectedGender && selectedAge) {
      onNext({ gender: selectedGender, age_range: selectedAge });
    }
  };

  return (
    <div className="max-w-sm mx-auto text-center space-y-6">
      <motion.p
        className="text-purple-200 text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Answer the questions below so we can open the right portal and reveal who destiny chose for you:
      </motion.p>

      <motion.div
        className="bg-purple-900/30 border border-purple-500/30 rounded-3xl p-6 space-y-6 cosmic-glow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-pink-300">💖</span>
            <h3 className="text-white font-semibold">You are interested in (choose the gender of your SOULMATE)</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedGender("man")}
              className={`p-4 rounded-xl border transition-all ${
                selectedGender === "man"
                  ? "bg-purple-600 border-purple-400 text-white"
                  : "bg-purple-900/50 border-purple-600/50 text-purple-200"
              }`}
            >
              Man
            </button>
            <button
              onClick={() => setSelectedGender("woman")}
              className={`p-4 rounded-xl border transition-all ${
                selectedGender === "woman"
                  ? "bg-purple-600 border-purple-400 text-white"
                  : "bg-purple-900/50 border-purple-600/50 text-purple-200"
              }`}
            >
              Woman
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-300">🕰️</span>
            <h3 className="text-white font-semibold">What is the astral age of your soulmate's face you want to see?</h3>
          </div>

          <div className="space-y-3">
            {[
              { value: "20-30", label: "20 – 30 years" },
              { value: "30-50", label: "30 – 50 years" },
              { value: "50-60", label: "50 – 60 years" },
              { value: "60+", label: "60+" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedAge(option.value)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  selectedAge === option.value
                    ? "bg-purple-600 border-purple-400 text-white"
                    : "bg-purple-900/50 border-purple-600/50 text-purple-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-purple-200 text-sm text-center">
          🌌 These choices will help us align your revelation with the right energies of the universe.
        </p>
      </motion.div>

      <motion.div
        className="pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button
          onClick={handleNext}
          disabled={!selectedGender || !selectedAge}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-bold text-lg py-4 rounded-2xl"
        >
          REVEAL MY SOULMATE
        </Button>
      </motion.div>
    </div>
  );
}