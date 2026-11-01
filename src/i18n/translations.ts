export type Language = 'en' | 'km';

export interface Translations {
  // Loading screen
  vipInvitation: string;
  newChapterBegins: string;
  loadingSubtitle: string;
  clickToLaunch: string;
  audioNotice: string;
  preparing: string;
  statusMessages: string[];

  // Navbar
  celebrationBrand: string;
  navCelebrant: string;
  navCake: string;
  navMilestones: string;
  navGallery: string;
  navIntentions: string;
  fireworks: string;
  unmuteSound: string;
  muteSound: string;

  // Photo Memory Gallery
  galleryKicker: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryTapToExpand: string;
  galleryLike: string;

  // Birthday Countdown
  countdownKicker: string;
  countdownTitle: string;
  countdownTodayIsTheDay: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownSeconds: string;
  countdownNextAnniversary: string;
  countdownChangeDate: string;
  countdownBornDate: string;
  countdownTurningAge: string;

  // Hero Card
  celebrantOfTheYear: string;
  vipBirthdayStar: string;
  raiseToast: string;
  share: string;
  copied: string;
  specialOccasionKicker: string[];
  happyBirthdayHeading: string;
  happyBirthdaySubheading: string;
  chapterLabel: string;
  chapterValue: string;
  vibeLabel: string;
  vibeValue: string;
  energyLabel: string;
  energyValue: string;
  popChampagne: string;
  cheersChampagne: string;
  releaseBalloons: string;
  makeAWish: string;

  // Birthday Cake
  cakeRitual: string;
  makeSecretWish: string;
  cakeInstructionsLit: string;
  cakeInstructionsBlown: string;
  tapFlameToBlow: string;
  wishMadeBanner: string;
  wishMadeSubtext: string;
  blowCandleButton: string;
  lightCandleAgainButton: string;
  inscribedWishHeader: string;
  editWish: string;
  wishInputPlaceholder: string;
  sealWish: string;

  // Milestones
  milestonesKicker: string;
  milestonesTitle: string;
  milestonesSubtitle: string;
  activated: string;
  tapToReflect: string;
  milestonesList: Array<{
    id: string;
    category: string;
    title: string;
    subtitle: string;
    description: string;
  }>;

  // Intentions
  intentionsKicker: string;
  intentionsTitle: string;
  addIntentionButton: string;
  defaultIntentions: Array<{
    id: string;
    category: string;
    text: string;
    date: string;
  }>;
  modalTitle: string;
  modalSubtitle: string;
  modalCategoryLabel: string;
  modalTextLabel: string;
  modalTextPlaceholder: string;
  modalCancel: string;
  modalSubmit: string;
  categoryOptions: Array<{ value: string; label: string }>;

  // Footer
  footerTitle: string;
  footerSubtitle: string;
  replayIntro: string;
  copyright: string;
  madeWithLove: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    vipInvitation: 'VIP Birthday Invitation',
    newChapterBegins: 'A New Chapter Begins',
    loadingSubtitle: 'A personalized celebratory experience designed for this special trip around the sun.',
    clickToLaunch: 'Click to Launch Celebration 🎈',
    audioNotice: 'Audio synthesized via Web Audio API · Enable sound for best experience',
    preparing: 'Preparing',
    statusMessages: [
      'Blowing up balloons... 🎈',
      'Chilling the champagne... 🍾',
      'Lighting up the candles... 🎂',
      'Wrapping up another year of awesome... ✨',
      'Ready for takeoff! 🚀',
    ],

    celebrationBrand: 'CELEBRATION · 2026',
    navCelebrant: 'Celebrant',
    navCake: 'The Cake',
    navMilestones: 'Milestones',
    navGallery: 'Memories',
    navIntentions: 'Intentions',
    fireworks: 'Fireworks 🎆',
    unmuteSound: 'Unmute Sound',
    muteSound: 'Mute Sound',

    galleryKicker: 'Polaroid Keepsakes',
    galleryTitle: 'Photo Memory Gallery',
    gallerySubtitle: 'Snapshots of laughter, milestones, late-night triumphs, and unforgettable journeys.',
    galleryTapToExpand: 'Click to expand memory',
    galleryLike: 'Love',

