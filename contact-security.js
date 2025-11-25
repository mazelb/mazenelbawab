// ========================================
// CONTACT SECURITY MODULE
// Multi-layer obfuscation for contact information
// ========================================

const ContactSecurity = (function() {
    'use strict';
    
    // ========================================
    // LAYER 1: SPLIT & ENCODE
    // Split data into multiple parts, encode each differently
    // ========================================
    
    /**
     * Encode contact data using multiple techniques
     * Store in config.js instead of plain text
     */
    const encodeForConfig = {
        // Email: split into parts, reverse, then encode
        encodeEmail: function(email) {
            const [user, domain] = email.split('@');
            const domainParts = domain.split('.');
            return {
                u: btoa(user.split('').reverse().join('')),           // reversed user
                d: btoa(domainParts[0].split('').reverse().join('')), // reversed domain
                t: btoa(domainParts.slice(1).join('.'))               // TLD
            };
        },
        
        // Phone: split into segments, encode each
        encodePhone: function(phone) {
            const clean = phone.replace(/\D/g, '');
            return {
                c: btoa(clean.slice(0, 1)),   // country code
                a: btoa(clean.slice(1, 4)),   // area code  
                p: btoa(clean.slice(4, 7)),   // prefix
                l: btoa(clean.slice(7))       // line
            };
        }
    };
    
    // ========================================
    // LAYER 2: RUNTIME ASSEMBLY
    // Assemble contact info only when needed
    // ========================================
    
    const assembleEmail = function(encoded) {
        try {
            const user = atob(encoded.u).split('').reverse().join('');
            const domain = atob(encoded.d).split('').reverse().join('');
            const tld = atob(encoded.t);
            return `${user}@${domain}.${tld}`;
        } catch(e) {
            console.error('Email decode failed');
            return null;
        }
    };
    
    const assemblePhone = function(encoded) {
        try {
            const c = atob(encoded.c);
            const a = atob(encoded.a);
            const p = atob(encoded.p);
            const l = atob(encoded.l);
            return `+${c}-${a}-${p}-${l}`;
        } catch(e) {
            console.error('Phone decode failed');
            return null;
        }
    };
    
    // ========================================
    // LAYER 3: CSS-BASED DISPLAY
    // Use CSS to make scraping harder
    // ========================================
    
    const createObfuscatedDisplay = function(text, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Method 1: Unicode direction trick + span insertion
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.setAttribute('data-index', index);
            // Add decoy spans that are hidden via CSS
            if (index % 3 === 0 && index > 0) {
                const decoy = document.createElement('span');
                decoy.className = 'decoy-char';
                decoy.textContent = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                decoy.setAttribute('aria-hidden', 'true');
                container.appendChild(decoy);
            }
            container.appendChild(span);
        });
    };
    
    // ========================================
    // LAYER 4: INTERACTION-BASED REVEAL
    // Only show/enable after user interaction
    // ========================================
    
    let interactionVerified = false;
    let interactionScore = 0;
    
    const trackInteraction = function() {
        interactionScore++;
        if (interactionScore >= 3) {
            interactionVerified = true;
        }
    };
    
    const initInteractionTracking = function() {
        // Track mouse movements (bots typically don't move mouse naturally)
        let lastX = 0, lastY = 0;
        document.addEventListener('mousemove', function(e) {
            if (Math.abs(e.clientX - lastX) > 50 || Math.abs(e.clientY - lastY) > 50) {
                trackInteraction();
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }, { passive: true });
        
        // Track scroll (natural user behavior)
        let scrollCount = 0;
        document.addEventListener('scroll', function() {
            scrollCount++;
            if (scrollCount > 2) trackInteraction();
        }, { passive: true });
        
        // Track clicks
        document.addEventListener('click', trackInteraction, { passive: true });
        
        // Track touch for mobile
        document.addEventListener('touchstart', trackInteraction, { passive: true });
    };
    
    // ========================================
    // LAYER 5: TIME-DELAYED ACTIVATION
    // Contact links only work after page has been open
    // ========================================
    
    let pageLoadTime = Date.now();
    const MIN_TIME_ON_PAGE = 3000; // 3 seconds minimum
    
    const isHumanLikeTiming = function() {
        return (Date.now() - pageLoadTime) > MIN_TIME_ON_PAGE;
    };
    
    // ========================================
    // LAYER 6: HONEYPOT ENHANCEMENT
    // Multiple honeypot fields with different techniques
    // ========================================
    
    const enhanceFormSecurity = function(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Add multiple honeypot fields
        const honeypots = [
            { name: '_gotcha', type: 'text' },
            { name: 'website', type: 'url' },      // Bots love filling "website" fields
            { name: 'phone_confirm', type: 'tel' }, // Duplicate field trap
            { name: 'fax', type: 'text' }          // Nobody has fax anymore
        ];
        
        honeypots.forEach(hp => {
            if (!form.querySelector(`[name="${hp.name}"]`)) {
                const input = document.createElement('input');
                input.type = hp.type;
                input.name = hp.name;
                input.tabIndex = -1;
                input.autocomplete = 'off';
                input.style.cssText = `
                    position: absolute !important;
                    left: -9999px !important;
                    top: -9999px !important;
                    height: 0 !important;
                    width: 0 !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                `;
                input.setAttribute('aria-hidden', 'true');
                form.insertBefore(input, form.firstChild);
            }
        });
        
        // Add timestamp field (detect instant submissions)
        const timestampField = document.createElement('input');
        timestampField.type = 'hidden';
        timestampField.name = '_timestamp';
        timestampField.value = Date.now();
        form.appendChild(timestampField);
        
        // Validation on submit
        form.addEventListener('submit', function(e) {
            // Check honeypots
            for (const hp of honeypots) {
                const field = form.querySelector(`[name="${hp.name}"]`);
                if (field && field.value !== '') {
                    e.preventDefault();
                    console.log('Bot detected: honeypot filled');
                    return false;
                }
            }
            
            // Check timing (form filled too fast = bot)
            const timestamp = parseInt(timestampField.value);
            if (Date.now() - timestamp < 3000) {
                e.preventDefault();
                console.log('Bot detected: form submitted too quickly');
                return false;
            }
            
            // Check interaction score
            if (!interactionVerified) {
                e.preventDefault();
                console.log('Bot detected: no natural interaction');
                // Show a gentle message instead of blocking completely
                const status = document.getElementById('form-status');
                if (status) {
                    status.textContent = 'Please scroll or interact with the page before submitting.';
                    status.className = 'form-status error';
                    status.classList.remove('hidden');
                }
                return false;
            }
        });
    };
    
    // ========================================
    // PUBLIC API
    // ========================================
    
    return {
        // Initialize all security measures
        init: function(config) {
            pageLoadTime = Date.now();
            initInteractionTracking();
            
            if (config.formId) {
                enhanceFormSecurity(config.formId);
            }
        },
        
        // Encode helpers (use these to generate config values)
        encode: encodeForConfig,
        
        // Setup secure email link
        setupEmailLink: function(linkElement, encodedEmail, displayElement) {
            if (!linkElement) return;
            
            // Store encoded parts as data attributes
            linkElement.setAttribute('data-u', encodedEmail.u);
            linkElement.setAttribute('data-d', encodedEmail.d);
            linkElement.setAttribute('data-t', encodedEmail.t);
            
            // Display obfuscated version
            if (displayElement) {
                const email = assembleEmail(encodedEmail);
                if (email) {
                    createObfuscatedDisplay(email, displayElement.id);
                }
            }
            
            // Handle click with security checks
            linkElement.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Security checks
                if (!isHumanLikeTiming()) {
                    console.log('Please wait a moment...');
                    return;
                }
                
                if (!interactionVerified) {
                    console.log('Interaction not verified');
                    return;
                }
                
                // Assemble and open
                const email = assembleEmail({
                    u: this.getAttribute('data-u'),
                    d: this.getAttribute('data-d'),
                    t: this.getAttribute('data-t')
                });
                
                if (email) {
                    window.location.href = 'mailto:' + email;
                }
            });
        },
        
        // Setup secure phone link
        setupPhoneLink: function(linkElement, encodedPhone, displayElement) {
            if (!linkElement) return;
            
            linkElement.setAttribute('data-c', encodedPhone.c);
            linkElement.setAttribute('data-a', encodedPhone.a);
            linkElement.setAttribute('data-p', encodedPhone.p);
            linkElement.setAttribute('data-l', encodedPhone.l);
            
            if (displayElement) {
                const phone = assemblePhone(encodedPhone);
                if (phone) {
                    createObfuscatedDisplay(phone, displayElement.id);
                }
            }
            
            linkElement.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!isHumanLikeTiming() || !interactionVerified) {
                    console.log('Please interact with the page first');
                    return;
                }
                
                const phone = assemblePhone({
                    c: this.getAttribute('data-c'),
                    a: this.getAttribute('data-a'),
                    p: this.getAttribute('data-p'),
                    l: this.getAttribute('data-l')
                });
                
                if (phone) {
                    window.location.href = 'tel:' + phone.replace(/\D/g, '');
                }
            });
        },
        
        // Check if user appears to be human
        isVerified: function() {
            return interactionVerified && isHumanLikeTiming();
        },
        
        // Get interaction score (for debugging)
        getScore: function() {
            return interactionScore;
        }
    };
})();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactSecurity;
}
