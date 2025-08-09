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
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
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

// Twiga Scan Demo Functions
function validateBitcoinURL() {
    const input = document.getElementById('qrInput').value.trim();
    const resultDiv = document.getElementById('validationResult');
    
    if (!input) {
        showValidationResult('Please enter a URL or QR data', 'error');
        return;
    }
    
    // Bitcoin URL patterns
    const patterns = {
        bitcoin: /^bitcoin:[13][a-km-zA-HJ-NP-Z1-9]{25,34}/,
        lightning: /^(lnbc|lnbcrt|lnbc|lnsb|lntb)[a-zA-Z0-9]{1,190}$/,
        lnurl: /^lnurl[a-zA-Z0-9]{1,190}$/,
        bip21: /^bitcoin:[13][a-km-zA-HJ-NP-Z1-9]{25,34}\?amount=\d+(\.\d+)?&label=.+/
    };
    
    let isValid = false;
    let type = '';
    
    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.test(input)) {
            isValid = true;
            type = key;
            break;
        }
    }
    
    if (isValid) {
        showValidationResult(`✅ Valid ${type} format detected!`, 'success');
    } else {
        showValidationResult('❌ Invalid Bitcoin/Lightning format', 'error');
    }
}

function showValidationResult(message, type) {
    const resultDiv = document.getElementById('validationResult');
    resultDiv.textContent = message;
    resultDiv.className = `validation-result ${type}`;
}

// Bitcoin Price Display
async function updateBitcoinPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,kes');
        const data = await response.json();
        const btcPrice = document.getElementById('btcPrice');
        
        if (data.bitcoin) {
            const usd = data.bitcoin.usd;
            const eur = data.bitcoin.eur;
            const kes = data.bitcoin.kes || (usd * 100); // Approximate KES rate
            
            btcPrice.innerHTML = `
                <div>$${usd.toLocaleString()}</div>
                <div style="font-size: 0.8em; color: var(--text-secondary);">
                    €${eur.toLocaleString()} | KES ${kes.toLocaleString()}
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('btcPrice').textContent = 'Price unavailable';
    }
}

// SnakeSats Game Demo
let snakeGame = null;
let gameInterval = null;
let gamePaused = false;

function startSnakeGame() {
    if (gameInterval) return;
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('gameScore');
    
    // Game state
    snakeGame = {
        snake: [{x: 150, y: 150}],
        food: {x: 50, y: 50},
        direction: 'right',
        score: 0,
        gridSize: 10
    };
    
    // Generate food
    generateFood();
    
    // Start game loop
    gameInterval = setInterval(() => {
        if (!gamePaused) {
            updateGame();
            drawGame(ctx);
        }
    }, 150);
    
    // Keyboard controls
    document.addEventListener('keydown', handleGameKeyPress);
    
    // Update score
    scoreElement.textContent = snakeGame.score;
}

function pauseSnakeGame() {
    gamePaused = !gamePaused;
    const pauseBtn = event.target;
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
}

function generateFood() {
    const canvas = document.getElementById('snakeCanvas');
    snakeGame.food = {
        x: Math.floor(Math.random() * (canvas.width / snakeGame.gridSize)) * snakeGame.gridSize,
        y: Math.floor(Math.random() * (canvas.height / snakeGame.gridSize)) * snakeGame.gridSize
    };
}

function updateGame() {
    const head = {...snakeGame.snake[0]};
    
    // Move head
    switch(snakeGame.direction) {
        case 'up': head.y -= snakeGame.gridSize; break;
        case 'down': head.y += snakeGame.gridSize; break;
        case 'left': head.x -= snakeGame.gridSize; break;
        case 'right': head.x += snakeGame.gridSize; break;
    }
    
    // Check collision with walls
    if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) {
        gameOver();
        return;
    }
    
    // Check collision with self
    if (snakeGame.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Add new head
    snakeGame.snake.unshift(head);
    
    // Check if food eaten
    if (head.x === snakeGame.food.x && head.y === snakeGame.food.y) {
        snakeGame.score += 10;
        document.getElementById('gameScore').textContent = snakeGame.score;
        generateFood();
    } else {
        snakeGame.snake.pop();
    }
}

function drawGame(ctx) {
    const canvas = document.getElementById('snakeCanvas');
    
    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#f7931a';
    snakeGame.snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#e6850e'; // Head color
        } else {
            ctx.fillStyle = '#f7931a'; // Body color
        }
        ctx.fillRect(segment.x, segment.y, snakeGame.gridSize - 1, snakeGame.gridSize - 1);
    });
    
    // Draw food (sats)
    ctx.fillStyle = '#ff6b35';
    ctx.font = '12px Arial';
    ctx.fillText('🍊', snakeGame.food.x, snakeGame.food.y + 10);
}

function handleGameKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (snakeGame.direction !== 'down') snakeGame.direction = 'up';
            break;
        case 'ArrowDown':
            if (snakeGame.direction !== 'up') snakeGame.direction = 'down';
            break;
        case 'ArrowLeft':
            if (snakeGame.direction !== 'right') snakeGame.direction = 'left';
            break;
        case 'ArrowRight':
            if (snakeGame.direction !== 'left') snakeGame.direction = 'right';
            break;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    gameInterval = null;
    alert(`Game Over! Final Score: ${snakeGame.score}`);
    
    // Reset game
    snakeGame = null;
    document.getElementById('gameScore').textContent = '0';
}

// My-Grocery Demo Functions
let groceryItems = [];

function addGroceryItem() {
    const input = document.getElementById('groceryItem');
    const item = input.value.trim();
    
    if (item) {
        groceryItems.push(item);
        input.value = '';
        updateGroceryList();
    }
}

function removeGroceryItem(index) {
    groceryItems.splice(index, 1);
    updateGroceryList();
}

function updateGroceryList() {
    const list = document.getElementById('groceryList');
    list.innerHTML = '';
    
    groceryItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item}</span>
            <button onclick="removeGroceryItem(${index})">×</button>
        `;
        list.appendChild(li);
    });
}

