import React from 'react';
import Marquee from 'react-fast-marquee';
import { smartTruncate, optimizeReviewText } from '@/utils/textOptimization';

interface Review {
  id: number;
  name: string;
  course: string;
  rating: number;
  text: string;
  avatar: string;
  location: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Sara Khan",
    course: "Full Stack Development",
    rating: 5,
    text: "This premier software house training in Faisalabad program at the best IT training institute completely transformed my career! The comprehensive MERN stack training with hands-on projects and expert mentorship helped me secure a senior developer position. The job-oriented curriculum at this leading computer training institute in Faisalabad is incredibly practical and industry-aligned.",
    avatar: "SK",
    location: "Jaranwala Road, Faisalabad"
  },
  {
    id: 2,
    name: "Muhammad Hammad",
    course: "Mern Stack Developer",
    rating: 5,
    text: "Excellent MERN stack training with real projects and interview prep. I built multiple full‑stack apps and landed a developer role in Faisalabad soon after graduating.",
    avatar: "MH",
    location: "Civil Lines, Faisalabad"
  },
  {
    id: 3,
    name: "Ayesha Siddiqui",
    course: "Google UI/UX Design",
    rating: 5,
    text: "Best investment in my education at this leading UI/UX design institute in Faisalabad! The comprehensive Google-certified design principles and Figma training from this premier IT training institute are being applied daily in my role at a top tech company. The professional portfolio projects were absolute game-changers for my career.",
    avatar: "AS",
    location: "Samanabad, Faisalabad"
  },
  {
    id: 4,
    name: "Waseem Ali",
    course: "Python",
    rating: 5,
    text: "Great Python journey—from fundamentals to Django and data analysis—with practical labs and clear mentorship. I now build automation scripts and web apps confidently.",
    avatar: "WA",
    location: "People's Colony, Faisalabad"
  },
  {
    id: 5,
    name: "Maryam Noor",
    course: "Cloud Computing (AWS)",
    rating: 5,
    text: "Incredible depth of cloud computing knowledge and hands-on AWS training at this premier IT certification institute in Faisalabad! The comprehensive cloud computing modules and professional certification preparation at this leading computer training institute perfectly equipped me for my current role. My salary increased by 70% after completing this job-oriented IT course!",
    avatar: "MN",
    location: "Satyana Road, Faisalabad"
  },
  {
    id: 6,
    name: "Ali Hassan",
    course: "Full stack Developer",
    rating: 5,
    text: "Comprehensive full‑stack program with React, Node.js, and databases. The hands‑on projects and career guidance helped me transition into a full‑time developer role.",
    avatar: "AH",
    location: "Madina Town, Faisalabad"
  },
  {
    id: 7,
    name: "Zain Malik",
    course: "Cyber Security",
    rating: 5,
    text: "Comprehensive cyber security training with real-world scenarios at the top IT security institute in Faisalabad! The advanced ethical hacking modules, penetration testing labs, and CISSP certification preparation at this leading computer training institute were incredibly engaging and practical. Now proudly protecting enterprise systems daily thanks to this exceptional IT training!",
    avatar: "ZM",
    location: "Susan Road, Faisalabad"
  },
  {
    id: 8,
    name: "Ali Raza",
    course: "SEO",
    rating: 5,
    text: "Practical SEO training covering on‑page, technical SEO, and analytics. I improved local rankings for multiple clients and grew monthly traffic significantly.",
    avatar: "AR",
    location: "Kotwali Road, Faisalabad"
  },
  {
    id: 9,
    name: "Sana Iqbal",
    course: "Digital Forensics Cyber Security",
    rating: 5,
    text: "Mind-blowing course that took me from security novice to expert. The forensics techniques and cyber investigation modules were challenging but incredibly rewarding. Now leading security initiatives at my company.",
    avatar: "SI",
    location: "Sargodha Road, Faisalabad"
  },
  {
    id: 10,
    name: "Muhammad Umair",
    course: "Graphic Designer",
    rating: 5,
    text: "Outstanding graphic design curriculum with real client-style projects in Photoshop, Illustrator, and branding. I built a strong portfolio and started freelancing successfully.",
    avatar: "MU",
    location: "Ghulam Muhammad Abad, Faisalabad"
  },
  {
    id: 11,
    name: "Muhammad Shayan",
    course: "Web Developer",
    rating: 5,
    text: "Solid web development foundations with HTML, CSS, JavaScript and React. The project-based approach made concepts click, and I quickly secured freelance work.",
    avatar: "MS",
    location: "Millat Town, Faisalabad"
  },
  {
    id: 12,
    name: "Usman Sheikh",
    course: "Office Management",
    rating: 5,
    text: "Excellent curriculum covering Excel, Word, PowerPoint and advanced office skills. The instructors are industry experts who provide practical insights. Got hired immediately after graduation with a 60% salary increase!",
    avatar: "US",
    location: "Canal Road, Faisalabad"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = React.memo(({ review }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-[#032F65]/10 hover:shadow-xl hover:shadow-[#032F65]/10 transition-all duration-300 min-w-[340px] max-w-[380px] flex-shrink-0 mx-3 will-change-transform hover:border-[#032F65]/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[#032F65] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {review.avatar}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
          <p className="text-xs text-gray-500">{review.location}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <div className="mb-3">
        <span className="inline-block bg-[#032F65]/10 text-[#032F65] text-xs font-medium px-3 py-1 rounded-full border border-[#032F65]/20">
          {review.course}
        </span>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
        "{smartTruncate(optimizeReviewText(review.text, review.location, review.course), {
          maxLength: 240,
          preserveKeywords: ['Faisalabad', 'IT training', 'computer training', 'institute', 'course'],
          priorityKeywords: ['Faisalabad', review.course.toLowerCase().split(' ')[0]]
        })}"
      </p>
    </div>
  );
});

const StudentReviews: React.FC = () => {
  // Split reviews into two groups for the two rows
  const firstRowReviews = reviewsData.slice(0, 6);
  const secondRowReviews = reviewsData.slice(6, 12);

  return (
    <section className="bg-white py-20 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-[#B22429] bg-clip-text text-transparent">Best IT Training Institute in Faisalabad</span>
            <br />
            <span className="bg-[#032F65] bg-clip-text text-transparent">Student Success Stories 2025</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful graduates who transformed their careers with job-oriented IT courses, diploma in computer science in Faisalabad, and professional certification programs at the leading computer training institute in Faisalabad. Discover authentic reviews from our world-class education and industry mentorship programs.
          </p>
        </div>

        {/* Desktop: Two rows of infinite scrolling */}
        <div className="hidden lg:block">
          {/* First row - Right to Left */}
          <div className="mb-8 pb-4">
            <Marquee
              speed={80}
              pauseOnHover={true}
              gradient={false}
              direction="right"
            >
              {firstRowReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Marquee>
          </div>

          {/* Second row - Left to Right */}
          <div className="pb-4">
            <Marquee
              speed={85}
              pauseOnHover={true}
              gradient={false}
              direction="left"
            >
              {secondRowReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked with infinite scroll */}
        <div className="lg:hidden">
          {/* First row for mobile - Right to Left */}
          <div className="mb-8 pb-4">
            <Marquee
              speed={60}
              pauseOnHover={true}
              gradient={false}
              direction="right"
            >
              {firstRowReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Marquee>
          </div>

          {/* Second row for mobile - Left to Right */}
          <div className="pb-4">
            <Marquee
              speed={65}
              pauseOnHover={true}
              gradient={false}
              direction="left"
            >
              {secondRowReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentReviews;
