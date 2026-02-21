"use client";

import React from "react";
import UnicornScene from "unicornstudio-react/next";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PreviewPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    // Map slugs to project IDs if needed in the future
    // For now, using the single project ID provided
    const projectId = "uPHFFv3G8FUTdutMGctS";

    return (
        <div className="relative w-full h-screen bg-black text-white overflow-hidden">
            {/* Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-8 left-8 z-50 max-w-md pointer-events-none">
                <h1 className="text-4xl font-bold mb-2 capitalize drop-shadow-lg font-orbitron">
                    {slug?.replace(/-/g, " ") || "Preview"}
                </h1>
                <p className="text-white/60 text-sm backdrop-blur-sm bg-black/20 p-2 rounded">
                    Interactive WebGL Preview
                </p>
            </div>

            {/* Unicorn Studio Scene */}
            <div className="w-full h-full">
                <UnicornScene
                    projectId={projectId}
                    sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}
