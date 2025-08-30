import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'free-courses', 'paid-courses', 'gallery', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    closeMobileMenu();

    if (sectionId && location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 0);
    }
  };

  const navigationItems = [
    { name: 'Home', href: '/', sectionId: 'home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Free Courses', href: '/courses/free' },
    { name: 'Paid Courses', href: '/courses/paid' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    },
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  const NavLink = ({ item, isMobile = false }: { item: typeof navigationItems[0], isMobile?: boolean }) => {
    const isActive = location.pathname === item.href ||
      (location.pathname === '/' && activeSection === item.sectionId);

    return (
      <motion.div className="relative">
        <Link
          to={item.href}
          className={cn(
            'relative text-foreground font-medium transition-all duration-300',
            isMobile ? 'block py-3 px-4 rounded-lg hover:bg-muted/80' : 'py-2 px-1',
            isActive && 'text-primary',
            !isMobile && 'hover:text-[#B22429]'
          )}
          onClick={(e) => handleNavClick(e, item.sectionId)}
        >
          <span className="relative z-10">{item.name}</span>

          {/* Animated underline for desktop */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#B22429]"
              initial={{ width: '0%' }}
              animate={{ width: isActive ? '100%' : '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          )}

          {/* Active indicator for mobile */}
          {isMobile && isActive && (
            <motion.div
              className="absolute left-0 top-0 w-1 h-full bg-[#B22429] rounded-r"
              layoutId="activeIndicator"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  const WhatsAppButton = ({ isMobile = false }: { isMobile?: boolean }) => {
    return (
      <motion.a
        href="https://wa.me/03006622815"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300',
          isMobile
            ? 'w-full py-3 px-4 bg-green-600 text-white hover:bg-green-700'
            : 'py-2 px-4 bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp className={cn("flex-shrink-0", isMobile ? "text-xl" : "text-lg")} />
        <span className="whitespace-nowrap">WhatsApp</span>
      </motion.a>
    );
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      variants={headerVariants}
      animate={isScrolled ? 'scrolled' : 'top'}
      initial="top"
    >
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between mx-auto">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            variants={logoVariants}
            whileHover="hover"
            initial="initial"
          >
            <Link to="/" onClick={closeMobileMenu} className="p-2 rounded-lg">
              <motion.img
                src="/logo.png"
                alt="Tech-Hub Faisalabad Logo"
                className="w-[116px] h-auto object-contain"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation (centered) */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink item={item} />
              </motion.div>
            ))}
          </nav>

          {/* Desktop WhatsApp Button */}
          <div className="hidden md:flex items-center mr-4 lg:mr-6">
            <WhatsAppButton />
          </div>

          {/* Mobile Menu Button & WhatsApp */}
          <div className="md:hidden flex items-center gap-2">
            <WhatsAppButton />
            <motion.button
              className="p-2 rounded-lg hover:bg-muted/80 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.div
                variants={menuIconVariants}
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border/50"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="py-4 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                  >
                    <NavLink item={item} isMobile />
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
