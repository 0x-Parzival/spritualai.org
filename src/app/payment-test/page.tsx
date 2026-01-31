"use client";

import { useState } from "react";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import CheckoutModal from "@/components/Payment/CheckoutModal";
import { useCurrency } from "@/context/CurrencyContext";

export default function PaymentTestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center space-y-8">
            <h1 className="text-3xl font-bold text-cyan-400">Payment System Verification</h1>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-md">
                <h2 className="text-xl mb-4">Currency Context</h2>
                <div className="flex justify-between items-center mb-4">
                    <span>Current Currency:</span>
                    <span className="font-mono text-cyan-300 font-bold">{currency}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setCurrency('INR')} className="px-3 py-1 bg-white/10 rounded hover:bg-white/20">Force INR</button>
                    <button onClick={() => setCurrency('USD')} className="px-3 py-1 bg-white/10 rounded hover:bg-white/20">Force USD</button>
                    <button onClick={() => setCurrency('EUR')} className="px-3 py-1 bg-white/10 rounded hover:bg-white/20">Force EUR</button>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-md">
                <h2 className="text-xl mb-4">Pricing Component</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Base Price ($97):</span>
                        <PriceDisplay amountUSD={97} showBadge />
                    </div>
                    <div className="flex justify-between">
                        <span>Base Price ($199):</span>
                        <PriceDisplay amountUSD={199} showBadge />
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-md text-center">
                <h2 className="text-xl mb-4">Checkout Flow</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                >
                    Buy "Empire Protocol" for <PriceDisplay amountUSD={497} />
                </button>
            </div>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName="Empire of One Protocol"
                amountUSD={497}
                productId="test-product"
                productType="TEST"
            />
        </div>
    );
}
