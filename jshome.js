// === PREMIUM ARCBYTE JAVASCRIPT ===

// === PERFORMANCE OPTIMIZATION ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isHighPerformanceDevice = navigator.hardwareConcurrency > 4 && navigator.deviceMemory > 4;

// === LOADING SCREEN ===
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.mainContent = document.getElementById('mainContent');
    this.loadingBar = document.querySelector('.loading-bar');
    this.duration = prefersReducedMotion ? 1000 : 3000;
  }

  init() {
    document.body.style.overflow = 'hidden';
    this.startLoading();
  }

  startLoading() {
    // Simulated loading progress
    const progress = [0, 20, 45, 70, 85, 100];
    let currentStep = 0;

    const updateProgress = () => {
      if (currentStep < progress.length) {
        const currentProgress = progress[currentStep];
        this.loadingBar.style.width = `${currentProgress}%`;
        currentStep++;
        
        const nextDelay = currentStep === progress.length ? 800 : 400;
        setTimeout(updateProgress, nextDelay);
      } else {
        this.completeLoading();
      }
    };

    setTimeout(updateProgress, 500);
  }

  completeLoading() {
    this.loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
      this.mainContent.classList.add('show');
      document.body.style.overflow = 'auto';
      
      // Initialize other components after loading
      App.init();
    }, 800);
  }
}

// === TEXT ROTATION ===
class TextRotation {
  constructor() {
    this.element = document.getElementById('rotatingText');
    this.texts = [
      'Seguridad',
      'Escalabilidad',
      'Estrategia',
      'Transformación Digital',
      'Experiencia de Usuario',
      'Desarrollo Ágil',
    ];
    this.currentIndex = 0;
    this.isRotating = false;
  }

  init() {
    if (!this.element) return;
    
    this.element.textContent = this.texts[0];
    
    // Start rotation after initial delay
    setTimeout(() => {
      this.startRotation();
    }, 2000);
  }

  startRotation() {
    if (prefersReducedMotion) return;
    
    setInterval(() => {
      this.rotateText();
    }, 3000);
  }

  rotateText() {
    if (this.isRotating) return;
    
    this.isRotating = true;
    
    // Fade out
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // Change text
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.element.textContent = this.texts[this.currentIndex];
      
      // Fade in
      this.element.style.opacity = '1';
      this.element.style.transform = 'translateY(0)';
      
      this.isRotating = false;
    }, 300);
  }
}

// === NAVIGATION ===
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav-premium');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.currentActiveLink = null;
  }

  init() {
    this.setupScrollListener();
    this.setupSmoothScroll();
    this.setupNavHighlight();
  }

  setupScrollListener() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateNavOnScroll();
          this.updateNavBackground();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateNavBackground() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }
  }

  updateNavOnScroll() {
    const scrollY = window.scrollY + 100;
    let currentSection = '';

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    this.highlightNavLink(currentSection);
  }

  highlightNavLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupNavHighlight() {
    this.navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          link.style.transform = 'translateY(-1px)';
        }
      });

      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
      });
    });
  }
}

// === SCROLL ANIMATIONS ===
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.observer = null;
  }

  init() {
    if (prefersReducedMotion) {
      this.elements.forEach(el => el.classList.add('visible'));
      return;
    }

    this.setupIntersectionObserver();
    this.setupSkillBarAnimations();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }

  setupSkillBarAnimations() {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const progress = skillBar.getAttribute('data-progress');
          
          setTimeout(() => {
            skillBar.style.setProperty('--progress', `${progress}%`);
            skillBar.classList.add('animated');
          }, 200);
          
          skillObserver.unobserve(skillBar);
        }
      });
    }, { threshold: 0.3 });

    this.skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }
}

// === INTERACTIVE EFFECTS ===
class InteractiveEffects {
  constructor() {
    this.cards = document.querySelectorAll('.principle-card, .service-card, .work-card');
    this.buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-large');
  }

  init() {
    if (prefersReducedMotion) return;
    
    this.setupCardEffects();
    this.setupButtonEffects();
    this.setupCursorEffects();
  }

