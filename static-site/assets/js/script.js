// Tech-Hub Faisalabad - Static Website JavaScript
// Converted from React hooks and Framer Motion animations

class TechHubApp {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupCarousel();
    this.setupMobileMenu();
    this.setupFormHandling();
    this.setupSmoothScrolling();
    this.setupHeaderScroll();
    this.setupNavigationHighlight();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
      return;
    }

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let scrolled = false;

    const updateHeader = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        header.classList.toggle('scrolled', scrolled);
      }
    };

    window.addEventListener('scroll', this.throttle(updateHeader, 16));
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('open', isMenuOpen);
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.toggle('open', isMenuOpen);
      }
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
      
      // Update button icon
      const icon = mobileMenuBtn.querySelector('svg');
      if (icon && isMenuOpen) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
      } else if (icon) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
      }
    };

    const closeMenu = () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });
  }

  setupCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      const indicators = carousel.querySelectorAll('.carousel-indicator');
      
      if (slides.length === 0) return;

      let currentSlide = 0;
      let autoPlayInterval;
      let isAutoPlaying = true;

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          slide.style.opacity = i === index ? '1' : '0';
          slide.style.transform = i === index ? 'scale(1)' : 'scale(1.02)';
        });
        
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
      };

      const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
      };

      const prevSlide = () => {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
      };

      const startAutoPlay = () => {
        if (isAutoPlaying) {
          autoPlayInterval = setInterval(nextSlide, 4000);
        }
      };

      const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
      };

      // Event listeners
      if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      });

      if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      });

      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          stopAutoPlay();
          showSlide(index);
          startAutoPlay();
        });
      });

      // Pause on hover
      carousel.addEventListener('mouseenter', () => {
        isAutoPlaying = false;
        stopAutoPlay();
      });

      carousel.addEventListener('mouseleave', () => {
        isAutoPlaying = true;
        startAutoPlay();
      });

      // Initialize
      showSlide(0);
      startAutoPlay();
    });
  }

  setupScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add appropriate animation class
          if (element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-fade-in');
          }
          
          if (element.classList.contains('slide-up-on-scroll')) {
            element.classList.add('animate-slide-up');
          }
          
          if (element.classList.contains('scale-on-scroll')) {
            element.classList.add('animate-scale-in');
          }
          
          if (element.classList.contains('bounce-on-scroll')) {
            element.classList.add('animate-bounce-in');
          }

          // Stagger children animations
          if (element.classList.contains('stagger-children')) {
            const children = element.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-in');
              }, index * 100);
            });
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .slide-up-on-scroll, .scale-on-scroll, .bounce-on-scroll, .stagger-children'
    );
    
    animatedElements.forEach(el => observer.observe(el));
  }

  setupAnimations() {
    // Button hover animations
    const animatedButtons = document.querySelectorAll('.btn, .animated-btn');
    
    animatedButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px) scale(1.02)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
      });
      
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translateY(0) scale(0.98)';
      });
      
      btn.addEventListener('mouseup', () => {
        btn.style.transform = 'translateY(-2px) scale(1.02)';
      });
    });

    // Card hover animations
    const cards = document.querySelectorAll('.card, .course-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = 'var(--shadow-xl)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-md)';
      });
    });
  }

  setupSmoothScrolling() {
    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to corresponding nav link
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href*="${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
  }

  setupFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        this.showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Here you would typically send the data to your PHP backend
        console.log('Form data:', data);
      });
    });

    // Form validation
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    if (!isValid) {
      field.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message text-sm text-red mt-1';
      errorElement.textContent = errorMessage;
      field.parentNode.appendChild(errorElement);
    }

    return isValid;
  }

  showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fixed top-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-4 max-w-sm`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium">${message}</p>
        </div>
        <button class="toast-close text-gray-400 hover:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 5000);

    // Animate in
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    
    requestAnimationFrame(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
  }

  handleScroll() {
    // Handle scroll-based effects
    const scrollY = window.scrollY;
    
    // Parallax effects for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        const offset = scrollY * 0.1;
        heroContent.style.transform = `translateY(${offset}px)`;
      }
    }

    // Show/hide scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
      if (scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  handleResize() {
    // Handle window resize events
    this.setupAnimations();
  }

  handleLoad() {
    // Handle window load events
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 200);
    });
  }

  // Utility functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
}

// Course data (converted from TypeScript)
const coursesData = [
  {
    id: 'web-development-bootcamp',
    name: 'Web Development Bootcamp',
    type: 'Free',
    cover: '/assets/images/course/free/full stack web development.avif',
    tutor: 'Ali Khan',
    description: 'Learn HTML, CSS, JavaScript and React from scratch. This comprehensive bootcamp covers everything you need to become a full-stack web developer.',
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Web Development',
    enrolled: 1250,
    rating: 4.8,
    syllabus: [
      'HTML5 & Semantic Markup',
      'CSS3 & Responsive Design',
      'JavaScript Fundamentals',
      'DOM Manipulation',
      'React.js Basics',
      'State Management',
      'API Integration',
      'Final Project'
    ],
    prerequisites: ['Basic computer skills', 'Internet browsing knowledge']
  },
  {
    id: 'advanced-python',
    name: 'Advanced Python Programming',
    type: 'Paid',
    cover: '/assets/images/course/paid/web-development.avif',
    tutor: 'Sara Ahmed',
    description: 'Master Python for data science, web development, and automation. This advanced course covers object-oriented programming, data structures, and more.',
    duration: '16 weeks',
    level: 'Intermediate',
    category: 'Programming',
    enrolled: 890,
    rating: 4.9,
    price: 'PKR 25,000',
    syllabus: [
      'Advanced Python Concepts',
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
      'Web Development with Django',
      'REST API Development',
      'Data Analysis with Pandas',
      'Machine Learning Basics',
      'Deployment & DevOps'
    ],
    prerequisites: ['Basic Python knowledge', 'Programming fundamentals']
  }
  // Add more courses as needed
];

// Gallery data
const galleryData = [
  {
    id: 1,
    src: '/assets/images/course/free/full stack web development.avif',
    title: 'Web Development Workshop',
    category: 'Training'
  },
  {
    id: 2,
    src: '/assets/images/course/free/cyber security.avif',
    title: 'Cybersecurity Seminar',
    category: 'Training'
  }
  // Add more gallery items as needed
];

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TechHubApp();
  });
} else {
  new TechHubApp();
}

// Global functions for backward compatibility
window.TechHub = {
  showToast: function(message, type) {
    if (window.techHubApp) {
      window.techHubApp.showToast(message, type);
    }
  },
  
  scrollToSection: function(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = element.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  },

  getCoursesByType: function(type) {
    return coursesData.filter(course => course.type === type);
  },

  getCourseById: function(id) {
    return coursesData.find(course => course.id === id);
  }
};

// Store app instance globally
document.addEventListener('DOMContentLoaded', () => {
  window.techHubApp = new TechHubApp();
});
