"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect mobile view.
 * Updated to always return false to ensure desktop site is shown on all devices.
 */
export function useIsMobile() {
  return false;
}
