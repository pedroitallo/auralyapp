import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Moon, Star, Flame, Lock, Key, Compass } from 'lucide-react';

const insights = [
  {
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    title: 'Soul Recognition',
    text: 'Your soulmate will feel like home the moment you meet them. There will be no need to pretend or hide who you truly are.'
  },
  {
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    title: 'Divine Timing',
    text: 'The universe is aligning circumstances right now to bring you closer to your destined love. Trust the timing.'
  },
  {
    icon: Moon,
    color: 'from-blue-500 to-cyan-600',
    title: 'Emotional Mirror',
    text: 'Your soulmate will reflect back to you the love you deserve. They will see your light even when you cannot.'
  },
  {
    icon: Star,
    color: 'from-yellow-500 to-orange-600',
    title: 'Cosmic Connection',
    text: 'Before you meet in this life, your souls have already recognized each other across time and space.'
  },
  {
    icon: Flame,
    color: 'from-red-500 to-pink-600',
    title: 'Sacred Chemistry',
    text: 'True love ignites not just passion, but purpose. Your connection will inspire both of you to become your highest selves.'
  },
  {
    icon: Lock,
    color: 'from-rose-500 to-pink-600',
    title: 'Perfect Match',
    text: 'Your soulmate will complement your energy perfectly - challenging you to grow while accepting you completely.'
  },
  {
    icon: Compass,
    color: 'from-cyan-500 to-blue-600',
    title: 'Guided Path',
    text: 'Every past relationship has been preparing you for this destined love. Nothing was wasted, everything was guidance.'
  },
  {
    icon: Sparkles,
    color: 'from-violet-500 to-purple-600',
    title: 'Magnetic Pull',
    text: 'The connection will feel effortless yet electric. Like two magnets that were always meant to find each other.'
  },
  {
    icon: Heart,
    color: 'from-amber-500 to-yellow-600',
    title: 'Unconditional Love',
    text: 'Your soulmate will love not just your light, but your shadows too. They will see wholeness where you see flaws.'
  }
];

const InsightCard = ({ insight, index }) => {
  const Icon = insight.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900/60 border border-purple-500/20 rounded-2xl p-4 hover:border-purple-500/40 transition-all duration-300 cosmic-glow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${insight.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm mb-1">{insight.title}</h3>
          <p className="text-purple-200 text-xs leading-relaxed">{insight.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function LoveInsightTab() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Deep Love Insights</h2>
        <p className="text-purple-200 text-sm">Divine wisdom about your soulmate journey.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} index={index} />
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 text-center space-y-3 mt-8">
        <Sparkles className="w-8 h-8 text-yellow-300 mx-auto" />
        <h3 className="text-xl font-semibold text-white">Your Love is Written in the Stars</h3>
        <p className="text-purple-200 text-sm leading-relaxed">
          Each insight above is a piece of your soul's love story. Trust that your soulmate is on their way to you, guided by the same cosmic forces that have brought you here.
        </p>
      </div>
    </div>
  );
}