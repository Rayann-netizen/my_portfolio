// ================================
// CRITICAL MOBILE FIX
// ================================

// Force proper layout on mobile
if (window.innerWidth <= 768) {
    document.body.style.overflowX = 'hidden';
    
    // Fix viewport
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

// Rest of your existing code...
// ================================
// MAIN JAVASCRIPT - ENHANCED
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // Mobile Navigation Toggle
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ================================
    // Smooth Scrolling
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // Navbar Background on Scroll
    // ================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 14, 39, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ================================
    // Scroll to Top Button
    // ================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================
    // Active Navigation Link on Scroll
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
    
    window.addEventListener('scroll', highlightNav);

    // ================================
    // Add current year to footer
    // ================================
    const footerYear = document.querySelector('.footer p:last-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c👋 Welcome to My Portfolio! ', 'background: #00D9FF; color: #0A0E27; font-size: 20px; padding: 10px; font-weight: bold;');
    console.log('%c🚀 Interested in the code? Check out my GitHub!', 'font-size: 14px; color: #00FF88; font-weight: bold;');
    console.log('%c🔗 https://github.com/Rayann-netizen', 'font-size: 12px; color: #00D9FF;');
    console.log('%c💡 Pro Tips:', 'font-size: 12px; color: #FFB800; font-weight: bold;');
    console.log('%c  • Double-click logo for rainbow trail 🌈', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • Click project cards for particle effects 💥', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • Hover over icons for cool animations ✨', 'font-size: 11px; color: #B4BCD0;');

    // ================================
    // Performance Monitoring
    // ================================
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });
    }

    // ================================
    // Detect if user prefers reduced motion
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--transition', 'none');
        console.log('ℹ️ Reduced motion detected - animations disabled');
    }

    // ================================
    // Check if JavaScript is enabled
    // ================================
    document.documentElement.classList.add('js-enabled');

    console.log('✅ Main JavaScript loaded successfully!');
});

// ================================
// Error Handling
// ================================
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.message);
});

// ================================
// Online/Offline Detection
// ================================
window.addEventListener('online', () => {
    console.log('🟢 Back online!');
});

window.addEventListener('offline', () => {
    console.log('🔴 You are offline');
});

// ================================
// Add Active Link Styling
// ================================
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active-link {
        color: var(--primary-color) !important;
    }
    
    .nav-links a.active-link::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);