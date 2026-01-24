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
    ENTJ: {
        id: "entj",
        name: "The Commander",
        artistic_vibe: "Bold, obsidian, gold, imperial, structural, sleek skyscrapers, high-contrast, commanding perspective.",
        psychological_triggers: [
            "Power & Influence",
            "Maximum Efficiency",
            "Legacy & Empire Building",
            "Strategic Dominance",
            "Crushing Incompetence"
        ],
        products: [
            {
                id: "empire-operating-system",
                title: "How to Build an Empire of One without Hiring Idiots in 30 Days",
                script: {
                    headline: "Scale Your Revenue, Not Your Headaches. The Solo-Monopoly Blueprint.",
                    subheadline: "For the leader who demands execution and refuses to tolerate incompetence.",
                    hook_image_prompt: "A lone figure on a throne made of server racks overlooking a digital city.",
                    pain_story: "You know you can lead, but most people are too slow to follow. You spend more time correcting mistakes than strategizing. You want the output of a corporation but the agility of a fighter jet. The bottleneck is human error.",
                    agitation_bullets: [
                        "Managing people who barely do the bare minimum.",
                        "Watching revenue stall because you can't clone yourself.",
                        "Knowing you're destined for greatness but being stuck in operations."
                    ],
                    transition_mechanism: "Algorithmic Leverage. Replace middle management with automation and AI agents that never sleep or complain.",
                    product_name: "The Sovereign Stack",
                    product_description: "A complete tech stack for the ruthless executor. Automate 90% of your business logic so you only make high-level decisions.",
                    features_bullets: [
                        "The 'Virtual C-Suite': AI agents configured to handle ops, marketing, and support.",
                        "Ruthless SOP Templates: Plug-and-play processes that leave no room for error.",
                        "Dashboard Dominance: One screen to view your entire empire's health."
                    ],
                    price_original: "$997",
                    price_discounted: "$197",
                    bonuses: [
                        { title: "Fire Your Agency Guide", description: "How to bring marketing in-house with AI.", value: "$97" },
                        { title: "Ironclad Legal Templates", description: "Contracts that protect your throne.", value: "$197" }
                    ],
                    guarantee_text: "Save 20 hours a week or we pay your hourly rate.",
                    scarcity_text: "Price increases as we add more agents.",
                    cta_text: "Seize Control"
                }
            },
            {
                id: "ruthless-execution",
                title: "How to Execute 12 Months of Work in 12 Weeks without Burnout",
                script: {
                    headline: "Stop Planning. Start Conquering. The War-Room Protocol.",
                    subheadline: "Speed is the ultimate weapon. Demolish your roadmap.",
                    hook_image_prompt: "A war room map with targets being eliminated in rapid succession.",
                    pain_story: "You have a vision, but reality is moving too slow. Teams drag their feet. Projects creep. You feel the urgency of time slipping away, but everyone else is content with mediocrity. You need a velocity shift.",
                    agitation_bullets: [
                        "Death by meetings.",
                        "The slow drift of deadlines.",
                        "Losing market share to faster, dumber competitors."
                    ],
                    transition_mechanism: "The Blitzscale Cadence. Military-grade time compression techniques used by elite special forces.",
                    product_name: "Velocity OS",
                    product_description: "A project management framework that treats business like warfare. No fluff, just objectives and key results.",
                    features_bullets: [
                        "The 'Kill Switch': How to identify and cut low-ROI projects instantly.",
                        "Sprint Warfare: 2-week cycles that produce shippable results or get scrapped.",
                        "Energy Deployment: Aligning your biological peak with critical decisions."
                    ],
                    price_original: "$299",
                    price_discounted: "$67",
                    bonuses: [
                        { title: "Zero-Inbox Aggression", description: "Process email like a machine gun.", value: "$47" }
                    ],
                    guarantee_text: "Double your output velocity or full refund.",
                    scarcity_text: "The market won't wait.",
                    cta_text: "Execute Now"
                }
            },
            {
                id: "strategic-dominance",
                title: "How to Outmaneuver Any Competitor without Lowering Your Prices",
                script: {
                    headline: "Checkmate in 3 Moves. While They Play Checkers, You Conquer the Board.",
                    subheadline: "Grand strategy applied to modern business.",
                    hook_image_prompt: "A chessboard where the pieces are skyscrapers and brands.",
                    pain_story: "You see competitors winning with inferior products and it enrages you. They use cheap tactics and hype. You refuse to lower your standards, but you need to crush them. You need a strategy that makes them irrelevant.",
                    agitation_bullets: [
                        "Pricing wars that race to the bottom.",
                        "Copycats stealing your features.",
                        "Market noise drowning out your quality."
                    ],
                    transition_mechanism: "Asymmetric Warfare. Leverage your unique strengths to attack where they are weakest.",
                    product_name: "The Grandmaster's Playbook",
                    product_description: "A strategic library of business moves derived from history's greatest conquerors, adapted for the digital age.",
                    features_bullets: [
                        "The 'Blue Ocean' Radar: Find profitable niches your enemies can't see.",
                        "Brand Fortification: Build a moat they cannot cross.",
                        "Psychological Pricing: Charge more and have them thank you for it."
                    ],
                    price_original: "$499",
                    price_discounted: "$89",
                    bonuses: [
                        { title: "Sun Tzu for SaaS", description: "Ancient wisdom for recurring revenue.", value: "$39" }
                    ],
                    guarantee_text: "Find a winning angle or refund.",
                    scarcity_text: "Strategy session intake closing.",
                    cta_text: "Dominate Market"
                }
            },
            {
                id: "executive-presence",
                title: "How to Command Any Room without saying a Word in 3 Seconds",
                script: {
                    headline: "They Will Listen. Not Because You Ask, But Because You Are.",
                    subheadline: "Project undeniable authority.",
                    hook_image_prompt: "A silhouette in a boardroom casting a shadow that commands attention.",
                    pain_story: "You have the answers, but you have to fight to be heard. You watch lesser minds take the stage. You know that if they just listened to you, everything would work. The problem isn't your logic; it's your transmission.",
                    agitation_bullets: [
                        "Being interrupted.",
                        "Having your ideas stolen and repeated back to you.",
                        "Feeling invisible despite being the smartest in the room."
                    ],
                    transition_mechanism: "Primal Authority Signaling. Bypass the logical brain and speak directly to their instinct to follow a leader.",
                    product_name: "The Commander's Aura",
                    product_description: "A guide to voice modulation, posture, and micro-behaviors that signal status.",
                    features_bullets: [
                        "The 'Voice of God' Training: Lower your pitch, increase your weight.",
                        "Eye Contact Dominance: Stare into their soul without being creepy.",
                        "Space Occupation: Own the physical environment."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Wardrobe Power Dynamics", description: "Dress like you own the place.", value: "$29" }
                    ],
                    guarantee_text: "Command respect or get your money back.",
                    scarcity_text: "Limited coaching spots.",
                    cta_text: "Assume Command"
                }
            },
            {
                id: "legacy-trust",
                title: "How to Ensure Your Vision Survives without Micro-Managing in Perpetuity",
                script: {
                    headline: "Build Something That Outlasts You. The Ultimate ROI is Immortality.",
                    subheadline: "Institutionalize your genius.",
                    hook_image_prompt: "A statue made of light networks being built by automated drones.",
                    pain_story: "If you stopped working today, everything would collapse. You've built a job, not a legacy. You are the single point of failure. This terrifies you, not because you fear poverty, but because you fear your work vanishing.",
                    agitation_bullets: [
                        "The 'Bus Factor' of 1.",
                        "Being unable to sell your company because YOU are the company.",
                        "Watching systems degrade the moment you look away."
                    ],
                    transition_mechanism: "DNA Codification. Download your brain into principles, not just tasks.",
                    product_name: "The Infinite Company Framework",
                    product_description: "How to turn your values into algorithms and culture that self-replicates.",
                    features_bullets: [
                        "The Culture Code Generator: Automated onboarding that brainwashes (positively) new hires.",
                        "Decision Trees: Let staff make YOUR decisions without calling you.",
                        "Succession Planning for Solopreneurs."
                    ],
                    price_original: "$599",
                    price_discounted: "$129",
                    bonuses: [
                        { title: "The Exit Strategy", description: "Prepare to sell for 10x multiples.", value: "$99" }
                    ],
                    guarantee_text: "Remove yourself from ops in 60 days.",
                    scarcity_text: "Legacy tier closing.",
                    cta_text: "Build Forever"
                }
            }
        ]
    },
    INTJ: {
        id: "intj",
        name: "The Architect",
        artistic_vibe: "Minimalist, chess-like, stark, monochromatic, architectural blueprints, solitary peaks, cold precision, hidden depth.",
        psychological_triggers: [
            "Mastery & Competence",
            "Strategic Optimization",
            "Intellectual Superiority",
            "Efficiency & Systematization",
            "Hidden Knowledge"
        ],
        products: [
            {
                id: "system-of-life",
                title: "How to Systemize Your Entire Life without Losing Your Soul in 3 Days",
                script: {
                    headline: "Your Life is a System. It's Time to Debug It.",
                    subheadline: "Optimization isn't just for code. Apply systems thinking to health, wealth, and happiness.",
                    hook_image_prompt: "A vitruvian man overlaid with glowing circuit schematics.",
                    pain_story: "You see the inefficiencies every day. The wasted time in traffic, the repetitive conversations, the suboptimal nutrition. It drains you. You know there is a perfect way to live, but reality keeps introducing entropy.",
                    agitation_bullets: [
                        "Dealing with repetitive, low-value tasks.",
                        "Feeling exhausted by the chaos of other people.",
                        "Knowing you're operating at 60% capacity due to friction."
                    ],
                    transition_mechanism: "Life-Architecture. We don't 'try harder'. We re-engineer the environment so success is the path of least resistance.",
                    product_name: "The Life OS Kernel",
                    product_description: "A comprehensive Notion & AI template that manages your goals, habits, and knowledge. A dashboard for your existence.",
                    features_bullets: [
                        "The 'Entropy Shield': Routines that prevent chaos creep.",
                        "Automated Health Tracking: data-driven biology.",
                        "Resource Allocation Protocol: Invest time like capital."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Meal Prep Algorithms", description: "Nutrition solved mathematically.", value: "$19" }
                    ],
                    guarantee_text: "Increase efficiency by 30% or refund.",
                    scarcity_text: "Version 2.0 launch price.",
                    cta_text: "Optimize Life"
                }
            },
            {
                id: "master-strategy",
                title: "How to Think 10 Steps Ahead of Everyone Else without Stress",
                script: {
                    headline: "While They Panic, You Plan. The Art of Future-Casting.",
                    subheadline: "Predict outcomes with uncanny accuracy.",
                    hook_image_prompt: "A hand moving a single piece on a 3D glass chessboard that ripples into the future.",
                    pain_story: "People call you pessimistic, but you're just realistic. You see the disaster coming before anyone else. It's frustrating to be right and ignored. You need a way to not just predict, but to capitalize.",
                    agitation_bullets: [
                        "Watching others walk into traps you saw miles away.",
                        "Being labeled a 'dreamer' or 'planner' but not a doer.",
                        "Paralysis by over-calculation."
                    ],
                    transition_mechanism: "Applied Game Theory. Turn your intuition into a calculable model.",
                    product_name: "The Grand Strategy Engine",
                    product_description: "Mental models from chess, war, and economics to navigate career and life.",
                    features_bullets: [
                        "Second-Order Thinking Drills: See the consequence of the consequence.",
                        "Scenario Planning Templates: Plan A, B, C, and D.",
                        "The 'Checkmate' Negotiation Tactic."
                    ],
                    price_original: "$249",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Risk Mitigation Checklists", description: "Bulletproof your plans.", value: "$29" }
                    ],
                    guarantee_text: "Predict and win or refund.",
                    scarcity_text: "Limited strategic intake.",
                    cta_text: "Begin Simulation"
                }
            },
            {
                id: "competence-multiplier",
                title: "How to Achieve Top 1% Competence in Any Field in 6 Months",
                script: {
                    headline: "Mastery is not Magic. It is a Process. Hack the Process.",
                    subheadline: "For the Architect who settles for nothing less than perfection.",
                    hook_image_prompt: "A fractal pattern zooming in infinitely, revealing more complexity and order.",
                    pain_story: "Incompetence offends you. You hate being a novice. You want to be the expert, the authority, the one who KNOWS. But traditional learning is filled with fluff and social activities you hate.",
                    agitation_bullets: [
                        "Being taught by people who know less than you.",
                        "The slow pace of 'group learning'.",
                        "The gap between your taste and your ability."
                    ],
                    transition_mechanism: "Deep Work Immersion. Absolute isolation and focus combined with deliberate practice.",
                    product_name: "The Expertise Accelerator",
                    product_description: "A protocol for rapid skill acquisition using isolation tanks and feedback loops.",
                    features_bullets: [
                        "The 'Monk Mode' Schedule: How to disappear and re-emerge as a god.",
                        "Feedback Loop Design: Creating automated critique.",
                        "The Canon: Curated reading lists for foundational knowledge."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Imposter Syndrome Killer", description: "Use logic to defeat insecurity.", value: "$25" }
                    ],
                    guarantee_text: "Master the basics in record time.",
                    scarcity_text: "Protocol active.",
                    cta_text: "Start Mastery"
                }
            },
            {
                id: "intellectual-dominance",
                title: "How to Win Every Argument with Pure Logic without Raising Your Voice",
                script: {
                    headline: "Truth is the Ultimate Weapon. Wield it with Surgical Precision.",
                    subheadline: "Dismantle bad ideas and enforce rationality.",
                    hook_image_prompt: "A laser beam cutting through fog, revealing the path.",
                    pain_story: "You are constantly surrounded by illogical assertions. Emotional reasoning drives you crazy. You try to explain the facts, but people get defensive. You need a way to deliver truth that penetrates their emotional armor.",
                    agitation_bullets: [
                        "Losing debates to charismatic idiots.",
                        "Frustration with 'feelings' overriding facts.",
                        "Being called 'cold' for being right."
                    ],
                    transition_mechanism: "Socratic Inception. Don't tell them they are wrong; ask questions that force them to realize it.",
                    product_name: "The Logicblade",
                    product_description: "Rhetorical strategies for the rational mind.",
                    features_bullets: [
                        "The Fallacy Detector: Identify errors in real-time.",
                        "Steel-Manning: How to argue their side better than them, then destroy it.",
                        "The 'Silence' Tactic: Using pauses to let them implode."
                    ],
                    price_original: "$129",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Handling Emotional Outbursts", description: "A field guide for the rational.", value: "$19" }
                    ],
                    guarantee_text: "Win your next debate.",
                    scarcity_text: "Knowledge is power.",
                    cta_text: "Sharpen Mind"
                }
            },
            {
                id: "solo-empire",
                title: "How to run a Global Business from a Dark Room without Employees",
                script: {
                    headline: "You Don't Need a Team. You Need a System.",
                    subheadline: "The ultimate goal: A high-profit enterprise with ZERO human friction.",
                    hook_image_prompt: "A single person controlling a global network of lights from a tablet.",
                    pain_story: "You have the vision to build something huge, but the thought of managing people makes you sick. You don't want office parties. You want clean, efficient, automated output. You want to be the Wizard of Oz.",
                    agitation_bullets: [
                        "HR issues.",
                        "Motivation speeches.",
                        "Inefficient communication channels."
                    ],
                    transition_mechanism: "The Ghost Enterprise. Architecture utilizing SaaS, API integrations, and contractors only when necessary.",
                    product_name: "The Ghost Founder Blueprint",
                    product_description: "Architecture for a one-person unicorn.",
                    features_bullets: [
                        "The Automation Stack: Zapier/Make strategies.",
                        "Asynchronous Ops: Never attend a meeting again.",
                        "Productized Services: Sell outcomes, not time."
                    ],
                    price_original: "$399",
                    price_discounted: "$89",
                    bonuses: [
                        { title: "The Anti-Social Social Media Plan", description: "Growth without personality.", value: "$49" }
                    ],
                    guarantee_text: "Launch your ghost ship.",
                    scarcity_text: "Blueprints limited.",
                    cta_text: "Go Dark"
                }
            }
        ]
    },
    ENTP: {
        id: "entp",
        name: "The Debater",
        artistic_vibe: "Chaotic, glitch-art, colorful, explosive, steampunk, mad scientist lab, fragmented reality, energetic plasma.",
        psychological_triggers: [
            "Novelty & Innovation",
            "Intellectual Sparring",
            "Breaking the Rules",
            "Possibility & Potential",
            "Freedom from Boredom"
        ],
        products: [
            {
                id: "idea-machine",
                title: "How to Generate Million-Dollar Ideas on Demand without Writer's Block",
                script: {
                    headline: "Your Brain is a Nuclear Reactor. Stop Letting it Meltdown.",
                    subheadline: "Channel your chaotic energy into world-changing concepts.",
                    hook_image_prompt: "A lightbulb exploding into a thousand butterflies made of neon light.",
                    pain_story: "You have too many ideas, yet none of them stick. Or you have dry spells where you feel dull. You chase the shiny object, start 10 things, finish 0. You fear you'll be a 'potential' genius forever.",
                    agitation_bullets: [
                        "The graveyard of unfinished projects.",
                        "Boredom setting in the moment things get 'stable'.",
                        "People telling you to 'focus' when you want to explore."
                    ],
                    transition_mechanism: "Combinatorial Creativity. Don't focus; connect. We lean into the chaos.",
                    product_name: "The Idea Collider",
                    product_description: "A framework for smashing concepts together to create new value.",
                    features_bullets: [
                        "The 'Random Input' Generator: Force creative breakthroughs.",
                        "Rapid Prototyping: How to test an idea in 24 hours.",
                        "The Innovation Vault: Storing ideas so they don't rot."
                    ],
                    price_original: "$149",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "Shiny Object Syndrome Tamer", description: "How to pick the winner.", value: "$29" }
                    ],
                    guarantee_text: "Generate your next big thing or refund.",
                    scarcity_text: "Spark innovation only.",
                    cta_text: "Ignite Ideas"
                }
            },
            {
                id: "devil-advocate",
                title: "How to Persuade Anyone of Anything (Even if You Don't Believe it)",
                script: {
                    headline: "Reality is Negotiable. Bend it to Your Will.",
                    subheadline: "The dark art of verbal jiu-jitsu.",
                    hook_image_prompt: "A warped reality mirror showing what the person wants to see.",
                    pain_story: "You see the holes in everyone's logic. You know you can talk your way out of (or into) anything. But sometimes you push too hard and burn bridges. You want to win the game, not just the argument.",
                    agitation_bullets: [
                        "Accidentally offending people with 'logic'.",
                        "Being labeled a 'contrarian'.",
                        "Knowing you could sell ice to eskimos but lacking the product."
                    ],
                    transition_mechanism: "Cognitive Reframing. Don't argue facts; shift the frame of reference.",
                    product_name: "The Reality Distortion Field",
                    product_description: "Persuasion techniques modeled after Steve Jobs and cult leaders.",
                    features_bullets: [
                        "Frame Control: Make them play by your rules.",
                        "The 'Yes-Ladder': Psychological momentum.",
                        "Chaos Rhetoric: Disorient then lead."
                    ],
                    price_original: "$299",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Getting Out of Trouble", description: "Verbal self-defense.", value: "$39" }
                    ],
                    guarantee_text: "Win or refund.",
                    scarcity_text: "Dangerous knowledge.",
                    cta_text: "Bend Reality"
                }
            },
            {
                id: "chaos-surfing",
                title: "How to Thrive in Uncertainty when Everyone Else is Panicking",
                script: {
                    headline: "Chaos is a Ladder. Climb it.",
                    subheadline: "While others crave stability, you were born for the storm.",
                    hook_image_prompt: "A surfer riding a tidal wave of digital static and debris with a smile.",
                    pain_story: "Routine kills you. You feel dead in a stable 9-5. You come alive when things break, when the deadline is in an hour, when the plan fails. But society tries to medicate your energy. Stop fighting your nature.",
                    agitation_bullets: [
                        "Feeling trapped by safety.",
                        "Self-sabotaging just to feel something.",
                        "Being told to 'calm down'."
                    ],
                    transition_mechanism: "Antifragility. Build a life that gains from disorder.",
                    product_name: "The Chaos Surfer's Guide",
                    product_description: "How to position yourself to profit from volatility.",
                    features_bullets: [
                        "Crisis Management as a Career.",
                        "Investing in Volatility.",
                        "The 'Pivot' Mindset: Changing direction instantly."
                    ],
                    price_original: "$199",
                    price_discounted: "$47",
                    bonuses: [
                        { title: "Adrenaline Management", description: "Avoid the crash.", value: "$27" }
                    ],
                    guarantee_text: "Thrive or refund.",
                    scarcity_text: "Storm approaching.",
                    cta_text: "Ride the Wave"
                }
            },
            {
                id: "hack-the-system",
                title: "How to Bypass 10 Years of Career Laddering in 6 Months",
                script: {
                    headline: "Rules are for NPCs. You represent the Player Character.",
                    subheadline: "Find the backdoor to success.",
                    hook_image_prompt: "A person walking through a wall in a maze, leaving others behind.",
                    pain_story: "You see the 'path' everyone takes: School, Internship, Junior, Senior... It looks like a slow death. You know there's a shortcut. You know the system is rigged, so why play by the rules?",
                    agitation_bullets: [
                        "Waiting your turn.",
                        "Respecting authority that hasn't earned it.",
                        "The slow crawl of meritocracy."
                    ],
                    transition_mechanism: "Lateral Thinking. Move sideways to move up.",
                    product_name: "The Cheat Code Collection",
                    product_description: "Unconventional strategies for rapid advancement.",
                    features_bullets: [
                        "Social Engineering for Jobs.",
                        "The 'Expert' Facade: How to learn on the job.",
                        "Credential Hacking: Getting the badge without the debt."
                    ],
                    price_original: "$249",
                    price_discounted: "$69",
                    bonuses: [
                        { title: "Resume Hacking", description: "Beat the ATS.", value: "$29" }
                    ],
                    guarantee_text: "Skip the line or refund.",
                    scarcity_text: "Exploit patching soon.",
                    cta_text: "Enter Backdoor"
                }
            },
            {
                id: "monetize-adhd",
                title: "How to Turn Your 17 Different Hobbies into One Income Stream",
                script: {
                    headline: "You Are Not 'Unfocused'. You Are a Polymath.",
                    subheadline: "Monetize your curiosity.",
                    hook_image_prompt: "A Swiss Army knife where every tool is made of gold.",
                    pain_story: "You love coding. And cooking. And history. And guitar. Everyone tells you to 'niche down'. But picking one thing feels like cutting off a limb. You don't want to be a specialist; you want to be Da Vinci.",
                    agitation_bullets: [
                        "The 'Niche' trap.",
                        "Leaving money on the table from your 'useless' skills.",
                        "Feeling scattered and broke."
                    ],
                    transition_mechanism: "The Synthesis Model. Combine disparate skills to create a Category of One.",
                    product_name: "The Polymath's Payday",
                    product_description: "How to build a brand around your personality, not just a topic.",
                    features_bullets: [
                        "The 'Newsletter' Business Model.",
                        "Connecting Dots: Selling insight, not just info.",
                        "Audience building for the scattered."
                    ],
                    price_original: "$179",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Content Repurposing", description: "One idea, ten formats.", value: "$29" }
                    ],
                    guarantee_text: "Monetize your mind.",
                    scarcity_text: "Open to explorers.",
                    cta_text: "Unify Skills"
                }
            }
        ]
    },
    // Placeholders for other types can be added here
};
