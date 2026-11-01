import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Calendar, PartyPopper, Award } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { soundService } from '../services/soundEffects';

interface BirthdayCountdownProps {
  language: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  turningAge: number;
  currentAge: number;
  targetDateFormatted: string;
}

export const BirthdayCountdown: React.FC<BirthdayCountdownProps> = ({ language }) => {
  const t = translations[language];

  // Celebrant's actual birth date: 11 January 2006
  const birthYear = 2006;
  const [birthMonth, setBirthMonth] = useState<number>(0); // 0 = January
  const [birthDay, setBirthDay] = useState<number>(11); // 11th
  const [showConfig, setShowConfig] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    turningAge: 21,
    currentAge: 20,
    targetDateFormatted: '11 January 2027',
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Check if today matches the birth month and day
      const isToday = now.getMonth() === birthMonth && now.getDate() === birthDay;

      // Determine next birthday target
      let targetYear = currentYear;
      let targetDate = new Date(targetYear, birthMonth, birthDay, 0, 0, 0, 0);

      if (now > targetDate && !isToday) {
        // Birthday already occurred this year, target next year
        targetYear = currentYear + 1;
        targetDate = new Date(targetYear, birthMonth, birthDay, 0, 0, 0, 0);
      } else if (isToday) {
        targetYear = currentYear + 1;
      }

      const turningAge = targetYear - birthYear;
      const currentAge = turningAge - 1;

      const diff = targetDate.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diff / 1000));

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const targetDateFormatted = `${birthDay} January ${targetYear}`;

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isToday,
        turningAge,
        currentAge,
        targetDateFormatted,
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [birthMonth, birthDay]);

  const handleSaveDate = (month: number, day: number) => {
    setBirthMonth(month);
    setBirthDay(day);
    soundService.playChime(1.3);
    setShowConfig(false);
  };

  const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const MONTHS_KM = [
    'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ',
  ];

  const currentMonthName = language === 'km' ? MONTHS_KM[birthMonth] : MONTHS_EN[birthMonth];

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none ${language === 'km' ? 'font-khmer' : ''}`}>
      <div className="relative rounded-2xl glass-panel p-4 sm:p-6 border border-amber-400/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle ambient luxury backdrops */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-400/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-[#FF2E93]/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Title & Milestone Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-400/20 via-[#FF2E93]/20 to-amber-500/10 border border-amber-400/40 text-amber-300 shrink-0 shadow-lg">
              {timeRemaining.isToday ? (
                <PartyPopper className="w-7 h-7 text-amber-300 animate-bounce" />
              ) : (
                <Award className="w-7 h-7 text-amber-300 animate-pulse" />
              )}
            </div>

            <div>
              {/* Top Unboxed Metadata */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold uppercase tracking-widest text-amber-300 mb-1.5">
                <span className="flex items-center gap-1 text-gold-gradient font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {t.countdownBornDate}
                </span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="text-white/80">
                  {language === 'km'
                    ? `គោលដៅ៖ ${birthDay} ${currentMonthName}`
                    : `Target: ${birthDay} ${currentMonthName}`}
                </span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="text-amber-400/70 hover:text-amber-300 underline cursor-pointer text-[10px]"
                >
                  {t.countdownChangeDate}
                </button>
              </div>

              {/* Main Heading with 21st Milestone */}
              <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                {timeRemaining.isToday
                  ? t.countdownTodayIsTheDay
                  : `${t.countdownTitle}: ${language === 'km' ? `ឈានចូលវ័យ ${timeRemaining.turningAge} ឆ្នាំ 🌟` : `Turning ${timeRemaining.turningAge} 🌟`}`}
              </h2>

              {/* Milestone Subtext */}
              <p className="text-xs text-white/70 mt-1 max-w-lg">
                {language === 'km'
                  ? `រាប់ថយក្រោយដល់ថ្ងៃ ១១ ខែមករា · ដំណើរឆ្ពោះទៅកាន់វ័យ ២១ ឆ្នាំ ដ៏រុងរឿង និងជោគជ័យ!`
                  : `Counting down to 11 January · Journey to the Grand 21st Birthday Milestone!`}
              </p>
            </div>
          </div>

          {/* Right: The 4 Styled Countdown Tiles */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0">
            {/* DAYS */}
            <div className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 py-2.5 sm:py-3 rounded-xl bg-black/40 border border-white/10 shadow-inner group hover:border-amber-400/40 transition-colors">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold-gradient tabular-nums">
                {String(timeRemaining.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/60 mt-0.5">
                {t.countdownDays}
              </span>
            </div>

            <span className="font-cinzel text-xl sm:text-2xl text-amber-400/60 font-bold -mt-4">:</span>

            {/* HOURS */}
            <div className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 py-2.5 sm:py-3 rounded-xl bg-black/40 border border-white/10 shadow-inner group hover:border-amber-400/40 transition-colors">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {String(timeRemaining.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/60 mt-0.5">
                {t.countdownHours}
              </span>
            </div>

            <span className="font-cinzel text-xl sm:text-2xl text-amber-400/60 font-bold -mt-4">:</span>

            {/* MINUTES */}
            <div className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 py-2.5 sm:py-3 rounded-xl bg-black/40 border border-white/10 shadow-inner group hover:border-amber-400/40 transition-colors">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/60 mt-0.5">
                {t.countdownMinutes}
              </span>
            </div>

            <span className="font-cinzel text-xl sm:text-2xl text-amber-400/60 font-bold -mt-4">:</span>

            {/* SECONDS */}
            <div className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 py-2.5 sm:py-3 rounded-xl bg-black/40 border border-[#FF2E93]/30 shadow-inner group hover:border-[#FF2E93] transition-colors">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FF2E93] tabular-nums animate-pulse">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/60 mt-0.5">
                {t.countdownSeconds}
              </span>
            </div>
          </div>
        </div>

        {/* Date Selector Drawer */}
        {showConfig && (
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
            <span className="text-white/70">
              {t.countdownChangeDate}:
            </span>
            <div className="flex items-center gap-2">
              <select
                value={birthMonth}
                onChange={(e) => handleSaveDate(parseInt(e.target.value, 10), birthDay)}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                {MONTHS_EN.map((m, idx) => (
                  <option key={m} value={idx}>
                    {language === 'km' ? MONTHS_KM[idx] : m}
                  </option>
                ))}
              </select>

              <select
                value={birthDay}
                onChange={(e) => handleSaveDate(birthMonth, parseInt(e.target.value, 10))}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowConfig(false)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium transition-colors cursor-pointer"
              >
                ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
