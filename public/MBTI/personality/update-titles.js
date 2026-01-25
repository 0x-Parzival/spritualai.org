// This script will add appropriate classes to personality type titles based on their length
const fs = require('fs');
const path = require('path');

// Directory containing personality type HTML files
const dirPath = __dirname;

// Get all HTML files in the directory
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'mbti.html');
  
  htmlFiles.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Check if the title contains a long personality type name
      const hasLongTitle = data.match(/The (Architect|Commander|Debater|Logician|Advocate|Protagonist|Campaigner|Mediator|Architect|Logistician|Defender|Executive|Consul|Virtuoso|Adventurer|Entrepreneur)/i);
      
      // Add appropriate class based on title length
      let result = data.replace(
        /<h1 class="mbti-title">([^<]+)<\/h1>/,
        (match, title) => {
          const titleClass = hasLongTitle ? 'long' : 'short';
          return `<h1 class="mbti-title ${titleClass}">${title}</h1>`;
        }
      );

      // Write the updated content back to the file
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${file}:`, err);
          return;
        }
        console.log(`Updated ${file} with ${hasLongTitle ? 'long' : 'short'} title class`);
      });
    });
  });
});
