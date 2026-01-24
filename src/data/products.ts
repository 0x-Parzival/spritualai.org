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
    INFJ: {
        id: "infj",
        name: "The Advocate",
        artistic_vibe: "Ethereal, mystical, deep violet, soft glowing light in darkness, ancient ruins, sacred geometry, dreamlike, spiritual solitude.",
        psychological_triggers: [
            "Deep Meaning & Purpose",
            "Harmonizing Humanity",
            "Hidden Insight",
            "Protecting the Vulnerable",
            "Authentic Connection"
        ],
        products: [
            {
                id: "emotional-shielding",
                title: "How to Stop Absorbing Everyone Else's Emotions in 24 Hours",
                script: {
                    headline: "You Are an Empath, Not a Sponge. Close Your Energetic Borders.",
                    subheadline: "Stop burning out because you feel the world's pain.",
                    hook_image_prompt: "A figure meditating inside a glowing translucent forcefield while chaotic colors swirl outside.",
                    pain_story: "You walk into a room and immediately feel the tension. You leave social gatherings exhausted, not physically, but spiritually. You care so much it hurts, and you often isolate yourself just to survive.",
                    agitation_bullets: [
                        "Compassion fatigue.",
                        "Inability to distinguish your feelings from others.",
                        "Being the 'therapist' for everyone but yourself."
                    ],
                    transition_mechanism: "Psychic Sovereignty. Techniques to observe emotions without ingesting them.",
                    product_name: "The Empath's Shield",
                    product_description: "A guided visualization and psychological protocol to build an impenetrable boundary.",
                    features_bullets: [
                        "The 'Glass Wall' Technique: See clearly, feel nothing.",
                        "Energy Clearing Rituals.",
                        "The 'No' Script: How to decline help without guilt."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Narcissist Repellent", description: "Spot energy vampires instantly.", value: "$29" }
                    ],
                    guarantee_text: "Feel lighter in one day or refund.",
                    scarcity_text: "Protect your energy now.",
                    cta_text: "Activate Shield"
                }
            },
            {
                id: "intuitive-counseling",
                title: "How to Turn Your Insight into a High-Ticket Coaching Business",
                script: {
                    headline: "Your Advice Changes Lives. Stop Giving It Away for Free.",
                    subheadline: "Monetize your intuition.",
                    hook_image_prompt: "A lantern illuminating a path through a dark forest.",
                    pain_story: "People naturally come to you for advice. You solve their deepest problems in minutes. Then they leave, succeed, and you are left broke and drained. You realize your 'gift' is a valuable commodity.",
                    agitation_bullets: [
                        "Undercharging or working for free.",
                        "Feeling used.",
                        "Watching shallow 'coaches' make millions."
                    ],
                    transition_mechanism: "Value-Based Framing. Translating 'spiritual guidance' into 'tangible results'.",
                    product_name: "The Mystic Mentor Blueprint",
                    product_description: "How to package your deep wisdom into a high-end consulting offer.",
                    features_bullets: [
                        "Structuring the 'Transformation': Selling the destination, not the chat.",
                        "Attracting 'Soul' Clients: Marketing without sleek sales tactics.",
                        "Pricing Your Wisdom."
                    ],
                    price_original: "$499",
                    price_discounted: "$97",
                    bonuses: [
                        { title: "The Intake Form", description: "Filter out low-vibration clients.", value: "$49" }
                    ],
                    guarantee_text: "Sign your first client or refund.",
                    scarcity_text: "Limited guidance.",
                    cta_text: "Monetize Wisdom"
                }
            },
            {
                id: "purpose-alignment",
                title: "How to Find the Career Your Soul Appoved Before You Were Born",
                script: {
                    headline: "You Don't Want a Job. You Want a Mission.",
                    subheadline: "Align your paycheck with your spirit.",
                    hook_image_prompt: "A golden thread connecting a person's heart to a distant star.",
                    pain_story: "Corporate life feels like dying. The politics, the meaninglessness, the greed. You can fake it, but everyday a piece of you withers. You need work that feels like prayer.",
                    agitation_bullets: [
                        "Sunday scaries.",
                        "Feeling like an alien in the office.",
                        "The fear of wasting your potential on spreadsheets."
                    ],
                    transition_mechanism: "Dharma Discovery. Finding the intersection of what the world needs and what you represent.",
                    product_name: "The Soul-Work Compass",
                    product_description: "A framework to identify careers that allow you to heal the world and get paid.",
                    features_bullets: [
                        "The 'Impact' Audit: Assessing potential paths.",
                        "Transitioning safely from the Matrix.",
                        "The 'Non-Profit' Trap: Why you need money to do good."
                    ],
                    price_original: "$199",
                    price_discounted: "$47",
                    bonuses: [
                        { title: "Resignation Letter Template", description: "Leave with grace.", value: "$19" }
                    ],
                    guarantee_text: "Find your path or refund.",
                    scarcity_text: "Mission awaiting.",
                    cta_text: "Align Now"
                }
            },
            {
                id: "introvert-influence",
                title: "How to Change the World from Your Bedroom without Public Speaking",
                script: {
                    headline: "Quietly Shake the Earth.",
                    subheadline: "Influence doesn't require volume. It requires depth.",
                    hook_image_prompt: "A drop of water hitting a pond and creating ripples that cover the ocean.",
                    pain_story: "You have a vision for a better world. But the thought of being an influencer, recording TikToks, or shouting commands terrifies you. You think you need to be an extrovert to lead.",
                    agitation_bullets: [
                        "Fear of visibility.",
                        "Draining social battery.",
                        "Comparing yourself to loud creators."
                    ],
                    transition_mechanism: " The Written Word. Writing is the introvert's superpower. It scales infinitely.",
                    product_name: "The Silent Leader's Manifesto",
                    product_description: "How to build a movement using essays, books, and art.",
                    features_bullets: [
                        "Writing that pierces the soul.",
                        "Building a 'Cult' of deep followers.",
                        "Automated Community Management."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "The 'Pen Name' Strategy", description: "Influence anonymously.", value: "$29" }
                    ],
                    guarantee_text: "Start your movement.",
                    scarcity_text: "The world needs you.",
                    cta_text: "Start Writing"
                }
            },
            {
                id: "manifesting-reality",
                title: "How to Manifest Reality using Neuroscience instead of Wishful Thinking",
                script: {
                    headline: "Magic is just Science we don't understand yet.",
                    subheadline: "Bridge the gap between your intuition and material reality.",
                    hook_image_prompt: "Brain synapses forming a galaxy.",
                    pain_story: "You believe in the power of the mind, but you're skeptical of 'The Secret'. You want results, not just good vibes. You know you can create your reality, but you lack the manual.",
                    agitation_bullets: [
                        "Vision boards that never come true.",
                        "Feeling 'crazy' for believing in magic.",
                        "Disconnect between your spiritual richness and material lack."
                    ],
                    transition_mechanism: "Neuro-Plasticity Visualization. Rewiring the Reticular Activating System (RAS) to spot opportunities.",
                    product_name: "The Rational Mystic's Guide",
                    product_description: "A grounded approach to manifestation using psychology and focus.",
                    features_bullets: [
                        "The 'Memory of the Future' Technique.",
                        "Removing subconscious blocks.",
                        "Actionable Synchronicities."
                    ],
                    price_original: "$222",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Binaural Beats Collection", description: "Brainwave entrainment.", value: "$33" }
                    ],
                    guarantee_text: "See a sign in 24 hours.",
                    scarcity_text: "Portal open.",
                    cta_text: "Manifest"
                }
            }
        ]
    },
    INFP: {
        id: "infp",
        name: "The Mediator",
        artistic_vibe: "Pastel dreamscapes, cozy cottagecore, Studio Ghibli nature, watercolors, soft clouds, magical realism, floating islands.",
        psychological_triggers: [
            "Authenticity & Identity",
            "Creative Expression",
            "Emotional Harmony",
            "Healing the Self",
            "Idealism"
        ],
        products: [
            {
                id: "monetize-art",
                title: "How to Make Money from Your Art without Selling Your Soul",
                script: {
                    headline: "Your Sensitivity is Your Superpower. Don't let Capitalism Crush It.",
                    subheadline: "Thrive as a creator without becoming a marketer.",
                    hook_image_prompt: "A paintbrush painting a door in the air that opens to a treasure room.",
                    pain_story: "You want to create, but you hate 'business'. You feel that charging for your art taints it. But the alternative is a soul-sucking day job that leaves you too tired to create. You need a middle way.",
                    agitation_bullets: [
                        "Starving artist syndrome.",
                        "The fear of being 'inauthentic'.",
                        "Hoarding your work because you fear judgment."
                    ],
                    transition_mechanism: "The Patronage Model. Finding the 1,000 True Fans who love you BECAUSE you are authentic.",
                    product_name: "The Authentic Creator's Handbook",
                    product_description: "How to build a supportive audience on platforms like Patreon/Substack.",
                    features_bullets: [
                        "Selling through Storytelling.",
                        "Pricing based on Connection, not hours.",
                        "Protecting your creative heart."
                    ],
                    price_original: "$179",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Dealing with Criticism", description: "Emotional armor for artists.", value: "$25" }
                    ],
                    guarantee_text: "Earn your first dollar authentically.",
                    scarcity_text: "Create freedom.",
                    cta_text: "Bloom Now"
                }
            },
            {
                id: "gentle-productivity",
                title: "How to Get Things Done when you Hate Structure and Discipline",
                script: {
                    headline: "Flow like Water. Don't Grind like Stone.",
                    subheadline: "Productivity for the dreamer.",
                    hook_image_prompt: "A river flowing effortlessly around rocks to reach the ocean.",
                    pain_story: "Standard advice like 'eat the frog' or 'time blocking' makes you want to rebel. You work in bursts of passion. Trying to force yourself into a grid kills your spirit.",
                    agitation_bullets: [
                        "Guilt over missed deadlines.",
                        "The 'lazy' label.",
                        "Starting 50 novels, finishing 0."
                    ],
                    transition_mechanism: "Intuitive Action. Following your energy rather than a clock.",
                    product_name: "The Soft-Discipline System",
                    product_description: "A forgiving framework that accounts for your emotional fluctuations.",
                    features_bullets: [
                        "The 'Minimum Viable Day'.",
                        "Gamifying chores with fantasy.",
                        "Forgiving yourself to move forward."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Dream Journaling", description: "Harvesting ideas from sleep.", value: "$15" }
                    ],
                    guarantee_text: "Feel productive without stress.",
                    scarcity_text: "Flow state waiting.",
                    cta_text: "Flow Now"
                }
            },
            {
                id: "storytelling-mastery",
                title: "How to Heal Yourself and Others through the Power of Story",
                script: {
                    headline: "Your Pain is a Story waiting to be told.",
                    subheadline: "Turn your inner world into art that connects.",
                    hook_image_prompt: "An open book where the words turn into birds flying out.",
                    pain_story: "You have entire universes inside your head. You feel things so deeply it's overwhelming. If you don't let it out, it turns into anxiety. You need to channel this.",
                    agitation_bullets: [
                        "Writer's block caused by perfectionism.",
                        "Feeling misunderstood.",
                        "The loneliness of the vivid imagination."
                    ],
                    transition_mechanism: "The Hero's Journey (Internal). Mapping your emotions to universal archetypes.",
                    product_name: "The Inner-World Cartography",
                    product_description: "A course on writing fiction or memoir as therapy and art.",
                    features_bullets: [
                        "Characterizing your demons.",
                        "Plotting your emotional arc.",
                        "The discipline of finishing."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Prompt Generator", description: "Never run out of ideas.", value: "$20" }
                    ],
                    guarantee_text: "Write your first chapter.",
                    scarcity_text: "The story ends soon.",
                    cta_text: "Start Telling"
                }
            },
            {
                id: "idealism-survival",
                title: "How to Keep Your Heart Open in a Cynical World",
                script: {
                    headline: "The World is Hard. You are Soft. That is your Strength.",
                    subheadline: "Don't harden your heart. Strengthen your spine.",
                    hook_image_prompt: "A flower growing out of concrete, glowing with light.",
                    pain_story: "The cruelty of the news, the coldness of modern life—it crushes you. You find yourself retreating into fantasy to escape. You wonder if you need to 'toughen up' to survive.",
                    agitation_bullets: [
                        "World-weariness.",
                        "Loss of innocence.",
                        "Despair paralysis."
                    ],
                    transition_mechanism: "Radical Hope. Using your idealism as a weapon against despair, not an escape.",
                    product_name: "The Warrior-Poet's Path",
                    product_description: "Philosophical and practical tools to engage with the world without losing your light.",
                    features_bullets: [
                        "Boundaries for Activists.",
                        "Curating your reality feed.",
                        "Small acts of great love."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Meditation for Sensitivity", description: "Calm the storm.", value: "$22" }
                    ],
                    guarantee_text: "Find hope again.",
                    scarcity_text: "Light the dark.",
                    cta_text: "Stay Soft"
                }
            },
            {
                id: "creative-flow",
                title: "How to Access the Muse on Command without Waiting for Inspiration",
                script: {
                    headline: "Inspiration is a Guest. You are the Host. Invite her in.",
                    subheadline: "Rituals to bypass the ego and create pure art.",
                    hook_image_prompt: "A door in a library opening to a galaxy.",
                    pain_story: "You wait for the 'spark'. When it's there, you are a god. When it's gone, you are a depressed statue. You feel at the mercy of your creativity.",
                    agitation_bullets: [
                        "Creative blocks lasting months.",
                        "Fear that the magic is gone forever.",
                        "Starting over constantly."
                    ],
                    transition_mechanism: "The Ritual State. Triggering the flow state using sensory anchors.",
                    product_name: "The Muse Summoning Kit",
                    product_description: "A toolkit of sounds, prompts, and habits to trigger creativity.",
                    features_bullets: [
                        "Sensory anchoring.",
                        "The 5-minute sketch rule.",
                        "Bypassing the inner critic."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Lo-Fi Playlists", description: "Curated for dreaming.", value: "$15" }
                    ],
                    guarantee_text: "Create something today.",
                    scarcity_text: "Unlock the flow.",
                    cta_text: "Summon Muse"
                }
            }
        ]
    },
    ENFJ: {
        id: "enfj",
        name: "The Protagonist",
        artistic_vibe: "Warm golden hour, communal fires, stadiums filled with light, intertwined hands, uplifting sunrises, heroic statues.",
        psychological_triggers: [
            "Leadership & Influence",
            "Helping Others Grow",
            "Community Harmony",
            "Being Loved/Appreciated",
            "Social Impact"
        ],
        products: [
            {
                id: "charismatic-leadership",
                title: "How to Lead a Movement so Powerful People Follow You into Fire",
                script: {
                    headline: "You were Born to Lead. It's time to Accept the Crown.",
                    subheadline: "Harness your natural charisma to create massive change.",
                    hook_image_prompt: "A figure on a stage with arms open, golden light connecting them to a crowd.",
                    pain_story: "You see potential in everyone. You want to guide them, help them, save them. But sometimes you care more about their success than they do. You burn out trying to drag people to the promised land.",
                    agitation_bullets: [
                        "Martyr syndrome.",
                        "Feeling underappreciated.",
                        "Leading people who don't want to be led."
                    ],
                    transition_mechanism: "Transformational Leadership. Inspiring vision rather than managing tasks.",
                    product_name: "The Protagonist's Playbook",
                    product_description: "How to articulate a vision so compelling that people volunteer to help you.",
                    features_bullets: [
                        "The 'Vision Speech' template.",
                        "Conflict Resolution as growth.",
                        "Building your Lieutenant layer."
                    ],
                    price_original: "$299",
                    price_discounted: "$67",
                    bonuses: [
                        { title: "Public Speaking confidence", description: "Own the stage.", value: "$47" }
                    ],
                    guarantee_text: "Inspire your team.",
                    scarcity_text: "Take the lead.",
                    cta_text: "Lead Now"
                }
            },
            {
                id: "community-building",
                title: "How to Build a Tribe of Raving Fans who Love You and Each Other",
                script: {
                    headline: "Create Belonging in a Lonely World.",
                    subheadline: "The architecture of cult-like (positive) communities.",
                    hook_image_prompt: "A network of glowing hearts connecting around a campfire.",
                    pain_story: "You love bringing people together. But hosting events, managing dramas, and keeping the energy up is exhausting. You want a community that sustains itself.",
                    agitation_bullets: [
                        "Being the only energy source.",
                        "Drama management.",
                        "Engagement drop-off."
                    ],
                    transition_mechanism: "Ritual Design. Embedding culture into the fabric of the group.",
                    product_name: "The Tribe Builder's Kit",
                    product_description: "Templates for community events, values, and moderation.",
                    features_bullets: [
                        "The 'Welcoming' Ritual.",
                        "Shared Language creation.",
                        "Identifying Core Members."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Discord/Slack Setup", description: "Tech for connection.", value: "$29" }
                    ],
                    guarantee_text: "Launch your tribe.",
                    scarcity_text: "Connect them.",
                    cta_text: "Build Tribe"
                }
            },
            {
                id: "saying-no",
                title: "How to Set Boundaries without Feeling Like a Bad Person",
                script: {
                    headline: "You Can't Pour from an Empty Cup. Stop Lights Yourself on Fire to Keep Others Warm.",
                    subheadline: "Boundaries are an act of love, not rejection.",
                    hook_image_prompt: "A beautiful golden gate that is closed, protecting a garden.",
                    pain_story: "You say yes to everything using your free time, your emotional energy, your money. You resent people for taking advantage, but you let them. You fear that if you say no, they won't love you.",
                    agitation_bullets: [
                        "Resentment building up.",
                        "Passive-aggressive outbursts.",
                        "Physical exhaustion."
                    ],
                    transition_mechanism: "The Benevolent No. Framing rejection as a higher 'Yes' to your mission.",
                    product_name: "The Boundary Bootcamp",
                    product_description: "Scripts and mindsets to protect your energy.",
                    features_bullets: [
                        "Scripts for turning down friends.",
                        "Protecting your 'Me Time'.",
                        "Overcoming the 'Selfish' guilt."
                    ],
                    price_original: "$129",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "Self-Care Rituals", description: "Refill the cup.", value: "$27" }
                    ],
                    guarantee_text: "Say no once today.",
                    scarcity_text: "Protect yourself.",
                    cta_text: "Set Boundaries"
                }
            },
            {
                id: "eq-mastery",
                title: "How to Read People Like a Book and Influence Them Positively",
                script: {
                    headline: "Empathy is X-Ray Vision. Use it.",
                    subheadline: "Deepen relationships and navigate social dynamics.",
                    hook_image_prompt: "Two faces looking at each other with a stream of light connecting their foreheads.",
                    pain_story: "You intuitively know what people feel, but sometimes you project or misinterpret. Or you get overwhelmed by the data. You want to sharpen this sense.",
                    agitation_bullets: [
                        "Miscommunication.",
                        "Taking things personally.",
                        "Social anxiety spikes."
                    ],
                    transition_mechanism: "Active Empathy. Asking the right questions to confirm intuition.",
                    product_name: "The Connection Catalyst",
                    product_description: "Tools for deep rapport and emotional intelligence.",
                    features_bullets: [
                        "Deep Listening techniques.",
                        "Mirroring and Matching.",
                        "Resolving conflict before it starts."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Body Language Decoder", description: "Read the unsaid.", value: "$29" }
                    ],
                    guarantee_text: "Connect deeper.",
                    scarcity_text: "Master emotion.",
                    cta_text: "Master EQ"
                }
            },
            {
                id: "public-speaking",
                title: "How to Speak so People are Mesmerized by Your Message",
                script: {
                    headline: "Your Voice is Your Sword. Sharpen It.",
                    subheadline: "Captivate any audience, from 1 to 1,000.",
                    hook_image_prompt: "Microphone glowing on a stage.",
                    pain_story: "You have the passion, but maybe you ramble, or you get nervous. You want to impact the world, and you know communication is the key.",
                    agitation_bullets: [
                        "Um's and Ah's.",
                        "Losing your train of thought.",
                        "Boring the audience."
                    ],
                    transition_mechanism: "Story-Selling. Structuring information as emotional narrative.",
                    product_name: "The Charisma Codes",
                    product_description: "Rhetoric and delivery training for the Protagonist.",
                    features_bullets: [
                        "Vocal variety.",
                        "The 'Pause' of power.",
                        "Story structures that work."
                    ],
                    price_original: "$199",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Toastmasters Hacks", description: "Fast track.", value: "$19" }
                    ],
                    guarantee_text: "Speak with power.",
                    scarcity_text: "Take the mic.",
                    cta_text: "Speak Up"
                }
            }
        ]
    },
    ENFP: {
        id: "enfp",
        name: "The Campaigner",
        artistic_vibe: "Carnival lights, fireworks, messy paint studios, vibrant splashes, balloons, festivals, galaxy swirls, pop-art.",
        psychological_triggers: [
            "Freedom & Exploration",
            "Connecting People",
            "Starting New Adventures",
            "Authentic Self-Expression",
            "Fear of Missing Out"
        ],
        products: [
            {
                id: "finish-what-you-start",
                title: "How to Actually Finish Projects without getting Bored to Death",
                script: {
                    headline: "You are a Starter. Become a Finisher.",
                    subheadline: "The curse of the Campaigner: 1,000 ideas, 0 done.",
                    hook_image_prompt: "A puzzle being completed, the final piece glowing.",
                    pain_story: "The beginning is intoxicating. The middle is a slog. The end never comes. You have brilliance collecting dust because the dopamine wore off.",
                    agitation_bullets: [
                        "Wasted potential.",
                        "People not trusting your commitments.",
                        "Self-doubt about your capability.",
                    ],
                    transition_mechanism: "The 'Sprint' Method. Short bursts of completion before the boredom sets in.",
                    product_name: "The Closer's Framework",
                    product_description: "Strategy to push projects over the line using novelty.",
                    features_bullets: [
                        "Accountability partnerships.",
                        "Defining 'Done' (it's lower than you think).",
                        "Outsourcing the boring parts."
                    ],
                    price_original: "$149",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "Project Graveyard Resurrection", description: "Salvage old ideas.", value: "$22" }
                    ],
                    guarantee_text: "Finish one thing this week.",
                    scarcity_text: "Close the loop.",
                    cta_text: "Finish It"
                }
            },
            {
                id: "social-connector",
                title: "How to become the Most Connected Person in Your City",
                script: {
                    headline: "Your Net Worth is Your Network. You are a Billionaire.",
                    subheadline: "Leverage your natural likeability.",
                    hook_image_prompt: "A constellation of stars connecting to form a face.",
                    pain_story: "You know everyone, but it's shallow. Or you forget to follow up. You are the life of the party but you aren't building equity in your relationships.",
                    agitation_bullets: [
                        "Losing touch with cool people.",
                        "Being 'fun' but not 'valuable'.",
                        "Forgetfulness."
                    ],
                    transition_mechanism: "Systematic Serendipity. A CRM for your social life that feels fun.",
                    product_name: "The Super-Connector Protocol",
                    product_description: "Managing relationships without becoming a robot.",
                    features_bullets: [
                        "The 'Host' Strategy: throw parties, don't attend them.",
                        "Introduction Etiquette.",
                        "Adding value instantly."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Party Planning Checklist", description: "Epic events made easy.", value: "$29" }
                    ],
                    guarantee_text: "Make a power connection.",
                    scarcity_text: "Network expands.",
                    cta_text: "Connect"
                }
            },
            {
                id: "viral-storytelling",
                title: "How to Tell Stories that Go Viral and capture Hearts",
                script: {
                    headline: "You Have a Voice. Make it Echo.",
                    subheadline: "Turn your random thoughts into compelling content.",
                    hook_image_prompt: "A megaphone shooting out colorful birds.",
                    pain_story: "You talk a lot, but sometimes you lose people. You have 10 tangents. You want to articulate your vision clearly.",
                    agitation_bullets: [
                        "Rampling.",
                        "Low engagement.",
                        "Being dismissed as 'just excitement'."
                    ],
                    transition_mechanism: "The Narrative Arc. Structure your chaos into a beginning, middle, and end.",
                    product_name: "The Viral Storyteller",
                    product_description: "Content creation guide for ENFPs.",
                    features_bullets: [
                        "Hooking attention instantly.",
                        "Vulnerability as strength.",
                        "Structuring the 'Rant'."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Content Calendar for Chaotic Minds", description: "Flexible consistency.", value: "$19" }
                    ],
                    guarantee_text: "Write a viral post.",
                    scarcity_text: "Go live.",
                    cta_text: "Tell Story"
                }
            },
            {
                id: "joyful-productivity",
                title: "How to Work Hard without losing your Spark",
                script: {
                    headline: "Work Should be Play. If it's not, You're Doing it Wrong.",
                    subheadline: "Redefining hustle for the free spirit.",
                    hook_image_prompt: "A desk covered in toys and colorful tools.",
                    pain_story: "Corporate grids kill you. Routine kills you. You think you hate work, but you just hate boredom. When you are lit up, you work harder than anyone.",
                    agitation_bullets: [
                        "Burnout from boredom.",
                        "Depression from gray cubicles.",
                        "Resisting the 'grind'."
                    ],
                    transition_mechanism: "Play-Based Work. Gamification of the output.",
                    product_name: "The Joy-Economy Blueprint",
                    product_description: "Building a career that feels like a game.",
                    features_bullets: [
                        "Skill-stacking for fun.",
                        "The 'Adventure' mindset.",
                        "Finding 'Play' in data entry."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Office Decor for the Soul", description: "Vibe matters.", value: "$15" }
                    ],
                    guarantee_text: "Have fun working.",
                    scarcity_text: "Play ball.",
                    cta_text: "Play Now"
                }
            },
            {
                id: "finding-tribe",
                title: "How to Find the People who actually Get You",
                script: {
                    headline: "Stop Explaining Yourself to Muggles.",
                    subheadline: "Find your magical creatures.",
                    hook_image_prompt: "A group of colorful avatars meeting in a digital forest.",
                    pain_story: "You have many friends, but few who understand your depth. You feel like a unicorn in a stable of horses. You are lonely in a crowd.",
                    agitation_bullets: [
                        "Shallow friendships.",
                        "Hiding your weirdness.",
                        "Feeling 'too much'."
                    ],
                    transition_mechanism: "Signal Broadcasting. Being so authentically weird you attract your tribe.",
                    product_name: "The Weirdo Magnet",
                    product_description: "How to signal your true self to attract true friends.",
                    features_bullets: [
                        "Vulnerability loops.",
                        "Where to look for intuitive types.",
                        "Filtering out judgers."
                    ],
                    price_original: "$111",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Conversation Starters for Deep Talk", description: "Skip small talk.", value: "$11" }
                    ],
                    guarantee_text: "Find a friend.",
                    scarcity_text: "Tribe waiting.",
                    cta_text: "Find Them"
                }
            }
        ]
    },
    ISTJ: {
        id: "istj",
        name: "The Logistician",
        artistic_vibe: "Clean lines, ticking clocks, libraries, steel vaults, architectural symmetry, blueprints, minimalist grid, monochromatic blue/grey.",
        psychological_triggers: [
            "Order & Stability",
            "Proven Methods",
            "Duty & Responsibility",
            "Data-Backed Results",
            "Efficiency without Hype"
        ],
        products: [
            {
                id: "ironclad-life",
                title: "How to Build a Life of Absolute Order and Reliability",
                script: {
                    headline: "Chaos is the Enemy. Order is the Weapon.",
                    subheadline: "A system for unconditional reliability and structure.",
                    hook_image_prompt: "A perfectly organized archive room with infinite depth.",
                    pain_story: "You hate unpredictability. You hate when people change plans last minute. You feel like the only adult in a room full of children. You want a life that runs like a Swiss watch.",
                    agitation_bullets: [
                        "Dealing with other people's mess.",
                        "Anxiety from lack of structure.",
                        "Feeling holding the weight of the world."
                    ],
                    transition_mechanism: "Systematic Standardization. Turning daily life into a set of unbreakable SOPs (Standard Operating Procedures).",
                    product_name: "The Integrity Protocol",
                    product_description: "A complete life management system based on logic and duty.",
                    features_bullets: [
                        "The 'Zero-Ambiguity' Calendar.",
                        "Financial models for 100% security.",
                        "Household logistics optimization."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Emergency Prep Checklist", description: "Be ready for anything.", value: "$29" }
                    ],
                    guarantee_text: "Get organized in 3 days.",
                    scarcity_text: "Secure your future.",
                    cta_text: "Establish Order"
                }
            },
            {
                id: "digital-declutter",
                title: "How to Organize Your Digital Life into a Perfect Archive",
                script: {
                    headline: "Delete the Junk. Archive the Truth.",
                    subheadline: "For the person who cannot stand a messy desktop.",
                    hook_image_prompt: "A data stream actively sorting itself into neat boxes.",
                    pain_story: "You have files everywhere. Duplicate photos, unread emails, chaos. It itches at your brain. You know that if you needed a document from 2014, you'd struggle to find it. That is unacceptable.",
                    agitation_bullets: [
                        "Digital hoarding.",
                        "Loss of critical data.",
                        "Inefficient searching."
                    ],
                    transition_mechanism: "The Librarian Method. A folder taxonomy that never breaks.",
                    product_name: "The Digital Vault",
                    product_description: "A folder structure and automation system for lifetime data management.",
                    features_bullets: [
                        "The 'Inbox Zero' automation.",
                        "Password security protocols.",
                        "The unified naming convention."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Backup SOPs", description: "Never lose a byte.", value: "$19" }
                    ],
                    guarantee_text: "Find any file in 3 seconds.",
                    scarcity_text: "Clean up now.",
                    cta_text: "Organize Files"
                }
            },
            {
                id: "risk-averse-wealth",
                title: "How to Build Wealth without Gambling or 'Hype' Coins",
                script: {
                    headline: "Get Rich Slowly. Get Rich Surely.",
                    subheadline: "Investing for the rational realist.",
                    hook_image_prompt: "A sturdy bank vault made of gold bricks.",
                    pain_story: "You see people getting rich on crypto and feel disgust, not envy. You know it's a bubble. You want wealth, but you refuse to gamble. You want a plan that is mathematically guaranteed to work over 20 years.",
                    agitation_bullets: [
                        "Fear of inflation.",
                        "Distrust of 'financial gurus'.",
                        "Wanting security over luxury."
                    ],
                    transition_mechanism: "Compound Consistency. The math of patience.",
                    product_name: "The Fortress Portfolio",
                    product_description: "Evidence-based investing strategies that ignore the news.",
                    features_bullets: [
                        "Asset allocation for sleep.",
                        "Tax efficiency optimization.",
                        "The 'F.I.R.E.' roadmap for safety."
                    ],
                    price_original: "$199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Budgeting Spreadsheets", description: "Track every cent.", value: "$25" }
                    ],
                    guarantee_text: "Sleep better at night.",
                    scarcity_text: "Build the foundation.",
                    cta_text: "Secure Wealth"
                }
            },
            {
                id: "mastering-discipline",
                title: "How to becoming Unstoppable through Habit Stacking",
                script: {
                    headline: "Motivation is Fickle. Discipline is Permanent.",
                    subheadline: "Stop relying on 'feeling like it'.",
                    hook_image_prompt: "A steel chain where every link is perfect.",
                    pain_story: "You pride yourself on your work ethic. But even you have days where you slip. You want to reach a level of consistency that looks robotic to others but feels effortless to you.",
                    agitation_bullets: [
                        " breaking a streak.",
                        "Inefficiency gaps.",
                        "Wanting to be the rock for everyone."
                    ],
                    transition_mechanism: "Neuro-Association stacking. Chains of habits that trigger each other.",
                    product_name: "The Iron Will System",
                    product_description: "How to program your behavior using cues and rewards.",
                    features_bullets: [
                        "The 5AM protocol (optional but recommended).",
                        "Removing decision fatigue.",
                        "The 'Never Miss Twice' rule."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Habit Tracker PDF", description: "Visual accountability.", value: "$15" }
                    ],
                    guarantee_text: "Build one new habit.",
                    scarcity_text: "Forge your will.",
                    cta_text: "Start Discipline"
                }
            },
            {
                id: "fact-based-memory",
                title: "How to Never Forget a Fact, Name, or Number Again",
                script: {
                    headline: "Your Mind is a Database. Optimize the Query Speed.",
                    subheadline: "Recall information instantly and accurately.",
                    hook_image_prompt: "A library card catalog stretching to infinity.",
                    pain_story: "You hate being wrong. You hate forgetting a detail. In arguments, or at work, you want to be the one who knows the exact figure. Forgetting feels like a loss of competence.",
                    agitation_bullets: [
                        "Social awkwardness of names.",
                        "Losing credibility.",
                        "Feeling 'slow'."
                    ],
                    transition_mechanism: "The Memory Palace. Ancient technique updated for modern data.",
                    product_name: "The Total Recall Toolkit",
                    product_description: "Techniques to store and retrieve data like a computer.",
                    features_bullets: [
                        "Memorizing lists in order.",
                        "Face-Name association.",
                        "Retaining what you read."
                    ],
                    price_original: "$149",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Speed Reading Basics", description: "Input data faster.", value: "$20" }
                    ],
                    guarantee_text: "Memorize a deck of cards.",
                    scarcity_text: "Upgrade memory.",
                    cta_text: "Upgrade RAM"
                }
            }
        ]
    },
    ISFJ: {
        id: "isfj",
        name: "The Defender",
        artistic_vibe: "Warm hearth, soft linens, protective shields, gentle light, nursing gardens, peaceful sanctuary, classic elegance.",
        psychological_triggers: [
            "Protecting Loved Ones",
            "Harmony & Stability",
            "Service & Appreciation",
            "Practical Care",
            "Traditional Values"
        ],
        products: [
            {
                id: "harmonious-home",
                title: "How to create a Home that Heals Everyone who Enters",
                script: {
                    headline: "Your Home is Your Sanctuary. Make it Holy.",
                    subheadline: "Creating an environment of peace and safety.",
                    hook_image_prompt: "A cozy living room with a fireplace that emits emotional warmth.",
                    pain_story: "You absorb the stress of your family. You work hard to make everyone happy, but the chaos of life intrudes. You want your home to be the place where everyone takes a deep breath.",
                    agitation_bullets: [
                        "Clutter causing anxiety.",
                        "Family friction.",
                        "Not having a safe space."
                    ],
                    transition_mechanism: "Sensory Sanctuary Design. Organizing space for emotional regulation.",
                    product_name: "The Haven Blueprint",
                    product_description: "Interior design and organizational principles for the ISFJ soul.",
                    features_bullets: [
                        "De-cluttering sentimental items (gently).",
                        "Lighting for mood.",
                        "Zones for privacy."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Hospitality Checklist", description: "Be the perfect host.", value: "$15" }
                    ],
                    guarantee_text: "Feel more at peace.",
                    scarcity_text: "Create sanctuary.",
                    cta_text: "Heal Home"
                }
            },
            {
                id: "caregiver-burnout",
                title: "How to Care for Others without Destroying Yourself",
                script: {
                    headline: "You Can't Pour from an Empty Cup. (Really).",
                    subheadline: "Self-preservation for the selfless.",
                    hook_image_prompt: "A pair of hands holding a glowing heart, but the hands are cracking.",
                    pain_story: "You say 'I'm fine' when you're not. You carry the emotional load of your friends, family, and colleagues. You feel guilty taking a nap. You are heading for a crash.",
                    agitation_bullets: [
                        "Resentment.",
                        "Physical exhaustion.",
                        "Nobody asking how YOU are."
                    ],
                    transition_mechanism: "Sustainable Service. Structuring your giving so it energizes rather than depletes.",
                    product_name: "The Defender's Recharge",
                    product_description: "A permission slip and system for self-care.",
                    features_bullets: [
                        "The 'Not My Emergency' filter.",
                        "Scheduling guilt-free rest.",
                        "Asking for help (the hard part)."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Scripts to Ask for Help", description: "Don't suffer alone.", value: "$19" }
                    ],
                    guarantee_text: "Take a break today.",
                    scarcity_text: "Save yourself.",
                    cta_text: "Recharge"
                }
            },
            {
                id: "family-chaos",
                title: "How to Organize Family Life so Nothing Slips through the Cracks",
                script: {
                    headline: "Be the Glue that Holds it Together (Without the stress).",
                    subheadline: "Project management for the household.",
                    hook_image_prompt: "A family calendar that turns into a beautiful mural.",
                    pain_story: "You are the mental load carrier. You remember the birthdays, the appointments, the allergies. If you stopped, it would chaos. But it's too much to keep in your head.",
                    agitation_bullets: [
                        "Mental load overload.",
                        "Nagging frustration.",
                        "Forgetting one thing and panicking."
                    ],
                    transition_mechanism: "The Central Command Center. Externalizing the data so the family shares the load.",
                    product_name: "The Family OS",
                    product_description: "Templates and systems to run a household.",
                    features_bullets: [
                        "The Shared Calendar system.",
                        "Chore gamification.",
                        "Meal planning automation."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Budgeting for Families", description: "stretch every dollar.", value: "$19" }
                    ],
                    guarantee_text: "Organize one week.",
                    scarcity_text: "Get control.",
                    cta_text: "Organize Family"
                }
            },
            {
                id: "quiet-reliability",
                title: "How to get Recognized for your Work without Bragging",
                script: {
                    headline: "Works Hard in Silence. Let Success make the Noise.",
                    subheadline: "Career advancement for the humble.",
                    hook_image_prompt: "A pillar of stone supporting a massive tranquil temple.",
                    pain_story: "You do the work. You stay late. You fix the errors. But the loud people get the promotions. You refuse to be arrogant, but you don't want to be invisible.",
                    agitation_bullets: [
                        "Being overlooked.",
                        "Taking credit for your work stolen.",
                        "Fear of self-promotion."
                    ],
                    transition_mechanism: "Documented Value. Let the data speak for you.",
                    product_name: "The Quiet Achiever's Ladder",
                    product_description: "How to track and present your wins factually.",
                    features_bullets: [
                        "The 'Accomplishment Log'.",
                        "How to have the Review meeting.",
                        "Networking through service."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Email Templates for Bosses", description: "Update them subtly.", value: "$20" }
                    ],
                    guarantee_text: "Get a compliment at work.",
                    scarcity_text: "Rise up.",
                    cta_text: "Rise Quietly"
                }
            },
            {
                id: "creating-traditions",
                title: "How to Build Memories that Last Generations",
                script: {
                    headline: "You are the Keeper of the Flame.",
                    subheadline: "Intentional nostalgia and connection.",
                    hook_image_prompt: "A photo album where the pictures are moving memories.",
                    pain_story: "Time is moving too fast. Children grow up. Parents age. You want to freeze time. You want to ensure your family stays connected forever.",
                    agitation_bullets: [
                        "Fear of drifting apart.",
                        "Holidays feeling hollow.",
                        "Losing family history."
                    ],
                    transition_mechanism: "Ritual Architecture. Designing moments that stick.",
                    product_name: "The Memory Maker",
                    product_description: "Guide to hosting holidays and creating traditions.",
                    features_bullets: [
                        "Holiday planning without stress.",
                        "Documenting family history.",
                        "The 'Sunday Dinner' revival."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Photo Organization", description: "Sort the digital mess.", value: "$15" }
                    ],
                    guarantee_text: "Plan a memory.",
                    scarcity_text: "Time flies.",
                    cta_text: "Create Memory"
                }
            }
        ]
    },
    ESTJ: {
        id: "estj",
        name: "The Executive",
        artistic_vibe: "High-rise corner office, polished mahogany, gavel, city maps, structured steel, crisp suits, bold typography.",
        psychological_triggers: [
            "Hierarchy & Respect",
            "Operational Efficiency",
            "Clear Standards",
            "Leadership & Authority",
            "Tangible Results"
        ],
        products: [
            {
                id: "project-management",
                title: "How to Manage Projects so They Never Go Over Budget or Time",
                script: {
                    headline: "On Time. Under Budget. Zero Excuses.",
                    subheadline: "The Gold Standard of execution.",
                    hook_image_prompt: "A gantt chart constructing a skyscraper in real time.",
                    pain_story: "Incompetence drives you mad. You hate messy timelines, vague promises, and people who miss deadlines. You want a machine that outputs results.",
                    agitation_bullets: [
                        "Herding cats.",
                        "Excuses from team members.",
                        "The chaos of bad planning."
                    ],
                    transition_mechanism: "Waterfall Precision. A rigorous step-by-step methodology.",
                    product_name: "The Executive's Gantt",
                    product_description: "Templates for hardcore project management.",
                    features_bullets: [
                        "Critical Path Analysis.",
                        "Resource leveling.",
                        "Holding people accountable."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Meeting Agendas that Work", description: "Cut talk time by 50%.", value: "$29" }
                    ],
                    guarantee_text: "Save 10 hours a week.",
                    scarcity_text: "Get results.",
                    cta_text: "Manage It"
                }
            },
            {
                id: "commanding-respect",
                title: "How to Command Respect in Any Hierarchical Organization",
                script: {
                    headline: "Respect is Earned. Here is the Price.",
                    subheadline: "Climb the ladder with competence and authority.",
                    hook_image_prompt: "A lion sitting at the head of a boardroom table.",
                    pain_story: "You see people failing up. You see disorder in the ranks. You know you could run things better. You need the authority to fix it.",
                    agitation_bullets: [
                        "Being questioned by subordinates.",
                        "Weak leadership above you.",
                        "Politics blocking efficiency."
                    ],
                    transition_mechanism: "Competence Signaling. Being so effective they have to promote you.",
                    product_name: "The Authority Code",
                    product_description: "Navigating corporate politics with honor and strength.",
                    features_bullets: [
                        "Managing Up.",
                        "Dress and demeanor.",
                        "delivering bad news."
                    ],
                    price_original: "$249",
                    price_discounted: "$67",
                    bonuses: [
                        { title: "Negotiation Scripts", description: "Get the raise.", value: "$39" }
                    ],
                    guarantee_text: "Feel more powerful.",
                    scarcity_text: "Take command.",
                    cta_text: "Command"
                }
            },
            {
                id: "scaling-operations",
                title: "How to Scale Operations from Chaos to Order",
                script: {
                    headline: "Process is Freedom.",
                    subheadline: "Turn ad-hoc chaos into a scalable machine.",
                    hook_image_prompt: "A factory floor running in perfect synchronization.",
                    pain_story: "Your business or team is stuck because every decision goes through you. You are the bottleneck. You need to download your brain into a manual.",
                    agitation_bullets: [
                        "Repetitive questions.",
                        "Quality control failures.",
                        "Growth ceiling."
                    ],
                    transition_mechanism: "The SOP Engine. Documenting everything.",
                    product_name: "The Scalability Playbook",
                    product_description: "How to write Standard Operating Procedures that people actually read.",
                    features_bullets: [
                        "SOP templates.",
                        "Training automation.",
                        "Quality Assurance checklists."
                    ],
                    price_original: "$299",
                    price_discounted: "$79",
                    bonuses: [
                        { title: "Hiring Checklists", description: "Filter for competence.", value: "$49" }
                    ],
                    guarantee_text: "Systemize one process.",
                    scarcity_text: "Scale up.",
                    cta_text: "Scale Ops"
                }
            },
            {
                id: "zero-tolerance",
                title: "How to Enforce Standards without Being a Tyrant",
                script: {
                    headline: "High Standards are Not Optional.",
                    subheadline: "Creating a culture of excellence.",
                    hook_image_prompt: "A marble column that is perfectly straight and white.",
                    pain_story: "You are called 'bossy' or 'intense'. But you just care about quality. You want a team that takes pride in their work. You want to stop fixing other people's mistakes.",
                    agitation_bullets: [
                        "Mediocrity acceptance.",
                        "Frustration with laziness.",
                        "Being the 'bad guy'."
                    ],
                    transition_mechanism: "Radical Candor. Direct feedback delivered with clear expectations.",
                    product_name: "The Excellence Standard",
                    product_description: "Management training for high-standards leaders.",
                    features_bullets: [
                        "Performance Review scripts.",
                        "Setting KPIs.",
                        "Firing with dignity."
                    ],
                    price_original: "$199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Feedback Framework", description: "Correct without crushing.", value: "$29" }
                    ],
                    guarantee_text: "Raise the bar.",
                    scarcity_text: "Standardize.",
                    cta_text: "Enforce"
                }
            },
            {
                id: "executive-standard",
                title: "How to Organize Your Entire Life like a Fortune 500 Company",
                script: {
                    headline: "You are the CEO of your Life. Act like it.",
                    subheadline: "Personal enterprise management.",
                    hook_image_prompt: "A dashboard showing health, wealth, and relationships as business metrics.",
                    pain_story: "Your work is organized, but your home is messy? Or your health is slipping? You need to apply your professional skills to your personal domain.",
                    agitation_bullets: [
                        "Work-Life imbalance.",
                        "Inefficient errands.",
                        "Losing money on late fees."
                    ],
                    transition_mechanism: "Enterprise Resource Planning for One.",
                    product_name: "The CEO Life System",
                    product_description: "Running your household like a business.",
                    features_bullets: [
                        "Outsourcing chores.",
                        "Quarterly Life Reviews.",
                        "Strategic Planning for family."
                    ],
                    price_original: "$149",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Estate Planning Basics", description: "Secure the legacy.", value: "$29" }
                    ],
                    guarantee_text: "Run cleaner.",
                    scarcity_text: "Take charge.",
                    cta_text: "Run Life"
                }
            }
        ]
    },
    ESFJ: {
        id: "esfj",
        name: "The Consul",
        artistic_vibe: "Dinner parties, classic fashion, polished silver, community centers, spotlights, vibrant florals, red carpet.",
        psychological_triggers: [
            "Social Status & Belonging",
            "Helping Others Practically",
            "Tradition & Etiquette",
            "Harmonious Groups",
            "Being the Host"
        ],
        products: [
            {
                id: "perfect-host",
                title: "How to Host Events that Everyone Talks About for Years",
                script: {
                    headline: "Be the Heart of Your Community.",
                    subheadline: "Hosting with grace, style, and ease.",
                    hook_image_prompt: "A banquet table laden with food and happy guests raising a toast.",
                    pain_story: "You love people, but hosting is stressful. You worry about the food, the vibe, the conversation. You want to be the person everyone relies on for a good time.",
                    agitation_bullets: [
                        "Event anxiety.",
                        "Fear of empty rooms.",
                        "Cooking disasters."
                    ],
                    transition_mechanism: "The 5-Sense Hospitality. Curating the entire experience.",
                    product_name: "The Hostess Bible",
                    product_description: "Checklists and plans for perfect gatherings.",
                    features_bullets: [
                        "Menu planning for crowds.",
                        "Seating chart psychology.",
                        "Setting the mood."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Conversation Deck", description: "No awkward silences.", value: "$15" }
                    ],
                    guarantee_text: "Host a great party.",
                    scarcity_text: "Gather them.",
                    cta_text: "Host Now"
                }
            },
            {
                id: "social-calendar",
                title: "How to Manage a Popular Social Life without Burning Out",
                script: {
                    headline: "Popularity is a Full-Time Job. Automate it.",
                    subheadline: "Keep your friends close without losing your mind.",
                    hook_image_prompt: "A spinning rolodex that glows.",
                    pain_story: "You have so many friends, so many obligations. You don't want to let anyone down. But you are running from event to event, exhausted.",
                    agitation_bullets: [
                        "Double booking.",
                        "Forgetting birthdays.",
                        "FOMO."
                    ],
                    transition_mechanism: "Relationship CRM. Organizing people so you can love them better.",
                    product_name: "The Socialite's Secretary",
                    product_description: "System for tracking relationships.",
                    features_bullets: [
                        "Birthday automation.",
                        "Grouping friends for efficiency.",
                        "The art of the 'Pop-In'."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Gift Giving Guide", description: "Perfect gifts every time.", value: "$19" }
                    ],
                    guarantee_text: "Never forget a date.",
                    scarcity_text: "Get organized.",
                    cta_text: "Manage Social"
                }
            },
            {
                id: "helping-boundaries",
                title: "How to Help Everyone without Feeling Unappreciated",
                script: {
                    headline: "Service is Noble. Martyrdom is Not.",
                    subheadline: "Get the appreciation you deserve.",
                    hook_image_prompt: "A hand lifting another hand, with mutual light shining.",
                    pain_story: "You do everything for everyone. You crave a 'thank you'. When you don't get it, you feel resentful. You wonder if people only like you for what you do for them.",
                    agitation_bullets: [
                        "Feeling taken for granted.",
                        "Over-volunteering.",
                        "Hidden resentment."
                    ],
                    transition_mechanism: "Reciprocal Value. Teaching people how to treat you.",
                    product_name: "The Appreciated Altruist",
                    product_description: "Setting terms for your generosity.",
                    features_bullets: [
                        "Communicating needs.",
                        "Stopping 'Please' pleasing.",
                        "Accepting help."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Self-Love Scripts", description: "Validation from within.", value: "$25" }
                    ],
                    guarantee_text: "Feel appreciated.",
                    scarcity_text: "Love yourself.",
                    cta_text: "Get Love"
                }
            },
            {
                id: "popularity-dynamics",
                title: "How to Navigate Social Politics and maintain Status",
                script: {
                    headline: "Social Standing Matters. Manage it Wisely.",
                    subheadline: "Navigating the group chat and the real world.",
                    hook_image_prompt: "A queen bee surrounded by a harmonious hive.",
                    pain_story: "You care what people think. That's not vanity; it's social intelligence. You want to maintain harmony in your group and ensure your reputation is pristine.",
                    agitation_bullets: [
                        "Gossip handling.",
                        "Exclusion anxiety.",
                        "Reputation management."
                    ],
                    transition_mechanism: "Diplomatic Grace. Staying above the fray while leading it.",
                    product_name: "The Social Captain",
                    product_description: "Advanced social dynamics for leaders.",
                    features_bullets: [
                        "Squashing rumors.",
                        "Bridging friend groups.",
                        "Digital reputation."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Etiquette 2.0", description: "Modern manners.", value: "$29" }
                    ],
                    guarantee_text: "Rise in status.",
                    scarcity_text: "Lead the group.",
                    cta_text: "Lead Social"
                }
            },
            {
                id: "family-politics",
                title: "How to Manage Family Drama and Keep the Peace",
                script: {
                    headline: "Peace in the Home. Peace in the Heart.",
                    subheadline: "Mediation for the extended family.",
                    hook_image_prompt: "A knot being untied by gentle hands.",
                    pain_story: "Holidays are stressful because of In-Laws, siblings, and old feuds. You are the one stuck in the middle trying to make everyone smile.",
                    agitation_bullets: [
                        "Walking on eggshells.",
                        "Dreading reunions.",
                        "Being the messenger."
                    ],
                    transition_mechanism: "Active Mediation. Techniques to de-escalate without taking sides.",
                    product_name: "The Family Peacekeeper",
                    product_description: "Conflict resolution for families.",
                    features_bullets: [
                        "Stopping fights before they start.",
                        "Seating chart strategy.",
                        "The 'Distraction' technique."
                    ],
                    price_original: "$129",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "Stress Relief Audio", description: "Calm down in the bathroom.", value: "$19" }
                    ],
                    guarantee_text: "A peaceful holiday.",
                    scarcity_text: "Make peace.",
                    cta_text: "Keep Peace"
                }
            }
        ]
    },
    ISTP: {
        id: "istp",
        name: "The Virtuoso",
        artistic_vibe: "Mechanic's garage, desert sunset, scattered tools, brushed steel, blueprints on a tablet, racing adrenaline, solitary peaks.",
        psychological_triggers: [
            "Mastery of Tools",
            "Freedom of Action",
            "Solving Impossible Problems",
            "Adrenaline & Risk",
            "Efficiency"
        ],
        products: [
            {
                id: "troubleshoot-life",
                title: "How to Fix Anything in Your Life like a Mechanic",
                script: {
                    headline: "Your Life is a Machine. Tune It.",
                    subheadline: "Debug your health, wealth, and relationships using logic.",
                    hook_image_prompt: "A human body shown as a complex engine schematic.",
                    pain_story: "You hate emotional drama. You just want things to WORK. Whether it's a broken toaster or a broken relationship, you want to open the hood, find the faulty part, and replace it. But people aren't logic gates.",
                    agitation_bullets: [
                        "Emotional irrationality.",
                        "Inefficient systems.",
                        "Being told to 'talk about your feelings'."
                    ],
                    transition_mechanism: "Root Cause Analysis. Applied engineering for human problems.",
                    product_name: "The Troubleshooter's Manual",
                    product_description: "A framework to diagnose and fix life problems without therapy.",
                    features_bullets: [
                        "The '5 Whys' for personal issues.",
                        "Optimizing your biochemical engine.",
                        "The 'Patch' mindset vs deep code."
                    ],
                    price_original: "$129",
                    price_discounted: "$37",
                    bonuses: [
                        { title: "DIY Biohacking", description: "Hack your sleep.", value: "$19" }
                    ],
                    guarantee_text: "Fix one bug today.",
                    scarcity_text: "System checks.",
                    cta_text: "Debug Life"
                }
            },
            {
                id: "modern-survival",
                title: "How to Be Ready for Anything without Being a Crazy Prepper",
                script: {
                    headline: "The World is Fragile. You are Not.",
                    subheadline: "Practical preparedness for the rational realist.",
                    hook_image_prompt: "A tactical backpack filled with high-tech gear.",
                    pain_story: "You see the supply chains breaking. You see the fragility of the grid. You aren't scared; you just want to be prepared. But you hate the 'tinfoil hat' crowd.",
                    agitation_bullets: [
                        "Dependency on the system.",
                        "Helplessness in blackouts.",
                        "Wanting to protect your own."
                    ],
                    transition_mechanism: "Skill Acquisition. Gear breaks; skills remain.",
                    product_name: "The Urban Virtuoso",
                    product_description: "Essential skills for modern survival.",
                    features_bullets: [
                        "Digital security.",
                        "Urban evasion.",
                        "Basic medical mechanics."
                    ],
                    price_original: "$149",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Every Day Carry (EDC) Guide", description: "Optimize your pockets.", value: "$25" }
                    ],
                    guarantee_text: "Feel harder to kill.",
                    scarcity_text: "Gear up.",
                    cta_text: "Survive"
                }
            },
            {
                id: "hack-system",
                title: "How to Find Shortcuts in a World of Bureaucracy",
                script: {
                    headline: "Rules are Suggestions. Results are Mandatory.",
                    subheadline: "Navigation for the pathfinder.",
                    hook_image_prompt: "A person walking through a wall in a maze.",
                    pain_story: "You hate red tape. You hate 'process for process's sake'. You know there is a faster way, but people tell you it's 'not allowed'. You want to get to the outcome now.",
                    agitation_bullets: [
                        "Waiting in line.",
                        "Filling out forms.",
                        "Slow walkers."
                    ],
                    transition_mechanism: "Lateral Efficiency. Finding the backdoor.",
                    product_name: "The Loophole Library",
                    product_description: "Strategies to bypass bureaucratic friction.",
                    features_bullets: [
                        "Social Engineering 101.",
                        "Automating bureaucracy.",
                        "The 'As Soon As Possible' framework."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Travel Hacking", description: "Fly better for less.", value: "$19" }
                    ],
                    guarantee_text: "Save 5 hours this week.",
                    scarcity_text: "Hack it.",
                    cta_text: "Bypass"
                }
            },
            {
                id: "detached-calm",
                title: "How to Stay Cool when Everyone Else is Losing their Minds",
                script: {
                    headline: "Ice in the Veins. Fire in the Heart.",
                    subheadline: "Mastering the physiological response to stress.",
                    hook_image_prompt: "A pilot in a cockpit with alarms blaring, looking perfectly calm.",
                    pain_story: "You are good in a crisis. But sometimes you are too detached. People think you don't care. Or you bottle it up until you explode. You need a way to process stress physically.",
                    agitation_bullets: [
                        "Adrenaline dumps.",
                        "Emotional numbness.",
                        "Explosive anger."
                    ],
                    transition_mechanism: "Tactical Breathing. Biology overrides psychology.",
                    product_name: "The Zero-State Protocol",
                    product_description: "Techniques from special forces and stoicism.",
                    features_bullets: [
                        "Box Breathing mastery.",
                        "The 'Observer' mindset.",
                        "Decompressing after the rush."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Cold Exposure Guide", description: "Freeze the stress.", value: "$15" }
                    ],
                    guarantee_text: "Lower your heart rate.",
                    scarcity_text: "Stay cool.",
                    cta_text: "Freeze"
                }
            },
            {
                id: "mastery-path",
                title: "How to Get Good at Hands-On Skills Fast",
                script: {
                    headline: "Don't Read About It. Do It.",
                    subheadline: "Accelerated learning for the kinesthetic genius.",
                    hook_image_prompt: "Hands working on a complex watch mechanism.",
                    pain_story: "You hate classrooms. You hate theory. You learn by breaking things. Traditional education fails you because it doesn't let you touch the problem.",
                    agitation_bullets: [
                        "Boring lectures.",
                        "Theory without practice.",
                        "Reading manuals."
                    ],
                    transition_mechanism: "Deconstructive Learning. Take it apart to learn how it works.",
                    product_name: "The Hands-On Hacker",
                    product_description: "How to learn physical skills (coding, mechanics, wood, etc) rapidly.",
                    features_bullets: [
                        "The 'Sandbox' method.",
                        "Finding mentors who do, not teach.",
                        "Iterative failure."
                    ],
                    price_original: "$149",
                    price_discounted: "$47",
                    bonuses: [
                        { title: "Tool selection guide", description: "Buy once, cry once.", value: "$29" }
                    ],
                    guarantee_text: "Build something.",
                    scarcity_text: "Get hands dirty.",
                    cta_text: "Build It"
                }
            }
        ]
    },
    ISFP: {
        id: "isfp",
        name: "The Adventurer",
        artistic_vibe: "Bohemian loft, splattered paint, acoustic guitar, golden hour festivals, wildflower fields, indie aesthetics, sensory texture.",
        psychological_triggers: [
            "Aesthetics & Beauty",
            "Freedom of Expression",
            "Sensory Experience",
            "Authenticity",
            "Living in the Moment"
        ],
        products: [
            {
                id: "aesthetic-life",
                title: "How to Curate a Life that Looks and Feels like Art",
                script: {
                    headline: "Your Life is Your Masterpiece. Don't leave it Blank.",
                    subheadline: "Living intentionally through beauty.",
                    hook_image_prompt: "A room where every object triggers joy and color.",
                    pain_story: "You are sensitive to your environment. Ugly lights, bad textures, and boring walls drain your soul. You want your outer world to reflect your inner beauty.",
                    agitation_bullets: [
                        "Visual clutter.",
                        "Sensory overload.",
                        "Feeling bland."
                    ],
                    transition_mechanism: "Aesthetic Intentionality. Designing your environment to feed your spirit.",
                    product_name: "The Curator's Guide",
                    product_description: "Interior design and lifestyle curation for the ISFP.",
                    features_bullets: [
                        "Lighting as therapy.",
                        "Thrifting treasures.",
                        "The 'Vibe' check."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "Color Theory for Mood", description: "Paint your feelings.", value: "$15" }
                    ],
                    guarantee_text: "Beautify one corner.",
                    scarcity_text: "Make art.",
                    cta_text: "Curate"
                }
            },
            {
                id: "monetize-craft",
                title: "How to Sell Your Art without Feeling like a Sellout",
                script: {
                    headline: "Don't Starve. Thrive.",
                    subheadline: "Marketing for the shy artist.",
                    hook_image_prompt: "A gallery wall with 'Sold' stickers on everything.",
                    pain_story: "You make beautiful things. But you hate 'pushing' them. You hope people will just notice. They won't. You need a way to share your gift that feels genuine.",
                    agitation_bullets: [
                        "Underpricing work.",
                        "Hiding from customers.",
                        "Inventory piling up."
                    ],
                    transition_mechanism: "Visual Storytelling. Let the art speak, you just hold the megaphone.",
                    product_name: "The Quiet Creator's Market",
                    product_description: "Instagram and Pinterest strategies for visual artists.",
                    features_bullets: [
                        "Photography for products.",
                        "Writing captions that feel real.",
                        "Pricing based on soul."
                    ],
                    price_original: "$149",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Portfolio Review Checklist", description: "Look pro.", value: "$25" }
                    ],
                    guarantee_text: "Sell one piece.",
                    scarcity_text: "Show the world.",
                    cta_text: "Sell Art"
                }
            },
            {
                id: "sensory-meditation",
                title: "How to Find Peace through Your Senses (Not Thinking)",
                script: {
                    headline: "Get Out of Your Head. Get Into Your Body.",
                    subheadline: "Meditation for people who can't sit still.",
                    hook_image_prompt: "A hand running through tall grass at sunset.",
                    pain_story: "Standard meditation makes you anxious. 'Clear your mind'? Impossible. You experience the world through touch, taste, sound. Use that.",
                    agitation_bullets: [
                        "Monkey mind.",
                        "Fidgeting.",
                        "Boredom."
                    ],
                    transition_mechanism: "Somatic Immersion. Using sensory input to anchor the mind.",
                    product_name: "The Sensory Flow State",
                    product_description: "Mindfulness techniques based on art, nature, and music.",
                    features_bullets: [
                        "The 'Sound Bath' method.",
                        "Tactile grounding.",
                        "Visual gazing."
                    ],
                    price_original: "$79",
                    price_discounted: "$22",
                    bonuses: [
                        { title: "Nature Walk Audio", description: "Guided immersion.", value: "$11" }
                    ],
                    guarantee_text: "Feel peace.",
                    scarcity_text: "Senses awake.",
                    cta_text: "Feel Now"
                }
            },
            {
                id: "intuitive-style",
                title: "How to Dress to Express Your True Self",
                script: {
                    headline: "Fashion is Armor. Wear it Well.",
                    subheadline: "Style as self-expression, not trends.",
                    hook_image_prompt: "A mannequin with a unique, colorful, mismatched but perfect outfit.",
                    pain_story: "You hate uniforms. You hate looking like everyone else. But sometimes you struggle to put your unique vibe into a cohesive look. You want to walk into a room and be 'seen'.",
                    agitation_bullets: [
                        "Closet full of nothing to wear.",
                        "Feeling invisible.",
                        "Impulse shopping."
                    ],
                    transition_mechanism: "The Signature Style. Identifying your personal archetypes.",
                    product_name: "The Aesthetics of You",
                    product_description: "Developing a personal brand through fashion.",
                    features_bullets: [
                        "Thrifting for unicorns.",
                        "Breaking fashion rules.",
                        "The 'Comfort vs Style' myth."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Capsule Wardrobe for Rebels", description: "Mix and match.", value: "$19" }
                    ],
                    guarantee_text: "Love your look.",
                    scarcity_text: "Express yourself.",
                    cta_text: "Style Me"
                }
            },
            {
                id: "rebellious-self-care",
                title: "How to Take Care of Yourself without Following Rules",
                script: {
                    headline: "Your Body, Your Rules.",
                    subheadline: "Wellness for the non-conformist.",
                    hook_image_prompt: "A person doing yoga on a cliff edge at sunrise.",
                    pain_story: "You hate gyms. You hate diets. The moment someone tells you to do 10 reps, you want to leave. You need a way to move and eat that feels like freedom.",
                    agitation_bullets: [
                        "Gym boredom.",
                        "Diet rebellion.",
                        "Feeling trapped by routine."
                    ],
                    transition_mechanism: "Intuitive Living. Listening to the body's cravings and needs.",
                    product_name: "The Wild Wellness Guide",
                    product_description: "Fitness and health through dance, play, and nature.",
                    features_bullets: [
                        "Dance as cardio.",
                        "Eating with the seasons.",
                        "Rest as rebellion."
                    ],
                    price_original: "$89",
                    price_discounted: "$25",
                    bonuses: [
                        { title: "Playlist for Movement", description: "Rhythm is life.", value: "$10" }
                    ],
                    guarantee_text: "Move with joy.",
                    scarcity_text: "Break free.",
                    cta_text: "Live Wild"
                }
            }
        ]
    },
    ESTP: {
        id: "estp",
        name: "The Entrepreneur",
        artistic_vibe: "Stock tickers, fast cars, neon city lights, casino chips, sleek suits, energy drinks, high-contrast action shots.",
        psychological_triggers: [
            "Risk & Reward",
            "Immediate Impact",
            "Social Dominance",
            "Living on the Edge",
            "Closing the Deal"
        ],
        products: [
            {
                id: "start-business-24h",
                title: "How to Launch a Business this Weekend with $0",
                script: {
                    headline: "Stop Planning. Start Selling.",
                    subheadline: "From idea to cash in 48 hours.",
                    hook_image_prompt: "A smartphone displaying a Stripe notification: '$1,000 Payment Received'.",
                    pain_story: "You have 100 ideas. You see opportunity everywhere. But you get bogged down in 'legal' or 'websites'. You miss the window. You want the rush of the first sale.",
                    agitation_bullets: [
                        "Analysis paralysis.",
                        "Watching slower people succeed.",
                        "Leaving money on the table."
                    ],
                    transition_mechanism: "The Lean Launch. Sell first, build later.",
                    product_name: "The Weekend Empire",
                    product_description: "Step-by-step guide to validating and selling instantly.",
                    features_bullets: [
                        "Preselling scripts.",
                        "Landing pages that convert.",
                        "Getting the first user."
                    ],
                    price_original: "$199",
                    price_discounted: "$47",
                    bonuses: [
                        { title: "Cold DM Templates", description: "Slide in and sell.", value: "$29" }
                    ],
                    guarantee_text: "Make a dollar or refund.",
                    scarcity_text: "Launch now.",
                    cta_text: "Launch"
                }
            },
            {
                id: "high-stakes-negotiation",
                title: "How to Negotiate Anything like a Hostage Negotiator",
                script: {
                    headline: "Everything is Negotiable. If You Have the Guts.",
                    subheadline: "Get what you want by reading the room.",
                    hook_image_prompt: "Two hands shaking over a table covered in money.",
                    pain_story: "You know you are leaving value on the table. You hate paying retail. You hate losing arguments. You want the thrill of the win.",
                    agitation_bullets: [
                        "Overpaying.",
                        "Getting rolled.",
                        "Feeling weak."
                    ],
                    transition_mechanism: "Leverage Dynamics. Identifying what they have to lose.",
                    product_name: "The Dealmaker's code",
                    product_description: "Psychological tactics for negotiation.",
                    features_bullets: [
                        "The 'Flinch' technique.",
                        "Silence as a weapon.",
                        "Anchoring high."
                    ],
                    price_original: "$249",
                    price_discounted: "$69",
                    bonuses: [
                        { title: "Salary Negotiation Script", description: "+$10k instantly.", value: "$39" }
                    ],
                    guarantee_text: "Win a deal.",
                    scarcity_text: "Close it.",
                    cta_text: "Negotiate"
                }
            },
            {
                id: "magnetic-persuasion",
                title: "How to Charm Anyone into Doing Anything",
                script: {
                    headline: "Charisma is a Cheat Code.",
                    subheadline: "Unlock doors with a smile and a sentence.",
                    hook_image_prompt: "A person in a crowd, glowing, with everyone leaning in towards them.",
                    pain_story: "You are naturally charming, but you want to weaponize it. You want to be able to talk your way into VIP, out of tickets, and into deals.",
                    agitation_bullets: [
                        "Getting 'No'.",
                        "Being ignored.",
                        "Social friction."
                    ],
                    transition_mechanism: "Social Jiu-Jitsu. Using their momentum against them.",
                    product_name: "The Silver Tongue",
                    product_description: "Advanced persuasion and social engineering.",
                    features_bullets: [
                        "Pattern interrupts.",
                        "Hypnotic language patterns.",
                        "Building instant rapport."
                    ],
                    price_original: "$199",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Pickup Lines that Work (Business)", description: "Open any door.", value: "$25" }
                    ],
                    guarantee_text: "Charm someone today.",
                    scarcity_text: "Open doors.",
                    cta_text: "Charm"
                }
            },
            {
                id: "adrenaline-productivity",
                title: "How to Get More Done in 2 Hours of Chaos than 2 Weeks of Order",
                script: {
                    headline: "Procrastination is Fuel.",
                    subheadline: "Using the deadline rush to create diamonds.",
                    hook_image_prompt: "A clock ticking down the final second, an explosion of productivity.",
                    pain_story: "You can't work without a fire under you. People tell you to plan ahead. Screw that. You work best when the building is burning. Learn to harness the fire.",
                    agitation_bullets: [
                        "Boredom lethargy.",
                        "Guilt about waiting.",
                        "Last minute panic attacks."
                    ],
                    transition_mechanism: "Controlled Crisis. Manufacturing urgency to trigger flow.",
                    product_name: "The Crunch-Time Protocol",
                    product_description: "Productivity for adrenaline junkies.",
                    features_bullets: [
                        "Setting fake stakes.",
                        "The 'Sprint' workflow.",
                        "Post-game recovery."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Focus Playlists (Techno)", description: "High BPM work.", value: "$15" }
                    ],
                    guarantee_text: "Finish the impossible.",
                    scarcity_text: "Go fast.",
                    cta_text: "Sprint"
                }
            },
            {
                id: "risk-management",
                title: "How to Take Big Risks without Losing it All",
                script: {
                    headline: "Fortune Favors the Bold. But it Punishes the Stupid.",
                    subheadline: "Calculated gambling for life and business.",
                    hook_image_prompt: "A poker player pushing chips 'All In' with a slight smile.",
                    pain_story: "You love risk. But you've been burned. You want to swing for the fences without striking out. You need a system for evaluating upsides.",
                    agitation_bullets: [
                        "Reckless losses.",
                        "Regret.",
                        "Being told to 'play safe'."
                    ],
                    transition_mechanism: "Asymmetric Betting. Capping the downside, uncapping the upside.",
                    product_name: "The Gambler's Advantage",
                    product_description: "Risk assessment frameworks.",
                    features_bullets: [
                        "Expected Value calculations.",
                        "Hedging your bets.",
                        "Knowing when to fold."
                    ],
                    price_original: "$149",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Crisis Management", description: "When it hits the fan.", value: "$29" }
                    ],
                    guarantee_text: "Bet smarter.",
                    scarcity_text: "Roll dice.",
                    cta_text: "Bet Now"
                }
            }
        ]
    },
    ESFP: {
        id: "esfp",
        name: "The Entertainer",
        artistic_vibe: "Spotlights, sequins, confetti, dance floors, vibrant tropical colors, paparazzi flashbulbs, laughter waves.",
        psychological_triggers: [
            "Being the Star",
            "Fun & Excitement",
            "Spontaneity",
            "Connecting through Joy",
            "FOMO"
        ],
        products: [
            {
                id: "be-the-star",
                title: "How to Light Up Every Room You Walk Into",
                script: {
                    headline: "The World is a Stage. Own It.",
                    subheadline: "Maximize your natural magnetism.",
                    hook_image_prompt: "A person stepping onto a dance floor, the crowd parting and cheering.",
                    pain_story: "You love attention, but you want it to be for the right reasons. You want to be remembered as the person who made everyone feel amazing, not just loud.",
                    agitation_bullets: [
                        "Being dismissed as 'too much'.",
                        "Post-party emptiness.",
                        "Needing validation."
                    ],
                    transition_mechanism: "Radiant Presence. Projecting joy outwards so it reflects back.",
                    product_name: "The Spotlight Effect",
                    product_description: "Enhancing your natural star power.",
                    features_bullets: [
                        "Entrance/Exit tech.",
                        "The 'Energy Gift'.",
                        "Handling hecklers (haters)."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Style for Impact", description: "Dress loud.", value: "$19" }
                    ],
                    guarantee_text: "Get a standing ovation.",
                    scarcity_text: "Showtime.",
                    cta_text: "Shine"
                }
            },
            {
                id: "getting-paid-to-party",
                title: "How to Turn Your Social Life into a Business",
                script: {
                    headline: "Stop Partying for Free.",
                    subheadline: "Monetize your vibe.",
                    hook_image_prompt: "A VIP pass made of solid gold.",
                    pain_story: "You are the one bringing the party. Why aren't you getting paid? You organize the fun, you bring the people. It's time to cash in on your gravity.",
                    agitation_bullets: [
                        "Being the broke 'fun' friend.",
                        "Spending money to entertain others.",
                        "Wasted influence."
                    ],
                    transition_mechanism: "The Promoter Model. Getting paid for access and atmosphere.",
                    product_name: "The Vibe Capitalist",
                    product_description: "Event promotion and influencing 101.",
                    features_bullets: [
                        "Sponsorships for events.",
                        "Getting into VIP for free.",
                        "Building a contact list."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Brand Deal Templates", description: "Get paid to post.", value: "$29" }
                    ],
                    guarantee_text: "Get a free drink.",
                    scarcity_text: "List only.",
                    cta_text: "Cash In"
                }
            },
            {
                id: "improv-life",
                title: "How to Never Be Bored or Boring Again",
                script: {
                    headline: "Say Yes, And...",
                    subheadline: "Living life unscripted and fearless.",
                    hook_image_prompt: "A life raft turning into a luxury yacht instantly.",
                    pain_story: "You fear boredom like death. You hate scripts. You want to flow through life, handling whatever comes with a laugh. But anxiety sometimes kills the joke.",
                    agitation_bullets: [
                        "Awkward pauses.",
                        "Fear of stillness.",
                        "Trying too hard."
                    ],
                    transition_mechanism: "Improv Mindset. Trusting your future self to handle the moment.",
                    product_name: "The Improv Life",
                    product_description: "Using comedy techniques for confidence.",
                    features_bullets: [
                        "Thinking on your feet.",
                        "Turning mistakes into bits.",
                        "The 'Rule of Cool'."
                    ],
                    price_original: "$99",
                    price_discounted: "$27",
                    bonuses: [
                        { title: "The Joke Vault", description: "Emergency laughs.", value: "$15" }
                    ],
                    guarantee_text: "Laugh more.",
                    scarcity_text: "Action.",
                    cta_text: "Improv"
                }
            },
            {
                id: "joy-business",
                title: "How to Bring Fun into the Workplace (and get promoted)",
                script: {
                    headline: "Serious Business Needs Serious Fun.",
                    subheadline: "Becoming the Chief Joy Officer.",
                    hook_image_prompt: "A gray office cubicle bursting into colorful confetti.",
                    pain_story: "Work is so... serious. It drains you. You know that happy people work harder, but the bosses are stiff. You want to be successful without becoming a robot.",
                    agitation_bullets: [
                        "Corporate depression.",
                        "Stifling your laughter.",
                        "Dying inside."
                    ],
                    transition_mechanism: "Cultural Alchemy. Transforming morale through energy.",
                    product_name: "The Morale Booster",
                    product_description: "Leading through positivity.",
                    features_bullets: [
                        "Gamifying KPIs.",
                        "Team building that doesn't suck.",
                        "Infectious enthusiasm."
                    ],
                    price_original: "$149",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "Icebreakers that Work", description: "Actually fun.", value: "$19" }
                    ],
                    guarantee_text: "Make work fun.",
                    scarcity_text: "Smile.",
                    cta_text: "Bring Joy"
                }
            },
            {
                id: "spontaneous-living",
                title: "How to Plan for Spontaneity (Irony Intended)",
                script: {
                    headline: "Leave Room for the Magic.",
                    subheadline: "Structuring your life to say Yes.",
                    hook_image_prompt: "A calendar with blank spaces that glow gold.",
                    pain_story: "You hate commitment because it kills options. But having NO plan means you end up doing nothing. You need a structure that creates freedom.",
                    agitation_bullets: [
                        "Flaking on plans.",
                        "Analysis paralysis on Friday night.",
                        "Wasting weekends."
                    ],
                    transition_mechanism: "The Open-Ended Framework. Rules that create space.",
                    product_name: "The Freedom Archer",
                    product_description: "Scheduling for freedom seekers.",
                    features_bullets: [
                        "The 'Wildcard' Weekend.",
                        "Money buffer for spontaneity.",
                        "Saying Yes without regret."
                    ],
                    price_original: "$89",
                    price_discounted: "$25",
                    bonuses: [
                        { title: "Last Minute Travel Hacks", description: "Go now.", value: "$15" }
                    ],
                    guarantee_text: "Do something wild.",
                    scarcity_text: "Go.",
                    cta_text: "Live Free"
                }
            }
        ]
    }
};
