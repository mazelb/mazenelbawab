// ========================================
// UPDATED CONTACT INITIALIZATION
// Replace initializeContactForm() and contact info setup in app.js
// ========================================

// Add to your DOMContentLoaded handler:
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init calls ...
    
    // Initialize contact security EARLY
    ContactSecurity.init({
        formId: 'contact-form'
    });
    
    // Initialize secure contact info
    initializeSecureContactInfo();
    
    // Initialize enhanced contact form
    initializeSecureContactForm();
});

// ========================================
// SECURE CONTACT INFO INITIALIZATION
// ========================================
function initializeSecureContactInfo() {
    // Email setup with security
    const contactEmail = document.getElementById('contact-email');
    const contactEmailText = document.getElementById('contact-email-text');
    
    if (contactEmail && CONFIG.personal.emailEncoded) {
        ContactSecurity.setupEmailLink(
            contactEmail, 
            CONFIG.personal.emailEncoded,
            contactEmailText
        );
        
        // Add security indicator class
        contactEmail.classList.add('secure-contact-link');
        contactEmail.setAttribute('data-security', 'pending');
        
        // Update security status when verified
        const checkVerification = setInterval(() => {
            if (ContactSecurity.isVerified()) {
                contactEmail.setAttribute('data-security', 'verified');
                clearInterval(checkVerification);
            }
        }, 1000);
    }
    
    // Phone setup with security
    const contactPhone = document.getElementById('contact-phone');
    const contactPhoneText = document.getElementById('contact-phone-text');
    
    if (contactPhone && CONFIG.personal.phoneEncoded) {
        ContactSecurity.setupPhoneLink(
            contactPhone,
            CONFIG.personal.phoneEncoded,
            contactPhoneText
        );
        
        contactPhone.classList.add('secure-contact-link');
        contactPhone.setAttribute('data-security', 'pending');
        
        const checkPhoneVerification = setInterval(() => {
            if (ContactSecurity.isVerified()) {
                contactPhone.setAttribute('data-security', 'verified');
                clearInterval(checkPhoneVerification);
            }
        }, 1000);
    }
    
    // LinkedIn and GitHub (less sensitive, but still add some protection)
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    
    if (contactLinkedin) {
        contactLinkedin.href = `https://linkedin.com/in/${CONFIG.personal.linkedin}`;
    }
    if (contactGithub) {
        contactGithub.href = `https://github.com/${CONFIG.personal.github}`;
    }
}

