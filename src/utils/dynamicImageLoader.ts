// Dynamic image loader that properly works with Vite and public assets

export interface ImageMetadata {
  src: string;
  filename: string;
  title: string;
  type: 'free' | 'paid' | 'gallery';
}

// Cache for loaded image metadata
const imageCache = new Map<string, ImageMetadata[]>();
const loadingPromises = new Map<string, Promise<ImageMetadata[]>>();

// Function to scan directory and return image list
export const scanImageDirectory = async (path: string): Promise<string[]> => {
  try {
    // Try to fetch a directory listing (this would need a server endpoint in production)
    // For now, we'll simulate by checking common image extensions
    const commonExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
    const potentialImages: string[] = [];

    // In a real implementation, you'd have a server endpoint that lists directory contents
    // For demo purposes, we'll use a more practical approach
    
    return potentialImages;
  } catch (error) {
    console.error('Error scanning directory:', error);
    return [];
  }
};

// Load course images with fallback to known images
export const loadCourseImages = async (type: 'free' | 'paid'): Promise<ImageMetadata[]> => {
  const cacheKey = `course-${type}`;

  // Return cached result if available
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  // Return existing promise if already loading
  if (loadingPromises.has(cacheKey)) {
    return loadingPromises.get(cacheKey)!;
  }
  const knownImages = {
    free: [
      'cloud computing (aws).avif',
      'cloud computing microsoft.avif', 
      'cyber security.avif',
      'digital forensic cyber security.avif',
      'full stack web development.avif',
      'java scripts full stack.avif',
      'react native.avif',
      'ui design.avif'
    ],
    paid: [
      'aws-cloud computing.avif',
      'cloud-computing azure.avif',
      'cyber-security.avif', 
      'web-development.avif'
    ]
  };

  const loadPromise = (async () => {
    const images: ImageMetadata[] = [];
    const imageFiles = knownImages[type] || [];

    // Use Promise.allSettled to check all images in parallel with timeout
    const results = await Promise.allSettled(
      imageFiles.map(async (filename) => {
        const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
        const title = nameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .trim();

        const src = `/course/${type}/${filename}`;

        // Create a promise with timeout
        return new Promise<ImageMetadata>((resolve, reject) => {
          const img = new Image();
          const timeout = setTimeout(() => {
            reject(new Error(`Timeout loading ${src}`));
          }, 5000); // 5 second timeout

          img.onload = () => {
            clearTimeout(timeout);
            resolve({
              src,
              filename: nameWithoutExt,
              title,
              type
            });
          };
          img.onerror = () => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load ${src}`));
          };
          img.src = src;
        });
      })
    );

    // Process results and only include successfully loaded images
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        images.push(result.value);
      }
    });

    const sortedImages = images.sort((a, b) => a.title.localeCompare(b.title));

    // Cache the result
    imageCache.set(cacheKey, sortedImages);
    loadingPromises.delete(cacheKey);

    return sortedImages;
  })();

  loadingPromises.set(cacheKey, loadPromise);
  return loadPromise;
};

// Load gallery images
export const loadGalleryImages = async (): Promise<ImageMetadata[]> => {
  const cacheKey = 'gallery';

  // Return cached result if available
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  // Return existing promise if already loading
  if (loadingPromises.has(cacheKey)) {
    return loadingPromises.get(cacheKey)!;
  }

  const knownImages = [
    'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg',
    'pic6 (1).jpg', 'pic7.jpg', 'pic8.jpg', 'pic9.jpg', 'pic10.jpg', 'pic11.jpg'
  ];

  const loadPromise = (async () => {
    try {
      const images: ImageMetadata[] = [];

      // Process all images without relying on image loading validation
      // Since images exist in public folder, we can safely assume they're available
      for (const filename of knownImages) {
        const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
        const title = nameWithoutExt
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(/pic/gi, 'Gallery Image')
          .replace(/\(\s*\d+\s*\)/g, '') // Remove (1) from filename
          .trim();

        const src = `/gallery/${filename}`;

        images.push({
          src,
          filename: nameWithoutExt,
          title: title || `Gallery Image ${nameWithoutExt.replace(/\D/g, '')}`,
          type: 'gallery'
        });
      }

      const sortedImages = images.sort((a, b) => {
        const aNum = parseInt(a.filename.replace(/\D/g, '')) || 0;
        const bNum = parseInt(b.filename.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });

      // Cache the result
      imageCache.set(cacheKey, sortedImages);
      loadingPromises.delete(cacheKey);

      console.log('Gallery images loaded:', sortedImages.length);
      return sortedImages;
    } catch (error) {
      console.error('Error loading gallery images:', error);
      loadingPromises.delete(cacheKey);
      return [];
    }
  })();

  loadingPromises.set(cacheKey, loadPromise);
  return loadPromise;
};

// Utility functions
export const loadAllCourseImages = async (): Promise<{
  free: ImageMetadata[];
  paid: ImageMetadata[];
}> => {
  const [freeImages, paidImages] = await Promise.all([
    loadCourseImages('free'),
    loadCourseImages('paid')
  ]);

  return { free: freeImages, paid: paidImages };
};

export const normalizeFilename = (filename: string): string => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

export const findImageForCourse = (courseName: string, images: ImageMetadata[]): ImageMetadata | null => {
  const normalizedCourseName = normalizeFilename(courseName);
  
  return images.find(img => {
    const normalizedImgName = normalizeFilename(img.filename);
    const normalizedTitle = normalizeFilename(img.title);
    
    return normalizedImgName.includes(normalizedCourseName) || 
           normalizedTitle.includes(normalizedCourseName) ||
           normalizedCourseName.includes(normalizedImgName);
  }) || null;
};
