import { ReactNode, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useConnectionSpeed } from '@/hooks/useConnectionSpeed';

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const LazySection = ({ 
  children, 
  fallback, 
  threshold = 0.1, 
  rootMargin = '100px',
  className = '' 
}: LazySectionProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });
  
  const connectionSpeed = useConnectionSpeed();
  
  // For slow connections, show skeleton longer to prevent layout shift
  const showDelay = connectionSpeed === 'slow' ? 300 : 0;

  return (
    <div ref={elementRef} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};