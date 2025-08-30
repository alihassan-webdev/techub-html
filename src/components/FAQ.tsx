import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { optimizeFAQAnswer, optimizeFAQQuestion, smartTruncate } from '@/utils/textOptimization';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How to enroll in the best IT courses at computer training institute in Faisalabad?",
    answer: "Enrolling at our leading IT training institute in Faisalabad is simple! Browse our comprehensive course catalog of job-oriented IT programs, select your preferred professional course, and click 'Enroll Now'. For free introductory courses, get instant access. For diploma in IT in Faisalabad and certification programs, complete the secure payment process to receive immediate access to video lectures, hands-on assignments, and our supportive learning community.",
    category: "Getting Started"
  },
  {
    id: 2,
    question: "What is the difference between free and paid courses?",
    answer: "Free courses provide foundational knowledge and introductory content, perfect for beginners exploring new technologies. Paid courses offer comprehensive, in-depth training with advanced projects, personalized mentorship, career guidance, industry certifications, and lifetime access to materials. Paid courses also include direct instructor support and networking opportunities.",
    category: "Courses"
  },
  {
    id: 3,
    question: "Do you offer certificates upon course completion?",
    answer: "Yes! All our courses come with certificates of completion. Free courses provide digital certificates, while paid courses offer industry-recognized certificates that can be added to your LinkedIn profile and resume. Some of our advanced courses also prepare you for third-party certifications from major tech companies.",
    category: "Certification"
  },
  {
    id: 4,
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and optimized for all devices. You can access course materials, watch videos, complete assignments, and participate in discussions on your smartphone, tablet, laptop, or desktop. We also offer offline viewing options for video content through our mobile apps.",
    category: "Technical"
  },
  {
    id: 5,
    question: "What kind of support do you provide to students?",
    answer: "We provide comprehensive support including 24/7 technical assistance, instructor office hours, peer-to-peer learning communities, career counseling, resume reviews, and job placement assistance. Our dedicated support team responds to queries within 24 hours, and we have active community forums for each course.",
    category: "Support"
  },
  {
    id: 6,
    question: "Are there any prerequisites for advanced courses?",
    answer: "Prerequisites vary by course and are clearly listed on each course page. Most beginner courses have no prerequisites, while intermediate and advanced courses may require fundamental knowledge in programming, specific tools, or completion of prerequisite courses. We provide recommended learning paths to help you progress systematically.",
    category: "Requirements"
  },
  {
    id: 7,
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid courses. If you're not completely satisfied within the first 30 days, contact our support team for a full refund. This policy allows you to explore the course content risk-free and ensure it meets your learning objectives.",
    category: "Policy"
  },
  {
    id: 8,
    question: "How often is the course content updated?",
    answer: "We continuously update our course content to reflect the latest industry trends and technologies. Most courses are reviewed and updated quarterly, with critical updates pushed immediately when new versions of technologies are released. Students get lifetime access to all updates for paid courses.",
    category: "Content"
  },
  {
    id: 9,
    question: "Can I switch from a free course to a paid course later?",
    answer: "Yes! You can start with a free course to build your foundation and later upgrade to a paid course anytime. Your progress will be saved, and you’ll gain access to advanced lessons, mentorship, and certifications after upgrading.",
    category: "Courses"
  },
  {
    id: 10,
    question: "Where to find the best Python programming course in Faisalabad with job placement?",
    answer: "Our premier IT training institute in Faisalabad offers the most comprehensive Python programming courses with practical, hands-on training and guaranteed job placement assistance. Our expert-designed Python curriculum ranges from beginner to advanced levels, featuring real-world Django projects, machine learning applications, expert instructors with industry experience, and job-oriented programming skills. We provide flexible free and paid options with certifications to launch your coding career in Faisalabad.",
    category: "Programming"
  },
  {
    id: 11,
    question: "Which institute offers the most affordable web development course in Faisalabad?",
    answer: "Our affordable IT training institute in Faisalabad provides the highest quality web development education at competitive prices. Our comprehensive web development courses cover HTML5, CSS3, JavaScript ES6, React.js, Node.js, and complete full-stack development with hands-on projects, real industry internships, and dedicated job placement assistance. Students receive excellent value with professional training, modern curriculum, and career support that's unmatched in Faisalabad's education market.",
    category: "Web Development"
  },
  {
    id: 12,
    question: "How to find best digital marketing course with certificate in Faisalabad?",
    answer: "Our best digital marketing course with certificate in Faisalabad covers SEO, social media marketing, Google Ads, content marketing, and analytics. Students receive industry-recognized certificates and practical training with real campaigns, making it the top choice for digital marketing education in the region.",
    category: "Digital Marketing"
  }
];

const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
}> = ({ searchTerm, onSearchChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative max-w-2xl mx-auto mb-12"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search frequently asked questions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </div>
    </motion.div>
  );
};

const FAQCard: React.FC<{
  faq: FAQItem;
  index: number;
}> = ({ faq, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Accordion.Root type="single" collapsible className="w-full">
        <Accordion.Item 
          value={`item-${faq.id}`} 
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-[1.02]"
        >
          <Accordion.Header className="w-full">
            <Accordion.Trigger className="group w-full px-6 py-6 text-left focus:outline-none">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-8 text-left">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="px-6 pb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-6">
                {smartTruncate(optimizeFAQAnswer(faq.answer, faq.category), {
                  maxLength: 350,
                  preserveKeywords: ['Faisalabad', 'IT training', 'computer training', 'institute', 'certification', 'course'],
                  priorityKeywords: ['Faisalabad', 'IT training']
                })}
              </p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = useMemo(() => {
    if (!searchTerm.trim()) return faqData;
    
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              Best Computer Training
            </span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Institute in Faisalabad 2025
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Find comprehensive answers to frequently asked questions about our job-oriented IT courses, professional certifications, diploma in computer science in Faisalabad, and advanced learning platform.
            Discover why we're the preferred choice for quality IT education and the top-rated computer training institute near me in Faisalabad.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* FAQ Items */}
        {filteredFAQs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredFAQs.map((faq, index) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse all questions above
            </p>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#032F65]/5 to-[#B22429]/5 dark:bg-primary/10 rounded-2xl p-8 border border-[#032F65]/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Reach out to us and we'll get back to you within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/+923006622815?text=Hello, I need support regarding your courses.', '_blank')}
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
