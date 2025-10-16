import React from 'react';
import { ArrowLeft, Share, Bookmark } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function ContentDetail({ content }) {
  const handleBack = () => {
    window.history.pushState({}, '', createPageUrl('reading'));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)]">
      <div className="px-4 pt-8 pb-8">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-white hover:bg-gray-700/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-medium text-white">{content.title}</h1>
              <p className="text-purple-400 text-sm">{content.category} • {content.readTime}</p>
            </div>
            <div className="w-10 h-10"></div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white leading-tight">
            {content.title}
          </h2>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {content.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-purple-300 mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6">
            <Button
              variant="ghost"
              size="lg"
              className="flex-1 bg-gray-800/50 text-white hover:bg-gray-700/50 rounded-2xl"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="flex-1 bg-gray-800/50 text-white hover:bg-gray-700/50 rounded-2xl"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}