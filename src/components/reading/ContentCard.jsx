import React from 'react';
import { Clock } from 'lucide-react';

export default function ContentCard({ content, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900/50 border border-white/10 rounded-3xl p-5 cursor-pointer hover:border-purple-500/30 transition-all duration-300 cosmic-glow"
    >
      <div className="flex space-x-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-purple-400 font-semibold uppercase tracking-wide">{content.category}</span>
            <span className="text-gray-500">•</span>
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{content.readTime}</span>
            </div>
          </div>
          <h3 className="text-white font-bold text-xl leading-tight">{content.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {content.description}
          </p>
        </div>
        <div className="w-20 h-20 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-2xl flex items-center justify-center">
            <img
              src={content.image}
              alt={content.title}
              className="w-16 h-16 object-cover rounded-xl opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}