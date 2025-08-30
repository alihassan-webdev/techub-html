// Image performance monitoring utility
import React from 'react';

interface ImageLoadingMetrics {
  url: string;
  startTime: number;
  endTime: number;
  duration: number;
  fromCache: boolean;
  error?: boolean;
}

class ImagePerformanceMonitor {
  private metrics: ImageLoadingMetrics[] = [];
  private observers = new Set<(metrics: ImageLoadingMetrics) => void>();

  // Track image loading performance
  trackImageLoad(url: string, fromCache: boolean = false): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const metric: ImageLoadingMetrics = {
        url,
        startTime,
        endTime,
        duration,
        fromCache,
      };
      
      this.metrics.push(metric);
      this.notifyObservers(metric);
      
      // Log slow loading images
      if (duration > 1000 && !fromCache) {
        console.warn(`Slow image loading detected: ${url} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  // Subscribe to performance updates
  onMetricsUpdate(callback: (metrics: ImageLoadingMetrics) => void) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private notifyObservers(metric: ImageLoadingMetrics) {
    this.observers.forEach(observer => observer(metric));
  }

  // Get performance statistics
  getStats() {
    if (this.metrics.length === 0) {
      return {
        totalImages: 0,
        averageLoadTime: 0,
        cacheHitRate: 0,
        slowImages: 0,
      };
    }

    const totalImages = this.metrics.length;
    const averageLoadTime = this.metrics.reduce((sum, m) => sum + m.duration, 0) / totalImages;
    const cachedImages = this.metrics.filter(m => m.fromCache).length;
    const cacheHitRate = (cachedImages / totalImages) * 100;
    const slowImages = this.metrics.filter(m => m.duration > 1000).length;

    return {
      totalImages,
      averageLoadTime: Math.round(averageLoadTime),
      cacheHitRate: Math.round(cacheHitRate),
      slowImages,
    };
  }

  // Get recent slow images
  getSlowImages(threshold: number = 1000) {
    return this.metrics
      .filter(m => m.duration > threshold && !m.fromCache)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);
  }

  // Clear metrics
  clear() {
    this.metrics = [];
  }
}

// Global performance monitor instance
export const imagePerformanceMonitor = new ImagePerformanceMonitor();

// React hook for image performance monitoring
export const useImagePerformance = () => {
  const [stats, setStats] = React.useState(imagePerformanceMonitor.getStats());

  React.useEffect(() => {
    const unsubscribe = imagePerformanceMonitor.onMetricsUpdate(() => {
      setStats(imagePerformanceMonitor.getStats());
    });

    return unsubscribe;
  }, []);

  return {
    stats,
    slowImages: imagePerformanceMonitor.getSlowImages(),
    trackImageLoad: imagePerformanceMonitor.trackImageLoad.bind(imagePerformanceMonitor),
  };
};

// Enhanced image preloader with performance tracking
export const trackImageLoading = (url: string, fromCache: boolean = false) => {
  return imagePerformanceMonitor.trackImageLoad(url, fromCache);
};
