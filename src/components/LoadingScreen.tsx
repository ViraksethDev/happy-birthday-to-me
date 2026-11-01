import React, { useState, useEffect, useRef } from 'react';
import { soundService } from '../services/soundEffects';
import { triggerGrandCelebration } from '../services/confetti';
import { Sparkles, PartyPopper, Music2, VolumeX } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface LoadingScreenProps {
  onComplete: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  isMuted,
  onToggleMute,
  language,
  onLanguageChange,
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const lastSoundTick = useRef<number>(-1);

  const t = translations[language];

  // Status message rotation every 1.5 seconds
  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % t.statusMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [hasStarted, t.statusMessages.length]);

  // Smooth progress increment from 0 to 100%
  useEffect(() => {
    if (!hasStarted) return;

    const totalDuration = 5200; // ~5.2 seconds for full immersive build-up
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, (elapsed / totalDuration) * 100);

      // Smooth custom ease-in-out curve
      const eased = Math.floor(rawProgress);
      setProgress(eased);

      // Play sound tick every 5%
      const tickStep = Math.floor(eased / 6);
      if (tickStep !== lastSoundTick.current && eased < 100) {
        lastSoundTick.current = tickStep;
        soundService.playProgressTick(eased);
      }

      if (rawProgress < 100) {
        requestAnimationFrame(frame);
      } else {
        // Reached 100%
        soundService.playCompletionFanfare();
        triggerGrandCelebration();
        setIsExploding(true);

        // Allow explosion animation to play before transitioning to main hero
        setTimeout(() => {
          onComplete();
        }, 950);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted, onComplete]);

  const handleLaunch = () => {
    soundService.init();
    soundService.playChime(1.2);
    setHasStarted(true);
  };

  // SVG circular geometry
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a] select-none ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Dynamic ambient particle cosmos */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2E93]/10 rounded-full blur-[140px]" />
      </div>

      {/* Floating starry dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/60 animate-pulse"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 27) % 100}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Top Bar for Language Toggle & Mute Switch */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        {/* Language Toggle Button */}
        <LanguageToggle
          language={language}
          onLanguageChange={onLanguageChange}
          variant="compact"
        />

        <button
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md"
          title={isMuted ? t.unmuteSound : t.muteSound}
          aria-label={isMuted ? t.unmuteSound : t.muteSound}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Music2 className="w-4 h-4 text-amber-400" />}
        </button>
      </div>

      {!hasStarted ? (
        /* Phase 1: Interactive Start Screen */
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.vipInvitation}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.newChapterBegins}
          </h1>

          <p className="text-white/70 text-sm sm:text-base font-light mb-10 max-w-md leading-relaxed">
            {t.loadingSubtitle}
          </p>

          <button
            onClick={handleLaunch}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-black bg-gradient-to-r from-[#FFD700] via-[#FFE259] to-[#FFA751] shadow-[0_0_40px_rgba(255,215,0,0.45)] hover:shadow-[0_0_60px_rgba(255,215,0,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PartyPopper className="w-5 h-5 text-black group-hover:rotate-12 transition-transform duration-300" />
            <span>{t.clickToLaunch}</span>
          </button>

          <span className="text-[11px] text-white/45 mt-4 tracking-wider max-w-xs">
            {t.audioNotice}
          </span>
        </div>
      ) : (
        /* Phase 1 & 2: Circular Progress Loader & Explosive Transition */
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ${
            isExploding ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Circular SVG Progress */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7B2" />
                  <stop offset="40%" stopColor="#FFD700" />
                  <stop offset="80%" stopColor="#FF2E93" />
                  <stop offset="100%" stopColor="#F39C12" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background ring track */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                className="stroke-white/10"
                strokeWidth="8"
                fill="none"
              />

              {/* Animated Progress Ring */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="url(#goldGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
                className="transition-[stroke-dashoffset] duration-150 ease-linear"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/80 mb-1">
                {t.preparing}
              </span>
              <span className="font-cinzel text-5xl sm:text-6xl font-bold tracking-tight text-white tabular-nums">
                {progress}
                <span className="text-3xl text-amber-400 font-light">%</span>
              </span>
              <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
            </div>
          </div>

          {/* Cycling Upbeat Status Captions */}
          <div className="mt-8 h-8 flex items-center justify-center px-4">
            <p className="text-white/80 text-sm sm:text-base font-medium tracking-wide animate-fade-in text-center">
              {t.statusMessages[statusIndex]}
            </p>
          </div>

          {/* Mini pulse bar */}
          <div className="mt-3 flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-1.5 rounded-full transition-all duration-300 ${
                  idx === statusIndex
                    ? 'w-6 bg-gradient-to-r from-[#FFD700] to-[#FF2E93]'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
