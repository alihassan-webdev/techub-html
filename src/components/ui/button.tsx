import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden gpu-accelerated",
  {
    variants: {
      variant: {
        default: "bg-[#032F65] text-white hover:bg-[#032F65]/90 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg active:scale-95",
        outline:
          "border border-[#032F65] bg-background text-black hover:bg-[#032F65] hover:text-white hover:shadow-md hover:border-[#032F65] active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        solid: "bg-[#032F65] text-white hover:bg-[#0a4b9e] hover:shadow-lg active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ripple?: boolean
  magnetic?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ripple = true, magnetic = false, children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    const [isPressed, setIsPressed] = React.useState(false);
    const rippleId = React.useRef(0);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [magneticPosition, setMagneticPosition] = React.useState({ x: 0, y: 0 });

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const newRipple = { x, y, id: rippleId.current++ };
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
      
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      
      if (onClick) {
        onClick(event);
      }
    };

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!magnetic || !buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      
      setMagneticPosition({ x: deltaX, y: deltaY });
    }, [magnetic]);

    const handleMouseLeave = React.useCallback(() => {
      if (magnetic) {
        setMagneticPosition({ x: 0, y: 0 });
      }
    }, [magnetic]);

    const Comp = asChild ? Slot : motion.button;
    
    const motionProps = !asChild ? {
      style: magnetic ? { x: magneticPosition.x, y: magneticPosition.y } : undefined,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
      whileHover: { scale: variant === 'link' ? 1 : 1.02 },
      whileTap: { scale: variant === 'link' ? 1 : 0.98 },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    } : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        onClick={handleClick}
        {...motionProps}
        {...props}
      >
        {/* Ripple Effects */}
        {ripple && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white/30"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Gradient Overlay for Gradient Variant */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0"
            animate={{ 
              x: isPressed ? ['-100%', '100%'] : '-100%',
              opacity: isPressed ? [0, 1, 0] : 0 
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
