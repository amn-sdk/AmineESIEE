// ============================================
// AMINEFLEX PORTFOLIO - ANIMATIONS
// ============================================

// Animation controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupHoverEffects();
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-up, .slide-down, .scale-in'
        );

        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';

                    // Unobserve after animation
                    setTimeout(() => {
                        observer.unobserve(entry.target);
                    }, 1000);
                }
            });
        }, observerOptions);

        // Initially hide elements and observe them
        animatedElements.forEach(element => {
            element.style.opacity = '0';

            // Set initial transform based on animation class
            if (element.classList.contains('slide-up')) {
                element.style.transform = 'translateY(30px)';
            } else if (element.classList.contains('slide-down')) {
                element.style.transform = 'translateY(-30px)';
            } else if (element.classList.contains('scale-in')) {
                element.style.transform = 'scale(0.9)';
            }

            observer.observe(element);
        });
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    setupParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = hero.querySelectorAll('.hero-content');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ============================================
    // HOVER EFFECTS
    // ============================================
    setupHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-5px)
          scale3d(1.01, 1.01, 1.01)
        `;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// ============================================
// PAGE TRANSITIONS
// ============================================
class PageTransitions {
    constructor() {
        this.setupTransitions();
    }

    setupTransitions() {
        // Fade in page on load
        document.body.style.opacity = '0';

        window.addEventListener('load', () => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        });

        // Smooth page transitions on navigation
        const links = document.querySelectorAll('a[href^="index.html"], a[href^="parcours.html"], a[href^="projets.html"], a[href^="cv.html"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Don't prevent default for same page
                if (window.location.pathname.includes(href)) {
                    return;
                }

                e.preventDefault();

                // Fade out
                document.body.style.opacity = '0';

                // Navigate after fade out
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }
}

// ============================================
// CURSOR FOLLOWER (DESKTOP ONLY)
// ============================================
class CursorFollower {
    constructor() {
        if (window.innerWidth < 768) return; // Skip on mobile

        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-follower';
        this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.15s ease;
      opacity: 0;
    `;
        document.body.appendChild(this.cursor);

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            this.cursor.style.opacity = '1';
        });

        // Scale on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
    }
}

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation systems
    new AnimationController();
    new PageTransitions();
    new CursorFollower();

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .btn {
      position: relative;
      overflow: hidden;
    }
  `;
    document.head.appendChild(style);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
window.addEventListener('load', () => {
    // Preload fonts
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap'
    ];

    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
});
