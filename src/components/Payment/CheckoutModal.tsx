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
const UPI_ID = "7457852306@pthdfc";

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
    const numericOriginal = amountUSD
        ? parseFloat(amountUSD.toString().replace(/[^0-9.]/g, ''))
        : 0;
    const numericFinalUSD = appliedDiscount > 0
        ? numericOriginal * (1 - appliedDiscount / 100)
        : numericOriginal;

    // Convert to local currency
    const finalAmount = convertPrice(numericFinalUSD);

    // UPI Intent Link
    const numericAmount = parseFloat(finalAmount.replace(/[^0-9.]/g, '')).toFixed(2);
    // Use a more robust UPI link format to avoid technical errors
    // Encode strings properly and use '+' for spaces which is more broadly supported in UPI intent links
    const encodedProductName = encodeURIComponent(productName).replace(/%20/g, "+");
    const encodedPayeeName = "Sanjeev+Kumar";
    const txnRef = `REF${Date.now()}`;
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodedPayeeName}&am=${numericAmount}&cu=INR&tn=${encodedProductName}&tr=${txnRef}`;

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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
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
                                            <div className="flex flex-col items-center mb-4">
                                                <div className="bg-white p-2 rounded-lg mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                                    <QRCode value={upiLink} size={180} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-bold">Total Amount to Pay</p>
                                                    <div className="text-3xl font-black text-white tracking-tighter bg-cyan-500/10 px-6 py-2 rounded-2xl border border-cyan-500/20">
                                                        {finalAmount}
                                                    </div>
                                                </div>
                                                <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mt-4 font-bold flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></span>
                                                    Scan with any UPI App
                                                </p>
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
                                            <div className="bg-black/50 p-3 rounded border border-white/10 flex items-center justify-between gap-2 overflow-hidden mb-4">
                                                <code className="text-[10px] text-white/60 truncate font-mono">{walletAddress}</code>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                                                    className="text-cyan-400 text-xs hover:text-cyan-300 px-2"
                                                >
                                                    COPY
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-bold">Total Amount to Pay</p>
                                                <div className="text-2xl font-black text-white tracking-tighter bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20 inline-block">
                                                    {finalAmount}
                                                </div>
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
                                <button
                                    onClick={onClose}
                                    className="w-full mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors"
                                >
                                    Cancel & Return
                                </button>
                            </>
                        )}

                        {step === 'details' && (
                            <div className="space-y-4">
                                <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl mb-4">
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
                                        <i className="fas fa-info-circle text-cyan-400"></i> Final Step
                                    </h4>
                                    <p className="text-white/60 text-[10px] leading-relaxed">
                                        Please enter the 12-digit UPI Reference / UTR number from your payment app to unlock your protocol.
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address (for delivery)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-cyan-500/50 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder={isIndia ? "12 Digit UTR Number" : "Transaction Hash ID"}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-cyan-500/50 outline-none transition-all font-mono"
                                    value={formData.txnId}
                                    onChange={(e) => setFormData({ ...formData, txnId: e.target.value })}
                                />
                                <button
                                    onClick={handleSubmitDetails}
                                    disabled={!formData.email || !formData.txnId || (isIndia && formData.txnId.length < 6)}
                                    className={`w-full mt-2 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${(!formData.email || !formData.txnId || (isIndia && formData.txnId.length < 6))
                                        ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                        : 'bg-white text-black hover:bg-cyan-400 shadow-xl active:scale-95'
                                        }`}
                                >
                                    CONFIRM PAYMENT & UNLOCK
                                </button>
                                <button onClick={() => setStep('pay')} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white mt-4 transition-colors">
                                    Go Back to QR
                                </button>
                            </div>
                        )}

                        {step === 'verify' && (
                            <div className="text-center py-12 space-y-6">
                                <div className="relative inline-block">
                                    <div className="w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <i className="fas fa-shield-alt text-cyan-500/30 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-lg tracking-tighter uppercase mb-2">Verifying Payment</h4>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                        Neural synchronization in progress.<br />
                                        <span className="text-cyan-400/60">(Usually takes under 2 minutes)</span>
                                    </p>
                                </div>
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
