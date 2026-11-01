import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../i18n/translations';
import { soundService } from '../services/soundEffects';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'navbar' | 'floating' | 'compact';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onLanguageChange,
  variant = 'navbar',
}) => {
  const handleToggle = (newLang: Language) => {
    if (newLang === language) return;
    soundService.playChime(1.3);
    onLanguageChange(newLang);
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-white/5 border border-white/15 backdrop-blur-md transition-all shadow-sm ${
        variant === 'compact' ? 'gap-0.5' : 'gap-1'
      }`}
      role="group"
      aria-label="Language selector"
    >
      <div className="pl-1.5 pr-0.5 text-amber-400/80">
        <Languages className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => handleToggle('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black shadow-sm font-bold'
            : 'text-white/70 hover:text-white'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => handleToggle('km')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'km'
            ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black shadow-sm font-bold'
            : 'text-white/70 hover:text-white'
        }`}
        aria-pressed={language === 'km'}
      >
        ខ្មែរ
      </button>
    </div>
  );
};
