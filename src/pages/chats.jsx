import React, { useState, useEffect } from "react";
import { MessageCircle, Star, Filter, Search, Sparkles, Coins, Plus, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyChatsList from "../components/chats/MyChatsList";
import AreasOfLifeTab from "../components/chats/AreasOfLifeTab";

export default function ChatsPage() {
  const [userCoins, setUserCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserCoins();
    
    // Recarregar coins quando voltar para a página
    const handleFocus = () => {
      loadUserCoins();
    };
    
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadUserCoins, 30000); // Check every 30 seconds
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const loadUserCoins = async () => {
    try {
      const currentUser = await User.me();
      const currentCoins = currentUser.coins || 4;
      console.log(`[COIN DEBUG] Chats page - Current coins: ${currentCoins}`);
      setUserCoins(currentCoins);
    } catch (error) {
      console.error("Error loading user coins:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("home")}>
              <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-6 h-6 text-purple-300" />
                <h1 className="text-2xl font-light text-white">Spiritual Advisors</h1>
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <p className="text-purple-200 text-sm mt-1">
                Connect with expert spiritual guides
              </p>
            </div>
            <div className="w-10 h-10" /> {/* Spacer for centering title */}
          </div>

          {/* Coins Header */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cosmic-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {isLoading ? "..." : userCoins} Credits
                  </p>
                  <p className="text-purple-200 text-xs">
                    1 message = 2 credits
                  </p>
                </div>
              </div>
              <Link to={createPageUrl("coins")}>
                <Button
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white">

                  <Plus className="w-4 h-4 mr-1" />
                  Buy
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="mychats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/60 p-1 rounded-xl border border-white/10">
            <TabsTrigger value="mychats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 text-purple-200 text-sm">
              My Chats
            </TabsTrigger>
            <TabsTrigger value="areas" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 text-purple-200 text-sm">
              Areas of Life
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mychats" className="mt-6">
            <MyChatsList />
          </TabsContent>

          <TabsContent value="areas" className="mt-6">
            <AreasOfLifeTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}