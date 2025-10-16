import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { TarotCard } from '@/api/entities';

const CardBack = () => (
  <div className="w-full h-full bg-gradient-to-br from-teal-800 to-cyan-900 rounded-2xl flex items-center justify-center p-4 border-2 border-cyan-400/30">
    <HelpCircle className="w-16 h-16 text-cyan-200" />
  </div>
);

const CardFront = ({ answer }) => {
  const colors = {
    Yes: "from-green-500 to-emerald-700 border-emerald-300",
    No: "from-red-500 to-rose-700 border-rose-300",
    Maybe: "from-yellow-500 to-amber-700 border-amber-300",
  };
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[answer]} rounded-2xl flex items-center justify-center p-4 border-2`}>
      <h2 className="text-6xl font-bold text-white text-shadow-lg">{answer}</h2>
    </div>
  );
};

export default function YesOrNoPage() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim() || isLoading) return;
        setIsLoading(true);
        setAnswer(null);
        setIsFlipped(false);

        // Simulate thinking and card drawing
        await new Promise(resolve => setTimeout(resolve, 500));

        const possibleAnswers = ["Yes", "No", "Maybe"];
        const randomAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
        setAnswer(randomAnswer);
        
        setTimeout(() => {
          setIsFlipped(true);
          setIsLoading(false);
        }, 300);
    };

    const handleReset = () => {
        setQuestion('');
        setAnswer(null);
        setIsFlipped(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 px-4 pt-12 pb-8 flex flex-col">
            <div className="max-w-md mx-auto w-full flex-grow flex flex-col">
                <div className="relative flex items-center justify-between mb-8">
                    <Link to={createPageUrl('reading')} className="text-white hover:text-purple-300">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-light text-white">Yes or No</h1>
                    <div className="w-6" />
                </div>

                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                    <motion.div 
                        className="w-56 h-80"
                        style={{ perspective: 1000 }}
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
                                {answer && <CardFront answer={answer} />}
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    {!answer ? (
                        <div className="w-full space-y-4 animate-in fade-in">
                            <Input
                                placeholder="Ask your question..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-center"
                            />
                            <Button onClick={handleAsk} disabled={!question.trim() || isLoading} className="w-full bg-cyan-600 hover:bg-cyan-700">
                                {isLoading ? "Consulting the cards..." : "Get Answer"}
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center w-full space-y-4 animate-in fade-in">
                             <p className="text-purple-200 italic h-6">"{question}"</p>
                            <Button onClick={handleReset} variant="outline" className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10">
                                <RefreshCw className="w-4 h-4 mr-2"/>
                                Ask Another Question
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}