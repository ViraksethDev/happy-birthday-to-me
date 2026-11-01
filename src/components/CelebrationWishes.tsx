import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { triggerWishBurst } from '../services/confetti';
import { Language, translations } from '../i18n/translations';

interface Intention {
  id: string;
  category: string;
  text: string;
  date: string;
}

interface CelebrationWishesProps {
  language: Language;
}

export const CelebrationWishes: React.FC<CelebrationWishesProps> = ({ language }) => {
  const t = translations[language];
  const [customIntentions, setCustomIntentions] = useState<Intention[]>([]);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState(t.categoryOptions[0].value);
  const [showAddModal, setShowAddModal] = useState(false);

  const displayIntentions = [...customIntentions, ...t.defaultIntentions];

  const handleAddIntention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    soundService.playSparkle();
    triggerWishBurst();

    const newEntry: Intention = {
      id: Date.now().toString(),
      category: newCategory,
      text: newText.trim(),
      date: language === 'km' ? 'កត់ត្រាថ្ងៃនេះ' : 'Inscribed Today',
    };

    setCustomIntentions([newEntry, ...customIntentions]);
    setNewText('');
    setShowAddModal(false);
  };

  return (
    <section id="intentions" className={`w-full my-16 max-w-6xl mx-auto px-4 ${language === 'km' ? 'font-khmer' : ''}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div className="text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.intentionsKicker}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            {t.intentionsTitle}
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black shadow-md hover:shadow-amber-500/20 transform hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>{t.addIntentionButton}</span>
        </button>
      </div>

      {/* Intentions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayIntentions.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl glass-panel text-left flex flex-col justify-between border border-white/10 hover:border-amber-400/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300/80 mb-3">
                <span className="font-semibold uppercase tracking-wider">{item.category}</span>
                <BookmarkCheck className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium text-white/90 leading-relaxed mb-4">
                "{item.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>{item.date}</span>
              <span className="text-amber-400/80 font-mono">✦✦✦</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding intention */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel max-w-md w-full border border-amber-400/40 text-left relative shadow-2xl">
            <h3 className="font-cinzel text-xl font-bold text-white mb-2">
              {t.modalTitle}
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              {t.modalSubtitle}
            </p>

            <form onSubmit={handleAddIntention} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-amber-300 uppercase tracking-wider mb-1.5">
                  {t.modalCategoryLabel}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                >
                  {t.categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-300 uppercase tracking-wider mb-1.5">
                  {t.modalTextLabel}
                </label>
                <textarea
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder={t.modalTextPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {t.modalCancel}
                </button>
                <button
                  type="submit"
                  disabled={!newText.trim()}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black shadow-md disabled:opacity-40 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.modalSubmit}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
