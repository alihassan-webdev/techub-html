import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Clock, Award, BookOpen, CheckCircle, Globe, GraduationCap, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { getCourseById, Course } from '@/data/courses';
import { loadCourseImages, ImageMetadata, normalizeFilename } from '@/utils/dynamicImageLoader';
import { motion } from 'framer-motion';

// Helper function to create shorter descriptions for Free courses
const getShortenedDescription = (description: string): string => {
  const sentences = description.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  if (sentences.length <= 2) return description;
  const shortened = sentences.slice(0, 2).join('. ').trim();
  return shortened.endsWith('.') ? shortened : shortened + '.';
};

// SEO optimize a description while keeping EXACT same character length
const seoOptimizeExactLength = (
  text: string,
  courseName: string,
  category: string,
  courseType: 'Free' | 'Paid'
): string => {
  const originalLength = text.length;
  const lowerName = courseName.toLowerCase();
  const lowerCat = category.toLowerCase();

  // Build related keywords
  const baseKeywords = ['Faisalabad', 'IT training', 'computer training', 'professional', 'course'];
  const typeKeywords = courseType === 'Free' ? ['NAVTTC', 'government program'] : ['certification', 'internship'];
  const nameKeywords: string[] = [];
  if (lowerName.includes('python')) nameKeywords.push('Python programming', 'coding');
  if (lowerName.includes('javascript') || lowerName.includes('web')) nameKeywords.push('web development', 'full stack');
  if (lowerName.includes('security') || lowerName.includes('cyber')) nameKeywords.push('cyber security', 'ethical hacking');
  if (lowerName.includes('cloud') || lowerName.includes('aws') || lowerName.includes('azure')) nameKeywords.push('cloud computing', 'AWS', 'Azure');
  if (lowerName.includes('design') || lowerName.includes('ui') || lowerName.includes('ux')) nameKeywords.push('graphic design', 'UI/UX');
  if (lowerName.includes('marketing') || lowerName.includes('digital')) nameKeywords.push('digital marketing', 'SEO');
  if (lowerName.includes('mobile') || lowerName.includes('native')) nameKeywords.push('mobile app development', 'React Native');

  const categoryKeywords: string[] = [];
  if (lowerCat.includes('security')) categoryKeywords.push('cybersecurity');
  if (lowerCat.includes('design')) categoryKeywords.push('design');
  if (lowerCat.includes('development')) categoryKeywords.push('development');
  if (lowerCat.includes('marketing')) categoryKeywords.push('marketing');

  const allKeywords = Array.from(new Set([...baseKeywords, ...typeKeywords, ...nameKeywords, ...categoryKeywords]));

  // Build an additive phrase with keywords not present already
  const missing = allKeywords.filter(k => !text.toLowerCase().includes(k.toLowerCase()));
  const phraseParts = missing.slice(0, 3); // keep concise
  let augmented = text;
  if (phraseParts.length > 0) {
    const phrase = `${phraseParts.join(', ')} in Faisalabad`;
    augmented += (augmented.trim().endsWith('.') ? ' ' : '. ') + phrase + '.';
  }

  // Truncate to EXACT original length (character count)
  if (augmented.length === originalLength) return augmented;
  if (augmented.length > originalLength) return augmented.slice(0, originalLength);

  // If augmented ended up shorter (edge case), pad with minimal filler words relevant to SEO
  const filler = ' IT training';
  while (augmented.length + filler.length <= originalLength) {
    augmented += filler;
  }
  return augmented.slice(0, originalLength);
};

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) {
        setCourse(undefined);
        setIsLoading(false);
        return;
      }

      // Check if it's an auto-generated course
      if (courseId.startsWith('auto-')) {
        try {
          // Extract the normalized filename from the course ID
          const normalizedFilename = courseId.replace('auto-', '');

          // Load both free and paid course images to find the match
          const [freeImages, paidImages] = await Promise.all([
            loadCourseImages('free'),
            loadCourseImages('paid')
          ]);

          const allImages = [...freeImages, ...paidImages];

          // Find the image that matches the normalized filename
          const matchingImage = allImages.find(img =>
            normalizeFilename(img.filename) === normalizedFilename
          );

          if (matchingImage) {
            // Create a course object from the image metadata
            const autoGeneratedCourse: Course = {
              id: courseId,
              name: matchingImage.title,
              type: matchingImage.type === 'free' ? 'Free' : 'Paid',
              cover: matchingImage.src,
              description: `Comprehensive course on ${matchingImage.title}. This course covers all essential topics and provides hands-on experience with real-world projects. Perfect for beginners and intermediate learners looking to advance their skills.`,
              duration: matchingImage.type === 'free' ? '8-12 weeks' : '3 months',
              level: 'Professional',
              category: getCategoryFromTitle(matchingImage.title),
              enrolled: Math.floor(Math.random() * 500) + 100,
              rating: 4.0 + Math.random() * 1,
              fee: matchingImage.type === 'paid' ? '15,000 PKR' : undefined,
              internship: matchingImage.type === 'paid' ? '2-month internship included' : undefined,
              ageLimit: matchingImage.type === 'paid' ? undefined : '20-40 years',
              educationRequirement: matchingImage.type === 'paid' ? 'Matric' : '14/16 years',
              sessions: matchingImage.type === 'paid' ? 'Morning & Evening Sessions Available' : 'Morning & Evening Sessions Available',
              syllabus: generateSyllabus(matchingImage.title),
              syllabusSource: 'Custom-generated',
              prerequisites: generatePrerequisites(matchingImage.title)
            };

            setCourse(autoGeneratedCourse);
          } else {
            setCourse(undefined);
          }
        } catch (error) {
          console.error('Error loading auto-generated course:', error);
          setCourse(undefined);
        }
      } else {
        // Use existing static course lookup
        const staticCourse = getCourseById(courseId);
        setCourse(staticCourse);
      }

      setIsLoading(false);
    };

    loadCourse();
  }, [courseId]);

  // Helper function to determine category from title
  const getCategoryFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('web') || titleLower.includes('javascript') || titleLower.includes('react')) {
      return 'Web Development';
    } else if (titleLower.includes('security') || titleLower.includes('cyber')) {
      return 'Cybersecurity';
    } else if (titleLower.includes('cloud') || titleLower.includes('aws') || titleLower.includes('azure')) {
      return 'Cloud Computing';
    } else if (titleLower.includes('design') || titleLower.includes('ui')) {
      return 'Design';
    } else if (titleLower.includes('mobile') || titleLower.includes('native')) {
      return 'Mobile Development';
    }
    return 'Technology';
  };

  // Helper function to generate syllabus based on course title
  const generateSyllabus = (title: string): string[] => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('web') || titleLower.includes('javascript')) {
      return [
        'Introduction to Web Development',
        'HTML5 & CSS3 Fundamentals',
        'JavaScript Programming',
        'Responsive Design',
        'Modern Frameworks',
        'API Integration',
        'Testing & Debugging',
        'Deployment & Hosting'
      ];
    } else if (titleLower.includes('security') || titleLower.includes('cyber')) {
      return [
        'Cybersecurity Fundamentals',
        'Network Security',
        'Threat Analysis',
        'Security Tools & Techniques',
        'Incident Response',
        'Risk Assessment',
        'Compliance & Governance',
        'Hands-on Labs'
      ];
    } else if (titleLower.includes('cloud') || titleLower.includes('aws') || titleLower.includes('azure')) {
      return [
        'Cloud Computing Basics',
        'Cloud Service Models',
        'Infrastructure as Code',
        'Storage & Databases',
        'Networking & Security',
        'Monitoring & Optimization',
        'DevOps Integration',
        'Certification Preparation'
      ];
    } else if (titleLower.includes('design') || titleLower.includes('ui')) {
      return [
        'Design Principles',
        'Color Theory & Typography',
        'User Experience (UX)',
        'Design Tools Mastery',
        'Prototyping & Wireframing',
        'Brand Identity',
        'Portfolio Development',
        'Industry Best Practices'
      ];
    } else if (titleLower.includes('mobile') || titleLower.includes('native')) {
      return [
        'Mobile Development Fundamentals',
        'Platform-Specific Development',
        'User Interface Design',
        'Data Management',
        'API Integration',
        'Testing & Debugging',
        'App Store Deployment',
        'Performance Optimization'
      ];
    }

    return [
      `Introduction to ${title}`,
      'Fundamental Concepts',
      'Practical Applications',
      'Hands-on Projects',
      'Advanced Techniques',
      'Industry Standards',
      'Best Practices',
      'Final Project & Certification'
    ];
  };

  // Helper function to generate prerequisites based on course title
  const generatePrerequisites = (title: string): string[] => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('web') || titleLower.includes('javascript')) {
      return [
        'Basic computer literacy',
        'Understanding of internet basics',
        'No prior programming experience required'
      ];
    } else if (titleLower.includes('security') || titleLower.includes('cyber')) {
      return [
        'Basic networking knowledge',
        'Computer fundamentals',
        'Interest in cybersecurity field'
      ];
    } else if (titleLower.includes('cloud')) {
      return [
        'Basic understanding of computers',
        'Familiarity with internet services',
        'Interest in cloud technologies'
      ];
    } else if (titleLower.includes('design') || titleLower.includes('ui')) {
      return [
        'Creative mindset',
        'Basic computer skills',
        'Interest in visual design'
      ];
    }

    return [
      'Basic computer literacy',
      'Enthusiasm to learn',
      'No prior experience required'
    ];
  };

  const getBackPath = () => {
    if (course?.type === 'Free') {
      return '/courses/free';
    } else if (course?.type === 'Paid') {
      return '/courses/paid';
    }
    return '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Course Not Found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
          <Button
            onClick={() => navigate(getBackPath())}
            className="hover:bg-[#032F65] text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6 lg:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(getBackPath())}
            className="mb-2 sm:mb-4 hover:bg-[#032F65] hover:text-white text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Course Header */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant={course.type === 'Free' ? 'secondary' : 'default'}
                  className={
                    course.type === 'Free' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }
                >
                  {course.type}
                </Badge>
                <Badge variant="outline">{(course.level?.toLowerCase().includes('beginner') || course.level?.toLowerCase().includes('intermediate')) ? 'Professional' : course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {course.name}
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6">
                {seoOptimizeExactLength(
                  (course.type === 'Free' && course.id !== 'artificial-intelligence') ? getShortenedDescription(course.description) : course.description,
                  course.name,
                  course.category,
                  course.type
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base text-muted-foreground">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </motion.div>

            {/* Course Image */}
            <motion.div variants={itemVariants}>
              <img
                src={course.cover}
                alt={course.alt || course.name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>


            {/* Course Outline */}
            {course.syllabus && (
              <motion.div variants={itemVariants}>
                <Card className="p-4 sm:p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="flex items-center text-xl sm:text-2xl font-bold">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
                      Course Outline
                    </h3>
                    {course.syllabusSource === 'Extracted from TechHub' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        {course.syllabusSource}
                      </span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {course.syllabus.map((topic, index) => (
                      <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-muted/30">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">{topic}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}


          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">

            {/* Course Requirements */}
            {(course.ageLimit || course.educationRequirement) && (
              <motion.div variants={itemVariants}>
                <Card className="p-4 sm:p-6 transition-shadow hover:shadow-md">
                  <h3 className="flex items-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
                    Course Requirements
                  </h3>
                  <div className="grid gap-4 sm:gap-6">
                    {course.ageLimit && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Age Limit</h4>
                        <p className="text-lg font-medium">{course.ageLimit}</p>
                      </div>
                    )}
                    {course.educationRequirement && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Education Requirement</h4>
                        <p className="text-lg font-medium">{course.educationRequirement}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Enrollment Card */}
            <motion.div variants={itemVariants}>
              <Card className="p-4 sm:p-6 lg:sticky lg:top-6 transition-shadow hover:shadow-md">
                <div className="space-y-4 sm:space-y-6">
                  {course.fee && (
                    <div className="text-center">
                      {course.originalPrice && course.discount ? (
                        <div className="space-y-2">
                          <div className="text-lg text-muted-foreground line-through">
                            {course.originalPrice}
                          </div>
                          <div className="font-bold text-3xl sm:text-4xl text-[#032F65]">
                            {course.fee}
                          </div>
                          <div className="text-sm bg-[#B22429]/10 text-[#B22429] px-3 py-2 rounded font-bold inline-block border border-[#B22429]/20">
                            {course.discount}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-bold text-3xl sm:text-4xl text-[#032F65]">
                            {course.fee}
                          </div>
                          <p className="text-sm text-muted-foreground">Course Fee</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Important Notice Alert for Free Courses */}
                  {course.type === 'Free' && (
                    <Alert className="border-red-200 bg-red-50 [&>svg]:relative [&>svg]:left-auto [&>svg]:top-auto [&>svg~*]:pl-0">
                      <div className="flex items-start justify-start text-left w-full">
                        <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                        <AlertDescription className="text-red-800">
                          <strong>Important Notice:</strong> Anyone who has already completed a NAVTTC course cannot enroll again.
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      alert(`Enrolling in ${course.name}...`);
                    }}
                  >
                    {course.type === 'Free' ? 'Enroll for Free' : 'Enroll Now'}
                  </Button>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-2 sm:space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      {course.internship && (
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span>{course.internship}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>{course.syllabus?.length || 8} modules</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Community access</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-sm">rating</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {course.enrolled.toLocaleString()} students enrolled
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
