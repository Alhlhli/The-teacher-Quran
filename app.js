/**
 * المصحف المعلم - جزء عم (Teacher Quran - Juz Amma)
 * Modern Web Engine - Complete Edition with Mushaf Viewer, Tafsir, Audio Recording & Statistics
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA MODELS & RECITERS
  // ==========================================
  
  // 38 Surahs (Surah 1: Al-Fatihah + 78 to 114: Juz Amma)
  const SURAHS = Object.values(window.QURAN_DATA || {}).map(s => ({
    number: s.number,
    nameAr: s.nameAr,
    vocalized: s.vocalized,
    nameEn: s.nameEn,
    nameFr: s.nameFr,
    ayahs: s.ayahs,
    startPage: s.startPage,
    endPage: s.endPage,
    isMeccan: s.isMeccan,
    revelationOrder: s.revelationOrder,
    overview: s.overview,
    topics: s.topics,
    verses: s.verses
  }));

  const RECITERS = [
    {
      id: 1,
      nameArFull: 'محمد صديق المنشاوي (المصحف المعلم)',
      nameArShort: 'المنشاوي',
      nameEnFull: 'Muhammad Siddiq Al-Minshawi (Teacher)',
      nameEnShort: 'Al-Minshawi',
      nameFrFull: 'Muhammad Siddiq Al-Minshawi (Enseignant)',
      nameFrShort: 'Al-Minshawi',
      baseUrl: 'https://server10.mp3quran.net/minsh/Almusshaf-Al-Mo-lim/',
      folder: 'minshawi'
    },
    {
      id: 2,
      nameArFull: 'ماهر المعيقلي (المصحف المعلم)',
      nameArShort: 'المعيقلي',
      nameEnFull: 'Maher Al-Muaiqly (Teacher)',
      nameEnShort: 'Al-Muaiqly',
      nameFrFull: 'Maher Al-Muaiqly (Enseignant)',
      nameFrShort: 'Al-Muaiqly',
      baseUrl: 'https://cdn.mp3quran.net/audio/maher-muaiqly/r2/',
      folder: 'maher'
    },
    {
      id: 3,
      nameArFull: 'عبد البارئ محمد (المصحف المعلم)',
      nameArShort: 'عبد البارئ',
      nameEnFull: 'Abdul-Bari Muhammad (Teacher)',
      nameEnShort: 'Abdul-Bari',
      nameFrFull: 'Abdul-Bari Muhammad (Enseignant)',
      nameFrShort: 'Abdul-Bari',
      baseUrl: 'https://cdn.mp3quran.net/audio/abdulbari-muhammad/r2/',
      folder: 'abdulbari'
    },
    {
      id: 4,
      nameArFull: 'الحسيني العزازي (المصحف المعلم)',
      nameArShort: 'العزازي',
      nameEnFull: 'Al-Husayni Al-Azazi (Teacher)',
      nameEnShort: 'Al-Azazi',
      nameFrFull: 'Al-Husayni Al-Azazi (Enseignant)',
      nameFrShort: 'Al-Azazi',
      baseUrl: 'https://server8.mp3quran.net/3zazi/',
      folder: '3zazi'
    },
    {
      id: 5,
      nameArFull: 'عبد الله الموسى (المصحف المعلم)',
      nameArShort: 'الموسى',
      nameEnFull: 'Abdullah Al-Mousa (Teacher)',
      nameEnShort: 'Al-Mousa',
      nameFrFull: 'Abdullah Al-Mousa (Enseignant)',
      nameFrShort: 'Al-Mousa',
      baseUrl: 'https://server14.mp3quran.net/mousa/Almusshaf-Al-Mo-lim/',
      folder: 'mousa'
    },
    {
      id: 6,
      nameArFull: 'محمود خليل الحصري (المصحف المعلم)',
      nameArShort: 'الحصري',
      nameEnFull: 'Mahmoud Khalil Al-Hussary (Teacher)',
      nameEnShort: 'Al-Hussary',
      nameFrFull: 'Mahmoud Khalil Al-Hussary (Enseignant)',
      nameFrShort: 'Al-Hussary',
      baseUrl: 'https://server13.mp3quran.net/husr/',
      folder: 'hussary'
    },
    {
      id: 7,
      nameArFull: 'سعد بن سعيد الغامدي (المصحف المعلم)',
      nameArShort: 'سعد الغامدي',
      nameEnFull: 'Saad Al-Ghamdi (Teacher)',
      nameEnShort: 'Saad Al-Ghamdi',
      nameFrFull: 'Saad Al-Ghamdi (Enseignant)',
      nameFrShort: 'Saad Al-Ghamdi',
      baseUrl: 'https://server7.mp3quran.net/s_gmd/',
      folder: 'ghamdi'
    },
    {
      id: 8,
      nameArFull: 'فارس عباد (المصحف المعلم)',
      nameArShort: 'فارس عباد',
      nameEnFull: 'Fares Abbad (Teacher)',
      nameEnShort: 'Fares Abbad',
      nameFrFull: 'Fares Abbad (Enseignant)',
      nameFrShort: 'Fares Abbad',
      baseUrl: 'https://server8.mp3quran.net/abba/',
      folder: 'abbad'
    },
    {
      id: 9,
      nameArFull: 'محمود خليل الحصري (المصحف المعلم - رواية ورش)',
      nameArShort: 'ورش - الحصري',
      nameEnFull: 'Mahmoud Khalil Al-Hussary (Warsh - Teacher)',
      nameEnShort: 'Warsh - Al-Hussary',
      nameFrFull: 'Mahmoud Khalil Al-Hussary (Warsh - Enseignant)',
      nameFrShort: 'Warsh - Al-Hussary',
      baseUrl: 'https://server13.mp3quran.net/husr/warsh/',
      folder: 'warsh'
    }
  ];

  // ==========================================
  // 2. LOCALIZATION DICTIONARY
  // ==========================================
  const I18N = {
    ar: {
      appTitle: 'المصحف المعلم - جزء عم',
      appSubtitle: 'تلاوات تعليمية مكررة لترسيخ الحفظ والتدبر | 37 سورة + الفاتحة',
      langBtn: 'العربية ▾',
      shortcuts: 'الاختصارات',
      about: 'حول البرنامج',
      stats: 'الإحصائيات',
      settingsBtn: 'الإعدادات والتحميل',
      playAll: 'تشغيل جزء عم كاملاً',
      playSelected: 'تشغيل المحدد ({0})',
      noSelection: 'لم يتم تحديد سور',
      selectionSummary: 'تم اختيار {0} من {1} سورة',
      selectAll: '☑ اختيار الكل',
      multiSelect: '📑 اختيار متعدد',
      singleSelect: '🎯 اختيار فردي',
      instantPlay: '⚡ تشغيل مباشر',
      reset: '🔄 إعادة ضبط',
      options: 'خيارات ▾',
      favorites: 'المفضلة',
      readingMode: 'المصحف والتفسير',
      search: 'بحث:',
      searchPlaceholder: 'اسم السورة أو رقمها...',
      surahDefaultTitle: 'اختر سورة للبدء',
      reciterBy: 'بصوت: {0}',
      ayahs: 'آيات',
      nowPlaying: 'جاري الاستماع الآن',
      readyStatus: 'جاهز للاستماع والتدبر',
      infoStatus: '38 سورة • الفاتحة وجزء عم',
      repeatNormal: 'بدون تكرار',
      repeatSurah: 'تكرار السورة',
      repeatList: 'تكرار الكل',
      speed: 'السرعة: {0}×',
      mute: 'كتم الصوت (M)',
      unmute: 'تشغيل الصوت',
      downloadOneReciter: 'تحميل جزء عم لهذا القارئ (38 سورة)',
      downloadAllReciters: 'تحميل جزء عم لجميع الـ 9 قراء (342 ملفاً)',
      downloadCancel: 'إلغاء التحميل',
      storageStatus: 'تم تخزين {0} من {1} ملفاً في الذاكرة المحلية',
      downloadFinished: 'اكتمل التحميل بنجاح!',
      downloadFinishedWithErrors: 'اكتمل التحميل مع تعذر {0} ملفاً.',
      downloadCancelled: 'تم إلغاء عملية التحميل.',
      downloading: 'جاري تحميل: {0}',
      downloadReady: 'جاهز للتحميل',
      clearCache: 'تفريغ الذاكرة',
      recordStart: '🎙 تسجيل التلاوة',
      recordStop: '⏹ إيقاف التسجيل',
      playRecord: 'استماع تسجيلك',
      mobileTabSurahs: 'السور',
      mobileTabMushaf: 'المصحف'
    },
    en: {
      appTitle: 'Teacher Quran - Juz Amma',
      appSubtitle: 'Educational recitations for memorization | 37 Surahs + Al-Fatihah',
      langBtn: 'English ▾',
      shortcuts: 'Shortcuts',
      about: 'About',
      stats: 'Statistics',
      settingsBtn: 'Settings & Downloads',
      playAll: 'Play Full Juz Amma',
      playSelected: 'Play Selected ({0})',
      noSelection: 'No surahs selected',
      selectionSummary: '{0} of {1} surahs selected',
      selectAll: '☑ Select All',
      multiSelect: '📑 Multi-Select',
      singleSelect: '🎯 Single Select',
      instantPlay: '⚡ Instant Play',
      reset: '🔄 Reset',
      options: 'Options ▾',
      favorites: 'Favorites',
      readingMode: 'Mushaf & Tafsir',
      search: 'Search:',
      searchPlaceholder: 'Surah name or number...',
      surahDefaultTitle: 'Select a surah to begin',
      reciterBy: 'Reciter: {0}',
      ayahs: 'Verses',
      nowPlaying: 'Now Playing',
      readyStatus: 'Ready for listening & memorization',
      infoStatus: '38 Surahs • Al-Fatihah & Juz Amma',
      repeatNormal: 'No Repeat',
      repeatSurah: 'Repeat Surah',
      repeatList: 'Repeat All',
      speed: 'Speed: {0}×',
      mute: 'Mute (M)',
      unmute: 'Unmute',
      downloadOneReciter: 'Download Juz Amma for this reciter (38 files)',
      downloadAllReciters: 'Download Juz Amma for all 9 reciters (342 files)',
      downloadCancel: 'Cancel Download',
      storageStatus: 'Stored {0} of {1} files in local offline cache',
      downloadFinished: 'Download completed successfully!',
      downloadFinishedWithErrors: 'Download finished, {0} files failed.',
      downloadCancelled: 'Download was cancelled.',
      downloading: 'Downloading: {0}',
      downloadReady: 'Ready to download',
      clearCache: 'Clear Storage',
      recordStart: '🎙 Record Voice',
      recordStop: '⏹ Stop Recording',
      playRecord: 'Play Your Recording',
      mobileTabSurahs: 'Surahs',
      mobileTabMushaf: 'Mushaf'
    },
    fr: {
      appTitle: 'Le Coran Enseignant - Juz Amma',
      appSubtitle: 'Récitations éducatives pour la mémorisation | 37 Sourates + Al-Fatiha',
      langBtn: 'Français ▾',
      shortcuts: 'Raccourcis',
      about: 'À propos',
      stats: 'Statistiques',
      settingsBtn: 'Paramètres & Téléchargements',
      playAll: 'Lire tout Juz Amma',
      playSelected: 'Lire la sélection ({0})',
      noSelection: 'Aucune sourate sélectionnée',
      selectionSummary: '{0} sur {1} sourates sélectionnées',
      selectAll: '☑ Tout sélectionner',
      multiSelect: '📑 Sélection multiple',
      singleSelect: '🎯 Sélection unique',
      instantPlay: '⚡ Lecture directe',
      reset: '🔄 Réinitialiser',
      options: 'Options ▾',
      favorites: 'Favoris',
      readingMode: 'Coran & Tafsir',
      search: 'Recherche :',
      searchPlaceholder: 'Nom ou numéro...',
      surahDefaultTitle: 'Sélectionnez une sourate',
      reciterBy: 'Récitateur : {0}',
      ayahs: 'Versets',
      nowPlaying: 'En cours de lecture',
      readyStatus: 'Prêt pour l\'écoute et la mémorisation',
      infoStatus: '38 Sourates • Al-Fatiha & Juz Amma',
      repeatNormal: 'Sans répétition',
      repeatSurah: 'Répéter la sourate',
      repeatList: 'Répéter tout',
      speed: 'Vitesse : {0}×',
      mute: 'Muet (M)',
      unmute: 'Activer le son',
      downloadOneReciter: 'Télécharger Juz Amma pour ce récitateur (38 fichiers)',
      downloadAllReciters: 'Télécharger pour les 9 récitateurs (342 fichiers)',
      downloadCancel: 'Annuler le téléchargement',
      storageStatus: '{0} sur {1} fichiers stockés hors-ligne',
      downloadFinished: 'Téléchargement terminé avec succès !',
      downloadFinishedWithErrors: 'Téléchargement terminé, {0} fichiers en échec.',
      downloadCancelled: 'Téléchargement annulé.',
      downloading: 'Téléchargement de : {0}',
      downloadReady: 'Prêt au téléchargement',
      clearCache: 'Effacer la mémoire',
      recordStart: '🎙 Enregistrer',
      recordStop: '⏹ Arrêter',
      playRecord: 'Écouter votre enregistrement',
      mobileTabSurahs: 'Sourates',
      mobileTabMushaf: 'Coran'
    }
  };

  // ==========================================
  // 3. APPLICATION STATE & PERSISTENCE
  // ==========================================
  const CACHE_NAME = 'quran-juz-amma-v1';

  // مصادر صور المصحف — التجويد أولاً وافتراضياً
  const MUSHAF_SOURCES = [
    {
      id: 'tajweed',
      label: '🎨 تجويد',
      urlFn: p => `https://www.islamicbook.ws/2/${p}.jpg`
    },
    {
      id: 'hefzmoyaser',
      label: '📗 الحفظ الميسر',
      urlFn: p => `https://newapi.hefzmoyaser.net/storage/mushaf_images/hafs/${p}.webp`
    },
    {
      id: 'aayaat',
      label: 'Aayaat',
      urlFn: p => `https://cdn.aayaat.net/storage/outputs/image/HafsK_Page${p}.png`
    },
    {
      id: 'yousefheiba',
      label: 'YH Pages',
      urlFn: p => `https://quran.yousefheiba.com/api/quran-pages/${String(p).padStart(3, '0')}.png`
    },
    {
      id: 'islamdb',
      label: 'Islam-DB',
      urlFn: p => `https://quran.islam-db.com/data/pages/quranpages_1024/images/page${String(p).padStart(3, '0')}.png`
    },
    {
      id: 'surahquran',
      label: 'SurahQ',
      urlFn: p => `https://surahquran.com/img/pages-quran/page${String(p).padStart(3, '0')}.png`
    },
    {
      id: 'maknon_hafs',
      label: 'مكنون حفص',
      urlFn: p => `https://raw.githubusercontent.com/maknon/Quran/refs/heads/main/pages-hafs/${p}.png`
    },
    {
      id: 'maknon_warsh',
      label: 'مكنون ورش',
      urlFn: p => `https://raw.githubusercontent.com/maknon/Quran/refs/heads/main/pages-warsh/${p}.png`
    },
    {
      id: 'govar',
      label: 'Govar',
      urlFn: p => `https://raw.githubusercontent.com/GovarJabbar/Quran-PNG/refs/heads/master/${String(p)}.png`
    }
  ];
  const MUSHAF_EDITIONS = MUSHAF_SOURCES.map(s => s.id);
  const TAFSIR_EDITIONS = ['muyassar', 'saadi', 'ibnkathir', 'baghawi', 'qurtubi', 'tabari', 'jalalayn', 'mokhtasar', 'waseet'];
  const FONT_SCALE = { min: 60, max: 200, step: 10, default: 100 };
  const MOBILE_BREAKPOINT = 860;
  const MUSHAF_TABS = ['image', 'text', 'info', 'tafsir', 'mindmap'];
  const QURAN_FONTS = {
    qcf4: "'QCF4_Hafs_45', 'QCF4_Hafs_46', 'QCF4_Hafs_47', 'QCF4_Hafs_01', 'QCF4_QBSML', 'Amiri Quran', serif",
    amiri: "'Amiri Quran', 'KFGQPC Uthmanic Script HAFS', 'Amiri', 'Traditional Arabic', serif",
    uthmanic: "'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', 'Traditional Arabic', serif",
    naskh: "'Uthman Naskh', 'Noto Naskh Arabic', Tahoma, sans-serif",
    mequran: "'ME Quran', 'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', serif",
    tajweed: "'tajweed_page_1', 'Amiri Quran', serif"
  };

  // قراءة آمنة من التخزين المحلي: أي قيمة تالفة تُستبدل بالقيمة الافتراضية
  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function pickAllowed(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
  }

  function clampFontScale(value) {
    const v = parseInt(value, 10);
    if (isNaN(v)) return FONT_SCALE.default;
    return Math.max(FONT_SCALE.min, Math.min(FONT_SCALE.max, v));
  }

  function createEmptyStats() {
    return { totalSeconds: 0, completedSurahs: 0, surahPlays: {}, reciterPlays: {}, surahSeconds: {}, lastPlayed: {} };
  }

  const state = {
    theme: localStorage.getItem('quran_theme') || 'calmBeige',
    lang: localStorage.getItem('quran_lang') || 'ar',
    reciterId: parseInt(localStorage.getItem('quran_reciter_id') || '1', 10),
    showFullName: localStorage.getItem('quran_show_fullname') !== 'false',
    selectionMode: localStorage.getItem('quran_selection_mode') || 'single',
    instantPlay: localStorage.getItem('quran_instant_play') !== 'false',
    volume: parseInt(localStorage.getItem('quran_volume') || '85', 10),
    lastNonZeroVolume: 85,
    repeatMode: parseInt(localStorage.getItem('quran_repeat_mode') || '0', 10),
    playbackSpeed: parseFloat(localStorage.getItem('quran_speed') || '1.0'),
    selectedSurahNumbers: new Set(),
    favorites: new Set(loadJson('quran_favorites', [])),
    filterFavorites: false,
    searchQuery: '',

    // عارض المصحف
    mushafZoom: 100,
    panX: 0,
    panY: 0,
    mushafPanelWidth: parseInt(localStorage.getItem('quran_mushaf_panel_width') || '650', 10),
    quranFont: pickAllowed(localStorage.getItem('quran_font_family'), Object.keys(QURAN_FONTS), 'qcf4'),
    quranFontScale: clampFontScale(localStorage.getItem('quran_font_scale')),
    preserveMushafLines: localStorage.getItem('quran_preserve_lines') !== 'false',
    enableBrowserCache: localStorage.getItem('quran_enable_browser_cache') !== 'false',
    autoCachePlayed: localStorage.getItem('quran_auto_cache_played') !== 'false',
    currentMushafTab: 'text', // 'image' | 'text' | 'info' | 'tafsir' | 'mindmap'
    currentMushafPage: 582,
    viewSurahNumber: null, // السورة المعروضة في عارض المصحف (قد تختلف عن السورة قيد التشغيل)
    mushafEdition: pickAllowed(localStorage.getItem('quran_mushaf_edition'), MUSHAF_EDITIONS, MUSHAF_EDITIONS[0]),
    tafsirEdition: pickAllowed(localStorage.getItem('quran_tafsir_edition'), TAFSIR_EDITIONS, 'muyassar'),
    wordSyncActive: localStorage.getItem('quran_word_sync') !== 'false',
    cardSize: localStorage.getItem('quran_card_size') || 'medium',
    uiSize: parseInt(localStorage.getItem('quran_ui_size') || '17', 10),
    darkImages: localStorage.getItem('quran_dark_images') !== 'false',
    autoAdvance: localStorage.getItem('quran_auto_advance') !== 'false',
    autoResume: localStorage.getItem('quran_auto_resume') !== 'false',

    // حالة التشغيل
    currentSurahNumber: null,
    isPlaying: false,
    playlist: [],
    playlistIndex: -1,

    // تسجيل صوت الطالب
    mediaRecorder: null,
    audioChunks: [],
    recordedBlobUrl: null,
    isRecording: false,
    recordTimerInterval: null,
    recordSeconds: 0,

    // التحميل أوفلاين
    isDownloading: false,
    downloadAbortController: null,
    cachedUrls: new Set(),

    // إحصائيات الاستماع
    stats: Object.assign(createEmptyStats(), loadJson('quran_listening_stats', {}))
  };

  // الآية والكلمة المظللتان حالياً في عارض المصحف (0 = لا شيء)
  let activeVerse = 0;
  let activeWord = 0;
  let activeSurah = null;
  // هل يتبع العارض موضع التلاوة؟ يتوقف عند التنقل اليدوي ويعود عند النقر على كلمة أو آية
  let followPlayback = true;

  // DOM Elements cache
  const dom = {};

  // ==========================================
  // 4. INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', initApp);

  async function initApp() {
    cacheDomElements();
    refreshMidadLinks();
    applyTheme(state.theme);
    applyUiSize(state.uiSize);
    applyDarkImages(state.darkImages);
    applyLanguage(state.lang);
    applyQuranFontFamily(state.quranFont);
    applyQuranFontScale();
    initMushafResizer();
    initMushafImageZoomAndPan();
    populateQuickNavSurahs();
    populateMushafEditionSelect();
    bindEvents();
    initAudioPlayer();

    // روابط مباشرة: ?surah=78&tab=tafsir
    const urlParams = new URLSearchParams(window.location.search);
    const requestedSurah = parseInt(urlParams.get('surah'), 10);
    const initialSurah = SURAHS.some(s => s.number === requestedSurah) ? requestedSurah : 1;
    const initialTab = pickAllowed(urlParams.get('tab') || localStorage.getItem('quran_mushaf_tab'), MUSHAF_TABS, 'text');

    loadSurahInMushaf(initialSurah);
    switchMushafTab(initialTab);

    if (isMobileView() && urlParams.has('tab')) {
      switchMobileView('mushaf');
    }

    await checkOfflineCacheStatus();
    renderSurahCards();
    checkSessionResume();
    updateStatus(t('readyStatus'));
  }

  function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function cacheDomElements() {
    dom.html = document.documentElement;
    dom.audio = document.getElementById('audioPlayer');
    dom.appTitle = document.getElementById('appTitle');
    dom.appSubtitle = document.getElementById('appSubtitle');
    dom.themePalette = document.getElementById('themePalette');
    dom.langMenuBtn = document.getElementById('langMenuBtn');
    dom.langBtnText = document.getElementById('langBtnText');
    dom.langDropdown = document.getElementById('langDropdown');
    dom.btnStats = document.getElementById('btnStats');
    dom.statsBtnText = document.getElementById('statsBtnText');
    dom.btnShortcuts = document.getElementById('btnShortcuts');
    dom.shortcutsBtnText = document.getElementById('shortcutsBtnText');
    dom.btnAbout = document.getElementById('btnAbout');
    dom.aboutBtnText = document.getElementById('aboutBtnText');
    dom.btnSettings = document.getElementById('btnSettings');
    dom.settingsBtnText = document.getElementById('settingsBtnText');

    dom.recitersList = document.getElementById('recitersList');

    dom.btnSelectAll = document.getElementById('btnSelectAll');
    dom.btnMultiSelect = document.getElementById('btnMultiSelect');
    dom.btnSingleSelect = document.getElementById('btnSingleSelect');
    dom.chkInstantPlay = document.getElementById('chkInstantPlay');
    dom.btnReset = document.getElementById('btnReset');
    dom.btnReadingMode = document.getElementById('btnReadingMode');
    dom.lblReadingMode = document.getElementById('lblReadingMode');
    dom.btnRecordVoice = document.getElementById('btnRecordVoice');
    dom.lblRecordVoice = document.getElementById('lblRecordVoice');
    dom.recordTimer = document.getElementById('recordTimer');
    dom.btnPlayRecording = document.getElementById('btnPlayRecording');
    dom.lblPlayRecording = document.getElementById('lblPlayRecording');

    dom.btnPlayMain = document.getElementById('btnPlayMain');
    dom.lblPlayMain = document.getElementById('lblPlayMain');
    dom.btnFilterFavorites = document.getElementById('btnFilterFavorites');
    dom.btnOptionsMenu = document.getElementById('btnOptionsMenu');
    dom.optionsDropdown = document.getElementById('optionsDropdown');
    dom.optSelectAll = document.getElementById('optSelectAll');
    dom.optDeselectAll = document.getElementById('optDeselectAll');
    dom.optInvertSelection = document.getElementById('optInvertSelection');
    dom.optPlaySelected = document.getElementById('optPlaySelected');
    dom.optDownloadSelected = document.getElementById('optDownloadSelected');
    dom.optOpenMindmap = document.getElementById('optOpenMindmap');
    dom.txtSearch = document.getElementById('txtSearch');
    dom.btnClearSearch = document.getElementById('btnClearSearch');
    dom.lblSelectionSummary = document.getElementById('lblSelectionSummary');

    // Session Resume
    dom.sessionResumeBanner = document.getElementById('sessionResumeBanner');
    dom.lblResumeText = document.getElementById('lblResumeText');
    dom.btnResumePlay = document.getElementById('btnResumePlay');
    dom.btnResumeDismiss = document.getElementById('btnResumeDismiss');

    // Mobile Navigation & Surahs Content Column
    dom.surahsContentColumn = document.getElementById('surahsContentColumn');
    dom.lblMobileTitle = document.getElementById('lblMobileTitle');
    dom.btnMobileTabSurahs = document.getElementById('btnMobileTabSurahs');
    dom.lblMobileTabSurahs = document.getElementById('lblMobileTabSurahs');
    dom.btnMobileTabMushaf = document.getElementById('btnMobileTabMushaf');
    dom.lblMobileTabMushaf = document.getElementById('lblMobileTabMushaf');
    dom.btnMobileThemeToggle = document.getElementById('btnMobileThemeToggle');
    dom.btnMobileSettingsToggle = document.getElementById('btnMobileSettingsToggle');

    // Workspace & Mushaf Panel
    dom.cardsViewport = document.getElementById('cardsViewport');
    dom.cardsGrid = document.getElementById('cardsGrid');
    dom.mushafResizer = document.getElementById('mushafResizer');
    dom.mushafSidePanel = document.getElementById('mushafSidePanel');
    dom.btnMaximizeMushaf = document.getElementById('btnMaximizeMushaf');

    dom.tabMushafImage = document.getElementById('tabMushafImage');
    dom.tabMushafText = document.getElementById('tabMushafText');
    dom.tabMushafInfo = document.getElementById('tabMushafInfo');
    dom.tabMushafTafsir = document.getElementById('tabMushafTafsir');
    dom.tabMushafMindmap = document.getElementById('tabMushafMindmap');

    dom.mushafPageControls = document.getElementById('mushafPageControls');
    dom.btnPagePrev = document.getElementById('btnPagePrev');
    dom.lblMushafPageNumber = document.getElementById('lblMushafPageNumber');
    dom.btnPageNext = document.getElementById('btnPageNext');
    dom.selMushafEdition = document.getElementById('selMushafEdition');

    // Zoom Controls
    dom.btnZoomOut = document.getElementById('btnZoomOut');
    dom.lblZoomPercent = document.getElementById('lblZoomPercent');
    dom.btnZoomIn = document.getElementById('btnZoomIn');
    dom.btnZoomReset = document.getElementById('btnZoomReset');

    dom.mushafFontControls = document.getElementById('mushafFontControls');
    dom.selQuranFontFamily = document.getElementById('selQuranFontFamily');
    dom.btnFontMinus = document.getElementById('btnFontMinus');
    dom.lblFontSizePercent = document.getElementById('lblFontSizePercent');
    dom.btnFontPlus = document.getElementById('btnFontPlus');
    dom.btnToggleMushafLines = document.getElementById('btnToggleMushafLines');

    dom.mushafQuickNav = document.getElementById('mushafQuickNav');
    dom.selQuickSurah = document.getElementById('selQuickSurah');
    dom.selQuickVerse = document.getElementById('selQuickVerse');
    dom.btnQuickPrevVerse = document.getElementById('btnQuickPrevVerse');
    dom.btnQuickNextVerse = document.getElementById('btnQuickNextVerse');
    dom.btnQuickSwitch = document.getElementById('btnQuickSwitch');
    dom.btnQuickFollow = document.getElementById('btnQuickFollow');
    dom.mushafSubBar = document.getElementById('mushafSubBar');
    dom.mushafPanelBody = document.getElementById('mushafPanelBody');

    dom.chkPreserveMushafLines = document.getElementById('chkPreserveMushafLines');
    dom.chkEnableBrowserCache = document.getElementById('chkEnableBrowserCache');
    dom.chkAutoCachePlayed = document.getElementById('chkAutoCachePlayed');

    dom.contentMushafImage = document.getElementById('contentMushafImage');
    dom.mushafImageWrapper = document.getElementById('mushafImageWrapper');
    dom.imgMushafPage = document.getElementById('imgMushafPage');
    dom.mushafLoadingSpinner = document.getElementById('mushafLoadingSpinner');

    dom.contentMushafText = document.getElementById('contentMushafText');
    dom.lblTextSurahTitle = document.getElementById('lblTextSurahTitle');
    dom.lblBasmala = document.getElementById('lblBasmala');
    dom.quranVersesContainer = document.getElementById('quranVersesContainer');
    dom.tajweedLegend = document.getElementById('tajweedLegend');
    dom.btnTajweedDetails = document.getElementById('btnTajweedDetails');
    dom.tajweedLegendDetails = document.getElementById('tajweedLegendDetails');

    dom.contentMushafInfo = document.getElementById('contentMushafInfo');
    dom.infoSurahTitle = document.getElementById('infoSurahTitle');
    dom.pillRevelation = document.getElementById('pillRevelation');
    dom.pillOrder = document.getElementById('pillOrder');
    dom.pillAyahs = document.getElementById('pillAyahs');
    dom.pillPage = document.getElementById('pillPage');
    dom.lblSurahOverview = document.getElementById('lblSurahOverview');
    dom.lblSurahTopics = document.getElementById('lblSurahTopics');

    dom.contentMushafTafsir = document.getElementById('contentMushafTafsir');
    dom.lblTafsirSurahTitle = document.getElementById('lblTafsirSurahTitle');
    dom.tafsirVersesList = document.getElementById('tafsirVersesList');

    dom.contentMushafMindmap = document.getElementById('contentMushafMindmap');
    dom.lblMindmapTitle = document.getElementById('lblMindmapTitle');
    dom.mindmapTopicsFlow = document.getElementById('mindmapTopicsFlow');
    dom.btnPrintSurahEncyclopedia = document.getElementById('btnPrintSurahEncyclopedia');
    dom.encyclopediaPrintRoot = document.getElementById('encyclopediaPrintRoot');

    // Player Island
    dom.playerIslandWrapper = document.getElementById('playerIslandWrapper');
    dom.lblCurrentTime = document.getElementById('lblCurrentTime');
    dom.seekSlider = document.getElementById('seekSlider');
    dom.seekSliderFill = document.getElementById('seekSliderFill');
    dom.lblTotalTime = document.getElementById('lblTotalTime');
    dom.lblNowPlayingSurah = document.getElementById('lblNowPlayingSurah');
    dom.lblNowPlayingReciter = document.getElementById('lblNowPlayingReciter');
    dom.btnPrev = document.getElementById('btnPrev');
    dom.btnPlayPause = document.getElementById('btnPlayPause');
    dom.svgPlay = document.getElementById('svgPlay');
    dom.svgPause = document.getElementById('svgPause');
    dom.btnStop = document.getElementById('btnStop');
    dom.btnNext = document.getElementById('btnNext');
    dom.btnRepeat = document.getElementById('btnRepeat');
    dom.repeatBadge = document.getElementById('repeatBadge');
    dom.btnSpeed = document.getElementById('btnSpeed');
    dom.lblSpeed = document.getElementById('lblSpeed');
    dom.btnMute = document.getElementById('btnMute');
    dom.selDefaultSpeed = document.getElementById('selDefaultSpeed');
    dom.muteIcon = document.getElementById('muteIcon');
    dom.volumeSlider = document.getElementById('volumeSlider');
    dom.volumeSliderFill = document.getElementById('volumeSliderFill');
    dom.lblVolumePercent = document.getElementById('lblVolumePercent');

    // Status Bar
    dom.lblStatus = document.getElementById('lblStatus');
    dom.lblInfo = document.getElementById('lblInfo');

    // Modals
    dom.statTotalMinutes = document.getElementById('statTotalMinutes');
    dom.statCompletedCount = document.getElementById('statCompletedCount');
    dom.statTopSurah = document.getElementById('statTopSurah');
    dom.statTopReciter = document.getElementById('statTopReciter');
    dom.statsTableBody = document.getElementById('statsTableBody');
    dom.btnResetStats = document.getElementById('btnResetStats');

    dom.recordedAudioElement = document.getElementById('recordedAudioElement');
    dom.btnDownloadRecording = document.getElementById('btnDownloadRecording');

    dom.selTheme = document.getElementById('selTheme');
    dom.selLang = document.getElementById('selLang');
    dom.rbFullName = document.getElementById('rbFullName');
    dom.rbShortName = document.getElementById('rbShortName');

    dom.lblStorageStatus = document.getElementById('lblStorageStatus');
    dom.downloadProgressBar = document.getElementById('downloadProgressBar');
    dom.downloadCurrentFile = document.getElementById('downloadCurrentFile');
    dom.downloadPercent = document.getElementById('downloadPercent');
    dom.btnDownloadCurrentReciter = document.getElementById('btnDownloadCurrentReciter');
    dom.btnDownloadAllReciters = document.getElementById('btnDownloadAllReciters');
    dom.btnCancelDownload = document.getElementById('btnCancelDownload');
    dom.btnClearOfflineCache = document.getElementById('btnClearOfflineCache');

    dom.selTafsirEdition = document.getElementById('selTafsirEdition');
    dom.selCardSize = document.getElementById('selCardSize');
    dom.selUiSize = document.getElementById('selUiSize');
    dom.chkDarkImages = document.getElementById('chkDarkImages');
    dom.chkAutoAdvance = document.getElementById('chkAutoAdvance');
    dom.chkAutoResume = document.getElementById('chkAutoResume');
    dom.chkWordSyncActive = document.getElementById('chkWordSyncActive');
  }

  function t(key, ...args) {
    const langDict = I18N[state.lang] || I18N.ar;
    let text = langDict[key] || I18N.ar[key] || key;
    args.forEach((val, i) => {
      text = text.replace(new RegExp(`\\{${i}\\}`, 'g'), val);
    });
    return text;
  }

  function getReciterDisplayName(reciter) {
    if (!reciter) return '';
    const isMobile = window.innerWidth <= 860;
    if (state.lang === 'en') {
      return (state.showFullName && !isMobile) ? reciter.nameEnFull : reciter.nameEnShort;
    }
    if (state.lang === 'fr') {
      return (state.showFullName && !isMobile) ? reciter.nameFrFull : reciter.nameFrShort;
    }
    return (state.showFullName && !isMobile) ? reciter.nameArFull : reciter.nameArShort;
  }

  function getSurahName(surah) {
    if (!surah) return '';
    if (state.lang === 'en') return `Surah ${surah.nameEn}`;
    if (state.lang === 'fr') return `Sourate ${surah.nameFr}`;
    return `سورة ${surah.nameAr}`;
  }

  // ==========================================
  // 5. THEME MANAGEMENT
  // ==========================================
  function applyTheme(themeName) {
    state.theme = themeName;
    localStorage.setItem('quran_theme', themeName);
    dom.html.setAttribute('data-theme', themeName);

    document.querySelectorAll('.theme-swatch').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-name') === themeName);
    });

    if (dom.selTheme) dom.selTheme.value = themeName;
  }

  function cycleTheme() {
    const themes = ['midnight', 'islamicEmerald', 'warmAmber', 'royalBlue', 'pearlLight', 'calmBeige'];
    const nextIdx = (themes.indexOf(state.theme) + 1) % themes.length;
    applyTheme(themes[nextIdx]);
  }

  // حجم خط البرنامج العام (يكبّر/يصغّر الواجهة كاملة عبر جذر الصفحة)
  function applyUiSize(size) {
    let px = parseInt(size, 10);
    if (isNaN(px)) px = 17;
    px = Math.max(13, Math.min(26, px));
    state.uiSize = px;
    localStorage.setItem('quran_ui_size', String(px));
    dom.html.style.fontSize = `${px}px`;
    if (dom.selUiSize) dom.selUiSize.value = String(px);
  }

  // تغميق صور المصحف داخل الثيمات الغامقة
  function applyDarkImages(enabled) {
    state.darkImages = !!enabled;
    localStorage.setItem('quran_dark_images', String(state.darkImages));
    dom.html.classList.toggle('no-dark-images', !state.darkImages);
    if (dom.chkDarkImages) dom.chkDarkImages.checked = state.darkImages;
  }

  // ==========================================
  // 6. LANGUAGE MANAGEMENT
  // ==========================================
    // ==========================================
  // MOBILE NAVIGATION CONTROLLER
  // ==========================================
  function switchMobileView(viewName) {
    const appContainer = document.getElementById('appContainer');
    if (!appContainer) return;
    appContainer.setAttribute('data-mobile-view', viewName);

    if (dom.btnMobileTabSurahs) {
      dom.btnMobileTabSurahs.classList.toggle('active', viewName === 'surahs');
    }
    if (dom.btnMobileTabMushaf) {
      dom.btnMobileTabMushaf.classList.toggle('active', viewName === 'mushaf');
    }
  }

function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('quran_lang', lang);
    const isAr = (lang === 'ar');

    dom.html.setAttribute('lang', lang);
    dom.html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Header Texts
    dom.appTitle.textContent = t('appTitle');
    dom.appSubtitle.textContent = t('appSubtitle');
    dom.langBtnText.textContent = t('langBtn');
    dom.shortcutsBtnText.textContent = t('shortcuts');
    dom.aboutBtnText.textContent = t('about');
    dom.statsBtnText.textContent = t('stats');
    dom.settingsBtnText.textContent = t('settingsBtn');

    // Toolbar Texts
    document.getElementById('lblSelectAll').textContent = t('selectAll');
    document.getElementById('lblMultiSelect').textContent = t('multiSelect');
    document.getElementById('lblSingleSelect').textContent = t('singleSelect');
    document.getElementById('lblInstantPlay').textContent = t('instantPlay');
    document.getElementById('lblReset').textContent = t('reset');
    document.getElementById('lblFavorites').textContent = t('favorites');
    dom.lblReadingMode.textContent = t('readingMode');
    dom.lblRecordVoice.textContent = state.isRecording ? t('recordStop') : t('recordStart');
    dom.lblPlayRecording.textContent = t('playRecord');
    document.getElementById('lblOptionsMenu').textContent = t('options');
    document.getElementById('lblSearch').textContent = t('search');
    dom.txtSearch.placeholder = t('searchPlaceholder');

    const isFr = (lang === 'fr');
    const tr = (ar, en, fr) => isAr ? ar : (isFr ? fr : en);

    // Options menu
    document.getElementById('optSelectAll').textContent = t('selectAll');
    document.getElementById('optDeselectAll').textContent = tr('☒ إلغاء تحديد الكل', '☒ Deselect All', '☒ Tout désélectionner');
    document.getElementById('optInvertSelection').textContent = tr('🔄 عكس التحديد', '🔄 Invert Selection', '🔄 Inverser la sélection');
    document.getElementById('optPlaySelected').textContent = tr('▶ تشغيل السور المحددة', '▶ Play Selected Surahs', '▶ Lire les sourates sélectionnées');
    document.getElementById('optDownloadSelected').textContent = tr('📥 تحميل السور المحددة أوفلاين', '📥 Download Selected Offline', '📥 Télécharger la sélection hors-ligne');
    document.getElementById('optOpenMindmap').textContent = tr('📚 فتح موسوعات السورة', '📚 Open Surah Encyclopedia', '📚 Ouvrir l’encyclopédie de la sourate');

    // Mushaf Tabs & Quick Navigation
    if (dom.tabMushafImage) dom.tabMushafImage.textContent = tr('🖼️ صفحة المصحف', '🖼️ Mushaf Page', '🖼️ Page du Mushaf');
    if (dom.tabMushafText) dom.tabMushafText.textContent = tr('📜 الرسم العثماني', '📜 Uthmani Script', '📜 Texte Othmani');
    if (dom.tabMushafInfo) dom.tabMushafInfo.textContent = tr('ℹ️ مقاصد السورة', 'ℹ️ Surah Info', 'ℹ️ Infos Sourate');
    if (dom.tabMushafTafsir) dom.tabMushafTafsir.textContent = tr('📚 التفاسير', '📚 Tafsir', '📚 Tafsir');
    if (dom.tabMushafMindmap) dom.tabMushafMindmap.textContent = tr('📚 الموسوعات', '📚 Encyclopedia', '📚 Encyclopédie');
    if (dom.btnPrintSurahEncyclopedia) dom.btnPrintSurahEncyclopedia.textContent = tr('🖨️ طباعة الموسوعة PDF', '🖨️ Print Encyclopedia PDF', '🖨️ Imprimer l’encyclopédie PDF');
    if (dom.btnPagePrev) dom.btnPagePrev.textContent = tr('◀ السابقة', '◀ Prev', '◀ Préc.');
    if (dom.btnPageNext) dom.btnPageNext.textContent = tr('التالية ▶', 'Next ▶', 'Suiv. ▶');
    if (dom.btnQuickPrevVerse) dom.btnQuickPrevVerse.textContent = tr('◀ السابقة', '◀ Prev', '◀ Préc.');
    if (dom.btnQuickNextVerse) dom.btnQuickNextVerse.textContent = tr('التالية ▶', 'Next ▶', 'Suiv. ▶');
    if (dom.btnQuickFollow) dom.btnQuickFollow.textContent = tr('🎯 تتبع التلاوة', '🎯 Follow Audio', '🎯 Suivre l’audio');

    // Modals & Settings Localization
    const modalMap = {
      statsTitle: ['📊 إحصائيات الاستماع والإنجاز', '📊 Listening Statistics & Progress', '📊 Statistiques d’écoute et progrès'],
      btnResetStats: ['تصفير الإحصائيات', 'Reset Statistics', 'Réinitialiser les statistiques'],
      shortcutsTitle: ['⌨️ اختصارات لوحة المفاتيح', '⌨️ Keyboard Shortcuts', '⌨️ Raccourcis clavier'],
      scPlayPause: ['تشغيل / إيقاف مؤقت', 'Play / Pause', 'Lecture / Pause'],
      scNextPrev: ['السورة التالية / السابقة', 'Next / Previous Surah', 'Sourate suivante / précédente'],
      scVolume: ['رفع / خفض مستوى الصوت', 'Volume Up / Down', 'Augmenter / Baisser le volume'],
      scMute: ['كتم / استعادة الصوت', 'Mute / Unmute', 'Activer / Couper le son'],
      scRepeat: ['تبديل نمط التكرار (سورة / كل / لا)', 'Cycle Repeat Mode (Surah / All / Off)', 'Mode de répétition (Sourate / Tout / Non)'],
      scSelectAll: ['تحديد جميع سور جزء عم', 'Select All Surahs', 'Sélectionner toutes les sourates'],
      scDeselectAll: ['إلغاء تحديد كل السور', 'Deselect All Surahs', 'Tout désélectionner'],
      scSingleMode: ['نمط الاختيار الفردي', 'Single-Select Mode', 'Mode sélection unique'],
      scMultiMode: ['نمط الاختيار المتعدد', 'Multi-Select Mode', 'Mode sélection multiple'],
      scReset: ['إعادة ضبط كامل للبرنامج (عدا التحميلات)', 'Full Reset (keeps downloads)', 'Réinitialisation complète (hors téléchargements)'],
      scTheme: ['تبديل ألوان الثيم (6 ثيمات)', 'Cycle Theme (6 themes)', 'Changer de thème (6 thèmes)'],
      scLang: ['تغيير لغة البرنامج', 'Cycle Interface Language', 'Changer la langue'],
      scHelp: ['عرض نافذة الاختصارات', 'Show Shortcuts Dialog', 'Afficher les raccourcis'],
      scClose: ['إغلاق النوافذ المنبثقة وعارض المصحف', 'Close Modals / Mushaf Viewer', 'Fermer les fenêtres et le Mushaf'],
      btnShortcutsClose: ['إغلاق', 'Close', 'Fermer'],
      aboutTitle: ['المصحف المعلم - جزء عم', 'Teacher Quran - Juz Amma', 'Le Coran Enseignant - Juz Amma'],
      aboutVersion: ['الإصدار 2.7.0', 'Version 2.7.0', 'Version 2.7.0'],
      aboutDesc: [
        'برنامج قرآني تعليمي تفاعلي لجزء عم كاملاً (37 سورة) مع سورة الفاتحة بتسعة من كبار القراء المعلمين، يتيح الاستماع والتكرار لترسيخ الحفظ، وعارض المصحف الشريف والتفاسير، مع تسجيل صوت الطالب ومقارنته بالمعلم، والتحميل للاستخدام دون اتصال، مع تحكم سلس ودعم كامل للغات والثيمات المتعددة.',
        'Interactive educational Quran application for full Juz Amma (37 Surahs) plus Al-Fatihah with 9 renowned teacher reciters, featuring word-by-word sync, Mushaf & Tafsir viewer, student voice recording, and offline caching.',
        'Application éducative interactive du Coran pour tout Juz Amma (37 sourates) et Al-Fatiha avec 9 récitateurs enseignants, synchronisation mot à mot, visionneuse du Mushaf et Tafsir, enregistrement vocal et mode hors-ligne.'
      ],
      creditsHeader: ['✨ تم التطوير والبرمجة بواسطة:', '✨ Developed & Programmed by:', '✨ Développé et programmé par :'],
      aboutRecitersTitle: ['🎙 القراء المعلمون (9 قراء معلمين):', '🎙 Teacher Reciters (9 Reciters):', '🎙 Récitateurs enseignants (9 récitateurs) :'],
      btnAboutClose: ['إغلاق', 'Close', 'Fermer'],
      settingsTitle: ['⚙️ خيارات البرنامج وإعدادات التلاوة والتحميل', '⚙️ Application, Audio & Offline Settings', '⚙️ Paramètres de l’application, audio et hors-ligne'],
      tabSetGeneral: ['🎨 المظهر واللغة', '🎨 Appearance & Language', '🎨 Apparence & Langue'],
      tabSetCustom: ['📐 تخصيص الواجهة', '📐 UI Customization', '📐 Personnalisation'],
      tabSetAudio: ['🎙️ التلاوة والصوت', '🎙️ Audio & Playback', '🎙️ Audio & Lecture'],
      tabSetDownloads: ['📥 تحميل الأوفلاين', '📥 Offline Downloads', '📥 Téléchargements'],
      legendGeneral: ['المظهر والألوان', 'Appearance & Themes', 'Apparence et thèmes'],
      lblSettingTheme: ['الثيم اللوني المفضل:', 'Preferred Color Theme:', 'Thème de couleur préféré :'],
      lblSettingLang: ['لغة الواجهة:', 'Interface Language:', 'Langue de l’interface :'],
      legendNameFormat: ['صيغة عرض أسماء القراء في الشريط العلوي', 'Reciter Name Display Format', 'Format d’affichage du nom des récitateurs'],
      lblShowFullNameOption: ['عرض الاسم الكامل للقارئ (مثال: محمد صديق المنشاوي)', 'Show full reciter name (e.g., Muhammad Siddiq Al-Minshawi)', 'Afficher le nom complet du récitateur'],
      lblShowTitleOnlyOption: ['عرض اللقب فقط (مثال: المنشاوي)', 'Show short title only (e.g., Al-Minshawi)', 'Afficher uniquement le titre court'],
      legendMushafLines: ['📖 خيارات خط وعرض المصحف (QCF4)', '📖 Mushaf Layout & Font Options (QCF4)', '📖 Options d’affichage du Mushaf (QCF4)'],
      lblPreserveMushafLines: ['الحفاظ على صفحات المصحف في النص القرآني (QCF4) — 15 سطراً للصفحة كما في مصحف مجمع الملك فهد', 'Preserve 15-line King Fahd Complex Mushaf page layout (QCF4)', 'Conserver la mise en page de 15 lignes du Mushaf (QCF4)'],
      legendCardSize: ['حجم بطاقات السور في القائمة', 'Surah Card Size in Grid', 'Taille des cartes de sourates'],
      legendUiImprovements: ['🖥️ تحسينات العرض والقراءة', '🖥️ Display & Reading Enhancements', '🖥️ Améliorations d’affichage'],
      lblUiSize: ['حجم خط البرنامج بشكل عام:', 'Overall UI Font Size:', 'Taille globale de la police :'],
      lblDarkImages: ['تغميق صور المصحف تلقائياً عند تفعيل الثيمات الغامقة', 'Automatically dim Mushaf page images in dark themes', 'Assombrir les images du Mushaf avec les thèmes sombres'],
      legendToolbarBtns: ['أزرار شريط الأدوات الرئيسي (تفعيل / إخفاء)', 'Main Toolbar Buttons (Show / Hide)', 'Boutons de la barre d’outils (Afficher / Masquer)'],
      legendAudioOptions: ['خيارات الاستماع والتقديم التلقائي', 'Playback & Auto-Advance Options', 'Options de lecture et d’avance automatique'],
      lblAutoAdvance: ['الانتقال التلقائي للسورة التالية عند انتهاء التلاوة', 'Automatically advance to next surah when playback ends', 'Passer automatiquement à la sourate suivante'],
      lblAutoResume: ['حفظ موضع الاستماع الأخير وعرض شريط المتابعة التلقائية', 'Save last playback position and show resume banner', 'Enregistrer la dernière position d’écoute'],
      lblWordSyncActive: ['تفعيل المزامنة اللحظية للكلمات والآيات أثناء التلاوة', 'Enable real-time word and verse highlighting during playback', 'Activer la synchronisation mot à mot en temps réel'],
      legendBrowserCache: ['⚡ خيارات التخزين المؤقت في المتصفح (Offline Cache)', '⚡ Browser Offline Cache Options', '⚡ Options du cache hors-ligne'],
      lblEnableBrowserCache: ['تفعيل الذاكرة المؤقتة للمتصفح للاستماع والتصفح بدون إنترنت (Offline Cache)', 'Enable browser cache for offline listening and browsing', 'Activer le cache du navigateur pour le mode hors-ligne'],
      lblAutoCachePlayed: ['حفظ تلقائي لجميع ما يتم الاستماع إليه أو قراءته في ذاكرة المتصفح للرجوع إليه أوفلاين', 'Automatically cache played audio and viewed pages for offline use', 'Mettre automatiquement en cache les fichiers écoutés'],
      legendDownloads: ['مدير تحميل وحفظ تلاوات جزء عم في ذاكرة المتصفح', 'Juz Amma Offline Audio Download Manager', 'Gestionnaire de téléchargement hors-ligne de Juz Amma'],
      btnSettingsClose: ['إغلاق', 'Close', 'Fermer']
    };
    for (const [id, texts] of Object.entries(modalMap)) {
      const el = document.getElementById(id);
      if (el) el.textContent = tr(texts[0], texts[1], texts[2]);
    }

    // Downloader Dialog Texts
    document.getElementById('lblDownloadOneReciter').textContent = t('downloadOneReciter');
    document.getElementById('lblDownloadAllReciters').textContent = t('downloadAllReciters');
    document.getElementById('lblDownloadCancel').textContent = t('downloadCancel');
    document.getElementById('lblClearCache').textContent = t('clearCache');

    dom.lblInfo.textContent = t('infoStatus');
    if (dom.selLang) dom.selLang.value = lang;
    if (dom.lblMobileTabSurahs) dom.lblMobileTabSurahs.textContent = t('mobileTabSurahs');
    if (dom.lblMobileTabMushaf) dom.lblMobileTabMushaf.textContent = t('mobileTabMushaf');
    if (dom.lblMobileTitle) dom.lblMobileTitle.textContent = t('appTitle').split('-')[0].trim();

    updateSelectionToolbar();
    renderRecitersBar();
    renderSurahCards();
    updateNowPlayingInfo();
    updateStatus(t('readyStatus'));
  }

  function cycleLanguage() {
    const langs = ['ar', 'en', 'fr'];
    const nextIdx = (langs.indexOf(state.lang) + 1) % langs.length;
    applyLanguage(langs[nextIdx]);
  }

  // ==========================================
  // 7. RECITERS SELECTOR BAR
  // ==========================================
  function renderRecitersBar() {
    dom.recitersList.innerHTML = '';

    RECITERS.forEach(reciter => {
      const card = document.createElement('div');
      card.className = `reciter-card ${reciter.id === state.reciterId ? 'active' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-id', reciter.id);

      const info = document.createElement('div');
      info.className = 'reciter-info';
      const name = document.createElement('span');
      name.className = 'reciter-name';
      name.textContent = getReciterDisplayName(reciter);
      const tag = document.createElement('span');
      tag.className = 'reciter-tag';
      tag.textContent = (state.lang === 'ar') ? 'المصحف المعلم' : ((state.lang === 'fr') ? 'Coran Enseignant' : 'Teacher Quran');
      info.appendChild(name);
      info.appendChild(tag);

      card.appendChild(info);

      card.addEventListener('click', () => selectReciter(reciter.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectReciter(reciter.id);
        }
      });

      dom.recitersList.appendChild(card);
    });
  }

  function selectReciter(reciterId) {
    if (state.reciterId === reciterId) return;

    // نلتقط موضع التشغيل والكلمة الحالية قبل تغيير القارئ
    const hasActiveAudio = state.currentSurahNumber !== null;
    const wasPlaying = state.isPlaying;
    const oldTimeSec = hasActiveAudio ? (dom.audio.currentTime || 0) : 0;
    const keepWord = hasActiveAudio && state.viewSurahNumber === state.currentSurahNumber && activeVerse > 0;

    state.reciterId = reciterId;
    localStorage.setItem('quran_reciter_id', reciterId);

    const newReciter = getCurrentReciter();
    updateStatus((state.lang === 'ar' ? 'تم اختيار: ' : 'Selected: ') + getReciterDisplayName(newReciter));

    document.querySelectorAll('.reciter-card').forEach(c => {
      c.classList.toggle('active', parseInt(c.getAttribute('data-id'), 10) === reciterId);
    });

    updateNowPlayingInfo();

    if (!hasActiveAudio) return;

    // نفس الكلمة عند القارئ الجديد، وإلا نفس الموضع الزمني
    const wordSec = keepWord ? getWordStartSeconds(state.currentSurahNumber, activeVerse, activeWord, newReciter, 0) : null;
    const startPos = (wordSec !== null) ? wordSec : oldTimeSec;
    const autoplay = wasPlaying || state.instantPlay;
    loadAudio(state.currentSurahNumber, startPos, autoplay, wordSec !== null);
  }

  function getCurrentReciter() {
    return RECITERS.find(r => r.id === state.reciterId) || RECITERS[0];
  }

  // ==========================================
  // 8. SURAH CARDS GRID & RENDERING
  // ==========================================
  function renderSurahCards() {
    dom.cardsGrid.innerHTML = '';
    const filteredSurahs = getFilteredSurahs();

    if (filteredSurahs.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary); font-size: 1rem;';
      emptyMsg.textContent = (state.lang === 'ar') ? 'لا توجد سور مطابقة لخيارات البحث أو المفضلة' : 'No matching surahs found';
      dom.cardsGrid.appendChild(emptyMsg);
      return;
    }

    filteredSurahs.forEach(surah => {
      const isSelected = state.selectedSurahNumbers.has(surah.number);
      const isPlaying = (state.currentSurahNumber === surah.number && state.isPlaying);
      const isFav = state.favorites.has(surah.number);
      const isCached = isSurahCached(surah.number);

      const card = document.createElement('div');
      card.className = `surah-card ${isSelected ? 'selected' : ''} ${isPlaying ? 'playing' : ''} ${isFav ? 'is-favorite' : ''}`;
      card.setAttribute('data-number', surah.number);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${getSurahName(surah)}, ${surah.ayahs} ${t('ayahs')}`);

      // Row 1: Header (Number Badge + State Icon / Fav Star)
      const headerRow = document.createElement('div');
      headerRow.className = 'card-header-row';

      const numBadge = document.createElement('span');
      numBadge.className = 'surah-num-badge';
      numBadge.textContent = surah.number;

      const rightIcons = document.createElement('div');
      rightIcons.style.display = 'flex';
      rightIcons.style.alignItems = 'center';
      rightIcons.style.gap = '4px';

      // Favorite button
      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'card-fav-btn';
      favBtn.title = isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
      favBtn.textContent = isFav ? '★' : '☆';
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(surah.number);
      });
      rightIcons.appendChild(favBtn);

      // Selection or Playing Icon
      if (isPlaying) {
        const playIcon = document.createElement('span');
        playIcon.className = 'card-state-icon';
        playIcon.textContent = '▶';
        rightIcons.appendChild(playIcon);
      } else if (isSelected) {
        const checkIcon = document.createElement('span');
        checkIcon.className = 'card-state-icon';
        checkIcon.textContent = '✓';
        rightIcons.appendChild(checkIcon);
      }

      headerRow.appendChild(numBadge);
      headerRow.appendChild(rightIcons);

      // Row 2: Title (Calligraphy Image with Fallback)
      const titleRow = document.createElement('div');
      titleRow.className = 'card-title-row';

      const formattedNumber = String(surah.number).padStart(3, '0');
      const imgPath = `Assets/SurahTitles/${formattedNumber}.png`;

      const img = document.createElement('img');
      img.className = 'surah-calligraphy-img';
      img.src = imgPath;
      img.alt = surah.nameAr;
      img.loading = 'lazy';
      img.onerror = () => {
        img.remove();
        const textSpan = document.createElement('span');
        textSpan.className = 'surah-text-title';
        textSpan.textContent = surah.nameAr;
        titleRow.appendChild(textSpan);
      };
      titleRow.appendChild(img);

      // Row 3: Bottom Info (Ayah count or Now Playing)
      const infoRow = document.createElement('div');
      infoRow.className = 'card-info-row';

      const ayahLabel = document.createElement('span');
      ayahLabel.className = 'ayah-count-label';
      if (isPlaying) {
        ayahLabel.textContent = `▶ ${t('nowPlaying')}`;
      } else {
        ayahLabel.textContent = `${surah.ayahs} ${t('ayahs')}`;
      }
      infoRow.appendChild(ayahLabel);

      if (isCached) {
        const offlineDot = document.createElement('span');
        offlineDot.className = 'offline-dot';
        offlineDot.title = 'محملة للاستماع أوفلاين';
        infoRow.appendChild(offlineDot);
      }

      card.appendChild(headerRow);
      card.appendChild(titleRow);
      card.appendChild(infoRow);

      card.addEventListener('click', () => handleCardClick(surah.number));
      card.addEventListener('dblclick', () => { if (!state.instantPlay) playSurah(surah.number); });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCardClick(surah.number);
        else if (e.key === ' ') { e.preventDefault(); playSurah(surah.number); }
      });

      dom.cardsGrid.appendChild(card);
    });
  }

  function handleCardClick(surahNumber) {
    // في نمط الاختيار المتعدد: النقر يضيف/يزيل السورة من التحديد فقط دون تشغيل
    if (state.selectionMode === 'multi') {
      toggleCardSelection(surahNumber);
      loadSurahInMushaf(surahNumber);
      return;
    }

    // نمط الاختيار الفردي
    if (state.instantPlay) {
      state.selectedSurahNumbers.clear();
      state.selectedSurahNumbers.add(surahNumber);
      updateSelectionToolbar();
      playSurah(surahNumber);
    } else {
      toggleCardSelection(surahNumber);
      loadSurahInMushaf(surahNumber);
    }
  }

  function toggleCardSelection(surahNumber) {
    if (state.selectionMode === 'single') {
      if (state.selectedSurahNumbers.has(surahNumber)) {
        state.selectedSurahNumbers.clear();
      } else {
        state.selectedSurahNumbers.clear();
        state.selectedSurahNumbers.add(surahNumber);
      }
    } else {
      if (state.selectedSurahNumbers.has(surahNumber)) {
        state.selectedSurahNumbers.delete(surahNumber);
      } else {
        state.selectedSurahNumbers.add(surahNumber);
      }
    }
    updateSelectionToolbar();
    renderSurahCards();
  }

  function toggleFavorite(surahNumber) {
    if (state.favorites.has(surahNumber)) {
      state.favorites.delete(surahNumber);
    } else {
      state.favorites.add(surahNumber);
    }
    localStorage.setItem('quran_favorites', JSON.stringify(Array.from(state.favorites)));
    renderSurahCards();
  }

  function getFilteredSurahs() {
    let list = SURAHS;

    if (state.filterFavorites) {
      list = list.filter(s => state.favorites.has(s.number));
    }

    if (state.searchQuery) {
      const q = state.searchQuery.trim().toLowerCase()
        .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))      // ٠-٩ → 0-9
        .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06F0));     // ۰-۹ → 0-9
      const normalizeAr = (str) => {
        return str
          .replace(/[أإآ]/g, 'ا')
          .replace(/ة/g, 'ه')
          .replace(/ى/g, 'ي')
          .replace(/[\u064B-\u065F]/g, '');
      };
      const qNorm = normalizeAr(q);

      list = list.filter(s => {
        const numMatch = s.number.toString().includes(q);
        const arNorm = normalizeAr(s.nameAr);
        const arMatch = arNorm.includes(qNorm);
        const enMatch = (s.nameEn || '').toLowerCase().includes(q);
        const frMatch = (s.nameFr || '').toLowerCase().includes(q);
        return numMatch || arMatch || enMatch || frMatch;
      });
    }

    return list;
  }

  // ==========================================
  // 9. TOOLBAR & SELECTION
  // ==========================================
  function setSelectionMode(mode) {
    state.selectionMode = mode;
    localStorage.setItem('quran_selection_mode', mode);
    dom.btnSingleSelect.classList.toggle('active-mode', mode === 'single');
    dom.btnMultiSelect.classList.toggle('active-mode', mode === 'multi');
    updateSelectionToolbar();
  }

  function selectAllSurahs() {
    state.selectedSurahNumbers = new Set(SURAHS.map(s => s.number));
    setSelectionMode('multi');
    updateSelectionToolbar();
    renderSurahCards();
  }

  function deselectAllSurahs() {
    state.selectedSurahNumbers.clear();
    updateSelectionToolbar();
    renderSurahCards();
  }

  function invertSelection() {
    const inverted = new Set();
    SURAHS.forEach(s => {
      if (!state.selectedSurahNumbers.has(s.number)) {
        inverted.add(s.number);
      }
    });
    state.selectedSurahNumbers = inverted;
    setSelectionMode('multi');
    updateSelectionToolbar();
    renderSurahCards();
  }

  // إعادة ضبط شاملة: البرنامج والعرض وكل المحفوظ في المتصفح — عدا التحميلات الأوفلاين
  function fullReset() {
    if (!confirm('سيتم إعادة ضبط البرنامج بالكامل: المظهر واللغة والإعدادات والمفضلة والإحصائيات ومواضع الاستماع ونسبة العرض. لن تُحذف التحميلات المحفوظة (الأوفلاين). هل تريد المتابعة؟')) {
      return;
    }
    // حذف كل الإعدادات المحفوظة في localStorage (لا تمسّ ذاكرة التحميلات في Cache API)
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf('quran_') === 0) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
    // إعادة تحميل البرنامج بحالة المصنع الافتراضية
    window.location.reload();
  }

  function updateSelectionToolbar() {
    const count = state.selectedSurahNumbers.size;
    const total = SURAHS.length;

    if (count === 0) {
      dom.lblSelectionSummary.textContent = t('noSelection');
      dom.lblPlayMain.textContent = t('playAll');
    } else {
      dom.lblSelectionSummary.textContent = t('selectionSummary', count, total);
      dom.lblPlayMain.textContent = t('playSelected', count);
    }
  }

  // ==========================================
  // 10. MUSHAF VIEWER (IMAGE / TEXT / INFO / TAFSIR / MINDMAP)
  // ==========================================
  function switchMushafTab(tabName) {
    if (!MUSHAF_TABS.includes(tabName)) return;
    state.currentMushafTab = tabName;
    localStorage.setItem('quran_mushaf_tab', tabName);

    document.querySelectorAll('.mushaf-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });

    const contents = {
      image: dom.contentMushafImage,
      text: dom.contentMushafText,
      info: dom.contentMushafInfo,
      tafsir: dom.contentMushafTafsir,
      mindmap: dom.contentMushafMindmap
    };
    Object.entries(contents).forEach(([name, el]) => el.classList.toggle('active', name === tabName));

    const isImage = (tabName === 'image');
    const isText = (tabName === 'text');
    dom.mushafSubBar.style.display = (isImage || isText) ? 'flex' : 'none';
    dom.mushafPageControls.style.display = isImage ? 'flex' : 'none';
    dom.mushafFontControls.style.display = isText ? 'flex' : 'none';
    updateQuickNav();

    if (isText || tabName === 'tafsir') {
      scrollActiveVerseIntoView('center');
    }
    if (isText && state.quranFont === 'tajweed') {
      requestAnimationFrame(fitTajweedPages);
    }
    if (tabName === 'mindmap') {
      loadEncyclopediaForCurrentSurah();
    }
  }

  // تمرير الآية الحالية إلى منتصف التبويب المعروض (نص أو تفسير)
  function scrollActiveVerseIntoView(block) {
    if (activeVerse <= 0) return;
    requestAnimationFrame(() => {
      let target = null;
      if (state.currentMushafTab === 'text') {
        const s = activeSurah || state.viewSurahNumber;
        target = dom.quranVersesContainer.querySelector(`.quran-word[data-surah="${s}"][data-verse="${activeVerse}"]`)
          || dom.quranVersesContainer.querySelector(`.quran-word[data-verse="${activeVerse}"]`);
      } else if (state.currentMushafTab === 'tafsir') {
        const item = tafsirItems.find(it => activeVerse >= it.start && activeVerse <= it.end);
        target = item ? item.el : null;
      }
      if (target) scrollIntoPanel(target, block);
    });
  }

  // تمرير عنصر داخل لوحة المصحف فقط (scrollIntoView كانت تحرّك الصفحة كلها)
  function scrollIntoPanel(el, block = 'nearest') {
    const panel = dom.mushafPanelBody;
    const elRect = el.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    let top = 0;
    if (block === 'center') {
      top = (elRect.top + elRect.height / 2) - (panelRect.top + panelRect.height / 2);
    } else if (elRect.top < panelRect.top) {
      top = elRect.top - panelRect.top - 8;
    } else if (elRect.bottom > panelRect.bottom) {
      top = elRect.bottom - panelRect.bottom + 8;
    }
    if (Math.abs(top) > 1) panel.scrollBy({ top, behavior: 'smooth' });

    // التمرير الأفقي عند تكبير نص المصحف
    const scroller = dom.contentMushafText;
    if (state.currentMushafTab === 'text' && scroller.scrollWidth > scroller.clientWidth) {
      const box = scroller.getBoundingClientRect();
      let left = 0;
      if (elRect.left < box.left) left = elRect.left - box.left - 8;
      else if (elRect.right > box.right) left = elRect.right - box.right + 8;
      if (Math.abs(left) > 1) scroller.scrollBy({ left, behavior: 'smooth' });
    }
  }

  // QCF4 Page Data Helper
  let qcfIndex = null;

  // فهرس يُبنى مرة واحدة من بيانات QCF4: الكلمات حسب (آية:موضع) وأول صفحة لكل آية
  function getQcfIndex() {
    if (qcfIndex) return qcfIndex;
    qcfIndex = { words: new Map(), versePage: new Map() };
    const pages = window.QCF4_PAGES || {};
    Object.keys(pages).map(Number).sort((a, b) => a - b).forEach(pageNum => {
      for (const line of (pages[pageNum].lines || [])) {
        for (const w of (line.words || [])) {
          if (!w.verse_key) continue;
          qcfIndex.words.set(`${w.verse_key}:${w.position}`, w);
          if (!qcfIndex.versePage.has(w.verse_key)) qcfIndex.versePage.set(w.verse_key, pageNum);
        }
      }
    });
    return qcfIndex;
  }

  function getQcfWord(verseKey, wordPos) {
    return getQcfIndex().words.get(`${verseKey}:${wordPos}`) || null;
  }

  function getPageForVerse(surahNum, verseNum) {
    const page = getQcfIndex().versePage.get(`${surahNum}:${verseNum}`);
    if (page) return page;
    const surah = SURAHS.find(s => s.number === surahNum);
    return surah ? surah.startPage : 582;
  }

  function syncMushafPageToVerse(surahNum, verseNum) {
    const page = getPageForVerse(surahNum, verseNum);
    if (page !== state.currentMushafPage) loadMushafPageImage(page);
  }

  function renderUthmaniTextTab(surah) {
    if (!dom.quranVersesContainer) return;
    dom.quranVersesContainer.innerHTML = '';

    // تلميحات ألوان التجويد تظهر فقط مع خط التجويد
    if (dom.tajweedLegend) {
      dom.tajweedLegend.style.display = (state.quranFont === 'tajweed') ? '' : 'none';
    }

    // Update toggle button text if present
    if (dom.btnToggleMushafLines) {
      dom.btnToggleMushafLines.textContent = state.preserveMushafLines ? '📑 أسطر المصحف: مفعّل' : '📜 أسطر المصحف: متصل';
      dom.btnToggleMushafLines.classList.toggle('active', state.preserveMushafLines);
    }

    // وضع مصحف التجويد (خطوط quranpedia الملوّنة لكل صفحة)
    if (state.quranFont === 'tajweed' && window.TAJWEED_SURAHS && window.TAJWEED_SURAHS[surah.number]) {
      dom.quranVersesContainer.classList.remove('continuous-flow');
      dom.lblTextSurahTitle.style.display = 'none';
      dom.lblBasmala.style.display = 'none';
      renderTajweedLines(surah);
      return;
    }

    // Check if QCF4 real lines mode should be used (15 lines per page)
    const useRealMushafLines = (state.quranFont === 'qcf4' && state.preserveMushafLines && window.QCF4_PAGES);

    if (useRealMushafLines) {
      dom.quranVersesContainer.classList.remove('continuous-flow');
      // Hide standard text header since real mushaf lines have ornamental header & basmala
      dom.lblTextSurahTitle.style.display = 'none';
      dom.lblBasmala.style.display = 'none';

      // نجمع أرقام الصفحات التي تحتوي هذه السورة، ثم نعرض كل أسطر تلك الصفحات
      // (فتظهر السور الصغيرة المجاورة معها في الصفحة نفسها كما في المصحف المطبوع)
      const surahPageNums = [];
      const sortedPageKeys = Object.keys(window.QCF4_PAGES).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      for (const pStr of sortedPageKeys) {
        const pData = window.QCF4_PAGES[pStr];
        const hasSurah = (pData.lines || []).some(line => (line.words || []).some(w => {
          if (w.sura === surah.number) return true;
          if (w.verse_key && parseInt(w.verse_key.split(':')[0], 10) === surah.number) return true;
          return false;
        }));
        if (hasSurah) surahPageNums.push(parseInt(pStr, 10));
      }

      if (surahPageNums.length > 0) {
        surahPageNums.sort((a, b) => a - b).forEach((pageNum) => {
          const pData = window.QCF4_PAGES[String(pageNum)];
          const pageBox = document.createElement('div');
          pageBox.className = 'mushaf-real-page';
          const divider = (window.TAJWEED_DIVIDERS && window.TAJWEED_DIVIDERS[pageNum]) || 17.65;
          pageBox.style.setProperty('--page-divider', String(divider));

          if (surahPageNums.length > 1) {
            const pageBadge = document.createElement('div');
            pageBadge.className = 'mushaf-page-badge-header';
            pageBadge.textContent = `صفحة ${pageNum}`;
            pageBox.appendChild(pageBadge);
          }

          (pData.lines || []).forEach((line, lIdx) => {
            const words = line.words || [];
            const lineEl = document.createElement('div');
            let lineClass = 'mushaf-line';
            if (words.some(w => w.type === 'surah_header')) lineClass += ' line-surah_header';
            else if (words.some(w => w.type === 'bismillah')) lineClass += ' line-bismillah';
            else if (line.short || words.length <= 6) lineClass += ' line-short line-center';
            lineEl.className = lineClass;

            words.forEach(w => {
              if (w.type === 'surah_header') {
                const hSpan = document.createElement('span');
                hSpan.className = 'surah-header-glyph';
                hSpan.textContent = w.char;
                lineEl.appendChild(hSpan);
              } else if (w.type === 'bismillah') {
                const svg = (window.makeBismillahSvg && window.makeBismillahSvg(w.char.codePointAt(0))) || null;
                if (svg) {
                  lineEl.appendChild(svg);
                } else {
                  const bSpan = document.createElement('span');
                  bSpan.className = 'bismillah-glyph';
                  bSpan.textContent = w.char;
                  lineEl.appendChild(bSpan);
                }
              } else if (w.type === 'word') {
                const vkParts = (w.verse_key || '').split(':');
                const wSurah = parseInt(vkParts[0], 10) || surah.number;
                const vNum = parseInt(vkParts[1], 10) || 1;
                const wPos = w.position || 1;
                const wSpan = document.createElement('span');
                wSpan.className = 'quran-word';
                wSpan.setAttribute('data-surah', wSurah);
                wSpan.setAttribute('data-verse', vNum);
                wSpan.setAttribute('data-word', wPos);
                wSpan.textContent = w.char;
                wSpan.title = `${w.text || ''} (آية ${vNum})`;
                wSpan.style.fontFamily = `'${w.font || pData.font}', 'QCF4_QBSML', 'Amiri Quran', serif`;
                wSpan.addEventListener('click', (e) => {
                  e.stopPropagation();
                  seekToWord(vNum, wPos, wSurah);
                });
                lineEl.appendChild(wSpan);
              } else if (w.type === 'end') {
                const vkParts = (w.verse_key || '').split(':');
                const wSurah = parseInt(vkParts[0], 10) || surah.number;
                const vNum = parseInt(vkParts[1], 10) || 1;
                const endSpan = document.createElement('span');
                endSpan.className = 'verse-sign';
                endSpan.setAttribute('data-surah', wSurah);
                endSpan.setAttribute('data-verse', vNum);
                endSpan.textContent = w.char;
                endSpan.title = `انقر للاستماع للآية ${vNum}`;
                endSpan.style.fontFamily = `'${w.font || pData.font}', 'QCF4_QBSML', 'Amiri Quran', serif`;
                endSpan.addEventListener('click', (e) => {
                  e.stopPropagation();
                  seekToVerse(vNum, wSurah);
                });
                lineEl.appendChild(endSpan);
              }
            });

            pageBox.appendChild(lineEl);
          });

          dom.quranVersesContainer.appendChild(pageBox);
        });
        return;
      }
    }

    // Continuous flow mode (or non-QCF4 fonts)
    dom.lblTextSurahTitle.style.display = 'block';
    dom.lblBasmala.style.display = (surah.number === 1 || surah.number === 9) ? 'none' : 'block';
    dom.lblTextSurahTitle.textContent = surah.vocalized || `سُورَةُ ${surah.nameAr}`;
    dom.quranVersesContainer.classList.add('continuous-flow');

    (surah.verses || []).forEach(v => {
      const verseSpan = document.createElement('span');
      verseSpan.className = 'quran-verse-span';
      verseSpan.setAttribute('data-verse', v.num);

      const words = (v.text || '').trim().split(/\s+/).filter(w => w.length > 0);
      words.forEach((wordText, wIdx) => {
        const wordPos = wIdx + 1;
        const wordSpan = document.createElement('span');
        wordSpan.className = 'quran-word';
        wordSpan.setAttribute('data-surah', surah.number);
        wordSpan.setAttribute('data-verse', v.num);
        wordSpan.setAttribute('data-word', wordPos);

        const qcfWord = (state.quranFont === 'qcf4') ? getQcfWord(`${surah.number}:${v.num}`, wordPos) : null;
        if (qcfWord) {
          wordSpan.textContent = qcfWord.char;
          wordSpan.style.fontFamily = `'${qcfWord.font}', 'QCF4_QBSML', 'Amiri Quran', serif`;
        } else {
          wordSpan.textContent = wordText;
          wordSpan.style.fontFamily = QURAN_FONTS[state.quranFont] || QURAN_FONTS.qcf4;
        }

        wordSpan.title = `انقر للانتقال الصوتي إلى كلمة: ${wordText}`;
        wordSpan.addEventListener('click', (e) => {
          e.stopPropagation();
          seekToWord(v.num, wordPos, surah.number);
        });

        verseSpan.appendChild(wordSpan);
      });

      // Verse end sign
      const sign = document.createElement('span');
      sign.className = 'verse-sign';
      sign.setAttribute('data-surah', surah.number);
      sign.setAttribute('data-verse', v.num);

      const qcfEnd = (state.quranFont === 'qcf4') ? getQcfWord(`${surah.number}:${v.num}`, words.length + 1) : null;
      if (qcfEnd && qcfEnd.type === 'end') {
        sign.textContent = ` ${qcfEnd.char} `;
        sign.style.fontFamily = `'${qcfEnd.font}', 'QCF4_QBSML', 'Amiri Quran', serif`;
      } else {
        sign.textContent = ` ﴿${v.num}﴾ `;
        sign.style.fontFamily = QURAN_FONTS[state.quranFont] || QURAN_FONTS.qcf4;
      }

      sign.title = `انقر للاستماع للآية ${v.num}`;
      sign.addEventListener('click', (e) => {
        e.stopPropagation();
        seekToVerse(v.num, surah.number);
      });
      verseSpan.appendChild(sign);

      dom.quranVersesContainer.appendChild(verseSpan);
    });
  }

  // رسم سورة في وضع «مصحف التجويد» باستخدام glyphات quranpedia وخطوط صفحاتها
  // خريطة رقم السورة -> glyph عنوانها من بيانات QCF4 (لعنوان زخرفي مثل QCF4)
  let _surahHeaderGlyphMap = null;
  function getSurahHeaderGlyph(surahNum) {
    if (!_surahHeaderGlyphMap) {
      _surahHeaderGlyphMap = {};
      const pages = window.QCF4_PAGES || {};
      Object.keys(pages).forEach(k => {
        (pages[k].lines || []).forEach(line => {
          (line.words || []).forEach(w => {
            if (w.type === 'surah_header' && w.sura && !_surahHeaderGlyphMap[w.sura]) {
              _surahHeaderGlyphMap[w.sura] = w;
            }
          });
        });
      });
    }
    return _surahHeaderGlyphMap[surahNum] || null;
  }

  // وضع مصحف التجويد: يعرض الصفحة كاملة (كل سورها) مع اسم السورة والبسملة — كفكرة QCF4
  function renderTajweedLines(surah) {
    const data = window.TAJWEED_SURAHS[surah.number];
    const pages = [...new Set(data.lines.map(l => l.page))].sort((a, b) => a - b);

    pages.forEach(page => {
      const pageBox = document.createElement('div');
      pageBox.className = 'mushaf-real-page';
      // حجم خط التجويد محسوب لكل صفحة حتى لا يخرج النص عن حدوده
      const divider = (window.TAJWEED_DIVIDERS && window.TAJWEED_DIVIDERS[page]) || 18.4;
      pageBox.style.setProperty('--tj-divider', String(divider));
      // لوحة ألوان الوضع الغامق: تحويل الأسود (الفهرس 0) إلى أبيض
      pageBox.style.setProperty('--tj-page-palette', `--tj-dark-${page}`);

      const badge = document.createElement('div');
      badge.className = 'mushaf-page-badge-header';
      badge.textContent = `صفحة ${page}`;
      pageBox.appendChild(badge);

      const surahsOnPage = Object.keys(window.TAJWEED_SURAHS)
        .map(Number)
        .filter(n => (window.TAJWEED_SURAHS[n].lines || []).some(l => l.page === page))
        .sort((a, b) => a - b);

      surahsOnPage.forEach(sNum => {
        const sData = window.TAJWEED_SURAHS[sNum];
        const pageLines = sData.lines.filter(l => l.page === page);
        if (!pageLines.length) return;

        const startsHere = sData.lines[0].page === page;

        if (startsHere) {
          // عنوان السورة (زخرفي كما في QCF4)
          const headerEl = document.createElement('div');
          headerEl.className = 'mushaf-line line-surah_header';
          const glyph = getSurahHeaderGlyph(sNum);
          if (glyph) {
            const hs = document.createElement('span');
            hs.className = 'surah-header-glyph';
            hs.textContent = glyph.char;
            hs.style.fontFamily = `'${glyph.font || 'QCF4_QBSML'}', 'Amiri Quran', serif`;
            headerEl.appendChild(hs);
          } else {
            const s = SURAHS.find(x => x.number === sNum);
            const hs = document.createElement('span');
            hs.className = 'surah-vocalized-title';
            hs.textContent = s ? (s.vocalized || `سُورَةُ ${s.nameAr}`) : `سورة ${sNum}`;
            headerEl.appendChild(hs);
          }
          pageBox.appendChild(headerEl);

          // البسملة (عدا الفاتحة، والتوبة ليست ضمن جزء عم) — تُرسم كـ SVG مثل QCF4
          if (sNum !== 1 && sNum !== 9) {
            const basmalaEl = document.createElement('div');
            basmalaEl.className = 'mushaf-line line-bismillah';
            const svg = (window.makeBismillahSvg && window.makeBismillahSvg(0xF8D6)) || null;
            if (svg) {
              basmalaEl.appendChild(svg);
            } else {
              const bs = document.createElement('span');
              bs.className = 'basmala-text';
              bs.textContent = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
              basmalaEl.appendChild(bs);
            }
            pageBox.appendChild(basmalaEl);
          }
        }

        pageLines.forEach(line => {
          const lineEl = document.createElement('div');
          lineEl.className = 'mushaf-line line-tajweed' + ((line.short || (line.words && line.words.length <= 6)) ? ' line-short line-center' : '');
          const fontFamily = `'tajweed_page_${line.page}', 'Amiri Quran', serif`;

          line.words.forEach(w => {
            const span = document.createElement('span');
            span.style.fontFamily = fontFamily;
            if (w.m) {
              span.className = 'verse-sign';
              span.setAttribute('data-surah', sNum);
              span.setAttribute('data-verse', w.a);
              span.textContent = w.c;
              span.title = `انقر للاستماع للآية ${w.a}`;
              span.addEventListener('click', (e) => { e.stopPropagation(); seekToVerse(w.a, sNum); });
            } else {
              span.className = 'quran-word';
              span.setAttribute('data-surah', sNum);
              span.setAttribute('data-verse', w.a);
              span.setAttribute('data-word', w.p || 1);
              span.textContent = w.c;
              span.addEventListener('click', (e) => { e.stopPropagation(); seekToWord(w.a, w.p || 1, sNum); });
            }
            lineEl.appendChild(span);
          });

          pageBox.appendChild(lineEl);
        });
      });

      dom.quranVersesContainer.appendChild(pageBox);
    });

    // بعد تحميل الخطوط: اضبط حجم كل صفحة حسب العرض الفعلي لمنع خروج النص
    requestAnimationFrame(() => {
      const apply = () => {
        fitTajweedPages();
        requestAnimationFrame(fitTajweedPages);
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(apply).catch(apply);
      } else {
        apply();
      }
    });
  }

  // ضبط حجم أسطر التجويد حسب عرض الصفحة الفعلي (تصحيح تلقائي لأي تجاوز)
  function fitTajweedPages() {
    if (!dom.quranVersesContainer) return;
    const boxes = dom.quranVersesContainer.querySelectorAll('.mushaf-real-page');
    boxes.forEach(box => {
      const lines = box.querySelectorAll('.line-tajweed');
      if (!lines.length) return;
      const avail = lines[0].clientWidth;
      if (!avail) return;
      let ratio = 1;
      lines.forEach(line => {
        let sum = 0;
        line.querySelectorAll(':scope > span').forEach(el => {
          sum += el.getBoundingClientRect().width;
        });
        if (sum > avail) ratio = Math.max(ratio, sum / avail);
      });
      if (ratio > 1.002) {
        const cur = parseFloat(box.style.getPropertyValue('--tj-divider')) || 18.4;
        box.style.setProperty('--tj-divider', (cur * ratio).toFixed(3));
      }
    });
  }

  function loadSurahInMushaf(surahNumber) {
    const surah = SURAHS.find(s => s.number === surahNumber);
    if (!surah) return;

    const surahChanged = (state.viewSurahNumber !== surahNumber);
    state.viewSurahNumber = surahNumber;

    if (surahChanged) {
      activeVerse = 0;
      activeWord = 0;
      activeSurah = null;
      renderUthmaniTextTab(surah);
      renderSurahInfo(surah);
      loadTafsirForSurah(surahNumber);
      renderMindmap(surah);
      if (state.currentMushafTab === 'mindmap') loadEncyclopediaForCurrentSurah();
      populateQuickNavVerses(surah);
    }

    loadMushafPageImage(surah.startPage);
    syncQuickNavSelection();
  }

  function renderSurahInfo(surah) {
    dom.infoSurahTitle.textContent = `${surah.vocalized || surah.nameAr} (${surah.nameEn})`;
    dom.pillRevelation.textContent = surah.isMeccan ? 'مكية' : 'مدنية';
    dom.pillOrder.textContent = `ترتيب النزول: ${surah.revelationOrder}`;
    dom.pillAyahs.textContent = `عدد الآيات: ${surah.ayahs}`;
    dom.pillPage.textContent = `الصفحة: ${surah.startPage}`;
    dom.lblSurahOverview.textContent = surah.overview || '';
    dom.lblSurahTopics.textContent = surah.topics || '';
  }

  // ==========================================
  // موسوعات السورة (تُدمج الخريطة الذهنية مع العمل/علمتني/الفضل/الخصائص)
  // ==========================================
  let encyclopediaRenderToken = 0;
  let encyclopediaLoadedFor = null;
  let encyclopediaScriptsPromise = null;

  function loadEncyclopediaData() {
    if (window.CHAPTER_STUDIES && window.ALMATNY_SOURA) return Promise.resolve();
    if (!encyclopediaScriptsPromise) {
      const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[data-encyclopedia="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.dataset.encyclopedia = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`missing ${src}`));
        document.head.appendChild(s);
      });
      encyclopediaScriptsPromise = Promise.all([
        loadScript('chapter-studies.js'),
        loadScript('almatny-data.js')
      ]).catch(err => { encyclopediaScriptsPromise = null; throw err; });
    }
    return encyclopediaScriptsPromise;
  }

  function splitBrToParagraphs(text) {
    if (!text) return '';
    return String(text)
      .split(/<br\s*\/?>(?:\r?\n)?/i)
      .map(part => part.trim())
      .filter(part => part.length > 0)
      .map(part => `<p>${part}</p>`)
      .join('');
  }

  function appendEncyclopediaSections(container, surahNumber) {
    const cs = (window.CHAPTER_STUDIES || []).find(e => e.chapter_id === surahNumber) || {};
    const am = (window.ALMATNY_SOURA || []).find(e => e.chapter_id === surahNumber) || {};

    if (cs.title) {
      const sub = document.createElement('p');
      sub.className = 'encyclopedia-subtitle';
      sub.textContent = cs.title;
      container.appendChild(sub);
    }

    function formatKeyValues(items) {
      if (!Array.isArray(items) || items.length === 0) return '';
      return items
        .filter(it => it && (it.key || it.value))
        .map(it => `<p><strong class="custom_strong">${it.key || ''}</strong> ${(it.value || '').replace(/\n/g, '<br>')}</p>`)
        .join('');
    }

    const sections = [
      { title: '🏷️ تسمية السورة ومعناها', html: formatKeyValues(cs.section_2) },
      { title: '✨ لطائف ومحاور تدبرية', html: formatKeyValues(cs.section_1) },
      { title: '💡 العمل بالسورة', html: splitBrToParagraphs(cs.quran_working) },
      { title: '🧠 علمتني السورة', html: am.almatny_text || '' },
      { title: '🌟 فضل السورة', html: splitBrToParagraphs(cs.quran_fadel) },
      { title: '📌 خصائص السورة', html: splitBrToParagraphs(cs.quran_properties) }
    ];

    sections.forEach(sec => {
      if (!sec.html) return;
      const wrap = document.createElement('section');
      wrap.className = 'encyclopedia-section';
      const h = document.createElement('h4');
      h.className = 'encyclopedia-section-title';
      h.textContent = sec.title;
      wrap.appendChild(h);
      const body = document.createElement('div');
      body.className = 'encyclopedia-section-body';
      body.innerHTML = sec.html;
      wrap.appendChild(body);
      container.appendChild(wrap);
    });
  }

  function loadEncyclopediaForCurrentSurah(force) {
    const surahNum = state.viewSurahNumber;
    if (!surahNum || !dom.mindmapTopicsFlow) return;
    if (!force && encyclopediaLoadedFor === surahNum) return;

    const container = dom.mindmapTopicsFlow;
    container.querySelectorAll('.encyclopedia-hint, .encyclopedia-loading, .encyclopedia-section, .encyclopedia-subtitle')
      .forEach(el => el.remove());

    const loader = document.createElement('div');
    loader.className = 'encyclopedia-loading';
    loader.textContent = 'جاري تحميل الموسوعات...';
    container.appendChild(loader);

    const token = ++encyclopediaRenderToken;
    loadEncyclopediaData().then(() => {
      if (token !== encyclopediaRenderToken) return;
      loader.remove();
      appendEncyclopediaSections(container, surahNum);
      encyclopediaLoadedFor = surahNum;
    }).catch(() => {
      if (token !== encyclopediaRenderToken) return;
      loader.textContent = 'تعذر تحميل بيانات الموسوعات. تأكد من وجود ملفي chapter-studies.js و almatny-data.js.';
    });
  }

  function renderMindmap(surah) {
    dom.lblMindmapTitle.textContent = `📖 موسوعات سورة ${surah.nameAr}`;
    dom.mindmapTopicsFlow.innerHTML = '';
    encyclopediaLoadedFor = null;

    // الخريطة الذهنية (المحاور) مدمجة داخل تبويب الموسوعات
    const mindTitle = document.createElement('h4');
    mindTitle.className = 'encyclopedia-section-title';
    mindTitle.textContent = '🗺️ الخريطة الذهنية ومحاور السورة';
    dom.mindmapTopicsFlow.appendChild(mindTitle);

    const topics = (surah.topics || '').split(/[؛;.]/).map(s => s.trim()).filter(s => s.length > 3);
    const blocks = topics.length > 0 ? topics : [surah.overview || ''];

    blocks.forEach((topic, idx) => {
      const block = document.createElement('div');
      block.className = 'mindmap-block';
      if (topics.length > 0) {
        const title = document.createElement('strong');
        title.textContent = `المحور ${idx + 1}: `;
        block.appendChild(title);
      }
      block.appendChild(document.createTextNode(topic));
      dom.mindmapTopicsFlow.appendChild(block);
    });

    const hint = document.createElement('p');
    hint.className = 'encyclopedia-hint';
    hint.textContent = 'تُعرض هنا موسوعات السورة: العمل بالسورة، وعلمتني السورة، وفضلها، وخصائصها.';
    dom.mindmapTopicsFlow.appendChild(hint);
  }

  function buildSurahEncyclopediaCardHtml(surah) {
    const cs = (window.CHAPTER_STUDIES || []).find(e => e.chapter_id === surah.number) || {};
    const am = (window.ALMATNY_SOURA || []).find(e => e.chapter_id === surah.number) || {};

    const formatKeyValues = (items) => {
      if (!Array.isArray(items) || items.length === 0) return '';
      return items
        .filter(it => it && (it.key || it.value))
        .map(it => `<p><strong class="custom_strong">${it.key || ''}</strong> ${(it.value || '').replace(/\n/g, '<br>')}</p>`)
        .join('');
    };

    const topics = (surah.topics || '').split(/[؛;.]/).map(s => s.trim()).filter(s => s.length > 3);
    const mindmapHtml = topics.length > 0
      ? topics.map((t, i) => `<div class="print-topic-item"><strong>المحور ${i + 1}:</strong> ${t}</div>`).join('')
      : (surah.overview ? `<p>${surah.overview}</p>` : '');

    const sections = [
      { title: '✨ مقاصد السورة وخلاصتها', html: surah.overview ? `<p>${surah.overview}</p>` : '' },
      { title: '🗺️ الخريطة الذهنية ومحاور السورة', html: mindmapHtml },
      { title: '🏷️ تسمية السورة ومعناها', html: formatKeyValues(cs.section_2) },
      { title: '💎 لطائف ومحاور تدبرية', html: formatKeyValues(cs.section_1) },
      { title: '💡 العمل بالسورة', html: splitBrToParagraphs(cs.quran_working) },
      { title: '🧠 علمتني السورة', html: am.almatny_text ? `<div class="almatny-flow">${am.almatny_text}</div>` : '' },
      { title: '🌟 فضل السورة', html: splitBrToParagraphs(cs.quran_fadel) },
      { title: '📌 خصائص السورة', html: splitBrToParagraphs(cs.quran_properties) }
    ];

    const sectionsHtml = sections
      .filter(s => s.html && s.html.trim().length > 0)
      .map(s => `
        <section class="print-sec">
          <h3 class="print-sec-title">${s.title}</h3>
          <div class="print-sec-body">${s.html}</div>
        </section>
      `).join('');

    return `
      <article class="print-surah-block">
        <header class="print-surah-header">
          <div class="print-surah-title-row">
            <h2>سورة ${surah.nameAr}</h2>
            <div class="print-badges">
              <span class="print-badge">${surah.isMeccan ? 'مكية' : 'مدنية'}</span>
              <span class="print-badge">عدد الآيات: ${surah.ayahs}</span>
              <span class="print-badge">ترتيب النزول: ${surah.revelationOrder}</span>
              <span class="print-badge">الصفحة: ${surah.startPage}</span>
            </div>
          </div>
          ${cs.title ? `<p class="print-surah-subtitle">${cs.title}</p>` : ''}
        </header>
        ${sectionsHtml}
      </article>
    `;
  }

  window.printEncyclopediaPdf = printEncyclopediaPdf;
  function printEncyclopediaPdf() {
    const runPrint = () => {
      const surah = SURAHS.find(s => s.number === (state.viewSurahNumber || state.currentSurahNumber || 78)) || SURAHS[1];
      const docTitle = `موسوعة سورة ${surah.nameAr} - المصحف المعلم`;
      const bodyCards = buildSurahEncyclopediaCardHtml(surah);

      let printRoot = dom.encyclopediaPrintRoot || document.getElementById('encyclopediaPrintRoot');
      if (!printRoot) {
        printRoot = document.createElement('div');
        printRoot.id = 'encyclopediaPrintRoot';
        printRoot.className = 'encyclopedia-print-root';
        document.body.appendChild(printRoot);
        dom.encyclopediaPrintRoot = printRoot;
      }

      printRoot.innerHTML = `
        <div class="print-cover-banner">
          <h1>${docTitle}</h1>
          <p>المقاصد • الخريطة الذهنية • اللطائف التدبرية • العمل بالسورة • علمتني السورة • الفضائل والخصائص</p>
        </div>
        ${bodyCards}
      `;

      const originalTitle = document.title;
      document.title = docTitle;
      updateStatus(`جاري فتح شاشة الطباعة (${docTitle})...`);

      const cleanupAfterPrint = () => {
        document.title = originalTitle;
        printRoot.innerHTML = '';
        window.removeEventListener('afterprint', cleanupAfterPrint);
      };
      window.addEventListener('afterprint', cleanupAfterPrint);

      window.print();
    };

    if (window.CHAPTER_STUDIES && window.ALMATNY_SOURA) {
      runPrint();
    } else {
      loadEncyclopediaData().then(runPrint).catch(() => {
        updateStatus('تعذر تحميل بيانات الموسوعات للطباعة');
      });
    }
  }

  let tafsirItems = []; // [{ el, start, end }] عناصر التفسير المعروضة حالياً
  let tafsirRenderToken = 0;
  const tafsirScripts = new Map();

  // كل كتاب تفسير في ملف مستقل (tafsir/<name>.js) يُحمَّل عند أول استخدام
  function loadTafsirEdition(edition) {
    if (window.QURAN_TAFSIRS && window.QURAN_TAFSIRS[edition]) {
      return Promise.resolve(window.QURAN_TAFSIRS[edition]);
    }
    if (!tafsirScripts.has(edition)) {
      tafsirScripts.set(edition, new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `tafsir/${edition}.js`;
        script.onload = () => {
          if (window.QURAN_TAFSIRS && window.QURAN_TAFSIRS[edition]) resolve(window.QURAN_TAFSIRS[edition]);
          else reject(new Error(`Tafsir data missing: ${edition}`));
        };
        script.onerror = () => reject(new Error(`Tafsir file not found: ${edition}`));
        document.head.appendChild(script);
      }).catch(err => {
        tafsirScripts.delete(edition);
        throw err;
      }));
    }
    return tafsirScripts.get(edition);
  }

  function showTafsirMessage(text) {
    tafsirItems = [];
    dom.tafsirVersesList.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'tafsir-message';
    msg.textContent = text;
    dom.tafsirVersesList.appendChild(msg);
  }

  async function loadTafsirForSurah(surahNumber) {
    const surah = SURAHS.find(s => s.number === surahNumber);
    if (!surah) return;

    const edition = state.tafsirEdition;
    const token = ++tafsirRenderToken;
    dom.lblTafsirSurahTitle.textContent = `تفسير سورة ${surah.nameAr}`;

    const alreadyLoaded = !!(window.QURAN_TAFSIRS && window.QURAN_TAFSIRS[edition]);
    if (!alreadyLoaded) showTafsirMessage('جاري تحميل التفسير...');

    let data;
    try {
      data = await loadTafsirEdition(edition);
    } catch (err) {
      console.warn(err);
      if (token === tafsirRenderToken) showTafsirMessage('تعذر تحميل ملف هذا التفسير. تأكد من وجود مجلد tafsir بجانب الصفحة.');
      return;
    }
    if (token !== tafsirRenderToken) return;

    renderTafsirItems(surah, data[surahNumber] || {});
  }

  // الآيات التي يشرحها الكتاب معاً (قيمتها رقم الآية الأولى في المجموعة) تُعرض في بطاقة واحدة
  function renderTafsirItems(surah, surahMap) {
    const groups = [];
    surah.verses.forEach(v => {
      const entry = surahMap[v.num];
      const last = groups[groups.length - 1];
      if (typeof entry === 'number' && last) {
        last.end = v.num;
      } else {
        groups.push({ start: v.num, end: v.num, text: (typeof entry === 'string') ? entry : '' });
      }
    });

    dom.tafsirVersesList.innerHTML = '';
    tafsirItems = groups.map(group => {
      const el = buildTafsirItem(group);
      dom.tafsirVersesList.appendChild(el);
      return { el, start: group.start, end: group.end };
    });

    syncTafsirHighlight(activeVerse);
  }

  function buildTafsirItem(group) {
    const item = document.createElement('div');
    item.className = 'tafsir-item';
    item.setAttribute('data-verse', group.start);

    const head = document.createElement('div');
    head.className = 'tafsir-item-head';

    const label = document.createElement('div');
    label.className = 'tafsir-verse-label';
    label.textContent = (group.start === group.end) ? `الآية ${group.start}:` : `الآيات ${group.start} – ${group.end}:`;

    const toText = document.createElement('button');
    toText.type = 'button';
    toText.className = 'tafsir-goto-text';
    toText.textContent = '📜 النص';
    toText.title = 'الانتقال إلى نص هذه الآية في الرسم العثماني';
    toText.addEventListener('click', (e) => {
      e.stopPropagation();
      openVerseInTab('text', group.start);
    });

    head.appendChild(label);
    head.appendChild(toText);

    const body = document.createElement('div');
    body.className = 'tafsir-verse-body';
    body.textContent = group.text || 'لا يتوفر نص تفسير لهذه الآية في هذا الكتاب.';

    item.appendChild(head);
    item.appendChild(body);

    item.addEventListener('click', () => {
      if (window.getSelection().toString()) return; // المستخدم يحدد نصاً للقراءة أو النسخ
      seekToVerse(group.start);
    });
    return item;
  }

  function syncTafsirHighlight(verseNum, scrollBlock) {
    let activeEl = null;
    tafsirItems.forEach(it => {
      const isActive = verseNum >= it.start && verseNum <= it.end;
      it.el.classList.toggle('tafsir-active', isActive);
      if (isActive) activeEl = it.el;
    });
    if (activeEl && scrollBlock && state.currentMushafTab === 'tafsir') {
      scrollIntoPanel(activeEl, scrollBlock);
    }
  }

  function getMushafPageUrl(pageNumber, edition) {
    return `MushafPages/${edition}/${String(pageNumber).padStart(3, '0')}.png`;
  }

  function getRemoteMushafPageUrl(pageNumber, edition) {
    const source = MUSHAF_SOURCES.find(s => s.id === edition) || MUSHAF_SOURCES[0];
    return source.urlFn(pageNumber);
  }

  // تعبئة قائمة طوابع المصحف من مصدر البيانات الموحّد
  function populateMushafEditionSelect() {
    if (!dom.selMushafEdition) return;
    dom.selMushafEdition.innerHTML = '';
    MUSHAF_SOURCES.forEach(source => {
      const option = document.createElement('option');
      option.value = source.id;
      option.textContent = source.label;
      dom.selMushafEdition.appendChild(option);
    });
    dom.selMushafEdition.value = state.mushafEdition;
  }

  let pageLoadToken = 0;
  let pageBlobUrl = null;

  async function loadMushafPageImage(pageNumber) {
    const page = Math.max(1, Math.min(604, pageNumber));
    state.currentMushafPage = page;
    dom.lblMushafPageNumber.textContent = `صفحة ${page}`;

    const token = ++pageLoadToken;
    const img = dom.imgMushafPage;
    const localUrl = getMushafPageUrl(page, state.mushafEdition);
    const remoteUrl = getRemoteMushafPageUrl(page, state.mushafEdition);

    dom.mushafLoadingSpinner.style.display = 'flex';
    img.style.opacity = '0.3';

    // النسخة المحفوظة في ذاكرة المتصفح تُفضَّل لتعمل الصفحة بلا إنترنت
    const cachedUrl = await getCachedObjectUrl([localUrl, remoteUrl]);
    if (token !== pageLoadToken) {
      if (cachedUrl) URL.revokeObjectURL(cachedUrl);
      return;
    }
    if (pageBlobUrl) URL.revokeObjectURL(pageBlobUrl);
    pageBlobUrl = cachedUrl;

    const sources = cachedUrl ? [cachedUrl] : [localUrl, remoteUrl];
    let index = 0;

    img.onload = () => {
      if (token !== pageLoadToken) return;
      dom.mushafLoadingSpinner.style.display = 'none';
      img.style.opacity = '1';
      if (!cachedUrl) cacheRemoteFile(sources[index]);
    };
    img.onerror = () => {
      if (token !== pageLoadToken) return;
      index++;
      if (index < sources.length) {
        img.src = sources[index];
      } else {
        dom.mushafLoadingSpinner.style.display = 'none';
        img.style.opacity = '1';
        updateStatus('تعذر تحميل صورة صفحة المصحف. تحقق من الاتصال بالإنترنت.');
      }
    };
    img.src = sources[0];
  }

  function changeMushafPage(delta) {
    loadMushafPageImage(state.currentMushafPage + delta);
  }

  // التكبير يُغيّر حجم خط المصحف وعرض الصفحة معاً فتبقى الأسطر متناسقة
  function adjustQuranFontScale(delta) {
    state.quranFontScale = clampFontScale(state.quranFontScale + delta);
    localStorage.setItem('quran_font_scale', String(state.quranFontScale));
    applyQuranFontScale();
  }

  function applyQuranFontScale() {
    dom.quranVersesContainer.style.setProperty('--mushaf-scale', (state.quranFontScale / 100).toFixed(2));
    dom.lblFontSizePercent.textContent = `${state.quranFontScale}%`;
    dom.btnFontMinus.disabled = (state.quranFontScale <= FONT_SCALE.min);
    dom.btnFontPlus.disabled = (state.quranFontScale >= FONT_SCALE.max);
  }

  // إعادة رسم نص المصحف مع الحفاظ على الآية والكلمة المظللتين
  function rerenderQuranText() {
    const surah = SURAHS.find(s => s.number === state.viewSurahNumber);
    if (!surah) return;
    const verse = activeVerse;
    const word = activeWord;
    renderUthmaniTextTab(surah);
    activeVerse = 0;
    activeWord = 0;
    activeSurah = null;
    if (verse > 0) highlightActiveVerseAndWord(verse, word, 'nearest', surah.number);
  }

  // ==========================================
  // QURAN FONT & CALLIGRAPHY ENGINE (QCF4 & UTHMANI)
  // ==========================================
  function applyQuranFontFamily(fontKey) {
    const selectedFont = QURAN_FONTS[fontKey] || QURAN_FONTS.qcf4;
    state.quranFont = QURAN_FONTS[fontKey] ? fontKey : 'qcf4';
    localStorage.setItem('quran_font_family', state.quranFont);

    dom.quranVersesContainer.style.fontFamily = selectedFont;
    document.documentElement.style.setProperty('--font-quran', selectedFont);
    dom.selQuranFontFamily.value = state.quranFont;

    rerenderQuranText();
  }

  // ==========================================
  // SPLITTER DRAGGABLE RESIZER FOR MUSHAF PANEL
  // ==========================================
  function initMushafResizer() {
    if (!dom.mushafResizer || !dom.mushafSidePanel) return;

    // Restore saved width if available, default to generous 650px
    const savedWidth = localStorage.getItem('quran_mushaf_panel_width');
    if (savedWidth) {
      const w = parseInt(savedWidth, 10);
      if (!isNaN(w) && w >= 360 && w <= window.innerWidth * 0.85) {
        state.mushafPanelWidth = w;
      }
    } else {
      // النسبة الافتراضية ثلثان للسور وثلث للمصحف مع بقاء إمكانية التحريك
      state.mushafPanelWidth = Math.max(360, Math.round(window.innerWidth / 3));
    }

    dom.mushafSidePanel.style.width = `${state.mushafPanelWidth}px`;
    dom.mushafSidePanel.style.flex = `0 0 ${state.mushafPanelWidth}px`;

    let isResizing = false;

    dom.mushafResizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      dom.mushafResizer.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const isRtl = (document.documentElement.dir === 'rtl' || getComputedStyle(document.documentElement).direction === 'rtl');
      // In RTL layout, the mushaf panel is docked on the left side of the screen
      let newWidth = isRtl ? e.clientX : (window.innerWidth - e.clientX);
      const minW = 360;
      const maxW = Math.round(window.innerWidth * 0.82);
      newWidth = Math.max(minW, Math.min(maxW, newWidth));

      state.mushafPanelWidth = newWidth;
      dom.mushafSidePanel.style.width = `${newWidth}px`;
      dom.mushafSidePanel.style.flex = `0 0 ${newWidth}px`;
    });

    window.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        dom.mushafResizer.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        localStorage.setItem('quran_mushaf_panel_width', String(state.mushafPanelWidth));
      }
    });

    // Touch support for touchscreens
    dom.mushafResizer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isResizing = true;
        dom.mushafResizer.classList.add('dragging');
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isResizing || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const isRtl = (document.documentElement.dir === 'rtl' || getComputedStyle(document.documentElement).direction === 'rtl');
      let newWidth = isRtl ? touch.clientX : (window.innerWidth - touch.clientX);
      newWidth = Math.max(360, Math.min(Math.round(window.innerWidth * 0.82), newWidth));
      state.mushafPanelWidth = newWidth;
      dom.mushafSidePanel.style.width = `${newWidth}px`;
      dom.mushafSidePanel.style.flex = `0 0 ${newWidth}px`;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isResizing) {
        isResizing = false;
        dom.mushafResizer.classList.remove('dragging');
        localStorage.setItem('quran_mushaf_panel_width', String(state.mushafPanelWidth));
      }
    });
  }

  // ==========================================
  // MUSHAF IMAGE ZOOM & PAN ENGINE
  // ==========================================
  function initMushafImageZoomAndPan() {
    if (!dom.imgMushafPage || !dom.mushafImageWrapper) return;

    function updateImageTransform() {
      if (state.mushafZoom <= 100) {
        state.panX = 0;
        state.panY = 0;
        dom.imgMushafPage.style.transform = '';
        dom.mushafImageWrapper.style.cursor = 'default';
      } else {
        dom.imgMushafPage.style.transform = `scale(${state.mushafZoom / 100}) translate(${state.panX}px, ${state.panY}px)`;
        dom.mushafImageWrapper.style.cursor = 'grab';
      }
      if (dom.lblZoomPercent) {
        dom.lblZoomPercent.textContent = `${state.mushafZoom}%`;
      }
    }

    function setZoom(newZoom) {
      state.mushafZoom = Math.max(50, Math.min(300, Math.round(newZoom)));
      updateImageTransform();
    }

    if (dom.btnZoomIn) {
      dom.btnZoomIn.addEventListener('click', (e) => {
        e.stopPropagation();
        setZoom(state.mushafZoom + 15);
      });
    }

    if (dom.btnZoomOut) {
      dom.btnZoomOut.addEventListener('click', (e) => {
        e.stopPropagation();
        setZoom(state.mushafZoom - 15);
      });
    }

    if (dom.btnZoomReset) {
      dom.btnZoomReset.addEventListener('click', (e) => {
        e.stopPropagation();
        state.panX = 0;
        state.panY = 0;
        setZoom(100);
      });
    }

    // Double-click to toggle between 100% and 150%
    dom.mushafImageWrapper.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (state.mushafZoom > 100) {
        state.panX = 0;
        state.panY = 0;
        setZoom(100);
      } else {
        setZoom(150);
      }
    });

    // Ctrl + Mouse Wheel Zoom
    dom.contentMushafImage.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 15 : -15;
        setZoom(state.mushafZoom + delta);
      }
    }, { passive: false });

    // Drag to Pan when Zoomed In
    let isDraggingPan = false;
    let dragStartX = 0;
    let dragStartY = 0;

    dom.mushafImageWrapper.addEventListener('mousedown', (e) => {
      if (state.mushafZoom <= 100) return;
      isDraggingPan = true;
      dragStartX = e.clientX - state.panX;
      dragStartY = e.clientY - state.panY;
      dom.mushafImageWrapper.classList.add('panning');
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingPan) return;
      state.panX = Math.round(e.clientX - dragStartX);
      state.panY = Math.round(e.clientY - dragStartY);
      updateImageTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingPan) {
        isDraggingPan = false;
        dom.mushafImageWrapper.classList.remove('panning');
      }
    });
  }

  // ==========================================
  // MAXIMIZE / RESTORE MUSHAF PANEL
  // ==========================================
  function toggleMushafMaximize(forceState) {
    const isCurrentlyMax = dom.mushafSidePanel.classList.contains('maximized');
    const makeMax = (forceState !== undefined) ? forceState : !isCurrentlyMax;

    dom.mushafSidePanel.classList.toggle('maximized', makeMax);
    dom.btnReadingMode.classList.toggle('active-mode', makeMax);
    if (dom.surahsContentColumn) {
      dom.surahsContentColumn.classList.toggle('hidden-by-mushaf', makeMax);
    }
    dom.cardsViewport.classList.toggle('hidden-by-mushaf', makeMax);
    if (dom.mushafResizer) {
      dom.mushafResizer.style.display = makeMax ? 'none' : 'flex';
    }
    if (dom.btnMaximizeMushaf) {
      dom.btnMaximizeMushaf.textContent = makeMax ? '🗗' : '⛶';
      dom.btnMaximizeMushaf.title = makeMax ? 'استعادة العرض المقسم' : 'تكبير نافذة المصحف والتفسير';
    }

    // نقل مشغل الصوت بين لوحة البطاقات ولوحة المصحف حسب حالة التكبير
    if (dom.playerIslandWrapper && !isMobileView()) {
      if (makeMax && dom.mushafSidePanel) {
        dom.mushafSidePanel.appendChild(dom.playerIslandWrapper);
      } else if (!makeMax && dom.cardsViewport) {
        dom.cardsViewport.appendChild(dom.playerIslandWrapper);
      }
    }
  }

  // ==========================================
  // WORD-BY-WORD TIMING & SYNCHRONIZATION
  // ==========================================
  function getTimingForSurah(surahNumber, reciterFolder) {
    const padded = String(surahNumber).padStart(3, '0');
    const key = `${reciterFolder}_${padded}`;
    if (window.QURAN_TIMINGS && window.QURAN_TIMINGS[key]) {
      return window.QURAN_TIMINGS[key];
    }
    return null;
  }

  // نسبة تصحيح التوقيت إذا اختلف طول ملف الصوت الفعلي عن طول ملف التوقيت
  function getTimingRatio(timing, audioDurationSec) {
    if (audioDurationSec > 1 && timing.d > 1000) {
      const ratio = (audioDurationSec * 1000) / timing.d;
      if (Math.abs(ratio - 1) > 0.04) return ratio;
    }
    return 1;
  }

  // موضع بداية كلمة (بالثواني) عند قارئ معين؛ null إن لم تتوفر بيانات التوقيت
  function getWordStartSeconds(surahNum, verseNum, wordPos, reciter, audioDurationSec) {
    const timing = getTimingForSurah(surahNum, reciter.folder);
    if (!timing || !timing.ts) return null;

    const verseKey = `${surahNum}:${verseNum}`;
    let startMs = -1;
    let previousEndMs = 0;
    for (const item of timing.ts) {
      if (item.vk === verseKey) {
        // تجاهل الشظايا الخاطئة القصيرة جداً في بداية التلاوة (مثل < 500ms قبل بدء الآية الأولى)
        if (verseNum > 1 && previousEndMs === 0 && (item.t - item.f) < 300) continue;
        const segs = item.s || [];
        const seg = segs.find(s => s[0] === wordPos);
        if (seg) {
          startMs = seg[1];
        } else if (wordPos === 1 || segs.length === 0 || segs[0][0] > wordPos) {
          startMs = item.f;
        } else {
          const prevSeg = [...segs].reverse().find(s => s[0] < wordPos);
          startMs = prevSeg ? prevSeg[2] : item.f;
        }
        break;
      } else if (parseInt(item.vk.split(':')[1], 10) < verseNum) {
        previousEndMs = Math.max(previousEndMs, item.t);
      }
    }
    // آية بلا توقيت في البيانات: نبدأ من نهاية الآية السابقة لها
    if (startMs < 0) startMs = previousEndMs;

    return (startMs / 1000) * getTimingRatio(timing, audioDurationSec);
  }

  // الانتقال الصوتي إلى كلمة (يدعم كلمات السور المجاورة المعروضة في الصفحة نفسها)
  function seekToWord(verseNum, wordPos, surahNumOverride) {
    const surahNum = surahNumOverride || state.viewSurahNumber;
    if (!surahNum) return;

    setFollowPlayback(true);

    const isSameAudio = (state.currentSurahNumber === surahNum) && (state.viewSurahNumber === surahNum);
    const targetSec = getWordStartSeconds(surahNum, verseNum, wordPos, getCurrentReciter(), isSameAudio ? dom.audio.duration : 0) || 0;

    if (!isSameAudio) {
      playSurah(surahNum, targetSec, true);
      return;
    }

    highlightActiveVerseAndWord(verseNum, wordPos, 'nearest', surahNum);
    dom.audio.currentTime = targetSec;
    if (dom.audio.paused) playAudio();
  }

  function seekToVerse(verseNum, surahNumOverride) {
    seekToWord(verseNum, 1, surahNumOverride);
  }

  function syncCurrentWordAndVerse(currentSec, totalSec) {
    if (!state.wordSyncActive || !followPlayback) return;
    if (!state.currentSurahNumber || state.viewSurahNumber !== state.currentSurahNumber) return;

    const timing = getTimingForSurah(state.currentSurahNumber, getCurrentReciter().folder);
    if (!timing || !timing.ts || timing.ts.length === 0) return;

    const currentMs = (currentSec * 1000) / getTimingRatio(timing, totalSec);

    let matchedItem = null;
    for (const item of timing.ts) {
      if (item.f > currentMs) break;
      matchedItem = item;
    }
    if (!matchedItem) return;

    const verseNum = parseInt(matchedItem.vk.split(':')[1], 10);
    let wordPos = 1;
    for (const seg of (matchedItem.s || [])) {
      if (seg[1] > currentMs) break;
      wordPos = seg[0];
    }

    highlightActiveVerseAndWord(verseNum, wordPos, 'nearest', state.currentSurahNumber);
  }

  function highlightActiveVerseAndWord(verseNum, wordPos, scrollBlock = 'nearest', surahNum = state.viewSurahNumber) {
    const surahChanged = (activeSurah !== surahNum);
    if (!surahChanged && activeVerse === verseNum && activeWord === wordPos) return;
    const verseChanged = (activeVerse !== verseNum) || surahChanged;
    activeSurah = surahNum;
    activeVerse = verseNum;
    activeWord = wordPos;

    const container = dom.quranVersesContainer;
    if (verseChanged) {
      container.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
      container.querySelectorAll(
        `.quran-word[data-surah="${surahNum}"][data-verse="${verseNum}"], .verse-sign[data-surah="${surahNum}"][data-verse="${verseNum}"]`
      ).forEach(el => el.classList.add('verse-active'));
    }

    const prevWord = container.querySelector('.quran-word.word-active');
    if (prevWord) prevWord.classList.remove('word-active');
    const wordEl = container.querySelector(`.quran-word[data-surah="${surahNum}"][data-verse="${verseNum}"][data-word="${wordPos}"]`);
    if (wordEl) {
      wordEl.classList.add('word-active');
      if (state.currentMushafTab === 'text') {
        scrollIntoPanel(wordEl, scrollBlock);
      }
    }

    if (!verseChanged) return;

    syncTafsirHighlight(verseNum, scrollBlock);
    syncMushafPageToVerse(surahNum, verseNum);
    syncQuickNavSelection();

    const mindmapBlocks = dom.mindmapTopicsFlow.querySelectorAll('.mindmap-block');
    const surah = SURAHS.find(s => s.number === state.viewSurahNumber);
    if (mindmapBlocks.length > 0 && surah) {
      const blockIdx = Math.min(mindmapBlocks.length - 1, Math.floor(((verseNum - 1) / surah.ayahs) * mindmapBlocks.length));
      mindmapBlocks.forEach((block, i) => block.classList.toggle('mindmap-active', i === blockIdx));
    }
  }

  // ==========================================
  // QUICK NAVIGATION (SURAH / VERSE / TEXT <-> TAFSIR)
  // ==========================================
  function populateQuickNavSurahs() {
    dom.selQuickSurah.innerHTML = '';
    SURAHS.forEach(s => dom.selQuickSurah.appendChild(new Option(`${s.number} - ${s.nameAr}`, s.number)));
  }

  function populateQuickNavVerses(surah) {
    dom.selQuickVerse.innerHTML = '';
    for (let v = 1; v <= surah.ayahs; v++) {
      dom.selQuickVerse.appendChild(new Option(String(v), v));
    }
  }

  function syncQuickNavSelection() {
    dom.selQuickSurah.value = String(state.viewSurahNumber);
    dom.selQuickVerse.value = String(activeVerse > 0 ? activeVerse : 1);
  }

  function updateQuickNav() {
    const tab = state.currentMushafTab;
    const visible = (tab === 'text' || tab === 'tafsir');
    dom.mushafQuickNav.style.display = visible ? 'flex' : 'none';
    if (!visible) return;

    const toTafsir = (tab === 'text');
    dom.btnQuickSwitch.textContent = toTafsir ? '📚 تفسير الآية' : '📜 نص الآية';
    dom.btnQuickSwitch.title = toTafsir ? 'الانتقال إلى تفسير هذه الآية' : 'الانتقال إلى نص هذه الآية';
    dom.btnQuickFollow.style.display = (!followPlayback && state.currentSurahNumber !== null) ? '' : 'none';
  }

  function setFollowPlayback(value) {
    followPlayback = value;
    updateQuickNav();
  }

  // انتقال يدوي إلى آية: يوقف تتبع التلاوة حتى ينقر المستخدم على آية أو زر «تتبع التلاوة»
  function navigateToVerse(surahNumber, verseNum) {
    const surah = SURAHS.find(s => s.number === surahNumber);
    if (!surah) return;
    const verse = Math.max(1, Math.min(surah.ayahs, verseNum));

    loadSurahInMushaf(surahNumber);
    setFollowPlayback(false);
    highlightActiveVerseAndWord(verse, 1, 'center', surahNumber);
    syncMushafPageToVerse(surahNumber, verse);
  }

  function openVerseInTab(tabName, verseNum) {
    navigateToVerse(state.viewSurahNumber, verseNum);
    switchMushafTab(tabName);
  }

  function stepVerse(delta) {
    const index = SURAHS.findIndex(s => s.number === state.viewSurahNumber);
    if (index < 0) return;

    let surah = SURAHS[index];
    let verse = (activeVerse || 1) + delta;
    if (verse > surah.ayahs) {
      surah = SURAHS[index + 1];
      verse = 1;
    } else if (verse < 1) {
      surah = SURAHS[index - 1];
      if (surah) verse = surah.ayahs;
    }
    if (!surah) return;
    navigateToVerse(surah.number, verse);
  }

  function resumeFollowPlayback() {
    if (state.currentSurahNumber === null) return;
    setFollowPlayback(true);
    loadSurahInMushaf(state.currentSurahNumber);
    syncCurrentWordAndVerse(dom.audio.currentTime || 0, dom.audio.duration || 0);
    scrollActiveVerseIntoView('center');
  }

  // ==========================================
  // 11. AUDIO PLAYER ENGINE
  // ==========================================
  function initAudioPlayer() {
    dom.audio.volume = state.volume / 100;
    dom.volumeSlider.value = state.volume;
    dom.lblVolumePercent.textContent = `${state.volume}%`;
    dom.volumeSliderFill.style.width = `${state.volume}%`;
    setPlaybackSpeed(state.playbackSpeed);
    updateRepeatUI();

    dom.audio.addEventListener('timeupdate', onAudioTimeUpdate);
    dom.audio.addEventListener('loadedmetadata', onAudioLoadedMetadata);
    dom.audio.addEventListener('ended', onAudioEnded);
    dom.audio.addEventListener('play', () => setPlaybackState(true));
    dom.audio.addEventListener('pause', onAudioPause);
    dom.audio.addEventListener('seeking', () => { lastListenTick = null; });
    dom.audio.addEventListener('error', onAudioError);

    dom.seekSlider.addEventListener('input', onSeekInput);
    dom.seekSlider.addEventListener('change', onSeekChange);
    dom.volumeSlider.addEventListener('input', onVolumeInput);
  }

  // مصادر مداد (مصحف معلم) لكل قارئ — مفتاح = مجلد القارئ
  const MIDAD_COLLECTIONS = {
    ghamdi: 460158,   // سعد الغامدي
    abbad: 461242,    // فارس عباد
    hussary: 35259,   // محمود خليل الحصري (حفص، بتوقف بين الآيات)
    warsh: 461176     // محمود خليل الحصري (ورش)
  };
  const MIDAD_CACHE_KEY = 'quran_midad_links';
  const MIDAD_CACHE_TTL = 24 * 3600 * 1000;

  function getAudioUrls(surahNumber, reciterId) {
    const reciter = RECITERS.find(r => r.id === (reciterId || state.reciterId)) || RECITERS[0];
    const padded = String(surahNumber).padStart(3, '0');
    const local = `sound/${reciter.folder}/${padded}.mp3`;

    // القراء ذوو المصدر من مداد — بلا mp3quran
    if (MIDAD_COLLECTIONS[reciter.folder]) {
      const map = window.MIDAD_AUDIO && window.MIDAD_AUDIO[reciter.folder];
      const url = (map && map[surahNumber]) || '';
      return { local, remote: url, alt: null };
    }

    return {
      local,
      remote: `${reciter.baseUrl.replace(/\/+$/, '')}/${padded}.mp3`,
      alt: null
    };
  }

  // ---------------------------------------------------------------
  // تجديد تلقائي مباشر لروابط مداد من الإنترنت عبر المتصفح فقط (بدون بايثون أو خادم محلي):
  //  1) فحص صلاحية التوقيع الفعلي (X-Amz-Date / X-Amz-Expires) وكاش localStorage
  //  2) جلب الروابط المحدثة مباشرة من الإنترنت بالتوازي عبر نقاط عبور CORS متعددة
  //  3) إعادة التحديث الفوري التلقائي عند تعذر تشغيل أي ملف بسبب انتهاء صلاحية الرابط
  // ---------------------------------------------------------------
  function parseJsonArray(text) {
    if (!text) return null;
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start < 0 || end <= start) return null;
    try { return JSON.parse(text.slice(start, end + 1)); } catch (e) { return null; }
  }

  function extractSurahMapFromText(text) {
    const arr = parseJsonArray(text);
    const map = {};
    if (Array.isArray(arr)) {
      arr.forEach(entry => {
        const p = (entry && (entry.path || entry.url || entry.download_url)) || '';
        if (p.indexOf('.mp3') < 0) return;
        const m = p.match(/\/(\d{3})\.mp3/);
        if (m) map[parseInt(m[1], 10)] = p.replace(/&amp;/g, '&');
      });
      if (Object.keys(map).length > 0) return map;
    }
    const regex = /https:\/\/[^"'\s<>]+?\/(\d{3})\.mp3\?[^"\'\s<>]+/g;
    let m;
    while ((m = regex.exec(text || '')) !== null) {
      const num = parseInt(m[1], 10);
      if (!map[num]) map[num] = m[0].replace(/&amp;/g, '&');
    }
    return map;
  }

  function isSignedUrlFresh(url) {
    if (!url || typeof url !== 'string') return false;
    const mDate = url.match(/[?&]X-Amz-Date=(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/i);
    const mExp = url.match(/[?&]X-Amz-Expires=(\d+)/i);
    if (!mDate || !mExp) return true;
    const signedAtMs = Date.UTC(+mDate[1], +mDate[2] - 1, +mDate[3], +mDate[4], +mDate[5], +mDate[6]);
    const expiresMs = parseInt(mExp[1], 10) * 1000;
    // نعتبر الرابط صالحاً إذا تبقى على انتهاء توقيعه أكثر من 6 ساعات
    return (Date.now() + 6 * 3600 * 1000) < (signedAtMs + expiresMs);
  }

  function isMidadMapFresh(data) {
    if (!data || typeof data !== 'object') return false;
    return Object.keys(MIDAD_COLLECTIONS).every(folder => {
      const folderMap = data[folder];
      const sampleUrl = folderMap && (folderMap[1] || folderMap[78] || folderMap[114]);
      return isSignedUrlFresh(sampleUrl);
    });
  }

  function midadResourcesUrl(collectionId) {
    return `https://midad.com/collection-resources/${collectionId}`;
  }

  async function fetchMidadFolderFromWeb(folder) {
    const collectionId = MIDAD_COLLECTIONS[folder];
    if (!collectionId) return null;
    const target = midadResourcesUrl(collectionId);
    const endpoints = [
      target,
      'https://api.allorigins.win/raw?url=' + encodeURIComponent(target),
      'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(target),
      'https://r.jina.ai/' + target,
      'https://corsproxy.io/?' + encodeURIComponent(target)
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) continue;
        const text = await res.text();
        const map = extractSurahMapFromText(text);
        if (map && Object.keys(map).length > 0) return map;
      } catch (e) { /* ننتقل للوسيط التالي */ }
    }
    return null;
  }

  let midadRefreshPromise = null;

  async function refreshMidadLinks(force = false, targetFolder = null) {
    if (!force && !targetFolder) {
      const cached = loadJson(MIDAD_CACHE_KEY, null);
      if (cached && cached.at && (Date.now() - cached.at < MIDAD_CACHE_TTL)
          && cached.data && isMidadMapFresh(cached.data)) {
        window.MIDAD_AUDIO = Object.assign({}, window.MIDAD_AUDIO || {}, cached.data);
        return window.MIDAD_AUDIO;
      }
      if (window.MIDAD_AUDIO && isMidadMapFresh(window.MIDAD_AUDIO)) {
        try {
          localStorage.setItem(MIDAD_CACHE_KEY, JSON.stringify({ at: Date.now(), data: window.MIDAD_AUDIO }));
        } catch (e) {}
        return window.MIDAD_AUDIO;
      }
    }

    if (midadRefreshPromise && !targetFolder) return midadRefreshPromise;

    const folders = targetFolder ? [targetFolder] : Object.keys(MIDAD_COLLECTIONS);
    const task = (async () => {
      const collected = {};
      let gotAny = false;

      await Promise.all(folders.map(async folder => {
        const map = await fetchMidadFolderFromWeb(folder);
        if (map && Object.keys(map).length > 0) {
          collected[folder] = map;
          gotAny = true;
        }
      }));

      if (gotAny) {
        const merged = Object.assign({}, window.MIDAD_AUDIO || {}, collected);
        window.MIDAD_AUDIO = merged;
        try {
          localStorage.setItem(MIDAD_CACHE_KEY, JSON.stringify({ at: Date.now(), data: merged }));
        } catch (e) { /* التخزين ممتلئ أو ممنوع */ }
      }
      return window.MIDAD_AUDIO;
    })();

    if (!targetFolder) {
      midadRefreshPromise = task.finally(() => { midadRefreshPromise = null; });
      return midadRefreshPromise;
    }
    return task;
  }

  let audioSession = null; // { fallback, startPos, scaleByTiming, autoplay } للملف الجاري تحميله
  let audioBlobUrl = null;
  let audioLoadToken = 0;

  function playAudio() {
    dom.audio.play().catch(err => {
      if (err.name === 'NotAllowedError') {
        updateStatus('منع المتصفح التشغيل التلقائي، اضغط زر التشغيل للبدء.');
      }
      // بقية الأخطاء (تبديل المصدر أو ملف غير صالح) يعالجها حدث error
    });
  }

  function playSurah(surahNumber, startPos = 0, scaleByTiming = false) {
    return loadAudio(surahNumber, startPos, true, scaleByTiming);
  }

  // تحميل تلاوة السورة: النسخة المحفوظة أولاً، ثم الملف المحلي، ثم الرابط السحابي
  // scaleByTiming: موضع البداية محسوب بزمن ملف التوقيت فيُصحَّح بطول الملف الفعلي عند تحميله
  async function loadAudio(surahNumber, startPos = 0, autoplay = true, scaleByTiming = false) {
    const surah = SURAHS.find(s => s.number === surahNumber);
    if (!surah) return;

    const token = ++audioLoadToken;
    const reciter = getCurrentReciter();
    const urls = getAudioUrls(surahNumber, reciter.id);

    const cachedUrl = await getCachedObjectUrl([urls.local, urls.remote, urls.alt].filter(Boolean));
    if (token !== audioLoadToken) {
      if (cachedUrl) URL.revokeObjectURL(cachedUrl);
      return;
    }
    if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
    audioBlobUrl = cachedUrl;

    state.currentSurahNumber = surahNumber;
    setFollowPlayback(true);
    audioSession = { fallback: cachedUrl ? null : [urls.remote, urls.alt].filter(Boolean), startPos, scaleByTiming, autoplay };
    lastListenTick = null;

    dom.audio.src = cachedUrl || urls.local;
    dom.audio.playbackRate = state.playbackSpeed;

    if (autoplay) {
      playAudio();
      recordSurahPlayStats(surahNumber, reciter.id);
      updateStatus(`${state.lang === 'ar' ? 'جاري الاستماع إلى:' : 'Now Playing:'} ${getSurahName(surah)}`);
    } else {
      setPlaybackState(false);
    }

    updateNowPlayingInfo();
    renderSurahCards();
    updateMediaSession();
    loadSurahInMushaf(surahNumber);
    if (autoplay) {
      switchMushafTab('text');
      if (isMobileView()) switchMobileView('mushaf');
    }
    autoCacheSurahAudio(surahNumber, reciter.id);
  }

  function playPlaylist(surahNumbers, startIndex = 0) {
    if (!surahNumbers || surahNumbers.length === 0) return;
    state.playlist = [...surahNumbers];
    state.playlistIndex = (startIndex >= 0 && startIndex < state.playlist.length) ? startIndex : 0;
    playSurah(state.playlist[state.playlistIndex]);
  }

  function playAll() {
    if (state.selectedSurahNumbers.size > 0) {
      const sorted = Array.from(state.selectedSurahNumbers).sort((a, b) => a - b);
      playPlaylist(sorted, 0);
    } else {
      const allNumbers = SURAHS.map(s => s.number);
      playPlaylist(allNumbers, 0);
    }
  }

  function togglePlayPause() {
    if (state.currentSurahNumber === null) {
      const first = (state.selectedSurahNumbers.size > 0)
        ? Array.from(state.selectedSurahNumbers)[0]
        : (state.viewSurahNumber || SURAHS[0].number);
      playSurah(first);
      return;
    }

    if (dom.audio.paused) {
      playAudio();
      switchMushafTab('text');
      if (isMobileView()) switchMobileView('mushaf');
    } else {
      dom.audio.pause();
    }
  }

  function stopAudio() {
    dom.audio.pause();
    dom.audio.currentTime = 0;
    setPlaybackState(false);
    dom.lblCurrentTime.textContent = '00:00';
    dom.seekSlider.value = 0;
    dom.seekSliderFill.style.width = '0%';
    renderSurahCards();
  }

  function nextTrack() {
    if (state.playlist.length > 0 && state.playlistIndex >= 0) {
      let nextIndex = state.playlistIndex + 1;
      if (nextIndex >= state.playlist.length) {
        if (state.repeatMode === 2) {
          nextIndex = 0;
        } else {
          stopAudio();
          return;
        }
      }
      state.playlistIndex = nextIndex;
      playSurah(state.playlist[nextIndex]);
    } else {
      const current = state.currentSurahNumber || 77;
      let nextSurah = current + 1;
      if (current === 1) nextSurah = 78;
      else if (nextSurah > 114) {
        if (state.repeatMode === 2) nextSurah = 78;
        else { stopAudio(); return; }
      }
      playSurah(nextSurah);
    }
  }

  function prevTrack() {
    if (state.playlist.length > 0 && state.playlistIndex >= 0) {
      let prevIndex = state.playlistIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.playlist.length - 1;
      }
      state.playlistIndex = prevIndex;
      playSurah(state.playlist[prevIndex]);
    } else {
      const current = state.currentSurahNumber || 79;
      let prevSurah = current - 1;
      if (current === 78) prevSurah = 1;
      else if (prevSurah < 1) prevSurah = 114;
      playSurah(prevSurah);
    }
  }

  function onAudioEnded() {
    recordCompletionStats();
    localStorage.removeItem('quran_last_session'); // لا معنى لمتابعة سورة انتهت

    if (state.repeatMode === 1) {
      dom.audio.currentTime = 0;
      playAudio();
    } else if (state.autoAdvance || state.repeatMode === 2) {
      nextTrack();
    } else {
      stopAudio();
    }
  }

  function onAudioPause() {
    setPlaybackState(false);
    persistProgress();
  }

  function setPlaybackState(isPlaying) {
    state.isPlaying = isPlaying;
    dom.svgPlay.style.display = isPlaying ? 'none' : 'block';
    dom.svgPause.style.display = isPlaying ? 'block' : 'none';
    renderSurahCards();
  }

  function updateNowPlayingInfo() {
    const surah = SURAHS.find(s => s.number === state.currentSurahNumber);
    const reciter = getCurrentReciter();

    if (surah) {
      dom.lblNowPlayingSurah.textContent = `${getSurahName(surah)} (${surah.ayahs} ${t('ayahs')})`;
    } else {
      dom.lblNowPlayingSurah.textContent = t('surahDefaultTitle');
    }

    dom.lblNowPlayingReciter.textContent = t('reciterBy', getReciterDisplayName(reciter));
  }

  let lastListenTick = null; // آخر موضع تشغيل محسوب في وقت الاستماع
  let lastPersistAt = 0;

  // تجميع وقت الاستماع الفعلي (يتجاهل القفزات الكبيرة عند التقديم والتأخير)
  function trackListening(currentSec) {
    if (!state.isPlaying || state.currentSurahNumber === null) {
      lastListenTick = null;
      return;
    }
    if (lastListenTick !== null) {
      const delta = currentSec - lastListenTick;
      if (delta > 0 && delta < 2) {
        const surahNum = state.currentSurahNumber;
        state.stats.totalSeconds += delta;
        state.stats.surahSeconds[surahNum] = (state.stats.surahSeconds[surahNum] || 0) + delta;
      }
    }
    lastListenTick = currentSec;

    const now = Date.now();
    if (now - lastPersistAt > 5000) {
      lastPersistAt = now;
      persistProgress();
    }
  }

  function onAudioTimeUpdate() {
    const current = dom.audio.currentTime || 0;
    const duration = dom.audio.duration || 0;

    trackListening(current);

    if (dom.seekSlider.dataset.dragging !== 'true') {
      dom.lblCurrentTime.textContent = formatTime(current);
      if (duration > 0) {
        dom.seekSlider.value = (current / duration) * 1000;
        dom.seekSliderFill.style.width = `${(current / duration) * 100}%`;
        dom.lblTotalTime.textContent = formatTime(duration);
      }
    }

    if (state.wordSyncActive && state.currentSurahNumber) {
      syncCurrentWordAndVerse(current, duration);
    }
  }

  function onAudioLoadedMetadata() {
    const duration = dom.audio.duration || 0;
    dom.lblTotalTime.textContent = formatTime(duration);

    if (audioSession && audioSession.startPos > 0) {
      let position = audioSession.startPos;
      if (audioSession.scaleByTiming && state.currentSurahNumber !== null) {
        const timing = getTimingForSurah(state.currentSurahNumber, getCurrentReciter().folder);
        if (timing) position *= getTimingRatio(timing, duration);
      }
      dom.audio.currentTime = Math.min(position, duration || position);
      audioSession.startPos = 0;
    }
  }

  function onSeekInput() {
    dom.seekSlider.dataset.dragging = 'true';
    const duration = dom.audio.duration || 0;
    if (duration > 0) {
      const targetSec = (dom.seekSlider.value / 1000) * duration;
      dom.lblCurrentTime.textContent = formatTime(targetSec);
      dom.seekSliderFill.style.width = `${(dom.seekSlider.value / 1000) * 100}%`;
    }
  }

  function onSeekChange() {
    dom.seekSlider.dataset.dragging = 'false';
    const duration = dom.audio.duration || 0;
    if (duration > 0) {
      dom.audio.currentTime = (dom.seekSlider.value / 1000) * duration;
    }
  }

  function onVolumeInput() {
    const vol = parseInt(dom.volumeSlider.value, 10);
    setVolume(vol);
  }

  function setVolume(vol) {
    state.volume = Math.max(0, Math.min(100, vol));
    localStorage.setItem('quran_volume', state.volume);
    dom.audio.volume = state.volume / 100;
    dom.volumeSlider.value = state.volume;
    dom.volumeSliderFill.style.width = `${state.volume}%`;
    dom.lblVolumePercent.textContent = `${state.volume}%`;

    if (state.volume > 0) {
      state.lastNonZeroVolume = state.volume;
      dom.muteIcon.textContent = (state.volume < 40) ? '🔉' : '🔊';
    } else {
      dom.muteIcon.textContent = '🔇';
    }
    dom.btnMute.title = (state.volume > 0) ? t('mute') : t('unmute');
  }

  function toggleMute() {
    if (state.volume > 0) {
      state.lastNonZeroVolume = state.volume;
      setVolume(0);
    } else {
      setVolume(state.lastNonZeroVolume || 85);
    }
  }

  function cycleRepeatMode() {
    state.repeatMode = (state.repeatMode + 1) % 3;
    localStorage.setItem('quran_repeat_mode', state.repeatMode);
    updateRepeatUI();
  }

  function updateRepeatUI() {
    dom.btnRepeat.classList.toggle('active', state.repeatMode > 0);

    if (state.repeatMode === 1) {
      dom.repeatBadge.style.display = 'flex';
      dom.repeatBadge.textContent = '1';
      dom.btnRepeat.title = t('repeatSurah');
    } else if (state.repeatMode === 2) {
      dom.repeatBadge.style.display = 'flex';
      dom.repeatBadge.textContent = '∞';
      dom.btnRepeat.title = t('repeatList');
    } else {
      dom.repeatBadge.style.display = 'none';
      dom.btnRepeat.title = t('repeatNormal');
    }
  }

  const PLAYBACK_SPEEDS = [0.75, 1.0, 1.25, 1.5];

  function setPlaybackSpeed(speed) {
    state.playbackSpeed = PLAYBACK_SPEEDS.includes(speed) ? speed : 1.0;
    localStorage.setItem('quran_speed', String(state.playbackSpeed));

    dom.audio.playbackRate = state.playbackSpeed;
    const speedText = String(state.playbackSpeed);
    dom.lblSpeed.textContent = `${speedText}×`;
    dom.btnSpeed.title = t('speed', speedText);
    dom.selDefaultSpeed.value = String(state.playbackSpeed);
  }

  function cyclePlaybackSpeed() {
    const nextIdx = (PLAYBACK_SPEEDS.indexOf(state.playbackSpeed) + 1) % PLAYBACK_SPEEDS.length;
    setPlaybackSpeed(PLAYBACK_SPEEDS[nextIdx]);
  }

  async function onAudioError() {
    if (!audioSession) return;

    // الملف المحلي غير موجود: نجرّب المصادر السحابية بالترتيب
    if (Array.isArray(audioSession.fallback) && audioSession.fallback.length > 0) {
      const nextUrl = audioSession.fallback.shift();
      dom.audio.src = nextUrl;
      if (audioSession.autoplay) playAudio();
      return;
    }
    if (typeof audioSession.fallback === 'string') {
      const fallbackUrl = audioSession.fallback;
      audioSession.fallback = null;
      dom.audio.src = fallbackUrl;
      if (audioSession.autoplay) playAudio();
      return;
    }

    // إذا كان القارئ من مصادر مداد وتعذر التشغيل (انتهاء صلاحية الرابط الموقع)، نجدد الرابط مباشرة من الإنترنت ونعيد المحاولة تلقائياً
    const reciter = getCurrentReciter();
    const surahNum = state.currentSurahNumber;
    if (reciter && surahNum && MIDAD_COLLECTIONS[reciter.folder] && !audioSession.retriedMidadRefresh) {
      audioSession.retriedMidadRefresh = true;
      updateStatus(state.lang === 'ar'
        ? 'جاري تجديد رابط التلاوة تلقائياً من الإنترنت...'
        : (state.lang === 'fr' ? 'Actualisation automatique du lien audio...' : 'Refreshing audio link from the web...'));
      await refreshMidadLinks(true, reciter.folder);
      const freshUrls = getAudioUrls(surahNum, reciter.id);
      if (freshUrls.remote) {
        dom.audio.src = freshUrls.remote;
        if (audioSession.autoplay) playAudio();
        return;
      }
    }

    setPlaybackState(false);
    updateStatus(state.lang === 'ar'
      ? 'تعذر تشغيل الملف الصوتي. يرجى التحقق من اتصال الإنترنت.'
      : (state.lang === 'fr' ? 'Impossible de lire le fichier audio.' : 'Could not play audio track.'));
  }

  function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateMediaSession() {
    if (!('mediaSession' in navigator) || !state.currentSurahNumber) return;

    const surah = SURAHS.find(s => s.number === state.currentSurahNumber);

    navigator.mediaSession.metadata = new MediaMetadata({
      title: getSurahName(surah),
      artist: getReciterDisplayName(getCurrentReciter()),
      album: t('appTitle'),
      artwork: [{ src: '3ama.ico', sizes: '128x128', type: 'image/x-icon' }]
    });

    navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
    navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
    navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
    navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
    navigator.mediaSession.setActionHandler('stop', () => stopAudio());
  }

  // ==========================================
  // 12. STUDENT VOICE RECORDING (NEW!)
  // ==========================================
  // تشغيل/إيقاف تسجيل الطالب مباشرة (بدون نافذة منبثقة)
  function toggleRecordingPlayback() {
    const el = dom.recordedAudioElement;
    if (!el || !el.src) return;
    if (el.paused) {
      if (!dom.audio.paused) dom.audio.pause();
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }

  async function toggleVoiceRecording() {
    if (!state.isRecording) {
      try {
        // إيقاف التلاوة مؤقتاً حتى لا يلتقط الميكروفون صوت الشيخ فيبدو التسجيل وكأنه للشيخ
        if (!dom.audio.paused) {
          dom.audio.pause();
          updateStatus('تم إيقاف التلاوة مؤقتاً أثناء التسجيل.');
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });
        state.audioChunks = [];
        state.mediaRecorder = new MediaRecorder(stream);

        state.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) state.audioChunks.push(e.data);
        };

        state.mediaRecorder.onstop = () => {
          const blob = new Blob(state.audioChunks, { type: 'audio/webm' });
          if (state.recordedBlobUrl) URL.revokeObjectURL(state.recordedBlobUrl);
          state.recordedBlobUrl = URL.createObjectURL(blob);

          dom.recordedAudioElement.src = state.recordedBlobUrl;
          if (dom.btnDownloadRecording) {
            dom.btnDownloadRecording.href = state.recordedBlobUrl;
            dom.btnDownloadRecording.style.display = 'inline-flex';
          }
          dom.btnPlayRecording.style.display = 'inline-flex';
          if (dom.lblPlayRecording) dom.lblPlayRecording.textContent = t('playRecord');
        };

        state.mediaRecorder.start();
        state.isRecording = true;
        state.recordSeconds = 0;
        dom.recordTimer.textContent = '00:00';
        dom.recordTimer.style.display = 'inline-block';
        dom.btnRecordVoice.classList.add('recording');
        dom.lblRecordVoice.textContent = t('recordStop');

        state.recordTimerInterval = setInterval(() => {
          state.recordSeconds++;
          dom.recordTimer.textContent = formatTime(state.recordSeconds);
        }, 1000);

      } catch (err) {
        console.error('Microphone access denied:', err);
        alert('تعذر الوصول إلى الميكروفون. يرجى السماح بالإذن في إعدادات المتصفح.');
      }
    } else {
      // Stop recording
      if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
        state.mediaRecorder.stop();
        state.mediaRecorder.stream.getTracks().forEach(t => t.stop());
      }
      clearInterval(state.recordTimerInterval);
      state.isRecording = false;
      dom.recordTimer.style.display = 'none';
      dom.btnRecordVoice.classList.remove('recording');
      dom.lblRecordVoice.textContent = t('recordStart');
      updateStatus('اكتمل تسجيل التلاوة — يمكنك الاستماع إليه أو تحميله.');
    }
  }

  // ==========================================
  // 13. SESSION RESUME & STATS (NEW!)
  // ==========================================
  function saveSessionCheckpoint(surahNumber, reciterId, timeSec) {
    localStorage.setItem('quran_last_session', JSON.stringify({
      surahNumber,
      reciterId,
      timeSec: Math.floor(timeSec),
      timestamp: Date.now()
    }));
  }

  // حفظ الإحصائيات وموضع الاستماع الأخير
  function persistProgress() {
    localStorage.setItem('quran_listening_stats', JSON.stringify(state.stats));

    const current = dom.audio.currentTime || 0;
    if (state.autoResume && state.currentSurahNumber !== null && current > 2 && !dom.audio.ended) {
      saveSessionCheckpoint(state.currentSurahNumber, state.reciterId, current);
    }
  }

  function checkSessionResume() {
    if (!state.autoResume) return;

    const session = loadJson('quran_last_session', null);
    if (!session || !(session.timeSec > 5)) return;

    const surah = SURAHS.find(s => s.number === session.surahNumber);
    const reciter = RECITERS.find(r => r.id === session.reciterId);
    if (!surah || !reciter) return;

    dom.lblResumeText.textContent = `متابعة الاستماع لسورة ${surah.nameAr} بصوت ${reciter.nameArShort} من الدقيقة ${formatTime(session.timeSec)}؟`;
    dom.sessionResumeBanner.style.display = 'flex';

    // يظهر شريط المتابعة 5 ثوانٍ ثم يختفي تلقائياً
    const hideTimer = setTimeout(() => {
      dom.sessionResumeBanner.style.display = 'none';
    }, 5000);

    dom.btnResumePlay.onclick = () => {
      clearTimeout(hideTimer);
      dom.sessionResumeBanner.style.display = 'none';
      selectReciter(reciter.id);
      playSurah(surah.number, session.timeSec);
    };

    dom.btnResumeDismiss.onclick = () => {
      clearTimeout(hideTimer);
      dom.sessionResumeBanner.style.display = 'none';
      localStorage.removeItem('quran_last_session');
    };
  }

  function recordSurahPlayStats(surahNumber, reciterId) {
    state.stats.surahPlays[surahNumber] = (state.stats.surahPlays[surahNumber] || 0) + 1;
    state.stats.reciterPlays[reciterId] = (state.stats.reciterPlays[reciterId] || 0) + 1;
    state.stats.lastPlayed[surahNumber] = Date.now();
    localStorage.setItem('quran_listening_stats', JSON.stringify(state.stats));
  }

  function recordCompletionStats() {
    state.stats.completedSurahs = (state.stats.completedSurahs || 0) + 1;
    localStorage.setItem('quran_listening_stats', JSON.stringify(state.stats));
  }

  function topEntry(counts) {
    let topKey = null;
    let topCount = 0;
    for (const [key, count] of Object.entries(counts || {})) {
      if (count > topCount) {
        topCount = count;
        topKey = parseInt(key, 10);
      }
    }
    return { key: topKey, count: topCount };
  }

  function openStatsModal() {
    dom.statTotalMinutes.textContent = `${Math.round(state.stats.totalSeconds / 60)} دقيقة`;
    dom.statCompletedCount.textContent = state.stats.completedSurahs || 0;

    const topSurah = topEntry(state.stats.surahPlays);
    const topSurahObj = SURAHS.find(s => s.number === topSurah.key);
    dom.statTopSurah.textContent = topSurahObj ? `${topSurahObj.nameAr} (${topSurah.count})` : '-';

    const topReciter = topEntry(state.stats.reciterPlays);
    const topReciterObj = RECITERS.find(r => r.id === topReciter.key);
    dom.statTopReciter.textContent = topReciterObj ? `${topReciterObj.nameArShort} (${topReciter.count})` : '-';

    dom.statsTableBody.innerHTML = '';
    SURAHS.forEach(s => {
      const plays = state.stats.surahPlays[s.number] || 0;
      const seconds = state.stats.surahSeconds[s.number] || 0;
      const lastPlayed = state.stats.lastPlayed[s.number];

      const cells = [
        `${s.number}. سورة ${s.nameAr}`,
        plays > 0 ? `${plays} مرة` : '-',
        seconds > 0 ? formatTime(seconds) : '-',
        lastPlayed ? new Date(lastPlayed).toLocaleDateString('ar') : '-'
      ];

      const tr = document.createElement('tr');
      cells.forEach((text, i) => {
        const td = document.createElement('td');
        if (i === 0) {
          const strong = document.createElement('strong');
          strong.textContent = text;
          td.appendChild(strong);
        } else {
          td.textContent = text;
        }
        tr.appendChild(td);
      });
      dom.statsTableBody.appendChild(tr);
    });

    openModal('statsModal');
  }

  function resetStats() {
    if (confirm('هل أنت متأكد من تصفير سجل إحصائيات الاستماع بالكامل؟')) {
      state.stats = createEmptyStats();
      localStorage.setItem('quran_listening_stats', JSON.stringify(state.stats));
      openStatsModal();
    }
  }

  // ==========================================
  // 14. OFFLINE DOWNLOAD MANAGER (CACHE API)
  // ==========================================
  async function checkOfflineCacheStatus() {
    if (!('caches' in window)) {
      dom.lblStorageStatus.textContent = 'الذاكرة غير مدعومة في هذا المتصفح (يلزم فتح الصفحة عبر خادم محلي أو موقع آمن)';
      return;
    }

    try {
      const cache = await caches.open(CACHE_NAME);
      const keys = await cache.keys();
      state.cachedUrls = new Set(keys.map(k => k.url));
      dom.lblStorageStatus.textContent = t('storageStatus', countCachedAudio(), SURAHS.length * RECITERS.length);
    } catch (err) {
      console.warn('Cache error:', err);
    }
  }

  function absoluteUrl(url) {
    return new URL(url, window.location.href).href;
  }

  function isAudioCached(surahNumber, reciterId) {
    const urls = getAudioUrls(surahNumber, reciterId);
    return state.cachedUrls.has(absoluteUrl(urls.local))
      || state.cachedUrls.has(absoluteUrl(urls.remote))
      || (urls.alt ? state.cachedUrls.has(absoluteUrl(urls.alt)) : false);
  }

  function countCachedAudio() {
    let count = 0;
    RECITERS.forEach(r => SURAHS.forEach(s => {
      if (isAudioCached(s.number, r.id)) count++;
    }));
    return count;
  }

  // أول نسخة محفوظة من الروابط المعطاة كرابط مؤقت، أو null
  async function getCachedObjectUrl(urls) {
    if (!state.enableBrowserCache || !('caches' in window)) return null;
    try {
      const cache = await caches.open(CACHE_NAME);
      for (const url of urls) {
        const response = await cache.match(url);
        if (!response) continue;
        const blob = await response.blob();
        if (blob.size > 0) return URL.createObjectURL(blob);
      }
    } catch (err) {
      console.warn('Cache lookup failed:', err);
    }
    return null;
  }

  async function cacheFile(url, signal) {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, response);
    state.cachedUrls.add(absoluteUrl(url));
  }

  // حفظ تلاوة سورة: الملف المحلي أولاً ثم السحابي (مرة واحدة فقط لتوفير المساحة)
  async function cacheAudioFile(surahNumber, reciterId, signal) {
    if (isAudioCached(surahNumber, reciterId)) return;
    const urls = getAudioUrls(surahNumber, reciterId);
    const candidates = [urls.local, urls.remote, urls.alt].filter(Boolean);
    let lastErr = null;
    for (const url of candidates) {
      try {
        await cacheFile(url, signal);
        return;
      } catch (err) {
        if (err.name === 'AbortError') throw err;
        lastErr = err;
      }
    }
    throw lastErr || new Error('No audio source');
  }

  function isAutoCacheEnabled() {
    return state.enableBrowserCache && state.autoCachePlayed && ('caches' in window);
  }

  async function autoCacheSurahAudio(surahNumber, reciterId) {
    if (!isAutoCacheEnabled() || isAudioCached(surahNumber, reciterId)) return;
    try {
      await cacheAudioFile(surahNumber, reciterId);
      await checkOfflineCacheStatus();
      renderSurahCards();
    } catch (err) {
      // تعذر الحفظ التلقائي (مثلاً خادم بلا CORS): لا يؤثر على التشغيل
    }
  }

  // حفظ صورة صفحة مصحف تم عرضها (يتجاهل بصمت المواقع التي لا تسمح بالتنزيل المباشر)
  function cacheRemoteFile(url) {
    if (!isAutoCacheEnabled() || state.cachedUrls.has(absoluteUrl(url))) return;
    cacheFile(url).catch(() => {});
  }

  function isSurahCached(surahNumber) {
    return isAudioCached(surahNumber, state.reciterId);
  }

  async function downloadJuzAmma(allReciters = false) {
    if (!('caches' in window)) {
      alert('الذاكرة غير مدعومة في هذا المتصفح');
      return;
    }
    if (state.isDownloading) return;

    state.isDownloading = true;
    state.downloadAbortController = new AbortController();
    await refreshMidadLinks(false);
    const signal = state.downloadAbortController.signal;

    dom.btnCancelDownload.style.display = 'inline-block';
    dom.btnDownloadCurrentReciter.disabled = true;
    dom.btnDownloadAllReciters.disabled = true;

    const queue = [];
    (allReciters ? RECITERS : [getCurrentReciter()]).forEach(reciter => {
      SURAHS.forEach(surah => queue.push({ surah, reciter }));
    });

    let completed = 0;
    let failed = 0;

    for (const item of queue) {
      if (signal.aborted) break;

      const surahName = (state.lang === 'ar') ? item.surah.nameAr : item.surah.nameEn;
      dom.downloadCurrentFile.textContent = t('downloading', `${surahName} (${getReciterDisplayName(item.reciter)})`);

      try {
        await cacheAudioFile(item.surah.number, item.reciter.id, signal);
      } catch (err) {
        if (err.name === 'AbortError') break;
        failed++;
        console.warn(`Failed to download Surah ${item.surah.number} (${item.reciter.folder}):`, err);
      }

      completed++;
      const pct = Math.round((completed / queue.length) * 100);
      dom.downloadProgressBar.style.width = `${pct}%`;
      dom.downloadPercent.textContent = `${pct}%`;
    }

    state.isDownloading = false;
    dom.btnCancelDownload.style.display = 'none';
    dom.btnDownloadCurrentReciter.disabled = false;
    dom.btnDownloadAllReciters.disabled = false;

    if (signal.aborted) {
      dom.downloadCurrentFile.textContent = t('downloadCancelled');
    } else if (failed > 0) {
      dom.downloadCurrentFile.textContent = t('downloadFinishedWithErrors', failed);
    } else {
      dom.downloadCurrentFile.textContent = t('downloadFinished');
    }

    await checkOfflineCacheStatus();
    renderSurahCards();
  }

  function cancelDownload() {
    if (state.downloadAbortController) {
      state.downloadAbortController.abort();
    }
  }

  async function clearOfflineCache() {
    if (!('caches' in window)) return;
    if (confirm('هل أنت متأكد من رغبتك في حذف جميع التلاوات المحملة لتفريغ المساحة؟')) {
      await caches.delete(CACHE_NAME);
      state.cachedUrls.clear();
      dom.downloadProgressBar.style.width = '0%';
      dom.downloadPercent.textContent = '0%';
      dom.downloadCurrentFile.textContent = t('downloadReady');
      await checkOfflineCacheStatus();
      renderSurahCards();
    }
  }

  // ==========================================
  // 15. MODALS & DROPDOWNS
  // ==========================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      closeAllDropdowns();
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
  }

  function updateStatus(text) {
    dom.lblStatus.textContent = text;
  }

  // ==========================================
  // 16. EVENT LISTENERS & SHORTCUTS
  // ==========================================
  function bindEvents() {
    dom.themePalette.addEventListener('click', (e) => {
      const swatch = e.target.closest('.theme-swatch');
      if (swatch) applyTheme(swatch.getAttribute('data-theme-name'));
    });

    dom.langMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.langDropdown.classList.toggle('show');
    });

    dom.langDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.dropdown-item');
      if (item) {
        applyLanguage(item.getAttribute('data-lang'));
        closeAllDropdowns();
      }
    });

    dom.btnOptionsMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.optionsDropdown.classList.toggle('show');
    });

    dom.optSelectAll.addEventListener('click', () => { selectAllSurahs(); closeAllDropdowns(); });
    dom.optDeselectAll.addEventListener('click', () => { deselectAllSurahs(); closeAllDropdowns(); });
    dom.optInvertSelection.addEventListener('click', () => { invertSelection(); closeAllDropdowns(); });
    dom.optPlaySelected.addEventListener('click', () => { playAll(); closeAllDropdowns(); });
    dom.optDownloadSelected.addEventListener('click', () => { openModal('settingsModal'); closeAllDropdowns(); });
    dom.optOpenMindmap.addEventListener('click', () => {
      if (isMobileView()) switchMobileView('mushaf');
      switchMushafTab('mindmap');
      closeAllDropdowns();
    });

    // Modals Open
    dom.btnStats.addEventListener('click', openStatsModal);
    dom.btnShortcuts.addEventListener('click', () => openModal('shortcutsModal'));
    dom.btnAbout.addEventListener('click', () => openModal('aboutModal'));
    dom.btnSettings.addEventListener('click', () => openModal('settingsModal'));

    // Reading & Mushaf Mode (Always Visible - Maximize / Restore Toggle)
    dom.btnReadingMode.addEventListener('click', () => toggleMushafMaximize());
    if (dom.btnMaximizeMushaf) {
      dom.btnMaximizeMushaf.addEventListener('click', () => toggleMushafMaximize());
    }

    // Mushaf Tabs
    dom.tabMushafImage.addEventListener('click', () => switchMushafTab('image'));
    dom.tabMushafText.addEventListener('click', () => switchMushafTab('text'));
    dom.tabMushafInfo.addEventListener('click', () => switchMushafTab('info'));
    dom.tabMushafTafsir.addEventListener('click', () => switchMushafTab('tafsir'));
    dom.tabMushafMindmap.addEventListener('click', () => switchMushafTab('mindmap'));
    if (dom.btnPrintSurahEncyclopedia) {
      dom.btnPrintSurahEncyclopedia.addEventListener('click', () => printEncyclopediaPdf());
    }

    // Mushaf Page Navigation
    dom.btnPagePrev.addEventListener('click', () => changeMushafPage(-1));
    dom.btnPageNext.addEventListener('click', () => changeMushafPage(1));
    dom.selMushafEdition.value = state.mushafEdition;
    dom.selMushafEdition.addEventListener('change', (e) => {
      state.mushafEdition = pickAllowed(e.target.value, MUSHAF_EDITIONS, MUSHAF_EDITIONS[0]);
      localStorage.setItem('quran_mushaf_edition', state.mushafEdition);
      loadMushafPageImage(state.currentMushafPage);
    });

    // تكبير خط المصحف (أزرار + Ctrl مع عجلة الفأرة) واختيار نوع الخط
    dom.btnFontMinus.addEventListener('click', () => adjustQuranFontScale(-FONT_SCALE.step));
    dom.btnFontPlus.addEventListener('click', () => adjustQuranFontScale(FONT_SCALE.step));
    dom.lblFontSizePercent.addEventListener('click', () => adjustQuranFontScale(FONT_SCALE.default - state.quranFontScale));
    dom.contentMushafText.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      adjustQuranFontScale(e.deltaY < 0 ? FONT_SCALE.step : -FONT_SCALE.step);
    }, { passive: false });
    dom.selQuranFontFamily.addEventListener('change', (e) => applyQuranFontFamily(e.target.value));

    // تفاصيل ألوان التجويد (فتح/إغلاق بنظام الشبكة المتجاوبة)
    if (dom.btnTajweedDetails) {
      dom.btnTajweedDetails.addEventListener('click', () => {
        const expanded = dom.tajweedLegend.classList.toggle('expanded');
        if (dom.tajweedLegendDetails) {
          dom.tajweedLegendDetails.style.display = expanded ? 'grid' : 'none';
        }
        dom.btnTajweedDetails.textContent = expanded ? 'إخفاء ⌃' : 'تفاصيل ⌄';
        dom.btnTajweedDetails.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    // التنقل السريع بين السور والآيات والنص والتفسير
    dom.selQuickSurah.addEventListener('change', (e) => navigateToVerse(parseInt(e.target.value, 10), 1));
    dom.selQuickVerse.addEventListener('change', (e) => navigateToVerse(state.viewSurahNumber, parseInt(e.target.value, 10)));
    dom.btnQuickPrevVerse.addEventListener('click', () => stepVerse(-1));
    dom.btnQuickNextVerse.addEventListener('click', () => stepVerse(1));
    dom.btnQuickSwitch.addEventListener('click', () => {
      const targetTab = (state.currentMushafTab === 'text') ? 'tafsir' : 'text';
      openVerseInTab(targetTab, parseInt(dom.selQuickVerse.value, 10));
    });
    dom.btnQuickFollow.addEventListener('click', resumeFollowPlayback);

    // Mouse wheel page navigation on Mushaf Image (if not zooming or zoomed-in)
    let isWheelThrottled = false;
    dom.contentMushafImage.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey || state.mushafZoom > 100) return;
      e.preventDefault();
      if (isWheelThrottled) return;
      isWheelThrottled = true;
      setTimeout(() => { isWheelThrottled = false; }, 260);

      if (e.deltaY > 0) {
        changeMushafPage(1);
      } else if (e.deltaY < 0) {
        changeMushafPage(-1);
      }
    }, { passive: false });

    // Toggle Real Mushaf Lines Mode
    if (dom.btnToggleMushafLines) {
      dom.btnToggleMushafLines.addEventListener('click', () => {
        state.preserveMushafLines = !state.preserveMushafLines;
        localStorage.setItem('quran_preserve_lines', String(state.preserveMushafLines));
        if (dom.chkPreserveMushafLines) dom.chkPreserveMushafLines.checked = state.preserveMushafLines;
        rerenderQuranText();
      });
    }

    // إعدادات: أسطر المصحف الحقيقية، الذاكرة المحلية
    if (dom.chkPreserveMushafLines) {
      dom.chkPreserveMushafLines.checked = state.preserveMushafLines;
      dom.chkPreserveMushafLines.addEventListener('change', (e) => {
        state.preserveMushafLines = e.target.checked;
        localStorage.setItem('quran_preserve_lines', String(state.preserveMushafLines));
        rerenderQuranText();
      });
    }

    if (dom.chkEnableBrowserCache) {
      dom.chkEnableBrowserCache.checked = state.enableBrowserCache;
      dom.chkEnableBrowserCache.addEventListener('change', (e) => {
        state.enableBrowserCache = e.target.checked;
        localStorage.setItem('quran_enable_browser_cache', String(state.enableBrowserCache));
      });
    }

    if (dom.chkAutoCachePlayed) {
      dom.chkAutoCachePlayed.checked = state.autoCachePlayed;
      dom.chkAutoCachePlayed.addEventListener('change', (e) => {
        state.autoCachePlayed = e.target.checked;
        localStorage.setItem('quran_auto_cache_played', String(state.autoCachePlayed));
      });
    }

    // Tafsir Edition Selector
    if (dom.selTafsirEdition) {
      dom.selTafsirEdition.value = state.tafsirEdition;
      dom.selTafsirEdition.addEventListener('change', (e) => {
        state.tafsirEdition = pickAllowed(e.target.value, TAFSIR_EDITIONS, 'muyassar');
        localStorage.setItem('quran_tafsir_edition', state.tafsirEdition);
        loadTafsirForSurah(state.viewSurahNumber);
      });
    }

    dom.selDefaultSpeed.addEventListener('change', (e) => setPlaybackSpeed(parseFloat(e.target.value)));

    // التسجيل والتشغيل مباشرة بدون نافذة منبثقة
    dom.btnRecordVoice.addEventListener('click', toggleVoiceRecording);
    dom.btnPlayRecording.addEventListener('click', toggleRecordingPlayback);
    if (dom.recordedAudioElement) {
      dom.recordedAudioElement.addEventListener('play', () => {
        if (dom.lblPlayRecording) dom.lblPlayRecording.textContent = '⏹ إيقاف التسجيل';
      });
      dom.recordedAudioElement.addEventListener('pause', () => {
        if (dom.lblPlayRecording) dom.lblPlayRecording.textContent = t('playRecord');
      });
      dom.recordedAudioElement.addEventListener('ended', () => {
        if (dom.lblPlayRecording) dom.lblPlayRecording.textContent = t('playRecord');
      });
    }

    // Stats Reset
    dom.btnResetStats.addEventListener('click', resetStats);

    // Modals Close
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close-modal')));
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    // Toolbar
    dom.btnSelectAll.addEventListener('click', selectAllSurahs);
    dom.btnSingleSelect.addEventListener('click', () => setSelectionMode('single'));
    dom.btnMultiSelect.addEventListener('click', () => setSelectionMode('multi'));
    dom.btnReset.addEventListener('click', fullReset);
    dom.btnPlayMain.addEventListener('click', playAll);

    dom.chkInstantPlay.checked = state.instantPlay;
    dom.chkInstantPlay.addEventListener('change', (e) => {
      state.instantPlay = e.target.checked;
      localStorage.setItem('quran_instant_play', state.instantPlay);
    });

    dom.btnFilterFavorites.addEventListener('click', () => {
      state.filterFavorites = !state.filterFavorites;
      dom.btnFilterFavorites.classList.toggle('active', state.filterFavorites);
      renderSurahCards();
    });

    dom.txtSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.btnClearSearch.style.display = state.searchQuery ? 'block' : 'none';
      renderSurahCards();
    });

    dom.btnClearSearch.addEventListener('click', () => {
      state.searchQuery = '';
      dom.txtSearch.value = '';
      dom.btnClearSearch.style.display = 'none';
      renderSurahCards();
    });

    // Player Buttons
    dom.btnPlayPause.addEventListener('click', togglePlayPause);
    dom.btnStop.addEventListener('click', stopAudio);
    dom.btnNext.addEventListener('click', nextTrack);
    dom.btnPrev.addEventListener('click', prevTrack);
    dom.btnRepeat.addEventListener('click', cycleRepeatMode);
    dom.btnSpeed.addEventListener('click', cyclePlaybackSpeed);
    dom.btnMute.addEventListener('click', toggleMute);

    // Settings Modal Tabs
    document.querySelectorAll('.settings-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-settings-tab');
        document.querySelectorAll('.settings-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.settings-tab-pane').forEach(p => p.style.display = 'none');
        const targetId = `paneSet${tab.charAt(0).toUpperCase() + tab.slice(1)}`;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.style.display = 'flex';
      });
    });

    // Card Size
    function applyCardSize(size) {
      dom.cardsGrid.classList.remove('size-small', 'size-medium', 'size-large', 'size-xlarge');
      if (size !== 'medium') {
        dom.cardsGrid.classList.add(`size-${size}`);
      }
    }

    if (dom.selCardSize) {
      dom.selCardSize.value = state.cardSize;
      dom.selCardSize.addEventListener('change', (e) => {
        state.cardSize = e.target.value;
        localStorage.setItem('quran_card_size', state.cardSize);
        applyCardSize(state.cardSize);
      });
      applyCardSize(state.cardSize);
    }

    // حجم خط البرنامج والتغميق التلقائي للصور
    if (dom.selUiSize) {
      dom.selUiSize.value = String(state.uiSize);
      dom.selUiSize.addEventListener('change', (e) => applyUiSize(e.target.value));
    }
    if (dom.chkDarkImages) {
      dom.chkDarkImages.checked = state.darkImages;
      dom.chkDarkImages.addEventListener('change', (e) => applyDarkImages(e.target.checked));
    }

    // Toolbar button toggles
    function bindToolbarToggle(chkId, btnId) {
      const chk = document.getElementById(chkId);
      const btn = document.getElementById(btnId);
      if (!chk || !btn) return;
      const saved = localStorage.getItem(`quran_show_${btnId}`);
      if (saved !== null) {
        chk.checked = (saved === 'true');
        btn.style.display = chk.checked ? '' : 'none';
      }
      chk.addEventListener('change', () => {
        btn.style.display = chk.checked ? '' : 'none';
        localStorage.setItem(`quran_show_${btnId}`, String(chk.checked));
      });
    }

    bindToolbarToggle('chkShowSelectAll', 'btnSelectAll');
    bindToolbarToggle('chkShowMultiSelect', 'btnMultiSelect');
    bindToolbarToggle('chkShowSingleSelect', 'btnSingleSelect');
    bindToolbarToggle('chkShowInstantPlay', 'lblInstantPlayWrap');
    bindToolbarToggle('chkShowReset', 'btnReset');
    bindToolbarToggle('chkShowFavorites', 'btnFilterFavorites');
    bindToolbarToggle('chkShowVoiceRecord', 'voicePracticeGroup');

    // Audio & recitation options
    if (dom.chkAutoAdvance) {
      dom.chkAutoAdvance.checked = state.autoAdvance;
      dom.chkAutoAdvance.addEventListener('change', (e) => {
        state.autoAdvance = e.target.checked;
        localStorage.setItem('quran_auto_advance', String(state.autoAdvance));
      });
    }

    if (dom.chkAutoResume) {
      dom.chkAutoResume.checked = state.autoResume;
      dom.chkAutoResume.addEventListener('change', (e) => {
        state.autoResume = e.target.checked;
        localStorage.setItem('quran_auto_resume', String(state.autoResume));
      });
    }

    if (dom.chkWordSyncActive) {
      dom.chkWordSyncActive.checked = state.wordSyncActive;
      dom.chkWordSyncActive.addEventListener('change', (e) => {
        state.wordSyncActive = e.target.checked;
        localStorage.setItem('quran_word_sync', String(state.wordSyncActive));
        if (!state.wordSyncActive) {
          dom.quranVersesContainer.querySelectorAll('.word-active, .verse-active')
            .forEach(el => el.classList.remove('word-active', 'verse-active'));
          activeVerse = 0;
          activeWord = 0;
        }
      });
    }

    // Settings Modal
    dom.selTheme.value = state.theme;
    dom.selTheme.addEventListener('change', (e) => applyTheme(e.target.value));

    dom.selLang.value = state.lang;
    dom.selLang.addEventListener('change', (e) => applyLanguage(e.target.value));

    if (state.showFullName) dom.rbFullName.checked = true;
    else dom.rbShortName.checked = true;

    dom.rbFullName.addEventListener('change', () => {
      state.showFullName = true;
      localStorage.setItem('quran_show_fullname', 'true');
      renderRecitersBar();
      updateNowPlayingInfo();
    });

    dom.rbShortName.addEventListener('change', () => {
      state.showFullName = false;
      localStorage.setItem('quran_show_fullname', 'false');
      renderRecitersBar();
      updateNowPlayingInfo();
    });

    dom.btnDownloadCurrentReciter.addEventListener('click', () => downloadJuzAmma(false));
    dom.btnDownloadAllReciters.addEventListener('click', () => downloadJuzAmma(true));
    dom.btnCancelDownload.addEventListener('click', cancelDownload);
    dom.btnClearOfflineCache.addEventListener('click', clearOfflineCache);

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        closeAllDropdowns();
      }
    });

    // Mobile Navigation & Switching
    if (dom.btnMobileTabSurahs) {
      dom.btnMobileTabSurahs.addEventListener('click', () => switchMobileView('surahs'));
    }
    if (dom.btnMobileTabMushaf) {
      dom.btnMobileTabMushaf.addEventListener('click', () => switchMobileView('mushaf'));
    }
    if (dom.btnMobileThemeToggle) {
      dom.btnMobileThemeToggle.addEventListener('click', () => cycleTheme());
    }
    if (dom.btnMobileSettingsToggle) {
      dom.btnMobileSettingsToggle.addEventListener('click', () => openModal('settingsModal'));
    }

    // تغيير حجم النافذة
    window.addEventListener('resize', () => {
      // التكبير الكامل لا يناسب شاشة الجوال: نعود للعرض المقسم
      if (isMobileView() && dom.mushafSidePanel.classList.contains('maximized')) {
        toggleMushafMaximize(false);
      }
      if (state.quranFont === 'tajweed') {
        requestAnimationFrame(fitTajweedPages);
      }
    });

    window.addEventListener('keydown', handleGlobalKeydown);
  }

  function handleGlobalKeydown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    const isCtrl = (e.ctrlKey || e.metaKey);

    if (e.key === 'Escape') {
      closeAllModals();
      closeAllDropdowns();
      if (dom.mushafSidePanel.classList.contains('maximized')) {
        toggleMushafMaximize(false);
      }
      return;
    }

    if (e.key === 'F1') {
      e.preventDefault();
      openModal('shortcutsModal');
      return;
    }

    if (isCtrl && (e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      selectAllSurahs();
      return;
    }

    if (isCtrl && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      deselectAllSurahs();
      return;
    }

    if (isCtrl && e.key === '1') {
      e.preventDefault();
      setSelectionMode('single');
      return;
    }

    if (isCtrl && e.key === '2') {
      e.preventDefault();
      setSelectionMode('multi');
      return;
    }

    // Ctrl + M: Toggle Maximize Mushaf Panel
    if (isCtrl && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      toggleMushafMaximize();
      return;
    }

    if (isCtrl && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      fullReset();
      return;
    }

    if (isCtrl && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      cycleTheme();
      return;
    }

    if (isCtrl && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      cycleLanguage();
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
      return;
    }

    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleMute();
      return;
    }

    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      cycleRepeatMode();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (state.lang === 'ar') prevTrack();
      else nextTrack();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (state.lang === 'ar') nextTrack();
      else prevTrack();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setVolume(Math.min(100, state.volume + 5));
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setVolume(Math.max(0, state.volume - 5));
      return;
    }
  }

})();
