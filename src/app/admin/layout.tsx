// src/app/admin/layout.tsx
// Admin layout — dark theme, no main nav/footer

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Spiritual AI",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans">
      {children}
    </div>
  )
}
