/**
 * Course description equalizer utility for consistent card heights
 * Ensures all course descriptions have equal length while preserving keywords
 */

import { smartTruncate } from './textOptimization';

interface DescriptionEqualizerOptions {
  targetLength: number;
  minLength: number;
  preserveKeywords: string[];
  priorityKeywords?: string[];
}

/**
 * Standard keywords to preserve across all course descriptions
 */
const STANDARD_KEYWORDS = [
  'Faisalabad',
  'IT training',
  'computer training',
  'professional',
  'course',
  'institute',
  'practical',
  'skills',
  'certification',
  'hands-on'
];

/**
 * Course-specific keywords based on course content
 */
const getCourseSpecificKeywords = (courseName: string, category: string): string[] => {
  const name = courseName.toLowerCase();
  const cat = category.toLowerCase();
  
  const keywordMap: { [key: string]: string[] } = {
    // Programming courses
    python: ['Python programming', 'coding', 'development', 'programming'],
    javascript: ['JavaScript', 'web development', 'full stack', 'programming'],
    'full stack': ['web development', 'frontend', 'backend', 'development'],
    
    // Security courses
    security: ['cyber security', 'ethical hacking', 'security', 'cybersecurity'],
    cybersecurity: ['cyber security', 'ethical hacking', 'security', 'penetration testing'],
    forensics: ['digital forensics', 'investigation', 'cybersecurity', 'forensic'],
    
    // Cloud courses
    cloud: ['cloud computing', 'AWS', 'Azure', 'cloud platform'],
    aws: ['AWS', 'cloud computing', 'Amazon Web Services'],
    azure: ['Azure', 'Microsoft Azure', 'cloud computing'],
    
    // Design courses
    design: ['graphic design', 'creative', 'visual design', 'Adobe'],
    'ui/ux': ['UI design', 'UX design', 'user interface', 'user experience'],
    graphic: ['graphic design', 'Adobe', 'creative', 'visual'],
    
    // Marketing courses
    marketing: ['digital marketing', 'SEO', 'social media', 'marketing'],
    digital: ['digital marketing', 'SEO', 'online marketing', 'Google Ads'],
    
    // Others
    mobile: ['mobile app', 'React Native', 'app development', 'mobile'],
    video: ['video editing', 'media production', 'editing'],
    office: ['Microsoft Office', 'Excel', 'office management'],
    shopify: ['e-commerce', 'Shopify', 'online store']
  };
  
  let keywords: string[] = [];
  
  // Check course name for keywords
  Object.entries(keywordMap).forEach(([key, values]) => {
    if (name.includes(key)) {
      keywords.push(...values);
    }
  });
  
  // Check category for keywords
  if (cat.includes('programming')) keywords.push('programming', 'coding');
  if (cat.includes('security')) keywords.push('security', 'cybersecurity');
  if (cat.includes('design')) keywords.push('design', 'creative');
  if (cat.includes('marketing')) keywords.push('marketing', 'digital');
  if (cat.includes('development')) keywords.push('development', 'programming');
  
  // Remove duplicates
  return [...new Set(keywords)];
};

/**
 * Equalizes course description length while preserving important information
 */
export const equalizeDescription = (
  description: string,
  courseName: string,
  category: string,
  courseType: 'Free' | 'Paid',
  options?: Partial<DescriptionEqualizerOptions>
): string => {
  const defaults: DescriptionEqualizerOptions = {
    targetLength: 250, // Target character length for flexible 2-4 lines
    minLength: 120,    // Minimum acceptable length for 2 lines
    preserveKeywords: STANDARD_KEYWORDS,
    priorityKeywords: ['Faisalabad', 'IT training', courseName.split(' ')[0].toLowerCase()]
  };
  
  const opts = { ...defaults, ...options };
  
  // Get course-specific keywords
  const courseKeywords = getCourseSpecificKeywords(courseName, category);
  const allKeywords = [...opts.preserveKeywords, ...courseKeywords];
  
  // Add course type specific keywords
  if (courseType === 'Free') {
    allKeywords.push('free', 'NAVTTC', 'government program');
  } else {
    allKeywords.push('professional', 'certification', 'internship');
  }
  
  // Remove duplicates and ensure priority keywords are included
  const uniqueKeywords = [...new Set(allKeywords)];
  const priorityKeywords = opts.priorityKeywords || [];
  
  // If description is already within acceptable range (2-4 lines), use smart truncation
  if (description.length >= opts.minLength && description.length <= opts.targetLength + 30) {
    return smartTruncate(description, {
      maxLength: opts.targetLength + 30, // Allow slight flexibility for natural line breaks
      preserveKeywords: uniqueKeywords,
      priorityKeywords: priorityKeywords
    });
  }
  
  // If description is too long, truncate smartly
  if (description.length > opts.targetLength + 20) {
    return smartTruncate(description, {
      maxLength: opts.targetLength,
      preserveKeywords: uniqueKeywords,
      priorityKeywords: priorityKeywords,
      minWords: 20
    });
  }
  
  // If description is too short, enhance it with standard phrases
  if (description.length < opts.minLength) {
    const enhancers = getDescriptionEnhancers(courseName, category, courseType);
    let enhanced = description;

    // Add enhancers until we reach target length (not just minimum)
    for (const enhancer of enhancers) {
      if (enhanced.length + enhancer.length + 1 <= opts.targetLength) {
        enhanced += (enhanced.endsWith('.') ? ' ' : '. ') + enhancer;
      }
      if (enhanced.length >= opts.targetLength - 20) break; // Target length minus small buffer
    }

    return smartTruncate(enhanced, {
      maxLength: opts.targetLength,
      preserveKeywords: uniqueKeywords,
      priorityKeywords: priorityKeywords
    });
  }

  // If description is between min and target, try to enhance to target
  if (description.length < opts.targetLength - 50) {
    const enhancers = getDescriptionEnhancers(courseName, category, courseType);
    let enhanced = description;

    // Add one or two enhancers to reach target length
    for (let i = 0; i < 2 && enhanced.length < opts.targetLength - 20; i++) {
      const enhancer = enhancers[i];
      if (enhancer && enhanced.length + enhancer.length + 1 <= opts.targetLength) {
        enhanced += (enhanced.endsWith('.') ? ' ' : '. ') + enhancer;
      }
    }

    return smartTruncate(enhanced, {
      maxLength: opts.targetLength,
      preserveKeywords: uniqueKeywords,
      priorityKeywords: priorityKeywords
    });
  }
  
  return description;
};

