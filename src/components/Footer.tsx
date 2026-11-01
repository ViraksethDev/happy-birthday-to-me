import React from 'react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { Language, translations } from '../i18n/translations';

interface FooterProps {
  onReplayLoader: () => void;
  onReleaseBalloons: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onReplayLoader, onReleaseBalloons, language }) => {
  const t = translations[language];

  const handleReplay = () => {
    soundService.playChime(1.2);
    onReplayLoader();
  };

  return (
    <footer className={`w-full border-t border-white/10 mt-20 py-12 px-6 bg-black/40 ${language === 'km' ? 'font-khmer' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand / Note */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="font-cinzel text-base font-bold text-white tracking-wider">
              {t.footerTitle}
            </span>
          </div>
          <p className="text-xs text-white/50 max-w-sm leading-relaxed">
            {t.footerSubtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReleaseBalloons}
            className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {t.releaseBalloons}
          </button>

          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.replayIntro}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
        <span>{t.copyright}</span>
        <span className="flex items-center gap-1">
          {t.madeWithLove}
        </span>
      </div>
    </footer>
  );
};
