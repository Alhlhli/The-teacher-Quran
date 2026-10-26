/* ==========================================================================
   ux-enhancements.js — تحسينات تجربة المستخدم (لا يعدّل منطق app.js)
   يُحمَّل بعد app.js. كل جزء معزول بـ try/catch حتى لا يوقف غيره.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const safe = (name, fn) => { try { fn(); } catch (e) { console.warn('[ux]', name, e); } };
  const mq = window.matchMedia('(max-width: 860px)');
  const lang = () => root.getAttribute('lang') || 'ar';
  const L = (ar, en, fr) => ({ ar, en, fr: fr || en }[lang()] || ar);

  /* ---------- 1) كشف اللمس ---------- */
  safe('touch', () => {
    const coarse = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    root.classList.toggle('is-touch', coarse);
  });

  /* ---------- 2) نقل المشغل ليظهر في كل تبويبات الجوال ----------
     كان المشغل داخل عمود السور فيختفي كلياً عند فتح تبويب «المصحف»،
     فلا يستطيع المستخدم إيقاف التلاوة أو تغيير السرعة أثناء القراءة. */
  safe('player', () => {
    const wrap = $('playerIslandWrapper');
    const app = $('appContainer');
    if (!wrap || !app) return;
    const home = { parent: wrap.parentNode, next: wrap.nextSibling };

    // زر «تسجيل التلاوة» يصبح شريحة ضمن صف الأدوات على الجوال بدل صف مستقل
    const voice = $('voicePracticeGroup');
    const chips = document.querySelector('.toolbar-content > .toolbar-group.tb-chips');
    const voiceHome = voice ? { parent: voice.parentNode, next: voice.nextSibling } : null;
    const placeVoice = () => {
      if (!voice || !chips || chips === voice) return;
      if (mq.matches) { chips.appendChild(voice); voice.classList.add('mx-in-chips'); }
      else {
        voice.classList.remove('mx-in-chips');
        voiceHome.parent.insertBefore(voice, voiceHome.next && voiceHome.next.parentNode === voiceHome.parent ? voiceHome.next : null);
      }
    };

    const place = () => {
      placeVoice();
      if (mq.matches) {
        const strip = $('statusStrip');
        if (wrap.parentNode !== app) app.insertBefore(wrap, strip || null);
      } else if (wrap.parentNode !== home.parent) {
        home.parent.insertBefore(wrap, home.next && home.next.parentNode === home.parent ? home.next : null);
      }
    };
    place();
    (mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place));
  });

  /* ---------- 2b) مقبض لتصغير المشغل وتوفير مساحة القراءة (يُصغّر تلقائياً في تبويب المصحف) ---------- */
  safe('miniPlayer', () => {
    const island = $('playerIsland');
    const app = $('appContainer');
    if (!island) return;
    const h = document.createElement('button');
    h.type = 'button'; h.className = 'mx-player-handle';
    h.style.display = 'none';
    const KEY = 'mx_mini_player';
    // في عرض المصحف على الجوال يكون المشغل مصغراً افتراضياً لتوفير أكبر مساحة للمصحف
    const get = () => {
      try {
        const v = localStorage.getItem(KEY);
        if (v !== null) return v === '1';
      } catch (e) {}
      return true;
    };
    const set = (v) => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} };
    const render = () => {
      const mini = island.classList.contains('mx-mini');
      h.setAttribute('aria-expanded', String(!mini));
      h.setAttribute('aria-label', mini ? L('توسيع المشغل', 'Expand player', 'Agrandir le lecteur') : L('تصغير المشغل', 'Collapse player', 'Réduire le lecteur'));
    };
    h.addEventListener('click', () => { island.classList.toggle('mx-mini'); set(island.classList.contains('mx-mini')); render(); });
    island.insertBefore(h, island.firstChild);
    const apply = () => {
      h.style.display = mq.matches ? 'flex' : 'none';
      const inMushaf = app && app.getAttribute('data-mobile-view') === 'mushaf';
      island.classList.toggle('mx-mini', mq.matches && (inMushaf || get()));
      render();
    };
    apply();
    (mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply));
    if (app) {
      new MutationObserver(apply).observe(app, { attributes: true, attributeFilter: ['data-mobile-view'] });
    }
  });

  /* ---------- 3) زر الرجوع في أندرويد/المتصفح يعود لقائمة السور ----------
     بدونه يخرج المستخدم من التطبيق بالكامل عند الضغط على «رجوع» من المصحف. */
  safe('backButton', () => {
    const app = $('appContainer');
    if (!app || !window.history || !history.pushState) return;
    let internal = false;

    new MutationObserver(() => {
      if (!mq.matches || internal) return;
      const view = app.getAttribute('data-mobile-view');
      if (view === 'mushaf' && !(history.state && history.state.mxView === 'mushaf')) {
        history.pushState({ mxView: 'mushaf' }, '');
      } else if (view === 'surahs' && history.state && history.state.mxView === 'mushaf') {
        internal = true;
        history.back();
        setTimeout(() => { internal = false; }, 150);
      }
    }).observe(app, { attributes: true, attributeFilter: ['data-mobile-view'] });

    window.addEventListener('popstate', () => {
      if (internal || !mq.matches) return;
      if (app.getAttribute('data-mobile-view') === 'mushaf') {
        internal = true;
        const tab = $('btnMobileTabSurahs');
        if (tab) tab.click();
        setTimeout(() => { internal = false; }, 150);
      }
    });
  });

  /* ---------- 4) دمج زر أدوات عرض المصحف داخل شريط التبويبات وطيّ الأدوات افتراضياً على الجوال ---------- */
  safe('collapseTools', () => {
    const sub = $('mushafSubBar');
    const header = document.querySelector('.mushaf-panel-header');
    if (!sub || !sub.parentNode) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mx-toggle-tools';
    btn.setAttribute('aria-controls', 'mushafSubBar');

    const render = () => {
      const collapsed = sub.classList.contains('mx-collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.classList.toggle('active', !collapsed);
      btn.textContent = collapsed
        ? L('⚙ الخط والعرض', '⚙ Display', '⚙ Affichage')
        : L('✕ إخفاء', '✕ Hide', '✕ Masquer');
      btn.title = L('إظهار/إخفاء أدوات الخط والتكبير والطبعة', 'Toggle display tools', 'Outils d’affichage');
    };
    btn.addEventListener('click', () => { sub.classList.toggle('mx-collapsed'); render(); });
    if (header) header.appendChild(btn);
    else sub.parentNode.insertBefore(btn, sub);

    const apply = () => {
      btn.style.display = mq.matches ? 'inline-flex' : 'none';
      if (mq.matches) { if (!btn.dataset.init) { sub.classList.add('mx-collapsed'); btn.dataset.init = '1'; } }
      else sub.classList.remove('mx-collapsed');
      render();
    };
    apply();
    (mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply));
    // اسم الزر يتبع لغة الواجهة
    new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['lang'] });
  });

  /* ---------- 5) وصولية: تسميات، حالة الأزرار، إعلان الحالة ---------- */
  safe('a11y', () => {
    // تسمية كل زر لا نص له من title (الأيقونات فقط)
    const label = (el) => {
      if (el.hasAttribute('aria-label')) return;
      const txt = (el.textContent || '').replace(/[\s\u200f\u200e]+/g, '');
      const hasText = /[\p{L}\p{N}]/u.test(txt);
      const t = el.getAttribute('title');
      if (t && (!hasText || txt.length < 3)) el.setAttribute('aria-label', t);
    };
    const labelAll = (scope) => scope.querySelectorAll('button, a[title]').forEach(label);
    labelAll(document);

    // أزرار المفضلة تُنشأ ديناميكياً: سمّها وأضف حالتها
    const fixCards = () => {
      document.querySelectorAll('.surah-card').forEach((card) => {
        const fav = card.querySelector('.card-fav-btn');
        if (!fav) return;
        const on = card.classList.contains('is-favorite');
        fav.setAttribute('aria-pressed', String(on));
        if (!fav.hasAttribute('aria-label')) {
          fav.setAttribute('aria-label', L('إضافة إلى المفضلة', 'Toggle favorite', 'Ajouter aux favoris'));
        }
      });
    };
    const grid = $('cardsGrid') || document.querySelector('.cards-grid');
    if (grid) { new MutationObserver(fixCards).observe(grid, { childList: true, subtree: true }); fixCards(); }

    // حالة الأزرار القابلة للتبديل
    const toggles = ['btnSingleSelect', 'btnMultiSelect', 'btnReadingMode', 'btnFilterFavorites', 'btnRepeat'];
    toggles.forEach((id) => {
      const el = $(id); if (!el) return;
      const sync = () => el.setAttribute('aria-pressed', String(/\bactive(-mode)?\b/.test(el.className)));
      sync();
      new MutationObserver(sync).observe(el, { attributes: true, attributeFilter: ['class'] });
    });

    // التبويبات
    document.querySelectorAll('.mobile-nav-tab, .mushaf-tab').forEach((tab) => {
      tab.setAttribute('role', 'tab');
      const sync = () => tab.setAttribute('aria-selected', String(tab.classList.contains('active')));
      sync();
      new MutationObserver(sync).observe(tab, { attributes: true, attributeFilter: ['class'] });
    });

    // إعلان الحالة الحالية وما يُشغَّل الآن لقارئ الشاشة
    ['lblStatus', 'lblNowPlayingSurah'].forEach((id) => {
      const el = $(id); if (el) { el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); }
    });

    // لغة الصفحة للمؤشرات
    const slider = $('seekSlider');
    if (slider) {
      const upd = () => {
        const pct = Math.round((slider.value / (slider.max || 1000)) * 100);
        slider.setAttribute('aria-valuetext', pct + '%');
      };
      slider.addEventListener('input', upd); upd();
    }
  });

  /* ---------- 6) ارتفاع المتصفح الحقيقي (احتياط للمتصفحات بلا dvh) ---------- */
  safe('vh', () => {
    if (window.CSS && CSS.supports && CSS.supports('height', '100dvh')) return;
    const set = () => root.style.setProperty('--mx-vh', window.innerHeight * 0.01 + 'px');
    set(); window.addEventListener('resize', set); window.addEventListener('orientationchange', set);
    const st = document.createElement('style');
    st.textContent = '@media (max-width:860px){.app-container{height:calc(var(--mx-vh,1vh)*100)!important}}';
    document.head.appendChild(st);
  });

  /* ---------- 8) تسجيل Service Worker (يعمل على https أو localhost فقط) ---------- */
  safe('sw', () => {
    if (!('serviceWorker' in navigator)) return;
    if (!(location.protocol === 'https:' || location.hostname === 'localhost')) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch((e) => console.warn('[sw]', e));
    });
  });
})();
