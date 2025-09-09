import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-in-right';
  delay?: number;
  threshold?: number;
  className?: string;
}

export const AnimatedSection = ({ 
  children, 
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = '' 
}: AnimatedSectionProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true
  });

  const animationClass = isIntersecting ? `animate-${animation}` : 'opacity-0';
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div 
      ref={elementRef} 
      className={`transition-opacity duration-300 ${animationClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};