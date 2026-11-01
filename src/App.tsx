import { useState, useRef, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroCard } from './components/HeroCard';
import { BirthdayCountdown } from './components/BirthdayCountdown';
import { BirthdayCake } from './components/BirthdayCake';
import { BalloonsOverlay } from './components/BalloonsOverlay';
import { MilestonesSection } from './components/MilestonesSection';
import { PhotoMemoryGallery } from './components/PhotoMemoryGallery';
import { CelebrationWishes } from './components/CelebrationWishes';
import { Footer } from './components/Footer';
import { soundService } from './services/soundEffects';
import { Language } from './i18n/translations';

export default function App() {
  const [isLoadingPhase, setIsLoadingPhase] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [balloonTrigger, setBalloonTrigger] = useState(0);
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('celebration_lang') as Language;
      return saved === 'km' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const cakeSectionRef = useRef<HTMLDivElement>(null);

  // Sync HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('celebration_lang', language);
    } catch {
      // Ignore storage errors in sandbox
    }
  }, [language]);

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
  };

  // Switch Language
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  // Called when loader reaches 100% and finishes explosion
  const handleLoaderComplete = () => {
    setIsLoadingPhase(false);
    // Auto-spawn initial celebratory balloons
    setBalloonTrigger((prev) => prev + 1);
  };

  // Manual trigger to spawn more balloons
  const handleReleaseBalloons = () => {
    soundService.playChime(1.3);
    setBalloonTrigger((prev) => prev + 1);
  };

  const handleScrollToCake = () => {
    cakeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReplayLoader = () => {
    setIsLoadingPhase(true);
  };

  return (
    <div className={`relative min-h-screen text-white bg-[#0a0a1a] selection:bg-[#FFD700] selection:text-black overflow-x-hidden ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Interactive Balloon Spawner Overlay (Active in both loading and main stages) */}
      <BalloonsOverlay activeTrigger={balloonTrigger} />

      {/* Phase 1 & 2: Fullscreen Interactive Loading Screen */}
      {isLoadingPhase ? (
        <LoadingScreen
          onComplete={handleLoaderComplete}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      ) : (
        /* Phase 2 & 3: Revealed Main Celebration Canvas */
        <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
          {/* Top Navigation */}
          <Navbar
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onReplay={handleReplayLoader}
            language={language}
            onLanguageChange={handleLanguageChange}
          />

          {/* Ambient Background Cosmic Glows */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-900/15 rounded-full blur-[140px]" />
            <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px]" />
            <div className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-[#FF2E93]/10 rounded-full blur-[160px]" />
          </div>

          {/* Main Hero Container */}
          <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 w-full space-y-12 sm:space-y-20">
            {/* Top Bar: Birthday Anniversary Countdown */}
            <BirthdayCountdown language={language} />

            {/* Section 1: Grand Hero Card */}
            <section id="hero" className="w-full">
              <HeroCard
                onReleaseBalloons={handleReleaseBalloons}
                onScrollToCake={handleScrollToCake}
                language={language}
              />
            </section>

            {/* Section 2: Interactive Birthday Cake with Candle Blowing */}
            <section id="cake" ref={cakeSectionRef} className="w-full scroll-mt-24">
              <BirthdayCake
                language={language}
                onWishCompleted={() => {
                  // After blowing candle, release extra celebratory floating balloons
                  setBalloonTrigger((c) => c + 1);
                }}
              />
            </section>

            {/* Section 3: Polaroid-Style Photo Memory Gallery */}
            <PhotoMemoryGallery language={language} />

            {/* Section 4: Milestones & Personal Reflections */}
            <MilestonesSection language={language} />

            {/* Section 5: Intentions & Aspirations Wall */}
            <CelebrationWishes language={language} />
          </main>

          {/* Celebration Footer */}
          <Footer
            onReplayLoader={handleReplayLoader}
            onReleaseBalloons={handleReleaseBalloons}
            language={language}
          />
        </div>
      )}
    </div>
  );
}
