// ================================
// MAIN JAVASCRIPT - COMPLETE
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('%c🚀 Portfolio JavaScript Loaded!', 'background: #00D9FF; color: #0A0E27; font-size: 16px; padding: 10px; font-weight: bold;');
    
    // ================================
    // MOBILE NAVIGATION TOGGLE
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    
    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            // Update ARIA attributes
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ================================
    // NAVBAR BACKGROUND ON SCROLL
    // ================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Change navbar background based on scroll
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(10, 14, 39, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            // Optional: Hide/show navbar on scroll
            // Uncomment to enable auto-hide navbar
            /*
            clearTimeout(scrollTimeout);
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            scrollTimeout = setTimeout(() => {
                navbar.style.transform = 'translateY(0)';
            }, 200);
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            */
        }, { passive: true });
    }

    // ================================
    // SCROLL TO TOP BUTTON
    // ================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }, { passive: true });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard support
        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active-link');
            } else {
                navLink?.classList.remove('active-link');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav(); // Call once on load

    // ================================
    // LOGO CLICK - SCROLL TO TOP
    // ================================
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, window.location.pathname);
        });
        
        // Add cursor pointer
        logo.style.cursor = 'pointer';
    }

    // ================================
    // UPDATE CURRENT YEAR IN FOOTER
    // ================================
    const updateFooterYear = () => {
        const footerYearElements = document.querySelectorAll('.footer p');
        const currentYear = new Date().getFullYear();
        
        footerYearElements.forEach(element => {
            if (element.textContent.includes('2026')) {
                element.innerHTML = element.innerHTML.replace('2026', currentYear);
            }
        });
    };
    
    updateFooterYear();

    // ================================
    // LAZY LOADING IMAGES
    // ================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ================================
    // PREVENT EXTERNAL LINK PHISHING
    // ================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ================================
    // DETECT IF USER PREFERS REDUCED MOTION
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations
        document.documentElement.style.setProperty('--transition', 'none');
        console.log('ℹ️ Reduced motion detected - animations disabled');
        
        // Add class to body for CSS targeting
        document.body.classList.add('reduced-motion');
    }

    // ================================
    // PERFORMANCE MONITORING
    // ================================
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
            console.log(`⚡ DOM Ready: ${domContentLoadedTime}ms`);
            
            // Track performance (Google Analytics - if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': pageLoadTime,
                    'event_category': 'Performance'
                });
            }
        });
    }

    // ================================
    // CHECK IF JAVASCRIPT IS ENABLED
    // ================================
    document.documentElement.classList.add('js-enabled');
    
    // Add no-js fallback styles are removed
    document.documentElement.classList.remove('no-js');

    // ================================
    // CONSOLE WELCOME MESSAGE
    // ================================
    console.log('%c👋 Welcome to My Portfolio! ', 'background: #00D9FF; color: #0A0E27; font-size: 20px; padding: 10px; font-weight: bold;');
    console.log('%c🚀 Interested in the code?', 'font-size: 14px; color: #00FF88; font-weight: bold;');
    console.log('%c📧 Let\'s connect!', 'font-size: 14px; color: #FF2E97; font-weight: bold;');
    console.log('%c�� GitHub: https://github.com/Rayann-netizen', 'font-size: 12px; color: #00D9FF;');
    console.log('%c💡 Keyboard Shortcuts:', 'font-size: 12px; color: #FFB800; font-weight: bold;');
    console.log('%c  • Ctrl/Cmd + K: Toggle theme menu', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • ESC: Close menus', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • Ctrl/Cmd + Shift + T: Cycle themes', 'font-size: 11px; color: #B4BCD0;');

    // ================================
    // EASTER EGG - KONAMI CODE
    // ================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'background: #FFB800; color: #0A0E27; font-size: 20px; padding: 10px; font-weight: bold;');
                
                // Add party mode class
                document.body.classList.add('party-mode');
                
                // Create confetti effect
                createConfetti();
                
                // Show notification
                showEasterEggNotification();
                
                // Remove party mode after 5 seconds
                setTimeout(() => {
                    document.body.classList.remove('party-mode');
                }, 5000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Confetti effect function
    function createConfetti() {
        const colors = ['#00D9FF', '#00FF88', '#FF2E97', '#FFB800'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    z-index: 10001;
                    animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                    border-radius: 50%;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
        
        // Add confetti animation
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Easter egg notification
    function showEasterEggNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 30px 50px;
            border-radius: 20px;
            border: 3px solid var(--primary-color);
            box-shadow: var(--shadow-hover);
            z-index: 10000;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            animation: easterEggPop 0.5s ease forwards;
        `;
        notification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
            <div>You Found The Easter Egg!</div>
            <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">You're a true developer!</div>
        `;
        
        document.body.appendChild(notification);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes easterEggPop {
                0% { transform: translate(-50%, -50%) scale(0) rotate(-180deg); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1) rotate(10deg); }
                100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            notification.style.animation = 'easterEggPop 0.5s ease reverse forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // ================================
    // TRACK OUTBOUND LINKS
    // ================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', (e) => {
                const url = link.href;
                console.log(`🔗 Outbound click: ${url}`);
                
                // Track with Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Outbound Link',
                        'event_label': url
                    });
                }
            });
        }
    });

    // ================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ================================
    let isTabbing = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            isTabbing = true;
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    document.addEventListener('mousedown', () => {
        isTabbing = false;
        document.body.classList.remove('user-is-tabbing');
    });

    // ================================
    // ADD FOCUS STYLES FOR ACCESSIBILITY
    // ================================
    const style = document.createElement('style');
    style.textContent = `
        .user-is-tabbing *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px;
        }
        
        .nav-links a.active-link {
            color: var(--primary-color) !important;
        }
        
        .nav-links a.active-link::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    // ================================
    // HANDLE PRINT EVENTS
    // ================================
    window.addEventListener('beforeprint', () => {
        console.log('🖨️ Preparing to print...');
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        console.log('✅ Print complete');
        document.body.classList.remove('printing');
    });

    // ================================
    // ONLINE/OFFLINE DETECTION
    // ================================
    window.addEventListener('online', () => {
        console.log('🟢 Back online!');
        showConnectionStatus('You are back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        console.log('🔴 You are offline');
        showConnectionStatus('You are offline. Some features may not work.', 'warning');
    });
    
    function showConnectionStatus(message, type) {
        const notification = document.createElement('div');
        notification.className = 'connection-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--warning-color)'};
            color: var(--darker-bg);
            padding: 15px 30px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ================================
    // COPY EMAIL ON CLICK
    // ================================
    const emailElements = document.querySelectorAll('.contact-item p');
    
    emailElements.forEach(element => {
        const text = element.textContent.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(text)) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy email';
            
            element.addEventListener('click', () => {
                navigator.clipboard.writeText(text).then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.textContent = '✅ Email copied to clipboard!';
                    notification.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: var(--secondary-color);
                        color: var(--darker-bg);
                        padding: 12px 25px;
                        border-radius: 8px;
                        font-weight: 600;
                        z-index: 10000;
                        animation: slideUp 0.3s ease;
                    `;
                    
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.animation = 'slideUp 0.3s ease reverse';
                        setTimeout(() => notification.remove(), 300);
                    }, 2000);
                }).catch(() => {
                    console.error('Failed to copy email');
                });
            });
        }
    });

    // ================================
    // ERROR HANDLING
    // ================================
    window.addEventListener('error', (e) => {
        console.error('❌ JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('❌ Unhandled Promise Rejection:', e.reason);
    });

    // ================================
    // PAGE VISIBILITY DETECTION
    // ================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('👋 Page hidden');
        } else {
            console.log('👀 Page visible');
        }
    });

    // ================================
    // FINAL INITIALIZATION LOG
    // ================================
    console.log('%c✅ Main JavaScript Initialized Successfully!', 'background: #00FF88; color: #0A0E27; font-size: 14px; padding: 8px; font-weight: bold;');
    console.log('%c📊 All features loaded:', 'font-size: 12px; color: #B4BCD0; font-weight: bold;');
    console.log('%c  ✓ Mobile navigation', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Smooth scrolling', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Active link detection', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Scroll to top', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Lazy loading', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Performance monitoring', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Easter egg 🎉', 'font-size: 11px; color: #00FF88;');
    
});

