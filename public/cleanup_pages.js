const fs = require('fs').promises;
const path = require('path');

const mbtiTypes = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP',
  'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP',
  'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
];

async function cleanPage(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Remove any React code after the closing </html> tag
    const cleanContent = content.split('</html>')[0] + '</html>';
    
    // Write the cleaned content back to the file
    if (cleanContent !== content) {
      await fs.writeFile(filePath, cleanContent, 'utf8');
      console.log(`✅ Cleaned ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error.message);
  }
}

async function cleanAllPages() {
  const personalityDir = path.join(__dirname, 'personality');
  
  for (const type of mbtiTypes) {
    const filePath = path.join(personalityDir, `${type.toLowerCase()}.html`);
    await cleanPage(filePath);
  }
  
  console.log('🎉 All personality pages cleaned!');
}

// Run the cleanup
cleanAllPages().catch(console.error);