// ========================================
// SECURE CONTACT FORM INITIALIZATION
// ========================================
function initializeSecureContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Decode and set form action
    if (CONFIG.contactForm && CONFIG.contactForm.formspreeId) {
        try {
            const formId = atob(CONFIG.contactForm.formspreeId);
            form.action = `https://formspree.io/f/${formId}`;
        } catch(e) {
            console.error('Invalid form configuration');
            return;
        }
    }
    
    // Add security status indicator
    const securityStatus = document.createElement('div');
    securityStatus.className = 'form-security-status pending';
    securityStatus.innerHTML = '<span>Verifying you\'re human...</span>';
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.parentNode.insertBefore(securityStatus, submitBtn.nextSibling);
    }
    
    // Update status when verified
    const updateStatus = setInterval(() => {
        if (ContactSecurity.isVerified()) {
            securityStatus.className = 'form-security-status verified';
            securityStatus.innerHTML = '<span>Ready to send</span>';
            clearInterval(updateStatus);
        }
    }, 500);
    
    // Enhanced form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        const originalBtnText = submitBtn.textContent;
        
        // Security check
        if (!ContactSecurity.isVerified()) {
            statusDiv.textContent = '⚠️ Please interact with the page (scroll, click) before sending.';
            statusDiv.className = 'form-status error';
            statusDiv.classList.remove('hidden');
            return;
        }
        
        // Check all honeypot fields
        const honeypots = ['_gotcha', 'website', 'phone_confirm', 'fax'];
        for (const hp of honeypots) {
            const field = form.querySelector(`[name="${hp}"]`);
            if (field && field.value !== '') {
                console.log('Bot detected');
                // Fake success to confuse bot
                statusDiv.textContent = '✓ Message sent!';
                statusDiv.className = 'form-status success';
                statusDiv.classList.remove('hidden');
                return;
            }
        }
        
        // Check timing
        const timestampField = form.querySelector('[name="_timestamp"]');
        if (timestampField) {
            const elapsed = Date.now() - parseInt(timestampField.value);
            if (elapsed < (CONFIG.contactForm.minFormFillTime || 3000)) {
                console.log('Form submitted too quickly');
                statusDiv.textContent = '⚠️ Please take a moment to fill out the form.';
                statusDiv.className = 'form-status error';
                statusDiv.classList.remove('hidden');
                return;
            }
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusDiv.classList.add('hidden');
        
        try {
            const formData = new FormData(form);
            
            // Remove honeypot fields from submission
            honeypots.forEach(hp => formData.delete(hp));
            formData.delete('_timestamp');
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusDiv.textContent = '✓ Thank you! Your message has been sent successfully.';
                statusDiv.className = 'form-status success';
                statusDiv.classList.remove('hidden');
                form.reset();
                
                // Reset timestamp for next submission
                if (timestampField) {
                    timestampField.value = Date.now();
                }
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            statusDiv.textContent = '✗ Unable to send. Please try again or email directly.';
            statusDiv.className = 'form-status error';
            statusDiv.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// ========================================
// OPTIONAL: CAPTCHA INTEGRATION
// ========================================
function initializeCaptcha() {
    // reCAPTCHA v3 (invisible)
    if (CONFIG.security?.recaptcha?.enabled && CONFIG.security.recaptcha.siteKey) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${CONFIG.security.recaptcha.siteKey}`;
        document.head.appendChild(script);
        
        script.onload = function() {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    try {
                        const token = await grecaptcha.execute(
                            CONFIG.security.recaptcha.siteKey, 
                            { action: 'contact' }
                        );
                        
                        // Add token to form
                        let tokenField = form.querySelector('[name="g-recaptcha-response"]');
                        if (!tokenField) {
                            tokenField = document.createElement('input');
                            tokenField.type = 'hidden';
                            tokenField.name = 'g-recaptcha-response';
                            form.appendChild(tokenField);
                        }
                        tokenField.value = token;
                        
                        // Continue with form submission
                        // (handled by your existing submit handler)
                    } catch (error) {
                        console.error('reCAPTCHA failed:', error);
                    }
                });
            }
        };
    }
    
    // hCaptcha (more privacy-friendly)
    if (CONFIG.security?.hcaptcha?.enabled && CONFIG.security.hcaptcha.siteKey) {
        const script = document.createElement('script');
        script.src = 'https://js.hcaptcha.com/1/api.js';
        script.async = true;
        document.head.appendChild(script);
        
        // Add hCaptcha widget to form
        script.onload = function() {
            const form = document.getElementById('contact-form');
            const submitBtn = form?.querySelector('button[type="submit"]');
            
            if (form && submitBtn) {
                const captchaDiv = document.createElement('div');
                captchaDiv.className = 'captcha-container';
                captchaDiv.innerHTML = `
                    <div class="h-captcha" 
                         data-sitekey="${CONFIG.security.hcaptcha.siteKey}"
                         data-callback="onCaptchaSuccess">
                    </div>
                `;
                submitBtn.parentNode.insertBefore(captchaDiv, submitBtn);
                
                // Render hCaptcha
                if (window.hcaptcha) {
                    hcaptcha.render(captchaDiv.querySelector('.h-captcha'));
                }
            }
        };
    }
}

// Callback for hCaptcha success
window.onCaptchaSuccess = function(token) {
    console.log('CAPTCHA verified');
};

// ========================================
// UTILITY: Generate encoded config values
// Run these in browser console to get encoded values
// ========================================
function generateEncodedConfig() {
    console.log('=== EMAIL ENCODING ===');
    console.log('For: mazen.elbawab@gmail.com');
    console.log(ContactSecurity.encode.encodeEmail('mazen.elbawab@gmail.com'));
    
    console.log('\n=== PHONE ENCODING ===');
    console.log('For: +1-514-992-3126');
    console.log(ContactSecurity.encode.encodePhone('+1-514-992-3126'));
}
