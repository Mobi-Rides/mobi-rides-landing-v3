import { useState, useEffect } from 'react';

type ConnectionSpeed = 'slow' | 'medium' | 'fast' | 'unknown';

interface NetworkInformation extends EventTarget {
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  downlink?: number;
  rtt?: number;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }
}

export const useConnectionSpeed = (): ConnectionSpeed => {
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>('unknown');

  useEffect(() => {
    const updateConnectionSpeed = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (!connection) {
        // Fallback: measure loading speed of a small resource
        const startTime = performance.now();
        const img = new Image();
        img.onload = () => {
          const loadTime = performance.now() - startTime;
          if (loadTime < 100) setConnectionSpeed('fast');
          else if (loadTime < 500) setConnectionSpeed('medium');
          else setConnectionSpeed('slow');
        };
        img.onerror = () => setConnectionSpeed('slow');
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        return;
      }

      const effectiveType = connection.effectiveType;
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          setConnectionSpeed('slow');
          break;
        case '3g':
          setConnectionSpeed('medium');
          break;
        case '4g':
          setConnectionSpeed('fast');
          break;
        default:
          setConnectionSpeed('medium');
      }
    };

    updateConnectionSpeed();

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateConnectionSpeed);
      return () => connection.removeEventListener('change', updateConnectionSpeed);
    }
  }, []);

  return connectionSpeed;
};