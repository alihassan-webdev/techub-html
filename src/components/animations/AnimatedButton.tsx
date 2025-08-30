import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  href?: string;
  animation?: 'scale' | 'pulse' | 'glow' | 'slide' | 'ripple';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  animation = 'scale',
  icon,
  iconPosition = 'right',
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const buttonVariants = {
    scale: {
      rest: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    },
    pulse: {
      rest: { scale: 1, boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
      hover: { 
        scale: 1.02, 
        boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.98 },
    },
    glow: {
      rest: { 
        scale: 1,
        filter: 'brightness(1) drop-shadow(0 0 0 transparent)'
      },
      hover: { 
        scale: 1.02,
        filter: 'brightness(1.1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.98 },
    },
    slide: {
      rest: { x: 0 },
      hover: { x: 4 },
      tap: { x: -2 },
    },
    ripple: {
      rest: { scale: 1 },
      hover: { scale: 1.03 },
      tap: { scale: 0.97 },
    }
  };

  const iconVariants = {
    rest: { x: 0, rotate: 0 },
    hover: iconPosition === 'right' ? { x: 4, rotate: 0 } : { x: -4, rotate: 0 },
  };

  const currentVariant = buttonVariants[animation];

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate="rest"
      variants={currentVariant}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
      className="inline-block"
    >
      <Button
        variant={variant as any}
        size={size as any}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          variant === 'gradient' && 'bg-gradient-primary hover:shadow-primary',
          className
        )}
        style={{
          '--tw-bg-opacity': 1,
          ...(className.includes('hover:bg-[#B22429]') ? {
            '--tw-bg-opacity': '1 !important',
            '--tw-text-opacity': '1 !important',
            '--tw-border-opacity': '1 !important'
          } : {})
        } as React.CSSProperties}
        {...props}
      >
        {/* Ripple effect for ripple animation */}
        {animation === 'ripple' && isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
        
        <div className="flex items-center gap-2">
          {icon && iconPosition === 'left' && (
            <motion.div variants={iconVariants} className="flex items-center">
              {icon}
            </motion.div>
          )}
          
          <span className="relative z-10">{children}</span>
          
          {icon && iconPosition === 'right' && (
            <motion.div variants={iconVariants} className="flex items-center">
              {icon}
            </motion.div>
          )}
        </div>
      </Button>
    </motion.div>
  );
};

interface AnimatedLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  underlineAnimation?: boolean;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  children,
  href,
  className = '',
  underlineAnimation = true,
}) => {
  return (
    <motion.a
      href={href}
      className={cn(
        'relative inline-block font-medium transition-colors duration-300',
        className
      )}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <span className="relative z-10">{children}</span>
      
      {underlineAnimation && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-current"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </motion.a>
  );
};

interface FloatingActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  onClick,
  position = 'bottom-right',
  className = '',
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <motion.button
      className={cn(
        'fixed z-50 w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground shadow-lg',
        'flex items-center justify-center cursor-pointer',
        positionClasses[position],
        className
      )}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 10,
        delay: 0.5 
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 30,
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};
