const fs = require('fs');
const path = require('path');
const productsData = require('./products_data.js');

const personalityDir = path.join(__dirname, '../public/MBTI/personality');

Object.values(productsData).forEach(profile => {
    const filename = `${profile.id}.html`;
    const filePath = path.join(personalityDir, filename);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if products section already exists to avoid duplication
        if (content.includes('class="section products-section"')) {
            console.log(`Skipping ${filename}, already has products.`);
            return;
        }

        const productsHtml = `
    <section class="section products-section">
      <h2 class="section-title">Premium Resources for ${profile.name}</h2>
      <div class="products-grid">
        ${profile.products.map(p => `
        <div class="product-card">
          <div class="product-header">
            <h3 class="product-title">${p.title}</h3>
            <span class="product-price"><span class="original-price">${p.script.price_original}</span> ${p.script.price_discounted}</span>
          </div>
          <div class="product-content">
            <h4 class="product-headline">${p.script.headline}</h4>
            <p class="product-subhead">${p.script.subheadline}</p>
            <p class="product-description">${p.script.product_description}</p>
            <a href="#" class="product-cta">${p.script.cta_text}</a>
          </div>
        </div>
        `).join('')}
      </div>
    </section>
        `;

        const lastSectionIndex = content.lastIndexOf('</section>');

        if (lastSectionIndex !== -1) {
            const insertPos = lastSectionIndex + 10; // length of </section>
            const newContent = content.slice(0, insertPos) + '\n' + productsHtml + content.slice(insertPos);
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${filename}`);
        } else {
            console.log(`Could not find place to insert in ${filename}`);
        }
    } else {
        console.log(`File not found: ${filename}`);
    }
});
