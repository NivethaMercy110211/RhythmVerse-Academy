/* ============================================================
   RhythmVerse Academy — Main JavaScript
   main.js
   ============================================================ */

(function () {
  'use strict';

  /* ─── Theme Toggle ─────────────────────────────────────────── */
  const THEME_KEY = 'rv-theme';
  const DIR_KEY   = 'rv-dir';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
  }

  function initDir() {
    const saved = localStorage.getItem(DIR_KEY) || 'ltr';
    applyDir(saved);
  }

  function bindToggles() {
    // Theme toggle buttons (multiple possible on page)
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'light' ? 'dark' : 'light');
      });
    });

    // RTL toggle buttons
    document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        applyDir(current === 'ltr' ? 'rtl' : 'ltr');
      });
    });
  }

  /* ─── Sticky Navbar ────────────────────────────────────────── */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || href.endsWith(currentPath))) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Hamburger / Mobile Menu ──────────────────────────────── */
  function initMobileMenu() {
    const hamburger   = document.querySelector('.hamburger');
    const mobileMenu  = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      isOpen ? closeMenu() : openMenu();
    });

    // Close on menu link click
    mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-login-btn').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ─── Scroll Animations (Intersection Observer) ────────────── */
  function initAnimations() {
    const items = document.querySelectorAll('[data-animate]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(item => observer.observe(item));
  }

  /* ─── Accordion (FAQ) ──────────────────────────────────────── */
  function initAccordions() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
        });

        // Open clicked if was closed
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /* ─── Counter Animation ────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ─── Password Eye Toggle ──────────────────────────────────── */
  function initPasswordToggle() {
    document.querySelectorAll('.input-eye-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.input-group').querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
        }
      });
    });
  }

  /* ─── Smooth Scroll (anchor links) ────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── Navbar Hero Parallax ─────────────────────────────────── */
  function initParallax() {
    // Disabled parallax vertical scroll effect per user request
  }

  /* ─── Lightbox for gallery ─────────────────────────────────── */
  function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'rv-lightbox';
    overlay.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-content">
        <button class="lb-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>
        <img class="lb-img" src="" alt="Gallery image" />
        <div class="lb-caption"></div>
      </div>
    `;
    overlay.style.cssText = `
      display:none; position:fixed; inset:0; z-index:9999; align-items:center; justify-content:center;
    `;
    document.body.appendChild(overlay);

    const lbImg     = overlay.querySelector('.lb-img');
    const lbCaption = overlay.querySelector('.lb-caption');
    const lbClose   = overlay.querySelector('.lb-close');
    const lbBg      = overlay.querySelector('.lb-backdrop');

    const closeLb = () => { overlay.style.display = 'none'; document.body.style.overflow = ''; };
    lbClose.addEventListener('click', closeLb);
    lbBg.addEventListener('click', closeLb);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = img.alt || '';
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    // Inject lightbox styles
    if (!document.getElementById('lb-styles')) {
      const s = document.createElement('style');
      s.id = 'lb-styles';
      s.textContent = `
        #rv-lightbox .lb-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0.9); }
        #rv-lightbox .lb-content { position:relative; z-index:1; max-width:90vw; max-height:90vh; display:flex; flex-direction:column; align-items:center; gap:12px; }
        #rv-lightbox .lb-img { max-width:100%; max-height:80vh; border-radius:12px; object-fit:contain; box-shadow:0 20px 60px rgba(0,0,0,0.7); }
        #rv-lightbox .lb-caption { color:rgba(255,255,255,0.8); font-size:0.9rem; }
        #rv-lightbox .lb-close { position:fixed; top:20px; right:20px; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        #rv-lightbox .lb-close:hover { background:rgba(255,255,255,0.3); transform:scale(1.1); }
      `;
      document.head.appendChild(s);
    }
  }

  /* ─── Dashboard Sidebar Toggle ─────────────────────────────── */
  function initDashboardSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    if (!sidebar || !toggleBtn) return;

    const openSidebar = () => {
      sidebar.classList.add('open');
      if (overlay) {
        overlay.classList.add('visible');
        overlay.addEventListener('click', closeSidebar, { once: true });
      }
    };

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
    };

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  /* ─── Dashboard Profile Dropdown ───────────────────────────── */
  function initProfileDropdown() {
    const trigger = document.getElementById('profile-dropdown-trigger');
    const menu = document.getElementById('profile-dropdown-menu');
    if (!trigger || !menu) return;

    const toggleDropdown = (e) => {
      e.stopPropagation();
      const isOpen = trigger.classList.contains('active');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    const openDropdown = () => {
      trigger.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', closeDropdownOutside);
    };

    const closeDropdown = () => {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeDropdownOutside);
    };

    const closeDropdownOutside = (e) => {
      if (!trigger.contains(e.target)) {
        closeDropdown();
      }
    };

    trigger.addEventListener('click', toggleDropdown);

    // Keyboard accessibility support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown(e);
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    // Handle logout trigger
    const logoutBtn = document.getElementById('navbar-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
        const localModalTrigger = document.getElementById('logout-trigger');
        if (localModalTrigger) {
          localModalTrigger.click();
        } else {
          window.location.href = 'login.html';
        }
      });
    }
  }

  /* ─── Init All ─────────────────────────────────────────────── */
  function initAuthControlsAutoHide() {
    const authControls = document.querySelector('.auth-controls');
    const authPage = document.querySelector('.auth-page');
    if (!authControls || !authPage) return;

    const onScroll = () => {
      document.body.classList.toggle('auth-controls-hidden', window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    initTheme();
    initDir();
    bindToggles();
    initNavbar();
    initMobileMenu();
    initAnimations();
    initAccordions();
    initCounters();
    initPasswordToggle();
    initSmoothScroll();
    initParallax();
    initGalleryLightbox();
    initDashboardSidebar();
    initProfileDropdown();
    initAuthControlsAutoHide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
