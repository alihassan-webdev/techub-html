import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FreeCourses from '@/components/FreeCourses';
import PaidCourses from '@/components/PaidCourses';
import Partners from '@/components/Partners';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FreeCourses />
        <PaidCourses />
        <Partners />
        <Gallery />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
