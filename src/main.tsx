// Defensive script to prevent ethereum property redefinition errors from wallet extensions
if (typeof window !== 'undefined') {
  // Check if ethereum property exists and handle it safely
  if (window.ethereum) {
    // Get the property descriptor to check if it's configurable
    const descriptor = Object.getOwnPropertyDescriptor(window, 'ethereum');
    
    // Only attempt to redefine if the property is configurable or doesn't have a descriptor
    if (!descriptor || descriptor.configurable) {
      const originalEthereum = window.ethereum;
      try {
        Object.defineProperty(window, 'ethereum', {
          get: () => originalEthereum,
          set: (value) => {
            // Silently ignore attempts to redefine if it's the same value
            if (value !== originalEthereum) {
              console.warn('Attempted to redefine window.ethereum property. This may be caused by multiple wallet extensions.');
            }
          },
          configurable: true,
          enumerable: true
        });
      } catch (error) {
        // If redefinition fails, just log a warning and continue
        console.warn('Could not redefine ethereum property:', error);
      }
    }
  }
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
