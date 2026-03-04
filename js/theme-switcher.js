// ================================
// THEME SWITCHER - COMPLETE
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // DOM Elements
    // ================================
    const themeToggle = document.getElementById('themeToggle');
    const themeMenu = document.getElementById('themeMenu');
    const closeThemeMenu = document.getElementById('closeThemeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;
    
    // ================================
    // Configuration
    // ================================
    const STORAGE_KEY = 'portfolioTheme';
    const DEFAULT_THEME = 'vibe-coder';
    const NOTIFICATION_DURATION = 3000; // 3 seconds
    
    // Theme metadata
    const themes = {
        'vibe-coder': {
            name: 'Vibe Coder',
            emoji: '💻',
            description: 'Dark with neon cyan & green'
        },
        'ocean-breeze': {
            name: 'Ocean Breeze',
            emoji: '🌊',
            description: 'Professional blue & turquoise'
        },
        'sunset-glow': {
            name: 'Sunset Glow',
            emoji: '🌅',
            description: 'Warm orange & purple'
        }
    };
    
    // ================================
    // Initialize Theme
    // ================================
    function initializeTheme() {
        // Load saved theme or use default
        const savedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
        
        // Validate theme exists
        if (themes[savedTheme]) {
            applyTheme(savedTheme, false); // false = no notification on page load
        } else {
            applyTheme(DEFAULT_THEME, false);
        }
        
        console.log(`🎨 Theme initialized: ${savedTheme}`);
    }
    
    // ================================
    // Apply Theme
    // ================================
    function applyTheme(themeName, showNotification = true) {
        // Set theme attribute on body
        body.setAttribute('data-theme', themeName);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, themeName);
        
        // Update active state on theme options
        updateActiveThemeOption(themeName);
        
        // Add smooth transition effect
        body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
        
        // Show notification if requested
        if (showNotification && themes[themeName]) {
            showThemeNotification(themeName);
        }
        
        // Track theme change (Google Analytics - if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'event_category': 'Theme',
                'event_label': themeName
            });
        }
        
        console.log(`✅ Theme applied: ${themeName}`);
    }
    
    // ================================
    // Update Active Theme Option
    // ================================
    function updateActiveThemeOption(themeName) {
        themeOptions.forEach(option => {
            const optionTheme = option.getAttribute('data-theme');
            
            if (optionTheme === themeName) {
                option.classList.add('active');
                option.setAttribute('aria-pressed', 'true');
            } else {
                option.classList.remove('active');
                option.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    // ================================
    // Toggle Theme Menu
    // ================================
    function toggleThemeMenu() {
        const isActive = themeMenu.classList.toggle('active');
        
        // Update ARIA attributes
        themeToggle.setAttribute('aria-expanded', isActive);
        
        // Add/remove body class to prevent scrolling when menu is open
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        
        console.log(`Theme menu ${isActive ? 'opened' : 'closed'}`);
    }
    
    // ================================
    // Close Theme Menu
    // ================================
    function closeThemeMenuFunc() {
        themeMenu.classList.remove('active');
        themeToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }
    
    // ================================
    // Show Theme Change Notification
    // ================================
    function showThemeNotification(themeName) {
        const theme = themes[themeName];
        if (!theme) return;
        
        // Remove existing notification if any
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${theme.emoji} <strong>${theme.name}</strong> activated!</span>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Trigger show animation with slight delay
        requestAnimationFrame(() => {
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
        });
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, NOTIFICATION_DURATION);
    }
    
    // ================================
    // Event Listeners
    // ================================
    
    // Toggle button click
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleThemeMenu();
        });
        
        // Keyboard support for toggle button
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleThemeMenu();
            }
        });
    }
    
    // Close button click
    if (closeThemeMenu) {
        closeThemeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            closeThemeMenuFunc();
        });
    }
    
    // Theme option selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedTheme = option.getAttribute('data-theme');
            const currentTheme = body.getAttribute('data-theme');
            
            // Don't do anything if clicking the same theme
            if (selectedTheme === currentTheme) {
                closeThemeMenuFunc();
                return;
            }
            
            // Apply the new theme
            applyTheme(selectedTheme, true);
            
            // Close menu with delay for better UX
            setTimeout(() => {
                closeThemeMenuFunc();
            }, 500);
        });
        
        // Keyboard support for theme options
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });
    
    // ================================
    // Close Menu When Clicking Outside
    // ================================
    document.addEventListener('click', (e) => {
        if (themeMenu && !themeMenu.contains(e.target) && !themeToggle.contains(e.target)) {
            closeThemeMenuFunc();
        }
    });
    
    // Prevent menu from closing when clicking inside
    if (themeMenu) {
        themeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // ================================
    // Keyboard Shortcuts
    // ================================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to toggle theme menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleThemeMenu();
        }
        
        // ESC to close theme menu
        if (e.key === 'Escape') {
            closeThemeMenuFunc();
        }
        
        // Ctrl/Cmd + Shift + T to cycle through themes
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            cycleTheme();
        }
    });
    
    // ================================
    // Cycle Through Themes
    // ================================
    function cycleTheme() {
        const themeNames = Object.keys(themes);
        const currentTheme = body.getAttribute('data-theme') || DEFAULT_THEME;
        const currentIndex = themeNames.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        const nextTheme = themeNames[nextIndex];
        
        applyTheme(nextTheme, true);
    }
    
    // ================================
    // Theme Cycling with Arrow Keys (when menu is open)
    // ================================
    if (themeMenu) {
        themeMenu.addEventListener('keydown', (e) => {
            const activeOption = document.querySelector('.theme-option.active');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextOption = activeOption.nextElementSibling;
                if (nextOption && nextOption.classList.contains('theme-option')) {
                    nextOption.click();
                }
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevOption = activeOption.previousElementSibling;
                if (prevOption && prevOption.classList.contains('theme-option')) {
                    prevOption.click();
                }
            }
        });
    }
    
    // ================================
    // Listen for System Theme Changes (Optional)
    // ================================
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleSystemThemeChange(e) {
        // Only auto-switch if user hasn't manually selected a theme
        const hasUserPreference = localStorage.getItem(STORAGE_KEY);
        
        if (!hasUserPreference) {
            const systemTheme = e.matches ? 'vibe-coder' : 'ocean-breeze';
            applyTheme(systemTheme, false);
            console.log(`🌓 System theme changed: ${systemTheme}`);
        }
    }
    
    // Uncomment to enable system theme detection
    // darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // ================================
    // Prevent FOUC (Flash of Unstyled Content)
    // ================================
    // Apply theme immediately before DOMContentLoaded
    const quickTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', quickTheme);
    
    // ================================
    // Export Functions (for console debugging)
    // ================================
    window.portfolioTheme = {
        apply: applyTheme,
        cycle: cycleTheme,
        get current() {
            return body.getAttribute('data-theme');
        },
        get available() {
            return Object.keys(themes);
        },
        reset() {
            localStorage.removeItem(STORAGE_KEY);
            applyTheme(DEFAULT_THEME, true);
            console.log('🔄 Theme reset to default');
        }
    };
    
    // ================================
    // Initialize on Page Load
    // ================================
    initializeTheme();
    
    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c🎨 Theme Switcher Loaded!', 'background: #00D9FF; color: #0A0E27; font-size: 14px; padding: 8px; font-weight: bold;');
    console.log('%c💡 Keyboard Shortcuts:', 'font-size: 12px; color: #00FF88; font-weight: bold;');
    console.log('%c  • Ctrl/Cmd + K: Toggle theme menu', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • ESC: Close theme menu', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • Ctrl/Cmd + Shift + T: Cycle themes', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c🔧 Console Commands:', 'font-size: 12px; color: #FFB800; font-weight: bold;');
    console.log('%c  • portfolioTheme.apply("theme-name"): Switch theme', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • portfolioTheme.cycle(): Cycle through themes', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • portfolioTheme.current: Get current theme', 'font-size: 11px; color: #B4BCD0;');
    console.log('%c  • portfolioTheme.reset(): Reset to default', 'font-size: 11px; color: #B4BCD0;');
    
});

