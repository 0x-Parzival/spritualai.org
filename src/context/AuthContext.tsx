"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

// We'll define a basic profile type. We'll expand this based on the schema later.
export interface Profile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    mbti_type?: string;
    bio?: string;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile from 'profiles' table (which we will create via trigger or manually)
    const fetchProfile = async (u: User) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', u.id)
                .single();

            if (data) {
                setProfile(data);
            } else {
                // Fallback if profile trigger hasn't fired yet or doesn't exist
                setProfile({
                    id: u.id,
                    email: u.email || null,
                    full_name: u.user_metadata?.full_name || null,
                    avatar_url: u.user_metadata?.avatar_url || null
                });
            }
        } catch (e) {
            console.error("Error fetching profile", e);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            // Check current session
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            if (currentSession?.user) {
                // Fetch profile
                await fetchProfile(currentSession.user);
            }

            setLoading(false);

            // Listen for changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user);
                } else {
                    setProfile(null);
                }
                setLoading(false);
            });

            return () => {
                subscription.unsubscribe();
            };
        };

        initAuth();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const refreshProfile = async () => {
        if (user) await fetchProfile(user);
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, signInWithGoogle, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
