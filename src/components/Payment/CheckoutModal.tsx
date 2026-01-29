"use client";

import React, { useState, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import QRCode from "./QRCode";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    amountUSD: string | number;
    productId: string;
    productType: string;
}

const WALLET_ADDRESS_TRC20 = "TFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Placeholder
const WALLET_ADDRESS_ERC20 = "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // Placeholder
const UPI_ID = "spiritualai@upi"; // Placeholder

export default function CheckoutModal({ isOpen, onClose, productName, amountUSD, productId, productType }: CheckoutModalProps) {
    const { currency, convertPrice } = useCurrency();
    const { user } = useAuth();

    const [step, setStep] = useState<'pay' | 'verify' | 'customize' | 'success' | 'details'>('pay');
    const [cryptoNetwork, setCryptoNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');
    const [formData, setFormData] = useState({ name: '', email: '', txnId: '' });
    const [customizationNote, setCustomizationNote] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

    // Referral State
    const [referralCode, setReferralCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("");
    const [validCode, setValidCode] = useState("");

    // Reset state on open
    useEffect(() => {
        if (isOpen) {
            setStep('pay');
            setFormData({ name: '', email: user?.email || '', txnId: '' });
            setReferralCode("");
            setAppliedDiscount(0);
            setValidCode("");
            setDiscountError("");
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const isIndia = currency === 'INR';

    // Calculate Discounted Price
    const numericOriginal = parseFloat(amountUSD.toString());
    const numericFinalUSD = appliedDiscount > 0
        ? numericOriginal * (1 - appliedDiscount / 100)
        : numericOriginal;

    // Convert to local currency
    const finalAmount = convertPrice(numericFinalUSD);

    // UPI Intent Link
    const numericAmount = parseFloat(finalAmount.replace(/[^0-9.]/g, '')).toFixed(2);
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=SpiritualAI&am=${numericAmount}&cu=INR&tn=${encodeURIComponent(productName)}`;

    const walletAddress = cryptoNetwork === 'TRC20' ? WALLET_ADDRESS_TRC20 : WALLET_ADDRESS_ERC20;
    const cryptoQRValue = walletAddress;

    // Verify Code
    const handleApplyCode = async () => {
        setDiscountError("");
        if (!referralCode || referralCode.length !== 6) {
            setDiscountError("Invalid code length.");
            return;
        }

        const { data } = await supabase
            .from('referrals')
            .select('discount_percentage, code')
            .eq('code', referralCode.toUpperCase())
            .eq('is_active', true)
            .single();

        if (data) {
            setAppliedDiscount(data.discount_percentage);
            setValidCode(data.code);
            setReferralCode(data.code);
        } else {
            setDiscountError("Invalid or expired code.");
            setAppliedDiscount(0);
            setValidCode("");
        }
    };

    const handleIHavePaid = () => {
        setStep('details');
    };

    const handleSubmitDetails = async () => {
        if (!formData.email || !formData.txnId) return;
        setStep('verify');

        try {
            // Log order
            const { data, error } = await supabase.from('orders').insert({
                user_id: user?.id || null,
                product_name: productName,
                product_id: productId,
                product_type: productType,
                amount_paid: finalAmount,
                currency: currency,
                status: 'PENDING',
                transaction_id: formData.txnId,
                referral_code: validCode || null
            }).select().single();

            if (error) throw error;
            if (data) setCurrentOrderId(data.id);

            setTimeout(() => {
                setStep('customize');
            }, 2000);
        } catch (e) {
            console.error("Order save failed", e);
            setStep('success');
        }
    };

    const handleSubmitCustomization = async () => {
        if (currentOrderId && customizationNote) {
            await supabase.from('orders').update({
                customization_note: customizationNote
            }).eq('id', currentOrderId);
        }
        setStep('success');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#0a0a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 bg-white/5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white/60 text-xs uppercase tracking-widest mb-1">Unlock Access</h3>
                                <h2 className="text-xl font-bold text-white mb-1">{productName}</h2>
                                <p className="text-cyan-400 font-mono text-lg">
                                    {appliedDiscount > 0 && (
                                        <span className="line-through text-white/40 mr-2 text-sm">{convertPrice(numericOriginal)}</span>
                                    )}
                                    {finalAmount}
                                    {appliedDiscount > 0 && (
                                        <span className="text-green-400 text-xs ml-2 font-bold">-{appliedDiscount}%</span>
                                    )}
                                </p>
                            </div>
                            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {step === 'pay' && (
                            <>
                                {/* Referral Input */}
                                <div className="mb-6 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Referral Code (Optional)"
                                        className={`flex-1 bg-white/5 border ${discountError ? 'border-red-500/50' : (validCode ? 'border-green-500/50' : 'border-white/10')} rounded px-3 py-2 text-sm text-white focus:outline-none uppercase`}
                                        value={referralCode}
                                        onChange={(e) => setReferralCode(e.target.value)}
                                        maxLength={6}
                                        disabled={!!validCode}
                                    />
                                    <button
                                        onClick={handleApplyCode}
                                        disabled={!!validCode || !referralCode}
                                        className={`px-4 rounded text-xs font-bold uppercase transition-colors ${validCode ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                    >
                                        {validCode ? 'Applied' : 'Apply'}
                                    </button>
                                </div>
                                {discountError && <p className="text-red-400 text-xs mb-4 -mt-4">{discountError}</p>}

                                {isIndia ? (
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <p className="text-white/70 text-sm mb-4">Scan using any UPI App</p>
                                            <div className="flex justify-center mb-4 bg-white p-2 rounded-lg inline-block mx-auto">
                                                <QRCode value={upiLink} size={180} />
                                            </div>

                                            <a
                                                href={upiLink}
                                                className="block w-full py-3 bg-white text-black font-bold rounded-lg mb-4 hover:bg-gray-200 transition-colors md:hidden text-center"
                                            >
                                                Open UPI App
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex bg-white/5 rounded-lg p-1 mb-4">
                                            <button
                                                onClick={() => setCryptoNetwork('TRC20')}
                                                className={`flex-1 py-2 text-xs font-bold rounded ${cryptoNetwork === 'TRC20' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/40 hover:text-white'}`}
                                            >
                                                USDT (TRC20)
                                            </button>
                                            <button
                                                onClick={() => setCryptoNetwork('ERC20')}
                                                className={`flex-1 py-2 text-xs font-bold rounded ${cryptoNetwork === 'ERC20' ? 'bg-purple-500/20 text-purple-400' : 'text-white/40 hover:text-white'}`}
                                            >
                                                USDC (ERC20)
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex justify-center mb-4 bg-white p-2 rounded-lg inline-block mx-auto">
                                                <QRCode value={cryptoQRValue} size={160} />
                                            </div>
                                            <div className="bg-black/50 p-3 rounded border border-white/10 flex items-center justify-between gap-2 overflow-hidden">
                                                <code className="text-[10px] text-white/60 truncate font-mono">{walletAddress}</code>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                                                    className="text-cyan-400 text-xs hover:text-cyan-300 px-2"
                                                >
                                                    COPY
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleIHavePaid}
                                    className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-bold tracking-wide"
                                >
                                    I HAVE PAID
                                </button>
                            </>
                        )}

                        {step === 'details' && (
                            <div className="space-y-4">
                                <h4 className="text-white font-bold mb-4">Verification Details</h4>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded p-3 text-white text-sm focus:border-cyan-500/50 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address (for delivery)"
                                    className="w-full bg-white/5 border border-white/10 rounded p-3 text-white text-sm focus:border-cyan-500/50 outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder={isIndia ? "UPI Reference / UTR Number" : "Transaction Hash ID"}
                                    className="w-full bg-white/5 border border-white/10 rounded p-3 text-white text-sm focus:border-cyan-500/50 outline-none"
                                    value={formData.txnId}
                                    onChange={(e) => setFormData({ ...formData, txnId: e.target.value })}
                                />
                                <button
                                    onClick={handleSubmitDetails}
                                    disabled={!formData.email || !formData.txnId}
                                    className={`w-full mt-2 py-3 rounded-lg font-bold text-sm transition-colors ${(!formData.email || !formData.txnId) ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'
                                        }`}
                                >
                                    CONFIRM PAYMENT
                                </button>
                                <button onClick={() => setStep('pay')} className="w-full text-center text-xs text-gray-500 hover:text-white mt-4">
                                    Include Referral Code? Go Back
                                </button>
                            </div>
                        )}

                        {step === 'verify' && (
                            <div className="text-center py-12">
                                <div className="inline-block w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Verifying Payment...</h4>
                                <p className="text-white/50 text-sm">Please wait while we record your transaction.</p>
                            </div>
                        )}

                        {step === 'customize' && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                                        Personalize Your Experience
                                    </h4>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        We customize each product to align with your unique energy signature. Tell us what you're looking for.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-white/40 tracking-wider mb-2">
                                        Your Request / Intention
                                    </label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyan-500/50 outline-none resize-none h-32"
                                        placeholder="e.g., I want to focus on career growth, or I need clarity in relationships..."
                                        value={customizationNote}
                                        onChange={(e) => setCustomizationNote(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmitCustomization}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg transition-all text-sm font-bold tracking-wide shadow-lg shadow-cyan-900/20"
                                >
                                    COMPLETE ORDER
                                </button>
                                <button
                                    onClick={() => setStep('success')}
                                    className="w-full text-center text-xs text-gray-500 hover:text-white mt-2"
                                >
                                    Skip Customization
                                </button>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                                    <i className="fas fa-check text-green-400 text-2xl"></i>
                                </div>
                                <h4 className="text-white font-bold text-xl mb-2">Order Confirmed!</h4>
                                <p className="text-white/60 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                                    Your personalized protocol will be crafted and sent to your <strong>Email & WhatsApp</strong> shortly.
                                </p>
                                <div className="bg-white/5 rounded-lg p-4 mb-6">
                                    <p className="text-xs text-white/40 uppercase mb-1">Order ID</p>
                                    <p className="font-mono text-cyan-400">{currentOrderId?.slice(0, 8).toUpperCase() || "PENDING"}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-bold"
                                >
                                    CLOSE
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
