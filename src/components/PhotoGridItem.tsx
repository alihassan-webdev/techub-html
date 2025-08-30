import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn } from 'lucide-react';
import LazyImage from './LazyImage';
import { cn } from '@/lib/utils';

interface PhotoGridItemProps {
  image: {
    src: string;
    alt: string;
    title?: string;
    category?: string;
  };
  index: number;
  onClick: () => void;
  className?: string;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({
  image,
  index,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={image.src}
          alt={image.alt}
          className="w-full h-auto group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white"
          >
            <Eye size={18} />
            <span className="text-sm font-medium">View Full Size</span>
            <ZoomIn size={16} />
          </motion.div>
        </motion.div>

        {/* Category Badge */}
        {image.category && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium"
          >
            {image.category}
          </motion.div>
        )}
      </div>

      {/* Content */}
      {image.title && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          className="p-4"
        >
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {image.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {image.alt}
          </p>
        </motion.div>
      )}

      {/* Subtle Border Animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left"
      />
    </motion.div>
  );
};

export default PhotoGridItem;
