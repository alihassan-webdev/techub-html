// Advanced image optimization utilities for instant loading

export interface ImageOptions {
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
  quality?: number;
}

export interface PreloadedImage {
  src: string;
  loaded: boolean;
  error: boolean;
  element?: HTMLImageElement;
}

class ImageOptimizer {
  private preloadedImages = new Map<string, PreloadedImage>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();
  private observer?: IntersectionObserver;

  constructor() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src && !img.src) {
              this.loadImage(src).then((loadedImg) => {
                img.src = loadedImg.src;
                img.classList.add('loaded');
                this.observer?.unobserve(img);
              }).catch(() => {
                img.classList.add('error');
                this.observer?.unobserve(img);
              });
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );
  }

  // Preload multiple images at once
  async preloadImages(urls: string[]): Promise<Map<string, PreloadedImage>> {
    const promises = urls.map(url => this.preloadImage(url));
    await Promise.allSettled(promises);
    return this.preloadedImages;
  }

  // Preload a single image
  async preloadImage(url: string): Promise<HTMLImageElement> {
    // Return existing promise if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Return existing image if already loaded
    const existing = this.preloadedImages.get(url);
    if (existing?.loaded && existing.element) {
      return existing.element;
    }

    const promise = this.loadImage(url);
    this.loadingPromises.set(url, promise);

    try {
      const img = await promise;
      this.preloadedImages.set(url, {
        src: url,
        loaded: true,
        error: false,
        element: img,
      });
      return img;
    } catch (error) {
      this.preloadedImages.set(url, {
        src: url,
        loaded: false,
        error: true,
      });
      throw error;
    } finally {
      this.loadingPromises.delete(url);
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // Check if image is preloaded
  isImagePreloaded(url: string): boolean {
    const preloaded = this.preloadedImages.get(url);
    return preloaded?.loaded === true;
  }

  // Get preloaded image
  getPreloadedImage(url: string): HTMLImageElement | null {
    const preloaded = this.preloadedImages.get(url);
    return preloaded?.element || null;
  }

  // Setup lazy loading for an image element
  setupLazyLoading(img: HTMLImageElement, src: string) {
    if (!this.observer) return;
    
    img.dataset.src = src;
    img.classList.add('lazy-loading');
    this.observer.observe(img);
  }

  // Cleanup
  destroy() {
    this.observer?.disconnect();
    this.preloadedImages.clear();
    this.loadingPromises.clear();
  }
}

// Global instance
export const imageOptimizer = new ImageOptimizer();

// React hook for image preloading
export const useImagePreloader = () => {
  const preloadImages = async (urls: string[]) => {
    return imageOptimizer.preloadImages(urls);
  };

  const preloadImage = async (url: string) => {
    return imageOptimizer.preloadImage(url);
  };

  const isPreloaded = (url: string) => {
    return imageOptimizer.isImagePreloaded(url);
  };

  return { preloadImages, preloadImage, isPreloaded };
};

// Progressive image component props
export interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  fixedHeight?: boolean;
}

// Utility to generate optimized image URLs (if you have image optimization service)
export const getOptimizedImageUrl = (src: string, width?: number, quality: number = 80): string => {
  // For now, return original URL
  // In production, you might want to use a service like Cloudinary or ImageKit
  return src;
};

// Preload critical images on app start
export const preloadCriticalImages = async () => {
  const criticalImages = [
    // Placeholders and hero images
    '/placeholder.svg',
    // First few course images
    '/course/free/cloud computing (aws).avif',
    '/course/free/full stack web development.avif',
    '/course/free/cyber security.avif',
    '/course/paid/aws-cloud computing.avif',
    '/course/paid/web-development.avif',
    // First few gallery images
    '/gallery/pic1.jpg',
    '/gallery/pic2.jpg',
    '/gallery/pic3.jpg',
  ];

  try {
    await imageOptimizer.preloadImages(criticalImages);
    console.log('Critical images preloaded');
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};
