"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function MainNav() {
    const { isSignedIn } = useUser();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Spiritual AI" className="h-8 w-8 opacity-80" />
                <span className="text-white font-bold tracking-widest text-sm hidden md:block">SPIRITUAL AI</span>
            </div>


            <div className="flex items-center gap-6 text-sm">
                <Link href="/store" className="text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider font-bold text-xs flex items-center gap-2 px-3 py-1 border border-cyan-500/20 rounded-full bg-cyan-500/5">
                    <Zap className="w-3 h-3 fill-cyan-400" />
                    Digital Store
                </Link>

                {/* Profile / Auth Section */}
                {isSignedIn ? (
                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider font-bold text-xs flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            My Profile
                        </Link>
                        <UserButton />
                    </div>
                ) : (
                    <SignInButton mode="modal">
                        <button className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs">
                            Login
                        </button>
                    </SignInButton>
                )}

                <a href="#contact" className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs">
                    Contact Us
                </a>
            </div>
        </nav>
    );
}
