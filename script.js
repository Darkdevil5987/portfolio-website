// External script test — put this whole file as-is


document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM ready — external JS can access elements.");

  // simple action to confirm JS works with page elements
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      alert("Menu clicked — external JS event fired");
    });
  }
});

// SAFE DOM ready wrapper
(function () {
  function init() {
    // --- theme toggle ---
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const sun = toggle ? toggle.querySelector('.icon-sun') : null;
    const moon = toggle ? toggle.querySelector('.icon-moon') : null;

    // restore saved theme or use system preference
    const saved = localStorage.getItem('theme'); // 'light' or 'dark'
    if (saved === 'light') root.classList.add('light');
    else if (saved === 'dark') root.classList.remove('light'); // keep default dark
    else {
      // use system preference -> add .light if system prefers light
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        root.classList.add('light');
      }
    }

    function updateIcons() {
      if (!toggle) return;
      if (root.classList.contains('light')) {
        if (sun) sun.style.display = 'inline-block';
        if (moon) moon.style.display = 'none';
      } else {
        if (sun) sun.style.display = 'none';
        if (moon) moon.style.display = 'inline-block';
      }
    }
    updateIcons();

    if (toggle) {
      toggle.addEventListener('click', function () {
        // toggle light class
        root.classList.toggle('light');
        // save preference
        localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
        updateIcons();
      });
    }

    // --- mobile menu toggle ---
    const menuBtn = document.getElementById('menuBtn');
    let mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) {
      // create if not present in HTML
      mobileNav = document.createElement('div');
      mobileNav.id = 'mobileNav';
      mobileNav.className = 'mobile-nav';
      mobileNav.innerHTML = '<a href=\"#about\">About</a><a href=\"#projects\">Projects</a><a href=\"#contact\">Contact</a>';
      document.body.appendChild(mobileNav);
    }
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        if (mobileNav.style.display === 'flex') {
          mobileNav.style.display = 'none';
        } else {
          mobileNav.style.display = 'flex';
        }
      });
      // hide mobile nav on resize > breakpoint
      window.addEventListener('resize', function () {
        if (window.innerWidth > 880) mobileNav.style.display = 'none';
      });
    }

    // --- scroll to top button ---
    const topBtn = document.createElement('button');
    topBtn.className = 'top-btn';
    topBtn.innerHTML = '↑';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 250) topBtn.style.display = 'flex';
      else topBtn.style.display = 'none';
    });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- footer year ---
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // small accessibility: close mobile nav when clicking link
    document.addEventListener('click', function (e) {
      if (e.target && e.target.matches && e.target.matches('.mobile-nav a')) {
        mobileNav.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ------ FIXED GLOW CURSOR ------
document.addEventListener("mousemove", function(e) {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// make glow grow on clickable items
document.querySelectorAll("a, button, .btn").forEach(el => {
  el.addEventListener("mouseenter", () => {
    const glow = document.getElementById("cursor-glow");
    glow.style.width = "45px";
    glow.style.height = "45px";
  });
  el.addEventListener("mouseleave", () => {
    const glow = document.getElementById("cursor-glow");
    glow.style.width = "26px";
    glow.style.height = "26px";
  });
});
