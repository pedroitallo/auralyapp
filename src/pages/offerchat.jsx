
import React from 'react';
import { ArrowLeft, Heart, MessageSquare, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function OfferChatPage() {
  const trackClick = async (buttonType) => {
    try {
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buttonType })
      });
      // Optionally handle response if needed, but the requirement is to fail silently.
    } catch (error) {
      // Fail silently - don't block the user action
      console.error('Failed to track click:', error);
    }
  };

  const handlePurchase = () => {
    // Track the click before redirecting
    trackClick('unlock_private_session');
    window.open('https://payments.securitysacred.online/checkout/195702171:1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 p-4">
      <div className="max-w-sm mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6 pt-8">
          <Link to={createPageUrl("journeys")}>
            <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-white ml-4">Special Offer</h1>
        </div>

        {/* Main Offer Card */}
        <div className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center cosmic-glow">
          <div className="relative flex-shrink-0 mb-4">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png"
              alt="Madame Aura"
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-400 mx-auto" />

            <div className="absolute top-0 right-[calc(50%-56px)] w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            ✨ Madame Aura has released a private consultation just for you!
          </h2>
          
          <div className="space-y-4 mb-6">
            <p className="text-slate-100 text-sm leading-relaxed">Today you have access to an exclusive one-on-one consultation. It normally costs <span className="text-red-400 line-through">$97</span>, but for today only it's available for <span className="text-green-400 font-bold">$15</span>.

            </p>
            
            <p className="text-purple-200 text-sm font-semibold">
              👉 A unique opportunity to speak directly with Madame Aura and get clear answers to what worries you most.
            </p>
            
            {/* Chat Preview Image */}
            <div className="my-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688921c0fcef3790376fdc81/05f552721_image.png" 
                alt="Chat preview with Madame Aura" 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="text-left space-y-4 my-6 bg-slate-900/50 rounded-xl p-4">
            <p className="text-white text-center font-medium">In your consultation you can:</p>
            
            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
              <span className="text-purple-200 text-sm">Ask everything about your soulmate</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-purple-200 text-sm">Clear up doubts that keep you awake</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <Moon className="w-5 h-5 text-indigo-300 mt-1 flex-shrink-0" />
              <span className="text-purple-200 text-sm">Vent without judgment</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
              <span className="text-purple-200 text-sm">Ask for advice to follow the right path</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handlePurchase} className="bg-green-500 text-white px-4 py-2 text-lg font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full hover:bg-orange-700 h-14 rounded-xl">
              Unlock My Private Session
            </Button>
            
            <Link to={createPageUrl("journeys")}>
              <Button
                variant="ghost"
                className="w-full text-purple-300 hover:text-white">
                Maybe Later
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-purple-300">
            <span>🔒 Secure Payment</span>
            <span>•</span>
            <span>⭐ 4.9/5 Rating</span>
            <span>•</span>
            <span>💬 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
