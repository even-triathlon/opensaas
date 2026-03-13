/* ============================================================
   RUEIL-MALMAISON TRIATHLON - main.js
   Dark mode switcher + mobile menu + cookie banner
   ============================================================ */

(function () {
  'use strict';

  // ---- DARK MODE ----
  const HTML = document.documentElement;

  function getStoredColorMode() {
    return localStorage.getItem('color-mode') || 'light';
  }

  function applyColorMode(mode) {
    if (mode === 'dark') {
      HTML.classList.add('dark');
      HTML.classList.remove('light');
    } else {
      HTML.classList.add('light');
      HTML.classList.remove('dark');
    }
    updateToggleUI(mode);
  }

  function updateToggleUI(mode) {
    const isDark = mode === 'dark';

    // Desktop
    const label = document.getElementById('dark-toggle-label');
    const knob = document.getElementById('dark-toggle-knob');
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');
    const checkbox = document.getElementById('dark-toggle');

    if (label) label.classList.toggle('active', isDark);
    if (sun) sun.style.opacity = isDark ? '0' : '1';
    if (moon) moon.style.opacity = isDark ? '1' : '0';
    if (checkbox) checkbox.checked = isDark;

    // Mobile
    const labelMobile = document.getElementById('dark-toggle-label-mobile');
    const checkboxMobile = document.getElementById('dark-toggle-mobile');
    if (labelMobile) labelMobile.classList.toggle('active', isDark);
    if (checkboxMobile) checkboxMobile.checked = isDark;
  }

  function toggleDarkMode() {
    const current = getStoredColorMode();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-mode', next);
    applyColorMode(next);
  }

  // Initialize
  applyColorMode(getStoredColorMode());

  document.addEventListener('DOMContentLoaded', function () {
    // Re-apply after DOM loads (for initial render)
    applyColorMode(getStoredColorMode());

    const checkbox = document.getElementById('dark-toggle');
    if (checkbox) {
      checkbox.addEventListener('change', toggleDarkMode);
    }

    const checkboxMobile = document.getElementById('dark-toggle-mobile');
    if (checkboxMobile) {
      checkboxMobile.addEventListener('change', toggleDarkMode);
    }

    // ---- MOBILE MENU ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
      });
    }

    if (mobileMenuClose && mobileMenu) {
      mobileMenuClose.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.add('hidden');
        }
      }
    });

    // ---- COOKIE BANNER ----
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookieBanner && !localStorage.getItem('cookie-accepted')) {
      setTimeout(() => {
        cookieBanner.classList.remove('hidden');
      }, 1000);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        localStorage.setItem('cookie-accepted', '1');
        if (cookieBanner) cookieBanner.classList.add('hidden');
      });
    }

    // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

  // Expose closeMobileMenu globally
  window.closeMobileMenu = function () {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  };
})();
