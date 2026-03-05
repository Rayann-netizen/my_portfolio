// ================================
// ICON EFFECTS - MOBILE OPTIMIZED
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // Detect Device Type
    // ================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}, Touch: ${isTouch}`);
    
    if (prefersReducedMotion) {
        console.log('⚠️ Reduced motion preference detected - Disabling effects');
        return;
    }
    
    // ================================
    // 1. MAGNETIC ICONS (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const magneticIcons = document.querySelectorAll('.skill-icon, .stat-icon, .contact-item .icon');
        
        magneticIcons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                icon.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
                icon.style.transition = 'transform 0.1s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translate(0, 0) scale(1)';
                icon.style.transition = 'transform 0.3s ease';
            });
        });
    }
    
    // ================================
    // 2. PARTICLE EXPLOSION (Lighter on Mobile)
    // ================================
    function createParticleExplosion(x, y, color) {
        const particleCount = isMobile ? 10 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = isMobile ? 1.5 : 3;
            const size = isMobile ? 4 : 6;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 99999;
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(particle);
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            
            const animate = () => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity;
                opacity -= isMobile ? 0.03 : 0.02;
                
                particle.style.transform = `translate(${posX}px, ${posY}px) scale(${opacity})`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    }
    
    // Add click/tap effects
    const clickableElements = document.querySelectorAll('.skill-card, .stat-item, .project-card');
    
    clickableElements.forEach(element => {
        const eventType = isTouch ? 'touchend' : 'click';
        
        element.addEventListener(eventType, (e) => {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const computedStyle = getComputedStyle(document.documentElement);
            const color = computedStyle.getPropertyValue('--primary-color').trim() || '#00D9FF';
            
            createParticleExplosion(x, y, color);
        });
    });
    
    // ================================
    // 3. GLITCH EFFECT (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const glitchElements = document.querySelectorAll('.logo-icon, .section-title i');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.2s 3';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animation = '';
            });
        });

        if (!document.querySelector('#glitch-style')) {
            const glitchStyle = document.createElement('style');
            glitchStyle.id = 'glitch-style';
            glitchStyle.textContent = `
                @keyframes glitch {
                    0% { transform: translate(0); }
                    33% { transform: translate(-2px, 2px); }
                    66% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
            `;
            document.head.appendChild(glitchStyle);
        }
    }
    
    // ================================
    // 4. RAINBOW TRAIL (Desktop Only)
    // ================================
    let rainbowTrailEnabled = false;
    
    if (!isMobile && !isTouch) {
        document.querySelector('.logo')?.addEventListener('dblclick', () => {
            rainbowTrailEnabled = !rainbowTrailEnabled;
            const status = rainbowTrailEnabled ? 'ON 🌈' : 'OFF';
            console.log(`🌈 Rainbow Trail: ${status}`);
            
            const notification = document.createElement('div');
            notification.textContent = `Rainbow Trail ${status}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                color: var(--text-primary);
                padding: 15px 25px;
                border-radius: 10px;
                border: 2px solid var(--primary-color);
                box-shadow: var(--shadow-hover);
                z-index: 99999;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 2000);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (rainbowTrailEnabled) {
                const trail = document.createElement('div');
                const colors = ['#FF0080', '#00D9FF', '#00FF88', '#FFB800'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                trail.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${randomColor};
                    border-radius: 50%;
                    left: ${e.clientX - 4}px;
                    top: ${e.clientY - 4}px;
                    pointer-events: none;
                    z-index: 99998;
                    animation: fadeOut 0.5s ease-out forwards;
                `;
                
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 500);
            }
        });

        if (!document.querySelector('#trail-style')) {
            const trailStyle = document.createElement('style');
            trailStyle.id = 'trail-style';
            trailStyle.textContent = `
                @keyframes fadeOut {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(trailStyle);
        }
    }
    
    // ================================
    // 5. WAVE RIPPLE EFFECT
    // ================================
    function createRipple(x, y, color = '#00D9FF') {
        const ripple = document.createElement('div');
        const size = isMobile ? 150 : 250;
        
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid ${color};
            border-radius: 50%;
            left: ${x - 10}px;
            top: ${y - 10}px;
            pointer-events: none;
            z-index: 99999;
            opacity: 1;
        `;
        
        document.body.appendChild(ripple);
        
        ripple.animate([
            { width: '20px', height: '20px', opacity: 1 },
            { width: `${size}px`, height: `${size}px`, opacity: 0, marginLeft: `${-size/2 + 10}px`, marginTop: `${-size/2 + 10}px` }
        ], {
            duration: isMobile ? 600 : 1000,
            easing: 'ease-out'
        });
        
        setTimeout(() => ripple.remove(), isMobile ? 600 : 1000);
    }
    
    // Add ripples to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        const eventType = isTouch ? 'touchend' : 'click';
        btn.addEventListener(eventType, (e) => {
            const touch = e.touches ? e.touches[0] : e;
            const x = touch.clientX || e.clientX;
            const y = touch.clientY || e.clientY;
            createRipple(x, y);
        });
    });
    
    // ================================
    // 6. ICON COLOR CYCLE ON SCROLL (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const navIcons = document.querySelectorAll('.nav-links i');
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    
                    navIcons.forEach((icon, index) => {
                        const hue = (scrollPercent * 3) + (index * 40);
                        icon.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 5px currentColor)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // ================================
    // 7. CURSOR FOLLOWER (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        let cursorFollower = document.createElement('div');
        cursorFollower.innerHTML = '<i class="fas fa-sparkles"></i>';
        cursorFollower.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            font-size: 16px;
            color: var(--primary-color);
            transition: transform 0.1s ease;
            display: none;
            filter: drop-shadow(0 0 8px var(--primary-color));
        `;
        document.body.appendChild(cursorFollower);
        
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = `${e.clientX + 10}px`;
            cursorFollower.style.top = `${e.clientY + 10}px`;
        });
        
        document.querySelectorAll('a, button, .project-card, .skill-card, .stat-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.display = 'block';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.display = 'none';
            });
        });
    }
    
    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('✅ Icon effects loaded!');
    if (isMobile || isTouch) {
        console.log('📱 Mobile mode - Lightweight effects active');
    } else {
        console.log('💻 Desktop mode - Full effects enabled');
        console.log('💡 Double-click logo for rainbow trail');
    }
});