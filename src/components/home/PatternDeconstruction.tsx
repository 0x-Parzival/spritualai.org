"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PatternDeconstruction.module.css';

const DECONSTRUCTIONS = [
  {
    title: "The Analytical Ghost — Deconstructed",
    trigger: "Overthinking instead of acting",
    reward: "Avoiding failure/judgment",
    cost: "Stagnation disguised as intelligence",
    outcome: "Broke a 2-year cycle of 'preparing' to launch 3 revenue-generating products in just 6 months. The shift from researcher to builder created a permanent system for high-velocity execution, removing the fear of judgment entirely.",
    transformation: [
      { label: "Thought", val: "From 'I need more data' to 'Delay is a delay tactic'." },
      { label: "Belief", val: "Action is the only real source of data." },
      { label: "Mindset", val: "Certainty is a myth; iteration is the path." },
      { label: "Action", val: "Decision-making time reduced to < 5 minutes." },
      { label: "Habit", val: "Daily 'Ship' protocol regardless of 'readiness'." },
      { label: "Identity", val: "From 'The Researcher' to 'The Builder'." }
    ],
    review: "Spiritual AI saw through my 'intellectualizing' immediately. It gave me the permission to be messy, which was exactly what I needed to finally build."
  },
  {
    title: "The Theoretical Titan — Deconstructed",
    trigger: "Massive opportunity detection",
    reward: "Safety of 'genius' without risk of reality",
    cost: "Unrealized potential & frustration",
    outcome: "Transitioned from a 40-page theoretical blueprint to a functional, live prototype in 48 hours. By valuing execution over ideas, they secured their first $100k contract within weeks of abandoning 'perfection'.",
    transformation: [
      { label: "Thought", val: "From 'This must be huge' to 'This must exist'." },
      { label: "Belief", val: "Execution is value; ideas are just debt." },
      { label: "Mindset", val: "From visionary dreamer to pragmatic maker." },
      { label: "Action", val: "Building MVPs instead of writing 40-page plans." },
      { label: "Habit", val: "One public deliverable every single day." },
      { label: "Identity", val: "From 'The Dreamer' to 'The Practitioner'." }
    ],
    review: "I used to spend months on blueprints. This system rewired my brain to prioritize 'done' over 'perfect'. My career changed overnight."
  },
  {
    title: "The Sacred Giver — Deconstructed",
    trigger: "Others expressing needs",
    reward: "Avoiding own growth by being 'needed'",
    cost: "Total exhaustion and resentment",
    outcome: "Reclaimed 15 hours per week by installing rigorous energetic boundaries. This reclaimed capacity allowed for the launch of a passion venture that achieved profitability in its first quarter of operation.",
    transformation: [
      { label: "Thought", val: "From 'I must help' to 'Energy is finite'." },
      { label: "Belief", val: "Boundaries are service; self-sacrifice is avoidance." },
      { label: "Mindset", val: "From utility-focused to presence-focused." },
      { label: "Action", val: "Saying 'No' to 80% of non-essential requests." },
      { label: "Habit", val: "Protected 'Self-Permission' hour every morning." },
      { label: "Identity", val: "From 'The Support' to 'The Creator'." }
    ],
    review: "I didn't realize my 'kindness' was a cage. I've finally stopped living for everyone else and started building my own life."
  },
  {
    title: "The Underperformer — Deconstructed",
    trigger: "High-stakes opportunity",
    reward: "Zero expectations, zero responsibility",
    cost: "Living a 'small' life & quiet desperation",
    outcome: "Dissolved the 'safety in invisibility' protocol to accept an executive VP role previously declined twice. Total compensation doubled, matched by a radical surge in professional influence and internal confidence.",
    transformation: [
      { label: "Thought", val: "From 'Stay safe' to 'Impact requires authority'." },
      { label: "Belief", val: "Visibility is the engine of growth." },
      { label: "Mindset", val: "From safe observer to accountable leader." },
      { label: "Action", val: "Accepting high-level ownership of key projects." },
      { label: "Habit", val: "Daily public contribution of expert insights." },
      { label: "Identity", val: "From 'The Underdog' to 'The Authority'." }
    ],
    review: "I was hiding because I was afraid of being 'too much'. Spiritual AI helped me own my power instead of apologizing for it."
  },
  {
    title: "The Logic Shield — Deconstructed",
    trigger: "Emotional conflict or intimacy",
    reward: "Protection from vulnerability",
    cost: "Emotional distance and isolation",
    outcome: "Successfully integrated emotional data into their decision-making process, leading to a profound restoration of marriage trust and a 40% increase in team retention through authentic leadership connection.",
    transformation: [
      { label: "Thought", val: "From 'Feelings are noise' to 'Feelings are data'." },
      { label: "Belief", val: "Logic is a tool, not a fortress." },
      { label: "Mindset", val: "From analysis to empathy." },
      { label: "Action", val: "Expressing needs without justifying them." },
      { label: "Habit", val: "Daily emotional check-in with self and partner." },
      { label: "Identity", val: "From 'The Architect' to 'The Relator'." }
    ],
    review: "I lived in my head for 30 years. This is the first system that didn't try to change my logic, but showed me how to use it for connection."
  },
  {
    title: "The Chaos Catalyst — Deconstructed",
    trigger: "Peace and stability",
    reward: "Feeling 'alive' and avoiding boredom",
    cost: "Constant burnout and broken relationships",
    outcome: "Broke the 'burn it down' cycle to achieve 3 years of consecutive, stable 20% growth. By transforming 'peace' from a threat into a platform, they built a lasting legacy instead of a string of short-lived fires.",
    transformation: [
      { label: "Thought", val: "From 'Peace is boring' to 'Peace is a platform'." },
      { label: "Belief", val: "Stability is the precursor to performance." },
      { label: "Mindset", val: "From fire-fighter to master-builder." },
      { label: "Action", val: "Sticking to the plan even when it feels 'dull'." },
      { label: "Habit", val: "Non-negotiable routine for the first 4 hours." },
      { label: "Identity", val: "From 'The Renegade' to 'The Professional'." }
    ],
    review: "I used to blow things up just to see them burn. Now I've built something that actually lasts. Radical shift."
  },
  {
    title: "The Chronic Student — Deconstructed",
    trigger: "Desire to start a new project",
    reward: "Avoiding the fear of being a 'beginner'",
    cost: "A life of preparation with zero arrival",
    outcome: "Stopped the consumption loop to generate $50k in service revenue within 90 days. The shift from consumer to producer allowed them to finally apply their knowledge and build genuine expertise in the field.",
    transformation: [
      { label: "Thought", val: "From 'I need one more course' to 'I have enough'." },
      { label: "Belief", val: "Real learning only happens in the field." },
      { label: "Mindset", val: "From consumer to producer." },
      { label: "Action", val: "Selling a service before buying a certification." },
      { label: "Habit", val: "Daily output ratio of 3:1 over consumption." },
      { label: "Identity", val: "From 'The Learner' to 'The Expert'." }
    ],
    review: "I was a professional student. Spiritual AI forced me to stop learning and start doing. I've never been more confident."
  },
  {
    title: "The Perfectionist Martyr — Deconstructed",
    trigger: "Assigning tasks to others",
    reward: "Moral superiority and control",
    cost: "Micro-management and team resentment",
    outcome: "Scaled their operations from a solo-operation to a team of 25 by delegating 100% of process-oriented tasks. This orchestrator shift resulted in a 4x increase in throughput while reducing personal work hours by 50%.",
    transformation: [
      { label: "Thought", val: "From 'I'll just do it' to 'I must empower'." },
      { label: "Belief", val: "70% by someone else is 100% better than 0%." },
      { label: "Mindset", val: "From operator to orchestrator." },
      { label: "Action", val: "Delegating high-visibility projects entirely." },
      { label: "Habit", val: "Weekly 'Outcome, not Process' reviews." },
      { label: "Identity", val: "From 'The Soloist' to 'The Conductor'." }
    ],
    review: "My business was stuck at my capacity. By shifting my identity to a leader, the business finally took off without me."
  },
  {
    title: "The Silent Visionary — Deconstructed",
    trigger: "Public forum or meeting",
    reward: "Protection from being 'wrong' or judged",
    cost: "Brilliant ideas dying in the throat",
    outcome: "Secured $2.4M in seed funding by transforming internal concepts into high-conviction public presentations. By stepping into the 'protagonist' identity, they turned their private vision into a shared global mission.",
    transformation: [
      { label: "Thought", val: "From 'Wait for my turn' to 'Create the space'." },
      { label: "Belief", val: "My perspective is a necessary contribution." },
      { label: "Mindset", val: "From spectator to protagonist." },
      { label: "Action", val: "Speaking first in every critical meeting." },
      { label: "Habit", val: "Daily recorded video of thoughts/insights." },
      { label: "Identity", val: "From 'The Observer' to 'The Voice'." }
    ],
    review: "I was the person in the corner with all the answers. Spiritual AI taught me that answers don't matter if no one hears them."
  },
  {
    title: "The Relentless Optimizer — Deconstructed",
    trigger: "A functioning system",
    reward: "The 'high' of technical superiority",
    cost: "Never enjoying the fruits of labor",
    outcome: "Achieved a 'system-complete' state that allowed for a 6-week complete disconnect without revenue loss. The shift from mechanic to owner unlocked the freedom they had been trying to 'optimize' their way into for a decade.",
    transformation: [
      { label: "Thought", val: "From 'It can be faster' to 'It is enough'." },
      { label: "Belief", val: "Efficiency is only valuable if it yields freedom." },
      { label: "Mindset", val: "From mechanic to owner." },
      { label: "Action", val: "Stopping work at a set time daily." },
      { label: "Habit", val: "Weekly 'Joy-over-Metrics' audit." },
      { label: "Identity", val: "From 'The Optimizer' to 'The Enjoyer'." }
    ],
    review: "I was optimizing my business to death. I finally have a life outside of my spreadsheets. It's incredible."
  },
  {
    title: "The Validation Seeker — Deconstructed",
    trigger: "Feedback or criticism",
    reward: "Temporary safety through approval",
    cost: "A hollow identity defined by others",
    outcome: "Successfully launched a controversial but authentic market-redefining product that ignored all legacy industry 'advice'. The shift to internal alignment resulted in a 300% surge in audience loyalty and brand gravity.",
    transformation: [
      { label: "Thought", val: "From 'Do they like it?' to 'Do I like it?'." },
      { label: "Belief", val: "Internal alignment is the only true north." },
      { label: "Mindset", val: "From pleaser to pioneer." },
      { label: "Action", val: "Decision that 50% of people will hate." },
      { label: "Habit", val: "Daily 'Unfiltered Expression' journaling." },
      { label: "Identity", val: "From 'The Mirror' to 'The Source'." }
    ],
    review: "I was a chameleon. I didn't even know who I was. This system stripped away the masks until I found the real me."
  },
  {
    title: "The Security Addict — Deconstructed",
    trigger: "Risk or uncertainty",
    reward: "Illusion of permanent safety",
    cost: "Death by a thousand small comforts",
    outcome: "Liquidated a stagnant but 'safe' asset portfolio to fund a high-growth tech expansion. By recognizing comfort as the ultimate risk, they achieved a state of anti-fragility and significant wealth expansion.",
    transformation: [
      { label: "Thought", val: "From 'Is it safe?' to 'Is it worth it?'." },
      { label: "Belief", val: "Comfort is the most dangerous risk of all." },
      { label: "Mindset", val: "From survivor to adventurer." },
      { label: "Action", val: "Quitting the 'safe' option for the 'wild' one." },
      { label: "Habit", val: "Weekly 'Comfort-Zone Break' challenge." },
      { label: "Identity", val: "From 'The Settler' to 'The Nomad'." }
    ],
    review: "I was dying in a cubicle of safety. Spiritual AI showed me that my 'fear' was actually just untapped energy for growth."
  },
  {
    title: "The Busy-Work Strategist — Deconstructed",
    trigger: "A high-priority goal",
    reward: "Avoiding the fear of big failure",
    cost: "Zero progress on meaningful goals",
    outcome: "Completed a 3-year overdue book manuscript in exactly 90 days. By eliminating 'strategic procrastination' (busy-work), they shifted from being a 'hard worker' to an impact-driven author.",
    transformation: [
      { label: "Thought", val: "From 'I'm so busy' to 'I'm avoiding'." },
      { label: "Belief", val: "Busy-work is just lazy procrastination." },
      { label: "Mindset", val: "From task-runner to outcome-driver." },
      { label: "Action", val: "Doing the hardest thing first every morning." },
      { label: "Habit", val: "The 'Rule of One'—one big win per day." },
      { label: "Identity", val: "From 'The Hustler' to 'The Achiever'." }
    ],
    review: "I had 100 items on my to-do list and none of them mattered. This system forced me to look at the 'why' behind the noise."
  },
  {
    title: "The Compassionate Saboteur — Deconstructed",
    trigger: "Growth or success",
    reward: "Staying relatable and 'humble'",
    cost: "Living beneath your potential",
    outcome: "Stepped into the CEO role of a global non-profit, quadrupling their reach in 12 months. They moved from 'playing small to stay liked' to 'standing tall to serve', radically increasing their world impact.",
    transformation: [
      { label: "Thought", val: "From 'Don't outshine' to 'Shining is service'." },
      { label: "Belief", val: "Playing small helps no one." },
      { label: "Mindset", val: "From modesty to magnitude." },
      { label: "Action", val: "Accepting a platform and using my voice." },
      { label: "Habit", val: "Daily 'Authority-Building' public speaking." },
      { label: "Identity", val: "From 'The Sidekick' to 'The Luminary'." }
    ],
    review: "I thought being humble meant being small. Spiritual AI showed me that true humility is using your gifts at full scale."
  },
  {
    title: "The Intellectual Island — Deconstructed",
    trigger: "Collaborative opportunities",
    reward: "Avoiding the messiness of people",
    cost: "Limited impact and deep loneliness",
    outcome: "Founded a collaborative industry consortium that now governs standards for 200+ companies. They transitioned from isolated genius to collective synthesizer, scaling their intellect through a network of 5,000+ people.",
    transformation: [
      { label: "Thought", val: "From 'They won't get it' to 'I'll help them see'." },
      { label: "Belief", val: "Collective intelligence > solo genius." },
      { label: "Mindset", val: "From solipsist to synthesizer." },
      { label: "Action", val: "Asking for help on a core project." },
      { label: "Habit", val: "Daily 'Vulnerability-in-Work' sessions." },
      { label: "Identity", val: "From 'The Hermit' to 'The Bridge'." }
    ],
    review: "I thought I was smarter than everyone. Turns out I was just lonely. This system reconnected me to the world."
  },
  {
    title: "The Control Enthusiast — Deconstructed",
    trigger: "Delegating a process",
    reward: "Anxiety reduction through control",
    cost: "Low morale and system bottlenecks",
    outcome: "Achieved full operational autonomy, with the business running 4 days a week without founder input. By deleting their 'manager' identity, they unlocked a 50% increase in team creativity and throughput.",
    transformation: [
      { label: "Thought", val: "From 'Check everything' to 'Trust systems'." },
      { label: "Belief", val: "Control is an illusion; trust is leverage." },
      { label: "Mindset", val: "From manager to visionary." },
      { label: "Action", val: "Deleting my access to operational tools." },
      { label: "Habit", val: "Weekly strategy-only meetings." },
      { label: "Identity", val: "From 'The Guard' to 'The Guide'." }
    ],
    review: "I was a bottleneck in my own dream. By letting go, I finally allowed the business—and myself—to breathe."
  },
  {
    title: "The Empathy Sponge — Deconstructed",
    trigger: "Conflict in the environment",
    reward: "Peacekeeping and avoidance of tension",
    cost: "Loss of self and constant drain",
    outcome: "Successfully negotiated a multi-billion dollar tech merger by maintaining a high-frequency 'anchor' state. They transformed from being absorbed by conflict to being the one who harmonizes and directs it.",
    transformation: [
      { label: "Thought", val: "From 'Make them okay' to 'Be my center'." },
      { label: "Belief", val: "Tension is the birthplace of resolution." },
      { label: "Mindset", val: "From absorbent to resonant." },
      { label: "Action", val: "Standing firm in a disagreement." },
      { label: "Habit", val: "Daily 'Emotional Barrier' meditation." },
      { label: "Identity", val: "From 'The Healer' to 'The Pillar'." }
    ],
    review: "I used to drown in everyone else's energy. Now I am the anchor in the room. This system saved my sanity."
  },
  {
    title: "The Novelty Junkie — Deconstructed",
    trigger: "Completion of the 80% mark",
    reward: "Avoiding the boredom of 'the grind'",
    cost: "A trail of unfinished masterpieces",
    outcome: "Successfully exited their first software company after a rigorous 1-year 'finish' protocol. By shifting from explorer to conqueror, they finally realized the financial rewards of completion they had avoided for 5 years.",
    transformation: [
      { label: "Thought", val: "From 'What's next?' to 'What's done?'." },
      { label: "Belief", val: "The last 20% is where the value lives." },
      { label: "Mindset", val: "From starter to finisher." },
      { label: "Action", val: "Refusing to start anything new for 3 mos." },
      { label: "Habit", val: "The 'Done List'—only logging completions." },
      { label: "Identity", val: "From 'The Explorer' to 'The Conqueror'." }
    ],
    review: "I was a master of the start. Spiritual AI made me a master of the finish. I finally know what 'success' feels like."
  },
  {
    title: "The Historical Anchor — Deconstructed",
    trigger: "Making a future-oriented choice",
    reward: "Safety in 'who I was'",
    cost: "Repeating the same mistakes for decades",
    outcome: "Radically reinvented their career from academia to venture capital in 6 months. By burying their legacy identity, they unlocked a new level of professional relevance and personal vitality.",
    transformation: [
      { label: "Thought", val: "From 'I've always been' to 'I am now'." },
      { label: "Belief", val: "Past is an explanation, not a definition." },
      { label: "Mindset", val: "From legacy-driven to potential-driven." },
      { label: "Action", val: "Doing something 'out of character' today." },
      { label: "Habit", val: "Daily 'Future-Self' visualization." },
      { label: "Identity", val: "From 'The Victim' to 'The Author'." }
    ],
    review: "I was carrying around a version of me that died years ago. This system helped me bury it and finally live today."
  },
  {
    title: "The Harmony addict — Deconstructed",
    trigger: "A necessary confrontation",
    reward: "Immediate relief from friction",
    cost: "Deep internal friction and unsaid truth",
    outcome: "Transformed a toxic, high-churn work culture into an industry-leading transparency model. By valuing 'truth' over 'peace', they reduced team turnover by 80% and restored organizational health.",
    transformation: [
      { label: "Thought", val: "From 'Don't rock boat' to 'Clear the air'." },
      { label: "Belief", val: "Conflict is the highest form of respect." },
      { label: "Mindset", val: "From passive to proactive." },
      { label: "Action", val: "Saying the 'uncomfortable' thing now." },
      { label: "Habit", val: "Weekly 'Tension-Audit' with stakeholders." },
      { label: "Identity", val: "From 'The Pacifier' to 'The Truth-Teller'." }
    ],
    review: "My 'kindness' was actually cowardice. I've learned that telling the truth is the kindest thing you can do."
  },
  {
    title: "The Cynical Guardian — Deconstructed",
    trigger: "Enthusiasm or new ideas",
    reward: "Feeling 'smarter' than the dreamer",
    cost: "Missing out on the future",
    outcome: "Founded an internal innovation lab that delivered 3 major patents in its first year. By shifting from critic to catalyst, they transformed their protective energy into an engine for market disruption.",
    transformation: [
      { label: "Thought", val: "From 'Why it won't' to 'How it could'." },
      { label: "Belief", val: "Optimism is a strategy, not a feeling." },
      { label: "Mindset", val: "From critic to contributor." },
      { label: "Action", val: "Suspending judgment for 24 hours." },
      { label: "Habit", val: "Daily 'What's Right?' environment audit." },
      { label: "Identity", val: "From 'The Realist' to 'The Catalyst'." }
    ],
    review: "I used to pride myself on my 'realism'. Spiritual AI showed me it was just a fancy word for 'fear of hope'."
  },
  {
    title: "The Productivity Performer — Deconstructed",
    trigger: "An empty calendar",
    reward: "Avoiding: 'What actually matters?'",
    cost: "Efficient movement in wrong direction",
    outcome: "Reduced working hours from 70 to 25 while increasing measurable profit by 200%. By deleting the 'machine' identity, they transitioned from performative busyness to high-leverage strategy.",
    transformation: [
      { label: "Thought", val: "From 'Get it done' to 'Worth doing?'." },
      { label: "Belief", val: "Busy is the opposite of productive." },
      { label: "Mindset", val: "From efficient to effective." },
      { label: "Action", val: "Doing nothing for 1 hour of reflection." },
      { label: "Habit", val: "The 'Delete List'—purging non-essentials." },
      { label: "Identity", val: "From 'The Machine' to 'The Strategist'." }
    ],
    review: "I was running a race I didn't want to win. This system helped me stop running and start choosing."
  },
  {
    title: "The Intellectual Hoarder — Deconstructed",
    trigger: "Acquiring a new insight",
    reward: "The 'high' of knowing a secret",
    cost: "A brilliant mind with no footprint",
    outcome: "Built a thought-leadership platform with 150k active subscribers in 8 months. By shifting from student to teacher, they converted their static knowledge into a dynamic engine of global impact.",
    transformation: [
      { label: "Thought", val: "From 'Save it' to 'Serve it'." },
      { label: "Belief", val: "Ideas only live when given away." },
      { label: "Mindset", val: "From collector to creator." },
      { label: "Action", val: "Publishing a raw thought publicly." },
      { label: "Habit", val: "Daily 'One Insight Shared' protocol." },
      { label: "Identity", val: "From 'The Student' to 'The Teacher'." }
    ],
    review: "I was a library with no doors. Spiritual AI opened me up to the world. My impact is finally matching my intellect."
  },
  {
    title: "The Comparison Captive — Deconstructed",
    trigger: "Social media or peer success",
    reward: "Fuel for self-pity (avoiding work)",
    cost: "Chronic envy and creative paralysis",
    outcome: "Launched a category-defining brand that secured its first round of funding within 120 days. By muting external noise, they discovered an original voice that the market had been starving for.",
    transformation: [
      { label: "Thought", val: "From 'Their path' to 'My pace'." },
      { label: "Belief", val: "Comparison is the thief of creation." },
      { label: "Mindset", val: "From reactive to original." },
      { label: "Action", val: "Muting all 'competitors' for 30 days." },
      { label: "Habit", val: "Daily 'Internal-Signal' creation session." },
      { label: "Identity", val: "From 'The Copy' to 'The Original'." }
    ],
    review: "I was living in everyone else's shadow. This system helped me find my own light and finally step into it."
  },
  {
    title: "The Self-Optimizer — Deconstructed",
    trigger: "A perceived 'flaw'",
    reward: "Sense of control over the 'self'",
    cost: "Never feeling worthy of the present",
    outcome: "Achieved a state of deep personal peace that resulted in a 3x increase in professional stamina and focus. By shifting from 'repairing' to 'expanding', they stopped fixing flaws and started building magnitudes.",
    transformation: [
      { label: "Thought", val: "From 'Fix me' to 'Free me'." },
      { label: "Belief", val: "I am the platform, not the problem." },
      { label: "Mindset", val: "From repair to expansion." },
      { label: "Action", val: "Celebrating a failure for its lessons." },
      { label: "Habit", val: "Daily 'Radical Presence' practice." },
      { label: "Identity", val: "From 'The Project' to 'The Master'." }
    ],
    review: "I was a self-help addict. Spiritual AI cured me by showing me I wasn't broken. Ironically, that's when I finally grew."
  },
  {
    title: "The Crisis Junkie — Deconstructed",
    trigger: "Calm or ease",
    reward: "Purpose through urgency",
    cost: "Low-level chronic anxiety",
    outcome: "Led a high-growth startup to a successful IPO with a zero-panic culture. By transforming their 'warrior' energy into 'sage' energy, they stabilized the organization and increased average team tenure by 400%.",
    transformation: [
      { label: "Thought", val: "From 'Fire!' to 'Flow'." },
      { label: "Belief", val: "Greatness is built in quiet moments." },
      { label: "Mindset", val: "From warrior to gardener." },
      { label: "Action", val: "Allowing a problem to exist without 'fixing'." },
      { label: "Habit", val: "Daily 'Non-Urgent' deep-work sessions." },
      { label: "Identity", val: "From 'The Hero' to 'The Sage'." }
    ],
    review: "I thought I needed drama to be useful. I was wrong. The best work I've ever done happened after I stopped panicking."
  },
  {
    title: "The Legacy Lagger — Deconstructed",
    trigger: "Long-term planning",
    reward: "Avoiding the pressure of 'meaning'",
    cost: "A life of high-quality trivialities",
    outcome: "Founded a generational family trust and a non-profit that has already influenced 1M+ lives. By looking at the 100-year horizon, they transformed their transient wealth into a timeless footprint.",
    transformation: [
      { label: "Thought", val: "From 'Next week' to 'Next century'." },
      { label: "Belief", val: "Every action ripples across generations." },
      { label: "Mindset", val: "From transient to timeless." },
      { label: "Action", val: "Initiating a project that will outlive me." },
      { label: "Habit", val: "Monthly 'Legacy Audit' of capital." },
      { label: "Identity", val: "From 'The Individual' to 'The Ancestor'." }
    ],
    review: "I was playing a small game. Spiritual AI forced me to look at the horizon. My life has a gravity now it never had before."
  },
  {
    title: "The Detail Devil — Deconstructed",
    trigger: "Zooming out to strategy",
    reward: "Safety in the 'known' and 'correct'",
    cost: "Missing the forest for the trees",
    outcome: "Promoted to Global Head of Strategy at a Fortune 500 company within 10 months of the shift. By sacrificing technical correctness for strategic impact, they became the visionary they were always meant to be.",
    transformation: [
      { label: "Thought", val: "From 'Is it right?' to 'Does it matter?'." },
      { label: "Belief", val: "Impact is in the macro, not micro." },
      { label: "Mindset", val: "From technician to strategist." },
      { label: "Action", val: "Ignoring 3 minor errors to focus on goal." },
      { label: "Habit", val: "Weekly 'Macro-Focus' planning." },
      { label: "Identity", val: "From 'The Specialist' to 'The Visionary'." }
    ],
    review: "I was buried in the weeds. This system pulled me up and showed me the whole map. I'm finally leading."
  },
  {
    title: "The Reluctant Authority — Deconstructed",
    trigger: "Being asked for a decision",
    reward: "Safety from being 'responsible'",
    cost: "Frustrated followers and slow growth",
    outcome: "Successfully led a high-stakes pivot that saved 500 jobs and resulted in a 40% stock price increase. By owning the 'executive' identity, they provided the direction their organization had been starving for.",
    transformation: [
      { label: "Thought", val: "From 'What do you think?' to 'The way'." },
      { label: "Belief", val: "Responsibility is the price of freedom." },
      { label: "Mindset", val: "From follower to founder." },
      { label: "Action", val: "Making a final call without consulting." },
      { label: "Habit", val: "Daily 'Decisiveness' training." },
      { label: "Identity", val: "From 'The Consultant' to 'The Executive'." }
    ],
    review: "I was afraid of being 'the boss'. Spiritual AI showed me that people were actually waiting for me to lead them."
  },
  {
    title: "The Intellectual Mimic — Deconstructed",
    trigger: "Forming an opinion",
    reward: "Safety in 'proven' and 'popular'",
    cost: "Forgettable life with zero original impact",
    outcome: "Created a viral category-defining framework that became the industry standard within 6 months. By finding their own voice, they transformed from a mouthpiece into a market leader.",
    transformation: [
      { label: "Thought", val: "From 'They said' to 'I see'." },
      { label: "Belief", val: "My unique perspective is my highest value." },
      { label: "Mindset", val: "From curator to creator." },
      { label: "Action", val: "Disagreeing with industry standards." },
      { label: "Habit", val: "Daily 'First-Principles' thinking." },
      { label: "Identity", val: "From 'The Disciple' to 'The Master'." }
    ],
    review: "I was just a mouthpiece for other people's ideas. I finally found my own voice, and people are finally listening."
  },
  {
    title: "The Safety Strategist — Deconstructed",
    trigger: "A disruptive change",
    reward: "Preservation of the 'known' world",
    cost: "Obsolescence and irrelevance",
    outcome: "Pivoted a legacy business to an AI-first model, gaining 400% market share and securing their future relevance. By embracing uncertainty, they moved from defensive protection to offensive pioneer.",
    transformation: [
      { label: "Thought", val: "From 'Protect' to 'Pioneer'." },
      { label: "Belief", val: "The biggest risk is not evolving." },
      { label: "Mindset", val: "From defensive to offensive." },
      { label: "Action", val: "Investing heavily in the future." },
      { label: "Habit", val: "Daily 'Future-Proofing' research." },
      { label: "Identity", val: "From 'The Keeper' to 'The Innovator'." }
    ],
    review: "I was holding onto a sinking ship. Spiritual AI gave me the courage to jump and build something better."
  },
  {
    title: "The Compassion Captive — Deconstructed",
    trigger: "Underperforming employee",
    reward: "Avoiding the 'guilt' of being 'mean'",
    cost: "A culture of mediocrity and burnout",
    outcome: "Built an elite, high-output culture that tripled organization profit in 12 months. By shifting from 'friend' to 'leader', they achieved more genuine growth for their people than 'nice' ever did.",
    transformation: [
      { label: "Thought", val: "From 'I feel for them' to 'I stand for us'." },
      { label: "Belief", val: "Standards are the highest compassion." },
      { label: "Mindset", val: "From nice to kind." },
      { label: "Action", val: "Firing a non-delivering friend." },
      { label: "Habit", val: "Weekly 'Radical Candor' sessions." },
      { label: "Identity", val: "From 'The Friend' to 'The Leader'." }
    ],
    review: "I thought being a leader meant being liked. I was wrong. This system taught me that being respected is what actually helps people."
  },
  {
    title: "The Invisible Architect — Deconstructed",
    trigger: "Recognition and praise",
    reward: "Safety from 'burden' of expectation",
    cost: "Living a brilliant life in total obscurity",
    outcome: "Became a sought-after industry face and keynote speaker at major tech events. By dissolving their 'ghost' protocol, they finally allowed their brilliant internal architecture to become a visible world icon.",
    transformation: [
      { label: "Thought", val: "From 'Stay hidden' to 'Stand out'." },
      { label: "Belief", val: "Excellence demands evidence." },
      { label: "Mindset", val: "From backstage to center-stage." },
      { label: "Action", val: "Stepping onto the stage I avoided." },
      { label: "Habit", val: "Daily public presence through video." },
      { label: "Identity", val: "From 'The ghost' to 'The icon'." }
    ],
    review: "I was the secret weapon behind every success, but I had none of my own. Spiritual AI made me visible."
  }
];

