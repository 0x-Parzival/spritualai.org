// ============================================
// MAIN PORTFOLIO COMPONENT
// ============================================
const { useState, useEffect, useRef } = React;

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Refs for animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  // Toast notification
  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    displayToast(`${theme === 'dark' ? 'Light' : 'Dark'} mode activated`);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    displayToast(language === 'en' ? 'اللغة العربية' : 'English Language');
  };

  return (
    <div className={`portfolio-app ${theme}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Effects */}
      <div className="bg-effects" aria-hidden="true">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}>
              {['{', '}', '<', '>', '/', '*'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        theme={theme}
        language={language}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <HeroSection language={language} scrollToSection={scrollToSection} />

        {/* About Section */}
        <AboutSection language={language} />

        {/* Skills Section */}
        <SkillsSection language={language} />

        {/* Experience Section */}
        <ExperienceSection language={language} />

        {/* Projects Section */}
        <ProjectsSection language={language} />

        {/* Contact Section */}
        <ContactSection language={language} displayToast={displayToast} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Styles */}
      <style jsx>{styles}</style>
    </div>
  );
}

// ============================================
// HEADER COMPONENT
// ============================================
function Header({ activeSection, isMenuOpen, setIsMenuOpen, scrollToSection, toggleTheme, toggleLanguage, theme, language }) {
  const navItems = [
    { id: 'home', icon: '🏠', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', icon: '👤', labelEn: 'About', labelAr: 'عني' },
    { id: 'skills', icon: '💻', labelEn: 'Skills', labelAr: 'المهارات' },
    { id: 'experience', icon: '💼', labelEn: 'Experience', labelAr: 'الخبرة' },
    { id: 'projects', icon: '🚀', labelEn: 'Projects', labelAr: 'المشاريع' },
    { id: 'contact', icon: '✉️', labelEn: 'Contact', labelAr: 'التواصل' }
  ];

  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="nav-brand">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">0xP</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{language === 'en' ? item.labelEn : item.labelAr}</span>
            </button>
          ))}
        </div>

        <div className="nav-controls">
          <button className="control-btn" onClick={toggleLanguage} title="Toggle Language">
            <span className="control-icon">🌐</span>
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
          <button className="control-btn" onClick={toggleTheme} title="Toggle Theme">
            <span className="control-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection({ language, scrollToSection }) {
  const [typedText, setTypedText] = useState('');
  const fullText = '0xPARZIVAL';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span>{language === 'en' ? 'Hello, I\'m' : 'مرحباً، أنا'}</span>
            <span className="greeting-cursor">|</span>
          </div>

          <h1 className="hero-name">
            <span className="name-prefix">const</span>
            <span className="name-operator">=</span>
            <span className="name-value">{typedText}</span>
            <span className="name-cursor">|</span>
            <span className="name-suffix">;</span>
          </h1>

          <div className="hero-title">
            <span className="title-prefix">//</span>
            <span>{language === 'en' ? 'System Architect & Full Stack Developer' : 'مهندس أنظمة ومطور Full Stack'}</span>
          </div>

          <p className="hero-description">
            {language === 'en'
              ? 'Architect of cognitive systems blending Vedic philosophy with artificial intelligence.'
              : 'مهندس أنظمة معرفية يمزج بين الفلسفة الفيدية والذكاء الاصطناعي.'}
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
              <span>{language === 'en' ? 'Explore Creations' : 'استكشف الابتكارات'}</span>
              <span>→</span>
            </button>
            <button className="btn btn-secondary" onClick={() => window.open('https://spiritualai.org', '_blank')}>
              <span>{language === 'en' ? 'Spiritual AI' : 'Spiritual AI'}</span>
              <span>👁️</span>
            </button>
          </div>

          <div className="hero-social">
            <a href="https://github.com/0x-Parzival" target="_blank" className="social-icon" title="GitHub">G</a>
            <a href="https://in.linkedin.com/in/keshav-baliyan-749188245" target="_blank" className="social-icon" title="LinkedIn">L</a>
            <a href="https://www.instagram.com/heyyy_keshav/" target="_blank" className="social-icon" title="Instagram">I</a>
            <a href="mailto:spiritualai.org@gmail.com" className="social-icon" title="Email">E</a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <div className="profile-image-glow"></div>
            <div className="profile-image-frame">
              <img src="/images/me.png" alt="Keshav Baliyan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {[
              { icon: '🤖', title: 'AI/ML', libs: 'LLMs, Python, PyTorch' },
              { icon: '🌌', title: 'Three.js', libs: 'WebGL, 3D Graphics' },
              { icon: '⚛️', title: 'Next.js', libs: 'React, SSR, SEO' }
            ].map((badge, i) => (
              <div key={i} className={`floating-badge badge-${i + 1}`}>
                <span className="badge-icon">{badge.icon}</span>
                <div className="badge-content">
                  <span className="badge-title">{badge.title}</span>
                  <span className="badge-libs">{badge.libs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>{language === 'en' ? 'Scroll Down' : 'انتقل للأسفل'}</span>
      </div>
    </section>
  );
}

// ============================================
// ABOUT SECTION
// ============================================
function AboutSection({ language }) {
  const stats = [
    { count: 50, label: language === 'en' ? 'Projects' : 'مشروع' },
    { count: 5, label: language === 'en' ? 'Years Experience' : 'سنوات خبرة' },
    { count: 30, label: language === 'en' ? 'Happy Clients' : 'عميل سعيد' }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">
            <span className="title-bracket">&lt;</span>
            <span>{language === 'en' ? 'About Me' : 'عني'}</span>
            <span className="title-bracket">/&gt;</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text-wrapper">
            <p className="about-text">
              {language === 'en'
                ? "I am Keshav Baliyan, a System Architect of Consciousness. My mission is to bridge the gap between ancient Vedic wisdom and modern AI. I build evolutionary environments like Spiritual AI and KalkiOS."
                : 'أنا كيشاف باليان، مهندس أنظمة الوعي. مهمتي هي سد الفجوة بين الحكمة الفيدية القديمة والذكاء الاصطناعي الحديث. أقوم ببناء بيئات تطورية مثل Spiritual AI و KalkiOS.'}
            </p>

            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{stat.count}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="code-block">
            <div className="code-line">
              <span className="code-keyword">const</span>{' '}
              <span className="code-variable">developer</span>{' '}
              <span className="code-operator">=</span>{' '}
              <span className="code-brace">{'{'}</span>
            </div>
            <div className="code-line indent">
              <span className="code-property">name</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-string">'Keshav Baliyan'</span>
              <span className="code-comma">,</span>
            </div>
            <div className="code-line indent">
              <span className="code-property">role</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-string">'System Architect'</span>
              <span className="code-comma">,</span>
            </div>
            <div className="code-line indent">
              <span className="code-property">focus</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-bracket">[</span>
              <span className="code-string">'Vedic AI'</span>
              <span className="code-comma">, </span>
              <span className="code-string">'Cognitive Ops'</span>
              <span className="code-bracket">]</span>
              <span className="code-comma">,</span>
            </div>
            <div className="code-line indent">
              <span className="code-property">mission</span>
              <span className="code-operator">:</span>{' '}
              <span className="code-string">'Evolution'</span>
            </div>
            <div className="code-line">
              <span className="code-brace">{'}'}</span>
              <span className="code-semicolon">;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SKILLS SECTION
// ============================================
function SkillsSection({ language }) {
  const skillCategories = [
    {
      title: language === 'en' ? 'Core Development' : 'التطوير الأساسي',
      skills: [
        { name: 'React / Next.js', percent: 95 },
        { name: 'Three.js / WebGL', percent: 90 },
        { name: 'Node.js / Python', percent: 88 },
        { name: 'TypeScript', percent: 85 }
      ]
    },
    {
      title: language === 'en' ? 'AI & Innovation' : 'الذكاء الاصطناعي والابتكار',
      skills: [
        { name: 'LLM Orchestration', percent: 92 },
        { name: 'Computer Vision', percent: 85 },
        { name: 'Vedic Systems', percent: 95 },
        { name: 'Gesture Control', percent: 90 }
      ]
    },
    {
      title: language === 'en' ? 'Tools & Creative' : 'الأدوات والإبداع',
      skills: [
        { name: 'Cybersecurity', percent: 80 },
        { name: 'Graphic Design', percent: 88 },
        { name: 'AI Video Gen', percent: 92 },
        { name: 'Solidity / Crypto', percent: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">
            <span className="title-bracket">&lt;</span>
            <span>{language === 'en' ? 'Skills' : 'المهارات'}</span>
            <span className="title-bracket">/&gt;</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, i) => (
            <div key={i} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-items">
                {category.skills.map((skill, j) => (
                  <SkillBar key={j} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(skill.percent), 100);
    return () => clearTimeout(timer);
  }, [skill.percent]);

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{width}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-progress" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
}

// ============================================
// EXPERIENCE SECTION
// ============================================
function ExperienceSection({ language }) {
  const experiences = [
    {
      year: '2024 - 2026',
      badge: language === 'en' ? 'Founder' : 'مؤسس',
      title: language === 'en' ? 'Spiritual AI & KalkiOS' : 'Spiritual AI & KalkiOS',
      company: 'SpiritualAI.org',
      description: language === 'en'
        ? 'Bridging spirituality with AI as a mirror of consciousness. Building advanced cognitive environments.'
        : 'سد الفجوة بين الروحانية والذكاء الاصطناعي كمرآة للوعي. بناء بيئات معرفية متقدمة.',
      achievements: [
        language === 'en' ? 'Created Spiritual AI platform' : 'إنشاء منصة Spiritual AI',
        language === 'en' ? 'Architected Satya Yuga OS' : 'هندسة نظام التشغيل ساتيا يوغا',
        language === 'en' ? 'Built cross-platform AI tools' : 'بناء أدوات ذكاء اصطناعي متعددة المنصات'
      ],
      tags: ['Next.js', 'LLMs', 'Three.js', 'Vedic Logic']
    },
    {
      year: '2023 - 2024',
      title: language === 'en' ? 'Gesture AI Developer' : 'مطور Gesture AI',
      company: 'IIT Delhi Startup Expo',
      description: language === 'en'
        ? 'Developed gesture-based control systems. Featured at IIT Delhi for innovative interaction models.'
        : 'تطوير أنظمة تحكم قائمة على الإيماءات. تم عرضه في معرض IIT Delhi لنماذج التفاعل المبتكرة.',
      achievements: [
        language === 'en' ? 'Selected for IITD Startup Expo' : 'تم الاختيار لمعرض الشركات الناشئة في IITD',
        language === 'en' ? 'Created Gesture Writing protocol' : 'إنشاء بروتوكول الكتابة بالإيماءات',
        language === 'en' ? 'Implemented real-time CV' : 'تنفيذ رؤية حاسوبية فورية'
      ],
      tags: ['Python', 'OpenCV', 'Hand Tracking', 'UI/UX']
    },
    {
      year: '2021 - 2022',
      title: language === 'en' ? 'Cybersecurity & Engineering' : 'الأمن السيبراني والهندسة',
      company: 'Self-Directed / IIT Delhi Projects',
      description: language === 'en'
        ? 'Explored vulnerability assessment while contributing to multi-disciplinary projects like F1 car building at IIT Delhi.'
        : 'استكشاف تقييم الضعف مع المساهمة في مشاريع متعددة التخصصات مثل بناء سيارة F1 في IIT Delhi.',
      achievements: [
        language === 'en' ? 'First income in ethical hacking' : 'أول دخل من الاختراق الأخلاقي',
        language === 'en' ? 'Helped build Formula 1 prototype' : 'المساعدة في بناء نموذج Formula 1',
        language === 'en' ? 'Mastered digital security basics' : 'إتقان أساسيات الأمن الرقمي'
      ],
      tags: ['Security', 'SolidWorks', 'F1 Design', 'Hacking']
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">
            <span className="title-bracket">&lt;</span>
            <span>{language === 'en' ? 'Experience' : 'الخبرة'}</span>
            <span className="title-bracket">/&gt;</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-year">{exp.year}</div>
                  {exp.badge && <div className="timeline-badge">{exp.badge}</div>}
                </div>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-company">🏢 {exp.company}</div>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-achievements">
                  {exp.achievements.map((achievement, j) => (
                    <div key={j} className="achievement-item">
                      <span>✓</span> {achievement}
                    </div>
                  ))}
                </div>
                <div className="timeline-tags">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
function ProjectsSection({ language }) {
  const projects = [
    {
      image: '/creator_assets/spiritualai.png',
      title: language === 'en' ? 'Spiritual AI' : 'Spiritual AI',
      description: language === 'en'
        ? 'A revolutionary platform merging Vedic philosophy with artificial intelligence.'
        : 'منصة ثورية تدمج الفلسفة الفيدية مع الذكاء الاصطناعي.',
      tags: ['Next.js', '3D', 'AI'],
      link: 'https://spritualai.org'
    },
    {
      image: '/creator_assets/gesture.png',
      title: language === 'en' ? 'Gesture AI' : 'Gesture AI',
      description: language === 'en'
        ? 'Advanced hand tracking for controlling digital environments without peripherals.'
        : 'تتبع يد متقدم للتحكم في البيئات الرقمية بدون ملحقات.',
      tags: ['Python', 'CV', 'UIX'],
      link: 'https://www.instagram.com/gesture_ai/'
    },
    {
      image: '/creator_assets/kalkios.png',
      title: language === 'en' ? 'KalkiOS' : 'KalkiOS',
      description: language === 'en'
        ? 'A conscious operating system designed for the next era of computing.'
        : 'نظام تشغيل واعي مصمم للعصر القادم من الحوسبة.',
      tags: ['OS Arch', 'Conscious AI'],
      link: 'https://github.com/0x-Parzival/kalki1'
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">
            <span className="title-bracket">&lt;</span>
            <span>{language === 'en' ? 'Projects' : 'المشاريع'}</span>
            <span className="title-bracket">/&gt;</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card" onClick={() => project.link && window.open(project.link, '_blank')}>
              <div className="project-image">
                <div className="project-overlay">
                  <div className="project-links">
                    {project.link && <span className="project-link">🔗</span>}
                  </div>
                </div>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="project-placeholder">🚀</div>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONTACT SECTION
// ============================================
function ContactSection({ language, displayToast }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    displayToast(language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!');
    e.target.reset();
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">
            <span className="title-bracket">&lt;</span>
            <span>{language === 'en' ? 'Contact' : 'التواصل'}</span>
            <span className="title-bracket">/&gt;</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            {[
              { icon: '✉️', label: 'Email', value: 'admin@spiritualai.store', href: 'mailto:admin@spiritualai.store' },
              { icon: '📱', label: 'WhatsApp', value: '+91 7457852306', href: 'https://wa.me/7457852306' },
              { icon: '📍', label: 'Location', value: language === 'en' ? 'India / Digital' : 'الهند / رقمي' }
            ].map((item, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-details">
                  <h4 className="contact-label">{item.label}</h4>
                  {item.href ? (
                    <a href={item.href} className="contact-value">{item.value}</a>
                  ) : (
                    <span className="contact-value">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-input"
              placeholder={language === 'en' ? 'Name' : 'الاسم'}
              required
            />
            <input
              type="email"
              className="form-input"
              placeholder={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              required
            />
            <input
              type="text"
              className="form-input"
              placeholder={language === 'en' ? 'Subject' : 'الموضوع'}
              required
            />
            <textarea
              className="form-input form-textarea"
              rows="5"
              placeholder={language === 'en' ? 'Message' : 'الرسالة'}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary btn-submit">
              <span>{language === 'en' ? 'Send Message' : 'إرسال الرسالة'}</span>
              <span>📧</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER COMPONENT
// ============================================
function Footer({ language }) {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-text-wrapper">
            <p className="footer-text">
              <span>© 2026 Keshav Baliyan</span>
              <span className="footer-divider">•</span>
              <span>{language === 'en' ? 'Built with passion and code' : 'بُني بشغف وكود'}</span>
            </p>
          </div>
          <div className="footer-social">
            {[
              { label: 'LinkedIn', url: 'https://in.linkedin.com/in/keshav-baliyan-749188245' },
              { label: 'GitHub', url: 'https://github.com/0x-Parzival' },
              { label: 'Instagram', url: 'https://www.instagram.com/heyyy_keshav/' }
            ].map(platform => (
              <a key={platform.label} href={platform.url} target="_blank" className="footer-social-link" title={platform.label}>
                {platform.label.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// STYLES
// ============================================
const styles = `
  /* CSS Variables */
  :root {
    --primary: #c084fc;
    --secondary: #a78bfa;
    --accent: #fbbf24;
    --cyan: #67e8f9;
    --purple: #a78bfa;
    --green: #86efac;
    --bg-dark: #0f172a;
    --bg-darker: #020617;
    --bg-card: #1e293b;
    --bg-hover: #334155;
    --border: #334155;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --gradient-1: linear-gradient(135deg, #c084fc 0%, #a78bfa 50%, #67e8f9 100%);
    --gradient-2: linear-gradient(135deg, #67e8f9 0%, #a78bfa 100%);
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
    --shadow-md: 0 8px 32px rgba(0,0,0,0.4);
    --shadow-lg: 0 24px 64px rgba(0,0,0,0.5);
    --shadow-glow: 0 0 40px rgba(99,102,241,0.3);
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .portfolio-app {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .portfolio-app.light {
    --bg-dark: #ffffff;
    --bg-darker: #f8f9fa;
    --bg-card: #ffffff;
    --bg-hover: #f1f3f5;
    --border: #e5e7eb;
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
  }

  /* Background Effects */
  .bg-effects {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .bg-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 100% 100%, rgba(139,92,246,0.1) 0%, transparent 50%);
  }

  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%);
  }

  .bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: floatOrb 20s infinite ease-in-out;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: var(--primary);
    top: -200px;
    left: -150px;
  }

  .orb-2 {
    width: 400px;
    height: 400px;
    background: var(--purple);
    bottom: -150px;
    right: -100px;
    animation-delay: 5s;
  }

  .orb-3 {
    width: 300px;
    height: 300px;
    background: var(--cyan);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulseOrb 15s infinite ease-in-out;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, 40px) scale(1.05); }
  }

  @keyframes pulseOrb {
    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.35; transform: translate(-50%, -50%) scale(1.2); }
  }

  .floating-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    font-family: 'Fira Code', monospace;
    font-size: 1.5rem;
    color: var(--primary);
    opacity: 0.1;
    animation: float 15s infinite ease-in-out;
  }

  @keyframes float {
    0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10%, 90% { opacity: 0.1; }
    50% { transform: translateY(-100px) rotate(180deg); opacity: 0.2; }
  }

  /* Toast */
  .toast-container {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    pointer-events: none;
  }

  .toast {
    padding: 16px 24px;
    background: var(--gradient-2);
    color: var(--bg-dark);
    border-radius: 12px;
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateX(100%) scale(0.9); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }

  /* Header */
  .main-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(10, 14, 39, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
    transition: var(--transition);
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-brand {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .logo-bracket {
    color: var(--purple);
  }

  .logo-text {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-menu {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition-fast);
    font-size: 14px;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--primary);
    background: var(--bg-hover);
  }

  .nav-icon {
    font-size: 16px;
  }

  .nav-controls {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .control-btn {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-primary);
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .control-btn:hover {
    background: var(--bg-hover);
    border-color: var(--primary);
  }

  .control-icon {
    font-size: 16px;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
  }

  .menu-toggle span {
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transition: var(--transition);
  }

  .menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  /* Main Content */
  .main-content {
    margin-top: 80px;
  }

  /* Hero Section */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 64px 0;
    position: relative;
  }

  .hero-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .hero-greeting {
    font-family: 'Fira Code', monospace;
    font-size: 20px;
    color: var(--primary);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .greeting-cursor {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .hero-name {
    font-family: 'Fira Code', monospace;
    font-size: 64px;
    font-weight: 700;
    margin-bottom: 32px;
    line-height: 1.2;
  }

  .name-prefix {
    color: var(--purple);
  }

  .name-operator {
    color: var(--cyan);
    margin: 0 8px;
  }

  .name-value {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .name-cursor {
    color: var(--primary);
    animation: blink 1s infinite;
  }

  .name-suffix {
    color: var(--primary);
  }

  .hero-title {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: var(--cyan);
    margin-bottom: 32px;
  }

  .title-prefix {
    color: var(--text-muted);
    margin-right: 8px;
  }

  .hero-description {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: 48px;
    line-height: 1.8;
    max-width: 600px;
  }

  .hero-buttons {
    display: flex;
    gap: 32px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    border-radius: 12px;
    font-weight: 600;
    border: 2px solid transparent;
    cursor: pointer;
    transition: var(--transition);
    font-size: 16px;
  }

  .btn-primary {
    background: var(--gradient-1);
    color: white;
    border: none;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(192,132,252,0.3);
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary);
    border-color: var(--primary);
  }

  .btn-secondary:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }

  .hero-social {
    display: flex;
    gap: 32px;
  }

  .social-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 700;
    transition: var(--transition);
  }

  .social-icon:hover {
    background: var(--bg-hover);
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-3px);
  }

  .hero-image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image-container {
    position: relative;
    width: 400px;
    height: 400px;
  }

  .profile-image-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  }

  .profile-image-frame {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid var(--primary);
    box-shadow: 0 0 30px rgba(192,132,252,0.3);
    overflow: hidden;
    background: var(--bg-card);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-placeholder {
    font-size: 128px;
    opacity: 0.3;
  }

  .floating-badge {
    position: absolute;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: var(--shadow-md);
    animation: floatBadge 3s ease-in-out infinite;
    min-width: 200px;
  }

  .badge-1 {
    top: 10%;
    right: -10%;
    animation-delay: 0s;
  }

  .badge-2 {
    bottom: 20%;
    right: -15%;
    animation-delay: 1s;
  }

  .badge-3 {
    top: 50%;
    left: -15%;
    animation-delay: 2s;
  }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .badge-icon {
    font-size: 32px;
  }

  .badge-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .badge-title {
    font-weight: 700;
  }

  .badge-libs {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 14px;
  }

  .scroll-mouse {
    width: 30px;
    height: 50px;
    border: 2px solid var(--border);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }

  .scroll-wheel {
    width: 4px;
    height: 10px;
    background: var(--primary);
    border-radius: 2px;
    animation: scrollWheel 2s infinite;
  }

  @keyframes scrollWheel {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
  }

  /* Section Styles */
  .section {
    padding: 64px 0;
    scroll-margin-top: 80px;
  }

  .section-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 64px;
  }

  .section-number {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: var(--primary);
    font-weight: 700;
  }

  .section-title {
    font-family: 'Fira Code', monospace;
    font-size: 40px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title-bracket {
    color: var(--purple);
  }

  .section-title > span:nth-child(2) {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-line {
    flex: 1;
    height: 2px;
    background: var(--gradient-1);
  }

  /* About Section */
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .about-text {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 48px;
  }

  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .stat-card {
    text-align: center;
    padding: 32px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: var(--transition);
  }

  .stat-card:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .stat-value {
    font-family: 'Fira Code', monospace;
    font-size: 40px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .stat-label {
    color: var(--text-secondary);
    font-size: 14px;
  }

  .code-block {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 48px;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.8;
  }

  .code-line {
    margin: 8px 0;
  }

  .code-line.indent {
    padding-left: 32px;
  }

  .code-keyword { color: var(--purple); }
  .code-variable { color: var(--cyan); }
  .code-operator { color: var(--primary); }
  .code-brace, .code-bracket { color: var(--accent); }
  .code-property { color: var(--cyan); }
  .code-string { color: var(--accent); }
  .code-comma, .code-semicolon { color: var(--text-muted); }

  /* Skills Section */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
  }

  .skill-category {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 48px;
  }

  .category-title {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: var(--primary);
    margin-bottom: 32px;
    font-weight: 700;
  }

  .skill-items {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .skill-name {
    font-family: 'Fira Code', monospace;
    color: var(--cyan);
    font-weight: 600;
  }

  .skill-percent {
    font-family: 'Fira Code', monospace;
    color: var(--primary);
    font-weight: 600;
  }

  .skill-bar {
    height: 12px;
    background: var(--bg-darker);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .skill-progress {
    height: 100%;
    background: var(--gradient-1);
    border-radius: 6px;
    transition: width 2s ease;
    box-shadow: 0 0 10px rgba(192,132,252,0.5);
  }

  /* Timeline */
  .timeline {
    position: relative;
    padding-left: 32px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-1);
  }

  .timeline-item {
    position: relative;
    padding-bottom: 64px;
    padding-left: 48px;
  }

  .timeline-marker {
    position: absolute;
    left: -40px;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid var(--bg-dark);
    box-shadow: 0 0 20px var(--primary);
    animation: pulse 2s infinite;
  }

  .timeline-content {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 48px;
    transition: var(--transition);
  }

  .timeline-content:hover {
    border-color: var(--primary);
    transform: translateX(8px);
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .timeline-year {
    font-family: 'Fira Code', monospace;
    color: var(--primary);
    font-weight: 700;
    font-size: 14px;
  }

  .timeline-badge {
    background: var(--gradient-1);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .timeline-title {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: var(--cyan);
    margin-bottom: 8px;
    font-weight: 700;
  }

  .timeline-company {
    color: var(--purple);
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .timeline-description {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .timeline-achievements {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
    padding: 24px;
    background: var(--bg-darker);
    border-radius: 12px;
    border-left: 3px solid var(--primary);
  }

  .achievement-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
  }

  .timeline-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    background: var(--bg-darker);
    color: var(--primary);
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Fira Code', monospace;
    border: 1px solid var(--border);
  }

  /* Projects */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 48px;
  }

  .project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: var(--transition);
    cursor: pointer;
  }

  .project-card:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
  }

  .project-image {
    position: relative;
    width: 100%;
    height: 250px;
    background: var(--bg-darker);
    overflow: hidden;
  }

  .project-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    opacity: 0.3;
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-links {
    display: flex;
    gap: 32px;
  }

  .project-link {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    text-decoration: none;
    font-size: 20px;
    transition: var(--transition);
  }

  .project-link:hover {
    transform: scale(1.1);
  }

  .project-content {
    padding: 48px;
  }

  .project-title {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: var(--primary);
    margin-bottom: 16px;
    font-weight: 700;
  }

  .project-description {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Contact */
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 64px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .contact-item {
    display: flex;
    gap: 32px;
    padding: 48px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: var(--transition);
  }

  .contact-item:hover {
    border-color: var(--primary);
    transform: translateX(8px);
  }

  .contact-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-1);
    border-radius: 12px;
    font-size: 24px;
  }

  .contact-details {
    flex: 1;
  }

  .contact-label {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 4px;
    font-family: 'Fira Code', monospace;
  }

  .contact-value {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
    font-family: 'Fira Code', monospace;
  }

  .contact-value:hover {
    color: var(--cyan);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .form-input {
    width: 100%;
    padding: 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 16px;
    transition: var(--transition);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(192,132,252,0.1);
  }

  .form-textarea {
    resize: vertical;
    min-height: 150px;
  }

  /* Footer */
  .main-footer {
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    padding: 48px 0;
    margin-top: 64px;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-text {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer-divider {
    color: var(--text-muted);
  }

  .footer-social {
    display: flex;
    gap: 32px;
  }

  .footer-social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-darker);
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 700;
    transition: var(--transition);
  }

  .footer-social-link:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    transform: translateY(-2px);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .hero-container,
    .about-content,
    .contact-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .floating-badge {
      display: none;
    }

    .hero-image-wrapper {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 60px;
      left: -100%;
      width: 100%;
      background: var(--bg-card);
      flex-direction: column;
      padding: 32px 16px;
      border-top: 1px solid var(--border);
      transition: left var(--transition);
      z-index: 999;
    }

    .nav-menu.active {
      left: 0;
    }

    .menu-toggle {
      display: flex;
    }

    .hero-name {
      font-size: 32px;
    }

    .section-title {
      font-size: 28px;
    }

    .about-stats {
      grid-template-columns: 1fr;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .timeline {
      padding-left: 24px;
    }

    .timeline-item {
      padding-left: 32px;
    }
  }

  @media (max-width: 480px) {
    .nav-container {
      padding: 12px 16px;
    }

    .hero-container {
      padding: 0 16px;
    }

    .section-container {
      padding: 0 16px;
    }

    .hero-name {
      font-size: 28px;
    }

    .hero-buttons {
      flex-direction: column;
      width: 100%;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
`;
