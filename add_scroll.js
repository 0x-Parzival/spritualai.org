var fs = require('fs');
var path = require('path');

var dir = '/home/parzival/spritualai.org/public/MBTI/personality/';
var files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

var snippet = `
      <div class="scroll-indicator" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span style="font-size: 0.8rem; margin-top: 5px; letter-spacing: 1px; text-transform: uppercase;">Scroll</span>
      </div>`;

files.forEach(file => {
    var filePath = path.join(dir, file);
    var content = fs.readFileSync(filePath, 'utf8');

    // Check if hero visual exists
    if (content.includes('class="mbti-hero-visual"') && !content.includes('class="scroll-indicator"')) {
        // Insert inside the closing div of mbti-hero-visual
        // We look for the closing div of the mbti-hero-visual. 
        // It has 2 children (hero-bg-container and img hero-character).
        // So we look for the last </div> before <section class="section">

        // A safer way: Find the hero visual block and append before its closing tag.
        // The structure is consistent:
        // <div class="mbti-hero-visual"> ... </div>

        // Let's use string replacement for the closing tag of the hero visual.
        // But we need to be careful not to match other divs.

        // regex to match the hero visual block
        // This is simplified. Assuming standard formatting.

        var parts = content.split('<div class="mbti-hero-visual">');
        if (parts.length > 1) {
            var afterHero = parts[1];
            // Find the first closing div that closes the hero visual.
            // But there are nested divs (hero-bg-container).
            // hero-bg-container closes with </div>.
            // visual closes with </div>.

            // Let's just look for the hero-character img which is the last child.
            // <img src="../HOVER/ESTP.png" alt="ESTP Character" class="hero-character">
            // </div>

            var replacement = 'class="hero-character">\n' + snippet;
            if (content.includes('class="hero-character">')) {
                var newContent = content.replace('class="hero-character">', replacement);
                fs.writeFileSync(filePath, newContent);
                console.log('Updated ' + file);
            } else {
                console.log('Skipped ' + file + ' (hero-character not found formatted as expected)');
            }
        }
    }
});
