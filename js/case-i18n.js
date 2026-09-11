/*
 * case-i18n.js
 * ------------------------------------------------------------------
 * Minimal, self-contained translation engine for individual case
 * study pages (pages/case/*.html).
 *
 * Instead of storing full-page HTML blobs per language in a giant
 * central dictionary (js/main.js), every translatable element simply
 * carries its own English and Czech text as data attributes, right
 * next to the markup it belongs to:
 *
 *   <h2 data-en="Problem" data-cs="Problém">Problem</h2>
 *
 * For content that needs inline tags (e.g. <em>, <strong>) add
 * data-i18n-html so the value is applied via innerHTML instead of
 * textContent:
 *
 *   <p data-i18n-html data-en="Some <em>emphasis</em> here."
 *                     data-cs="Nějaký <em>důraz</em> tady.">...</p>
 *
 * This keeps every case study page independent — editing one page's
 * copy never risks breaking another page or the shared dictionary.
 *
 * Language state is shared with the rest of the site via the same
 * localStorage key ('portfolio_lang') and the same .lang-option /
 * #langFlag markup already driven by js/main.js's delegated click
 * handler, so the dropdown UI (active state, EN/CZ flag label)
 * keeps working exactly as it does everywhere else. This file only
 * adds the extra step of applying [data-en]/[data-cs] content.
 * ------------------------------------------------------------------
 */
(function () {
  var STORAGE_KEY = 'portfolio_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function applyCaseTranslations(lang) {
    var attr = lang === 'cs' ? 'data-cs' : 'data-en';

    document.querySelectorAll('[data-en], [data-cs]').forEach(function (el) {
      var value = el.getAttribute(attr);
      if (value === null) return; // element only defines the other language

      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    // <title data-en="..." data-cs="..."> — update the tab title too
    var titleEl = document.querySelector('title[data-en], title[data-cs]');
    if (titleEl) {
      var t = titleEl.getAttribute(attr);
      if (t) document.title = t;
    }

    document.documentElement.lang = lang;
  }

  function init() {
    applyCaseTranslations(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Respond to language changes triggered anywhere on the page (the
  // dropdown click itself is handled by main.js's delegated listener;
  // we just piggyback on the same click to re-run our own pass).
  document.addEventListener('click', function (e) {
    var option = e.target.closest('.lang-option');
    if (option && option.dataset.lang) {
      applyCaseTranslations(option.dataset.lang);
    }
  });

  // Keep in sync if the language is changed from another tab/page.
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) applyCaseTranslations(getLang());
  });

  // Expose for debugging / manual re-application if needed.
  window.applyCaseTranslations = applyCaseTranslations;
})();
