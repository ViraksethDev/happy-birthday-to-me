import React from 'react';
import { Volume2, VolumeX, Sparkles, PartyPopper } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { triggerGrandCelebration } from '../services/confetti';
import { Language, translations } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onReplay: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  language,
  onLanguageChange,
}) => {
  const t = translations[language];

  const handleFireworks = () => {
    soundService.playCompletionFanfare();
    triggerGrandCelebration();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-gold-gradient whitespace-nowrap">
            {t.celebrationBrand}
          </span>
        </div>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/75">
          <a
            href="#hero"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navCelebrant}
          </a>
          <a
            href="#cake"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navCake}
          </a>
          <a
            href="#milestones"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navMilestones}
          </a>
          <a
            href="#gallery"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navGallery}
          </a>
          <a
            href="#intentions"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navIntentions}
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <LanguageToggle
            language={language}
            onLanguageChange={onLanguageChange}
            variant="navbar"
          />

          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            title={isMuted ? t.unmuteSound : t.muteSound}
            aria-label={isMuted ? t.unmuteSound : t.muteSound}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Fireworks */}
          <button
            onClick={handleFireworks}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF2E93] text-black shadow-md hover:shadow-amber-500/30 transform hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>{t.fireworks}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
