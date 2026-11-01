import React, { useState } from 'react';
import { Sparkles, Wine, PartyPopper, Heart, Share2 } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { triggerChampagneSpray } from '../services/confetti';
import { Language, translations } from '../i18n/translations';

interface HeroCardProps {
  onReleaseBalloons: () => void;
  onScrollToCake: () => void;
  language: Language;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  onReleaseBalloons,
  onScrollToCake,
  language,
}) => {
  const [toastCount, setToastCount] = useState(1);
  const [hasPoppedChampagne, setHasPoppedChampagne] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const t = translations[language];

  const handlePopChampagne = () => {
    soundService.playChampagnePop();
    triggerChampagneSpray();
    setHasPoppedChampagne(true);
    setTimeout(() => setHasPoppedChampagne(false), 3000);
  };

  const handleRaiseToast = () => {
    soundService.playChime(1.4);
    setToastCount((c) => c + 1);
  };

  const handleShare = () => {
    soundService.playChime(1.1);
    if (navigator.share) {
      navigator.share({
        title: t.happyBirthdayHeading,
        text: t.happyBirthdaySubheading,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className={`relative w-full rounded-3xl glass-panel p-6 sm:p-10 lg:p-12 border border-[#FFD700]/30 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Subtle background luxury glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Celebrant Portrait in Grand Gold Bezel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* Outer golden halo */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#FFD700] via-[#FF2E93] to-[#FFA751] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-gold-pulse" />

            {/* Portrait Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0c0c22] border-2 border-[#FFD700]/60 w-64 sm:w-72 md:w-80 aspect-[9/14] shadow-2xl">
              <img
                src="/assets/aistudio/photo_2026-09-13_11-38-17_459237d0.jpg"
                alt="Birthday Celebrant Portrait"
                className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Card Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-300 drop-shadow">
                  {t.celebrantOfTheYear}
                </span>
                <p className="font-cinzel text-lg font-bold text-white tracking-wide drop-shadow-md">
                  {t.vipBirthdayStar}
                </p>
              </div>
            </div>
          </div>

          {/* Social Toast Counter Bar */}
          <div className="mt-5 flex items-center gap-4 text-xs text-white/70">
            <button
              onClick={handleRaiseToast}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white transition-all cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span>{t.raiseToast} ({toastCount})</span>
            </button>
            <span aria-hidden="true" className="text-white/30">·</span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{copiedLink ? t.copied : t.share}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Celebratory Headline, Subheading & Interactive Buttons */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Unboxed Metadata Header (Following Zero-Pill Rules) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400 uppercase tracking-widest mb-3">
            <span>{t.countdownBornDate}</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span>{language === 'km' ? 'ឈានចូលវ័យ ២១ ឆ្នាំ' : 'Turning 21 Milestone'}</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span>{t.specialOccasionKicker[1]}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance">
            {t.happyBirthdayHeading}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-6 max-w-xl">
            {t.happyBirthdaySubheading}
          </p>

          {/* Key Affirmations / Highlight Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/30 border border-white/10 mb-8 max-w-lg">
            <div className="text-left">
              <span className="block text-xs text-white/50 font-medium">{t.chapterLabel}</span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-amber-300">
                {language === 'km' ? 'ជំពូកទី ២១' : 'Chapter 21'}
              </span>
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <span className="block text-xs text-white/50 font-medium">{t.vibeLabel}</span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-[#FF2E93]">{t.vibeValue}</span>
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <span className="block text-xs text-white/50 font-medium">{t.energyLabel}</span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-amber-300">{t.energyValue}</span>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Pop Champagne */}
            <button
              onClick={handlePopChampagne}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#FFD700] via-[#FFA751] to-[#FF2E93] text-black shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Wine className="w-4 h-4 text-black" />
              <span>{hasPoppedChampagne ? t.cheersChampagne : t.popChampagne}</span>
            </button>

            {/* Release Balloons */}
            <button
              onClick={onReleaseBalloons}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span>{t.releaseBalloons}</span>
            </button>

            {/* Jump to Cake */}
            <button
              onClick={onScrollToCake}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.makeAWish}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