/**
 * Get standard enhancement phrases for short descriptions
 */
const getDescriptionEnhancers = (
  courseName: string, 
  category: string, 
  courseType: 'Free' | 'Paid'
): string[] => {
  const name = courseName.toLowerCase();
  const baseEnhancers = [
    'Learn practical IT skills training at our leading computer training institute Faisalabad with hands-on experience and industry-standard tools',
    'Gain industry-recognized certification upon completion with comprehensive exam preparation and professional portfolio development',
    'Expert instructors with real-world experience guide your learning journey through structured modules and practical assignments',
    'Hands-on projects and practical exercises included with real client work and professional mentorship throughout the program'
  ];
  
  const typeSpecificEnhancers = courseType === 'Free'
    ? [
        'Part of Prime Minister Youth Skills Development Program with internationally recognized certification and career guidance',
        'NAVTTC certified training program providing government-endorsed qualifications for professional advancement',
        'Government-funded professional education opportunity with complete training materials and expert mentorship included'
      ]
    : [
        'Includes 2-month professional internship placement with leading companies and guaranteed job placement assistance',
        'Industry-focused curriculum with job placement assistance, interview preparation, and professional networking opportunities',
        'Professional certification recognized by top employers with comprehensive career support and alumni network access'
      ];
  
  const courseSpecificEnhancers: { [key: string]: string[] } = {
    python: ['Master Django framework and web development with database integration and deployment strategies', 'Build real-world applications including e-commerce platforms, APIs, and data analysis projects'],
    javascript: ['Learn MERN/MEAN stack development with React, Node.js, and MongoDB for full-stack applications', 'Modern JavaScript frameworks training including ES6+, async programming, and testing methodologies'],
    security: ['Ethical hacking and penetration testing included with advanced vulnerability assessment and incident response', 'Industry-standard security tools training covering network security, cryptography, and forensic investigation'],
    cloud: ['AWS and Microsoft Azure certification preparation included with hands-on labs and practice exams for professional credentials', 'Hands-on cloud deployment experience with serverless computing, containerization, and DevOps automation'],
    design: ['Adobe Creative Suite mastery with advanced techniques in Photoshop, Illustrator, and professional workflow', 'Portfolio development guidance with client project experience and industry-standard design principles'],
    marketing: ['Google Ads and SEO optimization training with campaign management and analytics interpretation', 'Real campaign management experience with social media marketing, content strategy, and conversion optimization']
  };
  
  // Get course-specific enhancers
  let specificEnhancers: string[] = [];
  Object.entries(courseSpecificEnhancers).forEach(([key, enhancers]) => {
    if (name.includes(key)) {
      specificEnhancers.push(...enhancers);
    }
  });
  
  return [...baseEnhancers, ...typeSpecificEnhancers, ...specificEnhancers];
};

/**
 * Batch equalize multiple course descriptions
 */
export const equalizeCourseDescriptions = (
  courses: Array<{
    name: string;
    description: string;
    category: string;
    type: 'Free' | 'Paid';
  }>
): Array<{ originalDescription: string; equalizedDescription: string }> => {
  return courses.map(course => ({
    originalDescription: course.description,
    equalizedDescription: equalizeDescription(
      course.description,
      course.name,
      course.category,
      course.type
    )
  }));
};
