export interface QuizQuestion {
    id: number;
    dimension: 'EI' | 'SN' | 'TF' | 'JP';
    question: string;
    optionA: {
        text: string;
        value: 'I' | 'S' | 'T' | 'J';
        description: string;
        icon: string;
    };
    optionB: {
        text: string;
        value: 'E' | 'N' | 'F' | 'P';
        description: string;
        icon: string;
    };
    affirmation: string;
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        dimension: 'EI',
        question: 'Energy Orientation',
        optionA: {
            text: 'When I\'m alone, I feel like myself again.',
            value: 'I',
            description: "Silence doesn't feel empty — it gives my thoughts depth and clarity.",
            icon: 'User'
        },
        optionB: {
            text: 'Being around people or action energizes me.',
            value: 'E',
            description: "I discover who I am while engaging, responding, and moving with the world.",
            icon: 'Users'
        },
        affirmation: 'That makes sense.'
    },
    {
        id: 2,
        dimension: 'SN',
        question: 'Perception Style',
        optionA: {
            text: 'I trust what I can see, touch, and experience right now.',
            value: 'S',
            description: "Ideas matter most when they work in real life.",
            icon: 'Eye'
        },
        optionB: {
            text: 'I naturally look for meaning, patterns, and what\'s coming next.',
            value: 'N',
            description: "I often sense things before they fully happen.",
            icon: 'Sparkles'
        },
        affirmation: 'I see that in you.'
    },
    {
        id: 3,
        dimension: 'TF',
        question: 'Decision Core',
        optionA: {
            text: 'I make decisions by stepping back and analyzing.',
            value: 'T',
            description: "Clarity and fairness matter more than comfort.",
            icon: 'Brain'
        },
        optionB: {
            text: 'I decide by considering values and emotional impact.',
            value: 'F',
            description: "What feels aligned matters more than cold logic.",
            icon: 'Heart'
        },
        affirmation: 'That tracks.'
    },
    {
        id: 4,
        dimension: 'JP',
        question: 'Life Structure',
        optionA: {
            text: 'I feel at ease when things are clear and decided.',
            value: 'J',
            description: "Structure gives me mental peace.",
            icon: 'ListChecks'
        },
        optionB: {
            text: 'I feel free when options stay open.',
            value: 'P',
            description: "Too much planning drains my energy.",
            icon: 'Compass'
        },
        affirmation: 'That resonates.'
    }
];

export function calculateMBTI(answers: { q1: 'A' | 'B'; q2: 'A' | 'B'; q3: 'A' | 'B'; q4: 'A' | 'B' }): string {
    const q1Value = answers.q1 === 'A' ? quizQuestions[0].optionA.value : quizQuestions[0].optionB.value;
    const q2Value = answers.q2 === 'A' ? quizQuestions[1].optionA.value : quizQuestions[1].optionB.value;
    const q3Value = answers.q3 === 'A' ? quizQuestions[2].optionA.value : quizQuestions[2].optionB.value;
    const q4Value = answers.q4 === 'A' ? quizQuestions[3].optionA.value : quizQuestions[3].optionB.value;

    return `${q1Value}${q2Value}${q3Value}${q4Value}`.toLowerCase();
}
