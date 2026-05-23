import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ConsciousnessBlueprint from '@/components/home/ConsciousnessBlueprint';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ csn: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { csn } = await params;
  const blueprint = await prisma.blueprint.findUnique({
    where: { csn },
    select: { reportData: true, archetype: true, mbti: true },
  });

  if (!blueprint) return { title: 'Blueprint Not Found · Spiritual AI' };

  const rd = blueprint.reportData as any;
  const patternName = rd?.header?.patternName || blueprint.archetype.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  return {
    title: `${patternName} · Consciousness Blueprint · Spiritual AI`,
    description: `Decoded consciousness blueprint: ${patternName}. See the full psychic map, Vedic coordinates, and pattern dissolution path.`,
  };
}

export default async function BlueprintPage({ params }: Props) {
  const { csn } = await params;

  const blueprint = await prisma.blueprint.findUnique({
    where: { csn },
    include: { user: true },
  });

  if (!blueprint) notFound();

  const report = blueprint.reportData as any;

  // Normalize report shape
  const normalizedReport = {
    header: {
      architecture: report?.header?.architecture || blueprint.mbti,
      patternName: report?.header?.patternName || blueprint.archetype.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      urgencyPercent: report?.header?.urgencyPercent || 75,
      loc: report?.header?.loc || 0,
      csn: blueprint.csn,
    },
    meta: {
      frequencyEstimate: report?.meta?.frequencyEstimate || 'High — this pattern activates daily',
      coreShadowPattern: report?.meta?.coreShadowPattern || blueprint.archetype,
      rootBelief: report?.meta?.rootBelief || 'I am not enough as I am',
      dharmaPhase: report?.meta?.dharmaPhase || 'The Journey',
      identifiedProblem: report?.meta?.identifiedProblem || 'Unfulfilled potential',
    },
    vedicOverview: {
      lagnaAndMoon: report?.vedicOverview?.lagnaAndMoon || (blueprint as any).birthDate ? `Born ${(blueprint as any).birthDate}` : 'Add birth date to unlock',
      currentDasha: report?.vedicOverview?.currentDasha || 'Active growth period',
      saturnStatus: report?.vedicOverview?.saturnStatus || 'Discipline brings rewards',
    },
    validation: report?.validation || report?.mirror || 'What you have been calling a weakness is actually an unmet depth.',
    realCause: report?.realCause || 'A pattern installed before conscious choice was possible. Your mind made a decision to survive. That decision became automatic.',
    patternLoop: {
      trigger: report?.patternLoop?.trigger || 'New opportunity or challenge',
      copingMechanism: report?.patternLoop?.copingMechanism || 'Initial excitement followed by avoidance',
      humanCost: report?.patternLoop?.humanCost || 'Years of unfinished potential and growing self-doubt',
    },
    frequencyDoorway: report?.frequencyDoorway || 'Ship before you feel ready. Action precedes motivation.',
    teaching: report?.teaching || `As a ${blueprint.mbti}, your path is through disciplined action and self-compassion.`,
    witnessQuestion: report?.witnessQuestion || 'What would you do if you knew you could not fail?',
    scriptureOfTheSelf: report?.scriptureOfTheSelf || report?.scripture || `There was a mind that could see every possibility but committed to none. It danced at the edge of greatness, never stepping through. One day it realized: the door was not locked — it was never even closed. The only thing standing between the dream and reality was a single act of courage — to begin, to continue, to finish.`,
  };

  const products = (report?.products && report.products.length > 0)
    ? report.products
    : [
        {
          id: 'consciousness_blueprint',
          name: 'The Complete Consciousness Blueprint',
          headline: 'Your complete transformation system — all patterns, all paths.',
          whyYou: `Built for your architecture: ${blueprint.mbti} with ${blueprint.archetype}.`,
          formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'],
          price: 97,
          originalPrice: 197,
          urgencyLine: 'Complete system. Limited founding member pricing.',
          ctaText: 'Get My Blueprint',
        },
        {
          id: 'perfectionism_blueprint',
          name: 'The Perfectionism Dissolution Blueprint',
          headline: 'From paralysis to precision in 21 days.',
          whyYou: 'A systematic framework for the architecture behind your perfectionism.',
          formats: ['ebook', 'audiobook', 'mini_app'],
          price: 67,
          originalPrice: 127,
          urgencyLine: '89 people with your cognitive profile started this week.',
          ctaText: 'Start The System',
        },
        {
          id: 'shadow_work_journal',
          name: 'The Shadow Work Journal',
          headline: "Break the pattern you've been carrying for years.",
          whyYou: 'Built for the exact pattern running beneath your surface.',
          formats: ['ebook', 'audiobook', 'ai_chatbot'],
          price: 47,
          originalPrice: 97,
          urgencyLine: 'Downloaded by 247 people with your pattern this week.',
          ctaText: 'Begin The Break',
        },
      ];

  return (
    <ConsciousnessBlueprint
      report={normalizedReport}
      products={products}
      csn={blueprint.csn}
    />
  );
}
