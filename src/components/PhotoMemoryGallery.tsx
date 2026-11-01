import React, { useState } from 'react';
import { Heart, Camera, ZoomIn, X, MapPin, Calendar, Plus } from 'lucide-react';
import { soundService } from '../services/soundEffects';
import { triggerPopBurst } from '../services/confetti';
import { Language, translations } from '../i18n/translations';

export interface MemoryPhoto {
  id: string;
  src: string;
  titleEn: string;
  titleKm: string;
  dateEn: string;
  dateKm: string;
  locationEn: string;
  locationKm: string;
  noteEn: string;
  noteKm: string;
  rotation: string;
  category: 'portrait' | 'adventure' | 'milestone';
  likes: number;
}

const ALL_UPLOADED_MEMORIES: MemoryPhoto[] = [
  {
    id: 'graduation-nib',
    src: '/assets/aistudio/IMG_4557_fdbe753c.JPG',
    titleEn: 'Academic Milestone & Honor',
    titleKm: 'សមិទ្ធផលសិក្សា & វិញ្ញាបនបត្រកិត្តិយស',
    dateEn: 'National Institute of Business',
    dateKm: 'វិទ្យាស្ថានជាតិពាណិជ្ជសាស្ត្រ',
    locationEn: 'Honor Ceremony',
    locationKm: 'ពិធីប្រគល់សញ្ញាបត្រកិត្តិយស',
    noteEn: 'Standing proud with professors and mentors, celebrating the reward of hard work and relentless dedication.',
    noteKm: 'មោទនភាពចំពោះការខិតខំប្រឹងប្រែង ការតស៊ូរៀនសូត្រ និងការទទួលបានការទទួលស្គាល់ដ៏មានតម្លៃ។',
    rotation: '-rotate-2',
    category: 'milestone',
    likes: 48,
  },
  {
    id: 'temple-blessing',
    src: '/assets/aistudio/IMG_9698_30bf650f.PNG',
    titleEn: 'Temple Blessing & Serenity',
    titleKm: 'ការបួងសួងសុំសេចក្តីសុខ & សន្តិភាពផ្លូវចិត្ត',
    dateEn: 'Pagoda Pilgrimage',
    dateKm: 'ដំណើរទៅវត្តអារាម',
    locationEn: 'Sacred Sanctuary',
    locationKm: 'ទីអារាមពិសិដ្ឋ',
    noteEn: 'Praying for inner peace, clarity of mind, good health, and abundant blessings for the chapter ahead.',
    noteKm: 'បួងសួងសុំសេចក្តីសុខ សុខភាពល្អ ប្រាជ្ញាឈ្លាសវៃ និងពរជ័យសម្រាប់គ្រួសារ និងអនាគត។',
    rotation: 'rotate-2',
    category: 'milestone',
    likes: 52,
  },
  {
    id: 'suit-portrait',
    src: '/assets/aistudio/IMG_6487_18f2343c.PNG',
    titleEn: 'The Celebrant · VIP Vision',
    titleKm: 'ភាពថ្លៃថ្នូរ & ភាពជឿជាក់',
    dateEn: 'Birthday Gala 2026',
    dateKm: 'រាត្រីខួបកំណើត 2026',
    locationEn: 'VIP Suite',
    locationKm: 'ស្ទូឌីយោ VIP',
    noteEn: 'Stepping into this year with razor-sharp focus, quiet strength, and ready for all the new horizons.',
    noteKm: 'ភាពចាស់ទុំ ភាពម៉ឺងម៉ាត់ និងការត្រៀមខ្លួនជាស្រេចសម្រាប់ជំពូកជីវិតថ្មីដ៏រុងរឿង។',
    rotation: '-rotate-1',
    category: 'portrait',
    likes: 65,
  },
  {
    id: 'football-pitch',
    src: '/assets/aistudio/IMG_6823_f1976fe7.PNG',
    titleEn: 'Pitch Passion & Tenacity',
    titleKm: 'លើទីលានបាល់ទាត់ក្រោមពន្លឺភ្លើង',
    dateEn: 'Night Match',
    dateKm: 'ការប្រកួតពេលរាត្រី',
    locationEn: 'Football Arena',
    locationKm: 'តារាងបាល់ទាត់',
    noteEn: '"You see it when you close your eyes" — relentless adrenaline, teamwork, and love for the beautiful game.',
    noteKm: 'ក្តីស្រឡាញ់លើកីឡាបាល់ទាត់ ថាមពល និងការតស៊ូឥតឈប់ឈរលើទីលានជាមួយមិត្តភក្តិ។',
    rotation: 'rotate-3',
    category: 'adventure',
    likes: 41,
  },
  {
    id: 'khmer-heritage-pavilion',
    src: '/assets/aistudio/IMG_0121_38df1e26.PNG',
    titleEn: 'Heritage & Khmer Roots',
    titleKm: 'វប្បធម៌ខ្មែរ & អនុស្សាវរីយ៍ប្រពៃណី',
    dateEn: 'Cultural Celebration',
    dateKm: 'ពិធីបុណ្យប្រពៃណី',
    locationEn: 'Traditional Pavilion',
    locationKm: 'ពន្លាប្រពៃណីខ្មែរ',
    noteEn: 'Honoring ancestral culture, timeless crafts, and the warmth of Cambodian traditions.',
    noteKm: 'ស្រឡាញ់វប្បធម៌ប្រពៃណីជាតិ និងការចងចាំដ៏ស្រស់បំព្រងក្នុងសហគមន៍។',
    rotation: '-rotate-2',
    category: 'adventure',
    likes: 39,
  },
  {
    id: 'mirror-sky-blue',
    src: '/assets/aistudio/IMG_0214_6e5e7d66.PNG',
    titleEn: 'Clean Cut & Urban Vibe',
    titleKm: 'ស្ទីលស្រស់ស្រាយ & ភាពជឿជាក់',
    dateEn: 'City Daytime',
    dateKm: 'ថ្ងៃដ៏ស្រស់បំព្រង',
    locationEn: 'Urban Gallery',
    locationKm: 'ទិដ្ឋភាពទីក្រុង',
    noteEn: 'Looking sharp in crisp sky blue, feeling energized, and owning every stride.',
    noteKm: 'ភាពស្រស់ស្រាយ ទំនុកចិត្តលើខ្លួនឯង និងថាមពលវិជ្ជមានសម្រាប់រាល់ថ្ងៃ។',
    rotation: 'rotate-1',
    category: 'portrait',
    likes: 36,
  },
  {
    id: 'village-overhead',
    src: '/assets/aistudio/IMG_0209_48f33d5b.PNG',
    titleEn: 'Peaceful Village Moments',
    titleKm: 'ភាពស្ងប់ស្ងាត់ក្នុងភូមិឋាន',
    dateEn: 'Hometown Journey',
    dateKm: 'ដំណើរកម្សាន្តស្រុកកំណើត',
    locationEn: 'Bamboo Sanctuary',
    locationKm: 'រោងប្រក់ស្បូវប្រពៃណី',
    noteEn: 'Enjoying the open breeze, simple serenity, and the humble beauty of traditional roots.',
    noteKm: 'ស្រូបយកខ្យល់អាកាសបរិសុទ្ធ ភាពស្ងប់ស្ងាត់ និងភាពសាមញ្ញដ៏មានតម្លៃ។',
    rotation: '-rotate-3',
    category: 'adventure',
    likes: 44,
  },
  {
    id: 'casual-black-tee',
    src: '/assets/aistudio/IMG_5061_a664b91d.JPG',
    titleEn: 'Authentic Spirit & Youth',
    titleKm: 'ភាពសាមញ្ញ & ភាពយុវវ័យ',
    dateEn: 'Everyday Life',
    dateKm: 'ថ្ងៃសាមញ្ញដ៏ស្រស់បំព្រង',
    locationEn: 'Personal Space',
    locationKm: 'កន្លែងផ្ទាល់ខ្លួន',
    noteEn: 'Remaining genuine, staying loyal to my values, and smiling through the seasons.',
    noteKm: 'រស់នៅដោយភាពស្មោះត្រង់ចំពោះខ្លួនឯង និងរក្សាស្នាមញញឹមរាល់ជំហាននៃជីវិត។',
    rotation: 'rotate-2',
    category: 'portrait',
    likes: 33,
  },
  {
    id: 'heritage-decor',
    src: '/assets/aistudio/IMG_9707_38df1e26.PNG',
    titleEn: 'Timeless Cultural Charm',
    titleKm: 'ភាពស្រស់ស្អាតនៃប្រពៃណី',
    dateEn: 'Festive Gathering',
    dateKm: 'ថ្ងៃបុណ្យជួបជុំ',
    locationEn: 'Khmer Heritage Grounds',
    locationKm: 'ភូមិវប្បធម៌ខ្មែរ',
    noteEn: 'Surrounded by traditional Khmer woven artifacts and carriage wheels, cherishing history.',
    noteKm: 'ស្ថិតនៅកណ្តាលស្នាដៃសិប្បកម្មត្បាញប្រពៃណីខ្មែរ ប្រកបដោយភាពកក់ក្តៅ និងមោទនភាព។',
    rotation: '-rotate-1',
    category: 'milestone',
    likes: 58,
  },
];

