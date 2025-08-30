import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { loadGalleryImages, ImageMetadata } from '@/utils/dynamicImageLoader';
import { useImagePreloader } from '@/utils/imageOptimization';
import ProgressiveImage from '@/components/ui/progressive-image';
import LoadingScreen from '@/components/ui/loading-screen';

const DynamicPhotoGallery = () => {
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { preloadImages } = useImagePreloader();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setError(null);
        const galleryImages = await loadGalleryImages();
        setImages(galleryImages);

        // Preload first 6 images for instant viewing
        const priorityImages = galleryImages.slice(0, 6).map(img => img.src);
        if (priorityImages.length > 0) {
          preloadImages(priorityImages).catch(err =>
            console.warn('Some gallery images failed to preload:', err)
          );
        }
      } catch (err) {
        setError('Failed to load gallery images');
        console.error('Error loading gallery images:', err);
      } finally {
        setHasLoaded(true);

        // Minimum loading time to prevent flash
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    loadImages();
  }, [preloadImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };


  // Show loading screen while loading
  if (isLoading && !error) {
    return (
      <section className="w-full bg-background pt-8 pb-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <LoadingScreen
            message="Loading Gallery Images..."
            className="min-h-[400px]"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-background pt-8 pb-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Campus Life & Facilities
            </h2>
          </div>
          
          <div className="text-center py-16">
            <ImageIcon className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Gallery</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background pt-8 pb-16">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-[#B22429] bg-clip-text text-transparent">
              Campus Life
            </span>{" "}
            <span className="text-foreground">&</span>{" "}
            <span className="bg-[#032F65] bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a visual journey through our modern campus, state-of-the-art facilities,
            and vibrant student life at <strong>Tech-Hub Faisalabad</strong>.
          </p>
        </motion.div>

        {/* Empowering Future Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="mb-8"
        >
          <div className="overflow-hidden rounded-xl shadow-md bg-gray-50 border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[250px] lg:min-h-[300px]">
              {/* Left side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center"
              >
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
                  Empowering the Future
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="text-sm sm:text-base leading-relaxed">
                    At <strong>Tech-Hub Faisalabad</strong> Institute, we foster innovation and offer programs to provide the latest in tech education and hands-on experience. Join us to enhance your skills in a collaborative environment.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Our mission is to bridge theory and practice, preparing students for the tech industry with state-of-the-art facilities and experienced faculty.
                  </p>
                </div>
              </motion.div>

              {/* Right side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
                className="relative h-64 lg:h-full lg:min-h-[300px] group bg-gray-50 rounded-r-xl overflow-hidden flex items-center justify-center p-4"
              >
                <ProgressiveImage
                  src="https://cdn.builder.io/api/v1/image/assets%2Fe332a972189f47c682b07c8f0e31dc7e%2F73fbe8a1992849b9b60192b1baa39ca9?format=webp&width=800"
                  alt="Tech-Hub Faisalabad Institute Building"
                  priority={true}
                  objectFit="contain"
                  fixedHeight={false}
                  className="w-[80%] h-auto max-h-[80%] transform transition-transform duration-500 group-hover:scale-105 rounded-xl shadow-lg"
                  width={800}
                  height={400}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Photo Grid with Zoom Effect */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              variants={itemVariants}
              className="overflow-hidden rounded-2xl shadow-lg group bg-white"
            >
              <div className="relative aspect-[4/3] min-h-[200px] flex items-center justify-center">
                <ProgressiveImage
                  src={image.src}
                  alt={image.title}
                  priority={index < 6} // Prioritize first 6 images
                  objectFit="cover"
                  fixedHeight={false}
                  className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  placeholder="/placeholder.svg"
                  width={400}
                  height={300}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {hasLoaded && images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <ImageIcon className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">No gallery images found</h3>
            <p className="text-muted-foreground">
              Gallery images will appear here when available
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default DynamicPhotoGallery;
