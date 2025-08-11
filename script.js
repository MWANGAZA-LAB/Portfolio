// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Animate skill bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Animate project cards on scroll
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease-in-out;
            max-width: 400px;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add floating animation to hero cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            // Only apply typing effect on desktop
            if (window.innerWidth > 768) {
                typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 30);
            }
        }, 1000);
    }

    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click tracking for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Update toggle button icon based on current theme
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Add click event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    console.log('Portfolio loaded successfully! 🚀');
});

// ===== PROJECT DEMO FUNCTIONALITY =====



// ===== PERFORMANCE MONITORING & ANALYTICS =====

// Performance Metrics
function trackPerformance() {
    if ('performance' in window) {
        // Navigation Timing API
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');
                
                const metrics = {
                    pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
                };
                
                console.log('Performance Metrics:', metrics);
                
                // Send to analytics (if configured)
                if (window.gtag) {
                    gtag('event', 'performance_metrics', metrics);
                }
            }, 0);
        });
        
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}: ${entry.value}`);
                    
                    // Track LCP (Largest Contentful Paint)
                    if (entry.name === 'largest-contentful-paint') {
                        if (window.gtag) {
                            gtag('event', 'largest_contentful_paint', {
                                value: Math.round(entry.startTime)
                            });
                        }
                    }
                    
                    // Track FID (First Input Delay)
                    if (entry.name === 'first-input') {
                        if (window.gtag) {
                            gtag('event', 'first_input_delay', {
                                value: Math.round(entry.processingStart - entry.startTime)
                            });
                        }
                    }
                    
                    // Track CLS (Cumulative Layout Shift)
                    if (entry.name === 'layout-shift') {
                        if (window.gtag) {
                            gtag('event', 'cumulative_layout_shift', {
                                value: entry.value
                            });
                        }
                    }
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }
}

// Error Tracking
function trackErrors() {
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global Error:', event.error);
        
        const errorData = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error?.stack || 'No stack trace',
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        // Send to analytics (if configured)
        if (window.gtag) {
            gtag('event', 'exception', {
                description: errorData.message,
                fatal: false
            });
        }
        
        // Log to console for debugging
        console.error('Error Details:', errorData);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        
        if (window.gtag) {
            gtag('event', 'exception', {
                description: 'Unhandled Promise Rejection',
                fatal: false
            });
        }
    });
}

// User Interaction Tracking
function trackUserInteractions() {
    // Track button clicks
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
            const element = event.target;
            const text = element.textContent?.trim() || element.getAttribute('aria-label') || 'Unknown';
            const href = element.href || 'No URL';
            
            if (window.gtag) {
                gtag('event', 'click', {
                    element_type: element.tagName.toLowerCase(),
                    element_text: text,
                    element_url: href
                });
            }
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', (event) => {
        const form = event.target;
        const formId = form.id || 'Unknown Form';
        
        if (window.gtag) {
            gtag('event', 'form_submit', {
                form_id: formId,
                form_action: form.action || 'No Action'
            });
        }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            // Track at 25%, 50%, 75%, 100%
            if ([25, 50, 75, 100].includes(maxScrollDepth)) {
                if (window.gtag) {
                    gtag('event', 'scroll_depth', {
                        depth: maxScrollDepth
                    });
                }
            }
        }
    });
}

// Page Visibility Tracking
function trackPageVisibility() {
    let hidden, visibilityChange;
    
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    
    document.addEventListener(visibilityChange, () => {
        if (document[hidden]) {
            if (window.gtag) {
                gtag('event', 'page_hide');
            }
        } else {
            if (window.gtag) {
                gtag('event', 'page_show');
            }
        }
    });
}

// Initialize all tracking
function initializeTracking() {
    trackPerformance();
    trackErrors();
    trackUserInteractions();
    trackPageVisibility();
}

// ===== ENHANCED PERFORMANCE MONITORING DASHBOARD =====

// Performance Dashboard Class
class PerformanceDashboard {
    constructor() {
        this.metrics = {
            pageLoad: {},
            coreWebVitals: {},
            userInteractions: {},
            errors: []
        };
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.trackCoreWebVitals();
        this.trackUserInteractions();
        this.trackErrors();
        this.createDashboard();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');
                
                this.metrics.pageLoad = {
                    totalLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    timeToInteractive: this.calculateTTI(),
                    timestamp: Date.now()
                };
                
                this.updateDashboard();
            }, 0);
        });
    }

    calculateTTI() {
        // Estimate Time to Interactive
        const navigation = performance.getEntriesByType('navigation')[0];
        return navigation.loadEventEnd - navigation.fetchStart;
    }

    trackCoreWebVitals() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.coreWebVitals[entry.name] = {
                        value: entry.value || entry.startTime,
                        timestamp: Date.now()
                    };
                    
                    // Track specific metrics
                    if (entry.name === 'largest-contentful-paint') {
                        this.trackMetric('LCP', entry.startTime);
                    } else if (entry.name === 'first-input') {
                        this.trackMetric('FID', entry.processingStart - entry.startTime);
                    } else if (entry.name === 'layout-shift') {
                        this.trackMetric('CLS', entry.value);
                    }
                }
                this.updateDashboard();
            });
            
            observer.observe({ 
                entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
            });
        }
    }

    trackUserInteractions() {
        let interactionCount = 0;
        let lastInteraction = Date.now();
        
        document.addEventListener('click', () => {
            interactionCount++;
            lastInteraction = Date.now();
            this.metrics.userInteractions = {
                count: interactionCount,
                lastInteraction,
                averageTimeBetweenClicks: this.calculateAverageTimeBetweenClicks()
            };
        });
    }

    calculateAverageTimeBetweenClicks() {
        // Implementation for calculating average time between user interactions
        return 0;
    }

    trackErrors() {
        window.addEventListener('error', (event) => {
            this.metrics.errors.push({
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                timestamp: Date.now()
            });
            
            if (this.metrics.errors.length > 10) {
                this.metrics.errors.shift(); // Keep only last 10 errors
            }
            
            this.updateDashboard();
        });
    }

    trackMetric(name, value) {
        if (window.gtag) {
            gtag('event', name.toLowerCase(), {
                value: Math.round(value),
                custom_parameter: 'portfolio_performance'
            });
        }
    }

    createDashboard() {
        // Create performance dashboard element
        const dashboard = document.createElement('div');
        dashboard.id = 'performance-dashboard';
        dashboard.className = 'performance-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h3>🚀 Performance Dashboard</h3>
                <button class="dashboard-toggle">📊</button>
            </div>
            <div class="dashboard-content" style="display: none;">
                <div class="metric-group">
                    <h4>Page Load Metrics</h4>
                    <div class="metric" id="load-metrics">Loading...</div>
                </div>
                <div class="metric-group">
                    <h4>Core Web Vitals</h4>
                    <div class="metric" id="web-vitals">Loading...</div>
                </div>
                <div class="metric-group">
                    <h4>User Interactions</h4>
                    <div class="metric" id="interactions">Loading...</div>
                </div>
                <div class="metric-group">
                    <h4>Error Log</h4>
                    <div class="metric" id="errors">No errors</div>
                </div>
            </div>
        `;
        
        // Add toggle functionality
        const toggle = dashboard.querySelector('.dashboard-toggle');
        const content = dashboard.querySelector('.dashboard-content');
        
        toggle.addEventListener('click', () => {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            toggle.textContent = isVisible ? '📊' : '📈';
        });
        
        // Add to page (only in development mode)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            document.body.appendChild(dashboard);
        }
    }

    updateDashboard() {
        // Update dashboard metrics
        const loadMetrics = document.getElementById('load-metrics');
        const webVitals = document.getElementById('web-vitals');
        const interactions = document.getElementById('interactions');
        const errors = document.getElementById('errors');
        
        if (loadMetrics) {
            loadMetrics.innerHTML = `
                <div class="metric-item">
                    <span>Total Load:</span> 
                    <span class="metric-value">${this.metrics.pageLoad.totalLoadTime?.toFixed(2) || 'N/A'}ms</span>
                </div>
                <div class="metric-item">
                    <span>DOM Ready:</span> 
                    <span class="metric-value">${this.metrics.pageLoad.domContentLoaded?.toFixed(2) || 'N/A'}ms</span>
                </div>
                <div class="metric-item">
                    <span>First Paint:</span> 
                    <span class="metric-value">${this.metrics.pageLoad.firstPaint?.toFixed(2) || 'N/A'}ms</span>
                </div>
            `;
        }
        
        if (webVitals) {
            webVitals.innerHTML = `
                <div class="metric-item">
                    <span>LCP:</span> 
                    <span class="metric-value">${this.metrics.coreWebVitals['largest-contentful-paint']?.value?.toFixed(2) || 'N/A'}ms</span>
                </div>
                <div class="metric-item">
                    <span>FID:</span> 
                    <span class="metric-value">${this.metrics.coreWebVitals['first-input']?.value?.toFixed(2) || 'N/A'}ms</span>
                </div>
                <div class="metric-item">
                    <span>CLS:</span> 
                    <span class="metric-value">${this.metrics.coreWebVitals['layout-shift']?.value?.toFixed(4) || 'N/A'}</span>
                </div>
            `;
        }
        
        if (interactions) {
            interactions.innerHTML = `
                <div class="metric-item">
                    <span>Total Clicks:</span> 
                    <span class="metric-value">${this.metrics.userInteractions.count || 0}</span>
                </div>
                <div class="metric-item">
                    <span>Last Interaction:</span> 
                    <span class="metric-value">${this.metrics.userInteractions.lastInteraction ? new Date(this.metrics.userInteractions.lastInteraction).toLocaleTimeString() : 'N/A'}</span>
                </div>
            `;
        }
        
        if (errors) {
            errors.innerHTML = this.metrics.errors.length > 0 
                ? this.metrics.errors.map(error => `
                    <div class="error-item">
                        <span class="error-time">${new Date(error.timestamp).toLocaleTimeString()}</span>
                        <span class="error-message">${error.message}</span>
                    </div>
                `).join('')
                : '<span class="no-errors">✅ No errors detected</span>';
        }
    }
}

