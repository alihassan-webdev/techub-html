import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  magnetic?: boolean
  glowOnHover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, magnetic = false, glowOnHover = false, children, ...props }, ref) => {
    const [magneticPosition, setMagneticPosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => cardRef.current!);

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!magnetic || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.05;
      const deltaY = (e.clientY - centerY) * 0.05;
      
      setMagneticPosition({ x: deltaX, y: deltaY });
    }, [magnetic]);

    const handleMouseLeave = React.useCallback(() => {
      if (magnetic) {
        setMagneticPosition({ x: 0, y: 0 });
      }
    }, [magnetic]);

    const cardVariants = {
      rest: { 
        scale: 1, 
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      hover: { 
        scale: interactive ? 1.02 : 1, 
        y: interactive ? -8 : 0,
        boxShadow: interactive 
          ? glowOnHover 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(59, 130, 246, 0.3)"
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: { duration: 0.3, ease: "easeOut" }
      },
      tap: { 
        scale: interactive ? 0.98 : 1,
        transition: { duration: 0.1 }
      }
    };

    return (
      <motion.div
        ref={cardRef}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out gpu-accelerated",
          interactive && "cursor-pointer",
          className
        )}
        style={magnetic ? { x: magneticPosition.x, y: magneticPosition.y } : undefined}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { animated?: boolean }
>(({ className, animated = true, children, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight transition-colors duration-300",
      className
    )}
    initial={animated ? { opacity: 0, y: 10 } : undefined}
    animate={animated ? { opacity: 1, y: 0 } : undefined}
    transition={animated ? { duration: 0.5, ease: "easeOut" } : undefined}
    {...props}
  >
    {children}
  </motion.h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { animated?: boolean }
>(({ className, animated = true, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    initial={animated ? { opacity: 0, y: 10 } : undefined}
    animate={animated ? { opacity: 1, y: 0 } : undefined}
    transition={animated ? { duration: 0.5, delay: 0.1, ease: "easeOut" } : undefined}
    {...props}
  >
    {children}
  </motion.p>
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
