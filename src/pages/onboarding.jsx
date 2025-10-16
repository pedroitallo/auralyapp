
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useMixpanel } from "../components/analytics/useMixpanel";
import portraitImages from "../components/onboarding/portraitData";

import OnboardingWelcome from "../components/onboarding/OnboardingWelcome";
import OnboardingConnection from "../components/onboarding/OnboardingConnection";
import ProgressIndicator from "../components/onboarding/ProgressIndicator";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { track } = useMixpanel();
  
  useEffect(() => {
    track('Onboarding_view');
    
    const onboardingComplete = localStorage.getItem('holyguide_onboarding_complete');
    if (onboardingComplete === 'true') {
      navigate(createPageUrl('journeys'));
    }
  }, [navigate, track]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data = {}) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    
    if (currentStep === 2) {
      const genderKey = updatedFormData.gender;
      const ageKey = updatedFormData.age_range;
      
      let selectedPortraitUrl = '';
      if (portraitImages[genderKey] && portraitImages[genderKey][ageKey]) {
        const availableImages = portraitImages[genderKey][ageKey];
        selectedPortraitUrl = availableImages[Math.floor(Math.random() * availableImages.length)];
      } else {
        selectedPortraitUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/837fab260_image.png';
      }

      localStorage.setItem('holyguide_soulmate_portrait_url', selectedPortraitUrl);
      localStorage.setItem('holyguide_onboarding_data', JSON.stringify(updatedFormData));
      localStorage.setItem('holyguide_onboarding_complete', 'true');
      localStorage.setItem('holyguide_onboarding_complete_time', Date.now().toString()); // Added this line
      
      track('onboarding_complete', {
        user_gender: updatedFormData.gender,
        user_age_range: updatedFormData.age_range,
        portrait_url: selectedPortraitUrl
      });
      
      navigate(createPageUrl('journeys'));
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingWelcome onNext={handleNext} />;
      case 2:
        return <OnboardingConnection onNext={handleNext} onBack={handleBack} />;
      default:
        return <OnboardingWelcome onNext={handleNext} />;
    }
  };

  const totalSteps = 2;
  const displayStep = currentStep;

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator currentStep={displayStep} totalSteps={totalSteps} />
      <div className="flex-1 flex items-center justify-center px-4">
        {renderStep()}
      </div>
    </div>
  );
}
