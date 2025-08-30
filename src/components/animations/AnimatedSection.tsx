import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimationPreferences, createOptimizedVariants } from '@/hooks/useAnimationPreferences';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, delay });
  const preferences = useAnimationPreferences();
  const optimizedVariants = createOptimizedVariants(preferences);

  // Use optimized variants if available, fallback to original
  const variant = optimizedVariants[animation] || animationVariants[animation];
  const optimizedDuration = preferences.prefersReducedMotion ? 0.01 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variant.initial}
      animate={isVisible ? variant.animate : variant.initial}
      transition={{
        duration: optimizedDuration,
        ease: preferences.prefersReducedMotion ? 'linear' : [0.25, 0.25, 0, 1],
        delay: preferences.prefersReducedMotion ? 0 : delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  hoverScale = 1.02,
}) => {
  const { ref, isVisible } = useScrollAnimation({ delay });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      whileHover={{ 
        scale: hoverScale, 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isVisible && (
        <motion.span
          initial={{ textContent: '0' }}
          animate={{ textContent: end.toString() }}
          transition={{
            duration,
            ease: 'easeOut',
          }}
          onUpdate={(latest) => {
            if (ref.current) {
              const value = Math.floor(latest.textContent as any);
              ref.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
            }
          }}
        />
      )}
    </motion.span>
  );
};
