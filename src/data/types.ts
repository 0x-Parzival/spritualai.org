export interface ProductBonus {
    title: string;
    description: string;
    value: string; // e.g., "$97 Value"
}

export interface ProductScript {
    // 1. Hook / Intro
    headline: string; // "How to {solution} without {pain} in {time}"
    subheadline: string;
    hook_image_prompt: string; // For generating the artistic vibe later
    image_url?: string; // Generated image path

    // 2. Pain & Agitation
    pain_story: string; // The "Real cause of the problem"
    agitation_bullets: (string | { title: string; analysis: string })[]; // "Damaging mechanism" steps

    // 3. Hope & Transition
    transition_mechanism: string; // The "New Mechanism" or "The Shift"

    // 4. Solution (The Product)
    product_name: string;
    product_description: string; // "What it is"
    features_bullets: string[]; // "AI solution" aspects

    // 5. Offer & Stack
    price_original: string;
    price_discounted: string;
    bonuses: ProductBonus[];

    // 6. Guarantee & Urgency
    guarantee_text: string;
    scarcity_text: string; // "Only X spots" or "Timer"

    // 7. CTA
    cta_text: string;
}

export interface MBTITheme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;

        cardBg: string;
        muted: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    layoutType: 'NT' | 'NF' | 'SJ' | 'SP' | 'INTJ_STRATEGIC' | 'INTP_CURIOSITY' | 'ENTJ_COMMAND' | 'ENTP_DYNAMIC' | 'ENTJ_IMPERIAL' | 'INFJ_ADVOCATE' | 'INFP_MEDIATOR' | 'ENFJ_PROTAGONIST' | 'ISTJ_LOGISTICIAN' | 'ISFJ_DEFENDER' | 'ESTJ_EXECUTIVE' | 'ESFJ_CONSUL' | 'ISTP_VIRTUOSO' | 'ISFP_ADVENTURER' | 'ESTP_ENTREPRENEUR' | 'ESFP_ENTERTAINER';
    vantaColor: number;
    vantaEffect: 'net' | 'fog' | 'clouds' | 'waves' | 'rings' | 'globe' | 'dots';
    vantaConfig: any;
    ctaStyle: 'sharp' | 'minimal' | 'bold' | 'playful' | 'elegant' | 'gentle' | 'warm' | 'joyful' | 'secure' | 'familiar' | 'business' | 'friendly' | 'utilitarian' | 'aesthetic' | 'punchy' | 'lively' | 'ghost';
    ctaLabel: string;
}

export interface MBTIProfile {
    id: string; // e.g., "intp"
    name: string; // e.g., "The Logician"
    artistic_vibe: string; // Description of their visual preference
    psychological_triggers: string[]; // What makes them buy
    theme: MBTITheme;
    products: Product[];
}

export interface Product {
    id: string; // slug
    semantic_slug?: string; // e.g. intj-life-architecture-spiritual-ai
    title: string;
    script: ProductScript;
}
