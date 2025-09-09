import { useState, useEffect } from 'react';
import { useConnectionSpeed } from '@/hooks/useConnectionSpeed';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  lowQualitySrc?: string;
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fallbackSrc,
  lowQualitySrc 
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const connectionSpeed = useConnectionSpeed();

  useEffect(() => {
    // Use low quality image for slow connections
    if (connectionSpeed === 'slow' && lowQualitySrc) {
      setImageSrc(lowQualitySrc);
    } else {
      setImageSrc(src);
    }
  }, [src, lowQualitySrc, connectionSpeed]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else if (lowQualitySrc && imageSrc !== lowQualitySrc) {
        setImageSrc(lowQualitySrc);
      }
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};