"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface PriceDisplayProps {
    amountUSD: string | number;
    className?: string;
    showBadge?: boolean;
}

export default function PriceDisplay({ amountUSD, className = "", showBadge = false }: PriceDisplayProps) {
    const { convertPrice, currency, loading } = useCurrency();

    // While loading (client-side hydration), show a static placeholder or the original USD to prevent flickering
    // Or simpler: just show the result. React 18 concurrent features might handle this better, but simple is robust.
    if (loading) return <span className={`opacity-50 ${className}`}>...</span>;

    const formattedPrice = convertPrice(amountUSD);

    return (
        <span className={`inline-flex items-center gap-2 ${className}`}>
            <span>{formattedPrice}</span>
            {showBadge && currency !== 'USD' && (
                <span className="text-[10px] uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white/60">
                    {currency}
                </span>
            )}
        </span>
    );
}
