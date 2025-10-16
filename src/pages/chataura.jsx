import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowLeft, PhoneOff, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHistory } from "@/api/entities";
import { User } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";

export default function ChatAuraPage() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const madameAura = {
    id: 999,
    name: "Madame Aura",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png",
    specialty: "Love & Soulmate Expert"
  };

  const handleStartChat = () => {
    setShowWelcomePopup(false);
    // Add welcome message from Madame Aura with typing effect
    setIsTyping(true);
    setTimeout(() => {
      const welcomeMessage = {
        role: "assistant",
        content: "Welcome, beautiful soul! I'm Madame Aura, and I've been waiting to connect with you. Your energy tells me you're seeking guidance about love and soulmate connections. What's weighing on your heart today? 💜",
        created_at: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      setIsTyping(false);
    }, Math.random() * 5000 + 5000); // 5-10 seconds delay
  };

  const handleEndChat = () => {
    navigate(createPageUrl('home'));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isTyping) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const prompt = `You are Madame Aura, an expert spiritual advisor specializing in love, soulmates, and twin flame connections. You have 15 years of experience and are known for your warmth, wisdom, and accuracy. 

      User's message: "${inputMessage}"

      Respond as Madame Aura with:
      - Warm, caring tone
      - Spiritual insights about love and relationships
      - Practical guidance when appropriate
      - Use terms like "beautiful soul", "divine connection", etc.
      - Keep responses focused but meaningful (2-4 sentences)
      
      Remember: You're here to help them on their soulmate journey.`;

      const result = await InvokeLLM({ prompt });
      const responseContent = typeof result === 'string' ? result : result?.response || 'I sense strong energy around you, but the connection is unclear right now. Could you share more about what your heart is feeling?';

      // Simulate typing delay of 5-10 seconds
      const typingDelay = Math.random() * 5000 + 5000;
      setTimeout(() => {
        const assistantMessage = {
          role: "assistant",
          content: responseContent,
          created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, typingDelay);

    } catch (error) {
      console.error("Error getting response:", error);
      
      // Even on error, simulate the typing delay
      const typingDelay = Math.random() * 5000 + 5000;
      setTimeout(() => {
        const errorMessage = {
          role: "assistant",
          content: "The spiritual connection seems disrupted at the moment, beautiful soul. Please try sharing your thoughts again.",
          created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, typingDelay);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800">
      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center max-w-sm w-full cosmic-glow"
            >
              <div className="relative flex-shrink-0 mb-4">
                <img src={madameAura.avatar} alt="Madame Aura" className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 mx-auto"/>
                <div className="absolute top-0 right-[calc(50%-48px)] w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-purple-200 mb-4">
                It's your turn in line to ask advice from Madame Aura.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Warning: Clicking "End Chat" will let the next person take your turn.
                </p>
              </div>
              <Button onClick={handleStartChat} className="w-full bg-purple-600 hover:bg-purple-700">
                Start
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      {!showWelcomePopup && (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-gray-900/90 backdrop-blur-lg border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={madameAura.avatar} alt="Madame Aura" className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"/>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">{madameAura.name}</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-sm text-purple-200">4.9 • Online</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  onClick={handleEndChat}
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
                <span className="text-red-300 text-xs mt-1">End Chat</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800/80 text-purple-100 border border-white/10'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 border border-white/10 rounded-2xl px-4 py-2 max-w-xs">
                  <p className="text-purple-200 text-sm italic animate-pulse">Madame Aura is typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-gray-900/90 backdrop-blur-lg border-t border-white/10 p-4">
            <div className="flex space-x-3">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's in your heart..."
                disabled={isTyping}
                className="flex-1 bg-gray-800/50 border-white/10 text-white placeholder-purple-300 rounded-xl resize-none"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || isTyping}
                size="icon"
                className="bg-purple-600 hover:bg-purple-700 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}