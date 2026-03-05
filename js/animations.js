// ================================
// ANIMATIONS & SCROLL EFFECTS - MOBILE OPTIMIZED
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // Detect Mobile Device
    // ================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable intensive animations on mobile
    if (isMobile || isTouch || prefersReducedMotion) {
        console.log('📱 Mobile device detected - Optimizing animations');
        document.documentElement.classList.add('mobile-device');
    }
    
    // ================================
    // Loading Screen
    // ================================
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                if (!isMobile) {
                    triggerWelcomeAnimation();
                }
            }, 800); // Faster on mobile
        }
    });

    // Welcome animation (desktop only)
    function triggerWelcomeAnimation() {
        const hero = document.querySelector('.hero');
        if (hero && !isMobile) {
            hero.style.animation = 'fadeInScale 1s ease-out';
        }
    }

    // Add welcome animation CSS
    if (!document.querySelector('#welcome-animation-style')) {
        const style = document.createElement('style');
        style.id = 'welcome-animation-style';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.98);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ================================
    // Fade-in Animation on Scroll
    // ================================
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .stat-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = isMobile ? 'opacity 0.3s ease, transform 0.3s ease' : 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ================================
    // Parallax Effect (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const hero = document.querySelector('.hero');
        if (hero) {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        const heroHeight = hero.offsetHeight;
                        
                        if (scrolled < heroHeight) {
                            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
                            hero.style.opacity = 1 - (scrolled / heroHeight) * 0.3;
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }

    // ================================
    // Typing Effect for Hero Name
    // ================================
    const typingText = document.querySelector('.highlight');
    if (typingText && !isMobile) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '3px solid var(--primary-color)';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // ================================
    // Count Up Animation for Stats
    // ================================
    const countUpElements = document.querySelectorAll('.stat-item h3');
    
    const countUp = (element) => {
        const target = parseInt(element.textContent);
        const duration = isMobile ? 1000 : 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    countUpElements.forEach(el => countObserver.observe(el));

    // ================================
    // Smooth Reveal for Section Titles
    // ================================
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
    });
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const duration = isMobile ? '0.4s' : '0.8s';
                entry.target.style.transition = `opacity ${duration} ease, transform ${duration} ease`;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (!isMobile) {
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        icon.style.animation = 'iconBounceIn 0.8s ease-out 0.3s both';
                    }
                }
            }
        });
    }, { threshold: 0.3 });
    
    sectionTitles.forEach(title => titleObserver.observe(title));

    // Add icon bounce animation
    if (!document.querySelector('#icon-bounce-style')) {
        const style = document.createElement('style');
        style.id = 'icon-bounce-style';
        style.textContent = `
            @keyframes iconBounceIn {
                0% {
                    transform: scale(0) rotate(-90deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.1) rotate(5deg);
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ================================
    // Project Card 3D Tilt (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                card.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }

    // ================================
    // Skill Card Stagger Animation
    // ================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 50 : index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, { threshold: 0.2 });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        skillObserver.observe(card);
    });

    // ================================
    // Image Lazy Loading
    // ================================
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (!isMobile) {
                        img.style.filter = 'blur(10px)';
                        img.style.transition = 'filter 0.5s ease';
                    }
                    
                    if (img.complete) {
                        img.style.filter = 'blur(0)';
                    } else {
                        img.addEventListener('load', () => {
                            img.style.filter = 'blur(0)';
                        });
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ================================
    // Scroll Progress Indicator
    // ================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--accent-gradient);
            z-index: 10001;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px var(--primary-color);
            will-change: width;
        `;
        document.body.appendChild(progressBar);
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    progressBar.style.width = scrollPercent + '%';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    createScrollProgress();

    // ================================
    // Button Hover Animation (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.animation = 'buttonPulse 0.4s ease-in-out';
            });
            
            btn.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });

        if (!document.querySelector('#button-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'button-pulse-style';
            style.textContent = `
                @keyframes buttonPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.03);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ================================
    // Social Links Animation
    // ================================
    const socialLinks = document.querySelectorAll('.social-links a');
    
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 50 : index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, delay);
            }
        });
    }, { threshold: 0.5 });
    
    socialLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'scale(0)';
        link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        socialObserver.observe(link);
    });

    // ================================
    // Easter Egg: Konami Code (Desktop Only)
    // ================================
    if (!isMobile && !isTouch) {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activatePartyMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        function activatePartyMode() {
            console.log('%c🎉 PARTY MODE ACTIVATED! 🎉', 'font-size: 24px; color: #FF2E97; font-weight: bold;');
            
            const notification = document.createElement('div');
            notification.innerHTML = '🎉 PARTY MODE! 🎉';
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--accent-gradient);
                color: var(--darker-bg);
                padding: 30px 50px;
                border-radius: 20px;
                font-size: 2rem;
                font-weight: bold;
                z-index: 99999;
                animation: partyPulse 0.5s ease-in-out infinite;
                box-shadow: 0 0 50px var(--primary-color);
            `;
            document.body.appendChild(notification);
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => createConfetti(), i * 100);
            }
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }

        function createConfetti() {
            const colors = ['#FF0080', '#00D9FF', '#00FF88', '#FFB800', '#FF2E97', '#A855F7'];
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 99998;
            `;
            document.body.appendChild(confetti);
            
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), 3000);
        }

        if (!document.querySelector('#party-style')) {
            const style = document.createElement('style');
            style.id = 'party-style';
            style.textContent = `
                @keyframes partyPulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    console.log('✅ Animations loaded successfully!');
    if (isMobile) {
        console.log('📱 Mobile optimizations active');
    } else {
        console.log('💻 Desktop mode - Full animations enabled');
        console.log('💡 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A');
    }
});