    countdownKicker: 'Next Trip Around The Sun',
    countdownTitle: 'Birthday Anniversary Countdown',
    countdownTodayIsTheDay: 'Today is the Grand Celebration! 🎂✨',
    countdownDays: 'Days',
    countdownHours: 'Hours',
    countdownMinutes: 'Mins',
    countdownSeconds: 'Secs',
    countdownNextAnniversary: 'Until Next Birthday',
    countdownChangeDate: 'Change Birthday Date',
    countdownBornDate: 'Born: 11 January 2006',
    countdownTurningAge: 'Turning 21 · Milestone Birthday 🌟',

    celebrantOfTheYear: 'Celebrant of the Year',
    vipBirthdayStar: 'V.I.P. Birthday Star',
    raiseToast: 'Raise Toast',
    share: 'Share',
    copied: 'Link Copied!',
    specialOccasionKicker: ['Special Occasion', 'Another Trip Around The Sun', '365 Days Of Growth'],
    happyBirthdayHeading: 'Happy Birthday to Me! 🥂✨',
    happyBirthdaySubheading:
      'Celebrating growth, new adventures, and another trip around the sun. Today is a celebration of life, resilience, big ambitions, and the quiet gratitude for every moment lived.',
    chapterLabel: 'Chapter',
    chapterValue: 'Next Level',
    vibeLabel: 'Vibe',
    vibeValue: 'Triumphant',
    energyLabel: 'Energy',
    energyValue: 'Unstoppable',
    popChampagne: 'Pop Champagne 🍾',
    cheersChampagne: 'Cheers! 🍾',
    releaseBalloons: 'Release Balloons 🎈',
    makeAWish: 'Make a Wish 🎂',

    cakeRitual: 'Birthday Ritual',
    makeSecretWish: 'Make A Secret Wish',
    cakeInstructionsLit:
      'Close your eyes, visualize what you desire this year, and click the flame or button to blow!',
    cakeInstructionsBlown:
      'Your candle has been blown! The universe has received your intention.',
    tapFlameToBlow: 'Tap flame to blow',
    wishMadeBanner: 'Wish Made! 🌟',
    wishMadeSubtext:
      'May this trip around the sun bring abundance, peace, and triumphant milestones.',
    blowCandleButton: 'Blow Candle Flame 🌬️',
    lightCandleAgainButton: 'Light Candle Again 🕯️',
    inscribedWishHeader: 'Inscribed Wish for this Chapter',
    editWish: 'Edit',
    wishInputPlaceholder: 'Inscribe a private goal or wish...',
    sealWish: 'Seal',

    milestonesKicker: 'Reflections & Architecture',
    milestonesTitle: 'Moments of Growth',
    milestonesSubtitle:
      'Honoring the lessons from the past and crystallizing the vision for what lies ahead.',
    activated: 'Activated',
    tapToReflect: 'Tap to reflect',
    milestonesList: [
      {
        id: 'resilience',
        category: 'Inner Growth',
        title: 'Resilience & Self-Mastery',
        subtitle: 'Navigating life with calm authority',
        description:
          'Every challenge faced in the previous year turned into foundational strength. Learning to embrace the journey with patience and determination.',
      },
      {
        id: 'ambition',
        category: 'Visions & Craft',
        title: 'Relentless Ambition',
        subtitle: 'Building the dreams of tomorrow',
        description:
          'Focusing on deep work, creative expression, and taking bold steps towards long-term mastery in life and career.',
      },
      {
        id: 'gratitude',
        category: 'Mindset',
        title: 'Unconditional Gratitude',
        subtitle: 'Finding luxury in simple joys',
        description:
          'Cherishing good health, peaceful mornings, inspiring conversations, and the warmth of genuine connections.',
      },
      {
        id: 'exploration',
        category: 'Adventure',
        title: 'New Horizons',
        subtitle: 'Stepping fearlessly into the unknown',
        description:
          'Traveling to new places, meeting brilliant minds, and expanding perspectives beyond comfortable boundaries.',
      },
    ],

