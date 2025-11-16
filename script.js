// script.js - consolidated and production-ready

(function () {
  function init() {
    const root = document.documentElement;

    // ---------- Footer year ----------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

   // --- Theme toggle: restore light/dark functionality ---
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // initialize from saved preference or system
  const saved = localStorage.getItem('theme'); // "light" or "dark"
  if (saved === 'light') root.classList.add('light');
  else if (saved === 'dark') root.classList.remove('light');
  else {
    // no saved pref -> use system pref
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      root.classList.add('light');
    }
  }

  function refreshIcons() {
    if (!toggle) return;
    const sun = toggle.querySelector('.icon-sun');
    const moon = toggle.querySelector('.icon-moon');
    if (root.classList.contains('light')) {
      if (sun) sun.style.display = 'none';
      if (moon) moon.style.display = 'inline-block';
    } else {
      if (sun) sun.style.display = 'inline-block';
      if (moon) moon.style.display = 'none';
    }
  }
  refreshIcons();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = root.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      refreshIcons();
    });
  }

  // Optional: respond to system preference changes if no manual choice
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) root.classList.add('light');
        else root.classList.remove('light');
        refreshIcons();
      }
    });
  }
})();


    // if no saved pref, follow system
    if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      root.classList.add('light');
    }

    function updateThemeIcons() {
      if (!toggle) return;
      if (root.classList.contains('light')) {
        if (sun) sun.style.display = 'none';
        if (moon) moon.style.display = 'inline-block';
      } else {
        if (sun) sun.style.display = 'inline-block';
        if (moon) moon.style.display = 'none';
      }
    }
    updateThemeIcons();

    if (toggle) {
      toggle.addEventListener('click', function () {
        const isLight = root.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcons();
      });
    }

    // Optional: follow system changes only if user didn't choose
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          if (e.matches) root.classList.add('light');
          else root.classList.remove('light');
          updateThemeIcons();
        }
      });
    }

    // ---------- Mobile menu toggle ----------
    const menuBtn = document.getElementById('menuBtn');
    let mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) {
      // create if not present in HTML
      mobileNav = document.createElement('div');
      mobileNav.id = 'mobileNav';
      mobileNav.className = 'mobile-nav';
      mobileNav.innerHTML = '<a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a>';
      document.body.appendChild(mobileNav);
    }

    function closeMobileNav() {
      if (mobileNav) mobileNav.style.display = 'none';
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
    function openMobileNav() {
      if (mobileNav) mobileNav.style.display = 'flex';
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        if (mobileNav.style.display === 'flex') closeMobileNav();
        else openMobileNav();
      });

      // ensure nav resets when resizing to desktop
      window.addEventListener('resize', function () {
        if (window.innerWidth > 880) {
          if (mobileNav) mobileNav.style.display = 'none';
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // close mobile nav on clicking one of its links
    document.addEventListener('click', function (e) {
      if (e.target && e.target.matches && e.target.matches('.mobile-nav a')) {
        closeMobileNav();
      }
    });

    // ---------- Scroll to top button ----------
    const topBtn = document.createElement('button');
    topBtn.className = 'top-btn';
    topBtn.setAttribute('aria-label', 'Scroll to top');
    topBtn.innerHTML = '↑';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 250) topBtn.style.display = 'flex';
      else topBtn.style.display = 'none';
    });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });



      // Attach handlers to current clickable items
      document.querySelectorAll('a, button, .btn').forEach(addGlowHandlers);

      // If new elements may be added dynamically, you can use MutationObserver (optional)
    }

    // ---------- Image fallback ----------
    const photo = document.getElementById('profilePhoto');
    if (photo) {
      photo.addEventListener('error', function () {
        photo.src = 'https://via.placeholder.com/400x400?text=Profile';
      });
    }

    // ---------- Optional: any other init work ----------
    // (scroll reveal code or other features can be initialized here)

  } // end init

  // run init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


