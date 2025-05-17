import { useState, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'blur',
  sizes = '100vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate placeholder color or use blur
  const placeholderStyle = 
    placeholder === 'blur' 
      ? { filter: 'blur(20px)', opacity: isLoaded ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }
      : { backgroundColor: '#f0f0f0', opacity: isLoaded ? 0 : 1, transition: 'opacity 0.3s ease-in-out' };

  // Calculate aspect ratio for image container
  const aspectRatio = width && height ? { aspectRatio: `${width}/${height}` } : {};

  useEffect(() => {
    // Preload image if priority is true
    if (loading === 'eager') {
      const img = new Image();
      img.src = src;
    }
  }, [src, loading]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio}
    >
      {/* Placeholder */}
      <div 
        className="absolute inset-0 z-0"
        style={placeholderStyle}
      />
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
        sizes={sizes}
      />
    </div>
  );
};

export default OptimizedImage; 