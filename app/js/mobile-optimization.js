/* ============================================
   Mobile Optimization & Responsive Helpers
   ============================================ */

const MobileOptimization = {
  // Detect if device is mobile
  isMobile: () => {
    return window.innerWidth <= 768;
  },

  // Detect if device is tablet
  isTablet: () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  // Detect if device is desktop
  isDesktop: () => {
    return window.innerWidth > 1024;
  },

  // Get viewport width
  getViewportWidth: () => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  },

  // Get viewport height
  getViewportHeight: () => {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  },

  // Detect if in landscape mode on mobile
  isLandscape: () => {
    return window.innerWidth > window.innerHeight;
  },

  // Close mobile menu when viewport is resized to desktop
  handleWindowResize: () => {
    if (window.innerWidth > 768 && App.mobileMenuOpen) {
      App.mobileMenuOpen = false;
      // Don't re-render, just hide overlay if exists
      const overlay = document.querySelector('.sidebar-overlay');
      if (overlay) overlay.style.display = 'none';
      const layout = document.querySelector('.app-layout');
      if (layout) layout.classList.remove('mobile-menu-open');
    }
  },

  // Handle touch events for better UX
  setupTouchHandlers: () => {
    // Detect long tap for context menu on touch devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, false);

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchDuration = Date.now() - touchStartTime;

      // Detect swipe right (to open mobile menu)
      if (touchEndX - touchStartX > 50 && touchDuration < 500 && window.innerWidth <= 768) {
        if (App && !App.mobileMenuOpen) {
          App.mobileMenuOpen = true;
          App.renderPage();
        }
      }

      // Detect swipe left (to close mobile menu)
      if (touchStartX - touchEndX > 50 && touchDuration < 500 && window.innerWidth <= 768) {
        if (App && App.mobileMenuOpen) {
          App.mobileMenuOpen = false;
          App.renderPage();
        }
      }
    }, false);
  },

  // Handle font scaling for better readability
  setDefaultFontSize: () => {
    const root = document.documentElement;
    const vw = MobileOptimization.getViewportWidth();

    // Dynamic font scaling based on viewport width
    let baseFontSize = 16; // default

    if (vw <= 360) {
      baseFontSize = 14;
    } else if (vw <= 480) {
      baseFontSize = 15;
    } else if (vw <= 768) {
      baseFontSize = 15.5;
    } else if (vw <= 1024) {
      baseFontSize = 16;
    }

    root.style.fontSize = baseFontSize + 'px';
  },

  // Optimize images for mobile
  optimizeImages: () => {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => {
      // Add data attribute to track optimization
      img.setAttribute('data-optimized', 'true');

      // Set max-width to prevent overflow
      if (!img.style.maxWidth) {
        img.style.maxWidth = '100%';
      }
      if (!img.style.height) {
        img.style.height = 'auto';
      }

      // Add loading lazy if not already set
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });
  },

  // Fix iOS viewport zoom on input focus
  fixIOSViewportZoom: () => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOSDevice) {
        // Set font-size to 16px on inputs to prevent zoom on iOS
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.style.fontSize = '16px';
        });
      }
    }
  },

  // Prevent body scroll when modal is open
  lockBodyScroll: (lock = true) => {
    if (lock) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  },

  // Initialize all mobile optimizations
  init: () => {
    MobileOptimization.setDefaultFontSize();
    MobileOptimization.setupTouchHandlers();
    MobileOptimization.fixIOSViewportZoom();
    MobileOptimization.optimizeImages();

    // Add window resize listener with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        MobileOptimization.handleWindowResize();
        MobileOptimization.setDefaultFontSize();
      }, 250); // Debounce to 250ms
    }, false);

    // Add orientation change listener
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        MobileOptimization.handleWindowResize();
        MobileOptimization.setDefaultFontSize();
        if (App) {
          App.renderPage();
        }
      }, 500);
    }, false);

    // Monitor viewport changes with media query listeners
    const mediaQueryLists = [
      { query: '(max-width: 480px)', name: 'mobile' },
      { query: '(max-width: 768px)', name: 'tablet' },
      { query: '(max-width: 1024px)', name: 'small-desktop' },
      { query: '(min-width: 1025px)', name: 'desktop' }
    ];

    mediaQueryLists.forEach(({ query, name }) => {
      const mediaQuery = window.matchMedia(query);
      if (mediaQuery.addListener) {
        mediaQuery.addListener(() => {
          console.log(`Media query changed: ${name} - ${query}`);
          MobileOptimization.handleWindowResize();
        });
      } else if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', () => {
          console.log(`Media query changed: ${name} - ${query}`);
          MobileOptimization.handleWindowResize();
        });
      }
    });

    console.log('Mobile Optimization initialized');
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', MobileOptimization.init);
} else {
  MobileOptimization.init();
}