    intentionsKicker: 'Manifestations & Aspirations',
    intentionsTitle: 'Intentions for this Chapter',
    addIntentionButton: 'Add Birthday Intention',
    defaultIntentions: [
      {
        id: '1',
        category: 'Venture & Mind',
        text: 'Build things with uncompromised craft, courage, and creative freedom.',
        date: 'New Chapter Goal',
      },
      {
        id: '2',
        category: 'Health & Vitality',
        text: 'Nourish the mind and body; move with purpose and stay energized every sunrise.',
        date: 'Daily Practice',
      },
      {
        id: '3',
        category: 'Inner Peace',
        text: 'Stay rooted in calm clarity, unaffected by temporary noise or distractions.',
        date: 'Core Anchor',
      },
      {
        id: '4',
        category: 'Joy & Celebration',
        text: 'Laugh more often, celebrate small wins, and create timeless memories with loved ones.',
        date: 'Life Harmony',
      },
    ],
    modalTitle: 'Inscribe a New Intention',
    modalSubtitle:
      'Set a guiding light for yourself as you step forward into this wonderful year.',
    modalCategoryLabel: 'Category',
    modalTextLabel: 'Your Intention / Affirmation',
    modalTextPlaceholder: 'e.g. Embrace every new challenge with bravery and joy...',
    modalCancel: 'Cancel',
    modalSubmit: 'Seal Intention',
    categoryOptions: [
      { value: 'Personal Wish', label: 'Personal Wish 🌟' },
      { value: 'Career & Vision', label: 'Career & Vision 🚀' },
      { value: 'Health & Vitality', label: 'Health & Vitality 🌿' },
      { value: 'Adventure & Travel', label: 'Adventure & Travel ✈️' },
      { value: 'Inner Peace', label: 'Inner Peace 🧘' },
    ],