// ================================
// Smooth Transition on Page Load
// ================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('theme-loaded');
    
    // Add smooth transitions after page load
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }, 100);
});

// ================================
// Handle Page Visibility Changes
// ================================
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Recheck theme when page becomes visible
        const currentTheme = document.body.getAttribute('data-theme');
        const savedTheme = localStorage.getItem('portfolioTheme');
        
        if (currentTheme !== savedTheme) {
            console.log('🔄 Theme sync detected');
            document.body.setAttribute('data-theme', savedTheme);
        }
    }
});

// ================================
// Performance Monitoring
// ================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const themeLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Theme system loaded in ${themeLoadTime}ms`);
    });
}

// ================================
// Error Handling
// ================================
window.addEventListener('error', (e) => {
    if (e.filename && e.filename.includes('theme')) {
        console.error('❌ Theme error:', e.message);
    }
});

// ================================
// Browser Storage Event (sync across tabs)
// ================================
window.addEventListener('storage', (e) => {
    if (e.key === 'portfolioTheme' && e.newValue) {
        console.log('🔄 Theme changed in another tab');
        document.body.setAttribute('data-theme', e.newValue);
        
        // Update active option
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const optionTheme = option.getAttribute('data-theme');
            if (optionTheme === e.newValue) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});

// ================================
// Touch Device Support
// ================================
if ('ontouchstart' in window) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('touchstart', (e) => {
            // Prevent double-tap zoom on mobile
            e.preventDefault();
        }, { passive: false });
    }
}

// ================================
// Reduced Motion Support
// ================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    console.log('♿ Reduced motion detected - animations disabled');
    
    // Disable theme transition animations
    const style = document.createElement('style');
    style.textContent = `
        body, .theme-menu, .theme-option, .theme-notification {
            transition: none !important;
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ================================
// High Contrast Mode Support
// ================================
const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

if (prefersHighContrast) {
    console.log('♿ High contrast mode detected');
    document.body.classList.add('high-contrast');
}

// ================================
// Theme Preload (Prevent FOUC)
// ================================
(function() {
    const savedTheme = localStorage.getItem('portfolioTheme') || 'vibe-coder';
    const html = document.documentElement;
    html.setAttribute('data-theme', savedTheme);
    html.style.visibility = 'visible';
})();