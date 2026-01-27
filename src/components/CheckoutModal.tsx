'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrencyFromTimezone, convertPrice, Currency } from '../utils/currency';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    productTitle: string;
    productPrice: string;
    productId: string;
    productType: string;
}

export default function CheckoutModal({ isOpen, onClose, productTitle, productPrice, productId, productType }: CheckoutModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [currency, setCurrency] = useState<Currency>('USD');
    const [convertedPrice, setConvertedPrice] = useState({ display: productPrice, value: 0, currency: 'USD' });

    // Initialize currency on open
    useEffect(() => {
        if (isOpen) {
            const detectedValue = getCurrencyFromTimezone();
            setCurrency(detectedValue);
            setConvertedPrice(convertPrice(productPrice, detectedValue));
            setStep(1); // Reset step
            setStatus('idle');
        }
    }, [isOpen, productPrice]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = async () => {
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: {
                        id: productId,
                        type: productType,
                        title: productTitle,
                        originalPrice: productPrice,
                        finalPrice: convertedPrice.display,
                        currency: currency
                    },
                    user: formData,
                    status: 'PAYMENT_PENDING',
                    timestamp: new Date().toISOString()
                })
            });

            if (!res.ok) throw new Error('Failed to submit order');

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setStep(1);
            }, 4000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(12px)',
                            cursor: 'pointer'
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '550px',
                            background: 'linear-gradient(145deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 20, 0.98))',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            padding: '30px',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                            color: 'white',
                            fontFamily: 'var(--font-body, sans-serif)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Glow Effect */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'radial-gradient(circle, rgba(0, 188, 212, 0.05), transparent 60%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: 'none',
                                color: 'rgba(255,255,255,0.7)',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                lineHeight: 1,
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                zIndex: 10
                            }}
                        >
                            &times;
                        </button>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            {status === 'success' ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                        style={{ fontSize: '4rem', marginBottom: '20px' }}
                                    >
                                        ✅
                                    </motion.div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#00bcd4' }}>Order Confirmed!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                                        Thank you, {formData.name}.<br />
                                        We have received your request for <strong>{productTitle}</strong>.<br />
                                        Our team will verify the payment and grant access shortly.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <div style={{ marginBottom: '25px', textAlign: 'center' }}>
                                        <h2 style={{
                                            fontSize: '1.4rem',
                                            marginBottom: '5px',
                                            fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
                                            color: '#00bcd4',
                                            letterSpacing: '1px'
                                        }}>
                                            {step === 1 ? 'YOUR DETAILS' : 'COMPLETE PAYMENT'}
                                        </h2>
                                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                            Step {step} of 2 • {productTitle}
                                        </p>
                                    </div>

                                    {/* Step 1: User Details */}
                                    {step === 1 && (
                                        <motion.form
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            onSubmit={handleNext}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                                        >
                                            <div>
                                                <label style={labelStyle}>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your name"
                                                    style={inputStyle}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email"
                                                    style={inputStyle}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Enter your phone number"
                                                    style={inputStyle}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Custom Message (Optional)</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Any specific goals or needs?"
                                                    rows={3}
                                                    style={{ ...inputStyle, resize: 'vertical' }}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                style={buttonStyle}
                                            >
                                                Next: Payment
                                            </button>
                                        </motion.form>
                                    )}

                                    {/* Step 2: Payment Details */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                                        >
                                            <div style={{
                                                background: 'rgba(0, 188, 212, 0.1)',
                                                border: '1px solid rgba(0, 188, 212, 0.3)',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                textAlign: 'center'
                                            }}>
                                                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '5px' }}>Total Amount</div>
                                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
                                                    {convertedPrice.display}
                                                </div>
                                                {currency !== 'USD' && (
                                                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                                                        (approx. {productPrice} USD)
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '20px' }}>
                                                <h4 style={{ color: '#00bcd4', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                                    Payment Methods
                                                </h4>

                                                <div style={{ marginBottom: '20px' }}>
                                                    <strong style={{ color: 'white', display: 'block', marginBottom: '8px' }}>UPI Transfer</strong>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        padding: '10px 15px',
                                                        borderRadius: '8px',
                                                        fontFamily: 'monospace',
                                                        fontSize: '1.1rem'
                                                    }}>
                                                        <span>7457852306@pthdfc</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <strong style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Bank Transfer</strong>
                                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ opacity: 0.6 }}>A/C No:</span>
                                                            <span style={{ fontFamily: 'monospace' }}>50100593289660</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ opacity: 0.6 }}>IFSC:</span>
                                                            <span style={{ fontFamily: 'monospace' }}>1941-00100-23-000000032</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ opacity: 0.6 }}>Location:</span>
                                                            <span>Nijibabad, UP</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {status === 'error' && (
                                                <div style={{ color: '#ff4444', fontSize: '0.9rem', textAlign: 'center' }}>
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => setStep(1)}
                                                    style={{ ...buttonStyle, background: 'rgba(255,255,255,0.1)', color: 'white' }}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={status === 'submitting'}
                                                    style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.7 : 1 }}
                                                >
                                                    {status === 'submitting' ? 'Submitting...' : 'I Have Made Payment'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    marginBottom: '6px',
    opacity: 0.7,
    color: 'white'
};

const buttonStyle = {
    flex: 1,
    padding: '16px',
    background: 'var(--primary, #00bcd4)',
    color: 'black',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    fontSize: '1rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    marginTop: '5px'
};
