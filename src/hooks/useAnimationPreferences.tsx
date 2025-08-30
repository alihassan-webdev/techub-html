import { useEffect, useState } from 'react';

interface AnimationPreferences {
  prefersReducedMotion: boolean;
  isHighPerformance: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export const useAnimationPreferences = (): AnimationPreferences => {
  const [preferences, setPreferences] = useState<AnimationPreferences>({
    prefersReducedMotion: false,
    isHighPerformance: true,
    deviceType: 'desktop',
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Device detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (isMobile) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';

    // Performance detection (basic heuristics)
    const isHighPerformance = (() => {
      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 2;
      
      // Check device memory (if available)
      const memory = (navigator as any).deviceMemory || 4;
      
      // Check connection type (if available)
      const connection = (navigator as any).connection;
      const isSlowConnection = connection ? 
        ['slow-2g', '2g', '3g'].includes(connection.effectiveType) : false;
      
      // Basic performance score
      const performanceScore = cores * 2 + memory;
      
      return performanceScore >= 8 && !isSlowConnection && !prefersReducedMotion;
    })();

    setPreferences({
      prefersReducedMotion,
      isHighPerformance,
      deviceType,
    });

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        isHighPerformance: prev.isHighPerformance && !e.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return preferences;
};

export const getOptimizedAnimationConfig = (preferences: AnimationPreferences) => {
  const { prefersReducedMotion, isHighPerformance, deviceType } = preferences;

  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      ease: 'linear',
      staggerDelay: 0,
      enableParallax: false,
      enableComplexAnimations: false,
      enableAutoplay: false,
    };
  }

  if (deviceType === 'mobile') {
    return {
      duration: isHighPerformance ? 0.4 : 0.2,
      ease: 'easeOut',
      staggerDelay: isHighPerformance ? 0.08 : 0.04,
      enableParallax: false,
      enableComplexAnimations: isHighPerformance,
      enableAutoplay: isHighPerformance,
    };
  }

  if (deviceType === 'tablet') {
    return {
      duration: isHighPerformance ? 0.5 : 0.3,
      ease: 'easeOut',
      staggerDelay: isHighPerformance ? 0.1 : 0.06,
      enableParallax: isHighPerformance,
      enableComplexAnimations: isHighPerformance,
      enableAutoplay: true,
    };
  }

  // Desktop
  return {
    duration: isHighPerformance ? 0.6 : 0.4,
    ease: isHighPerformance ? [0.25, 0.25, 0, 1] : 'easeOut',
    staggerDelay: isHighPerformance ? 0.15 : 0.1,
    enableParallax: isHighPerformance,
    enableComplexAnimations: true,
    enableAutoplay: true,
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isLagging, setIsLagging] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = (currentTime: number) => {
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFPS);
        setIsLagging(currentFPS < 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { fps, isLagging };
};

// Viewport visibility hook for performance
export const useVisibilityOptimization = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isBackgroundTab, setIsBackgroundTab] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      setIsBackgroundTab(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return { isVisible, isBackgroundTab };
};

// Optimized animation variants factory
export const createOptimizedVariants = (preferences: AnimationPreferences) => {
  const config = getOptimizedAnimationConfig(preferences);

  return {
    fadeIn: {
      initial: { opacity: 0, y: preferences.prefersReducedMotion ? 0 : 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: config.duration, ease: config.ease }
      },
    },
    slideUp: {
      initial: { opacity: 0, y: preferences.prefersReducedMotion ? 0 : 40 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: config.duration, ease: config.ease }
      },
    },
    scaleIn: {
      initial: { 
        opacity: 0, 
        scale: preferences.prefersReducedMotion ? 1 : 0.8 
      },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: config.duration, ease: config.ease }
      },
    },
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: config.staggerDelay,
          delayChildren: 0.1,
        },
      },
    },
  };
};
