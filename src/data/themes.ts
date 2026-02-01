import { MBTITheme } from "./types";

export const mbtiThemes: Record<string, MBTITheme> = {
    INTJ: {
        colors: {
            primary: "#4FD1C5",
            secondary: "#121821",
            background: "#0B0F14",
            text: "#E0E0E0",
            accent: "#4FD1C5",
            cardBg: "#121821",
            muted: "#6b7280"
        },
        fonts: {
            heading: '"Inter", "IBM Plex Sans", sans-serif',
            body: '"Inter", "IBM Plex Sans", sans-serif'
        },
        layoutType: 'INTJ_STRATEGIC',
        vantaColor: 0x4FD1C5,
        vantaEffect: 'net',
        vantaConfig: { color: 0x4FD1C5, backgroundColor: 0x0B0F14, maxDistance: 22.00, spacing: 18.00, points: 10.00 },
        ctaStyle: 'ghost',
        ctaLabel: 'INITIALIZE SYSTEM'
    },
    INTP: {
        colors: {
            primary: "#7C7CFF", // Soft electric violet
            secondary: "#10172A", // Soft midnight blue panels
            background: "#0A0E1A", // Deep indigo-black
            text: "#E0E0E0",
            accent: "#A5A5FF", // Secondary glow
            cardBg: "#10172A",
            muted: "#64748b"
        },
        fonts: {
            heading: '"JetBrains Mono", monospace',
            body: '"Inter", sans-serif'
        },
        layoutType: 'INTP_CURIOSITY',
        vantaColor: 0x7C7CFF,
        vantaEffect: 'net', // Will rely more on CSS particles
        vantaConfig: { color: 0x7C7CFF, backgroundColor: 0x0A0E1A, maxDistance: 20.00, spacing: 16.00, points: 12.00 },
        ctaStyle: 'minimal',
        ctaLabel: '→ Explore Further'
    },
    ENTJ: {
        colors: {
            primary: "#6D28D9", // Imperial Purple
            secondary: "#121520", // Dark Slate
            background: "#0B0D12", // Obsidian Black
            text: "#ffffff",
            accent: "#6D28D9",
            cardBg: "#121520",
            muted: "#6b7280"
        },
        fonts: {
            heading: '"Inter", "SF Pro Display", sans-serif',
            body: '"Inter", "SF Pro Text", sans-serif'
        },
        layoutType: 'ENTJ_IMPERIAL',
        vantaColor: 0x6D28D9,
        vantaEffect: 'net',
        vantaConfig: { color: 0x6D28D9, backgroundColor: 0x0B0D12, maxDistance: 0.1, spacing: 100.00, points: 0 }, // Effectively minimal/static
        ctaStyle: 'bold',
        ctaLabel: 'DEPLOY PROTOCOL'
    },
    ENTP: {
        colors: {
            primary: "#3DF5FF", // Electric cyan
            secondary: "#FF4ECD", // Neon magenta
            background: "#0B1020", // Deep cosmic navy
            text: "#FFFFFF",
            accent: "#3DF5FF",
            cardBg: "#131A33", // Midnight purple for sections
            muted: "#94a3b8"
        },
        fonts: {
            heading: '"Space Grotesk", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'ENTP_DYNAMIC',
        vantaColor: 0x3DF5FF,
        vantaEffect: 'net',
        vantaConfig: { color: 0x3DF5FF, backgroundColor: 0x0B1020, points: 14.00, maxDistance: 22.00, spacing: 16.00 },
        ctaStyle: 'playful',
        ctaLabel: 'Unlock Cheat Code'
    },
    INFJ: {
        colors: {
            primary: "#8e94f2", // Soft Lavender
            secondary: "#BBD0FF", // Misty Blue
            background: "#F4F6F0", // Sage/Warm Gray/Paper
            text: "#4A4E5A", // Soft Slate
            accent: "#c77dff",
            cardBg: "#ffffff",
            muted: "#7d8597"
        },
        fonts: {
            heading: '"Lora", serif',
            body: '"Nunito", "Mulish", sans-serif'
        },
        layoutType: 'INFJ_ADVOCATE',
        vantaColor: 0x8e94f2,
        vantaEffect: 'fog',
        vantaConfig: { highlightColor: 0x8e94f2, midtoneColor: 0xbbd0ff, lowlightColor: 0xF4F6F0, baseColor: 0xffffff, blurFactor: 0.9, speed: 0.5 },
        ctaStyle: 'gentle',
        ctaLabel: 'Begin quietly'
    },
    INFP: {
        colors: {
            primary: "#e8a598",
            secondary: "#9b6154",
            background: "#1f1d1b",
            text: "#f5ebe0",
            accent: "#d5bdaf",
            cardBg: "rgba(213, 189, 175, 0.05)",
            muted: "#998"
        },
        fonts: {
            heading: '"Quicksand", sans-serif',
            body: '"Quicksand", sans-serif'
        },
        layoutType: 'INFP_MEDIATOR',
        vantaColor: 0x15803d,
        vantaEffect: 'fog',
        vantaConfig: { highlightColor: 0xe8a598, midtoneColor: 0x9b6154, lowlightColor: 0x1f1d1b, baseColor: 0x111111, blurFactor: 0.9 },
        ctaStyle: 'gentle',
        ctaLabel: 'Explore softly'
    },
    ENFJ: {
        colors: {
            primary: "#ff8c69", // Coral/Peach (Warmth)
            secondary: "#fdd5b1", // Soft Apricot
            background: "#fffaf0", // Floral White (Warm Neutral)
            text: "#4a4a4a", // Soft Dark Gray
            accent: "#87CEEB", // Sky Blue (Optimism)
            cardBg: "#ffffff",
            muted: "#8d8d8d"
        },
        fonts: {
            heading: '"Outfit", sans-serif', // Friendly & Confident
            body: '"Inter", sans-serif'
        },
        layoutType: 'ENFJ_PROTAGONIST',
        vantaColor: 0xff8c69,
        vantaEffect: 'clouds',
        vantaConfig: { skyColor: 0x87CEEB, cloudColor: 0xff8c69, cloudShadowColor: 0xffecd2, sunColor: 0xffd700, sunGlareColor: 0xfffacd, sunlightColor: 0xffffff, speed: 0.8 },
        ctaStyle: 'warm',
        ctaLabel: 'Begin the Journey'
    },
    ENFP: {
        colors: {
            primary: "#ff006e",
            secondary: "#fb5607",
            background: "#ffffff",
            text: "#000000",
            accent: "#ffbe0b",
            cardBg: "#fefae0",
            muted: "#333"
        },
        fonts: {
            heading: '"Outfit", sans-serif',
            body: '"Outfit", sans-serif'
        },
        layoutType: 'NF',
        vantaColor: 0x15803d,
        vantaEffect: 'clouds',
        vantaConfig: { skyColor: 0xff006e, cloudColor: 0xfb5607, cloudShadowColor: 0x330033, sunColor: 0xffbe0b, sunGlareColor: 0xfffacd, sunlightColor: 0xffffff, speed: 1.5 },
        ctaStyle: 'joyful',
        ctaLabel: 'Start Something New'
    },
    ISTJ: {
        colors: {
            primary: "#0E1A2B", // Navy Blue
            secondary: "#2F3A4A", // Steel Gray
            background: "#F5F7FA", // Light cool gray/white for clean look (or user specified White #E6E9EE but that might be too dark for bg, using #E6E9EE as text or bg? "White #E6E9EE" likely background)
            text: "#0E1A2B",
            accent: "#4A6FA5", // Muted Blue
            cardBg: "#ffffff",
            muted: "#666"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'ISTJ_LOGISTICIAN',
        vantaColor: 0x0E1A2B,
        vantaEffect: 'waves',
        vantaConfig: { color: 0x0E1A2B, shininess: 35.00, waveHeight: 20.00, waveSpeed: 0.75, zoom: 0.65 },
        ctaStyle: 'secure',
        ctaLabel: 'Apply System'
    },
    ISFJ: {
        colors: {
            primary: "#A9C1B1", // Soft Sage
            secondary: "#8B6F5A", // Light Brown
            background: "#F5F1EB", // Warm Cream
            text: "#4A4E5A",
            accent: "#D9A5A5", // Rose
            cardBg: "#ffffff",
            muted: "#7d8597"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'ISFJ_DEFENDER',
        vantaColor: 0xA9C1B1,
        vantaEffect: 'fog',
        vantaConfig: { highlightColor: 0xD9A5A5, midtoneColor: 0xA9C1B1, lowlightColor: 0xF5F1EB, baseColor: 0xffffff, blurFactor: 0.6, speed: 0.4 },
        ctaStyle: 'gentle',
        ctaLabel: 'Begin Safely'
    },
    ESTJ: {
        colors: {
            primary: "#0B0D12", // Black
            secondary: "#1C1F26", // Dark Charcoal
            // background: "#FFFFFF", // Removed duplicate
            // Let's go with Dark Mode for 'Command & Control'.
            background: "#0B0D12",
            text: "#FFFFFF",
            accent: "#C1121F", // Crimson
            cardBg: "#1C1F26",
            muted: "#888"
        },
        fonts: {
            heading: '"Chakra Petch", sans-serif', // Sci-fi/Auth
            body: '"Inter", sans-serif'
        },
        layoutType: 'ESTJ_EXECUTIVE',
        vantaColor: 0xC1121F,
        vantaEffect: 'net',
        vantaConfig: { color: 0xC1121F, backgroundColor: 0x0B0D12, points: 10.00, maxDistance: 20.00, spacing: 18.00 },
        ctaStyle: 'bold',
        ctaLabel: 'Deploy Now'
    },
    ESFJ: {
        colors: {
            primary: "#F3ECDC", // Warm Beige
            secondary: "#A7C7E7", // Soft Blue
            background: "#fffaf0",
            text: "#023047",
            accent: "#F2CC8F", // Gold
            cardBg: "#ffffff",
            muted: "#666"
        },
        fonts: {
            heading: '"Outfit", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'ESFJ_CONSUL',
        vantaColor: 0xF2CC8F,
        vantaEffect: 'clouds',
        vantaConfig: { cloudColor: 0xA7C7E7, skyColor: 0xF3ECDC, sunColor: 0xF2CC8F, speed: 0.5 },
        ctaStyle: 'friendly',
        ctaLabel: 'Join Us'
    },
    ISTP: {
        colors: {
            primary: "#0F1115", // Matte Black
            secondary: "#3A3F45", // Industrial Gray
            background: "#050505",
            text: "#E0E0E0",
            accent: "#00E5FF", // Neon Cyan
            cardBg: "#0F1115",
            muted: "#666"
        },
        fonts: {
            heading: '"JetBrains Mono", monospace',
            body: '"IBM Plex Sans", sans-serif'
        },
        layoutType: 'ISTP_VIRTUOSO',
        vantaColor: 0x00E5FF,
        vantaEffect: 'rings',
        vantaConfig: { color: 0x00E5FF, backgroundColor: 0x050505, backgroundAlpha: 1.0 },
        ctaStyle: 'utilitarian',
        ctaLabel: 'Access Tool'
    },
    ISFP: {
        colors: {
            primary: "#6B8E6E", // Earth Green
            secondary: "#E6D3A3", // Warm Sand
            background: "#F9F7F2", // Light Natural
            text: "#2C3E50",
            accent: "#F4A261", // Peach
            cardBg: "#ffffff",
            muted: "#888"
        },
        fonts: {
            heading: '"Cormorant Garamond", serif',
            body: '"Montserrat", sans-serif'
        },
        layoutType: 'ISFP_ADVENTURER',
        vantaColor: 0x6B8E6E,
        vantaEffect: 'globe', // Or birds/fog
        vantaConfig: { color: 0x6B8E6E, color2: 0xF4A261, size: 1.0, backgroundColor: 0xF9F7F2 },
        ctaStyle: 'lively',
        ctaLabel: 'Explore'
    },
    ESTP: {
        colors: {
            primary: "#00FF88", // Neon Green
            secondary: "#00C2FF", // Electric Blue
            background: "#0A0A0A", // Jet Black
            text: "#FFFFFF",
            accent: "#FF7A00", // Orange
            cardBg: "#141414",
            muted: "#666"
        },
        fonts: {
            heading: '"Teko", sans-serif', // Aggressive/Tall
            body: '"Inter", "Roboto Condensed", sans-serif'
        },
        layoutType: 'ESTP_ENTREPRENEUR',
        vantaColor: 0x00FF88,
        vantaEffect: 'dots', // Speed/Particles
        vantaConfig: { color: 0x00FF88, color2: 0x00C2FF, backgroundColor: 0x0A0A0A, size: 3.0, spacing: 30.00 },
        ctaStyle: 'bold',
        ctaLabel: 'Start Now'
    },
    ESFP: {
        colors: {
            primary: "#FF4D8D", // Hot Pink
            secondary: "#FFD166", // Sunshine Yellow
            background: "#0B0515", // Dark Party Mode or White? "Pop-art". Let's go Dark for "Stage Lights" contrast.
            text: "#FFFFFF",
            accent: "#4DFFF3", // Aqua Blue
            cardBg: "#1A0F2E",
            muted: "#999"
        },
        fonts: {
            heading: '"Righteous", cursive', // Fun/Display
            body: '"Poppins", sans-serif'
        },
        layoutType: 'ESFP_ENTERTAINER',
        vantaColor: 0xFF4D8D,
        vantaEffect: 'rings', // Or something dynamic
        vantaConfig: { color: 0xFF4D8D, backgroundColor: 0x0B0515, color2: 0x4DFFF3, backgroundAlpha: 1.0 },
        ctaStyle: 'joyful',
        ctaLabel: 'Jump In'
    }
};
