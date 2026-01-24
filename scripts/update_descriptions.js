const fs = require('fs');
const path = require('path');
const productsData = require('./products_data.js');

const personalityDir = path.join(__dirname, '../public/MBTI/personality');

Object.values(productsData).forEach(profile => {
    const filename = `${profile.id}.html`;
    const filePath = path.join(personalityDir, filename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Synthesize Overview
        // We will replace the generic overview with something based on the artistic vibe and name.
        const overviewRegex = /<section class="section">\s*<h2 class="section-title">Overview<\/h2>[\s\S]*?<\/div>\s*<\/section>/;

        // Clean up the artistic vibe for sentence usage (remove ending dot if present inside logic, though data usually good).
        const vibeLower = profile.artistic_vibe.charAt(0).toLowerCase() + profile.artistic_vibe.slice(1);

        const newOverview = `
    <section class="section">
      <h2 class="section-title">Overview</h2>
      <div class="section-content">
        <p>The <strong>${profile.id.toUpperCase()}</strong> personality type is known as <em>${profile.name}</em>. They are often characterized by themes such as ${vibeLower}</p>
        <p>This premium view highlights the strengths and deeper psychological triggers associated with this type, specifically curated for the ${profile.name} mind.</p>
      </div>
    </section>`;

        if (overviewRegex.test(content)) {
            content = content.replace(overviewRegex, newOverview.trim());
            console.log(`Updated Overview for ${filename}`);
        }

        // 2. Synthesize Key Strengths
        // We will use the psychological_triggers as "strengths" or core drives.
        const strengthsRegex = /<section class="section">\s*<h2 class="section-title">Key Strengths<\/h2>[\s\S]*?<\/div>\s*<\/section>/;

        const strengthsList = profile.psychological_triggers.map(trigger => `<li>${trigger}</li>`).join('\n            ');

        const newStrengths = `
    <section class="section">
      <h2 class="section-title">Core Drivers & Strengths</h2>
      <div class="section-content">
        <ul>
            ${strengthsList}
        </ul>
      </div>
    </section>`;

        if (strengthsRegex.test(content)) {
            content = content.replace(strengthsRegex, newStrengths.trim());
            console.log(`Updated Strengths for ${filename}`);
        }

        // 3. Synthesize Growth Path
        // We can look at the first product's "Agitation Bullets" or "Pain Story" to inverse it for growth, 
        // or just use a generic but slightly customized message like "Growth for [Type] involves mastering [First Trigger]..."
        const growthRegex = /<section class="section">\s*<h2 class="section-title">Growth Path<\/h2>[\s\S]*?<\/div>\s*<\/section>/;

        // Let's try to extract a 'theme' from the first product title to make it sound custom
        const firstProduct = profile.products[0];
        const growthTheme = firstProduct ? firstProduct.script.transition_mechanism : "embracing their authentic self";

        const newGrowth = `
    <section class="section">
      <h2 class="section-title">Growth Path</h2>
      <div class="section-content">
        <p>For the ${profile.name}, growth is not about changing who you are, but refining your natural edges. It often involves mastering mechanisms like: <strong>${growthTheme}</strong>.</p>
        <p>By leaning into your psychological triggers rather than fighting them, you can achieve a state of flow that respects your unique cognitive architecture.</p>
      </div>
    </section>`;

        if (growthRegex.test(content)) {
            content = content.replace(growthRegex, newGrowth.trim());
            console.log(`Updated Growth Path for ${filename}`);
        }

        fs.writeFileSync(filePath, content);
    } else {
        console.log(`File not found: ${filename}`);
    }
});