    footerTitle: 'A Golden Celebration',
    footerSubtitle:
      'May this trip around the sun bring triumph, serenity, and endless reasons to smile.',
    replayIntro: 'Replay Celebration Intro',
    copyright: '© 2026 Happy Birthday to Me Celebration · All Rights Reserved',
    madeWithLove: 'Made with ❤️ for the VIP Birthday Celebrant',
  },

  km: {
    vipInvitation: 'លិខិតអញ្ជើញខួបកំណើត VIP',
    newChapterBegins: 'ជំពូកជីវិតថ្មីបានចាប់ផ្តើម',
    loadingSubtitle: 'បទពិសោធន៍អបអរសាទរផ្ទាល់ខ្លួន ដែលត្រូវបានរៀបចំឡើងយ៉ាងពិសេសសម្រាប់ដំណើរជីវិតដ៏រុងរឿងនេះ។',
    clickToLaunch: 'ចុចដើម្បីចាប់ផ្តើមអបអរសាទរ 🎈',
    audioNotice: 'សំឡេងត្រូវបានបង្កើតដោយ Web Audio API · សូមបើកសំឡេងដើម្បីទទួលបានបទពិសោធន៍ល្អបំផុត',
    preparing: 'កំពុងរៀបចំ',
    statusMessages: [
      'កំពុងផ្លុំប៉េងប៉ោង... 🎈',
      'កំពុងក្លាស្សេស្រាសំប៉ាញ... 🍾',
      'កំពុងអុជទៀនខួបកំណើត... 🎂',
      'កំពុងរៀបចំបញ្ចប់ឆ្នាំដ៏អស្ចារ្យមួយទៀត... ✨',
      'រួចរាល់សម្រាប់ការចាប់ផ្តើម! 🚀',
    ],

    celebrationBrand: 'ពិធីអបអរ · 2026',
    navCelebrant: 'ម្ចាស់ខួប',
    navCake: 'នំខួបកំណើត',
    navMilestones: 'សមិទ្ធផល',
    navGallery: 'ការចងចាំ',
    navIntentions: 'បំណងប្រាថ្នា',
    fireworks: 'កាំជ្រួច 🎆',
    unmuteSound: 'បើកសំឡេង',
    muteSound: 'បិទសំឡេង',

    galleryKicker: 'ផ្ទាំងរូបភាពអនុស្សាវរីយ៍ Polaroid',
    galleryTitle: 'វិចិត្រសាលរូបថតអនុស្សាវរីយ៍',
    gallerySubtitle: 'ទិដ្ឋភាពនៃស្នាមញញឹម សមិទ្ធផលសំខាន់ៗ យប់នៃការតស៊ូ និងដំណើរកម្សាន្តដែលមិនអាចបំភ្លេចបាន។',
    galleryTapToExpand: 'ចុចដើម្បីមើលរូបភាពធំ',
    galleryLike: 'ស្រឡាញ់',

    countdownKicker: 'ការវិលជុំបន្ទាប់នៃព្រះអាទិត្យ',
    countdownTitle: 'ការរាប់ថយក្រោយដល់ខួបកំណើតបន្ទាប់',
    countdownTodayIsTheDay: 'ថ្ងៃនេះជាថ្ងៃមហាអបអរសាទរ! 🎂✨',
    countdownDays: 'ថ្ងៃ',
    countdownHours: 'ម៉ោង',
    countdownMinutes: 'នាទី',
    countdownSeconds: 'វិនាទី',
    countdownNextAnniversary: 'រហូតដល់ខួបកំណើតលើកក្រោយ',
    countdownChangeDate: 'ប្តូរកាលបរិច្ឆេទខួប',
    countdownBornDate: 'ថ្ងៃកំណើត៖ ១១ មករា ២០០៦',
    countdownTurningAge: 'ឈានចូលវ័យ ២១ ឆ្នាំ · ជំពូកជីវិតដ៏សំខាន់ 🌟',

    celebrantOfTheYear: 'ម្ចាស់ខួបប្រចាំឆ្នាំ',
    vipBirthdayStar: 'តារាខួបកំណើត VIP',
    raiseToast: 'លើកកែវអបអរ',
    share: 'ចែករំលែក',
    copied: 'បានចម្លងតំណ!',
    specialOccasionKicker: ['ឱកាសពិសេស', 'មួយឆ្នាំថ្មីនៃជីវិត', '៣៦៥ ថ្ងៃនៃការរីកចម្រើន'],
    happyBirthdayHeading: 'រីករាយថ្ងៃខួបកំណើតខ្ញុំ! 🥂✨',
    happyBirthdaySubheading:
      'អបអរសាទរការរីកចម្រើន ការផ្សងព្រេងថ្មីៗ និងការវិលជុំមួយទៀតនៃព្រះអាទិត្យ។ ថ្ងៃនេះគឺជាការអបអរសាទរចំពោះជីវិត ភាពរឹងមាំ មហិច្ឆតាដ៏ធំធេង និងការដឹងគុណយ៉ាងជ្រាលជ្រៅចំពោះរាល់វិនាទីដែលបានឆ្លងកាត់។',
    chapterLabel: 'ជំពូកជីវិត',
    chapterValue: 'កម្រិតបន្ទាប់',
    vibeLabel: 'អារម្មណ៍',
    vibeValue: 'ជ័យជម្នះ',
    energyLabel: 'ថាមពល',
    energyValue: 'ឥតឈប់ឈរ',
    popChampagne: 'បើកស្រាសំប៉ាញ 🍾',
    cheersChampagne: 'ជយោ! 🍾',
    releaseBalloons: 'បង្ហោះប៉េងប៉ោង 🎈',
    makeAWish: 'បួងសួងសុំពរ 🎂',

    cakeRitual: 'ពិធីបួងសួងខួបកំណើត',
    makeSecretWish: 'បួងសួងសុំពរក្នុងចិត្ត',
    cakeInstructionsLit:
      'បិទភ្នែករបស់អ្នក ស្រមៃមើលអ្វីដែលអ្នកប្រាថ្នានៅក្នុងឆ្នាំនេះ រួចចុចលើអណ្តាតភ្លើង ឬប៊ូតុងដើម្បីផ្លុំពន្លត់!',
    cakeInstructionsBlown:
      'ទៀនត្រូវបានផ្លុំពន្លត់រួចរាល់ហើយ! បំណងប្រាថ្នារបស់អ្នកត្រូវបានទទួលពីចក្រវាល។',
    tapFlameToBlow: 'ចុចលើភ្លើងដើម្បីផ្លុំ',
    wishMadeBanner: 'បំណងប្រាថ្នាត្រូវបានបួងសួង! 🌟',
    wishMadeSubtext:
      'សូមឱ្យឆ្នាំថ្មីនេះនាំមកនូវភាពបរិបូរណ៍ សេចក្តីសុខសាន្តផ្លូវចិត្ត និងសមិទ្ធផលដ៏ត្រចះត្រចង់។',
    blowCandleButton: 'ផ្លុំពន្លត់ទៀន 🌬️',
    lightCandleAgainButton: 'អុជទៀនម្តងទៀត 🕯️',
    inscribedWishHeader: 'បំណងប្រាថ្នាដែលបានកត់ត្រាសម្រាប់ជំពូកនេះ',
    editWish: 'កែសម្រួល',
    wishInputPlaceholder: 'កត់ត្រាគោលដៅ ឬបំណងប្រាថ្នាផ្ទាល់ខ្លួន...',
    sealWish: 'រក្សាទុក',

    milestonesKicker: 'ការឆ្លុះបញ្ចាំង និងការរៀបចំជីវិត',
    milestonesTitle: 'ពេលវេលានៃការរីកចម្រើន',
    milestonesSubtitle:
      'ផ្តល់តម្លៃដល់មេរៀនពីអតីតកាល និងកំណត់ចក្ខុវិស័យឱ្យកាន់តែច្បាស់លាស់សម្រាប់អនាគត។',
    activated: 'បានបើកមើល',
    tapToReflect: 'ចុចដើម្បីពិចារណា',
    milestonesList: [
      {
        id: 'resilience',
        category: 'ការលូតលាស់ខាងក្នុង',
        title: 'ភាពរឹងមាំ & ម្ចាស់ការលើខ្លួនឯង',
        subtitle: 'ដឹកនាំជីវិតដោយភាពស្ងប់ស្ងាត់ និងម៉ឺងម៉ាត់',
        description:
          'គ្រប់ឧបសគ្គដែលបានជួបប្រទះក្នុងឆ្នាំកន្លងទៅ បានប្រែក្លាយជាកម្លាំងគ្រឹះដ៏រឹងមាំ។ រៀនទទួលយកដំណើរជីវិតដោយការអត់ធ្មត់ និងការប្តេជ្ញាចិត្តខ្ពស់។',
      },
      {
        id: 'ambition',
        category: 'ចក្ខុវិស័យ & ការងារ',
        title: 'មហិច្ឆតាឥតព្រំដែន',
        subtitle: 'កសាងក្តីសុបិននៃថ្ងៃស្អែក',
        description:
          'ផ្តោតលើការងារស៊ីជម្រៅ ការបង្កើតថ្មី និងការបោះជំហានយ៉ាងក្លាហានឆ្ពោះទៅរកភាពជោគជ័យយូរអង្វែងក្នុងជីវិត និងអាជីព។',
      },
      {
        id: 'gratitude',
        category: 'ផ្នត់គំនិត',
        title: 'ការដឹងគុណឥតលក្ខខណ្ឌ',
        subtitle: 'ស្វែងរកសេចក្តីសុខក្នុងរឿងសាមញ្ញៗ',
        description:
          'ផ្តល់តម្លៃដល់សុខភាពល្អ ព្រឹកព្រលឹមដ៏ស្ងប់ស្ងាត់ ការសន្ទនាដែលផ្តល់កម្លាំងចិត្ត និងភាពកក់ក្តៅនៃទំនាក់ទំនងពិតប្រាកដ។',
      },
      {
        id: 'exploration',
        category: 'ការផ្សងព្រេង',
        title: 'ផ្តេកមេឃថ្មី',
        subtitle: 'បោះជំហានដោយមិនញញើតទៅកាន់ពិភពថ្មី',
        description:
          'ធ្វើដំណើរទៅកាន់កន្លែងថ្មីៗ ជួបមនុស្សពូកែៗ និងពង្រីកទស្សនវិស័យឱ្យលើសពីតំបន់សុវត្ថិភាព។',
      },
    ],

    intentionsKicker: 'ការតាំងចិត្ត & សេចក្តីប្រាថ្នា',
    intentionsTitle: 'ការតាំងចិត្តសម្រាប់ជំពូកថ្មីនេះ',
    addIntentionButton: 'បន្ថែមការតាំងចិត្តថ្មី',
    defaultIntentions: [
      {
        id: '1',
        category: 'អាជីវកម្ម & គំនិត',
        text: 'កសាងអ្វីៗដោយសិល្បៈ ការតាំងចិត្តក្លាហាន និងសេរីភាពនៃការបង្កើតថ្មី។',
        date: 'គោលដៅជំពូកថ្មី',
      },
      {
        id: '2',
        category: 'សុខភាព & ថាមពល',
        text: 'ថែបំប៉នទាំងរាងកាយនិងចិត្ត រស់នៅប្រកបដោយគោលដៅ និងរក្សាថាមពលរាល់ថ្ងៃ។',
        date: 'ការអនុវត្តប្រចាំថ្ងៃ',
      },
      {
        id: '3',
        category: 'សន្តិភាពផ្លូវចិត្ត',
        text: 'រក្សាភាពច្បាស់លាស់និងស្ងប់ស្ងាត់ ដោយមិនរវើរវាយនឹងសំឡេងរំខានបណ្តោះអាសន្ន។',
        date: 'គ្រឹះនៃចិត្ត',
      },
      {
        id: '4',
        category: 'សេចក្តីរីករាយ & ការអបអរ',
        text: 'សើចឱ្យបានច្រើន អបអរជោគជ័យតូចៗ និងបង្កើតការចងចាំដ៏មានតម្លៃជាមួយមនុស្សជាទីស្រឡាញ់។',
        date: 'ភាពសុខដុមនៃជីវិត',
      },
    ],
    modalTitle: 'កត់ត្រាការតាំងចិត្តថ្មី',
    modalSubtitle: 'កំណត់ពន្លឺនាំផ្លូវសម្រាប់ខ្លួនអ្នក នៅពេលអ្នកបោះជំហានចូលទៅក្នុងឆ្នាំដ៏អស្ចារ្យនេះ។',
    modalCategoryLabel: 'ប្រភេទ',
    modalTextLabel: 'ការតាំងចិត្ត ឬពាក្យជូនពរខ្លួនឯង',
    modalTextPlaceholder: 'ឧ. ទទួលយកគ្រប់ការប្រឈមថ្មីៗដោយភាពក្លាហាន និងស្នាមញញឹម...',
    modalCancel: 'បោះបង់',
    modalSubmit: 'រក្សាទុកការតាំងចិត្ត',
    categoryOptions: [
      { value: 'Personal Wish', label: 'បំណងប្រាថ្នាផ្ទាល់ខ្លួន 🌟' },
      { value: 'Career & Vision', label: 'អាជីព & ចក្ខុវិស័យ 🚀' },
      { value: 'Health & Vitality', label: 'សុខភាព & ថាមពល 🌿' },
      { value: 'Adventure & Travel', label: 'ការផ្សងព្រេង & ដំណើរកម្សាន្ត ✈️' },
      { value: 'Inner Peace', label: 'សន្តិភាពផ្លូវចិត្ត 🧘' },
    ],

    footerTitle: 'ការអបអរសាទរដ៏រុងរឿង',
    footerSubtitle: 'សូមឱ្យដំណើរជីវិតថ្មីនេះនាំមកនូវជ័យជម្នះ ភាពស្ងប់សុខ និងស្នាមញញឹមឥតឈប់ឈរ។',
    replayIntro: 'មើលការចាប់ផ្តើមអបអរសាទរឡើងវិញ',
    copyright: '© 2026 រីករាយថ្ងៃខួបកំណើតខ្ញុំ · រក្សាសិទ្ធិគ្រប់យ៉ាង',
    madeWithLove: 'បង្កើតឡើងដោយ ❤️ ជូនចំពោះម្ចាស់ខួបកំណើត VIP',
  },
};
