import React, { useState, useEffect, useRef } from "react";
import { Hand, ArrowLeft, Loader, Coins, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Revelation } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { UploadFile } from "@/api/integrations";
import { logCoinTransaction } from "@/api/functions";
import InsufficientCreditsPopup from "../components/common/InsufficientCreditsPopup";

export default function LoveDestinyPage() {
  const [palmImage, setPalmImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [userCoins, setUserCoins] = useState(0);
  const [showInsufficientCredits, setShowInsufficientCredits] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadUserCoins();
  }, []);

  const loadUserCoins = async () => {
    try {
      const currentUser = await User.me();
      setUserCoins(currentUser.coins || 0);
    } catch (error) {
      console.error("Error loading user coins:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPalmImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReveal = async () => {
    if (!palmImage || isAnalyzing) return;
    
    let currentUser;
    try {
      currentUser = await User.me();
      if ((currentUser.coins || 0) < 5) {
        setShowInsufficientCredits(true);
        return;
      }
    } catch (error) {
      console.error("Error checking user coins:", error);
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { file_url } = await UploadFile({ file: palmImage });

      const newCoinBalance = Math.max(0, currentUser.coins - 5);
      await User.updateMyUserData({ coins: newCoinBalance });
      setUserCoins(newCoinBalance);
      await logCoinTransaction({
        type: "spend", amount: -5, description: "Love Destiny Palm Reading", service: "love_destiny",
        metadata: { image_url: file_url }
      });

      const prompt = `You are Madame Zola, a mystical palm reader. Analyze the provided image of a palm to reveal the user's love destiny. Be detailed, insightful, and use a mystical tone. Look for heart line, fate line, and other relevant signs. Start with "### Your Love Destiny Revealed".`;
      const result = await InvokeLLM({ prompt, file_urls: [file_url] });
      const analysisContent = typeof result === 'string' ? result : result?.response || 'The lines of fate are swirling with energy, but their meaning is veiled. Please try again when the cosmic energies are clearer.';
      setAnalysis(analysisContent);

      await Revelation.create({
        type: "Love Destiny", prompt: `Palm reading for image: ${file_url}`, response: analysisContent
      });

    } catch (error) {
      console.error("Error analyzing palm:", error);
      setAnalysis("The spirits are quiet today. I am unable to read your destiny at this moment. Please try again later.");
      try {
        const userToRefund = await User.me();
        const refundBalance = (userToRefund.coins || 0) + 5;
        await User.updateMyUserData({ coins: refundBalance });
        setUserCoins(refundBalance);
        await logCoinTransaction({
          type: "refund", amount: 5, description: "Refund for failed palm reading", service: "refund"
        });
      } catch (refundError) {
        console.error("Error refunding coins:", refundError);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const resetForm = () => {
    setPalmImage(null);
    setImagePreview(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (analysis) {
    return (
       <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center">
            <Hand className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Love Destiny Revealed</h1>
          <p className="text-purple-200 leading-relaxed mb-8 whitespace-pre-wrap">{analysis.replace("### Your Love Destiny Revealed", "").trim()}</p>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">The Palm You Shared:</h3>
            <img src={imagePreview} alt="Submitted Palm" className="rounded-xl mx-auto border-2 border-cyan-400/50" />
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={resetForm} className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700">
              New Reading
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl("journeys")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 bg-gray-900/50 px-3 py-1 rounded-full">
            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm">{userCoins}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center">
            <Hand className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Love Destiny Palm Reading</h1>
          <p className="text-purple-200 text-sm">
            Your destiny is written in the palm of your hand. Share a photo and let Madame Zola reveal the secrets of your heart line.
          </p>
        </div>

        <div 
            className="relative mb-6 border-2 border-dashed border-cyan-400/50 bg-black/20 rounded-3xl p-6 text-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
        >
            {imagePreview ? (
                <img src={imagePreview} alt="Palm preview" className="w-full h-40 object-cover rounded-xl"/>
            ) : (
                <div className="flex flex-col items-center justify-center h-40">
                    <Hand className="w-12 h-12 text-cyan-300 mb-4" />
                    <p className="text-white font-medium">Click to upload a photo</p>
                    <p className="text-cyan-200/70 text-xs mt-1">For best results, use a clear, well-lit image.</p>
                </div>
            )}
            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
            />
        </div>

        <div className="text-center mb-4">
          <p className="text-purple-300 text-xs">1 reading = 5 credits</p>
        </div>

        <Button
          onClick={handleReveal}
          disabled={!palmImage || isAnalyzing}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl disabled:bg-gray-600 disabled:opacity-50">
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Reading the lines of fate...</span>
            </div>
          ) : "Reveal My Love Destiny"}
        </Button>
      </div>

      <InsufficientCreditsPopup
        isOpen={showInsufficientCredits}
        onClose={() => setShowInsufficientCredits(false)}
        requiredAmount={5}
      />
    </div>
  );
}