"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Width, short-landscape (phones rotated / split-screen), and user agent.
      // The desktop layout relies on tall viewports (cm-based offsets), so a
      // short landscape window must get the mobile flow even when wide.
      const isMobileView = window.innerWidth <= 768 ||
        window.innerHeight <= 520 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
