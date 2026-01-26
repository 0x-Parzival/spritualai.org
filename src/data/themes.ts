import { MBTITheme } from "./types";

export const mbtiThemes: Record<string, MBTITheme> = {
    INTJ: {
        colors: {
            primary: "#00BFFF",
            secondary: "#444444",
            background: "#050505",
            text: "#cfcfcf",
            accent: "#00BFFF",
            cardBg: "#0a0a0a",
            muted: "#555"
        },
        fonts: {
            heading: '"Inter", "IBM Plex Sans", sans-serif',
            body: '"IBM Plex Sans", sans-serif'
        },
        layoutType: 'NT',
        vantaColor: 0x7b2ff7,
        ctaStyle: 'sharp',
        ctaLabel: 'Access System'
    },
    INTP: {
        colors: {
            primary: "#7b2ff7",
            secondary: "#6c757d",
            background: "#0f0f12",
            text: "#e0e0e0",
            accent: "#9d50bb",
            cardBg: "#16161a",
            muted: "#888"
        },
        fonts: {
            heading: '"JetBrains Mono", monospace',
            body: '"Inter", sans-serif'
        },
        layoutType: 'NT',
        vantaColor: 0x7b2ff7,
        ctaStyle: 'minimal',
        ctaLabel: 'Explore'
    },
    ENTJ: {
        colors: {
            primary: "#e63946",
            secondary: "#d4af37",
            background: "#000000",
            text: "#ffffff",
            accent: "#d4af37",
            cardBg: "#0a0a0a",
            muted: "#666"
        },
        fonts: {
            heading: '"Playfair Display", serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'NT',
        vantaColor: 0x7b2ff7,
        ctaStyle: 'bold',
        ctaLabel: 'Execute'
    },
    ENTP: {
        colors: {
            primary: "#ff9f1c",
            secondary: "#2ec4b6",
            background: "#011627",
            text: "#fdfffc",
            accent: "#e71d36",
            cardBg: "rgba(253, 255, 252, 0.05)",
            muted: "#aaa"
        },
        fonts: {
            heading: '"Outfit", sans-serif',
            body: '"Outfit", sans-serif'
        },
        layoutType: 'NT',
        vantaColor: 0x7b2ff7,
        ctaStyle: 'playful',
        ctaLabel: 'Try This'
    },
    INFJ: {
        colors: {
            primary: "#8e94f2",
            secondary: "#bbd0ff",
            background: "#121212",
            text: "#e2e2e2",
            accent: "#c77dff",
            cardBg: "rgba(255, 255, 255, 0.03)",
            muted: "#777"
        },
        fonts: {
            heading: '"Lora", serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'NF',
        vantaColor: 0x15803d,
        ctaStyle: 'elegant',
        ctaLabel: 'Begin Your Journey'
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
        layoutType: 'NF',
        vantaColor: 0x15803d,
        ctaStyle: 'gentle',
        ctaLabel: 'Explore Gently'
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
        vantaColor: 0xf5cb5c,
        ctaStyle: 'aesthetic',
        ctaLabel: 'Experience This'
    },
    ESTP: {
        colors: {
            primary: "#e63946",
            secondary: "#1d3557",
            background: "#000000",
            text: "#ffffff",
            accent: "#f1faee",
            cardBg: "#111111",
            muted: "#999"
        },
        fonts: {
            heading: '"Antonio", sans-serif',
            body: '"Inter", sans-serif'
        },
        layoutType: 'SP',
        vantaColor: 0xf5cb5c,
        ctaStyle: 'punchy',
        ctaLabel: 'Get It Now'
    },
    ESFP: {
        colors: {
            primary: "#ff006e",
            secondary: "#8338ec",
            background: "#ffffff",
            text: "#3a0ca3",
            accent: "#ffbe0b",
            cardBg: "#ff006e10",
            muted: "#444"
        },
        fonts: {
            heading: '"Fredoka", sans-serif',
            body: '"Lexend", sans-serif'
        },
        layoutType: 'SP',
        vantaColor: 0xf5cb5c,
        ctaStyle: 'lively',
        ctaLabel: 'Jump In'
    }
};
