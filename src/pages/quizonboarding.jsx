import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const relationshipStatuses = [
  "Single",
  "In a relationship",
  "Married",
  "Complicated",
  "Prefer not to say"
];

export default function QuizOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    zodiacSign: "",
    relationshipStatus: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/paywall");
    }
  };

  const handleSkip = () => {
    navigate("/paywall");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">What's your name?</h2>
              <p className="text-gray-300">Let's personalize your experience</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                onClick={handleNext}
                disabled={!formData.name}
                className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">What's your gender?</h2>
              <p className="text-gray-300">This helps us personalize your readings</p>
            </div>
            <div className="space-y-3">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setFormData({ ...formData, gender });
                    setTimeout(handleNext, 300);
                  }}
                  className="w-full h-14 text-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">What's your zodiac sign?</h2>
              <p className="text-gray-300">Unlock your cosmic profile</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign}
                  onClick={() => {
                    setFormData({ ...formData, zodiacSign: sign });
                    setTimeout(handleNext, 300);
                  }}
                  className="h-14 text-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">What's your relationship status?</h2>
              <p className="text-gray-300">Help us guide your love journey</p>
            </div>
            <div className="space-y-3">
              {relationshipStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFormData({ ...formData, relationshipStatus: status });
                    setTimeout(handleNext, 300);
                  }}
                  className="w-full h-14 text-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex flex-col">
      <div className="w-full px-4 pt-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 text-white hover:text-gray-300 text-sm font-medium"
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {renderStep()}
      </div>
    </div>
  );
}
