'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

function BlueprintRouter() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [status, setStatus] = useState<'loading' | 'generating' | 'no_data' | 'done'>('loading');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push('/login');
      return;
    }

    const savedState = localStorage.getItem('spiritualAiState');
    if (!savedState) {
      setStatus('no_data');
      return;
    }

    // Generate the blockplain report
    const generateReport = async () => {
      try {
        setStatus('generating');
        const userState = JSON.parse(savedState);

        const res = await fetch('/api/blockplain/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userState }),
        });

        const data = await res.json();
        if (data.success) {
          setResult(data.data);
          // Clear the saved state since it's now persisted
          localStorage.removeItem('spiritualAiState');
          // Redirect to the unique blueprint page
          router.replace(`/blueprint/${data.data.csn}`);
        } else {
          console.error('Report generation failed:', data.error);
          setError(data.error || 'Failed to generate report');
          setStatus('no_data');
        }
      } catch (e: any) {
        console.error('Report generation error:', e);
        setError(e.message || 'An unexpected error occurred');
        setStatus('no_data');
      }
    };

    generateReport();
  }, [isLoaded, isSignedIn, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <span className="text-white/30 font-mono text-xs uppercase tracking-widest">
            Initializing...
          </span>
        </div>
      </div>
    );
  }

  if (status === 'generating') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 relative mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full" />
            <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
            <div className="absolute inset-2 border-b-2 border-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Generating Your Blueprint</h2>
          <p className="text-white/40 text-sm">Mapping your consciousness architecture...</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {['Analyzing patterns', 'Identifying archetype', 'Building report', 'Selecting products'].map((step, i) => (
              <motion.span
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.8 }}
                className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-wider"
              >
                {step}
                {i < 3 && <span className="mx-1">·</span>}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No data or Error
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">{error ? '⚠️' : '🔮'}</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">{error ? 'Generation Failed' : 'No Blueprint Data Found'}</h1>
        <p className="text-gray-400 mb-8">
          {error || 'Complete the AI consciousness decoding session first, then return here to generate your blueprint.'}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors"
          >
            {error ? 'Try Again' : 'Start The Process'}
          </button>
          {error && (
            <button
              onClick={() => {
                localStorage.removeItem('spiritualAiState');
                router.push('/');
              }}
              className="text-white/40 text-xs hover:text-white transition-colors"
            >
              Reset & Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlueprintPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-cyan-500 rounded-full animate-spin" />
      </div>
    }>
      <BlueprintRouter />
    </Suspense>
  );
}
