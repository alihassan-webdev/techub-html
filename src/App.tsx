import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/layout/Layout";
import { preloadCriticalImages } from "@/utils/imageOptimization";

// Import pages normally for instant loading
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import FreeCourses from "./pages/FreeCourses";
import PaidCourses from "./pages/PaidCourses";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import CourseDetail from "./pages/CourseDetail";


const queryClient = new QueryClient();

function App() {
  // Preload critical images on app start
  useEffect(() => {
    preloadCriticalImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="tech-hub-theme">
        <TooltipProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="services" element={<Services />} />
              <Route path="courses/free" element={<FreeCourses />} />
              <Route path="courses/paid" element={<PaidCourses />} />
              <Route path="courses/:type" element={<Courses />} />
              <Route path="course/:courseId" element={<CourseDetail />} />
            </Route>
          </Routes>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
