// ================================
// SUPER COOL ICON EFFECTS 
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // 1. MAGNETIC ICONS (Follows Cursor)
    // ================================
    const magneticIcons = document.querySelectorAll('.skill-icon, .stat-icon, .contact-item .icon');
    
    magneticIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.2)`;
            icon.style.transition = 'transform 0.1s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0) scale(1)';
            icon.style.transition = 'transform 0.5s ease';
        });
    });
    
    // ================================
    // 2. PARTICLE EXPLOSION ON CLICK
    // ================================
    function createParticleExplosion(x, y, color) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 3;
            const size = 3 + Math.random() * 5;
            
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
                opacity -= 0.02;
                
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
    
    // Add particle explosion to all icons
    document.querySelectorAll('.skill-icon, .stat-icon, .social-links a, .project-card').forEach(element => {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const color = getComputedStyle(element).getPropertyValue('--primary-color') || '#00D9FF';
            
            createParticleExplosion(x, y, color);
        });
    });
    
    // ================================
    // 3. GLITCH EFFECT ON HOVER
    // ================================
    const glitchElements = document.querySelectorAll('.logo-icon, .section-title i');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = '';
        });
    });
    
    // Add glitch animation CSS
    if (!document.querySelector('#glitch-style')) {
        const glitchStyle = document.createElement('style');
        glitchStyle.id = 'glitch-style';
        glitchStyle.textContent = `
            @keyframes glitch {
                0% {
                    transform: translate(0);
                    filter: hue-rotate(0deg);
                }
                20% {
                    transform: translate(-2px, 2px);
                    filter: hue-rotate(90deg);
                }
                40% {
                    transform: translate(-2px, -2px);
                    filter: hue-rotate(180deg);
                }
                60% {
                    transform: translate(2px, 2px);
                    filter: hue-rotate(270deg);
                }
                80% {
                    transform: translate(2px, -2px);
                    filter: hue-rotate(360deg);
                }
                100% {
                    transform: translate(0);
                    filter: hue-rotate(0deg);
                }
            }
        `;
        document.head.appendChild(glitchStyle);
    }
    
    // ================================
    // 4. 3D FLIP CARDS FOR SKILL ICONS
    // ================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon i');
            if (icon) {
                icon.style.animation = 'flip3D 0.6s ease';
            }
        });
    });
    
    // Add 3D flip animation
    if (!document.querySelector('#flip3d-style')) {
        const flip3dStyle = document.createElement('style');
        flip3dStyle.id = 'flip3d-style';
        flip3dStyle.textContent = `
            @keyframes flip3D {
                0% {
                    transform: perspective(400px) rotateY(0);
                }
                50% {
                    transform: perspective(400px) rotateY(180deg);
                }
                100% {
                    transform: perspective(400px) rotateY(360deg);
                }
            }
        `;
        document.head.appendChild(flip3dStyle);
    }
    
    // ================================
    // 5. RAINBOW TRAIL FOR CURSOR
    // ================================
    let rainbowTrailEnabled = false;
    
    // Enable on logo click
    document.querySelector('.logo')?.addEventListener('dblclick', () => {
        rainbowTrailEnabled = !rainbowTrailEnabled;
        console.log(`🌈 Rainbow Trail: ${rainbowTrailEnabled ? 'ON' : 'OFF'}`);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (rainbowTrailEnabled) {
            const trail = document.createElement('div');
            const colors = ['#FF0080', '#00D9FF', '#00FF88', '#FFB800', '#FF2E97', '#A855F7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            trail.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${randomColor};
                border-radius: 50%;
                left: ${e.clientX - 5}px;
                top: ${e.clientY - 5}px;
                pointer-events: none;
                z-index: 99998;
                box-shadow: 0 0 20px ${randomColor};
                animation: trailFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 500);
        }
    });
    
    // Add trail fade animation
    if (!document.querySelector('#trail-style')) {
        const trailStyle = document.createElement('style');
        trailStyle.id = 'trail-style';
        trailStyle.textContent = `
            @keyframes trailFade {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(trailStyle);
    }
    
    // ================================
    // 6. LIGHTNING STRIKE ON CLICK
    // ================================
    function createLightning(x, y) {
        const lightning = document.createElement('div');
        lightning.style.cssText = `
            position: fixed;
            width: 2px;
            height: ${window.innerHeight}px;
            background: linear-gradient(180deg, #00D9FF, transparent);
            left: ${x}px;
            top: 0;
            pointer-events: none;
            z-index: 99999;
            box-shadow: 0 0 20px #00D9FF, 0 0 40px #00D9FF;
            animation: lightningStrike 0.3s ease-out;
        `;
        
        document.body.appendChild(lightning);
        setTimeout(() => lightning.remove(), 300);
    }
    
    // Add lightning animation
    if (!document.querySelector('#lightning-style')) {
        const lightningStyle = document.createElement('style');
        lightningStyle.id = 'lightning-style';
        lightningStyle.textContent = `
            @keyframes lightningStrike {
                0% {
                    opacity: 0;
                    transform: scaleY(0);
                }
                50% {
                    opacity: 1;
                    transform: scaleY(1);
                }
                100% {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(lightningStyle);
    }
    
    // Trigger lightning on project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            createLightning(rect.left + rect.width / 2, 0);
        });
    });
    
    // ================================
    // 7. MORPHING SHAPES ON HOVER
    // ================================
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.animation = 'morphShape 0.6s ease-in-out';
            }
        });
    });
    
    // Add morph animation
    if (!document.querySelector('#morph-style')) {
        const morphStyle = document.createElement('style');
        morphStyle.id = 'morph-style';
        morphStyle.textContent = `
            @keyframes morphShape {
                0%, 100% {
                    border-radius: 50%;
                    transform: rotate(0deg) scale(1);
                }
                25% {
                    border-radius: 0%;
                    transform: rotate(90deg) scale(1.2);
                }
                50% {
                    border-radius: 50%;
                    transform: rotate(180deg) scale(0.8);
                }
                75% {
                    border-radius: 0%;
                    transform: rotate(270deg) scale(1.2);
                }
            }
        `;
        document.head.appendChild(morphStyle);
    }
    
    // ================================
    // 8. WAVE RIPPLE EFFECT
    // ================================
    function createRipple(x, y, color = '#00D9FF') {
        const ripple = document.createElement('div');
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
            animation: rippleExpand 0.8s ease-out;
        `;
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }
    
    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes rippleExpand {
                to {
                    width: 200px;
                    height: 200px;
                    left: calc(var(--x) - 100px);
                    top: calc(var(--y) - 100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // Add ripples to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            createRipple(e.clientX, e.clientY);
        });
    });
    
    // ================================
    // 9. ICON SHAKE ON ERROR
    // ================================
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // Add shake animation
    if (!document.querySelector('#shake-style')) {
        const shakeStyle = document.createElement('style');
        shakeStyle.id = 'shake-style';
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(shakeStyle);
    }
    
    // ================================
    // 10. FLOATING ICONS BACKGROUND
    // ================================
    function createFloatingIcons() {
        const icons = ['fa-code', 'fa-laptop', 'fa-mobile', 'fa-rocket', 'fa-star', 'fa-heart', 'fa-bolt'];
        const colors = ['#00D9FF', '#00FF88', '#FF2E97', '#FFB800'];
        
        setInterval(() => {
            const icon = document.createElement('i');
            icon.className = `fas ${icons[Math.floor(Math.random() * icons.length)]}`;
            icon.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${window.innerHeight}px;
                font-size: ${20 + Math.random() * 30}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                opacity: 0.3;
                pointer-events: none;
                z-index: 1;
                animation: floatUp ${5 + Math.random() * 5}s linear;
            `;
            
            document.body.appendChild(icon);
            setTimeout(() => icon.remove(), 10000);
        }, 2000);
    }
    
    // Add float animation
    if (!document.querySelector('#float-style')) {
        const floatStyle = document.createElement('style');
        floatStyle.id = 'float-style';
        floatStyle.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    // Start floating icons (optional - uncomment to enable)
    // createFloatingIcons();
    
    // ================================
    // 11. ICON COLOR CYCLE ON SCROLL
    // ================================
    const navIcons = document.querySelectorAll('.nav-links i');
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        navIcons.forEach((icon, index) => {
            const hue = (scrollPercent * 3.6) + (index * 30);
            icon.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 10px currentColor)`;
            icon.style.transition = 'filter 0.3s ease';
        });
    });
    
    // ================================
    // 12. CURSOR FOLLOWER ICON
    // ================================
    let cursorFollower = null;
    
    function createCursorFollower() {
        cursorFollower = document.createElement('div');
        cursorFollower.innerHTML = '<i class="fas fa-sparkles"></i>';
        cursorFollower.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            font-size: 20px;
            color: var(--primary-color);
            transition: transform 0.15s ease;
            display: none;
        `;
        document.body.appendChild(cursorFollower);
    }
    
    createCursorFollower();
    
    document.addEventListener('mousemove', (e) => {
        if (cursorFollower) {
            cursorFollower.style.left = `${e.clientX + 10}px`;
            cursorFollower.style.top = `${e.clientY + 10}px`;
        }
    });
    
    // Show follower on hover over interactive elements
    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorFollower) cursorFollower.style.display = 'block';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorFollower) cursorFollower.style.display = 'none';
        });
    });
    
    // ================================
    // CONSOLE EASTER EGG
    // ================================
    console.log('%c SUPER COOL ICON EFFECTS LOADED! ✨', 'color: #00D9FF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00D9FF;');
    console.log('%c Secret Features:', 'color: #00FF88; font-size: 14px; font-weight: bold;');
    console.log('%c  • Double-click logo for rainbow trail', 'color: #B4BCD0; font-size: 12px;');
    console.log('%c  • Click project cards for lightning', 'color: #B4BCD0; font-size: 12px;');
    console.log('%c  • Click icons for particle explosions', 'color: #B4BCD0; font-size: 12px;');
    
    console.log('✅ Icon effects loaded!');
});