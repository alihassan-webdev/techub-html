/**
 * TECH-HUB FAISALABAD - MAIN JAVASCRIPT
 * Comprehensive vanilla JS file converting React functionality to pure JavaScript
 */

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

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

// Throttle function for scroll events
function throttle(func, limit) {
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

// Check if element is in viewport
function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const height = window.innerHeight || document.documentElement.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= -height * threshold &&
        rect.left >= -width * threshold &&
        rect.bottom <= height * (1 + threshold) &&
        rect.right <= width * (1 + threshold)
    );
}

// Smooth scroll to element
function scrollToElement(targetId, offset = 0) {
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ==============================================
// HEADER FUNCTIONALITY
// ==============================================

class HeaderManager {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.navMobile = document.getElementById('nav-mobile');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navLinksMobile = document.querySelectorAll('.nav-link-mobile');
        this.lastScrollY = window.scrollY;
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveLink();
        this.handleScroll(); // Initial call
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Scroll events
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 16));
        
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
        
        this.navLinksMobile.forEach(link => {
            link.addEventListener('click', (e) => this.handleMobileNavClick(e, link));
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && !this.header.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250));
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Header background on scroll
        if (currentScrollY > 50 && !this.isScrolled) {
            this.header.classList.add('scrolled');
            this.isScrolled = true;
        } else if (currentScrollY <= 50 && this.isScrolled) {
            this.header.classList.remove('scrolled');
            this.isScrolled = false;
        }
        
        // Update active navigation link based on scroll position
        this.updateActiveLink();
        
        this.lastScrollY = currentScrollY;
    }
    
    updateActiveLink() {
        // Only update on homepage
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            return;
        }
        
        const sections = ['home', 'partners', 'reviews', 'faq'];
        let activeSection = 'home';
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    activeSection = section;
                    break;
                }
            }
        }
        
        // Update active class on navigation links
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '/' || href === '/index.html') {
                link.classList.toggle('active', activeSection === 'home');
            }
        });
    }
    
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navMobile.classList.add('show');
        this.mobileMenuBtn.classList.add('active');
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.navMobile.classList.remove('show');
        this.mobileMenuBtn.classList.remove('active');
        this.isMobileMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        const sectionId = link.getAttribute('data-section');
        
        if (sectionId && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
            e.preventDefault();
            scrollToElement(sectionId, 80);
        }
    }
    
    handleMobileNavClick(e, link) {
        const href = link.getAttribute('href');
        
        this.closeMobileMenu();
        
        // Add a small delay for smooth transition
        setTimeout(() => {
            if (href !== window.location.pathname) {
                window.location.href = href;
            }
        }, 300);
    }
}

// ==============================================
// HERO CAROUSEL FUNCTIONALITY
// ==============================================

class HeroCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.isAutoPlaying = true;
        this.intervalId = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.startAutoplay();
        this.bindEvents();
    }
    
    bindEvents() {
        // Pause on hover
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
        
        // Pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.resumeAutoplay();
            }
        });
        
        // Handle window focus/blur
        window.addEventListener('blur', () => this.pauseAutoplay());
        window.addEventListener('focus', () => this.resumeAutoplay());
    }
    
    nextSlide() {
        if (this.slides.length === 0) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
    
    startAutoplay() {
        if (this.slides.length <= 1) return;
        
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 2500);
    }
    
    pauseAutoplay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isAutoPlaying = false;
    }
    
    resumeAutoplay() {
        if (!this.isAutoPlaying && this.slides.length > 1) {
            this.startAutoplay();
            this.isAutoPlaying = true;
        }
    }
}

// ==============================================
// FAQ ACCORDION FUNCTIONALITY
// ==============================================

