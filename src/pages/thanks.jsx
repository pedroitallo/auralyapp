
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, CreditCard, ArrowRight, Heart, Star, Moon, MessageSquare } from 'lucide-react';

export default function ThanksPage() {

  const trackClick = async (buttonType) => {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buttonType })
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleUpsellClick = () => {
    trackClick('thanks_page_upsell');
    // Using a placeholder checkout link for the upsell
    window.open('https://payments.securitysacred.online/checkout/196602517:1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 text-white p-6 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Main Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">✨ Thank you for your purchase!</h1>
          <p className="text-purple-200 text-lg">Your journey to discovering your Soulmate begins now.</p>
        </div>

        {/* Confirmation Block */}
        <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center mb-4">Purchase Confirmation</h2>
          <p className="text-center">Thank you for trusting my astral reading.</p>
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
            <p className="text-purple-200">You will receive all the details of your purchase and access instructions in your email.</p>
          </div>
          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
            <p className="text-purple-200">On your bank statement, the charge will appear as: <span className="font-semibold text-white">XX-astrosoulmate</span>.</p>
          </div>
        </div>

        {/* Access Block */}
        <div className="text-center bg-white/5 border border-purple-500/20 rounded-2xl p-6">
           <h2 className="text-xl font-semibold mb-2">Access Your Content</h2>
           <p className="text-slate-50 mb-4">Now you can download our application to follow all updates and information about your Soulmate's Drawing.</p>
           <Link to={createPageUrl('onboarding?id=1')}>
             <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg h-14 rounded-xl">
               Access Soulmate Drawing
               <ArrowRight className="w-5 h-5 ml-2" />
             </Button>
           </Link>
        </div>
        
        {/* Upsell Offer */}
        <div className="bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/20 border border-yellow-400/30 rounded-2xl p-6 space-y-4 cosmic-glow">
          <div className="text-center">
            <p className="font-semibold text-yellow-300">Before you leave, we have an exclusive gift for you:</p>
          </div>
          <h3 className="text-2xl font-bold text-center">🔮 Private Consultation with Madame Aura</h3>
          <p className="text-center text-purple-200">
            Have you ever imagined talking to me in real time and clearing all your doubts about your love future?
          </p>
          <p className="text-center text-lg">
            For just <span className="font-bold text-green-400">$97</span>, you will have access to an individual session with me, where you can:
          </p>
          <div className="space-y-3 pt-2 text-purple-200">
            <div className="flex items-center gap-3"><Heart className="w-5 h-5 text-pink-400" /><span>Ask personal questions about your soulmate;</span></div>
            <div className="flex items-center gap-3"><Star className="w-5 h-5 text-yellow-300" /><span>Receive exclusive guidance;</span></div>
            <div className="flex items-center gap-3"><Moon className="w-5 h-5 text-indigo-300" /><span>Get clarity on your next steps in love.</span></div>
          </div>
          <p className="text-center text-sm text-yellow-400/80 pt-2">
            ⏳ Special offer available only now, on this page.
          </p>
          <Button onClick={handleUpsellClick} size="lg" className="bg-green-600 text-white px-8 text-lg font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full hover:bg-orange-700 h-14 rounded-xl">
            I want this individual consultation
          </Button>
        </div>
      </div>
    </div>);

}
