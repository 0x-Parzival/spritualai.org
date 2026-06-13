// SEO content data for all 16 MBTI type pages
// Each section targets specific problem-keyword searches

export type MBTIContent = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    headline: string;
    subheadline: string;
    archetypeQuote: string;
  };
  problemSections: { h2: string; content: string }[];
  shadowSection: {
    h2: string;
    pattern: string;
    rootCause: string;
    triggers: string[];
    content: string;
  };
  solutionSection: { h2: string; spiritualPath: string; content: string };
  relationshipSection: { h2: string; content: string };
  careerSection: { h2: string; content: string };
  faqs: { question: string; answer: string }[];
  cta: { headline: string; subtext: string; buttonText: string };
  relatedTypes: string[];
};

export const MBTI_CONTENT: Record<string, MBTIContent> = {
  INFP: {
    meta: {
      title: "The INFP Shadow Pattern — Why You Disappear When People Need You Most",
      description: "INFP personality type struggles with people-pleasing, identity confusion, and emotional burnout. Discover why generic self-help fails the INFP mind.",
      keywords: ["INFP personality", "INFP shadow pattern", "why do I self sabotage INFP", "INFP people pleasing", "INFP emotional burnout"],
    },
    hero: {
      headline: "The INFP Shadow Pattern: Why You Disappear When People Need You Most",
      subheadline: "You feel everything. You absorb everyone's pain. And then you vanish — not because you don't care, but because caring has become the thing that destroys you.",
      archetypeQuote: "The one who feels everything — and hides it perfectly.",
    },
    problemSections: [
      {
        h2: "Why Generic Self-Help Makes INFPs Worse",
        content: `If you're an INFP, you've probably read dozens of self-help books, tried meditation apps, journaled every morning, and still feel like you're drowning. Here's why: most self-help is built for action-oriented, externally motivated minds. It tells you to "just do it," "take massive action," "stop overthinking."\n\nFor the INFP, this advice is not just unhelpful — it's actively harmful. Your mind doesn't work through action-first processing. You work through meaning-first processing. You need to understand WHY something matters before you can commit to it. When you force yourself into action frameworks designed for ESTJs and ENTJs, you trigger your core shadow pattern: the Identity Dissolution Loop.\n\nThis loop goes like this: You try a new system → it feels inauthentic → you abandon it → you feel like a failure → you lose sense of who you are → you people-please to regain identity → the cycle repeats. Every self-help book that doesn't account for this loop actually feeds it.`,
      },
      {
        h2: "The INFP People-Pleasing Trap: Why You Can't Say No",
        content: `Here's what nobody tells INFPs about people-pleasing: it's not a personality flaw. It's a survival strategy you installed before you had language for it.\n\nAs a child, you learned that your emotional sensitivity was "too much." So you developed an incredible radar for other people's feelings — and you started managing those feelings to keep yourself safe. This wasn't manipulation. It was adaptation.\n\nBut now, as an adult, this pattern has become a prison. You say yes when you mean no. You absorb emotions that aren't yours. You cancel your own plans to accommodate others. And then you wonder why you feel so empty, so resentful, so lost.\n\nThe truth is: your people-pleasing isn't about other people. It's about a deep fear that if you stop managing everyone's emotions, they'll discover who you really are — and leave. This is the INFP shadow. And until you address it directly, no amount of boundary-setting exercises will stick.`,
      },
      {
        h2: "Why INFPs Struggle With Identity",
        content: `"Find yourself" is the most dangerous advice for an INFP. Here's why: your identity isn't something lost that needs to be found. It's something that was systematically buried under layers of adaptation.\n\nEvery time you mirrored someone else's preferences to keep the peace, a piece of your authentic self went underground. Every time you suppressed your own reaction to avoid conflict, you lost touch with what you actually feel. Over years, this creates what psychologists call "identity diffusion" — a state where you genuinely don't know what you want, what you believe, or who you are when no one else is in the room.\n\nThis is why INFPs often feel like chameleons. You're not fake — you're highly adaptive. But the adaptation has become so automatic that you've lost access to the original self underneath. The solution isn't to "find yourself." It's to excavate yourself.`,
      },
    ],
    shadowSection: {
      h2: "The INFP Core Shadow: People-Pleasing as Identity Protection",
      pattern: "People Pleasing / Identity Confusion",
      rootCause: "Early emotional environment taught you that your authentic feelings were 'too much.' You learned to manage others' emotions to maintain safety and connection.",
      triggers: ["Conflict or disagreement", "Someone expressing disappointment", "Being asked what you want", "Seeing someone else in emotional pain"],
      content: `The INFP shadow pattern operates like an iceberg. On the surface, you see the people-pleasing, the conflict avoidance, the endless accommodation. But underneath lies something much deeper: a core belief that your authentic self is fundamentally unacceptable.\n\nThis belief was installed early. Maybe a parent was emotionally volatile, and you learned to read the room to stay safe. Maybe you were told you were "too sensitive" so many times that you started hiding your sensitivity. Whatever the origin, the result is the same: you developed an incredibly sophisticated system for managing other people's emotional states — and you lost yourself in the process.\n\nThe shadow activates whenever you're asked to be authentic. That question — "What do you actually want?" — triggers a cascade of anxiety because you genuinely don't know. And not knowing feels like proof that something is fundamentally wrong with you. But nothing is wrong with you. You're not broken. You're adapted. And adaptation can be reversed.`,
    },
    solutionSection: {
      h2: "The INFP Spiritual Path: Bhakti Yoga and Emotional Reclamation",
      spiritualPath: "Bhakti Yoga — the path of devotion and emotional authenticity",
      content: `For the INFP, the most effective spiritual path isn't one that asks you to transcend your emotions. It's one that teaches you to finally feel them fully. Bhakti Yoga — the yoga of devotion and emotional authenticity — is the natural home for the INFP mind.\n\nBhakti doesn't ask you to stop feeling. It asks you to stop feeling everyone else's feelings and start feeling your own. It teaches you that devotion to your own truth is not selfish — it's sacred.\n\nAt Spiritual AI, we've mapped this process specifically for the INFP cognitive architecture. We don't give you generic meditation scripts or journaling prompts. We decode your specific pattern — the exact sequence of emotional loops that keep you stuck — and give you the precise key to unlock each one.`,
    },
    relationshipSection: {
      h2: "INFP Relationships: Why You Fall for People Who Need Fixing",
      content: `There's a pattern that plays out in almost every INFP relationship: you're drawn to people who are emotionally unavailable, struggling, or "broken" in some way. You see their potential. You feel their pain. And you commit yourself to helping them become who they could be.\n\nThis isn't love. It's a shadow expression of your own unmet needs. When you focus on fixing someone else, you get to feel needed (which feels like love) without the vulnerability of being truly seen. As long as you're helping them, you don't have to confront your own emptiness.\n\nThe relationships that actually heal INFPs are the ones where you're asked to be the student, not the teacher. Where someone sees through your helping pattern and says, "I don't need you to fix me. I need you to be honest with me." That's terrifying for an INFP — and that's exactly where the growth happens.`,
    },
    careerSection: {
      h2: "INFP Career: Why You're Unsuccessful (And It's Not What You Think)",
      content: `Most INFPs are not unsuccessful because they lack talent. They're unsuccessful because they've been trying to succeed in systems that were designed for a completely different cognitive architecture.\n\nThe modern workplace rewards: quick decisions, external metrics, competitive behavior, consistent output regardless of emotional state, and the ability to self-promote. Every single one of these rewards is misaligned with the INFP cognitive style.\n\nINFPs thrive when they have: deep meaning in their work, autonomy over their process, time for reflection before action, emotional safety in their environment, and the freedom to follow their curiosity. When these conditions are met, INFPs don't just succeed — they produce work that changes people.`,
    },
    faqs: [
      { question: "Why do I always feel like I'm pretending to be normal?", answer: "This is the INFP identity diffusion pattern. You've spent so long adapting to others that you've lost touch with your authentic self. The feeling of 'pretending' is actually your real self trying to surface." },
      { question: "How do I stop absorbing other people's emotions?", answer: "First, recognize that emotional absorption is a skill you developed for survival — it's not a flaw. To start shifting it, practice asking yourself 'Is this mine?' when you feel a strong emotion." },
      { question: "Why can't I just make a decision and stick with it?", answer: "INFPs process decisions through meaning, not logic. When a decision feels meaningless or inauthentic, your mind will sabotage it. The fix isn't to 'decide faster.' It's to get clearer on what actually matters to you." },
      { question: "Is it normal for INFPs to feel depressed all the time?", answer: "Chronic low-grade depression is extremely common in INFPs. It's usually not clinical depression — it's what happens when a deeply feeling person spends years suppressing their authentic self." },
      { question: "What careers are best for INFPs?", answer: "The best INFP careers combine meaning, autonomy, and creativity. Common fits include: writing, counseling, psychology, art, music, social work, UX design, and content creation." },
    ],
    cta: { headline: "Decode Your INFP Blueprint", subtext: "Take our 5-question diagnostic to see the exact patterns running beneath your surface.", buttonText: "Begin Your Return" },
    relatedTypes: ["INFJ", "ENFP", "ISFP", "INTP"],
  },
  INFJ: {
    meta: {
      title: "The INFJ Shadow Pattern — Why You Understand Everyone But Are Understood By No One",
      description: "INFJ personality type struggles with invisible martyrdom, savior complex, and emotional isolation. Discover why the rarest personality type has the deepest shadow.",
      keywords: ["INFJ personality", "INFJ shadow pattern", "INFJ savior complex", "why do I feel so alone INFJ", "INFJ relationships"],
    },
    hero: {
      headline: "The INFJ Shadow Pattern: Why You Understand Everyone But Are Understood By No One",
      subheadline: "You can see through anyone. You know what they need before they do. But when you need something, the room goes silent.",
      archetypeQuote: "The one who understands everyone — and is understood by no one.",
    },
    problemSections: [
      {
        h2: "The INFJ Savior Complex: Why You Can't Stop Rescuing People",
        content: `You see someone struggling, and something in you activates. Not pity — something deeper. A knowing. You can see exactly what they need, exactly what's holding them back, exactly what they could become if someone just showed them the way.\n\nSo you step in. You guide. You support. You pour yourself into their transformation. And when they finally break through, you feel a rush of meaning that nothing else in your life provides.\n\nBut here's the shadow: you don't do this because you're selfless. You do it because being the savior is the only way you know how to be loved. The INFJ savior complex is one of the most sophisticated shadow patterns in the personality world. It looks like compassion. It feels like purpose. But underneath, it's a transaction: "I will help you become your best self, and in return, you will need me. And if you need me, you won't leave me."`,
      },
      {
        h2: "Why INFJs Are the Loneliest People in the Room",
        content: `There's a specific kind of loneliness that only INFJs experience. It's not the loneliness of being alone — you can be surrounded by people and still feel it. It's the loneliness of being the person everyone comes to with their problems, but no one thinks to ask how you're doing.\n\nYou've set it up this way. Not consciously, but systematically. You've positioned yourself as the strong one, the wise one, the one who has it together. And now you're trapped behind that image, screaming into a void that no one can hear because you've made yourself so good at seeming fine.\n\nThe INFJ loneliness epidemic is real. Research consistently shows that INFJs report the highest rates of loneliness among all 16 types. Not because they're antisocial — they're often the most socially engaged people in any group. But because their engagement is almost entirely one-directional.`,
      },
      {
        h2: "The INFJ Door Slam: Why You Cut People Off Completely",
        content: `Everyone talks about the INFJ "door slam" — the moment when an INFJ suddenly and permanently cuts someone out of their life. But nobody explains why it happens or what it actually means.\n\nThe door slam isn't anger. It's exhaustion. It's the final stage of a process that's been building for months or years. Stage 1: You notice someone is taking more than they're giving. Stage 2: You start keeping score. Stage 3: You try to address it. Stage 4: You withdraw emotionally. Stage 5: One final disappointment — and then the door slam.\n\nAfter the door slam, you don't hate the person. You just... don't care anymore. The emotional connection has been severed so completely that they become a stranger. This is actually a protective mechanism — your psyche's way of finally enforcing a boundary you couldn't enforce consciously.`,
      },
    ],
    shadowSection: {
      h2: "The INFJ Core Shadow: Invisible Martyrdom",
      pattern: "Invisible Martyrdom / Savior Complex",
      rootCause: "You learned early that being needed was safer than being seen. If you could anticipate and meet everyone's needs, you'd be indispensable — and therefore safe from abandonment.",
      triggers: ["Someone not appreciating your help", "Being asked for help when you're depleted", "Seeing someone make the same mistake repeatedly", "Being vulnerable and having it dismissed"],
      content: `The INFJ shadow is built on a foundation of invisible labor. You do enormous amounts of emotional, psychological, and practical work for the people around you — and you do it so seamlessly that no one even notices.\n\nThis invisibility is both your superpower and your curse. It means you can move through the world with an almost supernatural ability to read and influence situations. But it also means that your own needs go chronically unmet, because you've made yourself so good at not having needs.\n\nThe shadow pattern goes like this: You give and give and give → you become depleted → you feel resentful → you feel guilty for feeling resentful → you give more to prove you're not resentful → you become more depleted → the cycle accelerates until you either slam the door or collapse.`,
    },
    solutionSection: {
      h2: "The INFJ Spiritual Path: From Savior to Sovereign",
      spiritualPath: "Bhakti Yoga — transforming devotion from others to self",
      content: `The INFJ spiritual journey is about redirecting the enormous capacity for devotion away from other people and toward your own inner life. This isn't selfish — it's the most generous thing you can do. Because when an INFJ is truly nourished, the love they give to others is real, not transactional.\n\nAt Spiritual AI, we've designed a specific diagnostic process for the INFJ cognitive architecture. It doesn't ask you to become more extroverted or more assertive. It helps you understand exactly where your savior pattern installed, what it's protecting you from, and how to meet those needs directly instead of through other people.`,
    },
    relationshipSection: {
      h2: "INFJ Relationships: Why You Attract Emotionally Unavailable Partners",
      content: `INFJs have an almost magnetic attraction to emotionally unavailable partners. Not because they enjoy suffering — but because emotional unavailability is the only type of relationship that feels familiar.\n\nIf you grew up in a household where love was conditional, inconsistent, or expressed through actions rather than words, your nervous system calibrated to that frequency. As an adult, you're drawn to people who love the same way — partially, inconsistently, with one foot out the door.\n\nThe breakthrough for INFJ relationships isn't finding the "right person." It's recalibrating your nervous system to recognize that consistent, available love is not boring — it's safe. And safe is what you actually need.`,
    },
    careerSection: {
      h2: "INFJ Career: Why You're Burned Out",
      content: `INFJ burnout is different from regular burnout. It's not just exhaustion — it's a complete identity collapse. When an INFJ burns out, they don't just need a vacation. They need to rebuild their entire sense of self from scratch.\n\nThis is because the INFJ identity is built on helping others. Your sense of self is derived from your impact on other people. When you stop helping — when you're too depleted to be there for anyone — you don't just feel tired. You feel like you don't exist.`,
    },
    faqs: [
      { question: "Why do I always feel like no one really knows me?", answer: "Because you've spent your life managing how others perceive you. The INFJ chameleon ability is real — you adapt so seamlessly to others that you've created a thousand different versions of yourself." },
      { question: "How do I stop feeling responsible for everyone's emotions?", answer: "Start by recognizing that you're not actually responsible — you've just been acting responsible because it felt safer than being vulnerable." },
      { question: "Why do I have such intense emotions but can't express them?", answer: "INFJs process emotions internally and deeply. By the time you've fully felt something, you've also analyzed it from every angle and decided it's safer to keep it inside." },
      { question: "Is the INFJ door slam permanent?", answer: "Usually, yes — and that's actually healthy. The door slam is your psyche's way of protecting you from continued harm." },
      { question: "What's the best career for an INFJ?", answer: "The best INFJ careers combine meaning, autonomy, and the ability to help others sustainably. Top fits include: therapist, writer, psychologist, life coach, and spiritual direction." },
    ],
    cta: { headline: "Decode Your INFJ Blueprint", subtext: "You've spent your life understanding everyone else. Let someone finally understand you.", buttonText: "Fulfill Your Purpose" },
    relatedTypes: ["INFP", "ENFJ", "INTJ", "ISFJ"],
  },
