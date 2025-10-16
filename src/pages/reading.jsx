
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Heart, Compass, Star, Moon, Upload } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard } from '@/api/entities';
import { DailyCardDraw } from '@/api/entities';
import { User } from '@/api/entities';
import { InvokeLLM } from '@/api/integrations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CompatibilityRevelation from '../components/compatibility/CompatibilityRevelation';
import { useMixpanel } from '../components/analytics/useMixpanel';
import AuralyLogo from "../components/common/AuralyLogo";

const ReadingCard = ({ title, description, cardPattern, readingId, onClick }) => {
  return (
    <div
      onClick={() => onClick(readingId)}
      className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cursor-pointer hover:border-purple-500/30 transition-all duration-300 cosmic-glow mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="ml-6">
          {cardPattern}
        </div>
      </div>
    </div>
  );
};

const SingleCard = () => (
  <div className="w-16 h-20 bg-indigo-800/50 border-2 border-indigo-400/30 rounded-lg flex items-center justify-center">
    <div className="text-indigo-300">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  </div>
);

const IconCard = ({ icon: Icon, color }) => (
  <div className={`w-16 h-20 bg-${color}-800/50 border-2 border-${color}-400/30 rounded-lg flex items-center justify-center`}>
    <Icon className={`w-8 h-8 text-${color}-300`} />
  </div>
);

// Daily Tarot Component
const DailyTarotReading = ({ onBack }) => {
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

  const CardBack = () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-900 rounded-2xl flex items-center justify-center p-4 border-2 border-purple-400/30">
      <div className="w-full h-full border-2 border-dashed border-purple-400/50 rounded-lg flex flex-col items-center justify-center space-y-4">
        <Star className="w-8 h-8 text-yellow-300" />
        <div className="flex space-x-4">
          <svg className="w-6 h-6 text-yellow-300/70" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L13.09 8.26L20 9L15 13.74L16.18 20.02L10 16.77L3.82 20.02L5 13.74L0 9L6.91 8.26L10 2Z" />
          </svg>
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="flex flex-col h-full"
    >
      <div className="relative flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-white hover:text-purple-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-light text-white">Daily Tarot</h1>
        <div className="w-6" />
      </div>

      <div className="text-center mb-8">
        <p className="text-purple-200 text-sm">
          Flip the card and discover what the universe has in store for you today
        </p>
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
    </motion.div>
  );
};

