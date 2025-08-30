import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { imageOptimizer, ProgressiveImageProps } from '@/utils/imageOptimization';
import { trackImageLoading } from '@/utils/imagePerformanceMonitor';

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  placeholder = '/placeholder.svg',
  priority = false,
  onLoad,
  onError,
  sizes,
  width,
  height,
  objectFit = 'cover',
  fixedHeight = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      const endTracking = trackImageLoading(src, imageOptimizer.isImagePreloaded(src));

      try {
        // Check if image is already preloaded
        if (imageOptimizer.isImagePreloaded(src)) {
          if (isMounted) {
            setCurrentSrc(src);
            setLoaded(true);
            onLoad?.();
          }
          endTracking();
          return;
        }

        // Preload the image
        await imageOptimizer.preloadImage(src);

        if (isMounted) {
          setCurrentSrc(src);
          setLoaded(true);
          onLoad?.();
        }
        endTracking();
      } catch (err) {
        endTracking();
        if (isMounted) {
          setError(true);
          onError?.();
        }
      }
    };

    if (priority) {
      // For priority images, start loading immediately
      loadImage();
    } else {
      // For non-priority images, use intersection observer
      const img = imgRef.current;
      if (img) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadImage();
              observer.disconnect();
            }
          },
          { rootMargin: '100px' }
        );
        observer.observe(img);
        return () => observer.disconnect();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [src, priority, onLoad, onError]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn(
          'w-full h-full transition-all duration-500',
          objectFit === 'cover' ? 'object-cover' :
          objectFit === 'contain' ? 'object-contain' :
          objectFit === 'fill' ? 'object-fill' :
          objectFit === 'scale-down' ? 'object-scale-down' :
          objectFit === 'none' ? 'object-none' : 'object-cover',
          fixedHeight && 'min-h-[240px] max-h-[240px]',
          loaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105',
          error && 'opacity-50'
        )}
        style={{
          filter: loaded ? 'none' : 'blur(5px)',
        }}
      />
      
      {/* Loading overlay */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-muted/20 flex items-center justify-center"
          >
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;
