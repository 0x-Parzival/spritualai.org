const fs = require('fs');
const path = require('path');

const dir = '/home/parzival/Spiritual AI/spiritual-ai-website/public/MBTI/personality';

const themes = {
  // Purple (Analysts)
  'intj': 'theme-purple', 'intp': 'theme-purple', 'entj': 'theme-purple', 'entp': 'theme-purple',
  // Green (Diplomats)
  'infj': 'theme-green', 'infp': 'theme-green', 'enfj': 'theme-green', 'enfp': 'theme-green',
  // Blue (Sentinels)
  'istj': 'theme-blue', 'isfj': 'theme-blue', 'estj': 'theme-blue', 'esfj': 'theme-blue',
  // Yellow (Explorers)
  'istp': 'theme-yellow', 'isfp': 'theme-yellow', 'estp': 'theme-yellow', 'esfp': 'theme-yellow'
};

const fullNames = {
    'intj': 'The Architect', 'intp': 'The Logician', 'entj': 'The Commander', 'entp': 'The Debater',
    'infj': 'The Advocate', 'infp': 'The Mediator', 'enfj': 'The Protagonist', 'enfp': 'The Campaigner',
    'istj': 'The Logistician', 'isfj': 'The Defender', 'estj': 'The Executive', 'esfj': 'The Consul',
    'istp': 'The Virtuoso', 'isfp': 'The Adventurer', 'estp': 'The Entrepreneur', 'esfp': 'The Entertainer'
};

fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.html')) return;
  const type = file.replace('.html', '').toLowerCase();
  const theme = themes[type];
  if (!theme) return;

  const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${type.toUpperCase()} - ${fullNames[type]} - Spiritual AI</title>
  <link href="premium.css" rel="stylesheet">
</head>
<body class="${theme}">
  <!-- WebGL Background -->
  <canvas id="webgl-canvas"></canvas>
  <script type="module" src="webgl-background.js"></script>

  <!-- Back Button -->
  <a href="../mbti.html" class="back-button">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    <span>Back</span>
  </a>

  <div class="container">
    <header class="mbti-header">
      <h1 class="mbti-title">${type.toUpperCase()}</h1>
      <p class="mbti-subtitle">${fullNames[type]}</p>
    </header>

    <section class="section">
      <h2 class="section-title">Overview</h2>
      <div class="section-content">
        <p>The <strong>${type.toUpperCase()}</strong> personality type is known as <em>${fullNames[type]}</em>. They possess a unique blend of traits that shape their perspective on the world.</p>
        <p>This premium view highlights the strengths and deeper psychological triggers associated with this type.</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Key Strengths</h2>
      <div class="section-content">
        <ul>
            <li>Unique perspective on complex problems</li>
            <li>Strong sense of purpose and direction</li>
            <li>Ability to see patterns others miss</li>
            <li>Deeply valued by those who understand them</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Growth Path</h2>
      <div class="section-content">
        <p>For the ${fullNames[type]}, growth comes from embracing their authentic self while learning to navigate the external world with grace.</p>
      </div>
    </section>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, file), content);
  console.log('Updated ' + file);
});