class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.searchInput = document.getElementById('faq-search');
        this.faqGrid = document.getElementById('faq-grid');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // FAQ toggle functionality
        this.faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            if (header) {
                header.addEventListener('click', () => this.toggleFAQ(item));
            }
        });
        
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', debounce((e) => {
                this.filterFAQs(e.target.value);
            }, 300));
        }
    }
    
    toggleFAQ(item) {
        const isOpen = item.classList.contains('open');
        
        if (isOpen) {
            this.closeFAQ(item);
        } else {
            this.openFAQ(item);
        }
    }
    
    openFAQ(item) {
        item.classList.add('open');
        const content = item.querySelector('.faq-content');
        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
    
    closeFAQ(item) {
        item.classList.remove('open');
        const content = item.querySelector('.faq-content');
        if (content) {
            content.style.maxHeight = '0';
        }
    }
    
    filterFAQs(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('.faq-content p')?.textContent.toLowerCase() || '';
            const category = item.querySelector('.faq-category')?.textContent.toLowerCase() || '';
            
            const matches = question.includes(term) || answer.includes(term) || category.includes(term);
            
            if (matches || term === '') {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
            }
        });
        
        // Check if any results
        const visibleItems = Array.from(this.faqItems).filter(item => 
            item.style.display !== 'none'
        );
        
        if (this.faqGrid) {
            if (visibleItems.length === 0 && term !== '') {
                this.showNoResults();
            } else {
                this.hideNoResults();
            }
        }
    }
    
    showNoResults() {
        let noResults = document.querySelector('.faq-no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'faq-no-results text-center py-16';
            noResults.innerHTML = `
                <i data-lucide="search" class="mx-auto text-gray-400 mb-4" style="width: 3rem; height: 3rem;"></i>
                <h3 class="text-xl font-semibold mb-2">No results found</h3>
                <p class="text-gray-600">Try adjusting your search terms or browse all questions</p>
            `;
            this.faqGrid.appendChild(noResults);
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
        noResults.style.display = 'block';
    }
    
    hideNoResults() {
        const noResults = document.querySelector('.faq-no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
}

// ==============================================
// GALLERY LIGHTBOX FUNCTIONALITY
// ==============================================

class GalleryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.currentIndex = 0;
        this.images = [];
        
        this.init();
    }
    
    init() {
        this.collectImages();
        this.bindEvents();
    }
    
    collectImages() {
        this.images = Array.from(this.galleryItems).map(item => {
            const img = item.querySelector('.gallery-image');
            return {
                src: img?.src || '',
                alt: img?.alt || ''
            };
        });
    }
    
    bindEvents() {
        // Gallery item clicks
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Lightbox controls
        if (this.lightboxClose) {
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        }
        
        if (this.lightboxPrev) {
            this.lightboxPrev.addEventListener('click', () => this.previousImage());
        }
        
        if (this.lightboxNext) {
            this.lightboxNext.addEventListener('click', () => this.nextImage());
        }
        
        // Close on background click
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox && this.lightbox.classList.contains('show')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }
    
    openLightbox(index) {
        if (!this.lightbox || !this.images[index]) return;
        
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        if (!this.lightbox) return;
        
        this.lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    previousImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }
    
    nextImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }
    
    updateLightboxImage() {
        const image = this.images[this.currentIndex];
        if (!image || !this.lightboxImage) return;
        
        this.lightboxImage.src = image.src;
        this.lightboxImage.alt = image.alt;
        
        if (this.lightboxCaption) {
            this.lightboxCaption.textContent = image.alt;
        }
    }
}

// ==============================================
// MARQUEE ANIMATIONS FOR REVIEWS
// ==============================================

class MarqueeManager {
    constructor() {
        this.marquees = document.querySelectorAll('.marquee');
        this.init();
    }
    
    init() {
        this.setupMarquees();
        this.bindEvents();
    }
    
    setupMarquees() {
        this.marquees.forEach(marquee => {
            // Clone content for seamless loop
            const content = marquee.innerHTML;
            marquee.innerHTML = content + content;
        });
    }
    
    bindEvents() {
        // Pause on hover
        this.marquees.forEach(marquee => {
            marquee.addEventListener('mouseenter', () => {
                marquee.style.animationPlayState = 'paused';
            });
            
            marquee.addEventListener('mouseleave', () => {
                marquee.style.animationPlayState = 'running';
            });
        });
        
        // Pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            this.marquees.forEach(marquee => {
                if (document.hidden) {
                    marquee.style.animationPlayState = 'paused';
                } else {
                    marquee.style.animationPlayState = 'running';
                }
            });
        });
    }
}

// ==============================================
// CONTACT FORM FUNCTIONALITY
// ==============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.originalBtnText = this.submitBtn?.innerHTML || 'Send Message';
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setSubmitting(true);
        
        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setSubmitting(false);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });
        
        // Email validation
        const email = this.form.querySelector('[type="email"]');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                this.showFieldError(email, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#dc2626';
        const error = document.createElement('div');
        error.className = 'field-error text-red-600 text-sm mt-1';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }
    
    clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    async submitForm(data) {
        // This would normally be an API call
        // For demo purposes, we'll simulate with a timeout
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Failed to send message. Please try again.'));
                }
            }, 2000);
        });
    }
    
    setSubmitting(isSubmitting) {
        if (!this.submitBtn) return;
        
        if (isSubmitting) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            `;
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = this.originalBtnText;
        }
    }
    
    showSuccess() {
        this.showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
    }
    
    showError(message) {
        this.showToast(message, 'error');
    }
    
    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-green-600 text-white' :
            type === 'error' ? 'bg-red-600 text-white' :
            'bg-blue-600 text-white'
        }`;
        toast.style.transform = 'translateX(100%)';
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <span>${message}</span>
                <button class="text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// ==============================================
// SCROLL ANIMATIONS
// ==============================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px -50px 0px'
        };
        this.addDefaultAnimationClasses();
        this.animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in');
        this.init();
    }

    addDefaultAnimationClasses() {
        const mappings = [
            ['.hero-text', 'animate-slide-up'],
            ['.hero-carousel', 'animate-scale-in'],
            ['.section-header', 'animate-fade-in'],
            ['.stat-card, .partner-card, .review-card, .faq-item, .course-card, .card', 'animate-slide-up'],
            ['.help-section', 'animate-scale-in']
        ];
        mappings.forEach(([selector, cls]) => {
            document.querySelectorAll(selector).forEach(el => el.classList.add(cls));
        });
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.animateAllElements();
        }
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(element);
            this.observer.observe(element);
        });
    }
    
    getInitialTransform(element) {
        if (element.classList.contains('animate-fade-in')) {
            return 'translateY(20px)';
        } else if (element.classList.contains('animate-slide-up')) {
            return 'translateY(40px)';
        } else if (element.classList.contains('animate-scale-in')) {
            return 'scale(0.95)';
        }
        return 'none';
    }
    
    animateElement(element) {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
    }
    
    animateAllElements() {
        // Fallback: animate all elements immediately
        this.animatedElements.forEach(element => {
            this.animateElement(element);
        });
    }
}

