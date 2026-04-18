export interface QuizQuestion {
    id: number;
    dimension: 'EI' | 'SN' | 'TF' | 'JP';
    question: string;
    optionA: {
        text: string;
        value: 'I' | 'S' | 'T' | 'J';
        description: string;
        icon: string;
        image?: string;
    };
    optionB: {
        text: string;
        value: 'E' | 'N' | 'F' | 'P';
        description: string;
        icon: string;
        image?: string;
    };
    affirmation: string;
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        dimension: 'EI',
        question: 'When you are emotionally depleted after a long week, your instinct is to...',
        optionA: {
            text: 'Withdraw into my sanctuary to process in silence.',
            value: 'I',
            description: "You require an internal void to untangle the world.",
            icon: 'User',
            image: '/images/quiz/traits/introversion_neon_1772144748570.png'
        },
        optionB: {
            text: 'Seek out kinetic environments and external energy.',
            value: 'E',
            description: "You require external friction to feel alive and present.",
            icon: 'Users',
            image: '/images/quiz/traits/extraversion_neon_1772144767320.png'
        },
        affirmation: 'System updating blueprint...'
    },
    {
        id: 2,
        dimension: 'SN',
        question: 'When learning a complex new skill, you naturally look for...',
        optionA: {
            text: 'Concrete steps, historical precedents, and tangible proof.',
            value: 'S',
            description: "You trust what can be measured and verified in reality.",
            icon: 'Eye',
            image: '/images/quiz/traits/sensing_neon_1772144782849.png'
        },
        optionB: {
            text: 'Underlying patterns, abstract theories, and future potential.',
            value: 'N',
            description: "You trust what exists in the spaces between the facts.",
            icon: 'Sparkles',
            image: '/images/quiz/traits/intuition_neon_1772144801174.png'
        },
        affirmation: 'Cognitive layer mapped.'
    },
    {
        id: 3,
        dimension: 'TF',
        question: 'During a high-stakes disagreement, you ultimately defer to...',
        optionA: {
            text: 'Objective truth, regardless of how uncomfortable it is.',
            value: 'T',
            description: "Logic is your absolute anchor.",
            icon: 'Brain',
            image: '/images/quiz/traits/thinking_neon_1772144827200.png'
        },
        optionB: {
            text: 'Relational harmony and the emotional impact on others.',
            value: 'F',
            description: "Empathy is your absolute anchor.",
            icon: 'Heart',
            image: '/images/quiz/traits/thinking_neon_1772144827200.png'
        },
        affirmation: 'Decision matrix confirmed.'
    },
    {
        id: 4,
        dimension: 'JP',
        question: 'To feel a sense of control over your life, you need...',
        optionA: {
            text: 'Decisive structure, finalized plans, and closed loops.',
            value: 'J',
            description: "You architect reality through order.",
            icon: 'ListChecks',
            image: '/images/quiz/traits/thinking_neon_1772144827200.png'
        },
        optionB: {
            text: 'Open options, fluid adaptability, and spontaneous flow.',
            value: 'P',
            description: "You architect reality through adaptation.",
            icon: 'Compass',
            image: '/images/quiz/traits/thinking_neon_1772144827200.png'
        },
        affirmation: 'Subconscious pattern locked.'
    }
];

export function calculateMBTI(answers: { q1: 'A' | 'B'; q2: 'A' | 'B'; q3: 'A' | 'B'; q4: 'A' | 'B' }): string {
    const q1Value = answers.q1 === 'A' ? quizQuestions[0].optionA.value : quizQuestions[0].optionB.value;
    const q2Value = answers.q2 === 'A' ? quizQuestions[1].optionA.value : quizQuestions[1].optionB.value;
    const q3Value = answers.q3 === 'A' ? quizQuestions[2].optionA.value : quizQuestions[2].optionB.value;
    const q4Value = answers.q4 === 'A' ? quizQuestions[3].optionA.value : quizQuestions[3].optionB.value;

    return `${q1Value}${q2Value}${q3Value}${q4Value}`.toLowerCase();
}
