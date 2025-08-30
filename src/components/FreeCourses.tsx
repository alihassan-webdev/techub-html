import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Gift, Award, Clock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CourseCard from '@/components/CourseCard';
import { getCoursesByType } from '@/data/courses';

const FreeCourses = () => {
  const freeCourses = getCoursesByType('Free');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="w-full bg-background pt-8 pb-16">
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              Free Computer Courses in Faisalabad
            </span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              IT Training Institute
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the Prime Minister's Youth Skills Development Program at the best IT institute in Faisalabad and get internationally recognized certifications for courses including cyber security, web development, and more - completely free of cost.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 via-white to-green-50 border border-green-200 rounded-lg p-6 mb-6 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Clock className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">IT Training Duration</h3>
              <p className="text-muted-foreground text-sm">3 Months Professional Training</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">IT Certification</h3>
              <p className="text-muted-foreground text-sm">NAVTTC + International Certificate</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">Eligibility</h3>
              <p className="text-muted-foreground text-sm">Age: 20-40 years, Education: 14/16 years</p>
            </div>
          </div>
        </motion.div>

        {/* Important Notice - Red Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Alert className="border-red-200 bg-red-50 [&>svg]:relative [&>svg]:left-auto [&>svg]:top-auto [&>svg~*]:pl-0">
            <div className="flex items-center justify-center text-center w-full">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
              <AlertDescription className="text-red-800">
                <strong>Important Notice:</strong> Anyone who has already completed a NAVTTC course cannot enroll again.
              </AlertDescription>
            </div>
          </Alert>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {freeCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FreeCourses;
