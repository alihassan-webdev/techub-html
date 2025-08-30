import Hero from '../components/Hero';
import Partners from '../components/Partners';
import StudentReviews from '../components/StudentReviews';
import FAQ from '../components/FAQ';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Auto-scroll to top when the component mounts or when the location changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <div className="w-full overflow-visible">
      {/* Hero Section */}
      <Hero />

      {/* Partners Section */}
      <section className="w-full bg-background overflow-visible">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <Partners />
        </div>
      </section>

      {/* Student Reviews Section */}
      <section id="reviews" className="w-full bg-background overflow-visible">
        <StudentReviews />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full bg-background overflow-visible">
        <div className="w-full px-4 md:px-6 lg:px-8 text-center">
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default Home;
