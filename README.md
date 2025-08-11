# CMO Portfolio - Software Developer

> **Professional software developer portfolio showcasing modern web development skills and PWA expertise**

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen.svg)](https://mwangaza-lab.github.io/Portfolio/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://web.dev/progressive-web-apps/)
[![Performance](https://img.shields.io/badge/Performance-Optimized-orange.svg)](https://web.dev/performance/)

## **Live Portfolio**
**[🌐 View Live Portfolio](https://mwangaza-lab.github.io/Portfolio/)**

## 👨‍💻 **About Me**
I'm **Collins Mwanga Okoth (CMO)**, a **Software Developer** based in **Nairobi, Kenya** 🇰🇪, passionate about creating cutting-edge financial technology solutions. I specialize in **Bitcoin and cryptocurrency applications**, AI-powered chatbots, and building production-ready web platforms optimized for African markets.

## ✨ **Skills & Technologies**
- **Programming Languages**: Python, JavaScript, TypeScript
- **Frameworks & Libraries**: FastAPI, Next.js, React
- **Database & Tools**: PostgreSQL, SQLAlchemy, Prisma
- **Specialized Technologies**: Bitcoin APIs, Lightning Network, OpenAI Integration
- **PWA Development**: Service Workers, Web App Manifest, Offline Capabilities
- **Performance**: Core Web Vitals, Optimization, Monitoring
- **Design**: Responsive Design, UI/UX, Accessibility
- **Tools**: Git, VS Code, Modern Development Workflows

## **Portfolio Features**
- **Progressive Web App** with native app experience
- **Performance Optimized** with real-time monitoring
- **Offline-First** architecture with intelligent caching
- **Responsive Design** for all devices
- **Modern Architecture** with ES6+ and modular code
- **Dark/Light Theme Toggle** for optimal viewing experience
- **Bitcoin & Fintech Focus** showcasing specialized expertise
- **African Market Optimization** with mobile-first design

## 🚀 **Featured Projects**
- **[Brenda Cereals E-commerce](https://github.com/MWANGAZA-LAB/brenda-cereals)** - Full-featured e-commerce platform with M-Pesa and Bitcoin payment integration
- **[BitMshauri Bot](https://github.com/MWANGAZA-LAB/bitmshauri-bot)** - Swahili Bitcoin educational chatbot with AI-powered Q&A
- **[Twiga Scan](https://github.com/MWANGAZA-LAB/twiga-scan)** - Bitcoin/Lightning QR authentication platform with live price tracking
- **[SnakeSats](https://github.com/MWANGAZA-LAB/snakesats)** - Educational Bitcoin investment game teaching crypto best practices
- **[My-Grocery](https://github.com/MWANGAZA-LAB/my-grocery)** - Collaborative grocery list app with real-time synchronization

## **Quick Start**
```bash
git clone https://github.com/MWANGAZA-LAB/Portfolio.git
cd Portfolio
# Open index.html in your browser
```

## **PWA Installation**
1. Visit the portfolio in a supported browser
2. Click the install button or use browser prompt
3. Enjoy the native app experience!

## 📧 **Contact Form Email Setup**
The contact form is configured to send emails directly to **mwanga02717@gmail.com** using EmailJS. To complete the setup:

### **Step 1: Create EmailJS Account**
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up
2. Verify your email address

### **Step 2: Create Email Service**
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your **mwanga02717@gmail.com** account
5. Copy the **Service ID** (e.g., `service_abc123`)

### **Step 3: Create Email Template**
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:
   ```
   To: {{to_email}}
   From: {{from_name}} ({{from_email}})
   Subject: Portfolio Contact: {{subject}}
   
   Message:
   {{message}}
   
   Timestamp: {{timestamp}}
   ```
4. Copy the **Template ID** (e.g., `template_xyz789`)

### **Step 4: Get User ID**
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (e.g., `user_def456`)

### **Step 5: Update Configuration**
In `script.js`, update the `emailjsConfig` object:
```javascript
this.emailjsConfig = {
    serviceId: 'service_abc123',     // Your actual service ID
    templateId: 'template_xyz789',   // Your actual template ID
    userId: 'user_def456',          // Your actual user ID
    recipientEmail: 'mwanga02717@gmail.com'
};
```

### **Step 6: Test the Form**
1. Fill out the contact form
2. Submit and check your email
3. Check browser console for EmailJS status

### **Troubleshooting**
- **"EmailJS not configured"**: Update the configuration in `script.js` with your actual credentials
- **"Message queued for offline submission"**: Check EmailJS configuration and internet connection
- **Console errors**: Ensure EmailJS CDN is loaded and credentials are correct
- **Gmail connection issues**: Enable "Less secure app access" or use App Passwords

## 🏆 **Expertise & Achievements**
- **9+ Projects** completed and deployed
- **5+ Technologies** mastered across the stack
- **100% Production Ready** applications
- **Bitcoin Integration** specialist for African markets
- **AI Chatbots** development with OpenAI integration
- **Mobile-First** design approach for optimal user experience

## 📧 **Get In Touch**
- **Portfolio**: [mwangaza-lab.github.io/Portfolio](https://mwangaza-lab.github.io/Portfolio/)
- **GitHub**: [@MWANGAZALAB254](https://github.com/MWANGAZA-LAB)
- **Twitter**: [@MWANGAZALAB254](https://twitter.com/MWANGAZALAB254)
- **WhatsApp**: [+254 712 826 551](https://wa.me/254712826551)
- **Location**: Nairobi, Kenya 🇰🇪

---

**Built with ❤️ by Collins Mwanga Okoth (CMO) - Software Developer**

*Last updated: December 2024*
