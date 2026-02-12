# React Portfolio - Developer CV

A modern, responsive portfolio website built with React, combining elegant design with smooth animations and interactive features.

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with gradient effects and smooth animations
- **🌓 Dark/Light Mode**: Toggle between dark and light themes
- **🌍 Bilingual**: Support for English and Arabic (RTL)
- **📱 Fully Responsive**: Works perfectly on all devices
- **⚡ Interactive Sections**:
  - Hero section with typing animation
  - About with animated statistics
  - Skills with animated progress bars
  - Experience timeline
  - Project showcase
  - Contact form
- **🎭 Smooth Animations**: Floating elements, particle effects, and smooth transitions
- **♿ Accessible**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### Option 1: Simple HTML Setup (Recommended for Demo)

1. Place both files (`index.html` and `portfolio.jsx`) in the same folder
2. Open `index.html` in a modern web browser
3. That's it! The portfolio is ready to use

### Option 2: With a Development Server

```bash
# If you have Python installed:
python -m http.server 8000

# If you have Node.js installed:
npx serve
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML file
├── portfolio.jsx    # React component with all functionality
└── README.md        # This file
```

## 🎯 Customization Guide

### 1. Personal Information

Edit the following sections in `portfolio.jsx`:

```javascript
// Hero Section (line ~230)
const fullText = 'Your Name';  // Change to your name

// Hero description (line ~260)
'Your professional tagline here'

// Social links (line ~280)
{['GitHub', 'LinkedIn', 'Twitter', 'Email'].map(...)}
```

### 2. About Section (line ~380)

Update the stats and description:

```javascript
const stats = [
    { count: 50, label: 'Projects' },
    { count: 5, label: 'Years Experience' },
    { count: 30, label: 'Happy Clients' }
];
```

### 3. Skills Section (line ~460)

Modify skill categories and percentages:

```javascript
const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', percent: 95 },
            // Add your skills here
        ]
    }
];
```

### 4. Experience Section (line ~570)

Add your work experience:

```javascript
const experiences = [
    {
        year: '2022 - Present',
        title: 'Your Job Title',
        company: 'Company Name',
        description: 'What you do...',
        // ...
    }
];
```

### 5. Projects Section (line ~670)

Showcase your projects:

```javascript
const projects = [
    {
        icon: '🚀',
        title: 'Project Name',
        description: 'Project description...',
        tags: ['React', 'Node.js']
    }
];
```

### 6. Contact Information (line ~780)

Update contact details:

```javascript
{ icon: '✉️', label: 'Email', value: 'your@email.com' },
{ icon: '📱', label: 'Phone', value: '+1234567890' },
```

## 🎨 Color Customization

Edit CSS variables in the styles section (line ~900):

```css
:root {
    --primary: #c084fc;      /* Purple */
    --secondary: #a78bfa;    /* Light purple */
    --accent: #fbbf24;       /* Yellow */
    --cyan: #67e8f9;         /* Cyan */
    /* ... more colors */
}
```

## 🔧 Advanced Usage

### Converting to a React App

To use this in a Create React App or Next.js project:

1. Install dependencies:
```bash
npm install react react-dom
```

2. Copy the component code from `portfolio.jsx`

3. Split the component into separate files if needed:
   - `Portfolio.jsx` - Main component
   - `Header.jsx` - Navigation
   - `HeroSection.jsx` - Hero
   - etc.

4. Move styles to a separate CSS file or use CSS-in-JS

### Adding More Features

The component is modular and easy to extend:

- Add new sections by creating new components
- Modify animations in the CSS
- Add more interactive features
- Integrate with a backend API for dynamic content

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. Some ideas:

- Add more sections (testimonials, blog, etc.)
- Integrate with a CMS
- Add form validation
- Connect contact form to an email service
- Add more animations
- Create additional themes

## 📝 License

This portfolio template is free to use for personal and commercial projects.

## 🙏 Credits

Built with:
- React 18
- Modern CSS with custom properties
- Google Fonts (Plus Jakarta Sans, Fira Code)
- Pure CSS animations

---

**Made with ❤️ and ☕**

For questions or suggestions, feel free to reach out!
