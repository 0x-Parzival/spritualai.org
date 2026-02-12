import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Your MBTI Personality Type | Spiritual AI Assessment',
  description: 'Take our free personality assessment to discover your MBTI type and cognitive architecture. Get personalized spiritual and productivity guidance tailored to how you think.',
  keywords: ['spiritual ai', 'mbti', 'personality type', 'mbti quiz', 'personality assessment'],
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
