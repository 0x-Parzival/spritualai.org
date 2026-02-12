import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About the Creator | Keshav Baliyan (0xParzival)",
    description: "Meet Keshav Baliyan, the architect behind Spiritual AI. Exploring the intersection of Vedic wisdom, artificial intelligence, and cognitive architecture.",
    keywords: "Keshav Baliyan, 0xParzival, Spiritual AI creator, system architect, Vedic AI, cognitive architecture, MBTI expert",
};

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
