import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { TarotCard } from '@/api/entities';
import { DailyCardDraw } from '@/api/entities';
import { User } from '@/api/entities';
import { motion, AnimatePresence } from 'framer-motion';

const CardBack = () => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-900 rounded-2xl flex items-center justify-center p-4 border-2 border-purple-400/30">
    <div className="w-full h-full border-2 border-dashed border-purple-400/50 rounded-lg flex flex-col items-center justify-center space-y-4">
      <Star className="w-8 h-8 text-yellow-300" />
      <div className="flex space-x-4">
        <Sun className="w-6 h-6 text-yellow-300/70" />
        <Moon className="w-6 h-6 text-yellow-300/70" />
      </div>
    </div>
  </div>
);

const CardFront = ({ card }) => (
  <div className="w-full h-full bg-slate-800 rounded-2xl p-4 border-2 border-purple-300/50 flex flex-col justify-between">
    <div className="text-center">
        <h3 className="text-xl font-bold text-white">{card.name}</h3>
        <p className="text-xs text-purple-300">{card.keywords.join(', ')}</p>
    </div>
    <div className="w-full h-48 my-4 rounded-lg bg-black/20 flex items-center justify-center">
        <img src={card.image_url} alt={card.name} className="w-full h-full object-contain" />
    </div>
    <p className="text-sm text-center text-purple-200 leading-tight">{card.selected_interpretation}</p>
  </div>
);


export default function DailyTarotPage() {
    const [drawnCard, setDrawnCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasDrawnToday, setHasDrawnToday] = useState(false);

    useEffect(() => {
        const checkTodaysDraw = async () => {
            try {
                const user = await User.me();
                const today = new Date().toISOString().split('T')[0];
                const draws = await DailyCardDraw.filter({
                    created_by: user.email,
                    draw_date: today,
                }, '-created_date', 1);

                if (draws.length > 0) {
                    const card = await TarotCard.get(draws[0].card_id);
                    setDrawnCard({ ...card, ...draws[0] });
                    setIsFlipped(true);
                    setHasDrawnToday(true);
                }
            } catch (error) {
                console.error("Error checking today's draw:", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkTodaysDraw();
    }, []);

    const handleDrawCard = async () => {
        if (hasDrawnToday) return;
        setIsLoading(true);
        try {
            const allCards = await TarotCard.list();
            const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
            
            const selectedTip = randomCard.daily_tips[Math.floor(Math.random() * randomCard.daily_tips.length)];
            const selectedInterpretation = randomCard.interpretations[Math.floor(Math.random() * randomCard.interpretations.length)];
            const today = new Date().toISOString().split('T')[0];

            const newDraw = await DailyCardDraw.create({
                card_id: randomCard.id,
                card_name: randomCard.name,
                selected_tip: selectedTip,
                selected_interpretation: selectedInterpretation,
                draw_date: today,
            });

            setDrawnCard({ ...randomCard, ...newDraw });
            setHasDrawnToday(true);
            setTimeout(() => setIsFlipped(true), 100);

        } catch (error) {
            console.error("Error drawing card:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 px-4 pt-12 pb-8 flex flex-col">
            <div className="max-w-md mx-auto w-full flex-grow flex flex-col">
                <div className="relative flex items-center justify-between mb-8">
                    <Link to={createPageUrl('reading')} className="text-white hover:text-purple-300">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-light text-white">Daily Tarot</h1>
                    <div className="w-6" />
                </div>

                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                    <motion.div 
                        className="w-64 h-96 cursor-pointer"
                        style={{ perspective: 1000 }}
                        onClick={!drawnCard ? handleDrawCard : undefined}
                    >
                        <motion.div
                            className="relative w-full h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                                <CardBack />
                            </div>
                            <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                {drawnCard && <CardFront card={drawnCard} />}
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <AnimatePresence>
                    {!drawnCard && !isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Button onClick={handleDrawCard} className="bg-purple-600 hover:bg-purple-700">
                                Draw Today's Card
                            </Button>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    <AnimatePresence>
                    {drawnCard && isFlipped && (
                         <motion.div 
                            className="text-center space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                         >
                            <h3 className="text-lg font-semibold text-white">Today's Tip:</h3>
                            <p className="text-purple-200 italic">"{drawnCard.selected_tip}"</p>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}