  setupCardEffects() {
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.createCardGlow(e.target);
      });

      card.addEventListener('mouseleave', (e) => {
        this.removeCardGlow(e.target);
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHighPerformanceDevice) return;
        this.updateCardTilt(e);
      });
    });
  }

  createCardGlow(card) {
    card.style.boxShadow = '0 25px 80px rgba(59, 130, 246, 0.15)';
    card.style.transform = 'translateY(-8px)';
  }

  removeCardGlow(card) {
    card.style.boxShadow = '';
    card.style.transform = '';
  }

  updateCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }, { once: true });
  }

  setupButtonEffects() {
    this.buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        const icon = button.querySelector('svg');
        if (icon) {
          icon.style.transform = 'translateX(4px)';
        }
      });

      button.addEventListener('mouseleave', () => {
        const icon = button.querySelector('svg');
        if (icon) {
          icon.style.transform = 'translateX(0)';
        }
      });

      button.addEventListener('click', (e) => {
        this.createRippleEffect(e);
      });
    });
  }

  createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupCursorEffects() {
    if (!isHighPerformanceDevice) return;

    const interactiveElements = document.querySelectorAll('a, button, .principle-card, .service-card, .work-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
      });

      element.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
      });
    });
  }
}

// === PARALLAX EFFECTS ===
class ParallaxEffects {
  constructor() {
    this.geometricShapes = document.querySelectorAll('.geometric-shape');
    this.hero = document.querySelector('.hero');
  }

  init() {
    if (prefersReducedMotion || !isHighPerformanceDevice) return;
    
    this.setupParallaxScroll();
  }

  setupParallaxScroll() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateParallax() {
    const scrollY = window.pageYOffset;
    
    // Parallax for geometric shapes
    this.geometricShapes.forEach((shape, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = scrollY * speed;
      shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // Parallax for hero section
    if (this.hero && scrollY < window.innerHeight) {
      const speed = 0.5;
      const yPos = scrollY * speed;
      this.hero.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }
}

// === PERFORMANCE MONITORING ===
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = 0;
    this.fps = 0;
  }

  init() {
    if (process.env.NODE_ENV === 'development') {
      this.startMonitoring();
    }
  }

  startMonitoring() {
    const monitor = (currentTime) => {
      this.frameCount++;
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps}fps`);
          this.optimizePerformance();
        }
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }

  optimizePerformance() {
    // Disable non-essential animations if performance is poor
    document.body.classList.add('reduced-animations');
    console.log('Performance optimizations applied');
  }
}

// === ACCESSIBILITY ENHANCEMENTS ===
class AccessibilityEnhancements {
  constructor() {
    this.focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusIndicators();
    this.setupScreenReaderSupport();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupFocusIndicators() {
    this.focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.classList.add('focused');
      });

      element.addEventListener('blur', () => {
        element.classList.remove('focused');
      });
    });
  }

  setupScreenReaderSupport() {
    // Add screen reader only text for context
    const srOnlyText = document.createElement('span');
    srOnlyText.className = 'sr-only';
    srOnlyText.textContent = 'ArcByte - Premium Digital Solutions';
    document.body.prepend(srOnlyText);
  }

  closeModals() {
    // Close any open modals or dropdowns
    const modals = document.querySelectorAll('.modal.open, .dropdown.open');
    modals.forEach(modal => {
      modal.classList.remove('open');
    });
  }
}

// === MAIN APPLICATION ===
class App {
  static init() {
    console.log('🚀 ArcByte Premium - Initializing...');
    
    // Initialize core components
    new TextRotation().init();
    new Navigation().init();
    new ScrollAnimations().init();
    new InteractiveEffects().init();
    new ParallaxEffects().init();
    new AccessibilityEnhancements().init();
    
    // Development only
    if (process.env.NODE_ENV === 'development') {
      new PerformanceMonitor().init();
    }
    
    // Add CSS animation classes
    App.addAnimationClasses();
    
    console.log('✨ ArcByte Premium - Ready');
  }

  static addAnimationClasses() {
    // Add staggered animations to cards
    const cards = document.querySelectorAll('.principle-card, .service-card, .work-card, .expertise-category');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500 + (index * 100));
    });
  }
}

// === CSS INJECTION ===
const injectCSS = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    .keyboard-navigation *:focus {
      outline: 2px solid #3B82F6 !important;
      outline-offset: 2px !important;
    }
    
    .reduced-animations * {
      animation-duration: 0.1s !important;
      transition-duration: 0.1s !important;
    }
    
    .focused {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5) !important;
    }
  `;
  document.head.appendChild(style);
};

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', () => {
  injectCSS();
});

window.addEventListener('load', () => {
  const loadingScreen = new LoadingScreen();
  loadingScreen.init();
});

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
  console.error('ArcByte Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('ArcByte Promise Rejection:', e.reason);
});

// === RESIZE HANDLER ===
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalculate positions and sizes after resize
    App.init();
  }, 250);
});

// === EXPORT FOR MODULE SYSTEMS ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, LoadingScreen, TextRotation, Navigation };
}