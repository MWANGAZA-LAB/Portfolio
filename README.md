# CMO Portfolio

> Professional software developer portfolio showcasing modern web development skills

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen.svg)](https://mwangaza-lab.github.io/Portfolio/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://web.dev/progressive-web-apps/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

## Live Portfolio
**[View Live Portfolio](https://mwangaza-lab.github.io/Portfolio/)**

## About Me
**Collins Mwanga Okoth (CMO)** - Software Developer based in Nairobi, Kenya 🇰🇪

Specializing in Bitcoin/cryptocurrency applications, AI-powered chatbots, and web platforms optimized for African markets.

## Features
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark/Light Mode** - Persistent theme preference
- **Fully Responsive** - Mobile-first design
- **Accessible** - WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **PWA Ready** - Installable, offline-capable Progressive Web App
- **Contact Form** - Integrated with EmailJS for reliable messaging
- **Offline Support** - Service Worker with intelligent caching
- **Performance Optimized** - Fast loading and smooth interactions

## Skills
- **Languages**: Python, JavaScript, TypeScript
- **Frameworks**: FastAPI, Next.js, React
- **Database**: PostgreSQL, SQLAlchemy, Prisma
- **Specialized**: Bitcoin APIs, Lightning Network, OpenAI
- **PWA**: Service Workers, Offline Capabilities
- **Tools**: Git, VS Code, Modern Workflows

## Projects
- **[Privacy Jenga](https://github.com/MWANGAZA-LAB/Privacy-Jenga)** - Bitcoin privacy education game
- **[BitMshauri Bot](https://github.com/MWANGAZA-LAB/bitmshauri-bot)** - Swahili Bitcoin chatbot
- **[Twiga Scan](https://github.com/MWANGAZA-LAB/twiga-scan)** - Bitcoin QR authentication
- **[SnakeSats](https://github.com/MWANGAZA-LAB/snakesats)** - Bitcoin investment game
- **[My-Grocery](https://github.com/MWANGAZA-LAB/my-grocery)** - Real-time grocery list app

## Setup Instructions

### Prerequisites
- Modern web browser
- Git
- (Optional) Local web server for development

### Quick Start
```bash
# Clone the repository
git clone https://github.com/MWANGAZA-LAB/Portfolio.git
cd Portfolio

# Open in your browser
# Simply open index.html in your web browser
# Or use a local server (recommended):
```

### Using a Local Server

**Python:**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

**Node.js (with http-server):**
```bash
npx http-server -p 8000
# Visit http://localhost:8000
```

**VS Code:**
Use the Live Server extension for instant development server.

### EmailJS Configuration

To enable the contact form:

1. **Sign up at [EmailJS](https://www.emailjs.com/)**

2. **Create your email service and template**

3. **Copy `config.example.js` to `config.js`:**
   ```bash
   cp config.example.js config.js
   ```

4. **Update `config.js` with your credentials:**
   ```javascript
   const emailjsConfig = {
       serviceId: 'your_service_id',
       templateId: 'your_template_id',
       userId: 'your_public_key',
       recipientEmail: 'your_email@example.com'
   };
   ```

5. **The file `config.js` is gitignored** for security

**Note:** The portfolio will work without EmailJS configuration, but the contact form will queue messages for offline submission.

## Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── styles.css              # Comprehensive styling
├── script.js               # JavaScript functionality
├── sw.js                   # Service Worker for PWA
├── manifest.json           # PWA manifest
├── config.example.js       # EmailJS config template
├── config.js               # Your EmailJS credentials (gitignored)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── .gitignore              # Git ignore rules
├── favicon-*.svg           # Favicon files
├── icon-*.svg              # PWA icons
└── README.md               # This file
```

## Key Technologies

- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Modern styling with CSS custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Service Workers** - Offline functionality
- **EmailJS** - Contact form integration
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typography

## Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Skip-to-main-content link
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ High contrast themes
- ✅ Responsive text sizing

## Security

- EmailJS credentials stored in separate config file
- Config file excluded from version control
- HTTPS recommended for production
- Content Security Policy ready
- Input sanitization on forms

## Contact
- **Portfolio**: [mwangaza-lab.github.io/Portfolio](https://mwangaza-lab.github.io/Portfolio/)
- **GitHub**: [@MWANGAZA-LAB](https://github.com/MWANGAZA-LAB)
- **Twitter**: [@MWANGAZALAB254](https://twitter.com/MWANGAZALAB254)
- **WhatsApp**: [+254 712 826 551](https://wa.me/254712826551)
- **Location**: Nairobi, Kenya 🇰🇪

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- EmailJS for email service
- GitHub Pages for hosting

---

**Built with ❤️ by Collins Mwanga Okoth (CMO)**

*Last updated: November 14, 2025*
