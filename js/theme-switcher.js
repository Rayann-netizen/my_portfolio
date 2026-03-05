// ================================
// THEME SWITCHER - MOBILE OPTIMIZED
// ================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeMenu = document.getElementById('themeMenu');
    const closeThemeMenu = document.getElementById('closeThemeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Detect mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolioTheme') || 'vibe-coder';
    applyTheme(savedTheme);
    
    // ================================
    // MOBILE-FRIENDLY EVENT HANDLING
    // ================================
    const toggleEvent = isTouch ? 'touchend' : 'click';
    
    // Toggle theme menu
    if (themeToggle) {
        themeToggle.addEventListener(toggleEvent, (e) => {
            e.preventDefault();
            e.stopPropagation();
            themeMenu.classList.toggle('active');
            console.log('Theme menu toggled:', themeMenu.classList.contains('active'));
        });
    }
    
    // Close theme menu button
    if (closeThemeMenu) {
        closeThemeMenu.addEventListener(toggleEvent, (e) => {
            e.preventDefault();
            e.stopPropagation();
            themeMenu.classList.remove('active');
        });
    }
    
    // Close theme menu when clicking/tapping outside
    document.addEventListener(toggleEvent, (e) => {
        if (themeMenu && 
            !themeMenu.contains(e.target) && 
            !themeToggle.contains(e.target) &&
            themeMenu.classList.contains('active')) {
            themeMenu.classList.remove('active');
        }
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener(toggleEvent, (e) => {
            e.preventDefault();
            const theme = option.getAttribute('data-theme');
            
            // Don't do anything if same theme is selected
            if (option.classList.contains('active')) {
                themeMenu.classList.remove('active');
                return;
            }
            
            applyTheme(theme);
            localStorage.setItem('portfolioTheme', theme);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Close menu with delay
            setTimeout(() => {
                themeMenu.classList.remove('active');
            }, 300);
            
            // Show notification
            showThemeNotification(theme);
            
            // Lighter particle effect on mobile
            if (!isMobile) {
                createThemeChangeEffect();
            }
        });
    });
    
    // Apply theme function
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update active option
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Add transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    // Theme change notification
    function showThemeNotification(theme) {
        const themeNames = {
            'vibe-coder': 'Vibe Coder',
            'ocean-breeze': 'Ocean Breeze',
            'sunset-glow': 'Sunset Glow'
        };
        
        const themeEmojis = {
            'vibe-coder': '💻',
            'ocean-breeze': '🌊',
            'sunset-glow': '🌅'
        };
        
        // Remove existing notification
        const existing = document.querySelector('.theme-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <i class="fas fa-circle-check"></i>
            <span>${themeEmojis[theme]} <strong>${themeNames[theme]}</strong> activated!</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
    
    // Theme change particle effect (Desktop only)
    function createThemeChangeEffect() {
        const colors = ['#00D9FF', '#00FF88', '#FF2E97', '#FFB800'];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = 6 + Math.random() * 8;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 99999;
                box-shadow: 0 0 15px ${color};
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 150 + Math.random() * 100;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => particle.remove(), 800);
        }
    }
    
    // Keyboard shortcuts (Desktop only)
    if (!isMobile && !isTouch) {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                themeMenu.classList.toggle('active');
            }
            
            // ESC
            if (e.key === 'Escape') {
                themeMenu.classList.remove('active');
            }
            
            // Number keys 1-3
            if (e.key >= '1' && e.key <= '3' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                const themeIndex = parseInt(e.key) - 1;
                const themes = ['vibe-coder', 'ocean-breeze', 'sunset-glow'];
                if (themes[themeIndex]) {
                    applyTheme(themes[themeIndex]);
                    localStorage.setItem('portfolioTheme', themes[themeIndex]);
                    showThemeNotification(themes[themeIndex]);
                    createThemeChangeEffect();
                    
                    themeOptions.forEach((opt, index) => {
                        if (index === themeIndex) {
                            opt.classList.add('active');
                        } else {
                            opt.classList.remove('active');
                        }
                    });
                }
            }
        });
    }
    
    console.log('✅ Theme switcher loaded!');
    if (isMobile || isTouch) {
        console.log('📱 Mobile mode - Touch events enabled');
    } else {
        console.log('💻 Desktop mode - Keyboard shortcuts enabled');
        console.log('  • Ctrl/Cmd + K to toggle');
        console.log('  • Ctrl/Cmd + 1/2/3 to switch');
    }
});