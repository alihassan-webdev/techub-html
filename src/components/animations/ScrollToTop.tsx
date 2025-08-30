import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingActionButton } from './AnimatedButton';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 10 
          }}
        >
          <motion.button
            className="relative w-14 h-14 bg-[#032F65] text-white rounded-full shadow-lg overflow-hidden group"
            onClick={scrollToTop}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress Ring */}
            <svg 
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="transparent"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                transition={{ duration: 0.1 }}
              />
            </svg>
            
            {/* Arrow Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUp size={20} />
              </motion.div>
            </div>
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full opacity-0"
              whileTap={{
                scale: [1, 1.5],
                opacity: [0.3, 0],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