// ================================
// SERVICE WORKER REGISTRATION (PWA)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('✅ Service Worker registered:', reg.scope);
            })
            .catch(err => {
                console.log('❌ Service Worker registration failed:', err);
            });
        */
    });
}

// ================================
// EXPORT UTILITIES FOR CONSOLE
// ================================
window.portfolio = {
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            const offset = element.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    },
    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        }
    },
    version: '1.0.0',
    author: 'Rayann'
};

console.log('%c🎮 Portfolio Utils Available:', 'font-size: 12px; color: #FFB800; font-weight: bold;');
console.log('%c  • portfolio.scrollToTop()', 'font-size: 11px; color: #B4BCD0;');
console.log('%c  • portfolio.scrollToSection("about")', 'font-size: 11px; color: #B4BCD0;');
console.log('%c  • portfolio.toggleMobileMenu()', 'font-size: 11px; color: #B4BCD0;');

// ================================
// COPY CONTACT INFO TO CLIPBOARD
// ================================
document.querySelectorAll('.contact-link').forEach(link => {
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.style.cssText = `
        background: var(--primary-color);
        border: none;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.3s ease;
        display: none;
    `;
    
    link.parentElement.appendChild(copyBtn);
    
    // Show copy button on hover
    link.parentElement.addEventListener('mouseenter', () => {
        copyBtn.style.display = 'inline-flex';
        copyBtn.style.alignItems = 'center';
        copyBtn.style.justifyContent = 'center';
    });
    
    link.parentElement.addEventListener('mouseleave', () => {
        copyBtn.style.display = 'none';
    });
    
    // Copy on click
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = link.textContent.trim();
        
        navigator.clipboard.writeText(text).then(() => {
            // Show success feedback
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = 'var(--secondary-color)';
            
            // Show notification
            const notification = document.createElement('div');
            notification.textContent = `✅ Copied: ${text}`;
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--secondary-color);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                animation: slideUp 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.style.background = 'var(--primary-color)';
                notification.remove();
            }, 2000);
        });
    });
});