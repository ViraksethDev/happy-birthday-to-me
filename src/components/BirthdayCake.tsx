import React, { useState } from 'react';
import { soundService } from '../services/soundEffects';
import { triggerWishBurst } from '../services/confetti';
import { Sparkles, Wind, Flame, Check } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface BirthdayCakeProps {
  onWishCompleted?: () => void;
  language: Language;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onWishCompleted, language }) => {
  const [isLit, setIsLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showWishBanner, setShowWishBanner] = useState(false);
  const [smokeParticles, setSmokeParticles] = useState<Array<{ id: number; delay: number; x: number }>>([]);
  const [wishText, setWishText] = useState('');
  const [savedWish, setSavedWish] = useState<string | null>(null);

  const t = translations[language];

  const handleBlowCandle = () => {
    if (!isLit || isBlowing) return;

    setIsBlowing(true);
    soundService.playBlowCandle();

    // Generate smoke particles
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.08,
      x: (Math.random() - 0.5) * 30,
    }));
    setSmokeParticles(particles);

    setTimeout(() => {
      setIsLit(false);
      setIsBlowing(false);
      setShowWishBanner(true);
      soundService.playSparkle();
      triggerWishBurst();
      if (onWishCompleted) onWishCompleted();
    }, 400);
  };

  const handleRelight = () => {
    soundService.playChime(1.5);
    setIsLit(true);
    setShowWishBanner(false);
    setSmokeParticles([]);
  };

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setSavedWish(wishText.trim());
    soundService.playSparkle();
    setWishText('');
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-panel text-center max-w-xl mx-auto w-full border border-[#FFD700]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Ambient candle aura lighting when lit */}
      {isLit && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-[70px] pointer-events-none animate-pulse" />
      )}

      {/* Header kicker */}
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#FFD700]" />
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
          {t.cakeRitual}
        </span>
      </div>

      <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
        {t.makeSecretWish}
      </h3>

      <p className="text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
        {isLit ? t.cakeInstructionsLit : t.cakeInstructionsBlown}
      </p>

      {/* SVG 3D Multi-Tier Cake Canvas */}
      <div className="relative w-64 h-72 sm:w-76 sm:h-80 flex items-center justify-center my-2 select-none">
        <svg
          viewBox="0 0 320 360"
          className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]"
        >
          <defs>
            {/* Cake tier gradients */}
            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6D1C" />
            </linearGradient>

            <linearGradient id="tier1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#251a3b" />
              <stop offset="50%" stopColor="#1a122e" />
              <stop offset="100%" stopColor="#100b1e" />
            </linearGradient>

            <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#352454" />
              <stop offset="50%" stopColor="#25173d" />
              <stop offset="100%" stopColor="#170d28" />
            </linearGradient>

            <linearGradient id="tier3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#432c6b" />
              <stop offset="50%" stopColor="#301f4e" />
              <stop offset="100%" stopColor="#1e1134" />
            </linearGradient>

            <linearGradient id="goldFrosting" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFF2B2" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#FF416C" />
              <stop offset="35%" stopColor="#FF4B2B" />
              <stop offset="70%" stopColor="#FFA000" />
              <stop offset="100%" stopColor="#FFFDF0" />
            </linearGradient>

            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden Serving Pedestal Plate */}
          <ellipse cx="160" cy="335" rx="145" ry="20" fill="url(#plateGrad)" />
          <ellipse cx="160" cy="330" rx="135" ry="16" fill="#151221" />
          <ellipse cx="160" cy="328" rx="130" ry="14" fill="#0d0a17" opacity="0.8" />

          {/* TIER 1 (Bottom, Wide) */}
          <path
            d="M 45 250 C 45 235, 275 235, 275 250 L 275 315 C 275 330, 45 330, 45 315 Z"
            fill="url(#tier1Grad)"
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Tier 1 Frosting Top */}
          <ellipse cx="160" cy="250" rx="115" ry="20" fill="#2d1f47" stroke="#FFD700" strokeWidth="1" strokeOpacity="0.3" />
          {/* Gold Drips on Tier 1 */}
          <path
            d="M 45 250 
               Q 65 275, 80 254 
               Q 100 282, 120 252 
               Q 145 285, 160 253 
               Q 185 280, 205 252 
               Q 235 285, 250 252 
               Q 265 268, 275 250"
            fill="none"
            stroke="url(#goldFrosting)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* TIER 2 (Middle) */}
          <path
            d="M 75 185 C 75 172, 245 172, 245 185 L 245 242 C 245 255, 75 255, 75 242 Z"
            fill="url(#tier2Grad)"
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          {/* Tier 2 Frosting Top */}
          <ellipse cx="160" cy="185" rx="85" ry="16" fill="#3b275f" stroke="#FFD700" strokeWidth="1" strokeOpacity="0.4" />
          {/* Gold Pearls & Drip Tier 2 */}
          <path
            d="M 75 185 
               Q 95 210, 115 188 
               Q 135 215, 160 187 
               Q 185 212, 205 188 
               Q 225 210, 245 185"
            fill="none"
            stroke="url(#goldFrosting)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* TIER 3 (Top) */}
          <path
            d="M 105 125 C 105 114, 215 114, 215 125 L 215 178 C 215 189, 105 189, 105 178 Z"
            fill="url(#tier3Grad)"
            stroke="#FFD700"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          {/* Tier 3 Frosting Top */}
          <ellipse cx="160" cy="125" rx="55" ry="12" fill="#4d327c" stroke="#FFD700" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* Frosting Swirls on Top */}
          <ellipse cx="160" cy="124" rx="46" ry="9" fill="none" stroke="url(#goldFrosting)" strokeWidth="3" strokeDasharray="4 6" />

          {/* Golden Decorative Pearls */}
          {[120, 140, 160, 180, 200].map((x, i) => (
            <circle key={i} cx={x} cy="126" r="3" fill="#FFF2B2" stroke="#D4AF37" strokeWidth="0.8" />
          ))}

          {/* CANDLE */}
          {/* Candle Body with gold spiral stripe */}
          <rect x="156" y="80" width="8" height="42" rx="3" fill="#FFFFFF" />
          <path
            d="M 156 86 L 164 89 M 156 96 L 164 99 M 156 106 L 164 109 M 156 116 L 164 119"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Candle Wick */}
          <line x1="160" y1="80" x2="160" y2="70" stroke="#333333" strokeWidth="2" strokeLinecap="round" />

          {/* CANDLE FLAME (Interactive clickable) */}
          {isLit ? (
            <g
              onClick={handleBlowCandle}
              className="cursor-pointer group"
              style={{ transformOrigin: '160px 70px' }}
            >
              {/* Outer Glow Halo */}
              <circle cx="160" cy="55" r="28" fill="#FFA000" opacity="0.3" filter="url(#flameGlow)" />
              <circle cx="160" cy="55" r="16" fill="#FFF2B2" opacity="0.4" filter="url(#flameGlow)" />

              {/* Animated Main Flame */}
              <path
                d="M 160 30 C 172 45, 175 62, 160 70 C 145 62, 148 45, 160 30 Z"
                fill="url(#flameGrad)"
                filter="url(#flameGlow)"
                className="animate-flame"
              />

              {/* Inner Flame Core (Bright White/Cyan) */}
              <path
                d="M 160 46 C 165 54, 166 64, 160 68 C 154 64, 155 54, 160 46 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
            </g>
          ) : (
            /* Smoke when flame is blown out */
            <g>
              {smokeParticles.map((p) => (
                <circle
                  key={p.id}
                  cx={160 + p.x}
                  cy="65"
                  r="5"
                  fill="#E2E8F0"
                  className="animate-smoke"
                  style={{
                    animationDelay: `${p.delay}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
              <circle cx="160" cy="70" r="1.5" fill="#718096" />
            </g>
          )}
        </svg>

        {/* Click prompt overlay over flame if lit */}
        {isLit && (
          <div
            onClick={handleBlowCandle}
            className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-amber-400/40 text-[11px] font-medium text-amber-300 backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.tapFlameToBlow}</span>
          </div>
        )}
      </div>

      {/* Wish Banner Toast when blown */}
      {showWishBanner && (
        <div className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/25 via-[#FF2E93]/20 to-amber-500/25 border border-[#FFD700]/50 shadow-[0_0_30px_rgba(255,215,0,0.35)] animate-fade-in flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient">
              {t.wishMadeBanner}
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <p className="text-xs text-white/80 mt-1">
            {t.wishMadeSubtext}
          </p>
        </div>
      )}

      {/* Control Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
        {isLit ? (
          <button
            onClick={handleBlowCandle}
            disabled={isBlowing}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#FFD700] via-[#FFA751] to-[#FF2E93] text-black shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Wind className="w-4 h-4 text-black" />
            <span>{t.blowCandleButton}</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{t.lightCandleAgainButton}</span>
          </button>
        )}
      </div>

      {/* Quick Personal Wish Inscription */}
      <div className="mt-6 w-full pt-5 border-t border-white/10">
        {savedWish ? (
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-left">
            <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-1">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> {t.inscribedWishHeader}
              </span>
              <button
                onClick={() => setSavedWish(null)}
                className="text-[10px] text-white/60 hover:text-white underline cursor-pointer"
              >
                {t.editWish}
              </button>
            </div>
            <p className="text-sm italic text-white/90">"{savedWish}"</p>
          </div>
        ) : (
          <form onSubmit={handleSaveWish} className="flex gap-2">
            <input
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder={t.wishInputPlaceholder}
              className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60"
            />
            <button
              type="submit"
              disabled={!wishText.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {t.sealWish}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
