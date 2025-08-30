import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ProgressiveImage from '@/components/ui/progressive-image';

interface DirectionAwareHoverProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  imageUrl: string;
  imageClassName?: string;
  overlayContent?: React.ReactNode;
  overlayClassName?: string;
  priority?: boolean;
  alt?: string;
}

type Direction = 'top' | 'bottom' | 'left' | 'right';

const DirectionAwareHover: React.FC<DirectionAwareHoverProps> = ({
  children,
  className,
  childrenClassName,
  imageUrl,
  imageClassName,
  overlayContent,
  overlayClassName,
  priority = false,
  alt = 'Course preview'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('left');
  const [isHovered, setIsHovered] = useState(false);

  const getDirection = useCallback((e: React.MouseEvent, element: HTMLElement): Direction => {
    const { width, height, left, top } = element.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * (width > height ? height / width : 1);
    const y = (e.clientY - top - height / 2) * (height > width ? width / height : 1);
    const d = Math.atan2(y, x) / 1.57;
    const dir = Math.round(d);
    
    switch (dir) {
      case 0:
        return 'right';
      case 1:
        return 'bottom';
      case -1:
        return 'top';
      default:
        return 'left';
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const dir = getDirection(e, ref.current);
    setDirection(dir);
    setIsHovered(true);
  }, [getDirection]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const dir = getDirection(e, ref.current);
    setDirection(dir);
    setIsHovered(false);
  }, [getDirection]);

  const getOverlayVariants = () => {
    const distance = 100;
    
    const initial = {
      top: direction === 'top' ? -distance : direction === 'bottom' ? distance : 0,
      left: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      opacity: 0
    };

    const animate = {
      top: 0,
      left: 0,
      opacity: 1
    };

    const exit = {
      top: direction === 'top' ? -distance : direction === 'bottom' ? distance : 0,
      left: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      opacity: 0
    };

    return { initial, animate, exit };
  };

  const variants = getOverlayVariants();

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden group cursor-pointer',
        className
      )}
    >
      {/* Background Image */}
      <div className="relative h-60 min-h-[240px] max-h-[240px]">
        <ProgressiveImage
          src={imageUrl}
          alt={alt}
          priority={priority}
          className={cn(
            'w-full h-60 min-h-[240px] max-h-[240px] transition-transform duration-300 group-hover:scale-105 object-cover',
            imageClassName
          )}
          width={300}
          height={256}
        />

        {/* Direction-aware overlay */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={direction}
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start z-30 pb-3',
                overlayClassName
              )}
            >
              {overlayContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="p-3 text-white max-h-full"
                >
                  {overlayContent}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={cn('relative z-10', childrenClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

export default DirectionAwareHover;
