"use client";

import React, { useEffect } from 'react';
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import '../app/login/legacy-login.css';

export default function LegacyLogin({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!isEmbedded) {
      document.body.classList.add('login-page');
      return () => {
        document.body.classList.remove('login-page');
      };
    }
  }, [isEmbedded]);

  return (
    <div className={isEmbedded ? "loginEmbedded" : "loginWrapper"}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px' }}>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "clerkRoot",
                  card: "clerkCard",
                  headerTitle: { color: 'white' },
                  headerSubtitle: { color: 'rgba(255,255,255,0.7)' },
                  socialButtonsBlockButton: { color: 'white', borderColor: 'rgba(255,255,255,0.2)' },
                  socialButtonsBlockButtonText: { color: 'white' },
                  dividerLine: { background: 'rgba(255,255,255,0.2)' },
                  dividerText: { color: 'rgba(255,255,255,0.5)' },
                  formFieldLabel: { color: 'rgba(255,255,255,0.7)' },
                  formFieldInput: { background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' },
                  formButtonPrimary: { background: 'linear-gradient(90deg, #00f2ff, #0088ff)', color: 'black' },
                  footerActionText: { color: 'rgba(255,255,255,0.5)' },
                  footerActionLink: { color: '#00f2ff' }
                }
              }}
              routing={'path' as any}
              fallbackRedirectUrl="/#report-section"
            />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => router.push('/signup')}>
            Don't have an account? Sign up
        </div>
    </div>
  );
}
