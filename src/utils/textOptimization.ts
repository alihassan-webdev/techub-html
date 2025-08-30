/**
 * Text optimization utilities for keyword placement and length control
 */

interface KeywordOptimizationOptions {
  maxLength: number;
  preserveKeywords: string[];
  priorityKeywords?: string[];
  minWords?: number;
}

/**
 * Smart text truncation that preserves important keywords
 */
export const smartTruncate = (
  text: string, 
  options: KeywordOptimizationOptions
): string => {
  const { maxLength, preserveKeywords, priorityKeywords = [], minWords = 10 } = options;
  
  if (text.length <= maxLength) return text;
  
  const words = text.split(' ');
  if (words.length <= minWords) return text;
  
  // Find keyword positions
  const keywordPositions = new Map<number, string>();
  preserveKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const wordIndex = text.substring(0, match.index).split(' ').length - 1;
      keywordPositions.set(wordIndex, keyword);
    }
  });
  
  // Priority keywords get extra importance
  const priorityPositions = new Set<number>();
  priorityKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const wordIndex = text.substring(0, match.index).split(' ').length - 1;
      priorityPositions.add(wordIndex);
    }
  });
  
  // Calculate truncation point that preserves keywords
  let truncateAt = words.length;
  let currentLength = 0;
  
  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length + (i > 0 ? 1 : 0); // +1 for space
    
    if (currentLength + wordLength > maxLength) {
      // Check if we can include this word if it contains a priority keyword
      if (priorityPositions.has(i) && currentLength + wordLength <= maxLength + 20) {
        truncateAt = i + 1;
        break;
      }
      truncateAt = i;
      break;
    }
    
    currentLength += wordLength;
  }
  
  // Ensure we don't cut off in the middle of a keyword phrase
  for (let i = truncateAt; i < Math.min(truncateAt + 5, words.length); i++) {
    if (keywordPositions.has(i)) {
      truncateAt = i + 1;
    }
  }
  
  const truncated = words.slice(0, truncateAt).join(' ');
  return truncated + (truncateAt < words.length ? '...' : '');
};

/**
 * Enhanced keyword placement for reviews and testimonials
 */
export const optimizeReviewText = (
  originalText: string,
  location: string,
  course: string
): string => {
  const locationKeywords = [
    'Faisalabad',
    'computer training institute Faisalabad',
    'IT training Faisalabad',
    'software training Faisalabad'
  ];
  
  const courseKeywords = course.toLowerCase().includes('python') ? 
    ['Python programming', 'learn coding Faisalabad'] :
    course.toLowerCase().includes('web') ?
    ['web development', 'full stack training'] :
    course.toLowerCase().includes('digital') ?
    ['digital marketing', 'SEO training'] :
    course.toLowerCase().includes('cyber') ?
    ['cyber security', 'ethical hacking'] :
    ['IT skills training', 'professional courses'];
  
  // Check if text already has good keyword density
  const hasLocationKeyword = locationKeywords.some(keyword => 
    originalText.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (hasLocationKeyword) {
    return smartTruncate(originalText, {
      maxLength: 280,
      preserveKeywords: [...locationKeywords, ...courseKeywords],
      priorityKeywords: ['Faisalabad', course]
    });
  }
  
  return originalText;
};

/**
 * Generate SEO-optimized FAQ questions
 */
export const optimizeFAQQuestion = (question: string, category: string): string => {
  const seoKeywords = {
    programming: ['Python training Faisalabad', 'coding institute'],
    'web development': ['web development course', 'HTML CSS training'],
    'digital marketing': ['digital marketing course', 'SEO training Faisalabad'],
    courses: ['best IT courses Faisalabad', 'computer training'],
    certification: ['IT certification', 'diploma courses'],
    support: ['student support', 'learning assistance']
  };
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, ' ');
  const keywords = seoKeywords[categoryKey as keyof typeof seoKeywords] || 
                  ['IT training', 'Faisalabad'];
  
  return smartTruncate(question, {
    maxLength: 120,
    preserveKeywords: keywords,
    priorityKeywords: ['Faisalabad'],
    minWords: 8
  });
};

/**
 * Optimize FAQ answers with keyword placement
 */
export const optimizeFAQAnswer = (answer: string, category: string): string => {
  const coreKeywords = [
    'Faisalabad',
    'IT training',
    'computer courses',
    'professional training',
    'job placement'
  ];
  
  const categoryKeywords = {
    programming: ['Python programming', 'coding skills'],
    'web development': ['web development', 'frontend backend'],
    'digital marketing': ['digital marketing', 'SEO optimization'],
    courses: ['course selection', 'learning path'],
    certification: ['certification', 'industry recognition'],
    support: ['student support', '24/7 assistance']
  };
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, ' ');
  const specificKeywords = categoryKeywords[categoryKey as keyof typeof categoryKeywords] || [];
  
  return smartTruncate(answer, {
    maxLength: 350,
    preserveKeywords: [...coreKeywords, ...specificKeywords],
    priorityKeywords: ['Faisalabad', 'IT training'],
    minWords: 15
  });
};

/**
 * Calculate keyword density for SEO optimization
 */
export const calculateKeywordDensity = (text: string, keyword: string): number => {
  const words = text.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  
  let count = 0;
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const phrase = words.slice(i, i + keywordWords.length).join(' ');
    if (phrase === keyword.toLowerCase()) {
      count++;
    }
  }
  
  return (count / words.length) * 100;
};
