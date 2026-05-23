"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    isFree?: boolean;
}

interface AIChatProps {
    personality: string;
}

export default function AIChatV2({ personality }: AIChatProps) {
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
    const [input, setInput] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Initial greeting
        setMessages([{
            role: 'ai',
            text: `Greetings. I am your growth architect. What challenge can we solve today?`
        }]);
        
        // Mock products for now - in real implementation, these come from API
        setProducts([
            { id: 'f1', title: 'Core Architecture Guide', price: 'FREE', description: 'Your first step into optimization.', isFree: true },
            { id: 'f2', title: 'Productivity Template', price: 'FREE', description: 'A sample tool for your workflow.', isFree: true },
            { id: 'p1', title: 'The Ultimate Focus System', price: '$47', description: 'Master your internal engine.' },
            { id: 'p2', title: 'Social Dynamics Protocol', price: '$97', description: 'Navigate the outer world with ease.' },
            { id: 'p3', title: 'Income Automation Masterclass', price: '$197', description: 'Financial freedom for your type.' },
        ]);
    }, [personality]);

    const handleSend = async () => {
        if (!input) return;
        setIsLoading(true);
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");

        try {
            // In a real implementation, call /api/store with step="products" or "escalation"
            // For now, we simulate a response
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', text: `As an ${personality}, your perspective on this is fascinating. Based on what you've shared, I've updated your recommended tools below.` }]);
                setIsLoading(false);
            }, 1000);
        } catch (e) {
            console.error("Chat error", e);
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.section} style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', padding: '40px' }}>
            <div style={{ flex: 1, display: 'flex', gap: '40px', overflow: 'hidden' }}>
                {/* Chat Section */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', border: '1px solid rgba(53, 248, 255, 0.2)', padding: '20px' }}>
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{ marginBottom: '15px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                                <div style={{ 
                                    display: 'inline-block', 
                                    padding: '12px 18px', 
                                    borderRadius: '15px', 
                                    maxWidth: '80%',
                                    background: m.role === 'user' ? '#00f2ff22' : '#ffffff0a',
                                    border: `1px solid ${m.role === 'user' ? '#00f2ff44' : '#ffffff22'}`,
                                    color: m.role === 'user' ? '#00f2ff' : '#fff'
                                }}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && <div style={{ color: '#00f2ff' }}>Analyzing neural patterns...</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Describe your current bottleneck..."
                            style={{ flex: 1, padding: '15px', borderRadius: '10px', background: '#ffffff0a', border: '1px solid #ffffff22', color: '#fff', outline: 'none' }}
                        />
                        <button onClick={handleSend} className={styles.gradientFlowBtn} style={{ padding: '0 30px' }}>SEND</button>
                    </div>
                </div>

                {/* Product Recommendations Section */}
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontFamily: 'Orbitron', color: '#fff' }}>Digital Products for {personality}</h3>
                    
                    {/* Free Samples */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {products.filter(p => p.isFree).map(p => (
                            <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', border: '1px solid #ffffff11' }}>
                                <span style={{ color: '#00f2ff', fontSize: '0.8rem' }}>FREE SAMPLE</span>
                                <h4 style={{ color: '#fff', margin: '5px 0' }}>{p.title}</h4>
                                <button style={{ width: '100%', background: '#00f2ff', color: '#000', border: 'none', padding: '8px', borderRadius: '5px', fontWeight: 'bold' }}>GET FREE</button>
                            </div>
                        ))}
                    </div>

                    {/* Paid Recommendations */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
                        {products.filter(p => !p.isFree).map(p => (
                            <div key={p.id} style={{ display: 'flex', background: 'rgba(0,242,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid #00f2ff33', alignItems: 'center', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>{p.title}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{p.description}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: '#00f2ff', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>{p.price}</div>
                                    <button className={styles.gradientFlowBtn} style={{ padding: '8px 20px', fontSize: '0.8rem' }}>UPGRADE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