// Yes or No Component
const YesOrNoReading = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || isLoading) return;
    setIsLoading(true);
    setAnswer(null);
    setIsFlipped(false);

    await new Promise(resolve => setTimeout(resolve, 500));
    const possibleAnswers = ["Yes", "No"];
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

  const CardBack = () => (
    <div className="w-full h-full bg-gradient-to-br from-teal-800 to-cyan-900 rounded-2xl flex items-center justify-center p-4 border-2 border-cyan-400/30">
      <svg className="w-16 h-16 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9,9h0a3,3,0,0,1,6,0c0,2-3,3-3,3"></path>
        <path d="m12,17l0,0"></path>
      </svg>
    </div>
  );

  const CardFront = ({ answer }) => {
    const colors = {
      Yes: "from-green-500 to-emerald-700 border-emerald-300",
      No: "from-red-500 to-rose-700 border-rose-300",
    };
    return (
      <div className={`w-full h-full bg-gradient-to-br ${colors[answer]} rounded-2xl flex items-center justify-center p-4 border-2`}>
        <h2 className="text-6xl font-bold text-white">{answer}</h2>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="flex flex-col h-full"
    >
      <div className="relative flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white hover:text-purple-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
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
            <div className="text-center mb-4">
              <p className="text-white text-sm">
                Ask what you desire and see if the universe brings the answer as Yes or No
              </p>
            </div>
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
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ask Another Question
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Dream Reading Component - FIXED LLM CALL
const DreamReading = ({ onBack }) => {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!dreamText.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const response = await InvokeLLM({
        prompt: `Analyze this dream from a spiritual and psychological perspective: "${dreamText}".
        
        Provide insights about:
        1. Dream Symbols (list key symbols)
        2. Emotional Resonance (emotional meaning)  
        3. Dream Meaning (interpretation)
        4. Spiritual Guidance (advice)
        
        Keep it mystical but helpful. Write in English.`,
        response_json_schema: {
          type: "object",
          properties: {
            symbols: { 
              type: "array", 
              items: { type: "string" },
              description: "Key symbols from the dream"
            },
            emotions: { 
              type: "string",
              description: "Emotional interpretation"
            },
            meaning: { 
              type: "string",
              description: "Overall dream meaning"
            },
            guidance: { 
              type: "string",
              description: "Spiritual guidance and advice"
            }
          },
          required: ["symbols", "emotions", "meaning", "guidance"]
        }
      });

      console.log('Dream analysis response:', response);
      setAnalysis(response);
    } catch (error) {
      console.error('Error analyzing dream:', error);
      // Provide fallback analysis
      setAnalysis({
        symbols: ["Connection", "Journey", "Transformation", "Water", "Light"],
        emotions: "Your dream reflects deep emotional currents of introspection and growth.",
        meaning: "This dream suggests a period of significant personal development and an awakening of inner wisdom.",
        guidance: "Pay attention to the symbols that appeared – they are signposts guiding you on your spiritual path. Embrace change and trust your intuition."
      });
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setDreamText('');
    setAnalysis(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="flex flex-col h-full"
    >
      <div className="relative flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white hover:text-purple-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-light text-white">Dream Reading</h1>
        <div className="w-6" />
      </div>

      {!analysis ? (
        <div className="flex-grow flex flex-col space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🌙</div>
            <h2 className="text-xl font-semibold text-white">Share Your Dream</h2>
            <p className="text-purple-200">Describe your dream and receive spiritual insights</p>
          </div>

          <div className="flex-grow flex flex-col space-y-4">
            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="Describe your dream in as much detail as you remember..."
              className="flex-grow bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder:text-white/60 resize-none min-h-[200px]"
            />

            <Button
              onClick={handleAnalyze}
              disabled={!dreamText.trim() || isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing your dream...</span>
                </div>
              ) : (
                'Reveal Dream Insights'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow space-y-6"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow space-y-6">

            {/* Symbols */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-2">🔮</span>
                Dream Symbols
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.symbols?.map((symbol, idx) => (
                  <span key={idx} className="bg-purple-600/20 text-purple-200 px-3 py-1 rounded-full text-sm">
                    {symbol}
                  </span>
                ))}
              </div>
            </div>

            {/* Emotions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-2">💫</span>
                Emotional Resonance
              </h3>
              <p className="text-purple-200">{analysis.emotions}</p>
            </div>

            {/* Meaning */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                Dream Meaning
              </h3>
              <p className="text-white">{analysis.meaning}</p>
            </div>

            {/* Guidance */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-2">🌟</span>
                Spiritual Guidance
              </h3>
              <p className="text-purple-200 italic">"{analysis.guidance}"</p>
            </div>
          </div>

          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10"
          >
            Analyze Another Dream
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Cosmic Match Component - updated to take a single name and photo
const CosmicMatch = ({ onBack }) => {
  const [name, setName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const funDescriptions = [
    "You have incredible cosmic alignment 🌌💜",
    "Your souls vibrate at similar frequencies ✨",
    "A powerful spiritual connection awaits 🔮",
    "The stars have aligned for this beautiful match 🌟",
    "Your energies create perfect harmony together 💫",
    "A match written in the stars! 🌠",
    "Cosmic chemistry is off the charts! 🪐"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCheckMatch = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    setResult(null);

    // Simulate cosmic calculation
    await new Promise(resolve => setTimeout(resolve, 5000));

    const percentage = Math.floor(Math.random() * 51) + 50; // 50-100%
    const randomDescription = funDescriptions[Math.floor(Math.random() * funDescriptions.length)];

    setResult({
      percentage,
      description: randomDescription,
    });

    setIsLoading(false);
  };

  const handleReset = () => {
    setName('');
    setPhotoFile(null);
    setPreviewUrl(null);
    setResult(null);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-full items-center justify-center text-center"
      >
        <div className="text-6xl animate-pulse mb-6">🌌</div>
        <h2 className="text-xl font-semibold text-white">Calculating Cosmic Match...</h2>
        <p className="text-purple-200">The universe is aligning your energies</p>
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
      </motion.div>
    );
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col h-full items-center justify-center text-center"
      >
        <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 cosmic-glow w-full max-w-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            {previewUrl ? (
              <img src={previewUrl} alt={name || "profile"} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-2xl">{name.charAt(0).toUpperCase() || '👤'}</span>
            )}
          </div>
          <p className="text-white font-medium text-lg">{name}</p>

          <div className="text-center my-6">
            <div className="text-6xl font-bold text-white mb-2">{result.percentage}%</div>
            <p className="text-purple-200">Cosmic Compatibility</p>
          </div>

          <p className="text-lg text-white mb-6">{result.description}</p>

          <Button
            onClick={handleReset}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Try Another Match
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="flex flex-col h-full"
    >
      <div className="relative flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white hover:text-purple-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-light text-white">Cosmic Match</h1>
        <div className="w-6" />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
            <h2 className="text-xl font-semibold text-white">Discover your Cosmic Connection</h2>
            <p className="text-purple-200">Check your celestial compatibility with anyone!</p>
        </div>

        <div className="w-full max-w-sm space-y-6 bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
            <div className="text-center">
              <button onClick={handleUploadClick} className="w-24 h-24 bg-white/10 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors hover:bg-white/20">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Upload className="w-8 h-8 text-purple-300" />
                  )}
              </button>
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
              />
              <p className="text-purple-200 text-sm">Upload a photo of the person you want to match with</p>
            </div>

            <Input
                placeholder="Enter a name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-center text-lg h-12"
            />

            <Button
                onClick={handleCheckMatch}
                disabled={!name.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 h-12"
            >
                Check Match
            </Button>
        </div>
      </div>
    </motion.div>
  );
};


// Placeholder for other readings
const PlaceholderReading = ({ title, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    className="flex flex-col h-full"
  >
    <div className="relative flex items-center justify-between mb-8">
      <button onClick={onBack} className="text-white hover:text-purple-300">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-light text-white">{title}</h1>
      <div className="w-6" />
    </div>
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center">
        <p className="text-purple-200">This reading will be implemented soon!</p>
      </div>
    </div>
  </motion.div>
);

export default function ReadingPage() {
  const [currentReading, setCurrentReading] = useState(null);
  const { track } = useMixpanel();

  // Track page view when component mounts
  useEffect(() => {
    track('view_reading');
  }, [track]);

  const handleReadingClick = (readingId) => {
    setCurrentReading(readingId);
    // Track specific reading type
    track('reading_started', { reading_type: readingId });
  };

  const handleBack = () => {
    setCurrentReading(null);
  };

  const renderCurrentReading = () => {
    switch(currentReading) {
      case 'daily-tarot':
        return <DailyTarotReading onBack={handleBack} />;
      case 'yes-or-no':
        return <YesOrNoReading onBack={handleBack} />;
      case 'compatibility-revelation':
        return <CompatibilityRevelation onBack={handleBack} />;
      case 'cosmic-match':
        return <CosmicMatch onBack={handleBack} />;
      case 'dream-reading':
        return <DreamReading onBack={handleBack} />;
      default:
        return null;
    }
  };

  if (currentReading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)] px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto h-full">
          <AuralyLogo className="mb-8" />
          <AnimatePresence mode="wait">
            {renderCurrentReading()}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)]">
      <div className="px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          <AuralyLogo className="mb-4" />
          
          {/* Header Section */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-light text-white">Astral Readings</h1>
            <p className="text-purple-200 text-sm leading-relaxed">
              Personalized insights to illuminate your love, energy and destiny
            </p>
          </div>

          {/* Reading Cards */}
          <div className="space-y-4">
            <ReadingCard
              title="Daily Tarot"
              description="Know your today's card and what it brings to you"
              cardPattern={<SingleCard />}
              readingId="daily-tarot"
              onClick={handleReadingClick}
            />

            <ReadingCard
              title="Yes or No"
              description="Get a quick answer to your question"
              cardPattern={<SingleCard />}
              readingId="yes-or-no"
              onClick={handleReadingClick}
            />

            <ReadingCard
              title="Compatibility Revelation"
              description="Let Tarot take care of your love concerns"
              cardPattern={<IconCard icon={Heart} color="pink" />}
              readingId="compatibility-revelation"
              onClick={handleReadingClick}
            />

            <ReadingCard
              title="Cosmic Match"
              description="Find your celestial connection and cosmic alignment"
              cardPattern={<IconCard icon={Star} color="yellow" />}
              readingId="cosmic-match"
              onClick={handleReadingClick}
            />

            <ReadingCard
              title="Dream Reading"
              description="Unlock the mysteries hidden in your dreams"
              cardPattern={<IconCard icon={Moon} color="indigo" />}
              readingId="dream-reading"
              onClick={handleReadingClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
