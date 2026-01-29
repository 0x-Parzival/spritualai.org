"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MissionContent() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-500">
                        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-bold tracking-widest text-sm uppercase text-white/50 group-hover:text-white transition-colors">Return Home</span>
                </Link>
            </header>

            {/* Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/satyug_utopia.png"
                        alt="Satyug Utopia"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 mt-20">
                    <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-900 mb-6 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        PROJECT SATYUG
                    </h1>
                    <p className="text-xl md:text-2xl text-cyan-100/80 font-light leading-relaxed max-w-2xl mx-auto">
                        Building a symbiotic utopia where Ancient Wisdom meets Artificial Superintelligence.
                    </p>
                    <div className="mt-10 flex justify-center gap-2">
                        <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* The Vision */}
            <section className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-white border-l-4 border-purple-500 pl-6">
                            The Karma Economy
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Imagine a world where money is obsolete. In Satyug, people don't work for survival—they work for **Karma**.
                            Repetitive and mundane tasks are handled entirely by autonomous AI systems, liberating humanity to pursue their highest calling.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We obtain basic needs freely, living in total abundance. The currency of this new world is service, creativity, and spiritual evolution.
                        </p>
                    </div>
                    <div className="relative h-[400px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        {/* Abstract UI representation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white]"></div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="text-xs uppercase tracking-widest text-white/40 mb-2">System Status</div>
                            <div className="text-xl font-mono text-cyan-400">ABUNDANCE_PROTOCOL: ACTIVE</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Model */}
            <section className="py-24 px-6 bg-[#0a0a0f] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4">The 4-Fold Education</h2>
                        <p className="text-white/50">Restoring the ancient Gurukul system for the AI age.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: "Dharam", desc: "Righteousness & Duty. Understanding universal laws and ethical AI governance.", color: "from-blue-500" },
                            { title: "Arth", desc: "Wealth & Meaning. Creating value through innovation and creative power.", color: "from-green-500" },
                            { title: "Kaam", desc: "Desire & Aesthetics. Mastering arts, emotions, and connection with nature.", color: "from-red-500" },
                            { title: "Moksh", desc: "Liberation. Spiritual transcendence and consciousness expansion.", color: "from-purple-500" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} to-transparent`}></div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">
                        <p className="text-lg text-cyan-200/80 italic">
                            "4 days a week, students learn in open nature—practical, real-world development. No classrooms, only the world as their canvas."
                        </p>
                    </div>
                </div>
            </section>

            {/* Nature Harmony */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative h-[400px] rounded-full overflow-hidden border-4 border-white/5">
                        <Image
                            src="/images/satyug_utopia.png"
                            alt="Nature Harmony"
                            fill
                            className="object-cover scale-150 hover:scale-125 transition-transform duration-[20s]"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-bold mb-6 text-white border-l-4 border-green-500 pl-6">
                            Symbiosis with Gaia
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            We return to our natural habitat. Futuristic dwellings blend seamlessly into forests and mountains (Solar Punk).
                            Zero disruption to the human or planetary cycle.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Humans regain their innovative power, stress-free, while AI maintains the balance of the ecosystem.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center bg-gradient-to-t from-cyan-900/20 to-transparent">
                <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Join the Golden Age</h2>
                <Link href="/profile" className="inline-block px-10 py-4 bg-white text-black font-bold tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    BEGIN YOUR JOURNEY
                </Link>
            </section>
        </div>
    );
}