// ==============================================
// PERFORMANCE OPTIMIZATIONS
// ==============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeImages();
        this.preloadCriticalAssets();
        this.setupLazyLoading();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute for native lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', () => {
                img.src = 'assets/images/placeholder.svg';
                img.alt = 'Image not available';
            });
        });
    }
    
    preloadCriticalAssets() {
        const criticalImages = [
            'assets/images/logo.png',
            // Add other critical images here
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    setupLazyLoading() {
        // Enhanced lazy loading for images not in viewport
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// ==============================================
// THEME MANAGEMENT (for future dark mode)
// ==============================================

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('tech-hub-theme') || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }
    
    bindEvents() {
        // Listen for theme toggle button clicks (if implemented)
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('tech-hub-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('tech-hub-theme', theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle button if it exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    }
}

// ==============================================
// MAIN INITIALIZATION
// ==============================================

class TechHubApp {
    constructor() {
        this.components = {};
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        try {
            // Initialize all components
            this.components.headerManager = new HeaderManager();
            this.components.heroCarousel = new HeroCarousel();
            this.components.faqManager = new FAQManager();
            this.components.galleryLightbox = new GalleryLightbox();
            this.components.marqueeManager = new MarqueeManager();
            this.components.contactForm = new ContactForm();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.performanceOptimizer = new PerformanceOptimizer();
            this.components.themeManager = new ThemeManager();
            
            // Initialize Lucide icons
            this.initializeLucideIcons();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            console.log('✅ Tech-Hub Faisalabad app initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Tech-Hub app:', error);
        }
    }
    
    initializeLucideIcons() {
        // Initialize Lucide icons if the library is loaded
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }
    
    setupGlobalEvents() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden, pause animations
                this.pauseAnimations();
            } else {
                // Page is visible, resume animations
                this.resumeAnimations();
            }
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle back button navigation
        window.addEventListener('popstate', () => {
            // Refresh components that depend on URL
            if (this.components.headerManager) {
                this.components.headerManager.updateActiveLink();
            }
        });

        // Setup page transitions
        this.setupPageTransitions();
    }

    setupPageTransitions() {
        // Fade-in on load (no delayed navigation to avoid blank flashes)
        document.body.classList.add('page-enter');
        // Optional: add a quick fade when unloading without delaying navigation
        window.addEventListener('beforeunload', () => {
            document.body.classList.add('page-leave');
        });
    }
    
    pauseAnimations() {
        // Pause CPU-intensive animations when page is not visible
        const marquees = document.querySelectorAll('.marquee');
        marquees.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        // Resume animations when page becomes visible
        const marquees = document.querySelectorAll('.marquee');
        marquees.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
        });
    }
    
    handleResize() {
        // Handle responsive changes
        if (this.components.galleryLightbox) {
            this.components.galleryLightbox.collectImages();
        }
    }
    
    // Public methods for external access
    getComponent(name) {
        return this.components[name];
    }
    
    reload() {
        // Reinitialize all components
        this.initializeComponents();
    }
}

// ==============================================
// AUTO-INITIALIZATION
// ==============================================

// Create global instance
window.TechHubApp = new TechHubApp();

// Expose useful utilities globally
window.TechHubUtils = {
    debounce,
    throttle,
    isInViewport,
    scrollToElement
};

// ==============================================
// SERVICE WORKER REGISTRATION (for future PWA)
// ==============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// ==============================================
// ANALYTICS (placeholder for future implementation)
// ==============================================

function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    if (window.gtag) {
        window.gtag('event', eventName, properties);
    }
    
    // Console log for development
    console.log('📊 Event tracked:', eventName, properties);
}

// Track page views
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// ==============================================
// ERROR HANDLING
// ==============================================

window.addEventListener('error', (event) => {
    console.error('❌ JavaScript error:', event.error);
    
    // Track error (in production, send to analytics)
    trackEvent('javascript_error', {
        error_message: event.error?.message || 'Unknown error',
        error_filename: event.filename,
        error_lineno: event.lineno
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason);
    
    // Track error
    trackEvent('promise_rejection', {
        error_message: event.reason?.message || 'Promise rejection'
    });
});