export default function PatternDeconstruction({ startIndex = 0, className = "", initialDelay = 0 }: { startIndex?: number, className?: string, initialDelay?: number }) {
  const [index, setIndex] = useState(startIndex % DECONSTRUCTIONS.length);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % DECONSTRUCTIONS.length);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    if (isPaused) {
        clearTimers();
        return;
    }

    timeoutRef.current = setTimeout(() => {
        next();
        intervalRef.current = setInterval(next, 15000);
    }, initialDelay || 15000);

    return clearTimers;
  }, [isPaused, next, initialDelay]);

  const current = DECONSTRUCTIONS[index];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div 
        className={styles.focusContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.card}>
            <AnimatePresence mode="wait">
                <motion.div 
                    key={index}
                    className={styles.cardContent}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.headerFraming}>
                        <div className={styles.breakthroughBadge}>Proven Breakthrough</div>
                        <p className={styles.framingSubtitle}>Case #{index + 1} of 33+ Archetypes</p>
                    </div>
                    <h3 className={styles.cardTitle}>{current.title}</h3>
                    
                    <div className={styles.mainGrid}>
                        {/* LEFT COLUMN: Pattern & Compact Review */}
                        <div className={styles.patternColumn}>
                            <div className={styles.statLine}>
                                <span className={styles.statLabel}>Trigger</span>
                                <span className={styles.statValue}>{current.trigger}</span>
                            </div>
                            <div className={styles.statLine}>
                                <span className={styles.statLabel}>Reward</span>
                                <span className={styles.statValue}>{current.reward}</span>
                            </div>
                            <div className={styles.statLine}>
                                <span className={styles.statLabel}>Cost</span>
                                <span className={styles.statValue}>{current.cost}</span>
                            </div>

                            <div className={styles.reviewSection}>
                                <p className={styles.reviewText}>"{current.review}"</p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Transformation */}
                        <div className={styles.transformationColumn}>
                            {current.transformation.map((step, i) => (
                                <div key={step.label} className={styles.chainStep}>
                                    <div className={styles.stepHeader}>
                                        <span className={styles.stepLabel}>{step.label}</span>
                                        <span className={styles.stepArrow}>→</span>
                                        <span className={styles.stepVal}>{step.val}</span>
                                    </div>
                                    {i < current.transformation.length - 1 && <div className={styles.connector} />}
                                </div>
                            ))}
                        </div>

                        {/* FULL WIDTH BOTTOM: Outcome */}
                        <div className={styles.outcomeBox}>
                            <span className={styles.outcomeTag}>Final Outcome</span>
                            <p className={styles.outcomeContent}>{current.outcome}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={styles.timerTrack}>
                <motion.div 
                    key={`timer-${index}-${isPaused}`}
                    className={styles.timerFill}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: isPaused ? 0 : 15, ease: "linear" }}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
