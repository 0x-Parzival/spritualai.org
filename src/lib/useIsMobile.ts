"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect mobile devices.
 * Forcefully returns false for layout logic but provides a raw isMobileDevice
 * flag for subtle mobile-specific optimizations (like text scaling).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // Force layout-level isMobile to false to preserve desktop view
    setIsMobile(false);

    const checkMobile = () => {
      setIsMobile(false);
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isMobileUA);
      if (isMobileUA) {
        document.documentElement.classList.add('is-mobile-device');
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile, isMobileDevice };
}
