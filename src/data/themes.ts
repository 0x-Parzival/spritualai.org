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
            primary: "#4361ee",
            secondary: "#4cc9f0",
            background: "#f8f9fa",
            text: "#212529",
            accent: "#4895ef",
            cardBg: "#ffffff",
            muted: "#6c757d"
        },
        fonts: {
            heading: '"Plus Jakarta Sans", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'NF',
        vantaColor: 0x15803d,
        vantaEffect: 'clouds',
        vantaConfig: { skyColor: 0x4361ee, cloudColor: 0x4cc9f0, cloudShadowColor: 0x1c2333, sunColor: 0xffd166, sunGlareColor: 0xfffacd, sunlightColor: 0xffffff, speed: 1.2 },
        ctaStyle: 'warm',
        ctaLabel: 'Join Us'
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
            primary: "#1d3557",
            secondary: "#457b9d",
            background: "#f1faee",
            text: "#1d3557",
            accent: "#e63946",
            cardBg: "#ffffff",
            muted: "#666"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'SJ',
        vantaColor: 0x0077b6,
        vantaEffect: 'waves',
        vantaConfig: { color: 0x1d3557, shininess: 35.00, waveHeight: 20.00, waveSpeed: 0.75, zoom: 0.65 },
        ctaStyle: 'secure',
        ctaLabel: 'Proceed Securely'
    },
    ISFJ: {
        colors: {
            primary: "#0077b6",
            secondary: "#00b4d8",
            background: "#caf0f8",
            text: "#023e8a",
            accent: "#90e0ef",
            cardBg: "#ffffff",
            muted: "#555"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'SJ',
        vantaColor: 0x0077b6,
        vantaEffect: 'waves',
        vantaConfig: { color: 0x0077b6, shininess: 40.00, waveHeight: 15.00, waveSpeed: 0.8, zoom: 0.8 },
        ctaStyle: 'familiar',
        ctaLabel: 'Take the Next Step'
    },
    ESTJ: {
        colors: {
            primary: "#03045e",
            secondary: "#0077b6",
            background: "#ffffff",
            text: "#03045e",
            accent: "#e63946",
            cardBg: "#f8f9fa",
            muted: "#444"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'SJ',
        vantaColor: 0x0077b6,
        vantaEffect: 'waves',
        vantaConfig: { color: 0x03045e, shininess: 50.00, waveHeight: 25.00, waveSpeed: 1.0, zoom: 1.0 },
        ctaStyle: 'business',
        ctaLabel: 'Buy Now'
    },
    ESFJ: {
        colors: {
            primary: "#fb8500",
            secondary: "#ffb703",
            background: "#ffffff",
            text: "#023047",
            accent: "#219ebc",
            cardBg: "rgba(33, 158, 188, 0.05)",
            muted: "#555"
        },
        fonts: {
            heading: '"Inter", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'SJ',
        vantaColor: 0x0077b6,
        vantaEffect: 'waves',
        vantaConfig: { color: 0xfb8500, shininess: 30.00, waveHeight: 20.00, waveSpeed: 1.1, zoom: 0.9 },
        ctaStyle: 'friendly',
        ctaLabel: 'Recommended'
    },
    ISTP: {
        colors: {
            primary: "#333533",
            secondary: "#202020",
            background: "#000000",
            text: "#ffffff",
            accent: "#f5cb5c",
            cardBg: "#242424",
            muted: "#666"
        },
        fonts: {
            heading: '"IBM Plex Mono", monospace',
            body: '"IBM Plex Sans", sans-serif'
        },
        layoutType: 'SP',
        vantaColor: 0xf5cb5c,
        vantaEffect: 'rings',
        vantaConfig: { color: 0xf5cb5c, backgroundColor: 0x000000, backgroundAlpha: 1.0 },
        ctaStyle: 'utilitarian',
        ctaLabel: 'Get Tool'
    },
    ISFP: {
        colors: {
            primary: "#cdb4db",
            secondary: "#ffafcc",
            background: "#121212",
            text: "#fefae0",
            accent: "#a2d2ff",
            cardBg: "rgba(255, 255, 255, 0.05)",
            muted: "#888"
        },
        fonts: {
            heading: '"Cormorant Garamond", serif',
            body: '"Montserrat", sans-serif'
        },
        layoutType: 'SP',
        vantaColor: 0xff006e,
        vantaEffect: 'globe',
        vantaConfig: { color: 0xff006e, color2: 0x8338ec, size: 1.2, backgroundColor: 0x121212 },
        ctaStyle: 'lively',
        ctaLabel: 'Jump In'
    }
};
