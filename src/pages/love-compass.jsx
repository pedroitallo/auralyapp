import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CompassRose = ({ rotation }) => (
  <div className="relative w-64 h-64 mx-auto">
    {/* Compass background */}
    <div className="absolute inset-0 rounded-full bg-black/20 border-4 border-purple-500/30"></div>
    <div className="absolute inset-2 rounded-full bg-slate-800/50"></div>
    
    {/* Directions */}
    {['Romance', 'Connection', 'Self-Love', 'Passion'].map((dir, i) => (
      <div 
        key={dir}
        className="absolute w-full h-full flex justify-center"
        style={{ transform: `rotate(${i * 90}deg)`}}
      >
        <span className="text-purple-300 text-xs font-bold -mt-1">{dir}</span>
      </div>
    ))}

    {/* Needle */}
    <div 
      className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
      style={{ transform: `rotate(${rotation}deg)`}}
    >
      <div className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-gradient-to-t from-pink-500 to-red-400 rounded-full -mt-24 -ml-0.5 shadow-lg shadow-red-500/50"></div>
      <div className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-slate-500 rounded-full mt-0 -ml-0.5"></div>
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -mt-2 -ml-2 border-2 border-slate-900"></div>
    </div>
  </div>
);

const questions = [
    "How are you feeling about love today?",
    "What quality do you most want to attract in a relationship right now?",
    "What is one thing you can do for yourself today to practice self-love?",
    "Where do you feel the most connection in your life at this moment?"
];

const answers = {
    0: ["Hopeful", "Content", "Unsure", "Searching"],
    1: ["Honesty", "Passion", "Stability", "Fun"],
    2: ["Meditate", "Treat myself", "Set a boundary", "Journal"],
    3: ["With a partner", "With friends", "With family", "With myself"]
};

const directionMap = {
    Hopeful: 45, Honesty: 0,
    Content: 135, Passion: 315,
    Unsure: 225, Stability: 90,
    Searching: 315, Fun: 45,
    Meditate: 180, 'Treat myself': 135,
    'Set a boundary': 225, Journal: 270,
    'With a partner': 0, 'With friends': 90,
    'With family': 180, 'With myself': 225
};


export default function LoveCompassPage() {
    const [step, setStep] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [stars, setStars] = useState(0);
    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [showInsight, setShowInsight] = useState(false);

    useEffect(() => {
        const savedStars = parseInt(localStorage.getItem('love_compass_stars') || '0', 10);
        setStars(savedStars);
        const savedDate = localStorage.getItem('love_compass_last_checkin');
        setLastCheckIn(savedDate);
    }, []);

    const handleAnswer = (answer) => {
        const today = new Date().toDateString();
        if (lastCheckIn === today) {
            alert("You've already done your check-in for today!");
            return;
        }

        const newRotation = (rotation + directionMap[answer]) % 360;
        setRotation(newRotation);
        
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const newStars = stars + 1;
            setStars(newStars);
            localStorage.setItem('love_compass_stars', newStars.toString());
            localStorage.setItem('love_compass_last_checkin', today);
            setLastCheckIn(today);
            setShowInsight(true);
        }
    };

    const isCheckedInToday = lastCheckIn === new Date().toDateString();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 px-4 pt-12 pb-8">
            <div className="max-w-md mx-auto">
                 <div className="relative flex items-center justify-between mb-8">
                    <Link to={createPageUrl('reading')} className="text-white hover:text-purple-300">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-light text-white flex items-center gap-2">
                        <Compass className="text-purple-300"/> Love Compass
                    </h1>
                    <div className="flex items-center gap-1 text-yellow-300">
                        <Star className="w-5 h-5"/>
                        <span className="font-bold">{stars}</span>
                    </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow text-center">
                    <CompassRose rotation={rotation} />

                    <div className="mt-8 min-h-[150px]">
                        {isCheckedInToday || showInsight ? (
                            <div className="animate-in fade-in space-y-3">
                                <h3 className="text-lg font-bold text-white">Your Compass is Set for Today!</h3>
                                <p className="text-purple-200">Your heart's energy is pointing towards connection and romance. Open yourself to new possibilities.</p>
                                <p className="text-sm text-yellow-300 flex items-center justify-center gap-2 mt-2">
                                    <Sparkles className="w-4 h-4" /> You've earned a love star! Come back tomorrow.
                                </p>
                            </div>
                        ) : (
                            <div className="animate-in fade-in space-y-4">
                                <h3 className="text-lg font-semibold text-white">{questions[step]}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {answers[step].map(answer => (
                                        <Button key={answer} onClick={() => handleAnswer(answer)} variant="outline" className="bg-white/5 border-white/20 text-purple-200 hover:bg-white/10">
                                            {answer}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}