/* Service Worker — تخزين مؤقت لهيكل التطبيق ليعمل بسرعة وبدون إنترنت.
   - لا يعترض الصوت (mp3/Range) ولا الطلبات الخارجية (روابط مداد المتجددة).
   - غيّر VERSION عند كل إصدار لتحديث الذاكرة. */
const VERSION = 'v2.7.4';
const SHELL = `quran-shell-${VERSION}`;
const RUNTIME = `quran-runtime-${VERSION}`;

const CORE = [
  './', './index.html', './style.css', './ux-enhancements.css', './tajweed-fonts.css',
  './app.js', './ux-enhancements.js', './quran-data.js', './qcf4-data.js', './quran-timing.js',
  './tajweed-data.js', './chapter-studies.js', './almatny-data.js',
  './basmala-svg.js', './midad-audio.js', './manifest.webmanifest',
  './icons/icon-32.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './3ama.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL)
      // addAll يفشل كلياً إن فشل ملف واحد؛ نضيف كل ملف على حدة
      .then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![SHELL, RUNTIME].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.origin !== location.origin) return;                 // لا نلمس الطلبات الخارجية
  if (req.headers.has('range')) return;                       // الصوت والفيديو
  if (/\.(mp3|ogg|wav|m4a|webm|mp4)$/i.test(url.pathname)) return;

  // التنقل: الشبكة أولاً ثم الذاكرة (لتصل التحديثات بسرعة)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }

  // ملفات الكود الأساسية (JS/CSS/HTML): الشبكة أولاً لضمان وصول أي تعديل فوراً، ثم الذاكرة عند انقطاع الإنترنت
  if (/\.(js|css|html)$/i.test(url.pathname) && !/\/(tafsir|Assets)\//.test(url.pathname)) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // بقية الملفات (خطوط، تفاسير، صور): الذاكرة أولاً مع تحديث في الخلفية
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(/\/(tafsir|Assets)\//.test(url.pathname) ? RUNTIME : SHELL).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