// Initialize Performance Dashboard
let performanceDashboard;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    performanceDashboard = new PerformanceDashboard();
}

// Initialize demos when page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize Bitcoin price
    updateBitcoinPrice();
    setInterval(updateBitcoinPrice, 30000); // Update every 30 seconds
    
    // Add demo event listeners
    const qrInput = document.getElementById('qrInput');
    if (qrInput) {
        qrInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validateBitcoinURL();
            }
        });
    }
    
    const groceryInput = document.getElementById('groceryItem');
    if (groceryInput) {
        groceryInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addGroceryItem();
            }
        });
    }
    
    // Register Service Worker for PWA
    registerServiceWorker();
    
    // Initialize PWA features
    initializePWA();
    
    // Initialize tracking
    initializeTracking();
    
    // Track page view
    if (window.gtag) {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    console.log('Portfolio loaded successfully! 🚀');
});

// ===== ENHANCED PWA FUNCTIONALITY =====

// PWA Manager Class
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.installButton = null;
        this.init();
    }

    init() {
        this.checkInstallationStatus();
        this.setupEventListeners();
        this.createInstallButton();
        this.checkForUpdates();
    }

    checkInstallationStatus() {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('PWA is already installed');
        }
    }

    setupEventListeners() {
        // Listen for beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstallationSuccess();
        });

        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.updateOnlineStatus(true);
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.updateOnlineStatus(false);
        });
    }

    createInstallButton() {
        // Create install button
        this.installButton = document.createElement('button');
        this.installButton.id = 'pwaInstallBtn';
        this.installButton.className = 'pwa-install-btn';
        this.installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
        this.installButton.onclick = () => this.installPWA();
        this.installButton.style.display = 'none';

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(this.installButton);
        }
    }

    showInstallButton() {
        if (this.installButton && !this.isInstalled) {
            this.installButton.style.display = 'flex';
            this.installButton.classList.add('pulse');
            
            // Auto-hide after 30 seconds
            setTimeout(() => {
                this.hideInstallButton();
            }, 30000);
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            this.installButton.style.display = 'none';
            this.installButton.classList.remove('pulse');
        }
    }

    async installPWA() {
        if (this.deferredPrompt) {
            try {
                this.deferredPrompt.prompt();
                const choiceResult = await this.deferredPrompt.userChoice;
                
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    this.showNotification('Installing PWA...', 'info');
                } else {
                    console.log('User dismissed the install prompt');
                    this.showNotification('Installation cancelled', 'warning');
                }
                
                this.deferredPrompt = null;
                this.hideInstallButton();
            } catch (error) {
                console.error('Installation failed:', error);
                this.showNotification('Installation failed', 'error');
            }
        } else {
            this.showNotification('Installation not available', 'warning');
        }
    }

    showInstallationSuccess() {
        this.showNotification('🎉 PWA installed successfully!', 'success');
        
        // Show welcome message
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 1000);
    }

    showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.className = 'welcome-message';
        welcome.innerHTML = `
            <div class="welcome-content">
                <h3>🎉 Welcome to CMO Portfolio!</h3>
                <p>Your portfolio is now installed as a PWA. Enjoy offline access and app-like experience!</p>
                <div class="welcome-features">
                    <div class="feature">
                        <i class="fas fa-wifi-slash"></i>
                        <span>Offline Access</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-home"></i>
                        <span>Home Screen</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bell"></i>
                        <span>Push Notifications</span>
                    </div>
                </div>
                <button class="welcome-close">Got it!</button>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        // Add close functionality
        const closeBtn = welcome.querySelector('.welcome-close');
        closeBtn.addEventListener('click', () => {
            welcome.remove();
        });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.remove();
            }
        }, 10000);
    }

    updateOnlineStatus(isOnline) {
        const status = document.getElementById('online-status');
        if (status) {
            status.textContent = isOnline ? '🟢 Online' : '🔴 Offline';
            status.className = isOnline ? 'online' : 'offline';
        }
        
        // Show offline notification
        if (!isOnline) {
            this.showNotification('You are now offline. Some features may be limited.', 'warning');
        }
    }

    async syncOfflineData() {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            try {
                // Register background sync
                const registration = await navigator.serviceWorker.ready;
                await registration.sync.register('background-sync');
                console.log('Background sync registered');
                
                // Sync contact forms
                await registration.sync.register('contact-form-sync');
                console.log('Contact form sync registered');
            } catch (error) {
                console.error('Background sync registration failed:', error);
            }
        }
    }

    checkForUpdates() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('New service worker activated');
                this.showUpdateNotification();
            });
        }
    }

    showUpdateNotification() {
        const updateNotification = document.createElement('div');
        updateNotification.className = 'update-notification';
        updateNotification.innerHTML = `
            <div class="update-content">
                <span>🔄 New version available!</span>
                <button onclick="pwaManager.updatePWA()" class="update-btn">Update</button>
                <button onclick="pwaManager.dismissUpdate()" class="dismiss-btn">×</button>
            </div>
        `;
        
        document.body.appendChild(updateNotification);
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (updateNotification.parentNode) {
                updateNotification.remove();
            }
        }, 15000);
    }

    async updatePWA() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration && registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    this.showNotification('Updating PWA...', 'info');
                    
                    // Reload after a short delay
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error('Update failed:', error);
                this.showNotification('Update failed', 'error');
            }
        }
    }

    dismissUpdate() {
        const notification = document.querySelector('.update-notification');
        if (notification) {
            notification.remove();
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.pwa-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `pwa-notification pwa-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // PWA Status Methods
    getPWAStatus() {
        return {
            isInstalled: this.isInstalled,
            hasServiceWorker: 'serviceWorker' in navigator,
            isOnline: navigator.onLine,
            canInstall: !!this.deferredPrompt
        };
    }

    // Cache Management
    async clearCache() {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
                this.showNotification('Cache cleared successfully', 'success');
                return true;
            } catch (error) {
                console.error('Cache clearing failed:', error);
                this.showNotification('Cache clearing failed', 'error');
                return false;
            }
        }
        return false;
    }

    // Offline Data Management
    async getOfflineData() {
        if ('indexedDB' in window) {
            // Implementation for getting offline data
            return [];
        }
        return [];
    }

    async clearOfflineData() {
        if ('indexedDB' in window) {
            // Implementation for clearing offline data
            this.showNotification('Offline data cleared', 'success');
            return true;
        }
        return false;
    }
}

