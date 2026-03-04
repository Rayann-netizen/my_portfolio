// ================================
// CONTACT FORM HANDLER - COMPLETE
// ================================

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('📧 Contact form handler loaded!');
    
    // ================================
    // DOM ELEMENTS
    // ================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    // Form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // ================================
    // CONFIGURATION
    // ================================
    const CONFIG = {
        minNameLength: 2,
        minMessageLength: 10,
        maxMessageLength: 1000,
        debounceDelay: 300,
        statusDisplayTime: 5000
    };
    
    // ================================
    // FORM SUBMISSION HANDLER
    // ================================
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            
            // Validate form
            const validation = validateForm(formData);
            if (!validation.isValid) {
                showStatus(validation.message, 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            try {
                // Submit form (choose your method below)
                await submitForm(formData);
                
                // Success
                showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Track submission (Google Analytics - if available)
                trackFormSubmission('success');
                
                // Confetti effect on success
                createSuccessAnimation();
                
            } catch (error) {
                console.error('Form submission error:', error);
                showStatus('❌ Oops! Something went wrong. Please try again or email me directly.', 'error');
                
                // Track error
                trackFormSubmission('error', error.message);
            } finally {
                // Restore button state
                setLoadingState(false);
            }
        });
    }
    
    // ================================
    // FORM VALIDATION
    // ================================
    function validateForm(data) {
        // Check if all fields are filled
        if (!data.name || !data.email || !data.subject || !data.message) {
            return {
                isValid: false,
                message: '⚠️ Please fill in all required fields.'
            };
        }
        
        // Validate name length
        if (data.name.length < CONFIG.minNameLength) {
            return {
                isValid: false,
                message: `⚠️ Name must be at least ${CONFIG.minNameLength} characters long.`
            };
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return {
                isValid: false,
                message: '⚠️ Please enter a valid email address.'
            };
        }
        
        // Validate email domain (basic spam check)
        const suspiciousDomains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com'];
        const emailDomain = data.email.split('@')[1]?.toLowerCase();
        if (suspiciousDomains.includes(emailDomain)) {
            return {
                isValid: false,
                message: '⚠️ Please use a valid email address.'
            };
        }
        
        // Validate message length
        if (data.message.length < CONFIG.minMessageLength) {
            return {
                isValid: false,
                message: `⚠️ Message must be at least ${CONFIG.minMessageLength} characters long.`
            };
        }
        
        if (data.message.length > CONFIG.maxMessageLength) {
            return {
                isValid: false,
                message: `⚠️ Message must be less than ${CONFIG.maxMessageLength} characters.`
            };
        }
        
        // Check for spam patterns
        const spamPatterns = [
            /viagra/i,
            /cialis/i,
            /casino/i,
            /\$\$\$/,
            /click here/i,
            /buy now/i,
            /limited time/i
        ];
        
        const messageText = `${data.name} ${data.subject} ${data.message}`.toLowerCase();
        const hasSpam = spamPatterns.some(pattern => pattern.test(messageText));
        
        if (hasSpam) {
            return {
                isValid: false,
                message: '⚠️ Your message contains suspicious content.'
            };
        }
        
        return { isValid: true };
    }
    
    // ================================
    // SUBMIT FORM (CHOOSE YOUR METHOD)
    // ================================
    async function submitForm(formData) {
        // OPTION 1: Using EmailJS (Recommended for beginners)
        // return await submitWithEmailJS(formData);
        
        // OPTION 2: Using Formspree
        // return await submitWithFormspree(formData);
        
        // OPTION 3: Using Custom Backend API
        // return await submitWithCustomAPI(formData);
        
        // OPTION 4: Using Web3Forms (Free & Easy)
        // return await submitWithWeb3Forms(formData);
        
        // TEMPORARY: Simulate submission (REMOVE IN PRODUCTION)
        return await simulateSubmission(formData);
    }
    
    // ================================
    // OPTION 1: EmailJS
    // ================================
    async function submitWithEmailJS(formData) {
        // Setup: https://www.emailjs.com/
        // 1. Create account
        // 2. Add email service (Gmail, Outlook, etc.)
        // 3. Create email template
        // 4. Get your Public Key, Service ID, and Template ID
        
        // Add this script to your HTML:
        // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded. Add the script to your HTML.');
        }
        
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
        
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your service ID
            'YOUR_TEMPLATE_ID',     // Replace with your template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Rayann'
            }
        );
        
        return response;
    }
    
    // ================================
    // OPTION 2: Formspree
    // ================================
    async function submitWithFormspree(formData) {
        // Setup: https://formspree.io/
        // 1. Create account
        // 2. Create a new form
        // 3. Get your form endpoint
        
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your endpoint
        
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        
        return await response.json();
    }
    
    // ================================
    // OPTION 3: Custom Backend API
    // ================================
    async function submitWithCustomAPI(formData) {
        // Replace with your API endpoint
        const API_ENDPOINT = 'https://your-api.com/contact';
        
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send message');
        }
        
        return await response.json();
    }
    
    // ================================
    // OPTION 4: Web3Forms (Free & Easy)
    // ================================
    async function submitWithWeb3Forms(formData) {
        // Setup: https://web3forms.com/
        // 1. Get free API key
        // 2. No backend needed!
        
        const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your key
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Failed to send message');
        }
        
        return result;
    }
    
    // ================================
    // SIMULATE SUBMISSION (REMOVE IN PRODUCTION)
    // ================================
    async function simulateSubmission(formData) {
        console.log('📧 Form data:', formData);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate random success/failure for testing
        // if (Math.random() < 0.1) {
        //     throw new Error('Simulated error for testing');
        // }
        
        return { success: true, message: 'Message sent (simulated)' };
    }
    
    // ================================
    // SHOW STATUS MESSAGE
    // ================================
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = type;
        formStatus.style.display = 'block';
        
        // Add icon based on type
        const icon = type === 'success' ? '✅' : '❌';
        formStatus.textContent = `${icon} ${message}`;
        
        // Auto-hide after duration
        setTimeout(() => {
            formStatus.style.opacity = '0';
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.style.opacity = '1';
            }, 300);
        }, CONFIG.statusDisplayTime);
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // ================================
    // SET LOADING STATE
    // ================================
    function setLoadingState(isLoading) {
        if (!submitButton) return;
        
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.dataset.originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.style.cursor = 'not-allowed';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButton.dataset.originalText || '<i class="fas fa-paper-plane"></i> Send Message';
            submitButton.style.cursor = 'pointer';
            submitButton.style.opacity = '1';
        }
    }
    
    // ================================
    // REAL-TIME VALIDATION
    // ================================
    
    // Email validation on blur
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = '#e74c3c';
                showFieldError(emailInput, 'Please enter a valid email address');
            } else {
                emailInput.style.borderColor = '';
                hideFieldError(emailInput);
            }
        });
        
        emailInput.addEventListener('focus', () => {
            emailInput.style.borderColor = '';
            hideFieldError(emailInput);
        });
    }
    
    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            const name = nameInput.value.trim();
            
            if (name && name.length < CONFIG.minNameLength) {
                nameInput.style.borderColor = '#e74c3c';
                showFieldError(nameInput, `Name must be at least ${CONFIG.minNameLength} characters`);
            } else {
                nameInput.style.borderColor = '';
                hideFieldError(nameInput);
            }
        });
    }
    
    // Message validation
    if (messageInput) {
        messageInput.addEventListener('input', debounce(() => {
            const message = messageInput.value.trim();
            
            if (message.length > CONFIG.maxMessageLength) {
                messageInput.style.borderColor = '#e74c3c';
                showFieldError(messageInput, `Message is too long (${message.length}/${CONFIG.maxMessageLength})`);
            } else {
                messageInput.style.borderColor = '';
                hideFieldError(messageInput);
            }
        }, CONFIG.debounceDelay));
    }
    
    // ================================
    // FIELD ERROR HELPERS
    // ================================
    function showFieldError(input, message) {
        const existingError = input.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.textContent = message;
            return;
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            animation: slideDown 0.3s ease;
        `;
        
        input.parentElement.appendChild(errorElement);
    }
    
    function hideFieldError(input) {
        const errorElement = input.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // ================================
    // CHARACTER COUNTER FOR TEXTAREA
    // ================================
    if (messageInput) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-top: 5px;
        `;
        
        messageInput.parentElement.appendChild(counter);
        
        const updateCounter = () => {
            const length = messageInput.value.length;
            counter.textContent = `${length}/${CONFIG.maxMessageLength} characters`;
            
            if (length > CONFIG.maxMessageLength) {
                counter.style.color = '#e74c3c';
            } else if (length > CONFIG.maxMessageLength * 0.9) {
                counter.style.color = '#FFB800';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        };
        
        messageInput.addEventListener('input', updateCounter);
        updateCounter(); // Initialize
    }
    
    // ================================
    // SUCCESS ANIMATION
    // ================================
    function createSuccessAnimation() {
        const colors = ['#00D9FF', '#00FF88', '#FF2E97', '#FFB800'];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const startX = contactForm.getBoundingClientRect().left + contactForm.offsetWidth / 2;
                const startY = contactForm.getBoundingClientRect().top;
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${startX}px;
                    top: ${startY}px;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    z-index: 10001;
                    pointer-events: none;
                    animation: particleBurst ${1 + Math.random()}s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 20);
        }
        
        // Add particle animation if not exists
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes particleBurst {
                    to {
                        transform: translate(
                            ${Math.random() * 200 - 100}px,
                            ${Math.random() * 200 - 100}px
                        ) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ================================
    // TRACK FORM SUBMISSION
    // ================================
    function trackFormSubmission(status, errorMessage = '') {
        console.log(`📊 Form submission: ${status}`, errorMessage);
        
        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact Form',
                'event_label': status,
                'value': status === 'success' ? 1 : 0
            });
        }
    }
    
    // ================================
    // UTILITY: DEBOUNCE
    // ================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ================================
    // PREVENT SPAM SUBMISSIONS
    // ================================
    let lastSubmitTime = 0;
    const MIN_SUBMIT_INTERVAL = 10000; // 10 seconds
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const now = Date.now();
            if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
                e.preventDefault();
                e.stopImmediatePropagation();
                showStatus('⚠️ Please wait before submitting again.', 'error');
                return false;
            }
            lastSubmitTime = now;
        }, true);
    }
    
    // ================================
    // AUTO-SAVE DRAFT (LOCAL STORAGE)
    // ================================
    const DRAFT_KEY = 'contactFormDraft';
    
    function saveDraft() {
        if (!contactForm) return;
        
        const draft = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value,
            timestamp: Date.now()
        };
        
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
    
    function loadDraft() {
        const draftString = localStorage.getItem(DRAFT_KEY);
        if (!draftString) return;
        
        try {
            const draft = JSON.parse(draftString);
            const hoursSinceDraft = (Date.now() - draft.timestamp) / (1000 * 60 * 60);
            
            // Only load draft if less than 24 hours old
            if (hoursSinceDraft < 24) {
                nameInput.value = draft.name || '';
                emailInput.value = draft.email || '';
                subjectInput.value = draft.subject || '';
                messageInput.value = draft.message || '';
                
                console.log('📝 Draft loaded from local storage');
            } else {
                localStorage.removeItem(DRAFT_KEY);
            }
        } catch (e) {
            console.error('Error loading draft:', e);
        }
    }
    
    function clearDraft() {
        localStorage.removeItem(DRAFT_KEY);
    }
    
    // Auto-save draft on input (debounced)
    if (contactForm) {
        const autoSave = debounce(saveDraft, 1000);
        contactForm.addEventListener('input', autoSave);
        
        // Load draft on page load
        loadDraft();
        
        // Clear draft on successful submission
        contactForm.addEventListener('submit', (e) => {
            // Clear draft after successful submission
            setTimeout(() => {
                if (formStatus.classList.contains('success')) {
                    clearDraft();
                }
            }, 2000);
        });
    }
    
    // ================================
    // HONEYPOT FIELD (SPAM PROTECTION)
    // ================================
    // Add this hidden field to your HTML form:
    // <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">
    
    const honeypotField = contactForm?.querySelector('input[name="honeypot"]');
    if (honeypotField && contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (honeypotField.value !== '') {
                e.preventDefault();
                console.warn('🤖 Bot detected via honeypot');
                showStatus('⚠️ Error processing form. Please try again.', 'error');
                return false;
            }
        });
    }
    
    // ================================
    // CONSOLE LOG
    // ================================
    console.log('%c✅ Contact Form Handler Initialized!', 'background: #00FF88; color: #0A0E27; font-size: 14px; padding: 8px; font-weight: bold;');
    console.log('%c📝 Features enabled:', 'font-size: 12px; color: #B4BCD0; font-weight: bold;');
    console.log('%c  ✓ Form validation', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Real-time feedback', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Character counter', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Auto-save draft', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Spam protection', 'font-size: 11px; color: #00FF88;');
    console.log('%c  ✓ Success animation', 'font-size: 11px; color: #00FF88;');
    
});

// ================================
// SETUP INSTRUCTIONS
// ================================
/*
🔧 TO SETUP YOUR CONTACT FORM:

OPTION 1: EmailJS (Recommended for beginners)
1. Sign up at https://www.emailjs.com/
2. Add email service (Gmail, Outlook, etc.)
3. Create email template
4. Get Public Key, Service ID, Template ID
5. Add script to HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
6. Uncomment submitWithEmailJS() and add your credentials

OPTION 2: Formspree (Easiest)
1. Sign up at https://formspree.io/
2. Create new form
3. Get form endpoint
4. Uncomment submitWithFormspree() and add endpoint

OPTION 3: Web3Forms (Free, No signup for basic)
1. Get API key from https://web3forms.com/
2. Uncomment submitWithWeb3Forms() and add key

OPTION 4: Custom Backend
1. Create your API endpoint
2. Uncomment submitWithCustomAPI() and add URL

⚠️ REMEMBER: Remove simulateSubmission() in production!
*/