import { MBTIProfile } from "./types";

export const productsData: Record<string, MBTIProfile> = {
    INTP: {
        id: "intp",
        name: "The Logician",
        artistic_vibe: "Abstract, fractals, sacred geometry, neon-noir, cyberpunk, blueprints, deep space, neural networks. They love seeing the 'code' behind reality.",
        psychological_triggers: [
            "Intellectual Autonomy",
            "Efficiency & Competence",
            "Avoiding Social/Bureaucratic drudgery",
            "Understanding the 'System'",
            "Novelty & Innovation"
        ],
        products: [
            {
                id: "focus-mastery",
                title: "How to Master Focus without Rigid Schedules in 7 Days",
                script: {
                    headline: "How to Enter Deep Flow on Command Without Creating Soul-Sucking Spreadsheets or waking up at 5AM",
                    subheadline: "For the mind that never stops running: A non-linear system for extreme productivity.",
                    hook_image_prompt: "A glowing neural network arranging itself into a perfect crystal structure in a void.",
                    pain_story: "You have 50 tabs open. You have 3 half-started businesses and a novel you haven't touched in a year. The world tells you to 'use a planner' or 'stick to a routine', but structure feels like a prison to you. The real problem isn't your discipline; it's that standard productivity advice is built for linear thinkers, not for expansive architects like you.",
                    agitation_bullets: [
                        "Analysis Paralysis: Spending more time researching the perfect tool than doing the work.",
                        "The Start-Stop Cycle: Burst of manic energy followed by weeks of guilt-ridden inactivity.",
                        "Intellectual Boredom: Abandoning projects the moment the 'puzzle' is solved, leaving money on the table."
                    ],
                    transition_mechanism: "The 'Chaos-Order' Protocol. Instead of fighting your erratic energy, we use AI to predict your energy spikes and align tasks to your neuro-rhythm.",
                    product_name: "The Flux-State Architect (AI System)",
                    product_description: "An AI-powered workspace that adapts to YOUR brain. It doesn't force a schedule; it curates your 'Next Logical Step' based on your current dopamine levels.",
                    features_bullets: [
                        "AI Dopamine Mapping: Predicts your crash before it happens.",
                        "The 'Novelty Injection' Algorithm: Gamifies boring tasks automatically.",
                        "Context-Switching Vault: Save your state instantly so you can switch tasks without losing IQ points."
                    ],
                    price_original: "$199",
                    price_discounted: "$47",
                    bonuses: [
                        { title: "The 'Rabbit Hole' Blocker", description: "Browser extension that allows research but stops infinite scroll.", value: "$29" },
                        { title: "INTP Sleep Hacking Guide", description: "How to turn off the analysis engine at night.", value: "$19" }
                    ],
                    guarantee_text: "If you don't feel more intellectually free and productive in 30 days, we'll refund you and apologize for wasting your brain cycles.",
                    scarcity_text: "Beta access limited to the first 100 Logicians.",
                    cta_text: "Initialize System"
                }
            },
            {
                id: "social-hacking",
                title: "How to Hack Social Dynamics without Faking Etiquette in 2 Weeks",
                script: {
                    headline: "How to Network Like a Power Broker Without 'Small Talk' or Fake Smiles",
                    subheadline: "Treat human interaction like a system to be optimized, not a performance to be endured.",
                    hook_image_prompt: "A digital HUD overlay on a crowd of people showing social connection lines and probability stats.",
                    pain_story: "Small talk is torture. You see through the social games people play, and it feels inauthentic to participate. But you know that your genius ideas are dying because you avoid 'networking'. The problem isn't that you are anti-social; it's that you are trying to socialize emotionally instead of logically.",
                    agitation_bullets: [
                        "The 'Awkward Silence' spiral where you overanalyze every micro-expression.",
                        "Being seen as 'arrogant' or 'aloof' when you're actually just deep in thought.",
                        "Losing opportunities to less competent people who are just 'better at talking'."
                    ],
                    transition_mechanism: "Social Pattern Recognition. Humans are predictable algorithms. Once you see the code, you can navigate the maze.",
                    product_name: "The Social Algorithm Decoder",
                    product_description: "A framework that deconstructs social interactions into logical flowcharts. No emotion required—just pure pattern matching.",
                    features_bullets: [
                        "The 'Conversation Tree' AI Trainer: Practice scenarios with an AI that gives logical feedback.",
                        "Micro-Expression Database: Learn to read data from faces like a book.",
                        "The 'Authentic Mask': How to be charming without lying about who you are."
                    ],
                    price_original: "$299",
                    price_discounted: "$67",
                    bonuses: [
                        { title: "The Introvert's Energy Shield", description: "Techniques to socialize for hours without draining your battery.", value: "$47" },
                        { title: "Email Scripts for Geniuses", description: "Templates to sound warm without typing emojis.", value: "$27" }
                    ],
                    guarantee_text: "Use it for one networking event. If you don't get a meaningful connection, full refund.",
                    scarcity_text: "Pattern set expiring soon.",
                    cta_text: "Download The Social Code"
                }
            },
            {
                id: "skill-upload",
                title: "How to Learn Any Skill without Boring Repetition in 48 Hours",
                script: {
                    headline: "Upload Skills to Your Brain Like Neo. No 10,000 Hours. Just Pure Data Compression.",
                    subheadline: "For the INTP who wants to know EVERYTHING but hates the grind.",
                    hook_image_prompt: "A human silhouette with data streams entering the mind, creating a glowing galaxy inside.",
                    pain_story: "You love the beginning of learning—the discovery, the concepts. But the moment it becomes 'practice', you check out. You have a graveyard of half-learned languages, instruments, and coding frameworks. Traditional education is too slow for your RAM.",
                    agitation_bullets: [
                        "The 'Jack of All Trades' curse: Good at everything, master of nothing.",
                        "Frustration with slow instructors who explain things you grasped in 5 seconds.",
                        "Giving up right before the breakthrough because the novelty wore off."
                    ],
                    transition_mechanism: "First Principles Extraction. We don't learn 'steps'; we download the 'source code' of the skill using AI recursion.",
                    product_name: "The Neo-Learning Protocol",
                    product_description: "An AI tool that strips away the fluff and gives you the raw logic gates of any skill. Learn the 20% that gives 80% of results.",
                    features_bullets: [
                        "Skill Decompiler: Feed the AI a textbook, get a 1-page logic map.",
                        "Spaced Repetition for Lazy Geniuses: Algorithms that remind you only when you're about to forget.",
                        "The 'Simulation' Mode: Virtual practice environments that adapt to your speed."
                    ],
                    price_original: "$150",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "Speed Reading for Code", description: "Consume technical documentation in minutes.", value: "$39" }
                    ],
                    guarantee_text: "Learn a new skill this weekend or your money back.",
                    scarcity_text: "Algorithm update pending.",
                    cta_text: "Start Upload"
                }
            },
            {
                id: "existential-purpose",
                title: "How to Find Your Life Purpose without Woo-Woo Nonsense in 60 Minutes",
                script: {
                    headline: "Solve the 'Meaning of Life' Equation. No Crystals, No Chanting, Just Logic.",
                    subheadline: "Turn your existential dread into a grand unified theory of your life.",
                    hook_image_prompt: "A man standing at the edge of a digital cliff looking at a sunrise made of geometric shapes.",
                    pain_story: " Nihilism is your default state. You see the absurdity of existence. 'Follow your passion' sounds like a joke. You're paralyzed not because you can't do anything, but because you can't see WHY you should do anything. You need a purpose that creates a logical axiom for action.",
                    agitation_bullets: [
                        "The endless 'Why Bother?' loop.",
                        "Feeling intellectually superior but existentially empty.",
                        "Watching less smart people succeed because they have 'faith' you can't replicate."
                    ],
                    transition_mechanism: "Axiomatic Value Alignment. We build meaning from the bottom up using logical proofs, not feelings.",
                    product_name: "The Existential Architect Blueprint",
                    product_description: "A guided AI framework to construct a personal philosophy that is logically consistent and emotionally resonant.",
                    features_bullets: [
                        "The 'Core Axiom' Finder: Identify the one truth you can't deny.",
                        "Purpose Modeling: Simulate different life paths to see which yields the highest utility.",
                        "The Legacy Algorithm: Calculate your impact probability."
                    ],
                    price_original: "$249",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Nihilism Antidote Audio", description: "Logical arguments to get out of bed.", value: "$25" }
                    ],
                    guarantee_text: "Find a logical reason to exist or full refund.",
                    scarcity_text: "Limited workshop slots.",
                    cta_text: "Construct Meaning"
                }
            },
            {
                id: "passive-income-systems",
                title: "How to Automate Your Income without Marketing Sleaze in 30 Days",
                script: {
                    headline: "Build a Money Machine That Runs on Logic, Not Charisma.",
                    subheadline: "Stop trading time for money. Start building assets that exist independently of your labor.",
                    hook_image_prompt: "A complex clockwork machine made of gold and light, generating coins in a dark room.",
                    pain_story: "You hate selling. You hate self-promotion. You hate the corporate ladder. You want resources to fund your experiments, but you refuse to dance for the algorithm. You need income that respects your need for solitude.",
                    agitation_bullets: [
                        "Draining your soul in a 9-5 just to pay rent.",
                        "Trying dropshipping/crypto and realizing it's all hype.",
                        "The fear that you'll never be free to just THINK."
                    ],
                    transition_mechanism: "The 'Invisible Engine'. Systems that provide value automatically through code and content, requiring zero direct human interaction after setup.",
                    product_name: "The Silent Empire Builder",
                    product_description: "A complete guide to building 'No-Code' SaaS and digital assets that sell themselves via search intent, not social hype.",
                    features_bullets: [
                        "The 'Problem-Solver' Bot: How to create precision tools people search for.",
                        "Automated Trust Funnels: Selling with logic and proof, not emotion.",
                        "Zero-Maintenance Stacks: Tech setups that don't break."
                    ],
                    price_original: "$499",
                    price_discounted: "$97",
                    bonuses: [
                        { title: "The Introvert's Marketing Plan", description: "How to get traffic without posting a selfie.", value: "$59" }
                    ],
                    guarantee_text: "Launch one asset in 30 days or money back.",
                    scarcity_text: "System capacity filling up.",
                    cta_text: "Build The Machine"
                }
            }
        ]
    },
    // Placeholders for other types can be added here
};
