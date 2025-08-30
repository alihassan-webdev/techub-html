// Optimized image imports for all course images
// This allows Vite to properly optimize and bundle images

// Free course images
import advancePythonImg from './course/free/advance-python.avif';
import cloudComputingAwsImg from './course/free/cloud computing (aws).avif';
import cloudComputingMicrosoftImg from './course/free/cloud computing microsoft.avif';
import cyberSecurityFreeImg from './course/free/cyber security.avif';
import digitalForensicImg from './course/free/digital forensic cyber security.avif';
import fullStackFreeImg from './course/free/full stack web development.avif';
import googleUxDesignImg from './course/free/google-ux-design.avif';
import javascriptFullStackImg from './course/free/java scripts full stack.avif';
import reactNativeImg from './course/free/react native.avif';
import uiDesignImg from './course/free/ui design.avif';

// Paid course images
import awsCloudComputingImg from './course/paid/aws-cloud computing.avif';
import cloudComputingAzureImg from './course/paid/cloud-computing azure.avif';
import cyberSecurityPaidImg from './course/paid/cyber-security.avif';
import digitalMarketingImg from './course/paid/digital-marketing.avif';
import graphicDesigningImg from './course/paid/graphic-designing.avif';
import officeManagementImg from './course/paid/office-management.avif';
import shopifyImg from './course/paid/shopify.avif';
import videoEditingImg from './course/paid/video-editing.avif';
import webDevelopmentImg from './course/paid/web-development.avif';

export interface OptimizedImageData {
  src: string;
  filename: string;
  title: string;
  type: 'free' | 'paid';
  id: string;
}

export const freeCoursesImages: OptimizedImageData[] = [
  {
    src: advancePythonImg,
    filename: 'advance-python',
    title: 'Advance Python',
    type: 'free',
    id: 'advance-python'
  },
  {
    src: cloudComputingAwsImg,
    filename: 'cloud computing (aws)',
    title: 'Cloud Computing (AWS)',
    type: 'free',
    id: 'cloud-computing-aws-azure'
  },
  {
    src: cloudComputingMicrosoftImg,
    filename: 'cloud computing microsoft',
    title: 'Cloud Computing (Microsoft)',
    type: 'free',
    id: 'cloud-computing-microsoft'
  },
  {
    src: cyberSecurityFreeImg,
    filename: 'cyber security',
    title: 'Cyber Security (CEH, CHFI)',
    type: 'free',
    id: 'cyber-security-ceh-chfi'
  },
  {
    src: digitalForensicImg,
    filename: 'digital forensic cyber security',
    title: 'Digital Forensics Cyber Security',
    type: 'free',
    id: 'digital-forensics-cyber-security'
  },
  {
    src: fullStackFreeImg,
    filename: 'full stack web development',
    title: 'Full Stack Web Development',
    type: 'free',
    id: 'full-stack-web-development-free'
  },
  {
    src: googleUxDesignImg,
    filename: 'google-ux-design',
    title: 'Google UX Design',
    type: 'free',
    id: 'google-ux-design'
  },
  {
    src: javascriptFullStackImg,
    filename: 'java scripts full stack',
    title: 'JavaScript Full Stack (MERN / MEAN)',
    type: 'free',
    id: 'javascript-full-stack'
  },
  {
    src: reactNativeImg,
    filename: 'react native',
    title: 'Mobile App Development',
    type: 'free',
    id: 'mobile-app-development'
  },
  {
    src: uiDesignImg,
    filename: 'ui design',
    title: 'Google UI/UX Design',
    type: 'free',
    id: 'google-ui-ux-design'
  }
];

export const paidCoursesImages: OptimizedImageData[] = [
  {
    src: awsCloudComputingImg,
    filename: 'aws-cloud computing',
    title: 'AWS Cloud Computing',
    type: 'paid',
    id: 'aws-cloud-computing'
  },
  {
    src: cloudComputingAzureImg,
    filename: 'cloud-computing azure',
    title: 'Cloud Computing Azure',
    type: 'paid',
    id: 'cloud-computing-azure'
  },
  {
    src: cyberSecurityPaidImg,
    filename: 'cyber-security',
    title: 'Cyber Security',
    type: 'paid',
    id: 'cyber-security'
  },
  {
    src: digitalMarketingImg,
    filename: 'digital-marketing',
    title: 'Digital Marketing',
    type: 'paid',
    id: 'digital-marketing-paid'
  },
  {
    src: graphicDesigningImg,
    filename: 'graphic-designing',
    title: 'Graphic Designing',
    type: 'paid',
    id: 'graphic-designing'
  },
  {
    src: officeManagementImg,
    filename: 'office-management',
    title: 'Office Management',
    type: 'paid',
    id: 'office-management'
  },
  {
    src: shopifyImg,
    filename: 'shopify',
    title: 'Shopify',
    type: 'paid',
    id: 'shopify'
  },
  {
    src: videoEditingImg,
    filename: 'video-editing',
    title: 'Video Editing',
    type: 'paid',
    id: 'video-editing'
  },
  {
    src: webDevelopmentImg,
    filename: 'web-development',
    title: 'Full Stack Development',
    type: 'paid',
    id: 'full-stack-development'
  }
];

export const allCoursesImages = [...freeCoursesImages, ...paidCoursesImages];

// Helper functions for fast lookups
export const getImageById = (id: string): OptimizedImageData | undefined => {
  return allCoursesImages.find(img => img.id === id);
};

export const getImagesByType = (type: 'free' | 'paid'): OptimizedImageData[] => {
  return type === 'free' ? freeCoursesImages : paidCoursesImages;
};

// Fast lookup map for O(1) access
export const imageMap = new Map(
  allCoursesImages.map(img => [img.id, img])
);
