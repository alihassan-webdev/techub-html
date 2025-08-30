// Tech-Hub Faisalabad - Enhanced JavaScript
// Main application script with form handling enhancements

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
    this.setupPageTransitions();
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
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (!mobileMenuBtn || !mobileMenu) return;

    const toggleMenu = () => {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  setupCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length < 2) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
        slide.style.zIndex = i === index ? '2' : '1';
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Initialize first slide
    showSlide(0);

    // Auto-advance slides
    setInterval(nextSlide, slideInterval);
  }

  setupFormHandling() {
    // Enhanced contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      this.setupContactForm(contactForm);
    }

    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
      if (form !== contactForm && form.querySelector('input[type="email"]')) {
        this.setupNewsletterForm(form);
      }
    });
  }

  setupContactForm(form) {
    form.addEventListener('submit', (e) => {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>Sending...</span>
      `;

      // Show alert
      alert("Your message is being sent...");

      // Reset button after a delay (for demo purposes)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 2000);
    });

    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  }

  setupNewsletterForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      if (this.validateEmail(emailInput.value)) {
        // Show success message
        this.showNotification('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
      } else {
        this.showNotification('Please enter a valid email address.', 'error');
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value && !this.validateEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }

    // Phone validation
    if (field.type === 'tel' && value && !this.validatePhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number.';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-600 text-sm mt-1';
    errorElement.textContent = message;
    
    // Insert after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.classList.add(bgColor, 'text-white');
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupScrollEffects() {
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
      window.addEventListener('scroll', this.throttle(() => {
        if (window.scrollY > 500) {
          scrollToTopBtn.style.opacity = '1';
          scrollToTopBtn.style.visibility = 'visible';
        } else {
          scrollToTopBtn.style.opacity = '0';
          scrollToTopBtn.style.visibility = 'hidden';
        }
      }, 100));
    }

    // Animate elements on scroll
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    this.addDefaultAnimationClasses();
    const animateElements = document.querySelectorAll('.animate-on-scroll, .slide-up-on-scroll, .scale-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
      observer.observe(element);
    });

    // Stagger children animations
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    });
  }

  addDefaultAnimationClasses() {
    const mappings = [
      ['.hero .container, .page-header .container', 'animate-on-scroll'],
      ['.section-header', 'animate-on-scroll'],
      ['.stat-card, .partner-card, .review-card, .faq-item, .course-card, .card', 'slide-up-on-scroll'],
      ['.hero-carousel, .help-section', 'scale-on-scroll']
    ];
    mappings.forEach(([selector, cls]) => {
      document.querySelectorAll(selector).forEach(el => el.classList.add(cls));
    });
  }

  setupPageTransitions() {
    // Fade-in on load
    document.body.classList.add('page-enter');

    // Intercept internal navigations for fade-out
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      const target = a.getAttribute('target');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || target === '_blank') return;
      const isInternal = href.endsWith('.php') || href.endsWith('.html') || href.startsWith('/') || (!href.startsWith('http'));
      if (!isInternal) return;
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        document.body.classList.add('page-leave');
        setTimeout(() => { window.location.href = href; }, 180);
      });
    });
  }

  setupAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .slide-up-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .slide-up-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scale-on-scroll {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .scale-on-scroll.animated {
        opacity: 1;
        transform: scale(1);
      }
      
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
      
      .field-error {
        animation: shake 0.5s ease-in-out;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .notification {
        animation: slideInRight 0.3s ease-out;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .carousel-slide {
        transition: opacity 1s ease-in-out;
      }
      
      .mobile-menu {
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
      }
      
      .mobile-menu.active {
        transform: translateX(0);
      }
      
      .mobile-menu-overlay {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
      }
      
      .menu-open .mobile-menu-overlay {
        opacity: 1;
        visibility: visible;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupNavigationHighlight() {
    // Highlight active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', this.throttle(() => {
      let current = '';
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 100));
  }

  handleScroll() {
    // Handle scroll events
    this.updateScrollPosition();
  }

  handleResize() {
    // Handle window resize events
    this.updateLayout();
  }

  handleLoad() {
    // Handle window load events
    this.finalizeInit();
  }

  updateScrollPosition() {
    // Update scroll-based elements
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  updateLayout() {
    // Update layout on resize
    if (window.innerWidth > 768) {
      document.body.classList.remove('menu-open');
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    }
  }

  finalizeInit() {
    // Final initialization steps
    document.body.classList.add('loaded');
  }

  // Utility function to throttle events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Utility function to debounce events
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new TechHubApp();
});

// Add specific form submission alert for contact form
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      alert("Your message is being sent...");
    });
  }
});
