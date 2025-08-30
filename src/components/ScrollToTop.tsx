import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname, search or hash changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname, search, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
