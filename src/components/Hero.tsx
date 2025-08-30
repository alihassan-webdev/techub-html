import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { motion, useAnimation, useTransform, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimationPreferences, getOptimizedAnimationConfig, useVisibilityOptimization } from "@/hooks/useAnimationPreferences";

// Enhanced AnimatedButton with premium animations
const AnimatedButton = ({
  children,
  onClick,
  icon,
  animation = "scale",
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const getAnimationProps = () => {
    switch (animation) {
      case "glow":
        return {
          whileHover: {
            scale: 1.03,
            boxShadow: [
              "0 0 0px rgba(99, 102, 241, 0)",
              "0 0 25px rgba(99, 102, 241, 0.6)",
              "0 0 35px rgba(99, 102, 241, 0.4)",
            ],
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
          whileTap: { 
            scale: 0.96,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
        };
      case "scale":
      default:
        return {
          whileHover: { 
            scale: 1.03,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 17,
            },
          },
          whileTap: { 
            scale: 0.97,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
        };
    }
  };

  return (
    <motion.div 
      {...getAnimationProps()}
      style={{ willChange: "transform" }}
    >
      <button
        onClick={onClick}
        className={`
          inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          ${
            variant === "outline"
              ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }
          ${size === "lg" ? "h-11 px-6 text-base" : "h-10 px-4 text-sm"}
          ${className}
        `}
        {...props}
      >
        <motion.span
          animate={{ x: 0 }}
          whileHover={{ x: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.span>
        <motion.span
          animate={{ x: 0, rotate: 0 }}
          whileHover={{ x: 3, rotate: 5 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {icon}
        </motion.span>
      </button>
    </motion.div>
  );
};

// Enhanced AnimatedSection with smoother animations
const AnimatedSection = ({
  children,
  animation = "fadeIn",
  delay = 0,
  className = "",
}) => {
  const [ref, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: "50px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getVariants = () => {
    switch (animation) {
      case "slideLeft":
        return {
          hidden: { 
            opacity: 0, 
            x: 100,
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case "fadeIn":
      default:
        return {
          hidden: { 
            opacity: 0,
            y: 30,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

const carouselItems: CarouselItem[] = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets%2Feeebeb4f50d448b494ae6a5ed5692c03%2F80801e16257746289dcac67d7f17dac0?format=webp&width=800",
    title: "",
    description: "",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets%2Feeebeb4f50d448b494ae6a5ed5692c03%2F4425100067fe4bdb8807fc2c35c80f28?format=webp&width=800",
    title: "",
    description: "",
  },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const heroRef = useRef<HTMLElement>(null);

  const animationPrefs = useAnimationPreferences();
  const config = getOptimizedAnimationConfig(animationPrefs);
  const { isVisible: isPageVisible, isBackgroundTab } = useVisibilityOptimization();
  const [heroInViewRef, heroInView] = useInView({ threshold: 0.2 });
  const setHeroRefs = (node: HTMLElement | null) => {
    (heroRef as any).current = node;
    heroInViewRef(node);
  };

  // Preload next carousel image only for smoother transitions
  useEffect(() => {
    const next = (current + 1) % carouselItems.length;
    const img = new Image();
    img.src = carouselItems[next].image;
  }, [current]);

  // Optimized scroll-based parallax with reduced complexity
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxRange = config.enableParallax ? ["0%", "20%"] : ["0%", "0%"];

  const textY = useSpring(
    useTransform(scrollYProgress, [0, 1], parallaxRange),
    {
      stiffness: 200,
      damping: 40,
      restDelta: 0.01,
      mass: 0.5
    }
  );

  // Control autoplay based on visibility and device performance
  useEffect(() => {
    const shouldAuto = config.enableAutoplay && isPageVisible && heroInView && !isBackgroundTab;
    setIsAutoPlaying(shouldAuto);
  }, [config.enableAutoplay, isPageVisible, heroInView, isBackgroundTab]);

  // Optimized auto-carousel with memory cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 2500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, [current, isAutoPlaying]);


  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Enhanced container variants with better timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  // Enhanced item variants with smoother easing
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: config.duration,
        ease: config.ease,
        type: "tween",
      },
    },
  };


  return (
    <section
      ref={setHeroRefs}
      id="home"
      className="relative min-h-screen bg-[#ffffff] flex items-start justify-center px-4 pt-8 pb-16 sm:px-6 md:px-8 md:pt-12 md:pb-20 lg:px-12 scroll-mt-20 overflow-hidden"
    >

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Enhanced Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            style={{ 
              y: textY,
              willChange: "transform",
            }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:-ml-6"
          >
            {/* Enhanced Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                <motion.span
                  className="bg-[#B22429] bg-clip-text text-transparent"
                  animate={config.enableComplexAnimations ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : undefined}
                  transition={config.enableComplexAnimations ? { duration: 3, ease: "easeInOut", repeat: Infinity } : undefined}
                >
                  Faisalabad's
                </motion.span>{" "}
                <br className="hidden sm:block" />
                <span className="text-[#032F65]">Largest IT Learning Institute</span>
              </h1>
            </motion.div>

            {/* Enhanced Description */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed px-2 sm:px-0 text-center lg:text-justify">
                <motion.span
                  className="font-bold bg-[#B22429] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  TECH
                </motion.span>
                <span className="text-gray-500 mx-2">-</span>
                <motion.span
                  className="font-bold bg-[#032F65] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  HUB
                </motion.span>{" "}
                <motion.span
                  className="font-bold bg-[#032F65] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  FAISALABAD
                </motion.span>{" "}
                empowers young minds with IT skills through
                expert-led courses. Start with our{" "}
                <motion.span
                  className="font-bold text-[#B22429]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  FREE courses
                </motion.span>{" "}
                or advance with professional{" "}
                <motion.span
                  className="font-bold text-[#032F65]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  PAID programs
                </motion.span>{" "}
                to unlock unlimited tech opportunities!
              </p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start"
            >
              <AnimatedButton
                animation="scale"
                size="lg"
                className="bg-[#032F65] text-white group w-full sm:w-auto"
                onClick={() => navigate("/courses/free")}
                icon={<ArrowRight size={20} />}
              >
                Enroll in Free Courses
              </AnimatedButton>

              <AnimatedButton
                animation="scale"
                size="lg"
                className="group w-full sm:w-auto"
                style={{ backgroundColor: '#B22429', color: '#fff' }}
                onClick={() => navigate("/courses/paid")}
                icon={<Play size={18} />}
              >
                View Paid Courses
              </AnimatedButton>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Carousel */}
          <AnimatedSection animation="slideLeft" delay={300} className="order-2 flex justify-center lg:justify-start">
            <div
              className="relative w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-full lg:ml-4 lg:mr-4 aspect-[7481/6000] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Enhanced Carousel Images */}
              <div className="relative w-full h-full">
                {carouselItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                opacity: index === current ? 1 : 0,
                scale: index === current ? 1 : 1.02,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover sm:object-contain md:object-cover"
                      loading={index === current ? "eager" : "lazy"}
                      fetchPriority={index === current ? "high" : "low"}
                      decoding="async"
                      sizes="(min-width: 1024px) 600px, 90vw"
                    />

                  </motion.div>
                ))}
              </div>


            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
