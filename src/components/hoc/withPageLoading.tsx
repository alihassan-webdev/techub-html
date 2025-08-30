import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/ui/loading-screen';

interface WithPageLoadingOptions {
  loadingMessage?: string;
  minLoadingTime?: number;
  showLogo?: boolean;
}

const withPageLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithPageLoadingOptions = {}
) => {
  const {
    loadingMessage = 'Loading...',
    minLoadingTime = 600,
    showLogo = true,
  } = options;

  const WithPageLoadingComponent: React.FC<P> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [startTime] = useState(Date.now());

    useEffect(() => {
      const timer = setTimeout(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsed);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }, 100);

      return () => clearTimeout(timer);
    }, [startTime]);

    if (isLoading) {
      return (
        <div className="w-full min-h-screen">
          <LoadingScreen
            message={loadingMessage}
            showLogo={showLogo}
            className="min-h-[500px]"
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithPageLoadingComponent.displayName = `withPageLoading(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithPageLoadingComponent;
};

export default withPageLoading;
