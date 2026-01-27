export type Currency = 'USD' | 'INR' | 'EUR';

interface Price {
    value: number;
    currency: Currency;
    display: string;
}

const RATES = {
    USD: 1,
    INR: 87, // Approx conversion
    EUR: 0.95
};

export function getCurrencyFromTimezone(): Currency {
    try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone === 'Asia/Kolkata') return 'INR';
        if (timeZone.startsWith('Europe/')) return 'EUR';
        return 'USD';
    } catch (e) {
        return 'USD';
    }
}

export function convertPrice(priceString: string, targetCurrency: Currency): Price {
    // Extract number from string like "$49" or "$49.00"
    const numericValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));

    if (isNaN(numericValue)) {
        return { value: 0, currency: 'USD', display: '$0' };
    }

    const convertedValue = numericValue * RATES[targetCurrency];
    let display = '';

    switch (targetCurrency) {
        case 'INR':
            display = `₹${Math.round(convertedValue).toLocaleString('en-IN')}`;
            break;
        case 'EUR':
            display = `€${convertedValue.toFixed(2)}`;
            break;
        case 'USD':
        default:
            display = `$${numericValue.toFixed(0)}`;
            break;
    }

    return {
        value: convertedValue,
        currency: targetCurrency,
        display
    };
}
