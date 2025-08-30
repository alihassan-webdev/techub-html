// Performance monitoring utilities for image loading optimization

interface ImagePerformanceMetrics {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  averageLoadTime: number;
  totalLoadTime: number;
}

class ImagePerformanceMonitor {
  private metrics: ImagePerformanceMetrics = {
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
    totalLoadTime: 0,
  };

  private loadTimes: number[] = [];

  // Track image load start
  startImageLoad(src: string): number {
    this.metrics.totalImages++;
    return performance.now();
  }

  // Track successful image load
  completeImageLoad(startTime: number, src: string): void {
    const loadTime = performance.now() - startTime;
    this.loadTimes.push(loadTime);
    this.metrics.loadedImages++;
    this.metrics.totalLoadTime += loadTime;
    this.metrics.averageLoadTime = this.metrics.totalLoadTime / this.metrics.loadedImages;
    
    // Log slow loading images (over 2 seconds)
    if (loadTime > 2000) {
      console.warn(`Slow image load detected: ${src} took ${loadTime.toFixed(2)}ms`);
    }
  }

  // Track failed image load
  failImageLoad(startTime: number, src: string): void {
    this.metrics.failedImages++;
    console.error(`Failed to load image: ${src}`);
  }

  // Get current metrics
  getMetrics(): ImagePerformanceMetrics {
    return { ...this.metrics };
  }

  // Get performance report
  getPerformanceReport(): string {
    const successRate = (this.metrics.loadedImages / this.metrics.totalImages) * 100;
    const failureRate = (this.metrics.failedImages / this.metrics.totalImages) * 100;
    
    return `
Image Loading Performance Report:
- Total Images: ${this.metrics.totalImages}
- Successfully Loaded: ${this.metrics.loadedImages} (${successRate.toFixed(1)}%)
- Failed to Load: ${this.metrics.failedImages} (${failureRate.toFixed(1)}%)
- Average Load Time: ${this.metrics.averageLoadTime.toFixed(2)}ms
- Total Load Time: ${this.metrics.totalLoadTime.toFixed(2)}ms
    `.trim();
  }

  // Reset metrics
  reset(): void {
    this.metrics = {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      averageLoadTime: 0,
      totalLoadTime: 0,
    };
    this.loadTimes = [];
  }

  // Log performance report to console (development only)
  logReport(): void {
    if (import.meta.env.DEV) {
      console.log(this.getPerformanceReport());
    }
  }
}

// Create singleton instance
export const imagePerformanceMonitor = new ImagePerformanceMonitor();

// Enhanced image preloader with performance tracking
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const startTime = imagePerformanceMonitor.startImageLoad(src);
    const img = new Image();
    
    img.onload = () => {
      imagePerformanceMonitor.completeImageLoad(startTime, src);
      resolve(img);
    };
    
    img.onerror = () => {
      imagePerformanceMonitor.failImageLoad(startTime, src);
      reject(new Error(`Failed to preload image: ${src}`));
    };
    
    img.src = src;
  });
};

// Preload multiple images with performance tracking
export const preloadImages = async (srcs: string[]): Promise<HTMLImageElement[]> => {
  const results = await Promise.allSettled(
    srcs.map(src => preloadImage(src))
  );
  
  const loaded: HTMLImageElement[] = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      loaded.push(result.value);
    } else {
      console.warn(`Failed to preload image ${srcs[index]}:`, result.reason);
    }
  });
  
  return loaded;
};

// Utility to check if image is in cache
export const isImageCached = (src: string): boolean => {
  const img = new Image();
  img.src = src;
  return img.complete && img.naturalWidth !== 0;
};

// Batch image loader for better performance
export const batchLoadImages = async (
  srcs: string[], 
  batchSize: number = 3,
  delay: number = 100
): Promise<HTMLImageElement[]> => {
  const results: HTMLImageElement[] = [];
  
  for (let i = 0; i < srcs.length; i += batchSize) {
    const batch = srcs.slice(i, i + batchSize);
    const batchResults = await preloadImages(batch);
    results.push(...batchResults);
    
    // Small delay between batches to prevent overwhelming the browser
    if (i + batchSize < srcs.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};
