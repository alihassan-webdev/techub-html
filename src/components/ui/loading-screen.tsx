import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
  showLogo?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  fullScreen = false,
  className,
  showLogo = true,
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm'
    : 'w-full h-full min-h-[200px]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        containerClass,
        'flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="text-center space-y-6">
        {/* Logo Animation */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary"></div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: 'backOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {!showLogo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          </motion.div>
        )}

        {/* Loading Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="space-y-2"
        >
          <h3 className="font-display text-xl font-semibold text-foreground">
            {message}
          </h3>
          
          {/* Animated dots */}
          <motion.div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="w-48 mx-auto"
        >
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Background overlay for full screen */}
      {fullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
        />
      )}
    </motion.div>
  );
};

export default LoadingScreen;
