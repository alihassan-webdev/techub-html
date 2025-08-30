import { getImageById } from '@/assets/images/imageManifest';

export interface Course {
  id: string;
  name: string;
  type: 'Free' | 'Paid';
  cover: string;
  alt?: string;
  tutor?: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  enrolled: number;
  rating: number;
  price?: string;
  fee?: string;
  originalPrice?: string;
  discount?: string;
  internship?: string;
  ageLimit?: string;
  educationRequirement?: string;
  sessions?: string;
  syllabus?: string[];
  syllabusSource?: string;
  prerequisites?: string[];
}

// Helper function to get optimized image path
const getOptimizedCover = (courseId: string, fallbackPath: string): string => {
  const imageData = getImageById(courseId);
  return imageData ? imageData.src : fallbackPath;
};

export const courses: Course[] = [
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    type: 'Free',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F0fd10464f59c45299f5ac5110b5f3761%2F41e9351db47242148fe53be2acb35820?format=webp&width=800',
    alt: 'Artificial Intelligence free course cover image',
    description: 'Learn Artificial Intelligence from scratch to professional level. Master core ML concepts, deep learning fundamentals, and neural networks with practical labs. Work with transformers and LLMs for NLP, prompt engineering, and fine-tuning. Cover data preparation, evaluation, deployment basics (MLOps), and responsible AI to complete portfolio-ready projects.',
    duration: '3 months',
    level: 'Professional',
    category: 'Artificial Intelligence',
    enrolled: 812,
    rating: 4.8,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction to AI & Use Cases - AI history, applications, workflows, and tools overview',
      'Week 2: Python for AI & Data Handling - NumPy, Pandas, data wrangling, visualization basics',
      'Week 3: Math Essentials for ML - Linear algebra, calculus intuition, probability, and statistics',
      'Week 4: Supervised Learning - Regression, classification, model evaluation, and cross-validation',
      'Week 5: Unsupervised Learning - Clustering, dimensionality reduction, feature engineering',
      'Week 6: Neural Networks Fundamentals - Perceptron, backpropagation, activation functions',
      'Week 7: Deep Learning with CNNs - Image processing, convolution, pooling, transfer learning',
      'Week 8: NLP & Large Language Models - Tokenization, embeddings, transformers, prompt engineering',
      'Week 9: Model Deployment - REST APIs, FastAPI/Flask, ONNX, and lightweight serving',
      'Week 10: MLOps Basics - Experiment tracking, model versioning, data pipelines',
      'Week 11: Responsible AI - Bias, fairness, privacy, and model monitoring',
      'Week 12: Capstone Project - Build and present an AI project with documentation'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic computer literacy', 'Python basics recommended']
  },
  {
    id: 'advance-python',
    name: 'Advance Python',
    type: 'Free',
    cover: getOptimizedCover('advance-python', '/course/free/advance-python.avif'),
    description: 'Master advanced Python programming concepts through our comprehensive computer training program including object-oriented programming, data structures, algorithms, and frameworks. Learn coding in Faisalabad with practical IT skills training and build real-world applications to prepare for professional development roles. Gain expertise in Django, Flask web frameworks, machine learning libraries, and database integration. Complete hands-on projects and receive mentorship from industry experts to launch your Python development career successfully. Work with popular Python libraries like NumPy, Pandas, and TensorFlow for data science applications. Learn automated testing with pytest, version control with Git, and deployment on cloud platforms like AWS and Heroku. Develop web scraping tools, API integrations, and automation scripts for business processes. Practice with real-world datasets and build machine learning models for predictive analytics. Get lifetime access to course materials, alumni network, and continuous learning resources for career advancement.',
    duration: '3 months',
    level: 'Professional',
    category: 'Programming',
    enrolled: 856,
    rating: 4.7,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Advanced Python Fundamentals - Decorators, generators, context managers, metaclasses, and advanced function concepts',
      'Week 2: Object-Oriented Programming Mastery - Inheritance, polymorphism, encapsulation, abstract classes, and design patterns',
      'Week 3: Data Structures & Algorithms - Custom data structures, algorithm optimization, complexity analysis, and problem-solving techniques',
      'Week 4: File Handling & Database Integration - File I/O operations, CSV/JSON processing, SQLite integration, and database connectivity',
      'Week 5: Web Scraping & Automation - Beautiful Soup, Selenium, web scraping ethics, task automation, and scheduled scripts',
      'Week 6: Web Frameworks - Django fundamentals, Flask development, MVC architecture, template engines, and REST API creation',
      'Week 7: Data Science & Analytics - NumPy, Pandas, Matplotlib, data manipulation, statistical analysis, and visualization techniques',
      'Week 8: Machine Learning Basics - Scikit-learn, TensorFlow introduction, supervised/unsupervised learning, and model evaluation',
      'Week 9: Testing & Debugging - Unit testing, pytest framework, debugging techniques, code profiling, and performance optimization',
      'Week 10: Package Management & Deployment - Virtual environments, pip, conda, packaging, distribution, and deployment strategies',
      'Week 11: Concurrency & Performance - Threading, multiprocessing, asyncio, concurrent programming, and performance tuning',
      'Week 12: Capstone Project - Real-world application development, code review, documentation, portfolio preparation, and career guidance'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic Python knowledge', 'Programming fundamentals']
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    type: 'Paid',
    cover: getOptimizedCover('cyber-security', '/course/paid/cyber-security.avif'),
    description: 'Comprehensive cyber security training at our IT academy covering network security, ethical hacking, incident response, and security best practices. Gain practical IT skills training with hands-on experience using industry-standard tools and techniques through our professional cyber security course. Master penetration testing methodologies, vulnerability assessment, and advanced threat detection techniques. Learn compliance frameworks, risk management, and prepare for international cybersecurity certifications with expert guidance.',
    duration: '3 months',
    level: 'Professional',
    category: 'Security',
    enrolled: 245,
    rating: 4.8,
    fee: '25,000 PKR',
    originalPrice: '45,455 PKR',
    discount: '45% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction to Cyber Security - Fundamentals, threats, vulnerabilities, terminology, and security policies',
      'Week 2: Ethical Hacking Basics (CEH) - Overview, reconnaissance techniques, network scanning, and enumeration',
      'Week 3: System Hacking (CEH) - System hacking methodologies, password cracking, malware threats, and network sniffing',
      'Week 4: Web Application Security (CEH) - Common vulnerabilities, SQL injection, cross-site scripting, and session hijacking',
      'Week 5: Wireless Network Security (CEH) - Wireless network concepts, encryption protocols, attacks, and security best practices',
      'Week 6: Cryptography - Principles, symmetric and asymmetric encryption, hashing, and digital signatures',
      'Week 7: Introduction to Computer Hacking Forensics (CHFI) - Principles, digital evidence, incident response, and forensic tools',
      'Week 8: Forensic Investigation Process (CHFI) - Investigation steps, data acquisition, analysis methods, and reporting',
      'Week 9: Network Forensics (CHFI) - Network traffic analysis, intrusion detection, and malware analysis',
      'Week 10: Mobile Forensics (CHFI) - Mobile device data acquisition, analysis, and forensic tools',
      'Week 11: Cloud Forensics (CHFI) - Cloud computing fundamentals, data acquisition, and analysis in cloud environments',
      'Week 12: Final Project and Review - Project planning, development, finalization, and presentation'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic computer knowledge', 'Networking fundamentals']
  },
  {
    id: 'cloud-computing-aws-azure',
    name: 'Cloud Computing (AWS)',
    type: 'Free',
    cover: getOptimizedCover('cloud-computing-aws-azure', '/course/free/cloud computing (aws).avif'),
    description: 'Master cloud computing fundamentals through comprehensive training at our IT academy covering Amazon Web Services (AWS) platform. Learn practical IT skills training including cloud deployment, infrastructure management, and scalable application development. Gain hands-on experience with industry-leading cloud technologies to prepare for professional cloud engineering roles in Faisalabad and beyond. Practice with real-world cloud architectures, serverless computing, and DevOps automation. Prepare for AWS certification exams while building cloud solutions that scale globally. Master containerization with Docker and Kubernetes for modern application deployment and orchestration. Learn Infrastructure as Code (IaC) using Terraform and CloudFormation for automated cloud resource provisioning. Implement CI/CD pipelines with AWS CodePipeline and Jenkins for continuous deployment. Practice cost optimization strategies, security best practices, and compliance standards for enterprise cloud environments. Build portfolio projects including multi-tier web applications, microservices architectures, and disaster recovery solutions with hands-on lab experience.',
    duration: '3 months',
    level: 'Professional',
    category: 'Cloud Computing',
    enrolled: 743,
    rating: 4.8,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Cloud Computing & AWS Introduction - Cloud fundamentals, AWS global infrastructure, and management tools setup',
      'Week 2: AWS Compute Services - Amazon EC2, instance types, Auto Scaling, Elastic Load Balancing, and AWS Lambda',
      'Week 3: AWS Storage & Database Services - Amazon S3, EBS, Glacier, RDS, DynamoDB, and Aurora database management',
      'Week 4: AWS Networking & Security - VPC, subnets, security groups, IAM, KMS, encryption, and security best practices',
      'Week 5: Advanced AWS Services - CloudFormation, CodePipeline, API Gateway, Step Functions, and serverless architectures',
      'Week 6: AWS Cost Management - Pricing models, Cost Explorer, optimization strategies, and cost control implementation',
      'Week 7: Azure Introduction & Core Services - Microsoft Azure fundamentals, virtual machines, storage, and networking',
      'Week 8: Azure Resource Management - ARM templates, resource management, CLI, PowerShell, and Azure DevOps integration',
      'Week 9: Azure Databases & Security - SQL Database, Cosmos DB, Security Center, Key Vault, and compliance frameworks',
      'Week 10: Azure Monitoring & High Availability - Azure Monitor, Log Analytics, backup strategies, and disaster recovery',
      'Week 11: Multi-Cloud Strategy - Hybrid cloud scenarios, migration strategies, and cross-platform integration',
      'Week 12: Final Project & Certification - Comprehensive cloud solution design, implementation, review, and certification preparation'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic networking knowledge', 'Computer fundamentals']
  },
  {
    id: 'full-stack-development',
    name: 'Full Stack Development',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2F23fa67667173473381ab8f45dd5d46e2?format=webp&width=800',
    description: 'Complete web development training course covering frontend and backend technologies at our IT academy in Faisalabad. Learn modern frameworks, databases, and deployment strategies through practical IT skills training to build complete web applications with professional guidance. Master React, Node.js, MongoDB, and cloud deployment while working on real client projects. Develop responsive websites, e-commerce platforms, and progressive web applications. Graduate with a professional portfolio and industry-ready skills for immediate employment opportunities.',
    duration: '3 months',
    level: 'Professional',
    category: 'Web Development',
    enrolled: 312,
    rating: 4.9,
    fee: '15,000 PKR',
    originalPrice: '25,000 PKR',
    discount: '40% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction to Web Development - HTML structure, CSS basics, responsive design, and web development fundamentals',
      'Week 2: Advanced HTML & CSS - Semantic HTML, Flexbox, CSS Grid, animations, Bootstrap framework, and SASS preprocessing',
      'Week 3: JavaScript Basics - Syntax, variables, control structures, functions, DOM manipulation, and event handling',
      'Week 4: Advanced JavaScript Concepts - Asynchronous programming, promises, async/await, ES6+ features, and error handling',
      'Week 5: Version Control - Git fundamentals, GitHub workflow, branching, merging, and collaboration best practices',
      'Week 6: Frontend Frameworks - React.js overview, JSX, components, state management, hooks, and Context API',
      'Week 7: Backend Fundamentals - Node.js environment, Express.js server setup, RESTful APIs, and middleware functions',
      'Week 8: Databases - MongoDB fundamentals, CRUD operations, Mongoose ODM, schema design, and data relationships',
      'Week 9: Authentication - JSON Web Tokens (JWT), Passport.js, OAuth integration, security best practices, and session management',
      'Week 10: Deployment - Heroku deployment, Netlify for static sites, CI/CD pipelines, environment variables, and production optimization',
      'Week 11: Advanced Topics - GraphQL basics, WebSockets for real-time communication, serverless functions, and performance optimization',
      'Week 12: Career Development and DevOps - Docker containerization, project portfolio development, interview preparation, and industry best practices'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic programming knowledge', 'Computer fundamentals']
  },
  {
    id: 'cloud-computing-microsoft',
    name: 'Cloud Computing (Microsoft Azure)',
    type: 'Free',
    cover: getOptimizedCover('cloud-computing-microsoft', '/course/free/cloud computing microsoft.avif'),
    description: 'Specialized Microsoft Azure cloud platform training through our computer training program covering enterprise cloud solutions and Azure services. Learn practical IT skills training including Azure virtual machines, storage solutions, networking, and DevOps practices. Master cloud technologies with hands-on experience to become proficient in Microsoft cloud ecosystem and advance your career in cloud computing. Practice Azure Active Directory, database services, and container orchestration with Kubernetes. Build enterprise-grade solutions and prepare for Microsoft Azure certifications with comprehensive exam preparation and practical labs. Develop expertise in Azure Functions for serverless computing, Logic Apps for workflow automation, and Power Platform integration. Learn Azure security best practices including Key Vault, Security Center, and identity management for enterprise environments. Master Azure Monitor, Application Insights, and Log Analytics for comprehensive cloud monitoring and troubleshooting capabilities. Practice hybrid cloud scenarios connecting on-premises infrastructure with Azure using VPN gateways and ExpressRoute connections. Complete real-world projects including e-commerce platforms, data analytics solutions, and enterprise applications with full Azure integration and deployment.',
    duration: '3 months',
    level: 'Professional',
    category: 'Cloud Computing',
    enrolled: 567,
    rating: 4.6,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction to Cloud Computing and Azure - Cloud computing fundamentals, Azure overview, core services, and portal navigation',
      'Week 2: Azure Core Services - Virtual Machines, Azure Storage, Virtual Networks, and hands-on lab configurations',
      'Week 3: Resource Management with Azure - Azure Resource Manager, ARM templates, management via portal, CLI, and PowerShell',
      'Week 4: Azure Networking - Virtual Networks, Network Security Groups, Azure Load Balancer, and network architecture design',
      'Week 5: Azure Storage Solutions - Blob Storage, File Storage, Queue Storage, Table Storage, and Azure Storage Explorer',
      'Week 6: Azure Databases - Azure SQL Database, Cosmos DB, MySQL/PostgreSQL setup, configuration, and backup management',
      'Week 7: Azure Compute Services - App Services, Azure Functions, Azure Kubernetes Service (AKS), and application deployment',
      'Week 8: Azure Security and Compliance - Security Center, Azure Sentinel, Key Vault, and security best practices implementation',
      'Week 9: Azure DevOps - Azure Repos, Pipelines, Boards, CI/CD pipeline creation, and development workflow management',
      'Week 10: Azure Monitoring and Management - Azure Monitor, Log Analytics, Application Insights, alerts, and performance optimization',
      'Week 11: High Availability and Disaster Recovery - Azure Backup, Site Recovery, redundancy strategies, and recovery practices',
      'Week 12: Final Project and Review - Comprehensive Azure solution design, implementation, presentation, and certification preparation'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic computer knowledge', 'Windows familiarity']
  },
  {
    id: 'digital-marketing-paid',
    name: 'Digital Marketing',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2F6930fb58411a4f5b940a71f92b7010e4?format=webp&width=800',
    description: 'Master digital marketing training strategies including SEO, social media marketing, Google Ads, content marketing, and analytics through our professional IT courses. Learn to create effective campaigns that drive results with practical IT skills training and real-world projects. Develop expertise in Facebook advertising, Instagram marketing, email automation, and conversion optimization techniques. Work on live campaigns, analyze real data, and create comprehensive marketing strategies for local and international businesses.',
    duration: '3 months',
    level: 'Professional',
    category: 'Marketing',
    enrolled: 189,
    rating: 4.7,
    fee: '10,000 PKR',
    originalPrice: '18,000 PKR',
    discount: '44% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Digital Marketing Fundamentals - Marketing evolution, digital ecosystem, customer journey mapping, and strategic planning',
      'Week 2: Search Engine Optimization (SEO) - Keyword research, on-page optimization, technical SEO, link building, and ranking strategies',
      'Week 3: Google Ads & Pay-Per-Click (PPC) - Campaign setup, keyword bidding, ad copywriting, landing page optimization, and ROI analysis',
      'Week 4: Social Media Marketing - Platform strategies, content creation, community management, influencer marketing, and engagement tactics',
      'Week 5: Facebook & Instagram Advertising - Ad manager setup, audience targeting, creative optimization, budget management, and performance tracking',
      'Week 6: Content Marketing & Strategy - Content planning, blog writing, video marketing, storytelling, and content distribution channels',
      'Week 7: Email Marketing & Automation - Email campaign creation, segmentation, automation workflows, newsletter design, and deliverability optimization',
      'Week 8: Google Analytics & Data Analysis - Analytics setup, conversion tracking, audience insights, behavior analysis, and data-driven decisions',
      'Week 9: E-commerce & Conversion Optimization - Online store marketing, product promotion, cart abandonment, A/B testing, and conversion funnel optimization',
      'Week 10: Marketing Automation & CRM - Lead nurturing, customer segmentation, marketing funnels, CRM integration, and lifecycle marketing',
      'Week 11: Brand Building & Online Reputation - Brand strategy, online reputation management, crisis communication, and brand positioning',
      'Week 12: Campaign Management & Client Projects - Campaign planning, budget allocation, performance optimization, client reporting, and career development'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic internet knowledge', 'Social media familiarity']
  },
  {
    id: 'digital-forensics-cyber-security',
    name: 'Digital Forensics Cyber Security',
    type: 'Free',
    cover: getOptimizedCover('digital-forensics-cyber-security', '/course/free/digital forensic cyber security.avif'),
    description: 'Comprehensive digital forensics and cybersecurity investigation training at our IT academy covering evidence collection, digital crime analysis, and incident response techniques. Learn practical IT skills training with industry-standard forensic tools, malware analysis, and cybercrime investigation methodologies. Gain hands-on experience in digital evidence handling, legal procedures, and professional reporting for cybersecurity careers. Master mobile device forensics, network traffic analysis, and advanced file recovery techniques. Practice with real case studies and court-admissible evidence documentation standards. Learn advanced memory forensics, registry analysis, and timeline reconstruction for comprehensive digital investigation processes. Master cloud forensics techniques for investigating incidents in AWS, Azure, and Google Cloud environments. Practice with professional tools like EnCase, FTK, Volatility, and open-source alternatives for complete forensic capabilities. Develop expertise in cryptocurrency investigations, dark web analysis, and social media intelligence gathering techniques. Complete certification preparation for GCIH, GCFA, and other industry-recognized digital forensics credentials with guaranteed exam readiness.',
    duration: '3 months',
    level: 'Professional',
    category: 'Cybersecurity',
    enrolled: 892,
    rating: 4.8,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Digital Forensics Fundamentals - Forensic principles, investigation process, digital evidence types, and legal considerations',
      'Week 2: Evidence Collection & Preservation - Data acquisition techniques, chain of custody, forensic imaging, and evidence integrity',
      'Week 3: File System Analysis - NTFS, FAT, ext4 analysis, deleted file recovery, timeline analysis, and metadata examination',
      'Week 4: Network Forensics - Network traffic analysis, packet capture, intrusion detection, and network-based evidence collection',
      'Week 5: Mobile Device Forensics - iOS and Android forensics, data acquisition methods, mobile evidence analysis, and app data recovery',
      'Week 6: Memory Forensics - RAM analysis, volatile data extraction, process analysis, and advanced memory investigation techniques',
      'Week 7: Malware Analysis - Static and dynamic analysis, reverse engineering basics, malware behavior analysis, and threat identification',
      'Week 8: Cloud Forensics - Cloud evidence acquisition, SaaS/PaaS/IaaS forensics, cloud storage analysis, and virtual machine forensics',
      'Week 9: Advanced Investigation Techniques - Registry analysis, browser forensics, email investigation, and encrypted data handling',
      'Week 10: Digital Evidence Analysis - Data correlation, timeline reconstruction, pattern recognition, and evidence interpretation',
      'Week 11: Legal & Reporting - Court procedures, expert testimony, forensic reporting standards, and case documentation',
      'Week 12: Capstone Investigation - Complete forensic case study, evidence analysis, report writing, and presentation skills'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic cybersecurity knowledge', 'Computer fundamentals']
  },
  {
    id: 'cyber-security-ceh-chfi',
    name: 'Cyber Security (CEH, CHFI)',
    type: 'Free',
    cover: getOptimizedCover('cyber-security', '/course/paid/cyber-security.avif'),
    description: 'Professional certification preparation for Certified Ethical Hacker (CEH) and Computer Hacking Forensic Investigator (CHFI) through our specialized IT training program. Learn ethical hacking methodologies, penetration testing, vulnerability assessment, and cybersecurity investigation techniques. Master practical IT skills training with hands-on labs, real-world scenarios, and comprehensive exam preparation to advance your cybersecurity career. Practice with advanced exploitation techniques, wireless security testing, and social engineering assessments. Gain access to professional-grade security tools and prepare for international certification exams with guaranteed pass rates. Master web application security testing using OWASP Top 10 vulnerabilities and advanced SQL injection techniques. Learn red team operations, persistence mechanisms, and advanced persistent threat (APT) simulation for enterprise security testing. Practice with Metasploit, Burp Suite, Nmap, Wireshark, and other industry-standard penetration testing frameworks and tools. Develop skills in mobile application security testing, IoT device security assessment, and cloud security penetration testing methodologies. Complete hands-on projects including full network penetration tests, vulnerability assessments, and forensic investigations with professional reporting standards.',
    duration: '3 months',
    level: 'Advanced',
    category: 'Cybersecurity',
    enrolled: 654,
    rating: 4.9,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction to Cyber Security - Fundamentals, threats, vulnerabilities, terminology, and security policies',
      'Week 2: Ethical Hacking Basics (CEH) - Overview, reconnaissance techniques, network scanning, and enumeration',
      'Week 3: System Hacking (CEH) - System hacking methodologies, password cracking, malware threats, and network sniffing',
      'Week 4: Web Application Security (CEH) - Common vulnerabilities, SQL injection, cross-site scripting, and session hijacking',
      'Week 5: Wireless Network Security (CEH) - Wireless network concepts, encryption protocols, attacks, and security best practices',
      'Week 6: Cryptography - Principles, symmetric and asymmetric encryption, hashing, and digital signatures',
      'Week 7: Introduction to Computer Hacking Forensics (CHFI) - Principles, digital evidence, incident response, and forensic tools',
      'Week 8: Forensic Investigation Process (CHFI) - Investigation steps, data acquisition, analysis methods, and reporting',
      'Week 9: Network Forensics (CHFI) - Network traffic analysis, intrusion detection, and malware analysis',
      'Week 10: Mobile Forensics (CHFI) - Mobile device data acquisition, analysis, and forensic tools',
      'Week 11: Cloud Forensics (CHFI) - Cloud computing fundamentals, data acquisition, and analysis in cloud environments',
      'Week 12: Final Project and Review - Project planning, development, finalization, and presentation'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Networking knowledge', 'Basic cybersecurity understanding']
  },
  {
    id: 'javascript-full-stack',
    name: 'JavaScript Full Stack (MERN / MEAN)',
    type: 'Free',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2F23fa67667173473381ab8f45dd5d46e2?format=webp&width=800',
    description: 'Comprehensive JavaScript full-stack development course through our computer training institute covering MERN/MEAN stack technologies. Learn coding in Faisalabad with modern frameworks, databases, and deployment strategies to build complete web applications with hands-on practice. Master MongoDB, Express.js, React.js, Node.js, and Angular frameworks with real-time project development. Build scalable applications, implement authentication systems, and deploy to cloud platforms. Complete multiple portfolio projects including e-commerce sites, social media applications, and API development. Learn advanced React concepts including Redux, Context API, custom hooks, and performance optimization techniques for enterprise applications. Master GraphQL, WebSocket implementation, and microservices architecture for modern scalable web application development. Practice with TypeScript, Jest testing framework, and CI/CD pipelines for professional development workflows and code quality. Develop expertise in Progressive Web Apps (PWA), server-side rendering with Next.js, and mobile app development using React Native. Build complete production-ready applications including real-time chat systems, payment integration, and advanced user authentication with JWT and OAuth.',
    duration: '3 months',
    level: 'Professional',
    category: 'Web Development',
    enrolled: 987,
    rating: 4.8,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: JavaScript Basics - Control structures, functions, DOM manipulation, and fundamental programming concepts',
      'Week 2: Advanced JavaScript - Event handling, asynchronous programming, ES6+ features, and modern JavaScript patterns',
      'Week 3: Node.js Introduction - Modules, file system, HTTP module, server-side JavaScript fundamentals',
      'Week 4: Express.js Framework - Routing, middleware, templating engines, and building RESTful APIs',
      'Week 5: MongoDB Database - Database integration, CRUD operations, Mongoose.js ODM, and data modeling',
      'Week 6: React.js Frontend - Components, state management, hooks, JSX, and modern React development',
      'Week 7: State Management - Redux implementation, actions, reducers, middleware, and advanced state patterns',
      'Week 8: Authentication & Security - JWT implementation, OAuth integration, security best practices',
      'Week 9: Advanced Node.js & Express.js - Performance optimization, testing, debugging, and advanced backend concepts',
      'Week 10: Full-Stack Project Development - Planning, development, integration, testing, and project management',
      'Week 11: Deployment & DevOps - Deployment strategies, cloud services, monitoring, and production best practices',
      'Week 12: Final Project and Review - Portfolio development, code review, optimization, and career preparation'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic JavaScript knowledge', 'HTML/CSS familiarity']
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    type: 'Free',
    cover: getOptimizedCover('mobile-app-development', '/course/free/react native.avif'),
    description: 'Master mobile application development through our comprehensive computer training program using React Native and cross-platform technologies. Learn practical IT skills training including native mobile app development for iOS and Android platforms, state management, API integration, and app store deployment. Build real-world mobile applications with hands-on coding experience to prepare for professional mobile development careers. Develop native features integration, push notifications, offline storage, and performance optimization techniques. Create professional mobile apps for businesses and publish to Google Play Store and Apple App Store with complete deployment guidance. Learn advanced mobile development concepts including camera integration, GPS location services, biometric authentication, and device sensors utilization. Master Firebase integration for real-time databases, cloud messaging, analytics, and crash reporting for comprehensive mobile app backends. Practice with native module development, app performance monitoring, and memory optimization for smooth user experience across devices. Develop expertise in mobile app monetization strategies, in-app purchases, advertising integration, and user analytics implementation. Complete portfolio projects including social media apps, e-commerce mobile platforms, fitness tracking applications, and business productivity tools with full deployment experience.',
    duration: '3 months',
    level: 'Professional',
    category: 'Mobile Development',
    enrolled: 756,
    rating: 4.6,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Mobile Development Fundamentals - Mobile platforms overview, development environment setup, iOS vs Android differences, and cross-platform benefits',
      'Week 2: React Native Basics - Components, JSX for mobile, styling with StyleSheet, Flexbox layouts, and basic UI development',
      'Week 3: Navigation & Routing - React Navigation, stack navigation, tab navigation, drawer navigation, and navigation patterns',
      'Week 4: State Management - Local state, Context API, Redux integration, async state handling, and state persistence',
      'Week 5: Device Features & APIs - Camera access, geolocation, contacts, file system, biometric authentication, and device sensors',
      'Week 6: Network & API Integration - REST API consumption, HTTP requests, data fetching, error handling, and offline storage',
      'Week 7: Native Modules & Third-party Libraries - Native bridge, popular libraries, platform-specific code, and custom native modules',
      'Week 8: User Interface & Experience - Advanced styling, animations, gesture handling, responsive design, and accessibility features',
      'Week 9: Data Persistence & Backend - AsyncStorage, SQLite integration, Firebase setup, real-time databases, and cloud functions',
      'Week 10: Performance Optimization - Bundle optimization, memory management, rendering performance, profiling tools, and best practices',
      'Week 11: Testing & Debugging - Unit testing, integration testing, debugging tools, performance monitoring, and crash analytics',
      'Week 12: App Store Deployment - Build optimization, code signing, app store guidelines, publishing process, and maintenance strategies'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['JavaScript knowledge', 'React basics']
  },
  {
    id: 'google-ui-ux-design',
    name: 'Google UI/UX Design',
    type: 'Free',
    cover: getOptimizedCover('google-ui-ux-design', '/course/free/ui design.avif'),
    description: 'Google UI/UX Design certificate program through our IT academy focusing on user interface design, user experience principles, and creating engaging digital products. Learn practical IT skills training including design thinking, wireframing, prototyping, usability testing, and design tools mastery. Gain hands-on experience with real-world design projects and Google-certified curriculum to launch your career in UI/UX design. Master Figma, Adobe XD, Sketch, and industry-standard design workflows while creating mobile and web interfaces. Work on client projects, conduct user research, and build a professional design portfolio that showcases your expertise to potential employers. Learn advanced prototyping techniques, micro-interactions design, and animation principles for modern user interface development. Master accessibility standards (WCAG), inclusive design principles, and cross-platform design consistency for diverse user populations. Practice with design systems creation, component libraries, and brand guidelines development for enterprise-level design projects. Develop expertise in user journey mapping, conversion rate optimization, and A/B testing methodologies for data-driven design decisions. Complete real-world projects including mobile app redesigns, e-commerce website optimization, dashboard design, and comprehensive brand identity systems with professional presentation skills.',
    duration: '3 months',
    level: 'Professional',
    category: 'UI Design',
    enrolled: 1234,
    rating: 4.5,
    ageLimit: '20-40 years',
    educationRequirement: '14/16 years',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Introduction - UX design principles, user research, creating personas, user stories, and competitive analysis',
      'Week 2: Basics of Wireframing - Information architecture, wireframing techniques, prototyping basics, and interactive prototyping',
      'Week 3: Principles of UX Design - User interface design, visual hierarchy, typography, color theory, and design systems',
      'Week 4: Interaction Design - Microinteractions, mobile UX design, responsive design, and accessibility principles',
      'Week 5: Prototyping Techniques - Advanced prototyping, cross-platform design, usability testing, and iterative design process',
      'Week 6: Analytics - UX metrics, project management, team collaboration, Agile UX, and presenting UX work',
      'Week 7: Content Strategy - UX writing, content strategy, design patterns, service design, and ethics in UX design',
      'Week 8: Global UX Design - Universal design, localization, psychology in UX, storytelling, and future trends',
      'Week 9: Portfolio Development - Building UX portfolio, career paths, networking, interview preparation, and mock interviews',
      'Week 10: Advanced UI Design - Advanced interface principles, accessibility, A/B testing, heuristic evaluation, and user feedback',
      'Week 11: Case Studies - Real-world case studies, data-driven design, emerging technologies, transcultural design, and sustainable UX',
      'Week 12: Final Project - Project planning, development, review, presentation, and course wrap-up with next steps'
    ],
    syllabusSource: 'TechHub',
    prerequisites: ['Basic computer skills', 'Creative mindset']
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2F801f625bf778450087642f6863285bba?format=webp&width=800',
    description: 'Learn professional graphic design using Adobe Creative Suite through our comprehensive creative training program. Master typography, color theory, logo design, and brand identity creation for both print and digital media. Develop expertise in Photoshop, Illustrator, and InDesign while working on real client projects and building a professional portfolio. Learn advanced design techniques, packaging design, social media graphics, and marketing materials creation. Graduate with industry-standard skills and creative confidence to work as a professional graphic designer or start your own design business.',
    duration: '3 months',
    level: 'Professional',
    category: 'Design',
    enrolled: 298,
    rating: 4.6,
    fee: '10,000 PKR',
    originalPrice: '16,000 PKR',
    discount: '38% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Design Fundamentals - Design principles, visual hierarchy, composition rules, grid systems, and design theory foundations',
      'Week 2: Adobe Photoshop Basics - Interface navigation, layers, selections, basic tools, photo editing, and image manipulation',
      'Week 3: Advanced Photoshop Techniques - Advanced retouching, composite images, special effects, filters, and professional workflows',
      'Week 4: Adobe Illustrator Foundations - Vector graphics, pen tool mastery, shapes, pathfinder, and logo creation techniques',
      'Week 5: Typography & Layout Design - Font selection, typography hierarchy, text layouts, readability principles, and typographic systems',
      'Week 6: Color Theory & Application - Color wheel, color harmony, psychology of colors, brand colors, and color management',
      'Week 7: Logo & Brand Identity Design - Logo design process, brand guidelines, identity systems, and brand application across media',
      'Week 8: Print Design Projects - Business cards, brochures, flyers, posters, packaging design, and print preparation techniques',
      'Week 9: Digital Design & Social Media - Web graphics, social media templates, banner design, UI elements, and digital optimization',
      'Week 10: Adobe InDesign & Publication - Layout design, magazine layouts, book design, multi-page documents, and publishing workflows',
      'Week 11: Client Projects & Real-world Applications - Brief interpretation, client communication, revisions, and professional presentation',
      'Week 12: Portfolio Development & Career Preparation - Portfolio curation, online presence, freelancing basics, and industry career paths'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic computer skills', 'Creative interest']
  },
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2F70f57bfcb22e44f788ba692c1f5c8788?format=webp&width=800',
    description: 'Master e-commerce with Shopify platform through our specialized online business training program. Learn to create, customize, and manage online stores, optimize for conversions, and implement effective marketing strategies. Develop skills in product management, inventory control, payment gateway integration, and customer service automation. Master Shopify themes, apps, and liquid coding for advanced customization. Build complete e-commerce solutions, implement SEO strategies, and learn dropshipping and print-on-demand business models for sustainable online income.',
    duration: '3 months',
    level: 'Professional',
    category: 'E-commerce',
    enrolled: 156,
    rating: 4.5,
    fee: '10,000 PKR',
    originalPrice: '18,182 PKR',
    discount: '45% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: E-commerce & Shopify Fundamentals - E-commerce basics, Shopify platform overview, account setup, and dashboard navigation',
      'Week 2: Store Setup & Configuration - Domain setup, store settings, legal pages, tax configuration, and basic store customization',
      'Week 3: Product Management - Product creation, variants, inventory management, collections, product SEO, and bulk operations',
      'Week 4: Theme Selection & Customization - Theme marketplace, theme customization, brand colors, typography, and visual identity',
      'Week 5: Payment & Shipping Configuration - Payment gateways, shipping zones, rates calculation, taxes, and international commerce',
      'Week 6: Shopify Apps & Extensions - App store navigation, essential apps installation, inventory management, and customer service tools',
      'Week 7: Marketing & Customer Acquisition - Email marketing, social media integration, discount codes, customer segmentation, and retention strategies',
      'Week 8: SEO & Content Marketing - On-page SEO, product optimization, blog creation, content strategy, and organic traffic generation',
      'Week 9: Analytics & Performance Tracking - Shopify Analytics, Google Analytics integration, conversion tracking, and performance metrics analysis',
      'Week 10: Advanced Shopify Features - Liquid templating basics, custom coding, advanced product features, and automation setup',
      'Week 11: Business Models & Scaling - Dropshipping, print-on-demand, subscription models, wholesale, and business scaling strategies',
      'Week 12: Launch & Growth Strategy - Pre-launch checklist, store launch, marketing campaigns, customer acquisition, and long-term growth planning'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic computer skills', 'Internet browsing knowledge']
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F51d66a66ad9240b2b5cdd3f9dc507977%2Ff211571ade40438e807ada0ec87113ed?format=webp&width=800',
    description: 'Professional video editing using industry-standard software through our comprehensive media production training program. Learn storytelling, color correction, audio editing, and motion graphics to create compelling video content. Master Adobe Premiere Pro, After Effects, DaVinci Resolve, and professional video workflows from pre-production to final delivery. Develop skills in cinematography, sound design, visual effects, and YouTube content creation. Work on commercial projects, music videos, and documentary editing while building a professional showreel for freelance or studio work.',
    duration: '3 months',
    level: 'Professional',
    category: 'Media Production',
    enrolled: 203,
    rating: 4.7,
    fee: '10,000 PKR',
    originalPrice: '18,182 PKR',
    discount: '45% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Video Production Fundamentals - Video theory, frame rates, resolutions, codecs, storytelling principles, and pre-production planning',
      'Week 2: Adobe Premiere Pro Basics - Interface navigation, project setup, importing media, timeline editing, and basic cutting techniques',
      'Week 3: Advanced Premiere Pro Editing - Multi-camera editing, advanced transitions, speed effects, keyframe animation, and workflow optimization',
      'Week 4: Audio Engineering & Sound Design - Audio editing, noise reduction, music layering, sound effects, voiceover recording, and audio mixing',
      'Week 5: Color Correction & Grading - Color theory, Lumetri Color panel, color correction workflow, creative grading, and cinematic looks',
      'Week 6: Adobe After Effects Introduction - Motion graphics basics, keyframe animation, effects, text animation, and compositions',
      'Week 7: Advanced After Effects - Visual effects, green screen compositing, particle systems, 3D layers, and advanced animation techniques',
      'Week 8: Motion Graphics & Titles - Title design, lower thirds, animated logos, kinetic typography, and brand-consistent graphics',
      'Week 9: DaVinci Resolve & Alternative Tools - DaVinci Resolve workflow, advanced color grading, Fusion compositing, and multi-platform editing',
      'Week 10: Content Creation & YouTube Optimization - YouTube content strategy, thumbnail design, video SEO, audience engagement, and monetization',
      'Week 11: Export & Delivery - Output formats, compression settings, delivery specifications, streaming optimization, and client requirements',
      'Week 12: Portfolio & Career Development - Showreel creation, client communication, project management, freelancing, and industry networking'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic computer skills', 'Creative interest']
  },
  {
    id: 'office-management',
    name: 'Office Management',
    type: 'Paid',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F0fd10464f59c45299f5ac5110b5f3761%2F9c74ab9b41f54b2481b48bd155e10357?format=webp&width=800',
    description: 'Master Microsoft Office Suite including Excel, Word, PowerPoint, and Outlook through our comprehensive office productivity training program. Learn advanced features, data analysis, document management, and professional presentation skills. Develop expertise in Excel formulas, pivot tables, macros, and data visualization for business analytics. Create professional documents, automated workflows, and effective presentations for corporate environments. Master Office 365 cloud integration, Teams collaboration, and SharePoint document management for modern workplace efficiency and career advancement.',
    alt: 'Office Management course cover image',
    duration: '3 months',
    level: 'Professional',
    category: 'Administration',
    enrolled: 134,
    rating: 4.4,
    fee: '10,000 PKR',
    originalPrice: '25,000 PKR',
    discount: '60% OFF',
    internship: '2-month internship included',
    educationRequirement: 'Matric',
    sessions: 'Morning & Evening Sessions Available',
    syllabus: [
      'Week 1: Microsoft Word Mastery - Document formatting, styles, templates, mail merge, collaboration features, and advanced document creation',
      'Week 2: Excel Fundamentals & Formulas - Basic functions, advanced formulas, VLOOKUP, HLOOKUP, conditional formatting, and data validation',
      'Week 3: Advanced Excel & Data Analysis - Pivot tables, charts, data analysis tools, macros basics, and business intelligence features',
      'Week 4: PowerPoint Presentation Excellence - Slide design, animations, transitions, master slides, templates, and effective storytelling',
      'Week 5: Outlook Email & Calendar Management - Email organization, calendar scheduling, task management, contact management, and automation',
      'Week 6: Microsoft Teams & Collaboration - Teams setup, video conferencing, file sharing, channel management, and remote collaboration',
      'Week 7: OneNote & Information Management - Digital note-taking, organization systems, research management, and cross-platform synchronization',
      'Week 8: Office 365 Cloud Integration - OneDrive setup, real-time collaboration, version control, sharing permissions, and cloud workflows',
      'Week 9: SharePoint & Document Management - SharePoint basics, document libraries, workflow automation, and team site management',
      'Week 10: Advanced Office Integration - Cross-application workflows, data integration, automation between apps, and efficiency optimization',
      'Week 11: Business Communication & Professional Skills - Business writing, email etiquette, meeting management, and professional presentation skills',
      'Week 12: Office Administration & Career Skills - Project management, time management, administrative workflows, and career development in office environments'
    ],
    syllabusSource: 'Custom-generated',
    prerequisites: ['Basic computer literacy', 'Communication skills']
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByType = (type: 'Free' | 'Paid'): Course[] => {
  return courses.filter(course => course.type === type);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};