function generateGroceryQR() {
    const qrDiv = document.getElementById('groceryQR');
    if (groceryItems.length === 0) {
        qrDiv.innerHTML = '<p>Add items to generate QR code</p>';
        return;
    }
    
    // Simple QR representation (in real app, use a QR library)
    const itemsText = groceryItems.join(', ');
    qrDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 0.8em; color: var(--text-secondary); margin-bottom: 8px;">
                Scan to share list
            </div>
            <div style="font-family: monospace; font-size: 0.7em; word-break: break-all;">
                ${itemsText.substring(0, 50)}${itemsText.length > 50 ? '...' : ''}
            </div>
        </div>
    `;
}

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

// ===== PWA FUNCTIONALITY =====

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// PWA Installation
function initializePWA() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        showInstallButton();
    });
    
    // Handle app installed event
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallButton();
    });
}

// Show PWA Install Button
function showInstallButton() {
    // Create install button if it doesn't exist
    if (!document.getElementById('pwaInstallBtn')) {
        const installBtn = document.createElement('button');
        installBtn.id = 'pwaInstallBtn';
        installBtn.className = 'pwa-install-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
        installBtn.onclick = installPWA;
        
        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(installBtn);
        }
    }
}

// Hide PWA Install Button
function hideInstallButton() {
    const installBtn = document.getElementById('pwaInstallBtn');
    if (installBtn) {
        installBtn.remove();
    }
}

// Install PWA
function installPWA() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            window.deferredPrompt = null;
            hideInstallButton();
        });
    }
}

// Show Update Notification
function showUpdateNotification() {
    if ('serviceWorker' in navigator) {
        const updateNotification = document.createElement('div');
        updateNotification.className = 'update-notification';
        updateNotification.innerHTML = `
            <div class="update-content">
                <span>New version available!</span>
                <button onclick="updatePWA()" class="update-btn">Update</button>
                <button onclick="dismissUpdate()" class="dismiss-btn">×</button>
            </div>
        `;
        
        document.body.appendChild(updateNotification);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (updateNotification.parentNode) {
                updateNotification.remove();
            }
        }, 10000);
    }
}

// Update PWA
function updatePWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

// Dismiss Update Notification
function dismissUpdate() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.remove();
    }
}
