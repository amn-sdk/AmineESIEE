// ============================================
// AMINEFLEX PORTFOLIO - MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initProjectFilters();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.querySelector('.navbar');
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        // Add a small delay for stagger effect
        setTimeout(() => {
          entry.target.style.width = progress + '%';
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  skillBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ============================================
// PROJECT FILTERS
// ============================================
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 AMINEFLEX Portfolio', 'font-size: 24px; font-weight: bold; color: #e50914;');
console.log('%cDéveloppé avec passion par Amine SADDIK', 'font-size: 14px; color: #b3b3b3;');
console.log('%c💼 Intéressé par une collaboration ? Contactez-moi !', 'font-size: 12px; color: #808080;');