interface PhotoMemoryGalleryProps {
  language: Language;
}

export const PhotoMemoryGallery: React.FC<PhotoMemoryGalleryProps> = ({ language }) => {
  const t = translations[language];
  const [memories, setMemories] = useState<MemoryPhoto[]>(ALL_UPLOADED_MEMORIES);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'portrait' | 'adventure' | 'milestone'>('all');

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playChime(1.4);
    triggerPopBurst(e.clientX, e.clientY, '#FF2E93');
    setMemories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleOpenPhoto = (photo: MemoryPhoto) => {
    soundService.playChime(1.2);
    setSelectedPhoto(photo);
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const newPhoto: MemoryPhoto = {
        id: `custom-${Date.now()}`,
        src: result,
        titleEn: file.name.replace(/\.[^/.]+$/, '').slice(0, 24) || 'Celebration Memory',
        titleKm: 'អនុស្សាវរីយ៍ដ៏មានតម្លៃ',
        dateEn: 'Added Today',
        dateKm: 'បានបញ្ចូលថ្ងៃនេះ',
        locationEn: 'Special Moment',
        locationKm: 'ពេលវេលាពិសេស',
        noteEn: 'A timeless moment captured and added to this celebration gallery.',
        noteKm: 'ពេលវេលាដ៏មានតម្លៃដែលត្រូវបានកត់ត្រាទុកក្នុងពិធីអបអរនេះ។',
        rotation: Math.random() > 0.5 ? 'rotate-2' : '-rotate-2',
        category: 'milestone',
        likes: 1,
      };

      setMemories([newPhoto, ...memories]);
      soundService.playSparkle();
    };
    reader.readAsDataURL(file);
  };

  const filteredMemories =
    activeFilter === 'all'
      ? memories
      : memories.filter((m) => m.category === activeFilter);

  return (
    <section id="gallery" className={`w-full my-20 max-w-6xl mx-auto px-4 ${language === 'km' ? 'font-khmer' : ''}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>{t.galleryKicker}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            {t.galleryTitle}
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Controls & Upload Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter segment */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'km' ? 'ទាំងអស់' : 'All'}
            </button>
            <button
              onClick={() => setActiveFilter('milestone')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeFilter === 'milestone'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'km' ? 'សមិទ្ធផល' : 'Milestones'}
            </button>
            <button
              onClick={() => setActiveFilter('portrait')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeFilter === 'portrait'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'km' ? 'រូបភាព' : 'Portraits'}
            </button>
            <button
              onClick={() => setActiveFilter('adventure')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeFilter === 'adventure'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA751] text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'km' ? 'ផ្សងព្រេង' : 'Adventures'}
            </button>
          </div>

          {/* Add Polaroid Memory */}
          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-semibold cursor-pointer transition-all shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'km' ? 'បញ្ចូលរូបថត' : 'Add Photo'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </label>
        </div>
      </div>

      {/* Polaroid Grid (9 Authentic User Photos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
        {filteredMemories.map((photo) => {
          const title = language === 'km' ? photo.titleKm : photo.titleEn;
          const date = language === 'km' ? photo.dateKm : photo.dateEn;
          const location = language === 'km' ? photo.locationKm : photo.locationEn;
          const note = language === 'km' ? photo.noteKm : photo.noteEn;

          return (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className={`group relative p-3 sm:p-4 rounded-xl bg-[#FBF9F5] text-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300 transform ${photo.rotation} hover:rotate-0 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer border border-[#E8E2D5] select-none`}
            >
              {/* Decorative Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-300/40 backdrop-blur-xs border border-white/40 shadow-xs rotate-[-1deg] pointer-events-none z-10" />

              {/* Photo Area (Aspect Square or 4:3 with crisp contain/cover) */}
              <div className="relative w-full aspect-square bg-slate-900 rounded-sm overflow-hidden border border-black/10">
                <img
                  src={photo.src}
                  alt={title}
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle vintage photo glare sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Expand Hover Hint */}
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Classic Polaroid Bottom Caption Area */}
              <div className="pt-3.5 pb-1 px-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-playfair text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                    {title}
                  </h3>
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                    title={t.galleryLike}
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span className="tabular-nums font-mono text-[11px]">{photo.likes}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1 truncate">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    {date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    {location}
                  </span>
                </div>

                <p className="text-[12px] italic text-slate-600 font-serif leading-snug line-clamp-2">
                  "{note}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 sm:p-6 rounded-2xl bg-[#FBF9F5] text-slate-900 max-w-xl w-full shadow-2xl border-2 border-white/20 animate-scale-up max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-700 hover:text-black transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Viewport */}
            <div className="relative w-full max-h-[60vh] aspect-[4/5] sm:aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-black/15 shadow-inner flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={language === 'km' ? selectedPhoto.titleKm : selectedPhoto.titleEn}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Polaroid Metadata */}
            <div className="pt-5 px-1 text-left">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-slate-900">
                    {language === 'km' ? selectedPhoto.titleKm : selectedPhoto.titleEn}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{language === 'km' ? selectedPhoto.dateKm : selectedPhoto.dateEn}</span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'km' ? selectedPhoto.locationKm : selectedPhoto.locationEn}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer shrink-0"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span className="font-semibold text-xs">{selectedPhoto.likes}</span>
                </button>
              </div>

              <p className="text-sm italic font-serif text-slate-700 leading-relaxed mt-3 border-t border-slate-200 pt-3">
                "{language === 'km' ? selectedPhoto.noteKm : selectedPhoto.noteEn}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
