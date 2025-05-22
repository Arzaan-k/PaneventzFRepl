import { useState, useEffect } from 'react';

// Custom hook to detect mobile devices and provide responsive utilities
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Function to check if device is mobile based on screen width
    const checkMobile = () => {
      const mobileWidth = 768; // Standard breakpoint for mobile devices
      setIsMobile(window.innerWidth < mobileWidth);
    };
    
    // Initial check for mobile device
    checkMobile();
    
    // Add event listener to check for window resizing
    window.addEventListener('resize', checkMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}