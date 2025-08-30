import React from 'react';
import { Star, Quote, ThumbsUp, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { optimizeReviewText, smartTruncate } from '@/utils/textOptimization';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ahmad Ali',
      course: 'Full Stack Development',
      rating: 5,
      review: 'This leading computer training institute in Faisalabad completely transformed my career with hands-on IT skills training. The expert instructors and practical programming courses in Faisalabad provided an exceptional learning experience. I secured a software developer position at Systems Ltd within 2 months of completing my diploma in IT in Faisalabad.',
      position: 'Software Developer at Systems Ltd',
      batch: 'Batch 2023',
      location: 'Jaranwala Road, Faisalabad'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      course: 'Digital Marketing',
      rating: 5,
      review: 'The best professional IT courses in Faisalabad exceeded all expectations! The comprehensive digital marketing course with SEO training and Google Ads certification kept me ahead of industry trends. After completing this job-oriented course at the top IT training institute in Faisalabad, I successfully launched Digital Boost Agency.',
      position: 'Founder, Digital Boost Agency',
      batch: 'Batch 2023',
      location: 'Civil Lines, Faisalabad'
    },
    {
      id: 3,
      name: 'Muhammad Hassan',
      course: 'Cyber Security',
      rating: 5,
      review: 'Outstanding cyber security training program at this premier IT academy in Faisalabad! The hands-on ethical hacking labs and real-world penetration testing scenarios thoroughly prepared me for the cybersecurity industry. The exceptional job placement support from this computer training institute in Faisalabad helped me secure multiple offers.',
      position: 'Cybersecurity Analyst at Bank Al Habib',
      batch: 'Batch 2024',
      location: 'Samanabad, Faisalabad'
    },
    {
      id: 4,
      name: 'Aisha Malik',
      course: 'Graphic Designing',
      rating: 5,
      review: 'The comprehensive graphic designing course at this top-rated IT training institute in Faisalabad combines creative skills with technical expertise. Industry-expert instructors provided real-world insights and hands-on Adobe training. The professional portfolio I developed during this creative IT course in Faisalabad immediately attracted high-paying freelance clients.',
      position: 'Freelance Graphic Designer',
      batch: 'Batch 2023',
      location: 'People\'s Colony, Faisalabad'
    },
    {
      id: 5,
      name: 'Bilal Ahmad',
      course: 'Advance Python',
      rating: 5,
      review: 'Excellent Python programming course at the best coding institute in Faisalabad! The advanced programming concepts, Django framework training, and real-world machine learning projects were both challenging and rewarding. The dedicated faculty support throughout this professional IT training in Faisalabad journey was remarkable.',
      position: 'Python Developer at TechSoft',
      batch: 'Batch 2024',
      location: 'Satyana Road, Faisalabad'
    },
    {
      id: 6,
      name: 'Zara Sheikh',
      course: 'Mobile App Development',
      rating: 5,
      review: 'Best mobile app development course available at any IT training institute in Faisalabad! The comprehensive Flutter and React Native training with project-based learning approach and expert industry mentorship made all the difference. I highly recommend this leading software training institute in Faisalabad to aspiring developers.',
      position: 'Mobile App Developer at Zameen.com',
      batch: 'Batch 2024',
      location: 'Madina Town, Faisalabad'
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Job Placement Rate',
      color: 'text-green-600'
    },
    {
      icon: ThumbsUp,
      value: '4.9/5',
      label: 'Student Satisfaction',
      color: 'text-blue-600'
    },
    {
      icon: Star,
      value: '100%',
      label: 'Course Completion',
      color: 'text-yellow-600'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getCourseColor = (course: string) => {
    const colorMap: { [key: string]: string } = {
      'Full Stack Development': 'bg-blue-100 text-blue-800',
      'Digital Marketing': 'bg-orange-100 text-orange-800',
      'Cyber Security': 'bg-red-100 text-red-800',
      'Graphic Designing': 'bg-purple-100 text-purple-800',
      'Advance Python': 'bg-green-100 text-green-800',
      'Mobile App Development': 'bg-indigo-100 text-indigo-800'
    };
    return colorMap[course] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="pt-2 pb-20 bg-background">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Student Success Stories - Best IT Training Institute in Faisalabad 2025
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover authentic reviews from our successful graduates who transformed their careers with job-oriented IT courses at the leading computer training institute in Faisalabad.
            These verified testimonials demonstrate the exceptional quality of our diploma in IT in Faisalabad and professional certification programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover-lift hover:shadow-primary/10 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <stat.icon className={`mx-auto ${stat.color} mb-4`} size={40} />
              <div className="font-display text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <Card key={review.id} className="group hover-lift hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <Quote className="text-primary/20 mb-4" size={32} />
                
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                  <span className="text-sm text-muted-foreground ml-2">({review.rating}/5)</span>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                  "{smartTruncate(optimizeReviewText(review.review, review.location, review.course), {
                    maxLength: 280,
                    preserveKeywords: ['Faisalabad', 'IT training', 'computer training', 'professional courses'],
                    priorityKeywords: ['Faisalabad', review.course.toLowerCase()]
                  })}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[#032F65] text-white font-semibold">
                        {getInitials(review.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge className={`${getCourseColor(review.course)} pointer-events-none`}>
                      {review.course}
                    </Badge>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {review.batch}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {review.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
