import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  minLoadingTime?: number; // Minimum time to show loading (prevents flash)
  autoStart?: boolean;
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const { minLoadingTime = 500, autoStart = true } = options;
  const [isLoading, setIsLoading] = useState(autoStart);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (autoStart) {
      setLoadingStartTime(Date.now());
    }
  }, [autoStart]);

  const startLoading = () => {
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  };

  const stopLoading = async () => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
    }
    
    setIsLoading(false);
    setLoadingStartTime(null);
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

// Hook specifically for data loading with loading states
export const useAsyncOperation = <T,>(
  operation: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { isLoading, startLoading, stopLoading } = usePageLoading();

  useEffect(() => {
    let isMounted = true;

    const executeOperation = async () => {
      try {
        startLoading();
        setError(null);
        const result = await operation();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          await stopLoading();
        }
      }
    };

    executeOperation();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const retry = () => {
    setError(null);
    setData(null);
  };

  return {
    data,
    error,
    isLoading,
    retry,
  };
};
