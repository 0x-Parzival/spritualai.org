import { MBTIProfile } from "./types";
import { mbtiThemes } from "./themes";

export const productsData: Record<string, MBTIProfile> = {
    INTP: {
        id: "intp",
        theme: mbtiThemes.INTP,
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
                id: "mastery",
                title: "How to Master Focus without Rigid Schedules in 7 Days",
                script: {
                    headline: "YOU DON'T UNDERSTAND IT. YOU JUST MEMORIZED THE NAME.",
                    subheadline: "YOU DON'T UNDERSTAND IT. YOU JUST MEMORIZED THE NAME.",
                    hook_image_prompt: "A glowing neural network arranging itself into a perfect crystal structure in a void.",
                    pain_story: "When you use big words, nobody challenges you. It feels safe. But true genius is simple. You are struggling because you learn \"top-down\" (memorization) instead of \"bottom-up\" (derivation). You need to stop adding layers and start stripping them away.",
                    agitation_bullets: [
                        "Analysis Paralysis: Spending more time researching the perfect tool than doing the work.",
                        "The Start-Stop Cycle: Burst of manic energy followed by weeks of guilt-ridden inactivity.",
                        "Intellectual Boredom: Abandoning projects the moment the 'puzzle' is solved, leaving money on the table."
                    ],
                    transition_mechanism: "YOU ARE AN INTELLECTUAL SNOB.",
                    product_name: "THE FIRST PRINCIPLES ENGINE",
                    product_description: "An AI-powered workspace that adapts to YOUR brain. It doesn't force a schedule; it curates your 'Next Logical Step' based on your current dopamine levels.",
                    features_bullets: [
                        "The \"5-Year-Old\" Test: A rigorous test to expose lazy thinking.",
                        "The Analogy Generator: Map abstract concepts to physical objects.",
                        "The Gap Analysis: Highlight exactly what you don't know."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "The 'Rabbit Hole' Blocker", description: "Browser extension that allows research but stops infinite scroll.", value: "$29" },
                        { title: "INTP Sleep Hacking Guide", description: "How to turn off the analysis engine at night.", value: "$19" }
                    ],
                    guarantee_text: "THE \"AHA!\"  If you don't feel that click of \"Oh, I finally *get* it\" within 20 minutes, we refund you.",
                    scarcity_text: "Beta access limited to the first 100 Logicians.",
                    cta_text: "START DECONSTRUCTION"
                }
            },
            {
                id: "social-life",
                title: "How to Hack Social Dynamics without Faking Etiquette in 2 Weeks",
                script: {
                    headline: "YOU AREN'T \"ANTI-SOCIAL\". YOU ARE INTOLERANT OF INEFFICIENCY.",
                    subheadline: "YOU AREN'T \"ANTI-SOCIAL\". YOU ARE INTOLERANT OF INEFFICIENCY.",
                    hook_image_prompt: "A digital HUD overlay on a crowd of people showing social connection lines and probability stats.",
                    pain_story: "You think \"socializing\" means being the loud party animal. That is a lie. That is Performance. When you fake it, it triggers the \"Uncanny Valley\" effect. To build a social life, you don't need to change. You need to target better users.",
                    agitation_bullets: [
                        "The 'Awkward Silence' spiral where you overanalyze every micro-expression.",
                        "Being seen as 'arrogant' or 'aloof' when you're actually just deep in thought.",
                        "Losing opportunities to less competent people who are just 'better at talking'."
                    ],
                    transition_mechanism: "YOU ARE JUDGMENTAL.",
                    product_name: "THE SOCIAL ALGORITHM",
                    product_description: "A framework that deconstructs social interactions into logical flowcharts. No emotion required—just pure pattern matching.",
                    features_bullets: [
                        "Small Talk Decompiler: Understand the evolutionary protocol so you don't hate it.",
                        "The \"Topic Bridge\": Steer from \"Weather\" to \"Philosophy\" in 3 moves.",
                        "The Battery Saver: How to leave a party gracefully."
                    ],
                    price_original: "$199",
                    price_discounted: "$59",
                    bonuses: [
                        { title: "The Introvert's Energy Shield", description: "Techniques to socialize for hours without draining your battery.", value: "$47" },
                        { title: "Email Scripts for Geniuses", description: "Templates to sound warm without typing emojis.", value: "$27" }
                    ],
                    guarantee_text: "THE TRIBE  If you don't have one deep conversation in 14 days, we refund you.",
                    scarcity_text: "Pattern set expiring soon.",
                    cta_text: "OPEN CONNECTION"
                }
            },
            {
                id: "second-brain",
                title: "How to Learn Any Skill without Boring Repetition in 48 Hours",
                script: {
                    headline: "YOUR BRAIN IS FOR PROCESSING. NOT STORAGE.",
                    subheadline: "YOUR BRAIN IS FOR PROCESSING. NOT STORAGE.",
                    hook_image_prompt: "A human silhouette with data streams entering the mind, creating a glowing galaxy inside.",
                    pain_story: "You treat information like a dragon treats gold: You sit on it. But information that isn't connected is dead weight. You are terrified that if you close a tab, you will lose that knowledge forever. You need a system that allows you to Capture, Organize, and Forget.",
                    agitation_bullets: [
                        "The 'Jack of All Trades' curse: Good at everything, master of nothing.",
                        "Frustration with slow instructors who explain things you grasped in 5 seconds.",
                        "Giving up right before the breakthrough because the novelty wore off."
                    ],
                    transition_mechanism: "PASSIVE CONSUMPTION.",
                    product_name: "THE ARCHIVE PROTOCOL",
                    product_description: "An AI tool that strips away the fluff and gives you the raw logic gates of any skill. Learn the 20% that gives 80% of results.",
                    features_bullets: [
                        "Capture Workflow: Save any thought in 2 clicks.",
                        "Tagging Ontology: A universal system that scales to 10k notes.",
                        "Serendipity Engine: Randomized review to spark creativity."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Speed Reading for Code", description: "Consume technical documentation in minutes.", value: "$39" }
                    ],
                    guarantee_text: "THE RECALL  If you can't find information within 10 seconds, we refund you.",
                    scarcity_text: "Algorithm update pending.",
                    cta_text: "BUILD THE ARCHIVE"
                }
            },
            {
                id: "theory-everything",
                title: "How to Find Your Life Purpose without Woo-Woo Nonsense in 60 Minutes",
                script: {
                    headline: "THE THEORY OF EVERYTHING.",
                    subheadline: "THE THEORY OF EVERYTHING.",
                    hook_image_prompt: "A man standing at the edge of a digital cliff looking at a sunrise made of geometric shapes.",
                    pain_story: "Your brain is a Divergence Engine. It generates endless possibilities. But to leave a legacy, you need Convergence. You need to take your 50 fragments and forge them into a Sword. The structure must be imposed on the chaos.",
                    agitation_bullets: [
                        "The endless 'Why Bother?' loop.",
                        "Feeling intellectually superior but existentially empty.",
                        "Watching less smart people succeed because they have 'faith' you can't replicate."
                    ],
                    transition_mechanism: "THE FEAR OF FINISHING.",
                    product_name: "THE MAGNUM OPUS BLUEPRINT",
                    product_description: "A guided AI framework to construct a personal philosophy that is logically consistent and emotionally resonant.",
                    features_bullets: [
                        "The \"Through-Line\" Workshop: Find the invisible thread that connects everything you love.",
                        "The \"Ship It\" Protocol: Release \"Version 1.0\" to escape analysis paralysis.",
                        "The Legacy Map: Plan the work that will outlive you."
                    ],
                    price_original: "$299",
                    price_discounted: "$99",
                    bonuses: [
                        { title: "Nihilism Antidote Audio", description: "Logical arguments to get out of bed.", value: "$25" }
                    ],
                    guarantee_text: "THE LEGACY  If this doesn't help you outline your Great Work in 30 days, we refund you.",
                    scarcity_text: "Limited workshop slots.",
                    cta_text: "BUILD THE CATHEDRAL"
                }
            },
            {
                id: "debug-existence",
                title: "How to Automate Your Income without Marketing Sleaze in 30 Days",
                script: {
                    headline: "YOUR LIFE ISN'T BROKEN. IT'S JUST POORLY CODED.",
                    subheadline: "YOUR LIFE ISN'T BROKEN. IT'S JUST POORLY CODED.",
                    hook_image_prompt: "A complex clockwork machine made of gold and light, generating coins in a dark room.",
                    pain_story: "You have a bug in your decisional logic: while (data &lt; 100%) wait(); Since you will never have 100% of the data, you never execute. You just compile. You spend years theorizing about the perfect life while your actual life gathers dust. You aren't lazy. You are just compiled, but not deployed.",
                    agitation_bullets: [
                        "Draining your soul in a 9-5 just to pay rent.",
                        "Trying dropshipping/crypto and realizing it's all hype.",
                        "The fear that you'll never be free to just THINK."
                    ],
                    transition_mechanism: "HARDWARE INCOMPATIBILITY.",
                    product_name: "THE EXISTENCE PATCH 1.0",
                    product_description: "A complete guide to building 'No-Code' SaaS and digital assets that sell themselves via search intent, not social hype.",
                    features_bullets: [
                        "Logic Gate Decision Tree: Force a decision in 5 minutes via flowchart.",
                        "The \"Empathy\" API: Scripts for handling emotional humans.",
                        "The Routine Daemon: Automate hygiene/food to stay in your head."
                    ],
                    price_original: "$128",
                    price_discounted: "$32",
                    bonuses: [
                        { title: "The Introvert's Marketing Plan", description: "How to get traffic without posting a selfie.", value: "$59" }
                    ],
                    guarantee_text: "THE LOGIC  If you find a logical inconsistency in our framework, we refund you double.",
                    scarcity_text: "System capacity filling up.",
                    cta_text: "DEPLOY TO PRODUCTION"
                }
            }
        ]
    },
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
                title: "How to Build an Empire of One without Hiring Idiots in 30 Days",
                script: {
                    headline: "THE EMPIRE OF ONE",
                    subheadline: "// Gold for ENTJ How to Build a Scalable Enterprise without Hiring Idiots.",
                    hook_image_prompt: "A lone figure on a throne made of server racks overlooking a digital city.",
                    pain_story: "Here is the uncomfortable truth: The problem isn't that you can't find good people. The problem is that you are trying to solve a logic problem with a biological solution.",
                    agitation_bullets: [
                        "Humans are designed for empathy. You need efficiency.",
                        "Humans have variable output. You need constant uptime.",
                        "You are trying to force imperfect beings to act like perfect algorithms."
                    ],
                    transition_mechanism: "SHIFT FROM \"BUSINESS OWNER\" TO \"EMPIRE ARCHITECT\"",
                    product_name: "THE EMPIRE OF ONE PROTOCOL",
                    product_description: "A complete tech stack for the ruthless executor. Automate 90% of your business logic so you only make high-level decisions.",
                    features_bullets: [
                        "SALES AUTOPILOT: Pre-built workflows for Sales & Ops that replace 3 full-time employees.",
                        "COMMAND CENTER: No-Code Dashboard (Notion/Airtable) for God-Mode visibility.",
                        "AI CHIEF OF STAFF: LLM configurations for complex decision trees and strategy."
                    ],
                    price_original: "$497",
                    price_discounted: "$97",
                    bonuses: [
                        { title: "Fire Your Agency Guide", description: "How to bring marketing in-house with AI.", value: "$97" },
                        { title: "Ironclad Legal Templates", description: "Contracts that protect your throne.", value: "$197" }
                    ],
                    guarantee_text: "THE EFFICIENCY THEOREM  If you do not save at least 20 hours of manual labor per week within 30 days, we refund you. Binary outcome. No feelings.",
                    scarcity_text: "Price increases as we add more agents.",
                    cta_text: "DEPLOY THE STACK"
                }
            },
            {
                id: "execute-12-months",
                title: "How to Execute 12 Months of Work in 12 Weeks without Burnout",
                script: {
                    headline: "EXECUTE 12 MONTHS IN 12 WEEKS",
                    subheadline: "A Project Management Framework that treats Business like Warfare.",
                    hook_image_prompt: "A war room map with targets being eliminated in rapid succession.",
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
                title: "How to Outmaneuver Any Competitor without Lowering Your Prices",
                script: {
                    headline: "GRAND STRATEGY",
                    subheadline: "How to Outmaneuver Any Competitor Without Lowering Your Prices.",
                    hook_image_prompt: "A chessboard where the pieces are skyscrapers and brands.",
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
                title: "How to Command Any Room without saying a Word in 3 Seconds",
                script: {
                    headline: "COMMAND THE ROOM.",
                    subheadline: "Without saying a word. In 3 seconds.",
                    hook_image_prompt: "A silhouette in a boardroom casting a shadow that commands attention.",
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
                title: "How to Ensure Your Vision Survives without Micro-Managing in Perpetuity",
                script: {
                    headline: "THE DYNASTY ARCHITECTURE",
                    subheadline: "How to Ensure Your Vision Survives Without You.",
                    hook_image_prompt: "A statue made of light networks being built by automated drones.",
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
                title: "How to Systemize Your Entire Life without Losing Your Soul in 3 Days",
                script: {
                    headline: "Systemize Your Existence.",
                    subheadline: "A comprehensive Notion & AI template to manage your goals, habits, and knowledge.",
                    hook_image_prompt: "A vitruvian man overlaid with glowing circuit schematics.",
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
                        "import CommandDashboard from './Core'; // A single screen for health, health, wealth, and priorities.",
                        "import SecondBrain from './Knowledge'; // Capture pipeline -&gt; Permanent Notes."
                    ],
                    price_original: "$199",
                    price_discounted: "$49",
                    bonuses: [
                        { title: "Meal Prep Algorithms", description: "Nutrition solved mathematically.", value: "$19" }
                    ],
                    guarantee_text: "if (clarity &lt; current_levels) return refund();",
                    scarcity_text: "Version 2.0 launch price.",
                    cta_text: "&gt; INITIALIZE SYSTEM_"
                }
            },
            {
                id: "think-ahead",
                title: "How to Think 10 Steps Ahead of Everyone Else without Stress",
                script: {
                    headline: "FORECAST THE FUTURE.",
                    subheadline: "\"You aren't anxious. You are just simulating unoptimized realities.\"",
                    hook_image_prompt: "A hand moving a single piece on a 3D glass chessboard that ripples into the future.",
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
                    guarantee_text: "THE PREDICTION  Use one model on a current problem. If clarity is not instantaneous, we refund you.",
                    scarcity_text: "Limited strategic intake.",
                    cta_text: "ACCESS MODELS"
                }
            },
            {
                id: "rapid-competence",
                title: "How to Achieve Top 1% Competence in Any Field in 6 Months",
                script: {
                    headline: "TOP 1% COMPETENCE IN 6 MONTHS.",
                    subheadline: "TOP 1% COMPETENCE IN 6 MONTHS.",
                    hook_image_prompt: "A fractal pattern zooming in infinitely, revealing more complexity and order.",
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
                    guarantee_text: "THE PROFICIENCY  Follow the roadmap for 30 days. If you cannot demonstrate a measurable leap in competence, we refund you.",
                    scarcity_text: "Protocol active.",
                    cta_text: "START THE PROTOCOL"
                }
            },
            {
                id: "win-arguments",
                title: "How to Win Every Argument with Pure Logic without Raising Your Voice",
                script: {
                    headline: "WIN WITH PURE LOGIC.",
                    subheadline: "How to dismantle irrationality without raising your voice.",
                    hook_image_prompt: "A laser beam cutting through fog, revealing the path.",
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
                    guarantee_text: "THE CLARITY  If this toolkit doesn't help you de-escalate and win a conflict within 30 days, we refund you.",
                    scarcity_text: "Knowledge is power.",
                    cta_text: "ARM YOUR MIND"
                }
            },
            {
                id: "global-business",
                title: "How to run a Global Business from a Dark Room without Employees",
                script: {
                    headline: "RUN A GLOBAL BUSINESS FROM A DARK ROOM.",
                    subheadline: "Without employees. Without meetings. 100% Async.",
                    hook_image_prompt: "A single person controlling a global network of lights from a tablet.",
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
                    guarantee_text: "THE FREEDOM  If this course requires you to hire a single employee or take a single phone call, we refund you.",
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
                title: "How to Generate Million-Dollar Ideas on Demand without Writer's Block",
                script: {
                    headline: "MILLION DOLLAR IDEAS ON DEMAND.",
                    subheadline: "Writer's block is just a lack of chaos.",
                    hook_image_prompt: "A lightbulb exploding into a thousand butterflies made of neon light.",
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
                title: "How to Persuade Anyone of Anything (Even if You Don't Believe it)",
                script: {
                    headline: "REALITY IS NEGOTIABLE.",
                    subheadline: "How to Persuade Anyone of Anything. Even if you don't believe it.",
                    hook_image_prompt: "A warped reality mirror showing what the person wants to see.",
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
                title: "How to Thrive in Uncertainty when Everyone Else is Panicking",
                script: {
                    headline: "CHAOS IS A LADDER.",
                    subheadline: "How to Thrive in Uncertainty When Everyone Else is Panicking.",
                    hook_image_prompt: "A surfer riding a tidal wave of digital static and debris with a smile.",
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
                title: "How to Bypass 10 Years of Career Laddering in 6 Months",
                script: {
                    headline: "LEARN EVERYTHING FASTER BY BREAKING THE RULES.",
                    subheadline: "LEARN EVERYTHING FASTER BY BREAKING THE RULES.",
                    hook_image_prompt: "A person walking through a wall in a maze, leaving others behind.",
                    pain_story: "Manuals are for people who are afraid to break things. You learn by taking the machine apart. You don't need to read the textbook. You need to break the machine 50 times and Google the error messages. Your brain is a Reverse-Engineering Engine.",
                    agitation_bullets: [
                        "Waiting your turn.",
                        "Respecting authority that hasn't earned it.",
                        "The slow crawl of meritocracy."
                    ],
                    transition_mechanism: "YOU ARE LAZY.",
                    product_name: "THE SPEEDRUNNER'S CODEX",
                    product_description: "Unconventional strategies for rapid advancement.",
                    features_bullets: [
                        "Deconstruction Heuristic: Break skills into atomic parts.",
                        "Social Engineering Script: Get experts to teach you for free.",
                        "Immersion Hack: Passive learning environment setup."
                    ],
                    price_original: "$150",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Resume Hacking", description: "Beat the ATS.", value: "$29" }
                    ],
                    guarantee_text: "THE SHORTCUT  If it feels like work, you get a refund. It should feel like cheating.",
                    scarcity_text: "Exploit patching soon.",
                    cta_text: "UNLOCK CHEAT CODE"
                }
            },
            {
                id: "infinite-career",
                title: "How to Turn Your 17 Different Hobbies into One Income Stream",
                script: {
                    headline: "THE INFINITE CAREER.",
                    subheadline: "How to Be Everything by Committing to Nothing.",
                    hook_image_prompt: "A Swiss Army knife where every tool is made of gold.",
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
                    headline: "YOU CANNOT POUR FROM AN EMPTY CUP.",
                    subheadline: "YOU CANNOT POUR FROM AN EMPTY CUP.",
                    hook_image_prompt: "A figure meditating inside a glowing translucent forcefield while chaotic colors swirl outside.",
                    pain_story: "Your empathy is not a \"soft skill.\" It is a sensory input. And right now, your input gain is cranked to 11. You think being a \"Good Person\" means saying Yes. It doesn't. Being a Good Person means staying alive long enough to make a difference.",
                    agitation_bullets: [
                        "Compassion fatigue.",
                        "Inability to distinguish your feelings from others.",
                        "Being the 'therapist' for everyone but yourself."
                    ],
                    transition_mechanism: "THE SAVIOR COMPLEX.",
                    product_name: "THE GUARDIAN PROTOCOL",
                    product_description: "A guided visualization and psychological protocol to build an impenetrable boundary.",
                    features_bullets: [
                        "The \"Door Slam\" Alternative: Set boundaries before you explode.",
                        "The Energy Audit: Track which humans drain you.",
                        "The Vampire Guide: Identify and neutralize Narcissists."
                    ],
                    price_original: "$150",
                    price_discounted: "$44",
                    bonuses: [
                        { title: "Narcissist Repellent", description: "Spot energy vampires instantly.", value: "$29" }
                    ],
                    guarantee_text: "THE PEACE  If you don't feel 50% lighter in 14 days, we refund you. You deserve peace.",
                    scarcity_text: "Protect your energy now.",
                    cta_text: "SHIELD UP"
                }
            },
            {
                id: "counselor",
                title: "How to Turn Your Insight into a High-Ticket Coaching Business",
                script: {
                    headline: "YOU ARE NOT A REHABILITATION CENTER.",
                    subheadline: "YOU ARE NOT A REHABILITATION CENTER.",
                    hook_image_prompt: "A lantern illuminating a path through a dark forest.",
                    pain_story: "Why do you choose partners who need you? Because if they need you, they can't leave you. Being the \"Healer\" gives you power. It keeps you superior. You attract broken people because your ego needs a job.",
                    agitation_bullets: [
                        "Undercharging or working for free.",
                        "Feeling used.",
                        "Watching shallow 'coaches' make millions."
                    ],
                    transition_mechanism: "YOU ARE BORED BY PEACE.",
                    product_name: "THE RECIPROCITY CODE",
                    product_description: "How to package your deep wisdom into a high-end consulting offer.",
                    features_bullets: [
                        "The \"Fixer\" Detox: Stop offering unsolicited advice.",
                        "The Narcissist Radar: Spot \"Love Bombing\" instantly.",
                        "The Potential Funeral: Mourn the partner that doesn't exist."
                    ],
                    price_original: "$129",
                    price_discounted: "$39",
                    bonuses: [
                        { title: "The Intake Form", description: "Filter out low-vibration clients.", value: "$49" }
                    ],
                    guarantee_text: "THE MATCH  If you don't feel a shift in who you attract in 30 days, refund.",
                    scarcity_text: "Limited guidance.",
                    cta_text: "CLOSE THE CLINIC"
                }
            },
            {
                id: "sacred-calling",
                title: "How to Find the Career Your Soul Appoved Before You Were Born",
                script: {
                    headline: "THE SACRED CALLING.",
                    subheadline: "THE SACRED CALLING.",
                    hook_image_prompt: "A golden thread connecting a person's heart to a distant star.",
                    pain_story: "Deep down, you think Money is Evil. You equate poverty with purity. But a poor healer can only help those within walking distance. A wealthy healer can change the world. Money is not evil. It is an amplifier.",
                    agitation_bullets: [
                        "Sunday scaries.",
                        "Feeling like an alien in the office.",
                        "The fear of wasting your potential on spreadsheets."
                    ],
                    transition_mechanism: "YOU JUDGE SUCCESS.",
                    product_name: "THE SOUL-PRENEUR BLUEPRINT",
                    product_description: "A framework to identify careers that allow you to heal the world and get paid.",
                    features_bullets: [
                        "The Ikigai Compass: Intersection of \"What you love\" and \"What pays.\"",
                        "Non-Sleazy Sales: Offer your services as a gift, not a transaction.",
                        "Pricing Therapy: Charge what you are worth without vomiting."
                    ],
                    price_original: "$333",
                    price_discounted: "$111",
                    bonuses: [
                        { title: "Resignation Letter Template", description: "Leave with grace.", value: "$19" }
                    ],
                    guarantee_text: "THE KARMA  If you feel gross or out of alignment, full refund. We only want clean money.",
                    scarcity_text: "Mission awaiting.",
                    cta_text: "CLAIM YOUR ABUNDANCE"
                }
            },
            {
                id: "chameleon",
                title: "How to Change the World from Your Bedroom without Public Speaking",
                script: {
                    headline: "YOU ARE EVERYONE, EXCEPT YOURSELF.",
                    subheadline: "YOU ARE EVERYONE, EXCEPT YOURSELF.",
                    hook_image_prompt: "A drop of water hitting a pond and creating ripples that cover the ocean.",
                    pain_story: "You think: \"If I disagree, they won't like me.\" So you shrink. You blend. You have become a mirror that reflects everyone else's light but generates none of its own.",
                    agitation_bullets: [
                        "Fear of visibility.",
                        "Draining social battery.",
                        "Comparing yourself to loud creators."
                    ],
                    transition_mechanism: "YOU ARE MANIPULATIVE.",
                    product_name: "THE IDENTITY ANCHOR",
                    product_description: "How to build a movement using essays, books, and art.",
                    features_bullets: [
                        "The Mask Inventory: Identify the 5 characters you play and why.",
                        "The \"Disappointment\" Drill: Disappoint people on purpose. Survive it.",
                        "The Values Compass: Separate your beliefs from your parents'."
                    ],
                    price_original: "$199",
                    price_discounted: "$60",
                    bonuses: [
                        { title: "The 'Pen Name' Strategy", description: "Influence anonymously.", value: "$29" }
                    ],
                    guarantee_text: "THE AUTHENTICITY  If you don't feel a stronger sense of Self in 30 days, refund.",
                    scarcity_text: "The world needs you.",
                    cta_text: "FIND YOURSELF"
                }
            },
            {
                id: "intuition",
                title: "How to Manifest Reality using Neuroscience instead of Wishful Thinking",
                script: {
                    headline: "YOU KNEW IT WAS GOING TO HAPPEN.",
                    subheadline: "YOU KNEW IT WAS GOING TO HAPPEN.",
                    hook_image_prompt: "Brain synapses forming a galaxy.",
                    pain_story: "Most people live in the Present. They only believe what they can touch. You see Patterns. When you try to explain a Pattern to a \"Fact\" person, you sound insane. You have suppressed your superpower because you didn't have the data.",
                    agitation_bullets: [
                        "Vision boards that never come true.",
                        "Feeling 'crazy' for believing in magic.",
                        "Disconnect between your spiritual richness and material lack."
                    ],
                    transition_mechanism: "YOU WANT THE CRASH.",
                    product_name: "THE THIRD EYE TOOLKIT",
                    product_description: "A grounded approach to manifestation using psychology and focus.",
                    features_bullets: [
                        "The Translation Matrix: Explain a \"hunch\" without sounding crazy.",
                        "Anxiety vs Intuition: A somatic checklist to know the difference.",
                        "The Decision Engine: Make choices when Data says Left but Soul says Right."
                    ],
                    price_original: "$222",
                    price_discounted: "$77",
                    bonuses: [
                        { title: "Binaural Beats Collection", description: "Brainwave entrainment.", value: "$33" }
                    ],
                    guarantee_text: "THE \"I KNEW IT\"  Use the Anxiety vs. Intuition test. If it doesn't give you 100% clarity, we refund you.",
                    scarcity_text: "Portal open.",
                    cta_text: "OPEN YOUR EYES"
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
                title: "How to Make Money from Your Art without Selling Your Soul",
                script: {
                    headline: "THE WORLD DOESN'T NEED YOUR DREAMS. IT NEEDS YOUR ART.",
                    subheadline: "THE WORLD DOESN'T NEED YOUR DREAMS. IT NEEDS YOUR ART.",
                    hook_image_prompt: "A paintbrush painting a door in the air that opens to a treasure room.",
                    pain_story: "In your mind, the idea is a 10/10. When you write it, it drops to a 4/10. This breaks your heart. So you stop. You are addicted to the feeling of creativity, but allergic to the labor of it.",
                    agitation_bullets: [
                        "Starving artist syndrome.",
                        "The fear of being 'inauthentic'.",
                        "Hoarding your work because you fear judgment."
                    ],
                    transition_mechanism: "YOU ARE SELFISH.",
                    product_name: "THE DREAM-WEAVER'S LOOM",
                    product_description: "How to build a supportive audience on platforms like Patreon/Substack.",
                    features_bullets: [
                        "\"Shitty First Draft\" Ritual: Lower your standards to start.",
                        "The Gentle Deadline: Promises to yourself, not orders.",
                        "The Muse Trap: Capture fleeting ideas instantly."
                    ],
                    price_original: "$111",
                    price_discounted: "$33",
                    bonuses: [
                        { title: "Dealing with Criticism", description: "Emotional armor for artists.", value: "$25" }
                    ],
                    guarantee_text: "THE FLOW  If this feels like \"Hustle\" or stress, we refund you. It must feel like magic.",
                    scarcity_text: "Create freedom.",
                    cta_text: "START WEAVING"
                }
            },
            {
                id: "healers-journey",
                title: "How to Get Things Done when you Hate Structure and Discipline",
                script: {
                    headline: "YOUR PAIN WAS NOT AN ACCIDENT. IT WAS TRAINING.",
                    subheadline: "YOUR PAIN WAS NOT AN ACCIDENT. IT WAS TRAINING.",
                    hook_image_prompt: "A river flowing effortlessly around rocks to reach the ocean.",
                    pain_story: "You are sitting on your pain, ashamed of it. But your pain is the medicine someone else needs. If you survived the maze, you have the map. By hiding your scars, you are withholding the map from the lost.",
                    agitation_bullets: [
                        "Guilt over missed deadlines.",
                        "The 'lazy' label.",
                        "Starting 50 novels, finishing 0."
                    ],
                    transition_mechanism: "ADDICTED TO SADNESS.",
                    product_name: "THE KINTSUGI METHOD",
                    product_description: "A forgiving framework that accounts for your emotional fluctuations.",
                    features_bullets: [
                        "The \"Scar Inventory\": Map your trauma to your superpowers.",
                        "The Storyteller's Voice: Share pain without \"Trauma Dumping.\"",
                        "The Healer's Business: Get paid to help people survive what you did."
                    ],
                    price_original: "$250",
                    price_discounted: "$88",
                    bonuses: [
                        { title: "Dream Journaling", description: "Harvesting ideas from sleep.", value: "$15" }
                    ],
                    guarantee_text: "THE WHOLENESS  If you don't feel a shift from \"Broken\" to \"Beautiful\", full refund.",
                    scarcity_text: "Flow state waiting.",
                    cta_text: "MEND WITH GOLD"
                }
            },
            {
                id: "introvert-power",
                title: "How to Heal Yourself and Others through the Power of Story",
                script: {
                    headline: "YOU AREN'T SHY. YOU ARE SELECTIVE.",
                    subheadline: "YOU AREN'T SHY. YOU ARE SELECTIVE.",
                    hook_image_prompt: "An open book where the words turn into birds flying out.",
                    pain_story: "Your attention is Gold. Small talk is Plastic. Every time you force yourself to care about the weather, you are making a bad trade. You leave parties drained because you were ripped off. You gave away your soul and got nothing in return.",
                    agitation_bullets: [
                        "Writer's block caused by perfectionism.",
                        "Feeling misunderstood.",
                        "The loneliness of the vivid imagination."
                    ],
                    transition_mechanism: "YOU ARE A SNOB.",
                    product_name: "THE CAT IN THE DOG PARK",
                    product_description: "A course on writing fiction or memoir as therapy and art.",
                    features_bullets: [
                        "The \"Question\" Bank: 10 questions to cut through small talk instantly.",
                        "The \"Irish Exit\" Guide: How to leave gracefully at 0% battery.",
                        "Listener's Charisma: Use silence to make people love you."
                    ],
                    price_original: "$99",
                    price_discounted: "$29",
                    bonuses: [
                        { title: "Prompt Generator", description: "Never run out of ideas.", value: "$20" }
                    ],
                    guarantee_text: "THE BATTERY  If you don't feel 50% more social energy, full refund.",
                    scarcity_text: "The story ends soon.",
                    cta_text: "UNLEASH QUIET POWER"
                }
            },
            {
                id: "meaning",
                title: "How to Keep Your Heart Open in a Cynical World",
                script: {
                    headline: "YOU ARE HOMESICK FOR A PLACE THAT DOESN'T EXIST.",
                    subheadline: "YOU ARE HOMESICK FOR A PLACE THAT DOESN'T EXIST.",
                    hook_image_prompt: "A flower growing out of concrete, glowing with light.",
                    pain_story: "You think \"Purpose\" will arrive in a dream. So you wait. You drift. But the Universe doesn't hand out purposes. It hands out Raw Materials. Meaning is not found. It is built.",
                    agitation_bullets: [
                        "World-weariness.",
                        "Loss of innocence.",
                        "Despair paralysis."
                    ],
                    transition_mechanism: "YOU JUDGE \"NORMAL\" PEOPLE.",
                    product_name: "THE SOUL COMPASS",
                    product_description: "Philosophical and practical tools to engage with the world without losing your light.",
                    features_bullets: [
                        "The \"Anti-Career\" Guide: Find work that pays but doesn't kill your soul.",
                        "Sacred Rituals: Turn morning coffee into a religious experience.",
                        "The Tribe Signal: How to find other aliens."
                    ],
                    price_original: "$199",
                    price_discounted: "$55",
                    bonuses: [
                        { title: "Meditation for Sensitivity", description: "Calm the storm.", value: "$22" }
                    ],
                    guarantee_text: "THE DEPTH  If life doesn't feel 20% more meaningful in 2 weeks, refund.",
                    scarcity_text: "Light the dark.",
                    cta_text: "ACTIVATE COMPASS"
                }
            },
            {
                id: "resilience",
                title: "How to Access the Muse on Command without Waiting for Inspiration",
                script: {
                    headline: "YOU BLEED WHEN PEOPLE LOOK AT YOU WRONG.",
                    subheadline: "YOU BLEED WHEN PEOPLE LOOK AT YOU WRONG.",
                    hook_image_prompt: "A door in a library opening to a galaxy.",
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
