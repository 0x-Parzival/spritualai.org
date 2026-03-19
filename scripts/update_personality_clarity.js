const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'spritualai.org/public/MBTI/personality');

const fullNames = {
    'intj': 'The Architect', 'intp': 'The Logician', 'entj': 'The Commander', 'entp': 'The Debater',
    'infj': 'The Advocate', 'infp': 'The Mediator', 'enfj': 'The Protagonist', 'enfp': 'The Campaigner',
    'istj': 'The Logistician', 'isfj': 'The Defender', 'estj': 'The Executive', 'esfj': 'The Consul',
    'istp': 'The Virtuoso', 'isfp': 'The Adventurer', 'estp': 'The Entrepreneur', 'esfp': 'The Entertainer'
};

if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    process.exit(1);
}

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    const type = file.replace('.html', '').toLowerCase();
    const role = fullNames[type];
    if (!role) return;

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Add AI Architect Consultation section before products grid
    const aiSection = `
    <!-- AI Architect Consultation Section -->
    <div class="ai-consult-card" style="
        background: rgba(53, 248, 255, 0.05);
        border: 1px solid rgba(53, 248, 255, 0.2);
        border-radius: 20px;
        padding: 40px;
        margin-bottom: 60px;
        text-align: center;
        backdrop-filter: blur(10px);
    ">
        <div style="font-size: 3rem; margin-bottom: 20px;">🤖</div>
        <h2 style="font-family: 'Orbitron', sans-serif; color: #fff; margin-bottom: 15px;">Consult the AI Architect</h2>
        <p style="color: rgba(255,255,255,0.7); max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
            Facing a specific challenge? Our specialized AI understands the ${type.toUpperCase()} cognitive architecture. 
            Chat with it to diagnose your friction, find precision solutions, and get personalized product recommendations.
        </p>
        <a href="/store?mbti=${type.toUpperCase()}" class="product-cta" style="
            display: inline-block;
            background: #35f8ff;
            color: #000;
            padding: 15px 40px;
            border-radius: 999px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-decoration: none;
            transition: all 0.3s ease;
        ">Start AI Consultation</a>
    </div>
    `;

    // Try to insert before <div class="products-grid">
    if (content.includes('<div class="products-grid">')) {
        content = content.replace('<div class="products-grid">', aiSection + '<div class="products-grid">');
    }

    // 2. Add Delivery Notice before closing </body>
    const deliveryNotice = `
    <!-- Delivery Notice -->
    <div class="delivery-notice" style="
        padding: 60px 20px;
        text-align: center;
        border-top: 1px solid rgba(255,255,255,0.05);
        margin-top: 80px;
    ">
        <h3 style="font-family: 'Orbitron', sans-serif; color: #fff; margin-bottom: 20px;">The 24-Hour Delivery Ecosystem</h3>
        <p style="color: rgba(255,255,255,0.5); max-width: 700px; margin: 0 auto; line-height: 1.8; font-size: 0.9rem;">
            Every personalized protocol is synthesized specifically for your cognitive blueprint. 
            Once ordered, your digital products will be delivered to your <strong>WhatsApp and Email within 24 hours</strong>. 
            You will also unlock permanent access in your personal realm on this site, which you can install as an app on your mobile device.
        </p>
    </div>
    `;

    if (content.includes('</body>') && !content.includes('delivery-notice')) {
        content = content.replace('</body>', deliveryNotice + '</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated \${file} with AI Consultation and Delivery Notice.`);
});
