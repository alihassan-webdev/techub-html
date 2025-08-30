import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DirectionAwareHover from '@/components/animations/DirectionAwareHover';
import { Course } from '@/data/courses';
import { cn } from '@/lib/utils';
import { equalizeDescription } from '@/utils/courseDescriptionEqualizer';

interface CourseCardProps {
  course: Course;
  className?: string;
  priority?: boolean;
  showEducation?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className, priority = false, showEducation = true }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  // Optimized description for 4 lines to fill h-[5.5rem] space
  const equalizedDescription = equalizeDescription(
    course.description,
    course.name,
    course.category,
    course.type,
    { targetLength: 320, minLength: 280 }
  );

  // Shorter description for overlay with different target
  const overlayDescription = equalizeDescription(
    course.description,
    course.name,
    course.category,
    course.type,
    { targetLength: 120, minLength: 100 }
  );

  const overlayContent = (
    <div className="space-y-2 max-h-full overflow-hidden">
      <div className="flex items-center space-x-3 text-white/90">
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span className="text-xs">{course.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={14} />
          <span className="text-xs">{course.enrolled.toLocaleString()}</span>
        </div>
      </div>
      <p className="text-white/80 text-xs line-clamp-2 leading-relaxed">
        {overlayDescription}
      </p>
      {course.internship && (
        <p className="text-white/90 text-xs font-medium">
          {course.internship}
        </p>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20 text-xs h-7"
      >
        View Details
      </Button>
    </div>
  );

  return (
    <div
      className={cn(
        'group rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[580px] flex flex-col relative hover:z-20',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="overflow-hidden rounded-t-lg h-60 min-h-[240px] max-h-[240px]">
        <DirectionAwareHover
          imageUrl={course.cover}
          imageClassName="w-full h-60 object-cover"
          overlayContent={overlayContent}
          className=""
          priority={priority}
          alt={course.alt || course.name}
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={course.type === 'Free' ? 'secondary' : 'default'}
              className={cn(
                course.type === 'Free'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : 'bg-[#032F65]/10 text-[#032F65] hover:bg-[#032F65]/20 font-semibold'
              )}
            >
              {course.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {(course.level?.toLowerCase().includes('beginner') || course.level?.toLowerCase().includes('intermediate')) ? 'Professional' : course.level}
            </Badge>
          </div>

          <h3 className="font-display text-xl font-bold text-foreground line-clamp-2">
            {course.name}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-4 h-[5.5rem] leading-relaxed">
            {equalizedDescription}
          </p>
        </div>

        <div className="space-y-3 pt-4 pb-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.enrolled.toLocaleString()}</span>
              </div>
            </div>

            {course.fee && (
              <div className="text-right">
                {course.originalPrice && course.discount ? (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground line-through">
                      {course.originalPrice}
                    </div>
                    <div className="font-bold text-lg text-[#032F65]">
                      {course.fee}
                    </div>
                    <div className="text-xs bg-[#B22429]/10 text-[#B22429] px-2 py-1 rounded font-bold inline-block border border-[#B22429]/20">
                      {course.discount}
                    </div>
                  </div>
                ) : (
                  <div className="font-bold text-lg text-[#032F65]">
                    {course.fee}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="font-bold">{course.duration}</span>
            </div>
            {course.internship && (
              <div className="text-xs text-black font-medium">
                + Internship
              </div>
            )}
          </div>
          {course.educationRequirement && showEducation && (
            <div className="text-xs text-muted-foreground pt-1">
              <span className="font-medium">Education: {course.educationRequirement}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
