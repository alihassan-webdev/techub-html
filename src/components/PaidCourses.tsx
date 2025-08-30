import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Users } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { getCoursesByType } from '@/data/courses';

const PaidCourses = () => {
  const paidCourses = getCoursesByType('Paid');

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
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-background via-primary/5 to-accent/5 pt-8 pb-16">
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
              Professional Computer Courses in Faisalabad
            </span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Premium IT Training
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advance your career with our industry-focused certification programs from the best IT institute in Faisalabad. Featuring digital marketing, cyber security, and other professional programs - each including practical training and internship opportunities.
          </p>
        </motion.div>

        {/* Course Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-red-50 via-white to-blue-50 border border-red-200 rounded-lg p-6 mb-6 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Clock className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">Professional IT Training Duration</h3>
              <p className="text-muted-foreground text-sm">3 Months + 2 Month Internship</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">Professional IT Certification</h3>
              <p className="text-muted-foreground text-sm">Industry Recognition Certificate</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="text-[#B22429] mb-2" size={24} />
              <h3 className="font-semibold text-lg mb-1 text-[#032F65]">Eligibility</h3>
              <p className="text-muted-foreground text-sm">Education: Matric</p>
            </div>
          </div>
        </motion.div>


        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paidCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard course={course} showEducation={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PaidCourses;
