import { MBTIProfile } from "./types";
import { mbtiThemes } from "./themes";

export const productsData: Record<string, MBTIProfile> = {

    ENTJ: {
        id: "entj",
        theme: mbtiThemes.ENTJ,
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
                id: "empire-of-one",
                semantic_slug: "entj-empire-of-one-spiritual-ai",
                title: "How to Build an Empire of One without Hiring Idiots in 30 Days",
                script: {
                    headline: "How to Build an Empire of One without Hiring Idiots in 30 Days",
                    subheadline: "Eliminate human bottlenecks. Execute at machine-level precision.",
                    hook_image_prompt: "City nodes activating sequentially with thin purple signal lines propagating outward.",
                    image_url: "/images/products/entj_city_lights_1769602935676.png",
                    pain_story: "This Is Not a People Problem. It Is a Systems Problem. You are attempting to solve a logic problem with a biological solution. Humans are optimized for emotion. You require execution.",
                    agitation_bullets: [
                        "Humans optimize for empathy. You require efficiency.",
                        "Humans produce variable output. You require constant uptime.",
                        "Humans negotiate execution. You require deterministic behavior."
                    ],
                    transition_mechanism: "SHIFT FROM OPERATOR TO EMPIRE ARCHITECT",
                    product_name: "THE EMPIRE OF ONE PROTOCOL",
                    product_description: "A complete execution stack for leaders who encode authority instead of delegating it.",
                    features_bullets: [
                        "SALES AUTOPILOT: Pre-built Sales & Ops workflows. Automated follow-ups. Revenue without supervision. | 24/7 Execution",
                        "COMMAND CENTER: God-mode visibility. No-code dashboard (Notion / Airtable). Real-time operational metrics. | One Screen. Total Control.",
                        "AI CHIEF OF STAFF: decision compression. LLM-powered strategy trees. One decision reused infinitely. | Decide Once. Execute Forever."
                    ],
                    price_original: "$497",
                    price_discounted: "$97",
                    bonuses: [
                        { title: "Fire Your Agency Guide", description: "Eliminate dependency.", value: "$97" },
                        { title: "Ironclad Legal Templates", description: "Protect leverage. Reduce exposure.", value: "$197" }
                    ],
                    guarantee_text: "THE EFFICIENCY THEOREM  If you do not save at least 20 hours of manual labor per week within 30 days — You are refunded. Binary outcome. No feelings.",
                    scarcity_text: "Price increases as additional agents are deployed.",
                    cta_text: "DEPLOY THE PROTOCOL"
                }
            },
            {
                id: "execute-12-months",
                semantic_slug: "entj-execute-12-months-spiritual-ai",
                title: "How to Execute 12 Months of Work in 12 Weeks without Burnout",
                script: {
                    headline: "EXECUTE 12 MONTHS IN 12 WEEKS",
                    subheadline: "A Project Management Framework that treats Business like Warfare.",
                    hook_image_prompt: "A war room map with targets being eliminated in rapid succession.",
                    image_url: "/images/products/entj_command_center_1769602905026.png",
                    pain_story: "Burnout doesn't come from intensity. It comes from friction. When you slow down, your brain starves. You start overthinking. You invent problems just to solve them. You feel exhausted not because you are doing too much, but because your results are lagging behind your vision.",
                    agitation_bullets: [
                        "Death by meetings.",
                        "The slow drift of deadlines.",
                        "Losing market share to faster, dumber competitors."
                    ],
                    transition_mechanism: "BLITZKRIEG YOUR GOALS.",
                    product_name: "THE WAR-TIME EXECUTION FRAMEWORK",
                    product_description: "A project management framework that treats business like warfare. No fluff, just objectives and key results.",
                    features_bullets: [
                        "CAMPAIGN PLANNER: Dashboard for defining \"Commander's Intent\" for 12-week blocks.",
                        "\"KILL LIST\" PROTOCOL: Ruthlessly eliminate 80% of tasks that are just \"motion\" disguised as progress.",
                        "POST-WAR RECOVERY: Strategic detachment protocols to recover before the next offensive."
                    ],
                    price_original: "$299",
                    price_discounted: "$79",
                    bonuses: [
                        { title: "Zero-Inbox Aggression", description: "Process email like a machine gun.", value: "$47" }
                    ],
                    guarantee_text: "THE VELOCITY  If you do not complete your primary \"One Year Goal\" within the first 12-week cycle, we refund you. If you can't move fast, we don't want your money.",
                    scarcity_text: "The market won't wait.",
                    cta_text: "INITIATE CAMPAIGN"
                }
            },
            {
                id: "outmaneuver-competitor",
                semantic_slug: "entj-outmaneuver-competitor-spiritual-ai",
                title: "How to Outmaneuver Any Competitor without Lowering Your Prices",
                script: {
                    headline: "GRAND STRATEGY",
                    subheadline: "How to Outmaneuver Any Competitor Without Lowering Your Prices.",
                    hook_image_prompt: "A chessboard where the pieces are skyscrapers and brands.",
                    image_url: "/images/products/entj_chess_skyscrapers_1769602974508.png",
                    pain_story: "When a prospect chooses a competitor over you, it's not because of the price tag. It's because your competitor occupies a more valuable territory in their mind. You have focused so much on \"product quality\" (a commodity) that you forgot Grand Strategy. You are playing checkers—reacting to the market—while the true titans are playing 4D Chess.",
                    agitation_bullets: [
                        "Pricing wars that race to the bottom.",
                        "Copycats stealing your features.",
                        "Market noise drowning out your quality."
                    ],
                    transition_mechanism: "YOU ARE TOO HONEST.",
                    product_name: "THE GRAND STRATEGY LIBRARY",
                    product_description: "A strategic library of business moves derived from history's greatest conquerors, adapted for the digital age.",
                    features_bullets: [
                        "THE 33 STRATEGIES: Pattern maneuvers like \"The Blue Ocean Pivot\" and \"The Poison Pill.\"",
                        "VALUE LADDER FORTIFICATION: Structure pricing so \"lowering prices\" becomes mathematically impossible for rivals.",
                        "PSYCHOLOGICAL PSY-OPS: Brand signaling that makes competitors look cheap and amateur."
                    ],
                    price_original: "$1000",
                    price_discounted: "$197",
                    bonuses: [
                        { title: "Sun Tzu for SaaS", description: "Ancient wisdom for recurring revenue.", value: "$39" }
                    ],
                    guarantee_text: "THE CHECKMATE  Implement ONE strategy. If you don't see a measurable increase in share or conversion, we refund you.",
                    scarcity_text: "Strategy session intake closing.",
                    cta_text: "ENTER THE WAR ROOM"
                }
            },
            {
                id: "command-room",
                semantic_slug: "entj-command-room-spiritual-ai",
                title: "How to Command Any Room without saying a Word in 3 Seconds",
                script: {
                    headline: "COMMAND THE ROOM.",
                    subheadline: "Without saying a word. In 3 seconds.",
                    hook_image_prompt: "A silhouette in a boardroom casting a shadow that commands attention.",
                    image_url: "/images/products/entj_executive.png",
                    pain_story: "You have spent years sharpening your mind, but you have neglected your Signal. Humans are biological machines. Before you speak a single word, the \"Lizard Brain\" of everyone in the room has already categorized you: Leader or Follower. Threat or Prey.",
                    agitation_bullets: [
                        "Being interrupted.",
                        "Having your ideas stolen and repeated back to you.",
                        "Feeling invisible despite being the smartest in the room."
                    ],
                    transition_mechanism: "YOU RELY ON WORDS.",
                    product_name: "EXECUTIVE PRESENCE",
                    product_description: "A guide to voice modulation, posture, and micro-behaviors that signal status.",
                    features_bullets: [
                        "VOCAL GRAVITY: How to lower pitch and slow cadence to trigger instant authority.",
                        "THE 3-SECOND SCAN: The exact eye contact pattern that establishes you as Alpha.",
                        "SPATIAL DOMINANCE: How to \"own\" the room before you even sit down."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Wardrobe Power Dynamics", description: "Dress like you own the place.", value: "$29" }
                    ],
                    guarantee_text: "THE SILENCE  Use the \"3-Second Scan\". If the room does not visibly quiet down to wait for you, we refund you. Presence is measurable.",
                    scarcity_text: "Limited coaching spots.",
                    cta_text: "COMMAND RESPECT"
                }
            },
            {
                id: "vision-survives",
                semantic_slug: "entj-vision-survives-spiritual-ai",
                title: "How to Ensure Your Vision Survives without Micro-Managing in Perpetuity",
                script: {
                    headline: "THE DYNASTY ARCHITECTURE",
                    subheadline: "How to Ensure Your Vision Survives Without You.",
                    hook_image_prompt: "A statue made of light networks being built by automated drones.",
                    image_url: "/images/products/entj_vision_network.png",
                    pain_story: "Your values are in your head, not in the code. You expect \"Common Sense\" in a world where it doesn't exist. You haven't programmed them to think like you. You need to stop looking for \"Mini-Mes\" and start building a Source Code for Behavior.",
                    agitation_bullets: [
                        "The 'Bus Factor' of 1.",
                        "Being unable to sell your company because YOU are the company.",
                        "Watching systems degrade the moment you look away."
                    ],
                    transition_mechanism: "YOU ARE THE BOTTLENECK.",
                    product_name: "THE DYNASTY ARCHITECTURE",
                    product_description: "How to turn your values into algorithms and culture that self-replicates.",
                    features_bullets: [
                        "THE CULTURE CODEX: The \"Bible\" that answers every \"What would the founder do?\" question.",
                        "THE HIRING FILTER: Psychological screening to reject 99% of applicants who don't share the DNA.",
                        "THE FOUNDER'S EXIT: A 3-stage plan to remove yourself from Ops, then Strategy, then Ownership."
                    ],
                    price_original: "$1500",
                    price_discounted: "$397",
                    bonuses: [
                        { title: "The Exit Strategy", description: "Prepare to sell for 10x multiples.", value: "$99" }
                    ],
                    guarantee_text: "THE VACATION  Implement the Codex. Take a 2-week off-grid vacation. If you come back to a fire that wasn't handled by the protocol, we refund you.",
                    scarcity_text: "Legacy tier closing.",
                    cta_text: "SCALE THE VISION"
                }
            }
        ]
    },
    INTJ: {
        id: "intj",
        theme: mbtiThemes.INTJ,
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
                id: "systemize-life",
                semantic_slug: "intj-systemize-life-spiritual-ai",
                title: "How to Systemize Your Entire Life without Losing Your Soul in 3 Days",
                script: {
                    headline: "Systemize Your Existence.",
                    subheadline: "A comprehensive Notion & AI template to manage your goals, habits, and knowledge.",
                    hook_image_prompt: "A vitruvian man silhouette overlaid with glowing thin cyan circuit schematics and sacred geometry, dark background, minimal",
                    image_url: "/images/products/intj_systemize.png",
                    pain_story: "Every uncaptured thought, every vague \"to-do,\" and every unorganized bookmark is taking up processing power in your brain. You are exhausted not because you are working hard, but because you are constantly holding the state of your entire life in your working memory. You are trying to be the CEO and the Hard Drive at the same time. It is inefficient.",
                    agitation_bullets: [
                        "Dealing with repetitive, low-value tasks.",
                        "Feeling exhausted by the chaos of other people.",
                        "Knowing you're operating at 60% capacity due to friction."
                    ],
                    transition_mechanism: "YOU OVER-ENGINEER EVERYTHING.",
                    product_name: "THE LifeOS ARCHITECTURE",
                    product_description: "A comprehensive Notion & AI template that manages your goals, habits, and knowledge. A dashboard for your existence.",
                    features_bullets: [
                        "import CommandDashboard from './Core'; // A single screen for health, wealth, and priorities.",
                        "import SecondBrain from './Knowledge'; // Capture pipeline -> Permanent Notes."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Meal Prep Algorithms", description: "Nutrition solved mathematically.", value: "$19" }
                    ],
                    guarantee_text: "if (clarity < current_levels) return refund();",
                    scarcity_text: "Version 2.0 launch price.",
                    cta_text: "> INITIALIZE SYSTEM_"
                }
            },
            {
                id: "think-ahead",
                semantic_slug: "intj-think-ahead-spiritual-ai",
                title: "How to Think 10 Steps Ahead of Everyone Else without Stress",
                script: {
                    headline: "FORECAST THE FUTURE.",
                    subheadline: "\"You aren't anxious. You are just simulating unoptimized realities.\"",
                    hook_image_prompt: "A 3D glass chessboard floating in a dark void, a hand moving a single piece that ripples into the future, cyan glow",
                    image_url: "/images/products/intj_chess.png",
                    pain_story: "You are trying to calculate the future using raw instinct. That is like trying to do calculus in your head. It works, but it burns a lot of glucose. The problem isn't that you think too much. It's that you don't have a Framework to contain your thoughts.",
                    agitation_bullets: [
                        "Watching others walk into traps you saw miles away.",
                        "Being labeled a 'dreamer' or 'planner' but not a doer.",
                        "Paralysis by over-calculation."
                    ],
                    transition_mechanism: "YOU ARE QUIETLY ARROGANT.",
                    product_name: "THE STRATEGIC MINDWARE LIBRARY",
                    product_description: "Mental models from chess, war, and economics to navigate career and life.",
                    features_bullets: [
                        "The Game Theory Matrix: Navigate negotiations using Nash Equilibrium principles.",
                        "The \"OODA Loop\" Speed-Run: Observe-Orient-Decide-Act faster than your competition.",
                        "The Second-Order Map: Visualize the consequences of your consequences."
                    ],
                    price_original: "$199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Risk Mitigation Checklists", description: "Bulletproof your plans.", value: "$29" }
                    ],
                    guarantee_text: "THE PREDICTION - Use one model on a current problem. If clarity is not instantaneous, we refund you.",
                    scarcity_text: "Limited strategic intake.",
                    cta_text: "ACCESS MODELS"
                }
            },
            {
                id: "rapid-competence",
                semantic_slug: "intj-rapid-competence-spiritual-ai",
                title: "How to Achieve Top 1% Competence in Any Field in 6 Months",
                script: {
                    headline: "TOP 1% COMPETENCE IN 6 MONTHS.",
                    subheadline: "Structure your environment for Theta State focus.",
                    hook_image_prompt: "A complex fractal pattern zooming infinitely into a glowing core, dark obsidian and cyan palette",
                    image_url: "/images/products/intj_fractal.png",
                    pain_story: "Most people learn by \"osmosis\"—hoping it sticks. This is inefficient. The INTJ mind craves Structure. You need to deconstruct the skill into its atomic components and ruthlessly drill them in isolation. You aren't struggling because the subject is hard. You are struggling because your method is soft.",
                    agitation_bullets: [
                        "Being taught by people who know less than you.",
                        "The slow pace of 'group learning'.",
                        "The gap between your taste and your ability."
                    ],
                    transition_mechanism: "YOU HOARD INFORMATION.",
                    product_name: "THE RAPID ACQUISITION PROTOCOL",
                    product_description: "A protocol for rapid skill acquisition using isolation tanks and feedback loops.",
                    features_bullets: [
                        "Deconstruction Template: Break any skill into 5 atomic pillars.",
                        "The Feedback Rig: Automated loops to know you are wrong *immediately*.",
                        "The Isolation Chamber: Structure your environment for Theta State focus."
                    ],
                    price_original: "$299",
                    price_discounted: "$89",
                    bonuses: [
                        { title: "Imposter Syndrome Killer", description: "Use logic to defeat insecurity.", value: "$25" }
                    ],
                    guarantee_text: "THE PROFICIENCY - If you cannot demonstrate a measurable leap in competence in 30 days, we refund you.",
                    scarcity_text: "Protocol active.",
                    cta_text: "START THE PROTOCOL"
                }
            },
            {
                id: "win-arguments",
                semantic_slug: "intj-win-arguments-spiritual-ai",
                title: "How to Win Every Argument with Pure Logic without Raising Your Voice",
                script: {
                    headline: "WIN WITH PURE LOGIC.",
                    subheadline: "How to dismantle irrationality without raising your voice.",
                    hook_image_prompt: "A precise laser beam cutting through thick fog, revealing a clear geometric path, minimal dark aesthetic",
                    image_url: "/images/products/intj_laser.png",
                    pain_story: "You operate on Logic Level 10. Most people operate on Emotion Level 10. When you present data to an emotional person, it doesn't persuade them—it insults them. You are losing because your delivery system is incompatible with their hardware.",
                    agitation_bullets: [
                        "Losing debates to charismatic idiots.",
                        "Frustration with 'feelings' overriding facts.",
                        "Being called 'cold' for being right."
                    ],
                    transition_mechanism: "YOU CAN BE INSUFFERABLE.",
                    product_name: "RATIONAL RHETORIC",
                    product_description: "Rhetorical strategies for the rational mind.",
                    features_bullets: [
                        "The Fallacy Encyclopedia: Spot Strawman, Ad Hominem, and Tu Quoque in real-time.",
                        "The \"Steel Man\" Technique: Argue their side better than they can to build absolute trust.",
                        "The Emotional Shield: Breathing protocols to keep heart rate under 80 BPM."
                    ],
                    price_original: "$199",
                    price_discounted: "$69",
                    bonuses: [
                        { title: "Handling Emotional Outbursts", description: "A field guide for the rational.", value: "$19" }
                    ],
                    guarantee_text: "THE CLARITY - If this toolkit doesn't help you de-escalate and win a conflict within 30 days, we refund you.",
                    scarcity_text: "Knowledge is power.",
                    cta_text: "ARM YOUR MIND"
                }
            },
            {
                id: "global-business",
                semantic_slug: "intj-global-business-spiritual-ai",
                title: "How to run a Global Business from a Dark Room without Employees",
                script: {
                    headline: "RUN A GLOBAL BUSINESS FROM A DARK ROOM.",
                    subheadline: "Without employees. Without meetings. 100% Async.",
                    hook_image_prompt: "A silhouette of a person controlling a global network of lights from a single tablet in a dark room, cyber aesthetics",
                    image_url: "/images/products/intj_network.png",
                    pain_story: "You are exhausted because you have built a business that relies on your presence rather than your code. You are trading your limited social battery for dollars. This is a bad trade.",
                    agitation_bullets: [
                        "HR issues.",
                        "Motivation speeches.",
                        "Inefficient communication channels."
                    ],
                    transition_mechanism: "YOU DON'T WANT TO LEAD.",
                    product_name: "THE DARK ROOM PROTOCOL",
                    product_description: "Architecture for a one-person unicorn.",
                    features_bullets: [
                        "Zero-Employee Tech Stack: Replace a team of 10 with Make, OpenAI, and Stripe.",
                        "Async Manifesto: Train clients to never expect a phone call—and love you for it.",
                        "The \"Ghost\" Brand: Build a brand larger than life without showing your face."
                    ],
                    price_original: "$499",
                    price_discounted: "$197",
                    bonuses: [
                        { title: "The Anti-Social Social Media Plan", description: "Growth without personality.", value: "$49" }
                    ],
                    guarantee_text: "THE FREEDOM - If this course requires you to hire a single employee or take a single phone call, we refund you.",
                    scarcity_text: "Blueprints limited.",
                    cta_text: "GO DARK"
                }
            }
        ]
    },
    ENTP: {
        id: "entp",
        theme: mbtiThemes.ENTP,
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
                id: "idea-generator",
                semantic_slug: "entp-idea-generator-spiritual-ai",
                title: "How to Generate Million-Dollar Ideas on Demand without Writer's Block",
                script: {
                    headline: "MILLION DOLLAR IDEAS ON DEMAND.",
                    subheadline: "Writer's block is just a lack of chaos.",
                    hook_image_prompt: "A lightbulb exploding into a thousand butterflies made of neon light.",
                    image_url: "/images/products/entp_idea_generator.png",
                    pain_story: "Your brain is a nuclear reactor, but you aren't feeding it fuel. Your best ideas come when you smash two unrelated concepts together. When you stare at a blank page, you are trying to create ex nihilo. That is boring. And your brain shuts down when it is bored.",
                    agitation_bullets: [
                        "The graveyard of unfinished projects.",
                        "Boredom setting in the moment things get 'stable'.",
                        "People telling you to 'focus' when you want to explore."
                    ],
                    transition_mechanism: "YOU ARE ADDICTED TO THE START.",
                    product_name: "THE GENESIS ENGINE",
                    product_description: "A framework for smashing concepts together to create new value.",
                    features_bullets: [
                        "The Concept Collider: Spin the wheel. 100 industries x 100 models. Instant disruption.",
                        "Validation Gauntlet: Test if an idea is actually good or just \"2 AM good\" in 15 mins.",
                        "The Idea Bank: Store \"maybe later\" ideas so they don't clog your RAM."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Shiny Object Syndrome Tamer", description: "How to pick the winner.", value: "$29" }
                    ],
                    guarantee_text: "THE EPIPHANY  If you don't have 3 ideas that make you laugh maniacally in 10 minutes, we refund you.",
                    scarcity_text: "Spark innovation only.",
                    cta_text: "GENERATE CHAOS"
                }
            },
            {
                id: "persuasion",
                semantic_slug: "entp-persuasion-spiritual-ai",
                title: "How to Persuade Anyone of Anything (Even if You Don't Believe it)",
                script: {
                    headline: "REALITY IS NEGOTIABLE.",
                    subheadline: "How to Persuade Anyone of Anything. Even if you don't believe it.",
                    hook_image_prompt: "A warped reality mirror showing what the person wants to see.",
                    image_url: "/images/products/entp_persuasion.png",
                    pain_story: "You are losing debates because you are trying to win on the merits of the data. But humans are not rational agents. They are emotional belief-engines. Stop acting like a Professor. Start acting like a Prophet.",
                    agitation_bullets: [
                        "Accidentally offending people with 'logic'.",
                        "Being labeled a 'contrarian'.",
                        "Knowing you could sell ice to eskimos but lacking the product."
                    ],
                    transition_mechanism: "YOU ARE A MERCENARY.",
                    product_name: "THE BELIEF ENGINEERING KIT",
                    product_description: "Persuasion techniques modeled after Steve Jobs and cult leaders.",
                    features_bullets: [
                        "The Framing Matrix: Win the conversation before you speak.",
                        "The \"Cult of One\": 5 steps to creating a fanatical following.",
                        "Verbal Sleight-of-Hand: NLP patterns that bypass critical filters."
                    ],
                    price_original: "$249",
                    price_discounted: "$88",
                    bonuses: [
                        { title: "Getting Out of Trouble", description: "Verbal self-defense.", value: "$39" }
                    ],
                    guarantee_text: "THE \"YES\"  Use the Framing Matrix. If you can't get agreement on a ridiculous premise in 5 mins, we refund you.",
                    scarcity_text: "Dangerous knowledge.",
                    cta_text: "INSTALL INFLUENCE"
                }
            },
            {
                id: "thrive-chaos",
                semantic_slug: "entp-thrive-chaos-spiritual-ai",
                title: "How to Thrive in Uncertainty when Everyone Else is Panicking",
                script: {
                    headline: "CHAOS IS A LADDER.",
                    subheadline: "How to Thrive in Uncertainty When Everyone Else is Panicking.",
                    hook_image_prompt: "A surfer riding a tidal wave of digital static and debris with a smile.",
                    image_url: "/images/products/entp_chaos.png",
                    pain_story: "You have spent your whole life being told to \"be stable.\" That works in a linear world. We are now in an exponential, chaotic world. Your \"scattered\" brain—which constantly scans for new options—is actually the perfect evolutionary adaptation. The world has finally caught up to your madness.",
                    agitation_bullets: [
                        "Feeling trapped by safety.",
                        "Self-sabotaging just to feel something.",
                        "Being told to 'calm down'."
                    ],
                    transition_mechanism: "YOU HATE STABILITY.",
                    product_name: "THE CHAOS PROTOCOL",
                    product_description: "How to position yourself to profit from volatility.",
                    features_bullets: [
                        "The Barbell Strategy: Be ultra-safe in 90% of life to be ultra-aggressive in the 10%.",
                        "The Pivot Engine: Re-skill in 2 weeks when your industry implodes.",
                        "The Optionality Audit: Structure your career so you always have 3 exit doors."
                    ],
                    price_original: "DATA: $199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Adrenaline Management", description: "Avoid the crash.", value: "$27" }
                    ],
                    guarantee_text: "THE \"ZERO ANXIETY\"  Apply the strategy. If your fear drops by 50% in 14 days, great. If not, refund.",
                    scarcity_text: "Storm approaching.",
                    cta_text: "EMBRACE CHAOS"
                }
            },
            {
                id: "speed-learning",
                semantic_slug: "entp-speed-learning-spiritual-ai",
                title: "How to Bypass 10 Years of Career Laddering in 6 months",
                script: {
                    headline: "Learn faster by breaking the rules — not by waiting your turn.",
                    subheadline: "You don't need discipline. You need optionality.",
                    hook_image_prompt: "A confused businessman standing in the center of a maze, walls shifting.",
                    image_url: "/images/products/entp_speed_learning.png",
                    pain_story: "You don't learn by memorizing rules. You learn by taking the machine apart, breaking it fifty times, and Googling the error messages. Your brain isn't a filing cabinet. It's a reverse-engineering engine.",
                    agitation_bullets: [
                        "Wait your turn",
                        "Respect authority that hasn't earned it",
                        "Trust the slow crawl of 'meritocracy'"
                    ],
                    transition_mechanism: "YOU ARE IMPATIENT WITH INEFFICIENCY.",
                    product_name: "THE SPEEDRUNNER'S CODEX",
                    product_description: "Unconventional strategies for collapsing learning curves and skipping invisible queues.",
                    features_bullets: [
                        "Deconstruction Heuristic: Breaks any skill into atomic, learnable parts.",
                        "Social Engineering Script: Gets experts to teach you for free — without feeling used.",
                        "Immersion Hack: Turns your environment into a passive learning engine."
                    ],
                    price_original: "$150",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Resume Hacking", description: "Beat the ATS. Get past the bots.", value: "$29" }
                    ],
                    guarantee_text: "THE SHORTCUT PROMISE  If this feels like work, you get a refund. It should feel like cheating.",
                    scarcity_text: "Exploit patching soon.",
                    cta_text: "SHOW ME THE SHORTCUTS"
                }
            },
            {
                id: "infinite-career",
                semantic_slug: "entp-infinite-career-spiritual-ai",
                title: "How to Turn Your 17 Different Hobbies into One Income Stream",
                script: {
                    headline: "THE INFINITE CAREER.",
                    subheadline: "How to Be Everything by Committing to Nothing.",
                    hook_image_prompt: "A Swiss Army knife where every tool is glowing gold and holographic.",
                    image_url: "/images/products/entp_polymath.png",
                    pain_story: "Your power doesn't come from knowing 100% of one thing. It comes from knowing 20% of 10 things and connecting them. In a world of AI specialization, the Generalist is the one who connects the dots.",
                    agitation_bullets: [
                        "The 'Niche' trap.",
                        "Leaving money on the table from your 'useless' skills.",
                        "Feeling scattered and broke."
                    ],
                    transition_mechanism: "YOU ABANDON PROJECTS AT 90%.",
                    product_name: "THE POLYMATH'S PLAYBOOK",
                    product_description: "How to build a brand around your personality, not just a topic.",
                    features_bullets: [
                        "The Intersection Finder: Find where your 5 weird hobbies overlap to create a monopoly.",
                        "The 3-Year Lifecycle: Roadmap for Entering, Mastering, and Exiting before boredom hits.",
                        "The \"Resume of Chaos\": Frame job-hopping as \"Rapid Skill Acquisition.\""
                    ],
                    price_original: "$249",
                    price_discounted: "$77",
                    bonuses: [
                        { title: "Content Repurposing", description: "One idea, ten formats.", value: "$29" }
                    ],
                    guarantee_text: "THE \"NO BOREDOM\"  If this framework doesn't make you excited about your chaotic future, we refund you.",
                    scarcity_text: "Open to explorers.",
                    cta_text: "ENTER THE MULTIVERSE"
                }
            }
        ]
    },
    INFJ: {
        id: "infj",
        theme: mbtiThemes.INFJ,
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
                id: "burnout-shield",
                title: "How to Stop Absorbing Everyone Else's Emotions in 24 Hours",
                script: {
                    headline: "You cannot pour from an empty cup.",
                    subheadline: "A gentle system for energetic self-protection.",
                    hook_image_prompt: "A figure meditating inside a glowing translucent forcefield while chaotic colors swirl outside.",
                    image_url: "/images/products/infj_shield.png",
                    pain_story: "Your empathy is not a weakness. It is a sensory input system. And right now, that system has no filter. You feel everything. Shifts in tone. Unspoken tension. Emotional undercurrents others ignore. You learned that being a good person meant saying yes. But goodness without boundaries becomes self-erasure.",
                    agitation_bullets: [
                        "Compassion fatigue caring until you are numb.",
                        "Emotional bleed through losing track of what is yours.",
                        "Silent self abandonment holding space for everyone except yourself."
                    ],
                    transition_mechanism: "You are not here to save everyone. You are here to protect what you carry.",
                    product_name: "The Guardian Protocol",
                    product_description: "A guided visualization and psychological protocol designed to help you build a quiet, impenetrable boundary without shutting down your heart.",
                    features_bullets: [
                        "The Door Slam Alternative Set boundaries before resentment builds.",
                        "The Energy Audit Notice who nourishes you and who quietly drains you.",
                        "The Vampire Guide Identify emotionally exploitative personalities and disengage without confrontation."
                    ],
                    price_original: "$150",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Narcissist Repellent", description: "A pattern recognition guide to spot emotional predators early.", value: "$29" }
                    ],
                    guarantee_text: "THE PEACE PROMISE  If you dont feel at least 50% lighter within 14 days, you can request a refund. No explanations required. You deserve peace.",
                    scarcity_text: "Protecting your energy is not selfish.",
                    cta_text: "Begin quietly"
                }
            },
            {
                id: "counselor",
                title: "How to Turn Your Insight into a High-Ticket Coaching Business",
                script: {
                    headline: "You are not a rehabilitation center.",
                    subheadline: "Package your deep wisdom into a practice that honors you.",
                    hook_image_prompt: "A lantern illuminating a path through a dark forest.",
                    image_url: "/images/products/infj_lantern.png",
                    pain_story: "Why do you choose partners or clients who need you deeply? Because if they need you, they cannot leave you. But this dynamic leaves you drained. You provide profound healing and received only crumbs in return. You attract broken souls because your empathy needs a job.",
                    agitation_bullets: [
                        "Undercharging or giving your wisdom away for free.",
                        "Feeling used after deep emotional labor.",
                        "Watching shallow creators succeed while you hesitate."
                    ],
                    transition_mechanism: "You hold the lantern. You do not have to carry them.",
                    product_name: "The Reciprocity Code",
                    product_description: "A framework to structure your insight so it is valued, respected, and compensated.",
                    features_bullets: [
                        "The Fixer Detox Stop offering unsolicited advice to those who will not take it.",
                        "The Boundary Intake Filter out clients or partners who just want to be saved.",
                        "The Mirror Principle Learn to receive as deeply as you give."
                    ],
                    price_original: "$129",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "The Intake Invitation", description: "A gentle way to qualify people before you commit energy.", value: "$49" }
                    ],
                    guarantee_text: "THE BALANCE  If you dont feel a shift in your relationships within 30 days, we return your investment. Trust your intuition.",
                    scarcity_text: "Your wisdom is valuable.",
                    cta_text: "Explore when ready"
                }
            },
            {
                id: "sacred-calling",
                title: "How to Find the Career Your Soul Approved Before You Were Born",
                script: {
                    headline: "The work you were meant to do.",
                    subheadline: "Align your daily life with your quietest truths.",
                    hook_image_prompt: "A golden thread connecting a person's heart to a distant star.",
                    image_url: "/images/products/entj_vision_network.png",
                    pain_story: "Deep down, you may fear that money corrupts. You equate poverty with purity. But a healer with resources can change the world in ways a struggling one cannot. Money is not evil. It is simply an amplifier of who you already are.",
                    agitation_bullets: [
                        "The Sunday dread of returning to a meaningless role.",
                        "Feeling like an alien in corporate environments.",
                        "The fear of wasting your potential on things that do not matter."
                    ],
                    transition_mechanism: "Your sensitivity is your compass. Not your distraction.",
                    product_name: "The Soul Blueprint",
                    product_description: "A gentle framework to identify work that allows you to heal the world and sustain yourself.",
                    features_bullets: [
                        "The Ikigai Compass Find the intersection of what you love and what sustains you.",
                        "Ethical Exchange Offer your gifts as an invitation not a transaction.",
                        "Pricing Therapy Charge what you are worth without guilt."
                    ],
                    price_original: "$133",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "The Graceful Exit", description: "How to transition from your current role without burning bridges.", value: "$19" }
                    ],
                    guarantee_text: "THE ALIGNMENT  If you feel gross or out of alignment, full refund. We want you to feel right about this.",
                    scarcity_text: "Your mission is waiting.",
                    cta_text: "See if this resonates"
                }
            },
            {
                id: "chameleon",
                title: "How to Change the World from Your Bedroom without Public Speaking",
                script: {
                    headline: "You are everyone, except yourself.",
                    subheadline: "Build a movement without losing your privacy.",
                    hook_image_prompt: "A drop of water hitting a pond and creating ripples that cover the ocean.",
                    image_url: "/images/products/intj_fractal.png",
                    pain_story: "You think If I disagree they wont like me. So you shrink. You blend. You have become a mirror that reflects everyone else's light but generates none of its own. It is time to stop hiding behind the harmony.",
                    agitation_bullets: [
                        "A constant fear of being truly seen.",
                        "Social battery draining faster than ever.",
                        "Comparing your quiet depth to their loud noise."
                    ],
                    transition_mechanism: "You do not need to be loud to be heard.",
                    product_name: "The Identity Anchor",
                    product_description: "How to share your truth through writing and art without sacrificing your peace.",
                    features_bullets: [
                        "The Mask Inventory Identify the characters you play to keep others comfortable.",
                        "The Disappointment Drill Disappoint people on purpose and survive it.",
                        "The Values Compass Separate your true beliefs from what you were taught."
                    ],
                    price_original: "$199",
                    price_discounted: "$60",
                    bonuses: [
                        { title: "The Pen Name Strategy", description: "How to influence the world while remaining anonymous.", value: "$29" }
                    ],
                    guarantee_text: "THE AUTHENTICITY  If you dont feel a stronger sense of Self in 30 days, we refund you.",
                    scarcity_text: "The world needs your true voice.",
                    cta_text: "Find yourself"
                }
            },
            {
                id: "intuition",
                title: "How to Manifest Reality using Neuroscience instead of Wishful Thinking",
                script: {
                    headline: "You knew it was going to happen.",
                    subheadline: "Validating your intuition with grounded neuroscience.",
                    hook_image_prompt: "Brain synapses forming a galaxy.",
                    image_url: "/images/products/intp_neural.png",
                    pain_story: "Most people live in the physical world. They only believe what they can touch. You see Patterns. When you try to explain a hunch to a logic person you sound irrational. You have suppressed your superpower because you didnt have the data to back it up.",
                    agitation_bullets: [
                        "Vision boards that feel like wishful thinking.",
                        "Feeling isolated in your spiritual perspective.",
                        "The disconnect between your inner richness and outer reality."
                    ],
                    transition_mechanism: "You are not crazy. You are just seeing more data than they are.",
                    product_name: "The Third Eye Toolkit",
                    product_description: "A grounded approach to intuition using psychology and focus.",
                    features_bullets: [
                        "The Translation Matrix Explain a hunch without sounding ungrounded.",
                        "Anxiety vs Intuition A somatic checklist to know the difference.",
                        "The Decision Engine Make choices when logic says Left but soul says Right."
                    ],
                    price_original: "$222",
                    price_discounted: "$77",
                    bonuses: [
                        { title: "Binaural Beats Collection", description: "Audio tracks for deep focus and meditation.", value: "$33" }
                    ],
                    guarantee_text: "THE CLARITY  Use the Anxiety vs Intuition test. If it doesnt give you clarity, we refund you.",
                    scarcity_text: "Trust your knowing.",
                    cta_text: "Open your eyes"
                }
            }
        ]
    },
    INFP: {
        id: "infp",
        theme: mbtiThemes.INFP,
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
                id: "dream-to-reality",
                semantic_slug: "infp-dream-to-reality-spiritual-ai",
                title: "How to Make Money from Your Art without Selling Your Soul",
                script: {
                    headline: "You don't need to become more. You just need space to be yourself.",
                    subheadline: "A gentle framework for people who feel deeply and want to live honestly.",
                    hook_image_prompt: "A paintbrush painting a door in the air that opens to a treasure room.",
                    image_url: "/images/products/infp_art.png",
                    pain_story: "You have always felt a little different. You care deeply—sometimes more than is convenient. You want your life to feel true, not just successful. But the world keeps asking you to harden, optimize, and perform. Something in you refuses.",
                    agitation_bullets: [
                        "Feeling breathless from the hustle.",
                        "Worrying that 'selling' means losing yourself.",
                        "Hoarding your work because it feels safer inside."
                    ],
                    transition_mechanism: "This is not a system to fix you. It is a quiet space to hear yourself.",
                    product_name: "The Dream-Weaver's Loom",
                    product_description: "How to build a supportive audience on platforms like Patreon/Substack without pressure.",
                    features_bullets: [
                        "Inner Clarity Helps you untangle emotions without suppressing them.",
                        "Value Alignment Supports decisions that feel ethically and emotionally right.",
                        "Gentle Momentum Encourages movement without pressure or shame."
                    ],
                    price_original: "$111",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Dealing with Criticism", description: "Emotional armor for your art.", value: "$25" }
                    ],
                    guarantee_text: "THE PROMISE  If this doesn't feel supportive or grounding, you can request a refund. No explanations needed. Trust your intuition.",
                    scarcity_text: "Priced to be accessible.",
                    cta_text: "Explore softly"
                }
            },
            {
                id: "healers-journey",
                semantic_slug: "infp-healers-journey-spiritual-ai",
                title: "How to Get Things Done when you Hate Structure and Discipline",
                script: {
                    headline: "Flow like Water. Don't Grind like Stone.",
                    subheadline: "Your pain was not an accident. It was training.",
                    hook_image_prompt: "A river flowing effortlessly around rocks to reach the ocean.",
                    image_url: "/images/products/infp_flow.png",
                    pain_story: "You aren't lazy. You are cynical about things that don't matter. When you care, you are unstoppable. But standard advice tries to force you into a grid. You need a flow, not a cage.",
                    agitation_bullets: [
                        "Guilt over 'wasted' days.",
                        "Starting many things, finishing few.",
                        "Waiting for the perfect mood that rarely comes."
                    ],
                    transition_mechanism: "You don't need discipline. You need alignment.",
                    product_name: "The Kintsugi Method",
                    product_description: "A forgiving framework that accounts for your emotional fluctuations.",
                    features_bullets: [
                        "The 'Scar Inventory' Map your trauma to your superpowers.",
                        "The Storyteller's Voice Share pain without oversharing.",
                        "The Healer's Business Get paid to help people survive what you did."
                    ],
                    price_original: "$250",
                    price_discounted: "$88",
                    bonuses: [
                        { title: "Dream Journaling", description: "Harvesting ideas from sleep.", value: "$15" }
                    ],
                    guarantee_text: "THE WHOLENESS  If you don't feel a shift from 'Broken' to 'Beautiful', full refund. We want you to feel whole.",
                    scarcity_text: "There is no rush.",
                    cta_text: "Explore softly"
                }
            },
            {
                id: "introvert-power",
                semantic_slug: "infp-introvert-power-spiritual-ai",
                title: "How to Heal Yourself and Others through the Power of Story",
                script: {
                    headline: "Your sensitivity is a radio for truth.",
                    subheadline: "You aren't shy. You are selective.",
                    hook_image_prompt: "An open book where the words turn into birds flying out.",
                    image_url: "/images/products/infp_book.png",
                    pain_story: "Your attention is gold. Small talk is plastic. You leave parties drained because you gave away your soul and got nothing in return. You crave depth, but the world offers surface.",
                    agitation_bullets: [
                        "Writer's block caused by perfectionism.",
                        "Feeling misunderstood even when you speak.",
                        "The loneliness of a vivid imagination."
                    ],
                    transition_mechanism: "Turn your inner world into a bridge.",
                    product_name: "The Cat in the Dog Park",
                    product_description: "A course on writing fiction or memoir as therapy and art.",
                    features_bullets: [
                        "The 'Question' Bank Cut through small talk instantly.",
                        "The 'Irish Exit' Guide Leave gracefully when your battery is low.",
                        "Listener's Charisma Use silence to make people feel seen."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Quiet Confidence", description: "Presence without noise.", value: "$20" }
                    ],
                    guarantee_text: "THE CONNECTION  If you don't feel more understood in 30 days, we refund you. No questions asked.",
                    scarcity_text: "Your story matters.",
                    cta_text: "Explore softly"
                }
            },
            {
                id: "idealism-survival",
                title: "How to Keep Your Heart Open in a Cynical World",
                script: {
                    headline: "The World is Hard. You are Soft. That is your Strength.",
                    subheadline: "Don't harden your heart. Strengthen your spine.",
                    hook_image_prompt: "A glowing heart protected by a transparent, soft bubble in a gray city.",
                    image_url: "/images/products/infp_heart.png",
                    pain_story: "You feel the weight of the world. Every headline, every cruelty, every injustice lands on your skin. You want to help, but sometimes you just want to hide. You don't have to choose between caring and surviving.",
                    agitation_bullets: [
                        "Doomscrolling until you are paralyzed.",
                        "Feeling guilty for your privilege.",
                        "Burning out from empathy."
                    ],
                    transition_mechanism: "Protect your light so you can share it.",
                    product_name: "The Idealist's Shield",
                    product_description: "Philosophical and practical tools to engage with the world without losing your light.",
                    features_bullets: [
                        "Media Filters Strategies to stay informed without being poisoned.",
                        "Micro-Activism Changing the world in your immediate circle.",
                        "The Hope Anchor Rituals to find beauty in the chaos."
                    ],
                    price_original: "$199",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Metta Meditation", description: "Loving-kindness audio.", value: "$19" }
                    ],
                    guarantee_text: "THE HOPE  If this doesn't restore your faith in 30 days, full refund.",
                    scarcity_text: "Stay soft.",
                    cta_text: "Explore softly"
                }
            },
            {
                id: "resilience",
                title: "How to Access the Muse on Command without Waiting for Inspiration",
                script: {
                    headline: "YOU BLEED WHEN PEOPLE LOOK AT YOU WRONG.",
                    subheadline: "YOU BLEED WHEN PEOPLE LOOK AT YOU WRONG.",
                    hook_image_prompt: "A door in a library opening to a galaxy.",
                    image_url: "/images/products/infp_shield.png",
                    pain_story: "When someone criticizes you, you hand them the pen and let them rewrite your self-worth. You confuse their Opinion with Truth. Because you aren't sure who you are, you let the world decide for you.",
                    agitation_bullets: [
                        "Creative blocks lasting months.",
                        "Fear that the magic is gone forever.",
                        "Starting over constantly."
                    ],
                    transition_mechanism: "YOU PLAY THE VICTIM.",
                    product_name: "THE TEFLON SOUL",
                    product_description: "A toolkit of sounds, prompts, and habits to trigger creativity.",
                    features_bullets: [
                        "The Criticism Filter: Decide in 3 seconds: Valid feedback or hate?",
                        "\"Return to Sender\": Energetically send back shame.",
                        "Vulnerability Hangover Cure: What to do after over-sharing."
                    ],
                    price_original: "$140",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Lo-Fi Playlists", description: "Curated for dreaming.", value: "$15" }
                    ],
                    guarantee_text: "THE UNBOTHERED  If you don't feel more grounded in conflict in 30 days, full refund.",
                    scarcity_text: "Unlock the flow.",
                    cta_text: "BUILD THE SHIELD"
                }
            }
        ]
    },
    ENFJ: {
        id: "enfj",
        theme: mbtiThemes.ENFJ,
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
                id: "burden-of-potential",
                title: "How to Lead a Movement so Powerful People Follow You into Fire",
                script: {
                    headline: "TIRED OF DRAGGING PEOPLE UP THE MOUNTAIN?",
                    subheadline: "TIRED OF DRAGGING PEOPLE UP THE MOUNTAIN?",
                    hook_image_prompt: "A figure on a stage with arms open, golden light connecting them to a crowd.",
                    pain_story: "You don't date reality; you date potential. You are projecting your own ambition onto people who want to be average. You are trying to teach eagles to fly, but you are actually throwing rocks off a cliff.",
                    agitation_bullets: [
                        "Martyr syndrome.",
                        "Feeling underappreciated.",
                        "Leading people who don't want to be led."
                    ],
                    transition_mechanism: "YOUR \"HELP\" IS CONTROL.",
                    product_name: "THE SOVEREIGNTY PROTOCOL",
                    product_description: "How to articulate a vision so compelling that people volunteer to help you.",
                    features_bullets: [
                        "The \"Investment\" Audit: Calculate ROI on your relationships. Stop bad deals.",
                        "The \"Let Them Fail\" Script: What to say when you want to fix it, but shouldn't.",
                        "Mirror Technique: Reflect potential without carrying it."
                    ],
                    price_original: "$200",
                    price_discounted: "$50",
                    bonuses: [
                        { title: "Public Speaking confidence", description: "Own the stage.", value: "$47" }
                    ],
                    guarantee_text: "THE LIGHTNESS  If you don't feel 50lbs lighter after dropping your \"projects,\" full refund.",
                    scarcity_text: "Take the lead.",
                    cta_text: "DROP THE BURDEN"
                }
            },
            {
                id: "harmony-trap",
                title: "How to Build a Tribe of Raving Fans who Love You and Each Other",
                script: {
                    headline: "YOUR \"NICENESS\" IS A LIE.",
                    subheadline: "YOUR \"NICENESS\" IS A LIE.",
                    hook_image_prompt: "A network of glowing hearts connecting around a campfire.",
                    pain_story: "You believe Conflict = Destruction. So you swallow your truth. But a relationship that can't handle the truth is a hostage situation. Friction creates heat. Heat creates transformation.",
                    agitation_bullets: [
                        "Being the only energy source.",
                        "Drama management.",
                        "Engagement drop-off."
                    ],
                    transition_mechanism: "YOU ARE PASSIVE-AGGRESSIVE.",
                    product_name: "THE CONFLICT ALCHEMIST",
                    product_description: "Templates for community events, values, and moderation.",
                    features_bullets: [
                        "The \"Sandwich\" Ban: Why fluffing up criticism fails. Be direct.",
                        "The \"I'm Angry\" Script: Express anger as Passion, not Destruction.",
                        "Resentment Detox: Clear the backlog of \"things unsaid.\""
                    ],
                    price_original: "$180",
                    price_discounted: "$50",
                    bonuses: [
                        { title: "Discord/Slack Setup", description: "Tech for connection.", value: "$29" }
                    ],
                    guarantee_text: "THE \"REALNESS\"  If you don't feel deeper intimacy after a Real Talk, refund.",
                    scarcity_text: "Connect them.",
                    cta_text: "DROP THE HAMMER"
                }
            },
            {
                id: "cult-of-personality",
                title: "How to Set Boundaries without Feeling Like a Bad Person",
                script: {
                    headline: "YOU DON'T WANT FOLLOWERS. YOU WANT EQUALS.",
                    subheadline: "YOU DON'T WANT FOLLOWERS. YOU WANT EQUALS.",
                    hook_image_prompt: "A beautiful golden gate that is closed, protecting a garden.",
                    pain_story: "You think you are serving them. Actually, you are creating dependency. You are the Sun, and they are planets. It feeds your ego, but starves your soul. True leadership isn't shining on people. It's igniting them.",
                    agitation_bullets: [
                        "Resentment building up.",
                        "Passive-aggressive outbursts.",
                        "Physical exhaustion."
                    ],
                    transition_mechanism: "INDISPENSIBILITY IS A PRISON.",
                    product_name: "THE LEGACY WEAVER",
                    product_description: "Scripts and mindsets to protect your energy.",
                    features_bullets: [
                        "The \"Connector\" Scripts: Make them rely on each other, not you.",
                        "The Guru Detox: Dismantle the pedestal safely.",
                        "Succession Plan: Design systems that run on culture, not charisma."
                    ],
                    price_original: "$250",
                    price_discounted: "$99",
                    bonuses: [
                        { title: "Self-Care Rituals", description: "Refill the cup.", value: "$27" }
                    ],
                    guarantee_text: "THE FREEDOM  If you don't feel less pressure to \"perform\" in 30 days, refund.",
                    scarcity_text: "Protect yourself.",
                    cta_text: "PASS THE TORCH"
                }
            },
            {
                id: "mirror-effect",
                title: "How to Read People Like a Book and Influence Them Positively",
                script: {
                    headline: "WHO ARE YOU WHEN NO ONE IS WATCHING?",
                    subheadline: "WHO ARE YOU WHEN NO ONE IS WATCHING?",
                    hook_image_prompt: "Two faces looking at each other with a stream of light connecting their foreheads.",
                    pain_story: "You change your colors to match the room. This isn't \"adaptability.\" It's a lack of Core Identity. You are looking for yourself in the eyes of other people. But they can only show you their reflection.",
                    agitation_bullets: [
                        "Miscommunication.",
                        "Taking things personally.",
                        "Social anxiety spikes."
                    ],
                    transition_mechanism: "YOU OUTSOURCE EMOTION.",
                    product_name: "THE IDENTITY RECLAMATION",
                    product_description: "Tools for deep rapport and emotional intelligence.",
                    features_bullets: [
                        "The \"Solo Date\" Protocol: Dinner alone. No phone. Survive the void.",
                        "Emotional Regulation: Soothing anxiety without calling a friend.",
                        "The Merge-Breaker: Snap back when you lose yourself."
                    ],
                    price_original: "$120",
                    price_discounted: "$30",
                    bonuses: [
                        { title: "Body Language Decoder", description: "Read the unsaid.", value: "$29" }
                    ],
                    guarantee_text: "THE \"SELF\"  If you don't feel a stronger sense of \"I Am\", refund.",
                    scarcity_text: "Master emotion.",
                    cta_text: "ENTER THE VOID"
                }
            },
            {
                id: "art-of-receiving",
                title: "How to Speak so People are Mesmerized by Your Message",
                script: {
                    headline: "YOU GIVE GREAT HUGS. BUT YOU CAN'T TAKE ONE.",
                    subheadline: "YOU GIVE GREAT HUGS. BUT YOU CAN'T TAKE ONE.",
                    hook_image_prompt: "Microphone glowing on a stage.",
                    pain_story: "You think you are protecting them from your mess. But you are actually controlling the dynamic. By always being the Giver, you stay safe. Receiving requires Surrender. You are lonely because you built a wall and called it Strength.",
                    agitation_bullets: [
                        "Um's and Ah's.",
                        "Losing your train of thought.",
                        "Boring the audience."
                    ],
                    transition_mechanism: "YOU TRAINED THEM TO TAKE.",
                    product_name: "THE RECIPROCITY RESET",
                    product_description: "Rhetoric and delivery training for the Protagonist.",
                    features_bullets: [
                        "The \"5% Rule\": Let them see just 5% of your mess. Start small.",
                        "The \"I Need Help\" Script: Ask without feeling pathetic.",
                        "The Taker Detox: Identify and fix 100/0 relationships."
                    ],
                    price_original: "$150",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Toastmasters Hacks", description: "Fast track.", value: "$19" }
                    ],
                    guarantee_text: "THE \"HELD\"  If you don't feel less alone in 30 days, full refund. You deserve to be held.",
                    scarcity_text: "Take the mic.",
                    cta_text: "OPEN THE GATES"
                }
            }
        ]
    },
    ENFP: {
        id: "enfp",
        theme: mbtiThemes.ENFP,
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
                id: "fomo-cure",
                title: "How to Actually Finish Projects without getting Bored to Death",
                script: {
                    headline: "YOU ARE DROWNING IN OPPORTUNITY.",
                    subheadline: "YOU ARE DROWNING IN OPPORTUNITY.",
                    hook_image_prompt: "A puzzle being completed, the final piece glowing.",
                    pain_story: "You crave \"More\" because you don't trust \"Less.\" 10 half-eaten sandwiches don't make a meal. You aren't missing the party. You are missing Yourself.",
                    agitation_bullets: [
                        "Wasted potential.",
                        "People not trusting your commitments.",
                        "Self-doubt about your capability.",
                    ],
                    transition_mechanism: "YOU ARE A FLAKE.",
                    product_name: "THE ESSENTIALIST'S KNIFE",
                    product_description: "Strategy to push projects over the line using novelty.",
                    features_bullets: [
                        "Hell Yeah or No: The ultimate filter.",
                        "Social Battery Audit: Know your exact hours.",
                        "The Graceful Decline: Scripts to say No kindly."
                    ],
                    price_original: "$80",
                    price_discounted: "$25",
                    bonuses: [
                        { title: "Project Graveyard Resurrection", description: "Salvage old ideas.", value: "$22" }
                    ],
                    guarantee_text: "THE RELIEF  Feel weightless in 30 days or refund.",
                    scarcity_text: "Close the loop.",
                    cta_text: "CHOOSE ONE THING"
                }
            },
            {
                id: "golden-idea",
                title: "How to become the Most Connected Person in Your City",
                script: {
                    headline: "ADDICTED TO THE START.",
                    subheadline: "ADDICTED TO THE START.",
                    hook_image_prompt: "A constellation of stars connecting to form a face.",
                    pain_story: "You think you are lazy. You aren't. You are an Explorer. But the world demands Farmers. You are trying to force yourself to plow the field, and it's killing your soul. Your boredom is not a bug. It's a Feature.",
                    agitation_bullets: [
                        "Losing touch with cool people.",
                        "Being 'fun' but not 'valuable'.",
                        "Forgetfulness."
                    ],
                    transition_mechanism: "YOU FEAR SUCCESS.",
                    product_name: "THE CHAOS PILOT",
                    product_description: "Managing relationships without becoming a robot.",
                    features_bullets: [
                        "Idea Parking Lot: Capture new ideas without quitting the current one.",
                        "The \"Body Double\": Why working alone kills your vibe.",
                        "The \"Good Enough\" Button: Ship at 80%. Perfection is the enemy."
                    ],
                    price_original: "$150",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Party Planning Checklist", description: "Epic events made easy.", value: "$29" }
                    ],
                    guarantee_text: "THE \"SHIPPED\"  If you don't finish ONE project in 30 days, we refund you.",
                    scarcity_text: "Network expands.",
                    cta_text: "LAUNCH IT"
                }
            },
            {
                id: "sad-clown",
                title: "How to Tell Stories that Go Viral and capture Hearts",
                script: {
                    headline: "EVERYONE LOVES THE PARTY. NO ONE SEES THE UBER HOME.",
                    subheadline: "EVERYONE LOVES THE PARTY. NO ONE SEES THE UBER HOME.",
                    hook_image_prompt: "A megaphone shooting out colorful birds.",
                    pain_story: "You pay for your place in the group by being the Funny One. You trained your friends to treat you like a TV show. TV shows aren't allowed to be depressed. You are surrounded by fans, but you have no friends.",
                    agitation_bullets: [
                        "Rampling.",
                        "Low engagement.",
                        "Being dismissed as 'just excitement'."
                    ],
                    transition_mechanism: "USING CHAOS TO NUMB.",
                    product_name: "THE TRAGIC COMEDY BLUEPRINT",
                    product_description: "Content creation guide for ENFPs.",
                    features_bullets: [
                        "The \"Serious Mode\" Switch: Transition from Fun to Deep without killing the vibe.",
                        "The Intellectual Defense: Proving you are smart, not just \"creative.\"",
                        "Vulnerability Vetting: Test who can handle your tears."
                    ],
                    price_original: "$199",
                    price_discounted: "$60",
                    bonuses: [
                        { title: "Content Calendar for Chaotic Minds", description: "Flexible consistency.", value: "$19" }
                    ],
                    guarantee_text: "THE \"RESPECT\"  If you don't feel more respected and Seen in 30 days, refund.",
                    scarcity_text: "Go live.",
                    cta_text: "DROP THE MASK"
                }
            },
            {
                id: "vampire-slayer",
                title: "How to Work Hard without losing your Spark",
                script: {
                    headline: "YOU ARE CATNIP FOR NARCISSISTS.",
                    subheadline: "YOU ARE CATNIP FOR NARCISSISTS.",
                    hook_image_prompt: "A desk covered in toys and colorful tools.",
                    pain_story: "You have a Savior Complex. You think if you love them enough, they will change. You see the Prince inside the Beast. But some Beasts are just Beasts. You are not a Rehab Center for emotionally stunted adults.",
                    agitation_bullets: [
                        "Burnout from boredom.",
                        "Depression from gray cubicles.",
                        "Resisting the 'grind'."
                    ],
                    transition_mechanism: "ADDICTED TO DRAMA.",
                    product_name: "THE SLAYER'S GUIDE",
                    product_description: "Building a career that feels like a game.",
                    features_bullets: [
                        "Love Bomb Detector: Is it love or grooming?",
                        "The \"Grey Rock\" Method: Become uninteresting to toxic people.",
                        "The \"Boring\" Challenge: Learning to love stability."
                    ],
                    price_original: "$130",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Office Decor for the Soul", description: "Vibe matters.", value: "$15" }
                    ],
                    guarantee_text: "THE SAFE  If you don't feel safer and smarter in 30 days, full refund.",
                    scarcity_text: "Play ball.",
                    cta_text: "RAISE THE SHIELDS"
                }
            },
            {
                id: "magical-adult",
                title: "How to Find the People who actually Get You",
                script: {
                    headline: "TERRIFIED OF BECOMING A ZOMBIE?",
                    subheadline: "TERRIFIED OF BECOMING A ZOMBIE?",
                    hook_image_prompt: "A group of colorful avatars meeting in a digital forest.",
                    pain_story: "You believe Structure kills Magic. But a river without banks is just a puddle. By refusing to build a container (\"Adulting\"), your energy leaks out everywhere. You aren't protecting your inner child; you are neglecting them.",
                    agitation_bullets: [
                        "Shallow friendships.",
                        "Hiding your weirdness.",
                        "Feeling 'too much'."
                    ],
                    transition_mechanism: "WEAPONIZED INCOMPETENCE.",
                    product_name: "THE ADULTING GUIDE",
                    product_description: "How to signal your true self to attract true friends.",
                    features_bullets: [
                        "The Freedom Budget: Manage money to afford MORE adventure.",
                        "The \"Boring Hour\": Kill all adult tasks in 60 mins/week.",
                        "Inner Parent Script: Nurture your child, don't let it drive."
                    ],
                    price_original: "$199",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Conversation Starters for Deep Talk", description: "Skip small talk.", value: "$11" }
                    ],
                    guarantee_text: "THE SPARK  If you lose your magic while getting organized, refund. The goal is MORE magic.",
                    scarcity_text: "Tribe waiting.",
                    cta_text: "GROW UP (KIND OF)"
                }
            }
        ]
    },
    ISTJ: {
        id: "istj",
        theme: mbtiThemes.ISTJ,
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
                id: "change-protocol",
                title: "How to Build a Life of Absolute Order and Reliability",
                script: {
                    headline: "RUNNING WINDOWS 95 IN AN AI WORLD.",
                    subheadline: "RUNNING WINDOWS 95 IN AN AI WORLD.",
                    hook_image_prompt: "A perfectly organized archive room with infinite depth.",
                    pain_story: "You hate unpredictability. You hate when people change plans last minute. You feel like the only adult in a room full of children. You want a life that runs like a Swiss watch.",
                    agitation_bullets: [
                        "Dealing with other people's mess.",
                        "Anxiety from lack of structure.",
                        "Feeling holding the weight of the world."
                    ],
                    transition_mechanism: "YOU ARE A NOSTALGIA MERCHANT.",
                    product_name: "THE FUTURE-PROOF FRAMEWORK",
                    product_description: "A complete life management system based on logic and duty.",
                    features_bullets: [
                        "The 'Zero-Ambiguity' Calendar.",
                        "Financial models for 100% security.",
                        "Household logistics optimization."
                    ],
                    price_original: "$150",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Emergency Prep Checklist", description: "Be ready for anything.", value: "$29" }
                    ],
                    guarantee_text: "RELEVANCE OR REFUND. Don't be a dinosaur.",
                    scarcity_text: "Secure your future.",
                    cta_text: "[ CLICK TO INSTALL_UPDATE ]"
                }
            },
            {
                id: "atlas-complex",
                title: "How to Organize Your Digital Life into a Perfect Archive",
                script: {
                    headline: "THE ATLAS COMPLEX.",
                    subheadline: "THE ATLAS COMPLEX.",
                    hook_image_prompt: "A data stream actively sorting itself into neat boxes.",
                    pain_story: "You trust Systems. You do not trust People. People are variables. But hoarding responsibility is not \"competence.\" It is poor architecture. If you get sick, the system collapses. That is irresponsible.",
                    agitation_bullets: [
                        "Digital hoarding.",
                        "Loss of critical data.",
                        "Inefficient searching."
                    ],
                    transition_mechanism: "WARNING: MARTYR_COMPLEX",
                    product_name: "THE ARCHITECT'S EXIT",
                    product_description: "A folder structure and automation system for lifetime data management.",
                    features_bullets: [
                        "The \"Bus Factor\" Audit: Identify catastrophe points.",
                        "The SOP Library: Download your brain to paper.",
                        "The \"Good Enough\" Algo: Math for perfectionists.",
                        "Trust Ladder: Testing competence safely."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Backup SOPs", description: "Never lose a byte.", value: "$19" }
                    ],
                    guarantee_text: "RELIABILITY  Save 10 hours/week in 30 days or 100% refund. Facts only.",
                    scarcity_text: "Clean up now.",
                    cta_text: "[ EXECUTE: OFFLOAD_WEIGHT ]"
                }
            },
            {
                id: "emotional-audit",
                title: "How to Build Wealth without Gambling or 'Hype' Coins",
                script: {
                    headline: "IGNORING SADNESS IS ILLOGICAL.",
                    subheadline: "IGNORING SADNESS IS ILLOGICAL.",
                    hook_image_prompt: "A sturdy bank vault made of gold bricks.",
                    pain_story: "You have no Processing Unit for emotion. For anger? \"Swallow it.\" For sadness? \"Work harder.\" This isn't Stoicism. This is Emotional Constipation. Stoicism is processing. You are hoarding.",
                    agitation_bullets: [
                        "Fear of inflation.",
                        "Distrust of 'financial gurus'.",
                        "Wanting security over luxury."
                    ],
                    transition_mechanism: "ERROR: LOW_VOCABULARY",
                    product_name: "THE LOGIC OF FEELING",
                    product_description: "Evidence-based investing strategies that ignore the news.",
                    features_bullets: [
                        "Asset allocation for sleep.",
                        "Tax efficiency optimization.",
                        "The 'F.I.R.E.' roadmap for safety."
                    ],
                    price_original: "$199",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Budgeting Spreadsheets", description: "Track every cent.", value: "$25" }
                    ],
                    guarantee_text: "CLARITY  Refund if you don't feel lighter. A clean CPU runs faster.",
                    scarcity_text: "Build the foundation.",
                    cta_text: "RUN DIAGNOSTIC"
                }
            },
            {
                id: "social-algorithm",
                title: "How to becoming Unstoppable through Habit Stacking",
                script: {
                    headline: "NETWORKING FOR PEOPLE WHO HATE PEOPLE.",
                    subheadline: "NETWORKING FOR PEOPLE WHO HATE PEOPLE.",
                    hook_image_prompt: "A steel chain where every link is perfect.",
                    pain_story: "We stop asking you to be charming. We teach you to view Socializing as a Protocol. Small Talk = Handshake Protocol (Secure Connection). Networking = Redundant Node System (Job Security).",
                    agitation_bullets: [
                        " breaking a streak.",
                        "Inefficiency gaps.",
                        "Wanting to be the rock for everyone."
                    ],
                    transition_mechanism: "YOU ARE JUDGMENTAL.",
                    product_name: "THE NETWORK INTERFACE",
                    product_description: "How to program your behavior using cues and rewards.",
                    features_bullets: [
                        "The \"Small Talk\" Logic Tree: Branching scripts to survive the first 3 mins.",
                        "Value Exchange Model: Network by being Useful (not \"fun\").",
                        "The \"Exit Strategy\": Leave gracefully when battery hits 10%."
                    ],
                    price_original: "$129",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Habit Tracker PDF", description: "Visual accountability.", value: "$15" }
                    ],
                    guarantee_text: "ROI  Make 3 valuable connections in 30 days or refund.",
                    scarcity_text: "Forge your will.",
                    cta_text: "CONNECT THE NODES"
                }
            },
            {
                id: "anti-perfectionism",
                title: "How to Never Forget a Fact, Name, or Number Again",
                script: {
                    headline: "LOSING THE RACE TO DUMBER PEOPLE.",
                    subheadline: "LOSING THE RACE TO DUMBER PEOPLE.",
                    hook_image_prompt: "A library card catalog stretching to infinity.",
                    pain_story: "You treat an email like a dissertation. Not everything needs to be perfect. You are bankrupting your energy on low-value tasks. The person who provides value wins. The person who provides nothing (perfectly) loses.",
                    agitation_bullets: [
                        "Social awkwardness of names.",
                        "Losing credibility.",
                        "Feeling 'slow'."
                    ],
                    transition_mechanism: "PERFECTIONISM IS VANITY.",
                    product_name: "THE IMPERFECT EXECUTOR",
                    product_description: "Techniques to store and retrieve data like a computer.",
                    features_bullets: [
                        "The \"Good Enough\" Matrix: Calculator for required quality (Level 1-5).",
                        "The Review Ban: Stop the endless research loop.",
                        "Rough Draft Challenge: Exposure therapy for mistakes."
                    ],
                    price_original: "Standard Price: $150",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "Speed Reading Basics", description: "Input data faster.", value: "$20" }
                    ],
                    guarantee_text: "SPEED  Double your output speed or refund.",
                    scarcity_text: "Upgrade memory.",
                    cta_text: "LAUNCH V1.0"
                }
            }
        ]
    },
    ISFJ: {
        id: "isfj",
        theme: mbtiThemes.ISFJ,
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
                id: "disease-to-please",
                title: "How to create a Home that Heals Everyone who Enters",
                script: {
                    headline: "YOU AREN'T \"NICE.\" you are afraid.",
                    subheadline: "YOU AREN'T \"NICE.\" you are afraid.",
                    hook_image_prompt: "A cozy living room with a fireplace that emits emotional warmth.",
                    pain_story: "You give 100% of your energy away. And then you secretly resent them for it. \"After everything I did...\" This isn't Service; it's emotional banking. And the bank is bankrupt. You are setting yourself on fire to keep others warm.",
                    agitation_bullets: [
                        "Clutter causing anxiety.",
                        "Family friction.",
                        "Not having a safe space."
                    ],
                    transition_mechanism: "YOU ATTRACT TAKERS.",
                    product_name: "THE FORTRESS OF KINDNESS",
                    product_description: "Interior design and organizational principles for the ISFJ soul.",
                    features_bullets: [
                        "De-cluttering sentimental items (gently).",
                        "Lighting for mood.",
                        "Zones for privacy."
                    ],
                    price_original: "$120",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Hospitality Checklist", description: "Be the perfect host.", value: "$15" }
                    ],
                    guarantee_text: "PEACE  Reduced anxiety in 30 days or full refund.",
                    scarcity_text: "Create sanctuary.",
                    cta_text: "SECURE THE PERIMETER"
                }
            },
            {
                id: "invisible-contract",
                title: "How to Care for Others without Destroying Yourself",
                script: {
                    headline: "My Dearest,",
                    subheadline: "My Dearest,",
                    hook_image_prompt: "A pair of hands holding a glowing heart, but the hands are cracking.",
                    pain_story: "You believe if you have to ask for love, it \"doesn't count.\" You want them to anticipate your needs, because that's what you do. But anticipating needs is Your Superpower, not the standard human setting. Expecting everyone to be an ISFJ is a recipe for disappointment.",
                    agitation_bullets: [
                        "Resentment.",
                        "Physical exhaustion.",
                        "Nobody asking how YOU are."
                    ],
                    transition_mechanism: "PS: You are Passive-Aggressive.",
                    product_name: "The Art of The Ask",
                    product_description: "A permission slip and system for self-care.",
                    features_bullets: [
                        "The 'Not My Emergency' filter.",
                        "Scheduling guilt-free rest.",
                        "Asking for help (the hard part)."
                    ],
                    price_original: "$129",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Scripts to Ask for Help", description: "Don't suffer alone.", value: "$19" }
                    ],
                    guarantee_text: "HEARD  Feel more understood in 30 days or refund.",
                    scarcity_text: "Save yourself.",
                    cta_text: "Speak Up"
                }
            },
            {
                id: "worry-loop",
                title: "How to Organize Family Life so Nothing Slips through the Cracks",
                script: {
                    headline: "YOU ARE HALLUCINATING TRAGEDIES.",
                    subheadline: "YOU ARE HALLUCINATING TRAGEDIES.",
                    hook_image_prompt: "A family calendar that turns into a beautiful mural.",
                    pain_story: "You think if you suffer now, it won't hurt as much later. You are paying interest on a debt you don't owe. If the bad thing doesn't happen? You paid for nothing. If it does? You paid twice. Stop paying.",
                    agitation_bullets: [
                        "Mental load overload.",
                        "Nagging frustration.",
                        "Forgetting one thing and panicking."
                    ],
                    transition_mechanism: "WORRY IS NOT LOVE.",
                    product_name: "THE CALM ANCHOR",
                    product_description: "Templates and systems to run a household.",
                    features_bullets: [
                        "The Shared Calendar system.",
                        "Chore gamification.",
                        "Meal planning automation."
                    ],
                    price_original: "$150",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Budgeting for Families", description: "stretch every dollar.", value: "$19" }
                    ],
                    guarantee_text: "SLEEP  Better sleep in 14 days or refund.",
                    scarcity_text: "Get control.",
                    cta_text: "DROP ANCHOR"
                }
            },
            {
                id: "memory-box",
                title: "How to get Recognized for your Work without Bragging",
                script: {
                    headline: "YOU ARE A HISTORIAN OF PAIN.",
                    subheadline: "YOU ARE A HISTORIAN OF PAIN.",
                    hook_image_prompt: "A pillar of stone supporting a massive tranquil temple.",
                    pain_story: "Most people forget. You archive. You polish old arguments. You dust off old insults. You think Remembering = Protecting. \"If I remember the hurt, I won't let it happen again.\" But you aren't protecting yourself. You are poisoning yourself.",
                    agitation_bullets: [
                        "Being overlooked.",
                        "Taking credit for your work stolen.",
                        "Fear of self-promotion."
                    ],
                    transition_mechanism: "YOU ARE SECRETLY BITTER.",
                    product_name: "THE EMOTIONAL DECLUTTER",
                    product_description: "How to track and present your wins factually.",
                    features_bullets: [
                        "The 'Accomplishment Log'.",
                        "How to have the Review meeting.",
                        "Networking through service."
                    ],
                    price_original: "$149",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Email Templates for Bosses", description: "Update them subtly.", value: "$20" }
                    ],
                    guarantee_text: "LIGHTNESS  Feel physically lighter or full refund.",
                    scarcity_text: "Rise up.",
                    cta_text: "Start Cleaning"
                }
            },
            {
                id: "silent-partner",
                title: "How to Build Memories that Last Generations",
                script: {
                    headline: "THE GHOST IN THE MACHINE.",
                    subheadline: "THE GHOST IN THE MACHINE.",
                    hook_image_prompt: "A photo album where the pictures are moving memories.",
                    pain_story: "You were taught \"Work speaks for itself.\" It doesn't. \"Bragging is bad.\" But stating facts is not bragging. \"I increased efficiency by 20%\" is not arrogance. It is Data. By hiding your data, you are managing your career into the ground.",
                    agitation_bullets: [
                        "Fear of drifting apart.",
                        "Holidays feeling hollow.",
                        "Losing family history."
                    ],
                    transition_mechanism: "WAITING FOR RESCUE.",
                    product_name: "THE QUIET POWER STRATEGY",
                    product_description: "Guide to hosting holidays and creating traditions.",
                    features_bullets: [
                        "Holiday planning without stress.",
                        "Documenting family history.",
                        "The 'Sunday Dinner' revival."
                    ],
                    price_original: "$99",
                    price_discounted: "$50",
                    bonuses: [
                        { title: "Photo Organization", description: "Sort the digital mess.", value: "$15" }
                    ],
                    guarantee_text: "RAISE  Feel more valued in 30 days or refund.",
                    scarcity_text: "Time flies.",
                    cta_text: "CLAIM YOUR WORTH"
                }
            }
        ]
    },
    ESTJ: {
        id: "estj",
        theme: mbtiThemes.ESTJ,
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
                id: "grey-zone",
                title: "How to Manage Projects so They Never Go Over Budget or Time",
                script: {
                    headline: "YOU ARE COLORBLIND TO NUANCE.",
                    subheadline: "YOU ARE COLORBLIND TO NUANCE.",
                    hook_image_prompt: "A gantt chart constructing a skyscraper in real time.",
                    pain_story: "If you treat everything like a nail because you love hammers, you are just breaking windows.",
                    agitation_bullets: [
                        "Herding cats.",
                        "Excuses from team members.",
                        "The chaos of bad planning."
                    ],
                    transition_mechanism: "YOU ARE A BUREAUCRAT.",
                    product_name: "THE CONTEXT ENGINE",
                    product_description: "Templates for hardcore project management.",
                    features_bullets: [
                        "Critical Path Analysis.",
                        "Resource leveling.",
                        "Holding people accountable."
                    ],
                    price_original: "$199",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "Meeting Agendas that Work", description: "Cut talk time by 50%.", value: "$29" }
                    ],
                    guarantee_text: "FLEXIBILITY  Solve a \"stuck\" problem in 30 days or refund.",
                    scarcity_text: "Get results.",
                    cta_text: "UPGRADE LOGIC"
                }
            },
            {
                id: "identity-hedge",
                title: "How to Command Respect in Any Hierarchical Organization",
                script: {
                    headline: "YOU ARE TERRIFIED OF SUNDAY AFTERNOON.",
                    subheadline: "YOU ARE TERRIFIED OF SUNDAY AFTERNOON.",
                    hook_image_prompt: "A lion sitting at the head of a boardroom table.",
                    pain_story: "You have invested 100% of your self-worth stock in one volatile asset: Your Career. When the machine stops (Retirement, Layoff), you disappear.",
                    agitation_bullets: [
                        "Being questioned by subordinates.",
                        "Weak leadership above you.",
                        "Politics blocking efficiency."
                    ],
                    transition_mechanism: "YOU ARE BORING.",
                    product_name: "THE LEGACY BEYOND WORK",
                    product_description: "Navigating corporate politics with honor and strength.",
                    features_bullets: [
                        "Managing Up.",
                        "Dress and demeanor.",
                        "delivering bad news."
                    ],
                    price_original: "$249",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "Negotiation Scripts", description: "Get the raise.", value: "$39" }
                    ],
                    guarantee_text: "BOREDOM  Enjoy downtime in 30 days or refund.",
                    scarcity_text: "Take command.",
                    cta_text: "LEAVE THE OFFICE"
                }
            },
            {
                id: "listening-vault",
                title: "How to Scale Operations from Chaos to Order",
                script: {
                    headline: "YOU ARE A FIXER. THEY DON'T WANT TO BE FIXED.",
                    subheadline: "YOU ARE A FIXER. THEY DON'T WANT TO BE FIXED.",
                    hook_image_prompt: "A factory floor running in perfect synchronization.",
                    pain_story: "\"Why cry about spilled milk?\" Logic works for milk. It fails for humans. Humans need to \"download\" emotions before they can \"upload\" solutions. By interrupting, you reject the download. You tell them: \"Your feelings are a waste of time.\"",
                    agitation_bullets: [
                        "Repetitive questions.",
                        "Quality control failures.",
                        "Growth ceiling."
                    ],
                    transition_mechanism: "YOU ARE EMOTIONALLY DEAF.",
                    product_name: "THE LISTENING VAULT",
                    product_description: "How to write Standard Operating Procedures that people actually read.",
                    features_bullets: [
                        "SOP templates.",
                        "Training automation.",
                        "Quality Assurance checklists."
                    ],
                    price_original: "$299",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Hiring Checklists", description: "Filter for competence.", value: "$49" }
                    ],
                    guarantee_text: "CONNECTION  If they don't say \"Thanks for listening\" in 30 days, refund.",
                    scarcity_text: "Scale up.",
                    cta_text: "ACTIVATE RECEIVER"
                }
            },
            {
                id: "micromanagement-detox",
                title: "How to Enforce Standards without Being a Tyrant",
                script: {
                    headline: "YOU THINK YOU ARE HELPING. THEY THINK YOU ARE A TYRANT.",
                    subheadline: "YOU THINK YOU ARE HELPING. THEY THINK YOU ARE A TYRANT.",
                    hook_image_prompt: "A marble column that is perfectly straight and white.",
                    pain_story: "By inserting yourself into every process, you have become the bottleneck. You have trained your team to be helpless. They stopped thinking because you do it for them. Congratulations, you played yourself.",
                    agitation_bullets: [
                        "Mediocrity acceptance.",
                        "Frustration with laziness.",
                        "Being the 'bad guy'."
                    ],
                    transition_mechanism: "INPUT VS. OUTPUT",
                    product_name: "THE HANDS-OFF PROTOCOL",
                    product_description: "Management training for high-standards leaders.",
                    features_bullets: [
                        "Performance Review scripts.",
                        "Setting KPIs.",
                        "Firing with dignity."
                    ],
                    price_original: "$199",
                    price_discounted: "$99",
                    bonuses: [
                        { title: "Feedback Framework", description: "Correct without crushing.", value: "$29" }
                    ],
                    guarantee_text: "FREEDOM  Save 5 hours/week in 30 days or refund.",
                    scarcity_text: "Standardize.",
                    cta_text: "RELINQUISH COMMAND"
                }
            },
            {
                id: "rage-valve",
                title: "How to Organize Your Entire Life like a Fortune 500 Company",
                script: {
                    headline: "ANGER IS NOT A PRODUCTIVITY TOOL.",
                    subheadline: "ANGER IS NOT A PRODUCTIVITY TOOL.",
                    hook_image_prompt: "A dashboard showing health, wealth, and relationships as business metrics.",
                    pain_story: "\"It is better to be feared than loved.\" Not in 2024. If people fear you, they lie to you. They hide mistakes to avoid the explosion. Your temper is not a sign of strength. It is a sign of Weakness. It means you have lost control.",
                    agitation_bullets: [
                        "Work-Life imbalance.",
                        "Inefficient errands.",
                        "Losing money on late fees."
                    ],
                    transition_mechanism: "YOU ARE A BULLY.",
                    product_name: "THE IRON CALM",
                    product_description: "Running your household like a business.",
                    features_bullets: [
                        "Outsourcing chores.",
                        "Quarterly Life Reviews.",
                        "Strategic Planning for family."
                    ],
                    price_original: "$149",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Estate Planning Basics", description: "Secure the legacy.", value: "$29" }
                    ],
                    guarantee_text: "RESPECT  If people don't open up in 30 days, refund.",
                    scarcity_text: "Take charge.",
                    cta_text: "ENGAGE COOLING"
                }
            }
        ]
    },
    ESFJ: {
        id: "esfj",
        theme: mbtiThemes.ESFJ,
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
                id: "approval-detox",
                title: "How to Host Events that Everyone Talks About for Years",
                script: {
                    headline: "The Party is Over.",
                    subheadline: "The Party is Over.",
                    hook_image_prompt: "A banquet table laden with food and happy guests raising a toast.",
                    pain_story: "You think if everyone smiles, you are close. Wrong. Real intimacy requires friction. You have 100 acquaintances who like your \"mask,\" and 0 friends who know your soul. You are lonely in a crowded room.",
                    agitation_bullets: [
                        "Event anxiety.",
                        "Fear of empty rooms.",
                        "Cooking disasters."
                    ],
                    transition_mechanism: "YOU ARE MANIPULATIVE.",
                    product_name: "The Authentic Core",
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
                    guarantee_text: "REALNESS  Feel more grounded in 30 days or refund.",
                    scarcity_text: "Gather them.",
                    cta_text: "EXIT STAGE LEFT"
                }
            },
            {
                id: "caretaker-curse",
                title: "How to Manage a Popular Social Life without Burning Out",
                script: {
                    headline: "KILLING THEM WITH KINDNESS.",
                    subheadline: "KILLING THEM WITH KINDNESS.",
                    hook_image_prompt: "A spinning rolodex that glows.",
                    pain_story: "You think helplessness is a trait they have. No. By doing everything, you robbed them of the ability to do it themselves.",
                    agitation_bullets: [
                        "Double booking.",
                        "Forgetting birthdays.",
                        "FOMO."
                    ],
                    transition_mechanism: "YOU NEED THEM BROKEN.",
                    product_name: "THE INDEPENDENCE PROTOCOL",
                    product_description: "System for tracking relationships.",
                    features_bullets: [
                        "Birthday automation.",
                        "Grouping friends for efficiency.",
                        "The art of the 'Pop-In'."
                    ],
                    price_original: "$129",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Gift Giving Guide", description: "Perfect gifts every time.", value: "$19" }
                    ],
                    guarantee_text: "ADULT  They start doing laundry in 30 days or refund.",
                    scarcity_text: "Get organized.",
                    cta_text: "STOP HELPING"
                }
            },
            {
                id: "gossip-detox",
                title: "How to Help Everyone without Feeling Unappreciated",
                script: {
                    headline: "You bond over Common Enemies.",
                    subheadline: "You bond over Common Enemies.",
                    hook_image_prompt: "A hand lifting another hand, with mutual light shining.",
                    pain_story: "Your social circle is a shark tank, and you are bleeding.",
                    agitation_bullets: [
                        "Feeling taken for granted.",
                        "Over-volunteering.",
                        "Hidden resentment."
                    ],
                    transition_mechanism: "YOU ARE BORING.",
                    product_name: "THE CLEAN CONNECT",
                    product_description: "Setting terms for your generosity.",
                    features_bullets: [
                        "Communicating needs.",
                        "Stopping 'Please' pleasing.",
                        "Accepting help."
                    ],
                    price_original: "$149",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Self-Love Scripts", description: "Validation from within.", value: "$25" }
                    ],
                    guarantee_text: "TRUST  Deepen friendships in 30 days or refund.",
                    scarcity_text: "Love yourself.",
                    cta_text: "START DETOX"
                }
            },
            {
                id: "harmony-trap",
                title: "How to Navigate Social Politics and maintain Status",
                script: {
                    headline: "THE HARMONY TRAP",
                    subheadline: "THE HARMONY TRAP",
                    hook_image_prompt: "A queen bee surrounded by a harmonious hive.",
                    pain_story: "You aren't protecting the relationship. You are rotting it.",
                    agitation_bullets: [
                        "Gossip handling.",
                        "Exclusion anxiety.",
                        "Reputation management."
                    ],
                    transition_mechanism: "YOU ARE A MARTYR.",
                    product_name: "THE CONFLICT CANVAS",
                    product_description: "Advanced social dynamics for leaders.",
                    features_bullets: [
                        "Squashing rumors.",
                        "Bridging friend groups.",
                        "Digital reputation."
                    ],
                    price_original: "$199",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Etiquette 2.0", description: "Modern manners.", value: "$29" }
                    ],
                    guarantee_text: "SLEEP  Stop replaying arguments in 30 days or refund.",
                    scarcity_text: "Lead the group.",
                    cta_text: "BREAK THE SILENCE"
                }
            },
            {
                id: "shallow-end",
                title: "How to Manage Family Drama and Keep the Peace",
                script: {
                    headline: "QUEEN OF SMALL TALK.",
                    subheadline: "QUEEN OF SMALL TALK.",
                    hook_image_prompt: "A knot being untied by gentle hands.",
                    pain_story: "Holidays are stressful because of In-Laws, siblings, and old feuds. You are the one stuck in the middle trying to make everyone smile.",
                    agitation_bullets: [
                        "Walking on eggshells.",
                        "Dreading reunions.",
                        "Being the messenger."
                    ],
                    transition_mechanism: "ANTI-INTELLECTUAL DEFENSE.",
                    product_name: "THE DEEP DIVE",
                    product_description: "Conflict resolution for families.",
                    features_bullets: [
                        "Stopping fights before they start.",
                        "Seating chart strategy.",
                        "The 'Distraction' technique."
                    ],
                    price_original: "$129",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "Stress Relief Audio", description: "Calm down in the bathroom.", value: "$19" }
                    ],
                    guarantee_text: "WONDER  Have a chills-inducing conversation in 30 days or refund.",
                    scarcity_text: "Make peace.",
                    cta_text: "SUBMERGE"
                }
            }
        ]
    },
    ISTP: {
        id: "istp",
        theme: mbtiThemes.ISTP,
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
                id: "emotional-diagnostic",
                title: "How to Fix Anything in Your Life like a Mechanic",
                script: {
                    headline: "SYSTEM ERROR: EMOTION NOT FOUND.",
                    subheadline: "SYSTEM ERROR: EMOTION NOT FOUND.",
                    hook_image_prompt: "A human body shown as a complex engine schematic.",
                    pain_story: "You hate emotional drama. You just want things to WORK. Whether it's a broken toaster or a broken relationship, you want to open the hood, find the faulty part, and replace it. But people aren't logic gates.",
                    agitation_bullets: [
                        "Emotional irrationality.",
                        "Inefficient systems.",
                        "Being told to 'talk about your feelings'."
                    ],
                    transition_mechanism: "EMOTIONALLY LAZY.",
                    product_name: "THE BLACK BOX",
                    product_description: "A framework to diagnose and fix life problems without therapy.",
                    features_bullets: [
                        "The '5 Whys' for personal issues.",
                        "Optimizing your biochemical engine.",
                        "The 'Patch' mindset vs deep code."
                    ],
                    price_original: "$129",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "DIY Biohacking", description: "Hack your sleep.", value: "$19" }
                    ],
                    guarantee_text: "FUNCTIONALITY  Fix a relationship bug in 30 days or refund.",
                    scarcity_text: "System checks.",
                    cta_text: "RUN DIAGNOSTIC"
                }
            },
            {
                id: "blunt-instrument",
                title: "How to Be Ready for Anything without Being a Crazy Prepper",
                script: {
                    headline: "YOU ARE NOT HONEST. YOU ARE MEAN.",
                    subheadline: "YOU ARE NOT HONEST. YOU ARE MEAN.",
                    hook_image_prompt: "A tactical backpack filled with high-tech gear.",
                    pain_story: "You see the supply chains breaking. You see the fragility of the grid. You aren't scared; you just want to be prepared. But you hate the 'tinfoil hat' crowd.",
                    agitation_bullets: [
                        "Dependency on the system.",
                        "Helplessness in blackouts.",
                        "Wanting to protect your own."
                    ],
                    transition_mechanism: "SOCIALLY LAZY.",
                    product_name: "THE INTERFACE",
                    product_description: "Essential skills for modern survival.",
                    features_bullets: [
                        "Digital security.",
                        "Urban evasion.",
                        "Basic medical mechanics."
                    ],
                    price_original: "$149",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Every Day Carry (EDC) Guide", description: "Optimize your pockets.", value: "$25" }
                    ],
                    guarantee_text: "SILENCE  Fewer arguments in 30 days or refund.",
                    scarcity_text: "Gear up.",
                    cta_text: "CALIBRATE WEAPON"
                }
            },
            {
                id: "commitment-code",
                title: "How to Find Shortcuts in a World of Bureaucracy",
                script: {
                    headline: "YOU WANT A CAT, NOT A DOG.",
                    subheadline: "YOU WANT A CAT, NOT A DOG.",
                    hook_image_prompt: "A person walking through a wall in a maze.",
                    pain_story: "You hate red tape. You hate 'process for process's sake'. You know there is a faster way, but people tell you it's 'not allowed'. You want to get to the outcome now.",
                    agitation_bullets: [
                        "Waiting in line.",
                        "Filling out forms.",
                        "Slow walkers."
                    ],
                    transition_mechanism: "FLIGHT RISK.",
                    product_name: "THE STRONGHOLD",
                    product_description: "Strategies to bypass bureaucratic friction.",
                    features_bullets: [
                        "Social Engineering 101.",
                        "Automating bureaucracy.",
                        "The 'As Soon As Possible' framework."
                    ],
                    price_original: "$99",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Travel Hacking", description: "Fly better for less.", value: "$19" }
                    ],
                    guarantee_text: "SPACE  Feel more free in 30 days or refund.",
                    scarcity_text: "Hack it.",
                    cta_text: "LOCK IN"
                }
            },
            {
                id: "adrenaline-junkie",
                title: "How to Stay Cool when Everyone Else is Losing their Minds",
                script: {
                    headline: "PEACE FEELS LIKE DEATH.",
                    subheadline: "PEACE FEELS LIKE DEATH.",
                    hook_image_prompt: "A pilot in a cockpit with alarms blaring, looking perfectly calm.",
                    pain_story: "You are good in a crisis. But sometimes you are too detached. People think you don't care. Or you bottle it up until you explode. You need a way to process stress physically.",
                    agitation_bullets: [
                        "Adrenaline dumps.",
                        "Emotional numbness.",
                        "Explosive anger."
                    ],
                    transition_mechanism: "CORTISOL JUNKIE.",
                    product_name: "THE EJECT BUTTON",
                    product_description: "Techniques from special forces and stoicism.",
                    features_bullets: [
                        "Box Breathing mastery.",
                        "The 'Observer' mindset.",
                        "Decompressing after the rush."
                    ],
                    price_original: "$129",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Cold Exposure Guide", description: "Freeze the stress.", value: "$15" }
                    ],
                    guarantee_text: "PULSE  Feel alive without crisis in 30 days or refund.",
                    scarcity_text: "Stay cool.",
                    cta_text: "DISENGAGE"
                }
            },
            {
                id: "lone-wolf",
                title: "How to Get Good at Hands-On Skills Fast",
                script: {
                    headline: "THE MYTH OF MERIT.",
                    subheadline: "THE MYTH OF MERIT.",
                    hook_image_prompt: "Hands working on a complex watch mechanism.",
                    pain_story: "You hate classrooms. You hate theory. You learn by breaking things. Traditional education fails you because it doesn't let you touch the problem.",
                    agitation_bullets: [
                        "Boring lectures.",
                        "Theory without practice.",
                        "Reading manuals."
                    ],
                    transition_mechanism: "404: LOYALTY NOT FOUND.",
                    product_name: "THE NETWORK KEY",
                    product_description: "How to learn physical skills (coding, mechanics, wood, etc) rapidly.",
                    features_bullets: [
                        "The 'Sandbox' method.",
                        "Finding mentors who do, not teach.",
                        "Iterative failure."
                    ],
                    price_original: "$149",
                    price_discounted: "$50",
                    bonuses: [
                        { title: "Tool selection guide", description: "Buy once, cry once.", value: "$29" }
                    ],
                    guarantee_text: "ROI  Career opportunity in 60 days or refund.",
                    scarcity_text: "Get hands dirty.",
                    cta_text: "CONNECT_TO_SERVER"
                }
            }
        ]
    },
    ISFP: {
        id: "isfp",
        theme: mbtiThemes.ISFP,
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
                id: "sensitive-soul",
                title: "How to Curate a Life that Looks and Feels like Art",
                script: {
                    headline: "You are an Open Wound.",
                    subheadline: "You are an Open Wound.",
                    hook_image_prompt: "A room where every object triggers joy and color.",
                    pain_story: "You are sensitive to your environment. Ugly lights, bad textures, and boring walls drain your soul. You want your outer world to reflect your inner beauty.",
                    agitation_bullets: [
                        "Visual clutter.",
                        "Sensory overload.",
                        "Feeling bland."
                    ],
                    transition_mechanism: "VICTIMHOOD IS A DRUG.",
                    product_name: "THE ARMOR",
                    product_description: "Interior design and lifestyle curation for the ISFP.",
                    features_bullets: [
                        "Lighting as therapy.",
                        "Thrifting treasures.",
                        "The 'Vibe' check."
                    ],
                    price_original: "$99",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Color Theory for Mood", description: "Paint your feelings.", value: "$15" }
                    ],
                    guarantee_text: "RESILIENCE  Handle criticism better in 30 days or refund.",
                    scarcity_text: "Make art.",
                    cta_text: "EQUIP ARMOR"
                }
            },
            {
                id: "unfinished-masterpiece",
                title: "How to Sell Your Art without Feeling like a Sellout",
                script: {
                    headline: "The Unfinished Masterpiece MESS.",
                    subheadline: "The Unfinished Masterpiece MESS.",
                    hook_image_prompt: "A gallery wall with 'Sold' stickers on everything.",
                    pain_story: "You make beautiful things. But you hate 'pushing' them. You hope people will just notice. They won't. You need a way to share your gift that feels genuine.",
                    agitation_bullets: [
                        "Underpricing work.",
                        "Hiding from customers.",
                        "Inventory piling up."
                    ],
                    transition_mechanism: "JEALOUS OF \"HACKS\".",
                    product_name: "THE GALLERY",
                    product_description: "Instagram and Pinterest strategies for visual artists.",
                    features_bullets: [
                        "Photography for products.",
                        "Writing captions that feel real.",
                        "Pricing based on soul."
                    ],
                    price_original: "$149",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Portfolio Review Checklist", description: "Look pro.", value: "$25" }
                    ],
                    guarantee_text: "DONE  Finish one project in 30 days or refund.",
                    scarcity_text: "Show the world.",
                    cta_text: "SHIP IT"
                }
            },
            {
                id: "silent-resentment",
                title: "How to Find Peace through Your Senses (Not Thinking)",
                script: {
                    headline: "Volcano Disguised AS A MEADOW.",
                    subheadline: "Volcano Disguised AS A MEADOW.",
                    hook_image_prompt: "A hand running through tall grass at sunset.",
                    pain_story: "Standard meditation makes you anxious. 'Clear your mind'? Impossible. You experience the world through touch, taste, sound. Use that.",
                    agitation_bullets: [
                        "Monkey mind.",
                        "Fidgeting.",
                        "Boredom."
                    ],
                    transition_mechanism: "UNPREDICTABLE = SCARY.",
                    product_name: "THE PRESSURE GAUGE",
                    product_description: "Mindfulness techniques based on art, nature, and music.",
                    features_bullets: [
                        "The 'Sound Bath' method.",
                        "Tactile grounding.",
                        "Visual gazing."
                    ],
                    price_original: "$79",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Nature Walk Audio", description: "Guided immersion.", value: "$11" }
                    ],
                    guarantee_text: "CALM  Less jaw tension in 30 days or refund.",
                    scarcity_text: "Senses awake.",
                    cta_text: "VENT STEAM"
                }
            },
            {
                id: "the-ghost",
                title: "How to Dress to Express Your True Self",
                script: {
                    headline: "NINJA OF AVOIDANCE.",
                    subheadline: "NINJA OF AVOIDANCE.",
                    hook_image_prompt: "A mannequin with a unique, colorful, mismatched but perfect outfit.",
                    pain_story: "You hate uniforms. You hate looking like everyone else. But sometimes you struggle to put your unique vibe into a cohesive look. You want to walk into a room and be 'seen'.",
                    agitation_bullets: [
                        "Closet full of nothing to wear.",
                        "Feeling invisible.",
                        "Impulse shopping."
                    ],
                    transition_mechanism: "EMOTIONALLY SELFISH.",
                    product_name: "THE SÉANCE",
                    product_description: "Developing a personal brand through fashion.",
                    features_bullets: [
                        "Thrifting for unicorns.",
                        "Breaking fashion rules.",
                        "The 'Comfort vs Style' myth."
                    ],
                    price_original: "$99",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Capsule Wardrobe for Rebels", description: "Mix and match.", value: "$19" }
                    ],
                    guarantee_text: "CLOSURE  Feel lighter in 30 days or refund.",
                    scarcity_text: "Express yourself.",
                    cta_text: "STOP GHOSTING"
                }
            },
            {
                id: "identity-crisis",
                title: "How to Take Care of Yourself without Following Rules",
                script: {
                    headline: "PROFESSIONAL SHAPESHIFTER.",
                    subheadline: "PROFESSIONAL SHAPESHIFTER.",
                    hook_image_prompt: "A person doing yoga on a cliff edge at sunrise.",
                    pain_story: "You hate gyms. You hate diets. The moment someone tells you to do 10 reps, you want to leave. You need a way to move and eat that feels like freedom.",
                    agitation_bullets: [
                        "Gym boredom.",
                        "Diet rebellion.",
                        "Feeling trapped by routine."
                    ],
                    transition_mechanism: "FEELING LIKE A FRAUD.",
                    product_name: "THE MIRROR",
                    product_description: "Fitness and health through dance, play, and nature.",
                    features_bullets: [
                        "Dance as cardio.",
                        "Eating with the seasons.",
                        "Rest as rebellion."
                    ],
                    price_original: "$89",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Playlist for Movement", description: "Rhythm is life.", value: "$10" }
                    ],
                    guarantee_text: "SELF  Find your core in 30 days or refund.",
                    scarcity_text: "Break free.",
                    cta_text: "FACE YOURSELF"
                }
            }
        ]
    },
    INTP: {
        id: "intp",
        theme: mbtiThemes.INTP,
        name: "The Logician",
        artistic_vibe: "Deep indigo void, floating geometric nodes, soft electric violet glow, drifting particles, neural networks forming crystals, quiet curiosity, unresolved puzzles.",
        psychological_triggers: [
            "Intellectual Curiosity",
            "First Principles Thinking",
            "Conceptual Clarity",
            "Autonomy & Exploration",
            "Unique Insight"
        ],
        products: [
            {
                id: "mastery",
                semantic_slug: "intp-mastery-spiritual-ai",
                title: "How to Master Focus without Rigid Schedules in 7 Days",
                script: {
                    headline: "How to Enter Deep Flow on Command Without Creating Soul-Sucking Spreadsheets or waking up at 5AM",
                    subheadline: "For the mind that never stops running: A non-linear system for extreme productivity.",
                    hook_image_prompt: "A neural network slowly rearranging itself into a clean geometric crystal, deep indigo background",
                    image_url: "/images/products/intp_neural.png",
                    pain_story: "You aren't unfocused. You are thinking in someone else's structure. Top-down systems assume compliance. Your brain assumes curiosity.",
                    agitation_bullets: [
                        { title: "Analysis Paralysis", analysis: "You see infinite branches of possibility. To choose one is to kill the others. This fear of closing doors keeps you stuck in the hallway, never entering a room." },
                        { title: "The Start–Stop Loop", analysis: "You love the 'Idea Phase' (10/10 dopamine). You hate the 'Execution Phase' (0/10 dopamine). You have a graveyard of half-finished projects that haunt you." },
                        { title: "Puzzle Completion Drop-off", analysis: "Once you SOLVE the problem in your head, the physical manifestation feels redundant. You lose interest because the intellectual challenge is gone." }
                    ],
                    transition_mechanism: "YOU ARE UNDER-ENGAGED.",
                    product_name: "THE FOCUS MASTERY SYSTEM",
                    product_description: "An AI-powered workspace that adapts to YOUR brain. It doesn't force a schedule; it curates your 'Next Logical Step' based on your current dopamine levels.",
                    features_bullets: [
                        "The '5-Year-Old' Test: If it can't be explained simply, it isn't understood.",
                        "Analogy Generator: Abstract ideas mapped to physical intuition.",
                        "Gap Analysis: Shows the *missing* link, not the obvious one."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Rabbit Hole Blocker", description: "Prevent infinite regression.", value: "$19" },
                        { title: "INTP Sleep Hacking", description: "Turn off the background process.", value: "$29" }
                    ],
                    guarantee_text: "🛡️ If you don't experience a genuine \"Aha\" within 20 minutes — we refund you.",
                    scarcity_text: "Beta access limited. Not for scarcity — for signal integrity.",
                    cta_text: "Initialize System"
                }
            },
            {
                id: "social-life",
                semantic_slug: "intp-social-life-spiritual-ai",
                title: "How to Hack Social Dynamics without Faking Etiquette in 2 Weeks",
                script: {
                    headline: "How to Network Like a Power Broker Without 'Small Talk' or Fake Smiles",
                    subheadline: "Treat human interaction like a system to be optimized, not a performance to be endured.",
                    hook_image_prompt: "Glowing blue digital brain with intricate circuit patterns",
                    image_url: "/images/products/intp_brain.png",
                    pain_story: "You see connections others miss, but articulating them feels like trying to explain a color. You are overwhelmed by the noise because you haven't tuned your filter.",
                    agitation_bullets: [
                        { title: "Explanation Fatigue", analysis: "You constantly simplify your thoughts for others, losing fidelity in the process. This creates a feedback loop where you stop trying to explain complex ideas, leading to intellectual isolation." },
                        { title: "Insight Isolation", analysis: "You see the solution clearly, but because you can't sell it emotionally, it gets ignored. You watch the slow-motion car crash you predicted, powerless to stop it." },
                        { title: "Information Overload", analysis: "Your brain doesn't have a spam filter. You process the hum of the fridge with the same priority as a conversation. This leads to rapid battery drain in social settings." }
                    ],
                    transition_mechanism: "YOUR FILTER IS NOISY.",
                    product_name: "THE SOCIAL CODE",
                    product_description: "A framework that deconstructs social interactions into logical flowcharts. No emotion required—just pure pattern matching.",
                    features_bullets: [
                        "Signal Extraction: Identify the 1% of data that matters.",
                        "The Isomorphism Engine: Apply solutions from biology to code.",
                        "Recursive Learning: Learn how to learn."
                    ],
                    price_original: "$199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "Universal Models", description: "Mental models that work everywhere.", value: "$29" }
                    ],
                    guarantee_text: "If the noise doesn't quiet down, you get your money back.",
                    scarcity_text: "Signal tuning active.",
                    cta_text: "Download The Social Code"
                }
            },
            {
                id: "second-brain",
                semantic_slug: "intp-second-brain-spiritual-ai",
                title: "How to Learn Any Skill without Boring Repetition in 48 Hours",
                script: {
                    headline: "Upload Skills to Your Brain Like Neo. No 10,000 Hours. Just Pure Data Compression.",
                    subheadline: "For the INTP who wants to know EVERYTHING but hates the grind.",
                    hook_image_prompt: "Abstract art visualizing complex ideas, hunter storm style",
                    image_url: "/images/products/intp_abstract.png",
                    pain_story: "You have brilliant ideas that die in your head because 'finishing' feels boring. The execution phase kills the discovery phase.",
                    agitation_bullets: [
                        "The Graveyard of Started Projects",
                        "Perfectionism as Procrastination",
                        "Execution Borne"
                    ],
                    transition_mechanism: "YOU NEED A PLAYGROUND.",
                    product_name: "SKILL UPLOAD PROTOCOL",
                    product_description: "An AI tool that strips away the fluff and gives you the raw logic gates of any skill. Learn the 20% that gives 80% of results.",
                    features_bullets: [
                        "The Sandbox Mode: Create without consequence.",
                        "Modular Building: Assemble finished projects from small experiments.",
                        "The 'Good Enough' Algorithm: Mathematically define when to stop."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Flow State Triggers", description: "Hack your biology for focus.", value: "$25" }
                    ],
                    guarantee_text: "If you don't ship something, refund.",
                    scarcity_text: "Open sandbox.",
                    cta_text: "Start Upload"
                }
            },
            {
                id: "theory-everything",
                semantic_slug: "intp-theory-everything-spiritual-ai",
                title: "How to Find Your Life Purpose without Woo-Woo Nonsense in 60 Minutes",
                script: {
                    headline: "Solve the 'Meaning of Life' Equation. No Crystals, No Chanting, Just Logic.",
                    subheadline: "Turn your existential dread into a grand unified theory of your life.",
                    hook_image_prompt: "A single glowing equation floating in a void",
                    image_url: "/images/products/intp_abstract.png",
                    pain_story: "You search for meaning but find only contradictions. Typical self-help feels shallow and illogical.",
                    agitation_bullets: [
                        "Existential Nihilism",
                        "Analysis Loop",
                        "Lack of Direction"
                    ],
                    transition_mechanism: "MEANING IS CONSTRUCTED.",
                    product_name: "THE PURPOSE CONSTRUCTOR",
                    product_description: "A guided AI framework to construct a personal philosophy that is logically consistent and emotionally resonant.",
                    features_bullets: [
                        "Axiom Definition: Define your base truths.",
                        "Logic Chain: Derive values from facts.",
                        "Purpose Statement: A clear, testable mission."
                    ],
                    price_original: "$299",
                    price_discounted: "$99",
                    bonuses: [
                        { title: "Nihilism Antidote", description: "Logic for hope.", value: "$29" }
                    ],
                    guarantee_text: "Find clarity or refund.",
                    scarcity_text: "Construct meaning.",
                    cta_text: "Construct Meaning"
                }
            },
            {
                id: "debug-existence",
                semantic_slug: "intp-debug-existence-spiritual-ai",
                title: "How to Automate Your Income without Marketing Sleaze in 30 Days",
                script: {
                    headline: "Build a Money Machine That Runs on Logic, Not Charisma.",
                    subheadline: "Stop trading time for money. Start building assets that exist independently of your labor.",
                    hook_image_prompt: "A complex machine running smoothly without human intervention",
                    image_url: "/images/products/intp_neural.png",
                    pain_story: "You hate selling. You hate convincing people. You just want to build cool things and have them work.",
                    agitation_bullets: [
                        "Sales Anxiety",
                        "Marketing Fatigue",
                        "Income Inconsistency"
                    ],
                    transition_mechanism: "AUTOMATION IS FREEDOM.",
                    product_name: "THE PASSIVE INCOME ENGINE",
                    product_description: "A complete guide to building 'No-Code' SaaS and digital assets that sell themselves via search intent, not social hype.",
                    features_bullets: [
                        "Search Intent SEO: Capture existing demand.",
                        "No-Code Automation: Build without dev teams.",
                        "Content Systems: Create once, sell forever."
                    ],
                    price_original: "$128",
                    price_discounted: "$32",
                    bonuses: [
                        { title: "SEO Checklist", description: "Rank without hacks.", value: "$19" }
                    ],
                    guarantee_text: "Build an asset or refund.",
                    scarcity_text: "Start building.",
                    cta_text: "Build The Machine"
                }
            }
        ]
    },
    ESTP: {
        id: "estp",
        theme: mbtiThemes.ESTP,
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
                id: "peter-pan",
                title: "How to Launch a Business this Weekend with $0",
                script: {
                    headline: "ALLERGIC TO FOREVER.",
                    subheadline: "ALLERGIC TO FOREVER.",
                    hook_image_prompt: "A smartphone displaying a Stripe notification: '$1,000 Payment Received'.",
                    pain_story: "You have 100 ideas. You see opportunity everywhere. But you get bogged down in 'legal' or 'websites'. You miss the window. You want the rush of the first sale.",
                    agitation_bullets: [
                        "Analysis paralysis.",
                        "Watching slower people succeed.",
                        "Leaving money on the table."
                    ],
                    transition_mechanism: "YOU ARE AGING BADLY.",
                    product_name: "THE ANCHOR SYSTEM",
                    product_description: "Step-by-step guide to validating and selling instantly.",
                    features_bullets: [
                        "Preselling scripts.",
                        "Landing pages that convert.",
                        "Getting the first user."
                    ],
                    price_original: "$199",
                    price_discounted: "$45",
                    bonuses: [
                        { title: "Cold DM Templates", description: "Slide in and sell.", value: "$29" }
                    ],
                    guarantee_text: "ROOTS  Feel relief in 30 days or refund.",
                    scarcity_text: "Launch now.",
                    cta_text: "DROP ANCHOR"
                }
            },
            {
                id: "quiet-guide",
                title: "How to Negotiate Anything like a Hostage Negotiator",
                script: {
                    headline: "YOU ARE AFRAID OF THE QUIET.",
                    subheadline: "YOU ARE AFRAID OF THE QUIET.",
                    hook_image_prompt: "Two hands shaking over a table covered in money.",
                    pain_story: "You know you are leaving value on the table. You hate paying retail. You hate losing arguments. You want the thrill of the win.",
                    agitation_bullets: [
                        "Overpaying.",
                        "Getting rolled.",
                        "Feeling weak."
                    ],
                    transition_mechanism: "HIGH ON YOUR OWN SUPPLY.",
                    product_name: "THE STATIC VOID",
                    product_description: "Psychological tactics for negotiation.",
                    features_bullets: [
                        "The 'Flinch' technique.",
                        "Silence as a weapon.",
                        "Anchoring high."
                    ],
                    price_original: "$249",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Salary Negotiation Script", description: "+$10k instantly.", value: "$39" }
                    ],
                    guarantee_text: "PEACE  Feel a drop in cortisol in 30 days or refund.",
                    scarcity_text: "Close it.",
                    cta_text: "ENTER THE VOID"
                }
            },
            {
                id: "reckless-driver",
                title: "How to Charm Anyone into Doing Anything",
                script: {
                    headline: "FERRARI WITH NO BRAKES.",
                    subheadline: "FERRARI WITH NO BRAKES.",
                    hook_image_prompt: "A person in a crowd, glowing, with everyone leaning in towards them.",
                    pain_story: "You are naturally charming, but you want to weaponize it. You want to be able to talk your way into VIP, out of tickets, and into deals.",
                    agitation_bullets: [
                        "Getting 'No'.",
                        "Being ignored.",
                        "Social friction."
                    ],
                    transition_mechanism: "DEBRIS FIELD.",
                    product_name: "CALCULATED RISK SYSTEM",
                    product_description: "Advanced persuasion and social engineering.",
                    features_bullets: [
                        "Pattern interrupts.",
                        "Hypnotic language patterns.",
                        "Building instant rapport."
                    ],
                    price_original: "$199",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Pickup Lines that Work (Business)", description: "Open any door.", value: "$25" }
                    ],
                    guarantee_text: "SURVIVAL  Avoid one major regret in 30 days or refund.",
                    scarcity_text: "Open doors.",
                    cta_text: "INSTALL BRAKES"
                }
            },
            {
                id: "salesman-curse",
                title: "How to Get More Done in 2 Hours of Chaos than 2 Weeks of Order",
                script: {
                    headline: "ALWAYS CLOSING.",
                    subheadline: "ALWAYS CLOSING.",
                    hook_image_prompt: "A clock ticking down the final second, an explosion of productivity.",
                    pain_story: "You can't work without a fire under you. People tell you to plan ahead. Screw that. You work best when the building is burning. Learn to harness the fire.",
                    agitation_bullets: [
                        "Boredom lethargy.",
                        "Guilt about waiting.",
                        "Last minute panic attacks."
                    ],
                    transition_mechanism: "TRANSACTIONAL LOVER.",
                    product_name: "THE REAL DEAL",
                    product_description: "Productivity for adrenaline junkies.",
                    features_bullets: [
                        "Setting fake stakes.",
                        "The 'Sprint' workflow.",
                        "Post-game recovery."
                    ],
                    price_original: "$99",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Focus Playlists (Techno)", description: "High BPM work.", value: "$15" }
                    ],
                    guarantee_text: "INTIMACY  Feel a real connection in 30 days or refund.",
                    scarcity_text: "Go fast.",
                    cta_text: "GO OFF DUTY"
                }
            },
            {
                id: "shiny-object",
                title: "How to Take Big Risks without Losing it All",
                script: {
                    headline: "ADDICTED TO THE START.",
                    subheadline: "ADDICTED TO THE START.",
                    hook_image_prompt: "A poker player pushing chips 'All In' with a slight smile.",
                    pain_story: "You love risk. But you've been burned. You want to swing for the fences without striking out. You need a system for evaluating upsides.",
                    agitation_bullets: [
                        "Reckless losses.",
                        "Regret.",
                        "Being told to 'play safe'."
                    ],
                    transition_mechanism: "HUSTLER VS. FOUNDER.",
                    product_name: "FINISH LINE FRAMEWORK",
                    product_description: "Risk assessment frameworks.",
                    features_bullets: [
                        "Expected Value calculations.",
                        "Hedging your bets.",
                        "Knowing when to fold."
                    ],
                    price_original: "$149",
                    price_discounted: "$50",
                    bonuses: [
                        { title: "Crisis Management", description: "When it hits the fan.", value: "$29" }
                    ],
                    guarantee_text: "COMPLETION  Finish one stalled project in 30 days or refund.",
                    scarcity_text: "Roll dice.",
                    cta_text: "EXECUTE"
                }
            }
        ]
    },
    ESFP: {
        id: "esfp",
        theme: mbtiThemes.ESFP,
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
                id: "drama-magnet",
                title: "How to Light Up Every Room You Walk Into",
                script: {
                    headline: "YOU SAY YOU HATE DRAMA.",
                    subheadline: "YOU SAY YOU HATE DRAMA.",
                    hook_image_prompt: "A person stepping onto a dance floor, the crowd parting and cheering.",
                    pain_story: "You love attention, but you want it to be for the right reasons. You want to be remembered as the person who made everyone feel amazing, not just loud.",
                    agitation_bullets: [
                        "Being dismissed as 'too much'.",
                        "Post-party emptiness.",
                        "Needing validation."
                    ],
                    transition_mechanism: "COMMON DENOMINATOR.",
                    product_name: "THE REALITY CHECK",
                    product_description: "Enhancing your natural star power.",
                    features_bullets: [
                        "Entrance/Exit tech.",
                        "The 'Energy Gift'.",
                        "Handling hecklers (haters)."
                    ],
                    price_original: "$129",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Style for Impact", description: "Dress loud.", value: "$19" }
                    ],
                    guarantee_text: "CHILL  Be bored in 30 days or refund.",
                    scarcity_text: "Showtime.",
                    cta_text: "CANCEL_SUBSCRIPTION"
                }
            },
            {
                id: "impulsive-shopper",
                title: "How to Turn Your Social Life into a Business",
                script: {
                    headline: "ALLERGIC TO SAVING.",
                    subheadline: "ALLERGIC TO SAVING.",
                    hook_image_prompt: "A VIP pass made of solid gold.",
                    pain_story: "You are the one bringing the party. Why aren't you getting paid? You organize the fun, you bring the people. It's time to cash in on your gravity.",
                    agitation_bullets: [
                        "Being the broke 'fun' friend.",
                        "Spending money to entertain others.",
                        "Wasted influence."
                    ],
                    transition_mechanism: "CHILD WITH A CREDIT CARD.",
                    product_name: "THE CASH DETOX",
                    product_description: "Event promotion and influencing 101.",
                    features_bullets: [
                        "Sponsorships for events.",
                        "Getting into VIP for free.",
                        "Building a contact list."
                    ],
                    price_original: "$199",
                    price_discounted: "TOTAL: $40",
                    bonuses: [
                        { title: "Brand Deal Templates", description: "Get paid to post.", value: "$29" }
                    ],
                    guarantee_text: "BALANCE  Savings grow in 30 days or refund.",
                    scarcity_text: "List only.",
                    cta_text: "FREEZE_ACCOUNT"
                }
            },
            {
                id: "spotlight-addiction",
                title: "How to Never Be Bored or Boring Again",
                script: {
                    headline: "Who are you when the music stops?",
                    subheadline: "Who are you when the music stops?",
                    hook_image_prompt: "A life raft turning into a luxury yacht instantly.",
                    pain_story: "You fear boredom like death. You hate scripts. You want to flow through life, handling whatever comes with a laugh. But anxiety sometimes kills the joke.",
                    agitation_bullets: [
                        "Awkward pauses.",
                        "Fear of stillness.",
                        "Trying too hard."
                    ],
                    transition_mechanism: "YOU ARE EXHAUSTING.",
                    product_name: "THE GREEN ROOM",
                    product_description: "Using comedy techniques for confidence.",
                    features_bullets: [
                        "Thinking on your feet.",
                        "Turning mistakes into bits.",
                        "The 'Rule of Cool'."
                    ],
                    price_original: "$99",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "The Joke Vault", description: "Emergency laughs.", value: "$15" }
                    ],
                    guarantee_text: "REAL  Feel worth alone in 30 days or refund.",
                    scarcity_text: "Action.",
                    cta_text: "GO OFF SCRIPT"
                }
            },
            {
                id: "the-flake",
                title: "How to Bring Fun into the Workplace (and get promoted)",
                script: {
                    headline: "GREAT FRIEND... WHEN YOU SHOW UP.",
                    subheadline: "GREAT FRIEND... WHEN YOU SHOW UP.",
                    hook_image_prompt: "A gray office cubicle bursting into colorful confetti.",
                    pain_story: "Work is so... serious. It drains you. You know that happy people work harder, but the bosses are stiff. You want to be successful without becoming a robot.",
                    agitation_bullets: [
                        "Corporate depression.",
                        "Stifling your laughter.",
                        "Dying inside."
                    ],
                    transition_mechanism: "Cultural Alchemy. Transforming morale through energy.",
                    product_name: "CALENDAR LOCK",
                    product_description: "Leading through positivity.",
                    features_bullets: [
                        "Gamifying KPIs.",
                        "Team building that doesn't suck.",
                        "Infectious enthusiasm."
                    ],
                    price_original: "$149",
                    price_discounted: "$35",
                    bonuses: [
                        { title: "Icebreakers that Work", description: "Actually fun.", value: "$19" }
                    ],
                    guarantee_text: "TRUST  Friends trust you more in 30 days or refund.",
                    scarcity_text: "Smile.",
                    cta_text: "CONFIRM RSVP"
                }
            },
            {
                id: "toxic-positivity",
                title: "How to Plan for Spontaneity (Irony Intended)",
                script: {
                    headline: "GOOD VIBES ONLY.",
                    subheadline: "GOOD VIBES ONLY.",
                    hook_image_prompt: "A calendar with blank spaces that glow gold.",
                    pain_story: "You hate commitment because it kills options. But having NO plan means you end up doing nothing. You need a structure that creates freedom.",
                    agitation_bullets: [
                        "Flaking on plans.",
                        "Analysis paralysis on Friday night.",
                        "Wasting weekends."
                    ],
                    transition_mechanism: "TURN OFF THE STROBE.",
                    product_name: "THE SHADOW WORK",
                    product_description: "Scheduling for freedom seekers.",
                    features_bullets: [
                        "The 'Wildcard' Weekend.",
                        "Money buffer for spontaneity.",
                        "Saying Yes without regret."
                    ],
                    price_original: "$89",
                    price_discounted: "$40",
                    bonuses: [
                        { title: "Last Minute Travel Hacks", description: "Go now.", value: "$15" }
                    ],
                    guarantee_text: "DEPTH  Feel deeper in 30 days or refund.",
                    scarcity_text: "Go.",
                    cta_text: "ENTER_THE_SHADOW"
                }
            }
        ]
    }
};