// Initialize PWA Manager
let pwaManager;
if ('serviceWorker' in navigator) {
    pwaManager = new PWAManager();
}

// ===== ENHANCED SERVICE WORKER REGISTRATION =====

// Service Worker Manager
class ServiceWorkerManager {
    constructor() {
        this.registration = null;
        this.isSupported = 'serviceWorker' in navigator;
        this.init();
    }

    async init() {
        if (this.isSupported) {
            try {
                await this.registerServiceWorker();
                this.setupEventListeners();
                this.checkForUpdates();
            } catch (error) {
                console.error('Service Worker initialization failed:', error);
            }
        } else {
            console.log('Service Worker not supported');
        }
    }

    async registerServiceWorker() {
        try {
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully:', this.registration);

            // Wait for the service worker to be ready
            await navigator.serviceWorker.ready;
            console.log('Service Worker is ready');

            // Check if there's already a controller
            if (navigator.serviceWorker.controller) {
                console.log('Service Worker is already controlling the page');
            }

            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Listen for service worker updates
        this.registration.addEventListener('updatefound', () => {
            console.log('Service Worker update found');
            const newWorker = this.registration.installing;
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New Service Worker installed, waiting for activation');
                    this.showUpdateNotification();
                }
            });
        });

        // Listen for service worker state changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service Worker controller changed');
            this.onControllerChange();
        });

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
            this.handleServiceWorkerMessage(event);
        });

        // Listen for service worker errors
        navigator.serviceWorker.addEventListener('error', (event) => {
            console.error('Service Worker error:', event);
            this.handleServiceWorkerError(event);
        });
    }

    async checkForUpdates() {
        if (this.registration) {
            try {
                await this.registration.update();
                console.log('Service Worker update check completed');
            } catch (error) {
                console.error('Service Worker update check failed:', error);
            }
        }
    }

    showUpdateNotification() {
        if (pwaManager) {
            pwaManager.showUpdateNotification();
        }
    }

    onControllerChange() {
        // Reload the page to use the new service worker
        console.log('Reloading page to use new Service Worker');
        window.location.reload();
    }

    handleServiceWorkerMessage(event) {
        const { type, data } = event.data;
        
        switch (type) {
            case 'CACHE_UPDATED':
                console.log('Cache updated:', data);
                this.showCacheUpdateNotification(data);
                break;
            case 'OFFLINE_DATA_SYNCED':
                console.log('Offline data synced:', data);
                this.showSyncNotification(data);
                break;
            case 'BACKGROUND_SYNC_COMPLETED':
                console.log('Background sync completed:', data);
                this.showBackgroundSyncNotification(data);
                break;
            case 'PUSH_NOTIFICATION_RECEIVED':
                console.log('Push notification received:', data);
                this.showPushNotification(data);
                break;
            default:
                console.log('Unknown service worker message:', event.data);
        }
    }

    handleServiceWorkerError(error) {
        console.error('Service Worker error occurred:', error);
        
        // Show error notification to user
        if (pwaManager) {
            pwaManager.showNotification('Service Worker error occurred', 'error');
        }
        
        // Attempt to re-register service worker
        setTimeout(() => {
            this.registerServiceWorker();
        }, 5000);
    }

    showCacheUpdateNotification(data) {
        if (pwaManager) {
            pwaManager.showNotification(`Cache updated: ${data.filesUpdated} files`, 'info');
        }
    }

    showSyncNotification(data) {
        if (pwaManager) {
            pwaManager.showNotification(`Offline data synced: ${data.itemsSynced} items`, 'success');
        }
    }

    showBackgroundSyncNotification(data) {
        if (pwaManager) {
            pwaManager.showNotification(`Background sync completed: ${data.syncType}`, 'success');
        }
    }

    showPushNotification(data) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(data.title, {
                body: data.body,
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png',
                tag: 'portfolio-notification'
            });
        }
    }

    // Background Sync Methods
    async registerBackgroundSync(tag, options = {}) {
        if (this.registration && 'sync' in this.registration) {
            try {
                await this.registration.sync.register(tag, options);
                console.log(`Background sync registered: ${tag}`);
                return true;
            } catch (error) {
                console.error(`Background sync registration failed: ${tag}`, error);
                return false;
            }
        }
        return false;
    }

    async registerPeriodicSync(tag, options = {}) {
        if (this.registration && 'periodicSync' in this.registration) {
            try {
                await this.registration.periodicSync.register(tag, options);
                console.log(`Periodic sync registered: ${tag}`);
                return true;
            } catch (error) {
                console.error(`Periodic sync registration failed: ${tag}`, error);
                return false;
            }
        }
        return false;
    }

    // Push Notification Methods
    async requestNotificationPermission() {
        if ('Notification' in window) {
            try {
                const permission = await Notification.requestPermission();
                console.log('Notification permission:', permission);
                return permission === 'granted';
            } catch (error) {
                console.error('Notification permission request failed:', error);
                return false;
            }
        }
        return false;
    }

    async subscribeToPushNotifications() {
        if (this.registration && 'pushManager' in this.registration) {
            try {
                const subscription = await this.registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
                });
                
                console.log('Push notification subscription:', subscription);
                return subscription;
            } catch (error) {
                console.error('Push notification subscription failed:', error);
                return null;
            }
        }
        return null;
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // Service Worker Status Methods
    getServiceWorkerStatus() {
        return {
            isSupported: this.isSupported,
            isRegistered: !!this.registration,
            isActive: !!navigator.serviceWorker.controller,
            scope: this.registration ? this.registration.scope : null,
            hasUpdate: false // This would need to be tracked separately
        };
    }

    // Unregister Service Worker (for testing/debugging)
    async unregister() {
        if (this.registration) {
            try {
                const unregistered = await this.registration.unregister();
                console.log('Service Worker unregistered:', unregistered);
                return unregistered;
            } catch (error) {
                console.error('Service Worker unregistration failed:', error);
                return false;
            }
        }
        return false;
    }
}

