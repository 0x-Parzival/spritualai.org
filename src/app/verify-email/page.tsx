'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import LiquidBackground from '@/components/artistic/LiquidBackground';

function VerifyEmailContent() {
  const { signUp, setActive } = useSignUp() as any;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/blueprint';

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    setError("");
    setIsVerifying(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== 'complete') {
        console.log(JSON.stringify(completeSignUp, null, 2));
        setError("Verification incomplete. Please try again.");
      }

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(redirectPath);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Something went wrong.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <span className="text-3xl">📧</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron' }}>Verify Your Spirit</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
            Enter the sacred code sent to your email to unlock your consciousness architecture.
        </p>

        {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-left">
                {error}
            </div>
        )}

        <form onSubmit={onVerify} className="space-y-6">
            <div>
                <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-white text-xl tracking-[0.5em] font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
                    maxLength={6}
                    required
                />
            </div>
            
            <button
                type="submit"
                disabled={isVerifying || code.length < 6}
                className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-sm uppercase tracking-widest"
                style={{ fontFamily: 'Orbitron' }}
            >
                {isVerifying ? 'VERIFYING...' : 'ACTIVATE BLUEPRINT'}
            </button>
        </form>

        <button
            onClick={() => router.push('/login')}
            className="mt-8 text-gray-500 text-xs hover:text-white transition-colors"
        >
            Back to Login
        </button>
      </div>
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
