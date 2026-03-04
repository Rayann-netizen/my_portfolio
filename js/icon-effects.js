// ================================
// ICON EFFECTS & INTERACTIONS
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================================
    // Skill Card Icon Animations on Hover
    // ================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon i');
            if (icon) {
                icon.classList.add('icon-bounce');
                setTimeout(() => {
                    icon.classList.remove('icon-bounce');
                }, 500);
            }
        });
    });
    
    // ================================
    // Stat Item Icon Pulse on Scroll
    // ================================
    const statItems = document.querySelectorAll('.stat-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.stat-icon');
                if (icon) {
                    icon.classList.add('icon-pulse');
                    setTimeout(() => {
                        icon.classList.remove('icon-pulse');
                    }, 1000);
                }
            }
        });
    }, observerOptions);
    
    statItems.forEach(item => statObserver.observe(item));
    
    // ================================
    // Project Card Hover Effects
    // ================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay i');
            if (overlay) {
                overlay.style.animation = 'zoomIn 0.3s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay i');
            if (overlay) {
                overlay.style.animation = '';
            }
        });
    });
    
    // ================================
    // Social Links Icon Rotation
    // ================================
    const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.animation = 'rotate 0.5s ease-in-out';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // ================================
    // Contact Item Icon Bounce
    // ================================
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.icon i');
            if (icon) {
                icon.classList.add('icon-bounce');
                setTimeout(() => {
                    icon.classList.remove('icon-bounce');
                }, 500);
            }
        });
    });
    
    // ================================
    // Button Icon Slide Effect
    // ================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // ================================
    // Skill Tag Hover Effect
    // ================================
    const skillTags = document.querySelectorAll('.skill-tags span, .project-tags .tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const icon = tag.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 0.3s ease';
            }
        });
    });
    
    // ================================
    // Logo Icon Animation on Click
    // ================================
    const logoIcon = document.querySelector('.logo-icon');
    const logo = document.querySelector('.logo');
    
    if (logo && logoIcon) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            logoIcon.style.animation = 'logoSpin 0.6s ease';
            setTimeout(() => {
                logoIcon.style.animation = '';
            }, 600);
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================================
    // Icon Click Ripple Effect
    // ================================
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .social-links a, .theme-toggle').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // ================================
    // Parallax Effect for Hero Icons
    // ================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroIcons = document.querySelectorAll('.hero .tagline i');
        
        heroIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ================================
    // Icon Color Change on Scroll
    // ================================
    const navIcons = document.querySelectorAll('.nav-links i');
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        navIcons.forEach((icon, index) => {
            const hue = (scrollPercent * 3.6) + (index * 30); // Full color wheel
            icon.style.filter = `hue-rotate(${hue}deg)`;
        });
    });
    
    console.log('✅ Icon effects loaded!');
});