const fs = require('fs');
const path = require('path');
const productsData = require('./products_data.js'); // Assuming we can reuse the keys from here

const personalityDir = path.join(__dirname, '../public/MBTI/personality');
const assetsDir = path.join(personalityDir, 'assets');

Object.values(productsData).forEach(profile => {
    const filename = `${profile.id}.html`;
    const filePath = path.join(personalityDir, filename);
    const imageFilename = `${profile.id}_header.png`;
    const imagePath = path.join(assetsDir, imageFilename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if image section already exists
        if (content.includes('class="mbti-hero-visual"')) {
            console.log(`Skipping ${filename}, already has visuals.`);
            return;
        }

        // We want to insert it inside the .container but BEFORE the header, or inside the header?
        // Let's insert it right after <div class="container">
        // That way it's at the top of the content area.

        const visualHtml = `
    <div class="mbti-hero-visual">
        <img src="assets/${imageFilename}" alt="${profile.name} Aesthetic Visual - ${profile.artistic_vibe.split(',')[0]}">
    </div>`;

        const containerIndex = content.indexOf('<div class="container">');

        if (containerIndex !== -1) {
            const insertPos = containerIndex + '<div class="container">'.length;
            const newContent = content.slice(0, insertPos) + '\n' + visualHtml + content.slice(insertPos);
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated visuals for ${filename}`);
        } else {
            console.log(`Could not find container in ${filename}`);
        }
    } else {
        console.log(`File not found: ${filename}`);
    }
});
