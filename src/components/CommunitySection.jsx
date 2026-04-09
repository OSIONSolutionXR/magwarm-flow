import React, { useState, useMemo } from 'react';
import { Users, Heart, MessageCircle, ChevronRight, X } from 'lucide-react';
import { COMMUNITY_STORIES } from '../data/communityStories';

export default function CommunitySection({ currentWeek }) {
  const [showAll, setShowAll] = useState(false);
  const [likedStories, setLikedStories] = useState(() => {
    const saved = localStorage.getItem('magwarm_liked_stories');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter stories for current phase (±2 weeks)
  const relevantStories = useMemo(() => {
    return COMMUNITY_STORIES.filter(story => {
      const weekDiff = Math.abs(story.phaseWeek - currentWeek);
      return weekDiff <= 3; // Show stories from nearby phases
    }).slice(0, 3); // Show max 3
  }, [currentWeek]);

  // If no relevant stories, show random ones
  const storiesToShow = relevantStories.length > 0 
    ? relevantStories 
    : COMMUNITY_STORIES.slice(0, 2);

  const handleLike = (storyId) => {
    const newLiked = likedStories.includes(storyId)
      ? likedStories.filter(id => id !== storyId)
      : [...likedStories, storyId];
    setLikedStories(newLiked);
    localStorage.setItem('magwarm_liked_stories', JSON.stringify(newLiked));
  };

  if (showAll) {
    return <CommunityModal onClose={() => setShowAll(false)} likedStories={likedStories} onLike={handleLike} />;
  }

  return (
    <div className="mt-8 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-rose-100 dark:border-rose-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-800 flex items-center justify-center">
          <Users className="w-5 h-5 text-rose-600 dark:text-rose-300" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Erfahrungen anderer Eltern</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Du bist nicht allein</p>
        </div>
      </div>

      <div className="space-y-4">
        {storiesToShow.map(story => (
          <StoryCard 
            key={story.id} 
            story={story} 
            isLiked={likedStories.includes(story.id)}
            onLike={() => handleLike(story.id)}
            compact
          />
        ))}
      </div>

      <button
        onClick={() => setShowAll(true)}
        className="mt-4 w-full py-3 px-4 bg-white dark:bg-gray-800 rounded-xl border border-rose-200 dark:border-rose-700 text-rose-600 dark:text-rose-300 font-medium hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors flex items-center justify-center gap-2"
      >
        Alle Berichte lesen
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StoryCard({ story, isLiked, onLike, compact = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const content = isExpanded || story.content.length < 150 
    ? story.content 
    : story.content.slice(0, 150) + '...';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {story.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
            {story.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{story.author}</p>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 leading-relaxed">
        {content}
      </p>
      
      {story.content.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-rose-600 dark:text-rose-400 text-xs font-medium mt-2 hover:underline"
        >
          {isExpanded ? 'Weniger anzeigen' : 'Mehr lesen'}
        </button>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-wrap gap-1">
          {story.tags.slice(0, 2).map(tag => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button
          onClick={onLike}
          className={`flex items-center gap-1 text-xs transition-colors ${
            isLiked 
              ? 'text-rose-600 dark:text-rose-400' 
              : 'text-gray-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{story.likes + (isLiked ? 1 : 0)}</span>
        </button>
      </div>
    </div>
  );
}

function CommunityModal({ onClose, likedStories, onLike }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredStories = useMemo(() => {
    let stories = [...COMMUNITY_STORIES];
    
    if (filter !== 'all') {
      stories = stories.filter(s => s.phaseWeek >= parseInt(filter) && s.phaseWeek < parseInt(filter) + 20);
    }
    
    if (search) {
      stories = stories.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.content.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    return stories;
  }, [filter, search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-800 flex items-center justify-center">
                <Users className="w-5 h-5 text-rose-600 dark:text-rose-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Community</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Erfahrungsberichte von Eltern wie dir</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Suchen nach Themen, Tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { value: 'all', label: 'Alle' },
              { value: '5', label: 'Erste Wochen' },
              { value: '26', label: 'Fremdeln' },
              { value: '55', label: 'Autonomie' },
              { value: '91', label: 'Trotzphase' },
              { value: '141', label: 'Warum-Phase' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === opt.value
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              isLiked={likedStories.includes(story.id)}
              onLike={() => onLike(story.id)}
            />
          ))}
          
          {filteredStories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-8 mx-auto mb-2 opacity-50" />
              <p>Keine Berichte gefunden</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
