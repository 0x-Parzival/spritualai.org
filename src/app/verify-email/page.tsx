'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function VerifyEmailContent() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/blueprint';

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectPath);
    }
  }, [isLoaded, isSignedIn, router, redirectPath]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-3xl">📧</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Check Your Email</h1>
      <p className="text-gray-400 mb-2 max-w-md">
        We sent you a verification code. Enter it below to activate your consciousness blueprint.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        (Check your email for the verification link.)
      </p>
      <button
        onClick={() => router.push('/login')}
        className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors"
      >
        Back to Login
      </button>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-cyan-500 rounded-full animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