// Initialize Service Worker Manager
let serviceWorkerManager;
if ('serviceWorker' in navigator) {
    serviceWorkerManager = new ServiceWorkerManager();
}

// ===== ENHANCED CONTACT FORM WITH OFFLINE SUPPORT =====

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = null;
        this.offlineQueue = [];
        this.isOnline = navigator.onLine;
        
        // EmailJS Configuration
        this.emailjsConfig = {
            serviceId: 'service_xxxxxxx', // You'll need to replace this with your actual EmailJS service ID
            templateId: 'template_xxxxxxx', // You'll need to replace this with your actual EmailJS template ID
            userId: 'user_xxxxxxx', // You'll need to replace this with your actual EmailJS user ID
            recipientEmail: 'mwanga02717@gmail.com' // Your email address
        };
        
        this.init();
    }

    initEmailJS() {
        // Initialize EmailJS with your user ID
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.emailjsConfig.userId);
            console.log('EmailJS initialized successfully');
            
            // Test EmailJS connection
            this.testEmailJSConnection();
        } else {
            console.warn('EmailJS not loaded. Contact form will use offline mode.');
        }
    }

    async testEmailJSConnection() {
        try {
            // Test if EmailJS is properly configured
            console.log('EmailJS Configuration:', {
                serviceId: this.emailjsConfig.serviceId,
                templateId: this.emailjsConfig.templateId,
                userId: this.emailjsConfig.userId,
                recipientEmail: this.emailjsConfig.recipientEmail
            });
            
            // Check if EmailJS is ready
            if (emailjs.isReady()) {
                console.log('✅ EmailJS is ready and configured');
            } else {
                console.warn('⚠️ EmailJS is not ready yet');
            }
        } catch (error) {
            console.error('❌ EmailJS connection test failed:', error);
        }
    }

    init() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.setupForm();
            this.setupOfflineSupport();
        }
    }

    setupForm() {
        // Enhanced form validation
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Auto-save form data
        this.form.addEventListener('input', () => this.autoSaveForm());
        
        // Load saved form data
        this.loadSavedFormData();
    }

    setupOfflineSupport() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processOfflineQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return false;
        }

        const formData = new FormData(this.form);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            online: this.isOnline
        };

        try {
            if (this.isOnline) {
                await this.submitFormOnline(contactData);
            } else {
                await this.queueFormOffline(contactData);
            }
        } catch (error) {
            console.error('Form submission failed:', error);
            this.showFormError('Form submission failed. Please try again.');
        }
    }

    async submitFormOnline(contactData) {
        // Show loading state
        this.showFormLoading(true);
        
        try {
            // Use EmailJS to send email
            if (typeof emailjs !== 'undefined') {
                // Check if EmailJS is properly configured
                if (this.emailjsConfig.serviceId === 'service_xxxxxxx' || 
                    this.emailjsConfig.templateId === 'template_xxxxxxx' || 
                    this.emailjsConfig.userId === 'user_xxxxxxx') {
                    throw new Error('EmailJS not configured. Please update the configuration with your actual EmailJS credentials.');
                }

                const templateParams = {
                    to_email: this.emailjsConfig.recipientEmail,
                    from_name: contactData.name,
                    from_email: contactData.email,
                    subject: contactData.subject,
                    message: contactData.message,
                    timestamp: contactData.timestamp
                };

                console.log('Sending email via EmailJS with params:', templateParams);

                const response = await emailjs.send(
                    this.emailjsConfig.serviceId,
                    this.emailjsConfig.templateId,
                    templateParams
                );

                if (response.status === 200) {
                    this.showFormSuccess('Thank you! Your message has been sent successfully to mwanga02717@gmail.com.');
                    this.clearForm();
                    this.clearSavedFormData();
                    
                    // Track successful submission
                    this.trackFormSubmission(contactData, true);
                } else {
                    throw new Error(`EmailJS Error: ${response.status}`);
                }
            } else {
                throw new Error('EmailJS not available');
            }
        } catch (error) {
            console.error('Email submission failed:', error);
            
            // Fallback to offline queue
            await this.queueFormOffline(contactData);
            this.showFormWarning('Message queued for offline submission. Will send when online.');
        } finally {
            this.showFormLoading(false);
        }
    }

    async queueFormOffline(contactData) {
        // Add to offline queue
        this.offlineQueue.push(contactData);
        
        // Save to local storage
        this.saveOfflineQueue();
        
        // Register background sync if available
        if (serviceWorkerManager) {
            await serviceWorkerManager.registerBackgroundSync('contact-form-sync');
        }
        
        // Show offline notification
        this.showFormInfo('Message saved offline. Will send when connection is restored.');
        
        // Track offline submission
        this.trackFormSubmission(contactData, false);
    }

    async processOfflineQueue() {
        if (this.offlineQueue.length === 0) return;

        console.log(`Processing ${this.offlineQueue.length} offline messages`);
        
        const queue = [...this.offlineQueue];
        this.offlineQueue = [];
        this.saveOfflineQueue();

        let successCount = 0;
        let errorCount = 0;

        for (const contactData of queue) {
            try {
                await this.submitFormOnline(contactData);
                successCount++;
            } catch (error) {
                console.error('Failed to process offline message:', error);
                errorCount++;
                // Re-queue failed messages
                this.offlineQueue.push(contactData);
            }
        }

        this.saveOfflineQueue();

        // Show results
        if (successCount > 0) {
            this.showFormSuccess(`${successCount} offline messages sent successfully!`);
        }
        if (errorCount > 0) {
            this.showFormWarning(`${errorCount} messages failed to send and remain queued.`);
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Length validation
        if (fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        if (fieldName === 'subject' && value.length < 3) {
            isValid = false;
            errorMessage = 'Subject must be at least 3 characters long.';
        }

        // Show error if validation failed
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    getFieldLabel(field) {
        const label = field.previousElementSibling;
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    showFormLoading(show) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        
        if (show) {
            submitBtn.dataset.originalText = originalText;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        } else {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showFormSuccess(message) {
        this.showFormMessage(message, 'success');
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    showFormWarning(message) {
        this.showFormMessage(message, 'warning');
    }

    showFormInfo(message) {
        this.showFormMessage(message, 'info');
    }

    showFormMessage(message, type) {
        // Remove existing messages
        const existingMessages = this.form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${this.getMessageIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Insert before form
        this.form.parentNode.insertBefore(messageElement, this.form);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 8000);
    }

    getMessageIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    clearForm() {
        this.form.reset();
        this.clearFieldErrors();
    }

    clearFieldErrors() {
        const errorElements = this.form.querySelectorAll('.field-error');
        errorElements.forEach(element => element.remove());
        
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    // Auto-save functionality
    autoSaveForm() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        localStorage.setItem('contactFormDraft', JSON.stringify(data));
    }

    loadSavedFormData() {
        const saved = localStorage.getItem('contactFormDraft');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.keys(data).forEach(key => {
                    const field = this.form.querySelector(`[name="${key}"]`);
                    if (field) {
                        field.value = data[key];
                    }
                });
                
                // Show restore notification
                this.showFormInfo('Previous form data restored. You can continue where you left off.');
            } catch (error) {
                console.error('Failed to load saved form data:', error);
            }
        }
    }

    clearSavedFormData() {
        localStorage.removeItem('contactFormDraft');
    }

    // Offline queue management
    saveOfflineQueue() {
        localStorage.setItem('contactFormOfflineQueue', JSON.stringify(this.offlineQueue));
    }

    loadOfflineQueue() {
        const saved = localStorage.getItem('contactFormOfflineQueue');
        if (saved) {
            try {
                this.offlineQueue = JSON.parse(saved);
                console.log(`Loaded ${this.offlineQueue.length} offline messages`);
            } catch (error) {
                console.error('Failed to load offline queue:', error);
                this.offlineQueue = [];
            }
        }
    }

    // Analytics tracking
    trackFormSubmission(data, isOnline) {
        // Track form submission in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: isOnline ? 'Online' : 'Offline',
                value: 1
            });
        }

        // Track in performance dashboard if available
        if (window.performanceDashboard) {
            window.performanceDashboard.trackUserInteraction('contact_form_submit', {
                online: isOnline,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Get form statistics
    getFormStats() {
        return {
            totalSubmissions: this.getTotalSubmissions(),
            offlineQueueLength: this.offlineQueue.length,
            lastSubmission: this.getLastSubmission(),
            averageResponseTime: this.getAverageResponseTime()
        };
    }

    getTotalSubmissions() {
        // This would typically come from analytics or backend
        return parseInt(localStorage.getItem('contactFormTotalSubmissions') || '0');
    }

    getLastSubmission() {
        return localStorage.getItem('contactFormLastSubmission') || null;
    }

    getAverageResponseTime() {
        // This would typically come from analytics or backend
        return 0;
    }
}

// Initialize Contact Form Manager
let contactFormManager;
document.addEventListener('DOMContentLoaded', () => {
    contactFormManager = new ContactFormManager();
});
