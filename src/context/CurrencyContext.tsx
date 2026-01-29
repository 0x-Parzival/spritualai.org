"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

interface CurrencyContextType {
    currency: CurrencyCode;
    countryCode: string | null;
    exchangeRates: Record<string, number>;
    setCurrency: (code: CurrencyCode) => void;
    convertPrice: (priceUSD: string | number) => string;
    loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fallback rates if API fails
const FALLBACK_RATES: Record<string, number> = {
    USD: 1,
    INR: 84.5,
    EUR: 0.92,
    GBP: 0.78
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<CurrencyCode>('USD'); // Default to USD initially to match static data
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(FALLBACK_RATES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initCurrency = async () => {
            try {
                // 1. Detect location
                const locRes = await fetch('https://ipapi.co/json/');
                if (locRes.ok) {
                    const locData = await locRes.json();
                    setCountryCode(locData.country_code);

                    if (locData.country_code === 'IN') {
                        setCurrency('INR');
                    } else if (locData.country_code === 'GB') {
                        setCurrency('GBP');
                    } else if (['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'].includes(locData.country_code)) {
                        setCurrency('EUR');
                    } else {
                        setCurrency('USD');
                    }
                }

                // 2. Fetch fresh rates (free API)
                const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
                if (rateRes.ok) {
                    const rateData = await rateRes.json();
                    setExchangeRates(rateData.rates);
                }
            } catch (error) {
                console.error("Currency init failed, using fallbacks", error);
            } finally {
                setLoading(false);
            }
        };

        // Check cache or run init
        initCurrency();
    }, []);

    const convertPrice = (priceUSD: string | number): string => {
        // Handle input format ("$97" or 97)
        let numericPrice = typeof priceUSD === 'string'
            ? parseFloat(priceUSD.replace(/[^0-9.]/g, ''))
            : priceUSD;

        if (isNaN(numericPrice)) return typeof priceUSD === 'string' ? priceUSD : '';

        const rate = exchangeRates[currency] || 1;
        const converted = numericPrice * rate;

        // Formatting
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: 0 // Keep it clean for spiritual vibes
            }).format(converted);
        } catch (e) {
            return `${currency} ${converted.toFixed(0)}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, countryCode, exchangeRates, setCurrency, convertPrice, loading }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
