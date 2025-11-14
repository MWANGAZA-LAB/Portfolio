/**
 * EmailJS Configuration Template
 * 
 * SECURITY NOTE: This file contains placeholder values.
 * For production:
 * 1. Copy this file to 'config.js'
 * 2. Replace placeholder values with your actual EmailJS credentials
 * 3. Add 'config.js' to .gitignore to keep credentials private
 * 4. Consider using a backend proxy for additional security
 * 
 * Get your credentials from: https://dashboard.emailjs.com/
 */

const emailjsConfig = {
    serviceId: 'YOUR_SERVICE_ID',        // Replace with your EmailJS service ID
    templateId: 'YOUR_TEMPLATE_ID',      // Replace with your EmailJS template ID
    userId: 'YOUR_PUBLIC_KEY',           // Replace with your EmailJS public key
    recipientEmail: 'mwanga02717@gmail.com'  // Replace with your email address
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailjsConfig;
}
