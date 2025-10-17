import React, { useEffect } from "react";
import { X, Lock, Bell, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Paywall() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.samcart.com/checkouts/sc-slide-script.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleStartTrial = () => {
    window.location.href = "https://appyon-app.mysamcart.com/checkout/drawing-soulmate-auraly-app-copy#samcart-slide-open-right";
  };

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3B5E7E] to-[#2A4A65] flex flex-col relative">
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="space-y-8 w-full">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              How your free trial works
            </h1>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4">
              <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Today</h3>
                <p className="text-white/70 text-sm">
                  Unlock access to all premium features
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4">
              <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Day 5</h3>
                <p className="text-white/70 text-sm">
                  Get a reminder that your trial is about to end
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-start space-x-4">
              <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Day 7</h3>
                <p className="text-white/70 text-sm">
                  Your subscription starts. Cancel anytime before.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-center text-white/80 text-sm">
              Free access for 7 days, then <span className="font-semibold">$59.99 per year</span>
            </p>

            <Button
              onClick={handleStartTrial}
              className="w-full h-14 text-lg bg-[#7DD3FC] hover:bg-[#6BC2EB] text-[#1E3A5F] font-semibold rounded-full transition-all shadow-lg"
            >
              Start 7-Day Free Trial
            </Button>

            <button
              onClick={() => navigate("/home")}
              className="w-full text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              View All Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
