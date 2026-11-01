import React, { useState } from 'react';
import { Compass, Sparkles, Trophy, Heart, Target } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { Language, translations } from '../i18n/translations';

interface MilestonesSectionProps {
  language: Language;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  resilience: <Trophy className="w-5 h-5 text-amber-400" />,
  ambition: <Target className="w-5 h-5 text-[#FF2E93]" />,
  gratitude: <Heart className="w-5 h-5 text-rose-400" />,
  exploration: <Compass className="w-5 h-5 text-cyan-400" />,
};

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({ language }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const t = translations[language];

  const handleCardClick = (id: string) => {
    soundService.playChime(activeCard === id ? 1.0 : 1.3);
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section id="milestones" className={`w-full my-16 max-w-6xl mx-auto px-4 ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Editorial Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.milestonesKicker}</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-3">
          {t.milestonesTitle}
        </h2>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {t.milestonesSubtitle}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.milestonesList.map((item) => {
          const isSelected = activeCard === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`p-6 rounded-2xl glass-panel transition-all duration-300 cursor-pointer text-left flex flex-col justify-between border ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_30px_rgba(255,215,0,0.25)] scale-[1.02]'
                  : 'border-white/10 hover:border-amber-400/40 hover:bg-white/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {ICONS_MAP[item.id] || <Sparkles className="w-5 h-5 text-amber-400" />}
                  </div>
                  <span className="text-[11px] font-medium text-amber-300/80 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-200/90 font-medium mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                <span>{isSelected ? t.activated : t.tapToReflect}</span>
                <span className="text-amber-400">✦</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
