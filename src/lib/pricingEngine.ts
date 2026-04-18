interface PricingInput {
  country: string;
  urgencyPercent: number;
  budgetSignal: string;
  lifePhase: string;
  pattern: string;
}

const PPP_MULTIPLIERS: Record<string, number> = {
  'US': 1.0, 'GB': 1.0, 'AU': 1.0, 'CA': 1.0, 'DE': 1.0, 'CH': 1.0,
  'NL': 1.0, 'SE': 1.0, 'NO': 1.0, 'DK': 1.0, 'SG': 1.0, 'JP': 0.9,
  'AE': 0.85, 'SA': 0.8, 'QA': 0.85, 'KW': 0.85, 'MY': 0.55, 'TH': 0.45,
  'MX': 0.4, 'BR': 0.4, 'AR': 0.3, 'ZA': 0.4, 'TR': 0.35, 'PL': 0.5,
  'CZ': 0.55, 'HU': 0.45, 'RO': 0.4,
  'IN': 0.25, 'PK': 0.2, 'BD': 0.18, 'NG': 0.2, 'KE': 0.22, 'GH': 0.2,
  'PH': 0.3, 'ID': 0.28, 'VN': 0.25, 'EG': 0.2, 'MA': 0.22, 'UZ': 0.18,
  'DEFAULT': 0.5,
};

function getUrgencyMultiplier(urgencyPercent: number): number {
  if (urgencyPercent >= 85) return 1.4;
  if (urgencyPercent >= 70) return 1.2;
  if (urgencyPercent >= 50) return 1.0;
  return 0.85;
}

function getBudgetMultiplier(signal: string): number {
  const multipliers: Record<string, number> = {
    'high': 1.3,
    'mid': 1.0,
    'low': 0.5,
  };
  return multipliers[signal] || 1.0;
}

function getLifePhaseMultiplier(phase: string): number {
  const multipliers: Record<string, number> = {
    'The Reckoning': 1.4,
    'The Crossroads': 1.3,
    'The Crucible': 1.2,
    'The Integration': 1.1,
    'The Awakening': 1.0,
    'The Harvest': 1.0,
  };
  return multipliers[phase] || 1.0;
}

function roundToPrice(price: number): number {
  const anchors = [7, 9, 17, 27, 37, 47, 67, 97, 127, 197, 297];
  return anchors.reduce((prev, curr) => 
    Math.abs(curr - price) < Math.abs(prev - price) ? curr : prev
  );
}

function getCurrency(country: string): string {
  const currencies: Record<string, string> = {
    'GB': '£',
    'DE': '€', 'CH': 'CHF', 'NL': '€', 'SE': 'kr', 'NO': 'kr', 'DK': 'kr',
    'IN': '₹', 'JP': '¥',
  };
  return currencies[country] || '$';
}

function generateUrgencyLine(urgency: number, phase: string, pattern: string): string {
  if (urgency >= 85 && phase === 'The Reckoning') {
    return "You are in Saturn return. This window closes in 18 months.";
  }
  if (urgency >= 85) {
    return `${urgency}% pattern activation. This is costing you daily.`;
  }
  if (urgency >= 70) {
    return "High urgency detected. The longer this runs, the deeper it roots.";
  }
  return "Your pattern is active. The right time is always now.";
}

export function calculatePrice(
  basePrice: number,
  input: PricingInput
): {
  displayPrice: number;
  originalPrice: number;
  currency: string;
  savingPercent: number;
  urgencyLine: string;
} {
  const ppp = PPP_MULTIPLIERS[input.country] || PPP_MULTIPLIERS['DEFAULT'];
  const urgencyMult = getUrgencyMultiplier(input.urgencyPercent);
  const budgetMult = getBudgetMultiplier(input.budgetSignal);
  const phaseMult = getLifePhaseMultiplier(input.lifePhase);
  
  const adjustedPrice = basePrice * ppp * urgencyMult * budgetMult * phaseMult;
  const displayPrice = roundToPrice(adjustedPrice);
  const originalPrice = roundToPrice(basePrice * urgencyMult * 1.5);
  const savingPercent = Math.round((1 - displayPrice / originalPrice) * 100);
  const currency = getCurrency(input.country);
  const urgencyLine = generateUrgencyLine(input.urgencyPercent, input.lifePhase, input.pattern);
  
  return { displayPrice, originalPrice, currency, savingPercent, urgencyLine };
}
